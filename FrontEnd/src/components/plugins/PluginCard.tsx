import {
  Briefcase,
  Calendar,
  CircleHelp,
  CirclePlus,
  Cpu,
  Mail,
  PenLine,
  Trash2,
  Users,
  type LucideIcon,
} from 'lucide-react';

import type { Plugin, PluginType } from '../../types/plugin';
import { cn } from '../../utils/cn';

const typeIcons: Record<PluginType, LucideIcon> = {
  recruitment: Briefcase,
  hrm: Users,
  email: Mail,
  productivity: Calendar,
  custom: Cpu,
};

const typeColors: Record<PluginType, string> = {
  recruitment: 'bg-blue-600',
  hrm: 'bg-emerald-600',
  email: 'bg-indigo-600',
  productivity: 'bg-indigo-600',
  custom: 'bg-indigo-600',
};

interface PluginCardProps {
  plugin: Plugin;
  onOpenGuide: (plugin: Plugin) => void;
  onEdit: (plugin: Plugin) => void;
  onDelete: (plugin: Plugin) => void;
}

function PluginCard({
  plugin,
  onOpenGuide,
  onEdit,
  onDelete,
}: PluginCardProps) {
  const Icon = typeIcons[plugin.type];
  const configured = plugin.configured;

  return (
    <div
      className={cn(
        'rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md',
        configured
          ? 'border-gray-200'
          : 'border-dashed border-gray-300 bg-gray-50/70',
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-white',
              configured ? typeColors[plugin.type] : 'bg-gray-400',
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">{plugin.name}</h4>
            <span className="font-mono text-[10px] text-slate-400">
              {plugin.code}
            </span>
          </div>
        </div>
        <span
          className={cn(
            'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold',
            configured
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-gray-200 text-gray-600',
          )}
        >
          {configured ? '● Đã kết nối' : '○ Chưa cấu hình'}
        </span>
      </div>

      <p className="mb-4 line-clamp-2 min-h-[36px] text-xs text-gray-600">
        {plugin.description}
      </p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        {configured ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenGuide(plugin)}
              className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-200"
            >
              <CircleHelp className="h-3.5 w-3.5 text-slate-500" /> Xem hướng
              dẫn
            </button>
            <button
              type="button"
              onClick={() => onEdit(plugin)}
              className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-100"
            >
              <PenLine className="h-3.5 w-3.5" /> Chỉnh sửa
            </button>
            <button
              type="button"
              onClick={() => onDelete(plugin)}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition-all hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> Xóa
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenGuide(plugin)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-200"
            >
              <CircleHelp className="h-3.5 w-3.5 text-slate-500" /> Xem hướng
              dẫn
            </button>
            <button
              type="button"
              onClick={() => onEdit(plugin)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
            >
              <CirclePlus className="h-4 w-4" /> Thêm kết nối
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PluginCard;
