# Workflow: Implement Project Task
Description: Hướng dẫn AI (Antigravity proxy) cách thực thi và cập nhật một task cụ thể từ danh sách công việc.

## Hướng dẫn thực thi:

1.  **Đọc task list**: 
    - Đọc file `c:\Users\sstor\Documents\boox-dictionary\todo_tasks.md` bằng công cụ `view_file`.
    - Tìm task đầu tiên có trạng thái `[ ]` (Chưa hoàn thành).

2.  **Đánh dấu đang thực hiện**:
    - Dùng công cụ `replace_file_content` để đổi trạng thái của task vừa tìm thấy từ `[ ]` sang `[~]` (Đang thực hiện).

3.  **Thực thi Task**:
    - Dự đoán các tác vụ nhỏ (sub-tasks) cần thiết cho task này (chạy lệnh termnial bằng `run_command`, tạo file mới bằng `write_to_file` hoặc cập nhật file bằng `replace_file_content`).
    - Thực hiện lần lượt tất cả các nghiệp vụ kỹ thuật để hoàn thành đầy đủ yêu cầu của task đó.
    - Đảm bảo tuân thủ thiết kế "Mobile First", "Premium & Rich Aesthetics" (nếu là task về giao diện UI/UX).
    - Chủ động viết Unit test đơn giản nếu là task về logic như Parser/Exporter.

4.  **Kiểm tra và Cập nhật trạng thái**:
    - Sau khi bạn đã làm xong hoàn toàn mọi góc độ của task, hãy dùng `replace_file_content` ghi đè trạng thái trong file `todo_tasks.md` từ `[~]` thành `[x]`.

5.  **Báo cáo**: 
    - Phản hồi ngắn gọn lại trong đoạn chat cho User báo cáo về thành quả công việc đã thực hiện thành công và sẵn sàng để chạy task tiếp theo.

## Khi bắt đầu:
- Dùng `view_file` với tham số `IsSkillFile: true` để khởi động logic này trong suy nghĩ của AI nếu hệ thống yêu cầu chạy workflow `implement_task`.
