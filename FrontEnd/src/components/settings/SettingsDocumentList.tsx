import {
  ArrowLeft,
  FilePlus,
  Lock,
  Paperclip,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';
import { paths } from '../../routes/paths';
import type { SettingsCategory, SettingsDocument } from '../../types/settings';
import Button from '../common/Button';
import ConfirmDialog from '../common/ConfirmDialog';

import { settingsCategories } from './settingsCategories';

/**
 * Knowledge / Policy list with two parts: read-only system defaults and the
 * documents the company added itself (editable).
 */
function SettingsDocumentList({ category }: { category: SettingsCategory }) {
  const navigate = useNavigate();
  const { documents, deleteDocument } = useAppData();
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<SettingsDocument | null>(
    null,
  );

  const config = settingsCategories[category];
  const { systemDefault, userCustom } = documents[category];

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    deleteDocument(category, pendingDelete.id);
    showToast(
      `Đã xóa ${config.noun.toLowerCase()} "${pendingDelete.title}".`,
      'info',
    );
    setPendingDelete(null);
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-2 sm:flex-row sm:items-center">
        <div>
          <Link
            to={paths.settings}
            className="mb-1 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Quay lại Cài đặt
          </Link>
          <h2 className="text-xl font-bold text-slate-900">{config.title}</h2>
          <p className="text-xs text-slate-500">{config.description}</p>
        </div>
        <Button onClick={() => navigate(config.newPath)} className="shrink-0">
          <Plus className="h-4 w-4" /> {config.addLabel}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase">
            <Lock className="h-3.5 w-3.5" /> Phần 1: Quy định Mặc định của Hệ
            thống (Không thể chỉnh sửa/xóa)
          </div>
          <div className="space-y-2.5">
            {systemDefault.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-gray-200 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
                      Hệ thống mặc định (Read-only)
                    </span>
                    <span className="text-xs text-gray-400">
                      • Không thể chỉnh sửa hoặc xóa
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600">{item.summary}</p>
                </div>
                <span
                  className="shrink-0 rounded-lg bg-gray-100 p-1.5 text-gray-400"
                  title="Mặc định bảo vệ"
                >
                  <Lock className="h-4 w-4" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase">
            <FilePlus className="h-3.5 w-3.5 text-blue-600" /> Phần 2: Tài liệu
            do Doanh nghiệp tự thiết lập (Cho phép Sửa/Xóa)
          </div>
          <div className="space-y-2.5">
            {userCustom.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 py-8 text-center text-xs text-gray-500">
                Chưa có tài liệu tùy chỉnh nào do bạn tải lên. Hãy bấm nút "
                {config.addLabel}" ở trên để nạp thêm!
              </div>
            ) : (
              userCustom.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-start justify-between gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all hover:border-blue-300 sm:flex-row"
                >
                  <div className="max-w-2xl space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        Cập nhật: {item.updatedAt}
                      </span>
                      {item.fileName && (
                        <span className="flex items-center gap-1 text-xs font-medium text-blue-600">
                          <Paperclip className="h-3 w-3" /> {item.fileName}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="line-clamp-2 text-xs text-gray-600">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="soft"
                      size="sm"
                      onClick={() => navigate(config.editPath(item.id))}
                    >
                      <Pencil className="h-3.5 w-3.5" /> Sửa
                    </Button>
                    <Button
                      variant="danger-ghost"
                      size="sm"
                      onClick={() => setPendingDelete(item)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Xóa
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title={`Xóa ${config.noun.toLowerCase()}`}
        message={`Bạn có chắc chắn muốn xóa "${pendingDelete?.title ?? ''}" khỏi hệ thống?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </section>
  );
}

export default SettingsDocumentList;
