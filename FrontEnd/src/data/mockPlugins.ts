// Mock linked systems until the In0 backend exposes an integrations API.
// API keys are placeholders only; never commit real credentials here.
import type { Plugin, PluginGuide } from '../types/plugin';

export const mockPlugins: Plugin[] = [
  {
    id: 'sys-recruitment-a',
    name: 'Hệ thống A - Tuyển dụng (ATS / Job Board)',
    code: 'SYS_RECRUITMENT_A',
    type: 'recruitment',
    baseUrl: 'https://recruitment-system-a.api.in0.internal/v1',
    apiKey: 'demo-recruitment-a-key',
    webhookUrl: 'https://api.in0.ai/webhooks/sys-a-candidate-apply',
    description:
      'Hệ thống đăng bài tuyển dụng, nhận hồ sơ CV ứng tuyển tự động qua webhook.',
    configured: true,
  },
  {
    id: 'sys-hrm-b',
    name: 'Hệ thống B - Quản lý nhân sự (HRIS / Core HRM)',
    code: 'SYS_HRM_B',
    type: 'hrm',
    baseUrl: 'https://hrm-corp-b.internal.net/api/v2',
    apiKey: 'demo-hrm-b-token',
    webhookUrl: 'https://api.in0.ai/webhooks/sys-b-employee-sync',
    description:
      'Hệ thống quản lý dữ liệu nhân viên, hồ sơ nhân sự, phòng ban, và hợp đồng lao động.',
    configured: true,
  },
  {
    id: 'sys-email-smtp',
    name: 'Email Delivery Gateway (SendGrid / In0 Mail)',
    code: 'SYS_EMAIL',
    type: 'email',
    baseUrl: 'smtp://smtp.sendgrid.net:587',
    apiKey: 'demo-email-gateway-key',
    webhookUrl: 'https://api.in0.ai/webhooks/email-delivery-events',
    description:
      'Gửi email tự động mời phỏng vấn, thư cảm ơn, và thông báo kết quả tuyển dụng.',
    configured: true,
  },
  {
    id: 'sys-google-workspace',
    name: 'Google Workspace & Meet (Mô phỏng)',
    code: 'SYS_WORKSPACE',
    type: 'productivity',
    baseUrl: 'https://www.googleapis.com',
    apiKey: '',
    webhookUrl: '',
    description:
      'Mô phỏng đồng bộ lịch phỏng vấn và tài khoản Google Workspace cho nhân viên mới.',
    configured: false,
  },
];

export const pluginGuides: Record<string, PluginGuide> = {
  'sys-recruitment-a': {
    title: '3 bước kết nối Hệ thống A (Tuyển dụng ATS)',
    steps: [
      {
        title: 'Truy cập cổng quản trị ATS',
        description:
          'Đăng nhập tài khoản quản trị ATS, vào mục Cài đặt hệ thống > Tích hợp API & Khóa bảo mật.',
      },
      {
        title: 'Lấy Base URL & API Key',
        description:
          'Tạo Secret Token mới với quyền Đọc/Ghi tin tuyển dụng và tự động nhận CV ứng viên.',
      },
      {
        title: 'Dán cấu hình & Kiểm tra',
        description:
          "Dán thông tin vào biểu mẫu bên dưới, bấm 'Kiểm tra kết nối' rồi 'Lưu kết nối'.",
      },
    ],
  },
  'sys-hrm-b': {
    title: '3 bước kết nối Hệ thống B (Quản trị nhân sự HRIS)',
    steps: [
      {
        title: 'Mở cấu hình Core HRM',
        description:
          'Đăng nhập trang quản trị BambooHR/Base HRM, vào mục Quản trị nhân sự > REST API.',
      },
      {
        title: 'Cấp quyền ghi Onboarding',
        description:
          'Tạo Bearer Token với quyền tạo mới hồ sơ nhân sự (Employee Provisioning) và phòng ban.',
      },
      {
        title: 'Điền API URL & Lưu',
        description:
          "Điền Base API URL và Secret Token vào biểu mẫu dưới đây, sau đó bấm 'Lưu kết nối'.",
      },
    ],
  },
  'sys-email-smtp': {
    title: '3 bước kết nối Cổng Email (SendGrid / SMTP)',
    steps: [
      {
        title: 'Tạo API Key SendGrid',
        description:
          'Vào SendGrid Console > Settings > API Keys, tạo khóa có quyền Mail Send Full Access.',
      },
      {
        title: 'Xác thực Sender Identity',
        description:
          'Đảm bảo địa chỉ email gửi thư (ví dụ hr@company.vn) đã được xác minh SPF/DKIM.',
      },
      {
        title: 'Dán mã & Kiểm tra',
        description:
          "Dán chuỗi khóa bắt đầu bằng SG... vào ô API Key và bấm 'Kiểm tra kết nối'.",
      },
    ],
  },
  'sys-google-workspace': {
    title: '3 bước kết nối Google Workspace & Drive',
    steps: [
      {
        title: 'Bật API Google Cloud',
        description:
          'Mở Google Cloud Console, kích hoạt dịch vụ Google Drive API và Google Calendar API.',
      },
      {
        title: 'Tạo Service Account',
        description:
          'Tạo tài khoản dịch vụ, cấp quyền vào thư mục lưu trữ tài liệu CV và tải thông tin xác thực.',
      },
      {
        title: 'Điền thông tin & Lưu',
        description:
          'Dán Endpoint và Secret Key vào biểu mẫu để In0 đồng bộ tài liệu tự động.',
      },
    ],
  },
};

export function getPluginGuide(plugin: Plugin | null): PluginGuide {
  if (plugin && pluginGuides[plugin.id]) {
    return pluginGuides[plugin.id];
  }

  return {
    title: `3 bước kết nối ${plugin ? plugin.name : 'hệ thống mới'}`,
    steps: [
      {
        title: 'Lấy khóa API từ hệ thống nguồn',
        description:
          'Đăng nhập phần mềm quản trị và tạo API Token / Secret Key.',
      },
      {
        title: 'Điền Base URL và Secret Token',
        description:
          'Nhập chính xác Endpoint URL và mã khóa bảo mật vào các ô bên dưới.',
      },
      {
        title: 'Kiểm tra và kích hoạt',
        description:
          "Bấm 'Kiểm tra kết nối (Test Ping)' và lưu để In0 tự động điều phối.",
      },
    ],
  };
}
