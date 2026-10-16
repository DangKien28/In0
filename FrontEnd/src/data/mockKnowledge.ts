// Mock Knowledge base until the In0 backend exposes a documents API.
import type { SettingsDocumentGroup } from '../types/settings';

export const mockKnowledge: SettingsDocumentGroup = {
  systemDefault: [
    {
      id: 'kn-sys-01',
      title: 'Khung năng lực nhân sự IT tiêu chuẩn (IT Skills Taxonomy v2.0)',
      category: 'System Default',
      summary:
        'Quy chuẩn các nhóm kỹ năng Backend (Golang, Python, Java), Frontend (React, Vue, TypeScript), DevOps (Docker, K8s, CI/CD).',
      updatedAt: 'Hệ thống thiết lập',
      readOnly: true,
    },
    {
      id: 'kn-sys-02',
      title: 'Mẫu cấu trúc Job Description chuẩn hóa của doanh nghiệp',
      category: 'System Default',
      summary:
        'Quy định 6 mục bắt buộc trong mọi bài đăng tuyển: Vị trí, Giới thiệu công ty, Trách nhiệm, Yêu cầu, Quyền lợi, Địa điểm.',
      updatedAt: 'Hệ thống thiết lập',
      readOnly: true,
    },
  ],
  userCustom: [
    {
      id: 'kn-user-01',
      title: 'Văn hóa doanh nghiệp & Quy tắc phỏng vấn 2026',
      category: 'Tài liệu nội bộ',
      summary:
        'Tài liệu đào tạo phỏng vấn viên, câu hỏi sàng lọc văn hóa và thang đo giá trị cốt lõi.',
      fileName: 'Culture_and_Interview_Guide_2026.pdf',
      content:
        'Doanh nghiệp ưu tiên tinh thần tự chủ (ownership), khả năng thích ứng linh hoạt và giao tiếp minh bạch...',
      updatedAt: '28/09/2026 14:20',
      readOnly: false,
    },
  ],
};
