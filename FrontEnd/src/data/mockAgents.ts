// Mock agents & workflows until the In0 backend exposes an agent API.
import type { Agent, AgentPlanStep, Workflow } from '../types/agent';

const FULL_RECRUITMENT =
  'Tuyển dụng & Onboarding Trọn Gói (Hệ thống A ➔ In0 ➔ Hệ thống B)';
const CV_SCREENING = 'Sàng lọc, OCR & Chấm điểm CV tự động';
const POST_JOB = 'Soạn thảo & Đăng bài tuyển dụng đa kênh';
const EMPLOYEE_SYNC = 'Chuyển giao hồ sơ trúng tuyển vào Core HRM (Hệ thống B)';

export const CUSTOM_WORKFLOW = 'custom';

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf-full-recruitment',
    name: FULL_RECRUITMENT,
    badge: 'Mặc định (Recommended)',
    description:
      'Đăng JD lên Hệ thống A, tự động sàng lọc & chấm điểm CV, gửi email phỏng vấn, và đồng bộ trúng tuyển sang Hệ thống B.',
    isDefault: true,
  },
  {
    id: 'wf-cv-screening-only',
    name: CV_SCREENING,
    badge: '',
    description:
      'Trích xuất kỹ năng từ CV, đối chiếu với tiêu chí JD và bảng chính sách nội bộ, tạo bảng xếp hạng và trích dẫn bằng chứng.',
    isDefault: false,
  },
  {
    id: 'wf-post-job-only',
    name: POST_JOB,
    badge: 'Nhanh',
    description:
      'Tạo JD chuẩn SEO theo chính sách công ty và gửi lệnh publish sang các Job Board (Hệ thống A).',
    isDefault: false,
  },
  {
    id: 'wf-new-employee-sync',
    name: EMPLOYEE_SYNC,
    badge: 'Onboarding',
    description:
      'Chuẩn hóa dữ liệu ứng viên đạt phỏng vấn, cấp mã nhân viên và đẩy vào hệ thống quản lý nhân sự B.',
    isDefault: false,
  },
];

