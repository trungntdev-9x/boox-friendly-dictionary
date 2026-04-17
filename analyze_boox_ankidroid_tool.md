# Kế hoạch & Phân tích Công cụ Chuyển đổi BOOX Vocabulary sang AnkiDroid

## 1. Tổng quan Dự án (Project Overview)
Xây dựng một công cụ web dưới dạng **Progressive Web Application (PWA)**, với phương châm thiết kế **Mobile First**. Công cụ này sẽ giúp người dùng đọc các file lịch sử từ vựng xuất ra từ máy đọc sách BOOX, xử lý dữ liệu từ các từ điển, và xuất ra các định dạng chuẩn (CSV, TXT key:value) thân thiện để import trực tiếp vào AnkiDroid.

### Lý do chọn PWA & Mobile First
- Người dùng thường lấy file txt từ điện thoại/Boox nên một web app hoạt động tốt trên thiết bị di động với khả năng cài đặt offline (PWA) là phương án tối ưu nhất. Không cần cài đặt cồng kềnh qua các kho ứng dụng.
- Giao diện tối giản, các nút chọn thân thiện với môi trường cảm ứng.

## 2. Phân tích Dữ liệu Đầu vào & Đầu ra

### Dữ liệu Đầu vào (Input)
Dựa trên file mẫu từ công cụ BOOX (`Tất cả từ mới_...txt`), cấu trúc file điển hình như sau:
- Dòng 1-2: Header giới thiệu và ngày tháng.
- Các block từ vựng được ngăn cách bởi dòng `--------------------------------------------------`.
- Mỗi block bao gồm:
  - Tên từ vựng (Ví dụ: `triumphs`)
  - Tên từ điển (Ví dụ: `AnhViet`)
  - Nội dung định nghĩa (Ví dụ: `@triumph /'traiəmf/ * danh từ...`)

### Dữ liệu Đầu ra (Output)
Công cụ cần hỗ trợ 2 định dạng xuất cho AnkiDroid:
1. **CSV Format**: Định dạng bảng tiêu chuẩn. Cột 1: Từ vựng (Front), Cột 2: Nghĩa của từ (Back). (Có thể dùng ký tự phân cách như phẩy hoặc tab).
2. **Key:Value Format (.txt)**: Dạng text thuần `từ vựng:định nghĩa`.

## 3. Các tính năng cốt lõi (Core Features)

1. **Module Tải File (File Upload)**: 
   - Nút chọn tập tin đơn giản hỗ trợ file `.txt`. Đọc nội dung file phía Native Client (trình duyệt) mà không cần gửi lên server để đảm bảo tốc độ và quyền riêng tư (sử dụng HTML5 `FileReader` API).
2. **Parser Engine (Bộ xử lý cấu trúc file BOOX)**: 
   - Parse các file text, trích xuất dữ liệu thành danh sách các Object: `{ word: "triumph", dictionary: "AnhViet", definition: "..." }`.
3. **Giao diện tùy chọn Từ điển (Dictionary Selection)**: 
   - **Multi-select**: Sau khi parse, hệ thống sẽ gom nhóm các từ điển có trong file. Người dùng có thể tick chọn bỏ/giữ lại các định nghĩa đến từ những từ điển nào đó.
   - **Manual Add (Thêm thủ công)**: Cho phép người dùng chỉnh sửa nhanh định nghĩa của một từ, hoặc gõ thêm các từ mới không nằm trong danh sách.
4. **Module Xuất dữ liệu (Export Module)**: 
   - Option để chọn giữa định dạng `txt` hoặc `csv`.
   - Tạo file ngay tại browser và trigger lệnh tải xuống tự động.

## 4. Kiến trúc Công nghệ (Technology Stack)

- **Core**: React JS (Khởi tạo bằng Vite) + Vanilla CSS. Giao diện ưu tiên sử dụng thiết kế kính (Glassmorphism), Dark/Light mode hiện đại.
- **PWA**: Cấu hình `manifest.json` và Service Worker (thông qua `vite-plugin-pwa`) để có tính năng "Add to Home Screen" trên điện thoại và khả năng hoạt động offline.
- **State Management**: Sử dụng React Hooks (useState, useReducer hoặc Context API) cho việc quản lý danh sách từ và bộ lọc.

## 5. Tiến trình Thực hiện (Implementation Plan)

- **Giai đoạn 1**: Khởi tạo project React bằng Vite, setup các file CSS chuẩn mực, khai báo PWA manifest.
- **Giai đoạn 2**: Xây dựng UI chính (Kéo thả/chọn file, Layout Mobile).
- **Giai đoạn 3**: Viết logic Javascript để Parse file xuất BOOX.
- **Giai đoạn 4**: Xây dựng UI cho phép kiểm tra, chỉnh sửa từ và chọn từ điển (Multiselect).
- **Giai đoạn 5**: Hoàn tất logic Export ra CSV/TXT và tải file về máy.
- **Giai đoạn 6**: Hoàn thiện UI/UX (Animations, màu sắc hiện đại cho phù hợp định hướng sản phẩm chất lượng cao).

Bạn có muốn tôi bắt đầu khởi tạo dự án React (Vite) ở trong một thư mục mới tại ổ `C:\Users\sstor\Documents\boox-dictionary\` luôn không?
