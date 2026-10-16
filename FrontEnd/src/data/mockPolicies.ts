// Mock company policies until the In0 backend exposes a documents API.
import type { SettingsDocumentGroup } from '../types/settings';

export const mockPolicies: SettingsDocumentGroup = {
  systemDefault: [
    {
      id: 'pol-sys-01',
      title:
        'Chính sách bảo vệ dữ liệu cá nhân ứng viên (GDPR & Nghị định 13/2023/NĐ-CP)',
      category: 'System Default',
      summary:
        'Nghiêm cấm trích xuất thông tin nhạy cảm (tôn giáo, tình trạng hôn nhân, tài chính cá nhân) làm tiêu chí loại trừ.',
      updatedAt: 'Hệ thống thiết lập',
      readOnly: true,
    },
    {
      id: 'pol-sys-02',
      title:
        'Quy định Human-in-the-Loop bắt buộc đối với quyết định tuyển dụng',
      category: 'System Default',
      summary:
        'AI tuyệt đối không được tự động gửi thư từ chối hoặc gửi offer tuyển dụng nếu chưa có sự phê duyệt tường minh từ HR.',
      updatedAt: 'Hệ thống thiết lập',
      readOnly: true,
    },
  ],
  userCustom: [
    {
      id: 'pol-user-01',
      title:
        'Khung trần ngân sách lương & Điều kiện tuyển dụng Capstone Intern 2026',
      category: 'Chính sách công ty',
      summary:
        'Mức phụ cấp thực tập sinh tối đa 8.000.000 VNĐ. Điểm đánh giá CV phải đạt tối thiểu 70/100 mới được gửi thư mời phỏng vấn.',
      fileName: 'Chinh_Sach_Luong_Intern_2026.docx',
      content:
        'Quy định: 1. Ngân sách intern dev tối đa 8tr/tháng. 2. Điểm CV Match Score >= 70% mới được vào vòng phỏng vấn. 3. Mọi xung đột vượt ngân sách phải báo cáo HR Director.',
      updatedAt: '30/09/2026 09:15',
      readOnly: false,
    },
  ],
};
