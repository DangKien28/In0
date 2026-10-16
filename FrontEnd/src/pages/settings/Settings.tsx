import {
  BookOpen,
  ChevronRight,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/common/PageHeader';
import { paths } from '../../routes/paths';
import { cn } from '../../utils/cn';

interface SettingsTile {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  accent: { border: string; icon: string; titleHover: string; link: string };
}

const tiles: SettingsTile[] = [
  {
    to: paths.knowledge,
    icon: BookOpen,
    title: 'Cài đặt Knowledge (Cơ sở tri thức)',
    description:
      'Lưu trữ các tài liệu định danh kỹ năng, tiêu chuẩn JD công ty, khung năng lực IT và văn hóa doanh nghiệp.',
    linkLabel: 'Quản lý tri thức',
    accent: {
      border: 'hover:border-blue-500',
      icon: 'bg-blue-50 text-blue-600',
      titleHover: 'group-hover:text-blue-600',
      link: 'text-blue-600',
    },
  },
  {
    to: paths.policy,
    icon: ShieldCheck,
    title: 'Cài đặt Policy (Chính sách doanh nghiệp)',
    description:
      'Thiết lập quy chuẩn ngân sách lương trần, điểm số tối thiểu để lọc CV, các điều kiện bắt buộc phải có sự phê duyệt của HR.',
    linkLabel: 'Quản lý chính sách',
    accent: {
      border: 'hover:border-indigo-500',
      icon: 'bg-indigo-50 text-indigo-600',
      titleHover: 'group-hover:text-indigo-600',
      link: 'text-indigo-600',
    },
  },
];

function Settings() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <PageHeader
        title="Cài đặt Hệ thống"
        description="Quản lý cơ sở tri thức (Knowledge) và quy định chính sách (Policy) làm cơ sở cho AI ra quyết định."
      />

      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
        {tiles.map(
          ({ to, icon: Icon, title, description, linkLabel, accent }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md',
                accent.border,
              )}
            >
              <div
                className={cn(
                  'mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110',
                  accent.icon,
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3
                className={cn(
                  'mb-1 text-lg font-bold text-slate-900 transition-colors',
                  accent.titleHover,
                )}
              >
                {title}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-slate-500">
                {description}
              </p>
              <div
                className={cn(
                  'flex items-center text-xs font-semibold',
                  accent.link,
                )}
              >
                <span>{linkLabel}</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}

export default Settings;