/** Sample execution plans shown in "Plan Preview" for each workflow. */
const workflowPlanTemplates: Record<string, AgentPlanStep[]> = {
  [FULL_RECRUITMENT]: [
    {
      step: 1,
      task: 'Soạn thảo JD chuẩn SEO & Xuất bản bài tuyển dụng lên Hệ thống A',
      platform: 'Hệ thống A (Tuyển dụng)',
      input: 'Mô tả yêu cầu tuyển dụng từ HR (JD_Draft.docx)',
      output: 'Job Post ID: #A-JOB-8942 trên Hệ thống A (ATS)',
      type: 'Tự động hóa',
    },
    {
      step: 2,
      task: 'Thu thập hồ sơ ứng viên từ Webhook, OCR & Chấm điểm CV',
      platform: 'In0 AI Engine',
      input: '5 Hồ sơ CV ứng tuyển dạng PDF/Docx từ Hệ thống A',
      output:
        'Bảng phân tích đánh giá 5 ứng viên (Evidence Chain & Match Score)',
      type: 'Tự động hóa',
    },
    {
      step: 3,
      task: 'Đề xuất danh sách Top 3 ứng viên xuất sắc & Trình HR phê duyệt',
      platform: 'HR & In0 HITL',
      input: 'Bảng đối soát Evidence Chain và xếp hạng điểm số',
      output: 'Quyết định phê duyệt phỏng vấn từ HR (HITL Approval)',
      type: 'Phê duyệt HITL',
    },
    {
      step: 4,
      task: 'Soạn thảo & Gửi email mời phỏng vấn cá nhân hóa',
      platform: 'Email Gateway (SendGrid)',
      input: 'Danh sách ứng viên đã được HR phê duyệt',
      output: '3 email mời phỏng vấn tự động gửi kèm link Meet',
      type: 'Tự động hóa',
    },
    {
      step: 5,
      task: 'Đồng bộ hồ sơ trúng tuyển sang Core HRM (Hệ thống B)',
      platform: 'Hệ thống B (HRM)',
      input: 'Hồ sơ ứng viên PASS phỏng vấn và Offer Letter',
      output: 'Bản ghi nhân viên mới EMP-2026-089 kích hoạt Onboarding',
      type: 'Tự động hóa',
    },
  ],
  [CV_SCREENING]: [
    {
      step: 1,
      task: 'Thu thập hồ sơ CV từ Webhook hoặc Kho lưu trữ đám mây',
      platform: 'Hệ thống A (Tuyển dụng)',
      input: 'Danh sách CV ứng viên nộp qua cổng tuyển dụng',
      output: 'Kho 20 file CV PDF/Docx sẵn sàng phân tích',
      type: 'Tự động hóa',
    },
    {
      step: 2,
      task: 'OCR trích xuất kỹ năng, đối chiếu JD & Tính điểm Match Score',
      platform: 'In0 AI Engine',
      input: 'Tệp CV ứng viên và tiêu chuẩn JD tuyển dụng',
      output: 'Bảng ma trận năng lực + Trích dẫn chứng cứ từng ứng viên',
      type: 'Tự động hóa',
    },
    {
      step: 3,
      task: 'Rà soát xung đột tiêu chí & HR xác nhận danh sách phỏng vấn',
      platform: 'HR & In0 HITL',
      input: 'Báo cáo phân tích điểm số và phát hiện bất thường',
      output: 'Danh sách ứng viên Short-list được HR xác thực',
      type: 'Phê duyệt HITL',
    },
  ],
  [POST_JOB]: [
    {
      step: 1,
      task: 'Tiếp nhận yêu cầu tuyển dụng thô & Soạn thảo JD chuẩn SEO',
      platform: 'In0 AI Engine',
      input: 'Yêu cầu tuyển dụng sơ bộ từ phòng ban chuyên môn',
      output: 'Bản thảo JD chuẩn 6 mục và thang lương hợp chuẩn',
      type: 'Tự động hóa',
    },
    {
      step: 2,
      task: 'Kiểm tra Policy ngân sách lương trần và chính sách công ty',
      platform: 'HR & In0 HITL',
      input: 'Mức lương đề xuất và bảng chính sách Policy công ty',
      output: 'Xác nhận hợp lệ ngân sách từ HR Manager',
      type: 'Kiểm định Policy',
    },
    {
      step: 3,
      task: 'Gọi API xuất bản bài đăng tuyển đa kênh lên Hệ thống A',
      platform: 'Hệ thống A (Tuyển dụng)',
      input: 'JD đã được duyệt và cấu hình kênh đăng tin',
      output: 'Tin tuyển dụng Live trên ATS và các Job Board',
      type: 'Tự động hóa',
    },
  ],
  [EMPLOYEE_SYNC]: [
    {
      step: 1,
      task: 'Thu thập dữ liệu trúng tuyển, thông tin cá nhân và hợp đồng lao động',
      platform: 'In0 AI Engine',
      input: 'Hồ sơ ứng viên PASS phỏng vấn và Offer Letter',
      output: 'Dữ liệu nhân sự số hóa chuẩn hóa theo JSON Schema',
      type: 'Tự động hóa',
    },
    {
      step: 2,
      task: 'Kiểm tra trùng lặp mã nhân viên và cấp phát định danh EMP mới',
      platform: 'In0 AI Engine',
      input: 'Quy chuẩn mã nhân viên của doanh nghiệp',
      output: 'Mã định danh duy nhất (EMP-2026-xxx)',
      type: 'Tự động hóa',
    },
    {
      step: 3,
      task: 'Gọi API bảo mật HMAC đẩy bản ghi nhân sự vào Core HRM (Hệ thống B)',
      platform: 'Hệ thống B (HRM)',
      input: 'Payload nhân sự đã ký số HMAC-SHA256',
      output: 'Tài khoản nhân viên kích hoạt và quy trình Onboarding sẵn sàng',
      type: 'Tự động hóa',
    },
  ],
  [CUSTOM_WORKFLOW]: [
    {
      step: 1,
      task: 'Tiếp nhận dữ liệu đầu vào & Phân tích cấu trúc tác vụ',
      platform: 'In0 AI Engine',
      input: 'Yêu cầu chỉ đạo hoặc file đầu vào từ người dùng',
      output: 'Kế hoạch tác vụ số hóa sẵn sàng xử lý',
      type: 'Tự động hóa',
    },
    {
      step: 2,
      task: 'Tương tác và điều phối dữ liệu với Hệ thống đích',
      platform: 'Hệ thống A (Tuyển dụng)',
      input: 'Payload dữ liệu đã được xử lý',
      output: 'Kết quả phản hồi từ API hệ thống đích',
      type: 'Tự động hóa',
    },
    {
      step: 3,
      task: 'Tổng hợp kết quả, sinh Artifact báo cáo & Trình xác nhận',
      platform: 'HR & In0 HITL',
      input: 'Dữ liệu phản hồi từ các hệ thống liên kết',
      output: 'Báo cáo Artifact hoàn chỉnh và quyết định từ HR',
      type: 'Phê duyệt HITL',
    },
  ],
};

