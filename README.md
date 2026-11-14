# Hải Đông 3D – Bản thử nâng cấp

Bản thử multiplayer chạy trên trình duyệt, dùng Three.js để dựng sân trường 3D và Socket.IO để đồng bộ người chơi.

## Đã có trong bản thử
- Đăng nhập bằng họ tên và lớp.
- Sân trường 3D có cổng, các dãy nhà, sân, cây xanh, bồn hoa và ghế đá.
- Nhân vật 3D tự dựng; người chơi chỉ xuất hiện khi thực sự đăng nhập.
- Di chuyển bằng WASD/phím mũi tên hoặc joystick trên điện thoại; kéo để xoay camera.
- Chat toàn trường, chat theo lớp, thanh nhóm chat có thể thu gọn.
- Danh sách người đang online; gửi lời mời chat riêng. Chỉ mở chat riêng khi cả hai bên đồng ý.
- Hành động chào, nhảy, ôm, bắt tay, chụp ảnh.

## Chạy thử trên máy
Yêu cầu Node.js 18 trở lên.

```bash
npm install
npm start
```
Mở `http://localhost:3000`.

## Cập nhật website Render hiện tại
1. Giải nén ZIP.
2. Vào GitHub repository `hai-dong-hoi-ngo`.
3. Upload và ghi đè các file cùng tên trong thư mục dự án: `server.js`, `README.md`, `package.json`, `render.yaml`, và thư mục `public` (gồm `index.html`, `school-bg.jpg`).
4. Commit changes. Render sẽ tự deploy nếu Auto-Deploy đang bật.
5. Mở URL Render cũ để kiểm tra.

Lưu ý: Đây là bản prototype 3D bằng mô hình hình học trong Three.js, chưa phải đồ họa người thật quét 3D. Chat và trạng thái online lưu trong RAM; khi server khởi động lại sẽ mất lịch sử chat. Nhạc trường học chưa được thêm vì cần tệp nhạc mà bạn có quyền sử dụng.
