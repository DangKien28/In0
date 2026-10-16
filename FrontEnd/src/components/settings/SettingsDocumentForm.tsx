import { Save } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';
import type { SettingsCategory } from '../../types/settings';
import { compactInputClass, textareaClass } from '../../utils/formStyles';
import { currentDateTime } from '../../utils/time';
import Button from '../common/Button';
import Field from '../common/Field';
import FileUpload from '../common/FileUpload';

import { settingsCategories } from './settingsCategories';

const SUMMARY_LENGTH = 120;

function summarize(content: string) {
  return content.length > SUMMARY_LENGTH
    ? `${content.slice(0, SUMMARY_LENGTH)}...`
    : content;
}

/** Add / edit form for a Knowledge or Policy document (Sakai "assignment" style). */
function SettingsDocumentForm({ category }: { category: SettingsCategory }) {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { documents, saveDocument } = useAppData();
  const { showToast } = useToast();

  const config = settingsCategories[category];
  const existing = documentId
    ? documents[category].userCustom.find((doc) => doc.id === documentId)
    : undefined;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [docCategory, setDocCategory] = useState(
    existing?.category ?? 'Tài liệu nội bộ',
  );
  const [content, setContent] = useState(
    existing?.content ?? existing?.summary ?? '',
  );
  const [fileName, setFileName] = useState(existing?.fileName);

  // Editing a document that does not exist (or is read-only) is not allowed.
  if (documentId && !existing) {
    return <Navigate to={config.listPath} replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedContent = content.trim();

    saveDocument(category, {
      id: existing?.id ?? `${category}-user-${crypto.randomUUID()}`,
      title: title.trim(),
      category: docCategory.trim() || 'Tài liệu nội bộ',
      summary: summarize(trimmedContent),
      content: trimmedContent,
      fileName,
      updatedAt: currentDateTime(),
      readOnly: false,
    });
    showToast(`Đã lưu ${config.noun} thành công!`);
    navigate(config.listPath);
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="space-y-4 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {existing
                ? `Chỉnh sửa: ${existing.title}`
                : `Thêm mới ${config.noun} (Phong cách Assignment SAKAI)`}
            </h3>
            <p className="text-xs text-slate-500">
              Bạn có thể viết trực tiếp nội dung văn bản hoặc tải file đính kèm
              lên hệ thống.
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
            SAKAI Assignment Interface
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Tiêu đề tài liệu / Tên quy định:"
              htmlFor="doc-title"
              required
            >
              <input
                id="doc-title"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className={compactInputClass}
              />
            </Field>
            <Field label="Phân loại danh mục:" htmlFor="doc-category">
              <input
                id="doc-category"
                value={docCategory}
                onChange={(event) => setDocCategory(event.target.value)}
                className={compactInputClass}
              />
            </Field>
          </div>

          <Field
            label="Nội dung văn bản (Text Content):"
            htmlFor="doc-content"
            required
            hint="Nhập toàn bộ nội dung quy định hoặc trích yếu văn bản tại đây:"
          >
            <textarea
              id="doc-content"
              required
              rows={6}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className={`${textareaClass} p-3.5 font-mono`}
            />
          </Field>

          <div>
            <span className="mb-1 block text-xs font-bold text-slate-700">
              Đính kèm tập tin (Attachments):
            </span>
            <FileUpload
              id="doc-file"
              fileName={fileName}
              accept=".pdf,.doc,.docx,.txt"
              hint="Định dạng hỗ trợ: PDF, DOCX, TXT (Tối đa 50MB)"
              onFileSelect={(file) => setFileName(file.name)}
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-3">
            <Button variant="neutral" onClick={() => navigate(config.listPath)}>
              Hủy bỏ
            </Button>
            <Button type="submit" className="px-6">
              <Save className="h-4 w-4" /> Lưu (Save Assignment)
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SettingsDocumentForm;
