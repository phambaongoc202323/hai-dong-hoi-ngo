# Hải Đông 3D – Hội ngộ bạn cũ

Bản nâng cấp giao diện 3D cho game Hải Đông, tiếp tục dùng Node.js + Express + Socket.IO để giữ khả năng chơi nhiều người qua cùng một website.

## Tính năng
- Đăng nhập bằng tên hiển thị và lớp cũ.
- Người chơi thật đang online mới xuất hiện; không tạo học sinh ảo.
- Đồng bộ người chơi và chat chung theo thời gian thực.
- Sân trường, cổng trường, các dãy nhà, cây xanh, ghế đá và sân thể thao dựng bằng Three.js.
- Nhân vật 3D dạng người với đầu, mặt, tóc, thân, tay chân, giày và ba lô; chuyển động đi bộ/chạy, nhảy và vẫy tay.
- Góc nhìn thứ ba, xoay camera bằng chuột hoặc vuốt màn hình; điều khiển PC và điện thoại.
- Bản đồ nhỏ và danh sách người đang online.

## Cập nhật trên website Render đang có
1. Giải nén ZIP.
2. Mở thư mục dự án; chọn toàn bộ nội dung bên trong (README.md, index.html, package.json, render.yaml, school-bg.jpg, server.js).
3. Vào GitHub repository đang nối với dịch vụ Render. Chọn Add file → Upload files.
4. Kéo các file/thư mục từ bên trong dự án vào trang upload. Nếu GitHub báo file đã tồn tại, hãy xác nhận thay thế bằng bản mới.
5. Commit changes vào nhánh main. Render sẽ tự nhận commit mới và deploy lại nếu Auto-Deploy đang bật.
6. Chờ trạng thái Live/Succeeded rồi mở lại đúng URL Render cũ. Nếu trình duyệt còn bản cũ, tải lại mạnh Ctrl+F5 hoặc mở tab ẩn danh.

**Quan trọng:** Không tạo Web Service mới và không xóa repository cũ. Cập nhật đúng repository đang kết nối với dịch vụ Render hiện tại để giữ URL website cũ.

## Chạy thử trên máy tính
Cần Node.js 18 trở lên. Trong thư mục dự án chạy `npm install`, sau đó `npm start`, rồi mở `http://localhost:3000`.

## Giới hạn hiện tại
Đây là bước nâng cấp 3D nền, chưa phải đồ họa AAA/photorealistic. Nhân vật được dựng bằng hình khối 3D chi tiết hơn, chưa dùng model người quét 3D/động tác mocap. Khuôn viên vẫn cần tiếp tục đo đạc và dựng chi tiết theo ảnh/video thực tế của trường. Âm nhạc bản quyền trong video chưa được nhúng; chỉ nên thêm file nhạc mà bạn có quyền sử dụng.

Máy chủ hiện lưu trạng thái người chơi trong bộ nhớ; khi server khởi động lại, danh sách online được làm mới. Không nhập thông tin cá nhân nhạy cảm.
