# Hải Đông – Hội ngộ bạn cũ (multiplayer)

Đây là mã nguồn web game nhiều người chơi đồng thời cho điện thoại và máy tính.

## Tính năng trong bản đầu
- Đăng ký tên và lớp trước khi vào sân trường.
- Nhìn thấy người chơi đang online và vị trí của họ cập nhật theo thời gian thực.
- Chat chung giữa tất cả người chơi.
- Điều khiển bằng WASD/phím mũi tên trên PC hoặc nút trên điện thoại.
- Vẫy tay, nhảy, chụp ảnh dạng thông báo trong game.
- Máy chủ Node.js + Socket.IO; tối đa 100 người chơi đồng thời theo cấu hình mặc định.

## Chạy thử trên máy tính
Cần cài Node.js 18 trở lên.
1. Giải nén ZIP.
2. Mở Terminal/CMD trong thư mục dự án.
3. Chạy `npm install`
4. Chạy `npm start`
5. Mở `http://localhost:3000` trên Chrome/Edge.

## Đưa lên Internet để cả lớp cùng chơi
Cách đơn giản: dùng Render.
1. Tạo tài khoản Render và một GitHub repository mới.
2. Đưa toàn bộ nội dung thư mục này lên repository.
3. Trong Render chọn New > Web Service, kết nối repository.
4. Build command: `npm install`
5. Start command: `npm start`
6. Deploy, sau đó lấy URL `https://...onrender.com` gửi vào nhóm lớp.

Có sẵn `render.yaml` để hỗ trợ cấu hình Blueprint nếu muốn dùng.

## Lưu ý
- Đây là bản nền multiplayer đầu tiên, chưa có tài khoản/mật khẩu, lưu lịch sử chat, kiểm duyệt nâng cao hay cơ sở dữ liệu lâu dài.
- Tên/lớp và vị trí chỉ tồn tại trong bộ nhớ máy chủ; khi máy chủ khởi động lại, danh sách online được làm mới.
- Không nhập thông tin cá nhân nhạy cảm. Nên dùng tên hiển thị phù hợp.
- Mã nguồn đã chuẩn bị nhưng chưa được triển khai lên hosting; cần chủ tài khoản thực hiện bước deploy để có đường link công khai.
