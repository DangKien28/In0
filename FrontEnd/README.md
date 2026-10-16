# In0 Frontend

Giao diện web của **In0** – nền tảng AI Agent tự động hóa quy trình nhân sự (Capstone C1SE.41).
Giao diện được xây dựng theo template tham chiếu `frontend_13102026`.

## Công nghệ

- React 19 + TypeScript + Vite
- React Router (định tuyến), Context + `useReducer` (state)
- Tailwind CSS v4 qua `@tailwindcss/vite` (style theo template)
- `lucide-react` (icon), ESLint + Prettier

## Scripts

```bash
npm install          # cài dependency
npm run dev          # chạy dev server
npm run build        # type-check + build production
npm run lint         # ESLint
npm run format:check # kiểm tra Prettier
```

## Cấu trúc `src/`

| Thư mục       | Nội dung                                                                    |
| ------------- | --------------------------------------------------------------------------- |
| `routes/`     | `AppRoutes` và hằng số đường dẫn `paths`                                    |
| `pages/`      | Các trang: home, chat, work, plugins, agents, settings, help, profile, auth |
| `components/` | Component theo tính năng (`chat`, `preview`, `work`, ...) và `common`       |
| `context/`    | Provider: `ToastProvider`, `AppDataProvider`, `ChatFlowProvider`            |
| `hooks/`      | `useToast`, `useAppData`, `useChatFlow`, `useClickOutside`                  |
| `data/`       | Dữ liệu mẫu (mock) dùng tạm khi chưa có backend                             |
| `types/`      | Kiểu dữ liệu TypeScript dùng chung                                          |
| `styles/`     | Tailwind, design token và tiện ích CSS                                      |

## Trang chính

| Đường dẫn                                              | Màn hình                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| `/`                                                    | Trang chủ: banner, ô nhập yêu cầu, bảng tiến độ (swimlane)    |
| `/chat`                                                | Chat & thực thi WORK: Review Plan, Artifact panel, duyệt HITL |
| `/work`, `/work/:workId`                               | Danh sách WORK và chi tiết các bước thực thi                  |
| `/plugins`                                             | Phần mềm liên kết (drawer cấu hình kết nối)                   |
| `/agents`, `/agents/new`, `/agents/:agentId`           | Trợ lý AI và trang cấu hình + Plan Preview                    |
| `/settings`, `/settings/knowledge`, `/settings/policy` | Cài đặt Knowledge & Policy                                    |
| `/help`, `/profile`                                    | Trợ giúp & báo lỗi, thông tin cá nhân                         |
| `/welcome`, `/login`, `/reset-password`                | Màn hình chào mừng và xác thực                                |

## Lưu ý về backend

Chưa có API backend, nên toàn bộ dữ liệu lấy từ `src/data/` và được lưu **trong bộ nhớ**
(mất khi tải lại trang). Các phản hồi của In0 trong chat, nút "Kiểm tra kết nối", đăng nhập,
gửi email trợ giúp/báo lỗi đều là **mô phỏng phía frontend**. Khi tích hợp backend, thay thế
các hàm trong `context/AppDataProvider.tsx` và `context/ChatFlowProvider.tsx` bằng lời gọi API
(`axios` đã có sẵn trong dependency).