/** Returns a fresh copy of the sample plan for a workflow (custom as fallback). */
export function getPlanTemplateForWorkflow(
  workflowName: string,
): AgentPlanStep[] {
  const exact = workflowPlanTemplates[workflowName];
  const fuzzyKey = Object.keys(workflowPlanTemplates).find(
    (key) =>
      key !== CUSTOM_WORKFLOW &&
      workflowName !== '' &&
      (workflowName.includes(key) || key.includes(workflowName)),
  );
  const steps =
    exact ??
    (fuzzyKey
      ? workflowPlanTemplates[fuzzyKey]
      : workflowPlanTemplates[CUSTOM_WORKFLOW]);

  return steps.map((step) => ({ ...step }));
}

export const DEFAULT_AGENT_PROMPT =
  'Bạn là AI Agent chuyên trách trong hệ thống In0. Hãy tuân thủ nghiêm ngặt các chính sách bảo mật, kiểm định Policy công ty, và chỉ đạo của HR.';

export const mockAgents: Agent[] = [
  {
    id: 'agent-screening',
    name: 'CV Screener & Evaluator Agent',
    role: 'Chuyên gia sàng lọc CV',
    description:
      'Đọc file CV (PDF/Word), đối chiếu tiêu chí kỹ năng theo JD và tính điểm tương thích kèm trích dẫn dòng chứng cứ.',
    workflow: CV_SCREENING,
    promptTemplate:
      'Bạn là AI HR Assistant chuyên phân tích CV. Hãy đối chiếu kinh nghiệm làm việc, kỹ năng, chứng chỉ của ứng viên với JD. Đưa ra điểm từ 1-100 và chỉ rõ đoạn văn bản làm bằng chứng.',
    status: 'active',
    planSteps: getPlanTemplateForWorkflow(CV_SCREENING),
  },
  {
    id: 'agent-job-poster',
    name: 'Target-A Job Publisher Agent',
    role: 'Điều phối đăng tin Hệ thống A',
    description:
      'Nhận yêu cầu tuyển dụng thô từ HR, soạn thảo JD hoàn chỉnh chuẩn cấu trúc và gọi API Hệ thống A để xuất bản tin tuyển dụng.',
    workflow: POST_JOB,
    promptTemplate:
      'Soạn thảo JD với đầy đủ: Vị trí, Yêu cầu bắt buộc, Yêu cầu ưu tiên, Quyền lợi. Kiểm tra lương có vượt trần quy định của công ty hay không trước khi đẩy sang Hệ thống A.',
    status: 'active',
    planSteps: getPlanTemplateForWorkflow(POST_JOB),
  },
  {
    id: 'agent-email-dispatcher',
    name: 'Interview Email Composer',
    role: 'Soạn thảo email tuyển dụng',
    description:
      'Soạn email mời phỏng vấn cá nhân hóa theo từng ứng viên đạt tiêu chuẩn và email phản hồi lịch sự cho ứng viên không phù hợp.',
    workflow: FULL_RECRUITMENT,
    promptTemplate:
      'Soạn thư mời phỏng vấn trang trọng, nêu rõ chức danh ứng tuyển, hình thức phỏng vấn, các tài liệu cần chuẩn bị trước.',
    status: 'active',
    planSteps: getPlanTemplateForWorkflow(FULL_RECRUITMENT),
  },
  {
    id: 'agent-hrm-sync',
    name: 'System-B Onboarding Synchronizer',
    role: 'Đồng bộ nhân sự Hệ thống B',
    description:
      'Chuyển đổi thông tin ứng viên PASS phỏng vấn thành cấu trúc nhân viên chuẩn theo schema của Hệ thống B (Core HRM).',
    workflow: EMPLOYEE_SYNC,
    promptTemplate:
      'Kiểm tra toàn bộ trường dữ liệu: Họ tên, Email, Số điện thoại, Vị trí tuyển, Phòng ban, Mức lương thỏa thuận. Gọi API Hệ thống B để tạo bản ghi nhân viên mới.',
    status: 'active',
    planSteps: getPlanTemplateForWorkflow(EMPLOYEE_SYNC),
  },
];
