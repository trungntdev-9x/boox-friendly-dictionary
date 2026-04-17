# Boox to Ankidroid - Project Tasks

Đây là danh sách các task cần thiết để hoàn thành ứng dụng PWA chuyển đổi định dạng từ vựng Boox sang AnkiDroid. 
Trạng thái: `[ ]` (Chưa hoàn thành), `[~]` (Đang tiến hành), `[x]` (Đã hoàn thành).

- [x] **Task 1**: Khởi tạo project React. (Tạo thư mục `boox-to-anki`, dùng Vite `npm create vite@latest boox-to-anki -- --template react`, `npm install`). 
- [x] **Task 2**: Thiết lập thiết kế cơ sở UI (CSS System). Tạo `index.css` sử dụng biến (CSS Variables) để có giao diện hiện đại, ưu tiên Mobile, có hỗ trợ Glassmorphism/Dark mode.
- [x] **Task 3**: Xây dựng Core Logic `booxParser.js`. Trích xuất các thông tin `{word, dictionary, definition}` từ file text của BOOX.
- [x] **Task 4**: Xây dựng UI Component `FileUploader`. Xử lý đọc file text trên trình duyệt (FileReader API).
- [x] **Task 5**: Xây dựng UI Component `DictionarySelector` (Multi-select) & `WordList` (cho phép edit/add màn hình).
- [x] **Task 6**: Xây dựng logic `exportAnki.js`. Xuất ra định dạng chuẩn `CSV` hoặc `TXT` key:value và kích hoạt File Download.
- [x] **Task 7**: Cấu hình PWA qua `vite-plugin-pwa` để app có thể cài đặt offline trên điện thoại.
- [x] **Task 8**: Polish UI/UX. Thêm micro-interactions giúp ứng dụng tạo cảm giác "wow" và hoàn thiện.
