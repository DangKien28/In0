// End-to-end demo scenario: Hệ thống A ➔ In0 ➔ Hệ thống B.
// Mock data until the In0 backend exposes the agent execution API.
import type { PlanStep } from '../types/plan';
import type { Candidate, PassCandidate } from '../types/recruitment';

export const scenarioInitialPrompt =
  'In0 ơi, hãy giúp tôi đăng bài tuyển dụng Senior Frontend React lên Hệ thống A. Sau khi ứng viên nộp hồ sơ, tự động lọc CV, chấm điểm và gợi ý cho tôi 3 ứng viên tốt nhất để gửi email mời phỏng vấn. Khi có ứng viên pass, hãy thêm hồ sơ vào Hệ thống B nhé!';

export const scenarioPlanSteps: PlanStep[] = [
  {
    step: 1,
    task: 'Soạn thảo JD chuẩn & Xuất bản bài tuyển dụng lên Hệ thống A',
    inputMode: 'file',
    input:
      'Tệp mô tả yêu cầu vị trí Senior Frontend React (JD_Frontend_Draft.docx)',
    inputFile: 'JD_Frontend_Draft.docx',
    previousStepId: null,
    output: 'Job Post ID: #A-JOB-8942 trên Hệ thống A (TopCV ATS)',
    platform: 'Hệ thống A (Tuyển dụng)',
    status: 'done',
  },
  {
    step: 2,
    task: 'Nhận hồ sơ ứng viên từ Hệ thống A, OCR & Chấm điểm phù hợp CV',
    inputMode: 'previous_output',
    input: 'Bài đăng tuyển dụng đã xuất bản (Job Post ID: #A-JOB-8942)',
    inputFile: null,
    previousStepId: 1,
    output: 'Bảng phân tích đánh giá 5 ứng viên (Evidence Chain & Match Score)',
    platform: 'In0 AI Engine',
    status: 'done',
  },
  {
    step: 3,
    task: 'HR phê duyệt danh sách ứng viên đạt yêu cầu (HITL)',
    inputMode: 'previous_output',
    input: 'Báo cáo xếp hạng điểm số (Top 3 ứng viên có điểm >= 75%)',
    inputFile: null,
    previousStepId: 2,
    output:
      'Danh sách 3 ứng viên được chọn: Lê Quốc H., Nguyễn Thùy T., Trần Hoàng N.',
    platform: 'HR & In0 HITL',
    status: 'current',
  },
  {
    step: 4,
    task: 'Tự động gửi email mời phỏng vấn có nội dung cá nhân hóa',
    inputMode: 'previous_output',
    input: 'Danh sách 3 ứng viên đã được duyệt từ Bước 3',
    inputFile: null,
    previousStepId: 3,
    output: '3 Email mời phỏng vấn gửi qua SendGrid SMTP Gateway',
    platform: 'Email Delivery Gateway',
    status: 'pending',
  },
  {
    step: 5,
    task: 'Thêm ứng viên PASS phỏng vấn vào hồ sơ nhân viên Hệ thống B',
    inputMode: 'text',
    input:
      'Thông tin ứng viên trúng tuyển Lê Quốc H. (Pass Technical Interview)',
    inputFile: 'Danh_Gia_Phong_Van_LeQuocHuy.pdf',
    previousStepId: null,
    output: 'Mã nhân viên mới EMP-2026-089 tạo trên Hệ thống B (HRM)',
    platform: 'Hệ thống B (Core HRM)',
    status: 'pending',
  },
];

/** Minimum match score for a candidate to be pre-selected for interview. */
export const QUALIFIED_SCORE = 75;

export const scenarioCandidates: Candidate[] = [
  {
    id: 'C01',
    name: 'Lê Quốc Huy',
    email: 'huy.lequoc@example.com',
    phone: '0905 123 456',
    score: 94,
    experience: '4 năm kinh nghiệm ReactJS, TypeScript, Next.js',
    skills: ['React', 'TypeScript', 'Redux Toolkit', 'TailwindCSS', 'Jest'],
    strengths:
      'Đã làm Tech Lead Frontend dự án FinTech 2 năm; tối ưu hiệu năng web 40%.',
    evidence:
      "CV mục 'Kinh nghiệm dự án': 'Lead team 5 dev phát triển Portal Ngân hàng bằng Next.js SSR'",
  },
  {
    id: 'C02',
    name: 'Nguyễn Thùy Trang',
    email: 'trang.nguyen@example.com',
    phone: '0912 888 999',
    score: 88,
    experience: '3.5 năm Frontend Developer',
    skills: ['React', 'JavaScript ES6+', 'CSS3/SCSS', 'REST API', 'Figma'],
    strengths:
      'Nắm vững UI/UX, Component Design System, giao tiếp tiếng Anh tốt.',
    evidence:
      "CV mục 'Dự án chính': 'Xây dựng Design System dùng chung cho 4 ứng dụng web'",
  },
  {
    id: 'C03',
    name: 'Trần Hoàng Nam',
    email: 'nam.tran@example.com',
    phone: '0977 456 789',
    score: 81,
    experience: '3 năm lập trình viên Frontend',
    skills: ['React', 'Vue.js', 'TypeScript', 'Node.js cơ bản'],
    strengths: 'Có kiến thức Fullstack nhẹ, tư duy giải quyết vấn đề tốt.',
    evidence:
      "CV mục 'Kỹ năng': 'Phát triển micro-frontend với React & Module Federation'",
  },
  {
    id: 'C04',
    name: 'Phạm Minh Đức',
    email: 'duc.pham@example.com',
    phone: '0934 111 222',
    score: 62,
    experience: '1.5 năm kinh nghiệm Web Developer',
    skills: ['HTML/CSS', 'JavaScript', 'React cơ bản'],
    strengths: 'Nhiệt huyết, ham học hỏi nhưng thiếu kinh nghiệm Senior.',
    evidence:
      "CV mục 'Kinh nghiệm': 'Chủ yếu làm website WordPress và landing page đơn giản'",
  },
  {
    id: 'C05',
    name: 'Hoàng Gia Bảo',
    email: 'bao.hoang@example.com',
    phone: '0988 333 444',
    score: 55,
    experience: '2 năm làm Backend PHP/Laravel, mới chuyển sang React',
    skills: ['PHP', 'Laravel', 'MySQL', 'React mới học 3 tháng'],
    strengths:
      'Mạnh về cơ sở dữ liệu và API nhưng chưa đáp ứng yêu cầu Frontend Senior.',
    evidence: "CV mục 'Mục tiêu': 'Mong muốn tìm việc Junior React để học hỏi'",
  },
];

export const scenarioPassCandidate: PassCandidate = {
  name: 'Lê Quốc Huy',
  candidateId: 'C01',
  email: 'huy.lequoc@company.vn',
  personalEmail: 'huy.lequoc@example.com',
  phone: '0905 123 456',
  department: 'Khối Công nghệ & Sản phẩm (Tech Department)',
  position: 'Senior Frontend Engineer',
  roleLevel: 'L4 - Senior Specialist',
  startDate: '15/10/2026',
  salaryOffer: '32,000,000 VNĐ / tháng (Gross)',
  employeeId: 'EMP-2026-089',
  targetSystem: 'Hệ thống B (HRIS)',
};
