// Mock chat content until the In0 backend exposes a conversation API.
import type { ChatHistoryGroup, ChatMessage } from '../types/chat';
import type { AppNotification } from '../types/common';

import { scenarioInitialPrompt } from './mockScenario';

export const chatHistory: ChatHistoryGroup[] = [
  {
    group: 'Hôm nay',
    items: [
      {
        id: 'chat-today-1',
        title: 'Sàng lọc 5 CV Senior Frontend & Mời phỏng vấn',
        time: '14:32',
        workId: 'work-401',
      },
      {
        id: 'chat-today-2',
        title: 'Đẩy hồ sơ nhân viên trúng tuyển sang Hệ thống B',
        time: '11:15',
        workId: 'work-301',
      },
    ],
  },
  {
    group: 'Hôm qua',
    items: [
      {
        id: 'chat-yesterday-1',
        title: 'Đăng tuyển vị trí Marketing Lead lên Hệ thống A',
        time: '16:40',
        workId: 'work-201',
      },
      {
        id: 'chat-yesterday-2',
        title: 'Soạn thảo câu hỏi phỏng vấn vị trí Golang',
        time: '09:20',
        workId: 'work-101',
      },
    ],
  },
  {
    group: '7 ngày trước',
    items: [
      {
        id: 'chat-lastweek-1',
        title: 'Tổng kết đánh giá ứng viên kỳ Internship Q3',
        time: '24/09/2026',
        workId: 'work-102',
      },
    ],
  },
];

export const PLAN_REVIEW_TEXT =
  'Chào Thu Hà! Tôi đã tiếp nhận yêu cầu và lập kế hoạch thực thi 5 bước tự động hóa kết hợp phê duyệt HITL. Bạn có thể xem tóm tắt kế hoạch bên dưới hoặc mở xem chi tiết để tinh chỉnh trước khi chạy:';

/** Conversation shown when the chat is opened on the demo WORK. */
export const defaultChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: scenarioInitialPrompt,
    timestamp: '14:20',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: PLAN_REVIEW_TEXT,
    timestamp: '14:21',
    kind: 'plan_review',
  },
  {
    id: 'msg-3',
    role: 'assistant',
    lead: '✅ Bước 1 hoàn thành:',
    content:
      'Đã xuất bản tin tuyển dụng vị trí Senior Frontend React lên Hệ thống A (Job Post #A-JOB-8942).',
    timestamp: '14:22',
    kind: 'artifact',
    artifact: {
      stepIndex: 0,
      title: 'Tin tuyển dụng: Senior Frontend React Engineer',
      badge: 'Đã xuất bản (Hệ thống A)',
      icon: 'briefcase',
      summary:
        '📍 Đà Nẵng / Remote • 💰 Mức lương: 28,000,000 - 38,000,000 VNĐ • 📅 Hạn nộp: 30/10/2026',
    },
  },
  {
    id: 'msg-4',
    role: 'assistant',
    lead: '🎯 Bước 2 & 3:',
    content:
      'Đã thu thập 5 hồ sơ CV từ webhook Hệ thống A và hoàn thành chấm điểm, trích dẫn bằng chứng. Có 3 ứng viên xuất sắc đạt trên 80% điểm phù hợp. Cần bạn duyệt danh sách trước khi gửi thư mời phỏng vấn.',
    timestamp: '14:23',
    kind: 'artifact',
    artifact: {
      stepIndex: 2,
      title: 'Bảng xếp hạng 5 CV & Phê duyệt HITL',
      badge: 'Chờ HR Duyệt',
      icon: 'user-check',
      summary:
        '3 ứng viên đạt chuẩn (Lê Quốc Huy 94%, Nguyễn Thùy Trang 88%, Trần Hoàng Nam 81%) • 2 ứng viên chưa đạt',
      requiresApproval: true,
    },
  },
];

export const quickSuggestions = [
  {
    label: 'Duyệt 3 ứng viên',
    message: 'Duyệt 3 ứng viên và gửi email mời phỏng vấn',
  },
  {
    label: 'Đồng bộ sang Hệ thống B',
    message: 'Đồng bộ ứng viên pass sang Hệ thống B',
  },
  {
    label: 'Thêm bước phỏng vấn',
    message: 'Thêm 1 bước phỏng vấn tiếng Anh vào kế hoạch',
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-approval',
    tone: 'approval',
    title: 'Chờ duyệt: 3 ứng viên Senior Frontend',
    description:
      'In0 đã hoàn thành chấm điểm CV từ Hệ thống A. Cần HR duyệt trước khi gửi email.',
    action: 'open-approval',
  },
  {
    id: 'notif-conflict',
    tone: 'conflict',
    title: 'Xung đột: Đồng bộ nhân viên Trần Văn B',
    description: 'Trùng mã nhân viên trên Hệ thống B (HRIS).',
    action: 'open-work-list',
  },
];
