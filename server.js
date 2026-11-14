const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: true, methods: ["GET", "POST"] },
  maxHttpBufferSize: 1e6
});

const PORT = process.env.PORT || 3000;
const players = new Map();
const MAX_PLAYERS = 100;
const pendingPrivate = new Map();
const activePrivate = new Set();
const pairKey = (a, b) => [a, b].sort().join(":");

app.use(express.static("public"));
const path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/school-bg.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "school-bg.jpg"));
});
app.get("/health", (_req, res) => res.json({ ok: true, players: players.size }));

function clean(value, max) {
  return String(value || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}
function publicPlayers() {
  return [...players.values()];
}
function broadcastPlayers() {
  io.emit("players:update", publicPlayers());
}

io.on("connection", (socket) => {
  socket.emit("world:init", publicPlayers());

  socket.on("player:join", (data) => {
    if (players.has(socket.id)) return;
    if (players.size >= MAX_PLAYERS) {
      socket.emit("join:error", "Sân trường đang đông, bạn thử vào lại sau nhé.");
      return;
    }
    const name = clean(data && data.name, 28);
    const classroom = clean(data && data.classroom, 16);
    if (!name || !classroom) {
      socket.emit("join:error", "Vui lòng nhập họ tên và lớp.");
      return;
    }
    const player = {
      id: socket.id,
      name,
      classroom,
      x: 48 + Math.random() * 8,
      y: 65 + Math.random() * 10,
      direction: "down",
      joinedAt: Date.now()
    };
    players.set(socket.id, player);
    socket.emit("join:success", player);
    socket.broadcast.emit("system:message", `${name} (${classroom}) vừa trở về trường!`);
    broadcastPlayers();
  });

  socket.on("player:move", (data) => {
    const player = players.get(socket.id);
    if (!player) return;
    const x = Number(data && data.x);
    const y = Number(data && data.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    player.x = Math.max(4, Math.min(96, x));
    player.y = Math.max(18, Math.min(94, y));
    player.direction = clean(data.direction, 8) || "down";
    socket.broadcast.volatile.emit("player:moved", {
      id: socket.id, x: player.x, y: player.y, direction: player.direction
    });
  });

  socket.on("chat:class", (raw) => {
    const player = players.get(socket.id); if (!player) return;
    const message = clean(raw, 180); if (!message) return;
    for (const [id, other] of players) if (other.classroom.toLowerCase() === player.classroom.toLowerCase()) {
      io.to(id).emit("chat:class", { name: player.name, classroom: player.classroom, message });
    }
  });

  socket.on("private:request", (targetId) => {
    const from = players.get(socket.id), target = players.get(String(targetId));
    if (!from || !target || target.id === socket.id) return;
    pendingPrivate.set(target.id, socket.id);
    io.to(target.id).emit("private:incoming", { from: socket.id, name: from.name, classroom: from.classroom });
  });
  socket.on("private:answer", (data) => {
    const fromId = String(data && data.from || ""), requester = players.get(fromId), target = players.get(socket.id);
    if (!requester || !target || pendingPrivate.get(socket.id) !== fromId) return;
    pendingPrivate.delete(socket.id);
    if (data.accept === true) {
      activePrivate.add(pairKey(fromId, socket.id));
      io.to(fromId).emit("private:accepted", { peer: socket.id });
      io.to(socket.id).emit("private:accepted", { peer: fromId });
    } else io.to(fromId).emit("private:declined");
  });
  socket.on("chat:private", (data) => {
    const message = clean(data && data.message, 180), to = String(data && data.to || "");
    if (!message || !players.has(to) || !activePrivate.has(pairKey(socket.id, to))) return;
    const sender = players.get(socket.id);
    const payload = { from: socket.id, to, name: sender.name, message };
    io.to(socket.id).emit("chat:private", payload); io.to(to).emit("chat:private", payload);
  });

  socket.on("chat:send", (raw) => {
    const player = players.get(socket.id);
    if (!player) return;
    const message = clean(raw, 180);
    if (!message) return;
    io.emit("chat:message", {
      id: socket.id, name: player.name, classroom: player.classroom,
      message, time: new Date().toISOString()
    });
  });

  socket.on("player:action", (action) => {
    const player = players.get(socket.id);
    if (!player) return;
    const allowed = ["wave", "jump", "photo", "hug", "highfive"];
    if (!allowed.includes(action)) return;
    io.emit("player:action", { id: socket.id, action });
  });

  socket.on("disconnect", () => {
    const player = players.get(socket.id);
    if (player) {
      players.delete(socket.id);
      pendingPrivate.delete(socket.id);
      for (const [id, from] of pendingPrivate) if (from === socket.id) pendingPrivate.delete(id);
      for (const pair of [...activePrivate]) if (pair.split(":").includes(socket.id)) activePrivate.delete(pair);
      io.emit("system:message", `${player.name} đã rời sân trường.`);
      broadcastPlayers();
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Hai Dong online game listening on ${PORT}`);
});
