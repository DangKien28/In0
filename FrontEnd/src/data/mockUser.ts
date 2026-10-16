// Mock signed-in user until authentication is connected to the backend.
import type { CurrentUser } from '../types/common';

export const mockCurrentUser: CurrentUser = {
  name: 'Lê Thu Hà',
  title: 'Chuyên viên Nhân sự & Tuyển dụng (HR Talent Lead)',
  shortRole: 'Chuyên viên HR Talent',
  role: 'HR Specialist / HITL Approver',
  email: 'ha.lethu@company.vn',
  department: 'Phòng Nhân sự & Văn hóa doanh nghiệp',
  phone: '0912 345 678',
  initials: 'TH',
};
