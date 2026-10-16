import { paths } from '../../routes/paths';
import type { SettingsCategory } from '../../types/settings';

export interface SettingsCategoryConfig {
  /** Short Vietnamese noun used in messages ("Tri thức" / "Chính sách"). */
  noun: string;
  title: string;
  description: string;
  addLabel: string;
  listPath: string;
  newPath: string;
  editPath: (documentId: string) => string;
}

export const settingsCategories: Record<
  SettingsCategory,
  SettingsCategoryConfig
> = {
  knowledge: {
    noun: 'Tri thức',
    title: 'Quản lý Cơ sở Tri thức (Knowledge Base)',
    description:
      'Thiết lập các văn bản, cẩm nang tiêu chuẩn, và taxonomy kỹ năng nhân sự để AI Agent tham chiếu.',
    addLabel: 'Thêm Knowledge mới',
    listPath: paths.knowledge,
    newPath: `${paths.knowledge}/new`,
    editPath: (documentId) => `${paths.knowledge}/${documentId}/edit`,
  },
  policy: {
    noun: 'Chính sách',
    title: 'Quản lý Chính sách Doanh nghiệp (Policy Rules)',
    description:
      'Quy định các ngưỡng kiểm duyệt, trần ngân sách lương, và cơ chế Human-in-the-Loop bắt buộc.',
    addLabel: 'Thêm Policy mới',
    listPath: paths.policy,
    newPath: `${paths.policy}/new`,
    editPath: (documentId) => `${paths.policy}/${documentId}/edit`,
  },
};
