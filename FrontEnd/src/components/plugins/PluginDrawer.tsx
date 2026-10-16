import { BookOpen, Check, LoaderCircle, Radio } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';

import { getPluginGuide } from '../../data/mockPlugins';
import type { Plugin } from '../../types/plugin';
import { cn } from '../../utils/cn';
import { compactInputClass } from '../../utils/formStyles';
import Button from '../common/Button';
import Drawer from '../common/Drawer';
import Field from '../common/Field';

type PingState = 'idle' | 'testing' | 'success';

interface PluginDrawerProps {
  open: boolean;
  /** The plugin being edited, or null to create a new one. */
  plugin: Plugin | null;
  /** Changes every time the drawer is opened so the form is re-initialised. */
  formKey: number;
  onClose: () => void;
  onSave: (plugin: Plugin) => void;
}

interface PluginFormProps {
  plugin: Plugin | null;
  onSave: (plugin: Plugin) => void;
}

const FORM_ID = 'plugin-form';
const PING_DELAY_MS = 800;

type FormValues = Pick<
  Plugin,
  'name' | 'code' | 'baseUrl' | 'apiKey' | 'webhookUrl' | 'description'
>;

function toFormValues(plugin: Plugin | null): FormValues {
  return {
    name: plugin?.name ?? '',
    code: plugin?.code ?? '',
    baseUrl: plugin?.baseUrl ?? '',
    apiKey: plugin?.apiKey ?? '',
    webhookUrl: plugin?.webhookUrl ?? '',
    description: plugin?.description ?? '',
  };
}

function PluginForm({ plugin, onSave }: PluginFormProps) {
  const [values, setValues] = useState<FormValues>(() => toFormValues(plugin));
  const [pingState, setPingState] = useState<PingState>('idle');
  const pingTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(pingTimer.current), []);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleTestPing = () => {
    setPingState('testing');
    window.clearTimeout(pingTimer.current);
    // Simulated: the backend endpoint for connection checks does not exist yet.
    pingTimer.current = window.setTimeout(
      () => setPingState('success'),
      PING_DELAY_MS,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      id: plugin?.id ?? `sys-${crypto.randomUUID()}`,
      type: plugin?.type ?? 'custom',
      ...values,
      code: values.code.trim().toUpperCase(),
      configured: true,
    });
  };

  return (
    <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-3 text-xs">
      <Field label="Tên hệ thống:" htmlFor="plugin-name" required>
        <input
          id="plugin-name"
          required
          value={values.name}
          onChange={(event) => update('name', event.target.value)}
          className={compactInputClass}
        />
      </Field>
      <Field label="Mã hệ thống (System Code):" htmlFor="plugin-code" required>
        <input
          id="plugin-code"
          required
          value={values.code}
          onChange={(event) => update('code', event.target.value)}
          className={cn(compactInputClass, 'font-mono')}
        />
      </Field>
      <Field label="Base API URL Endpoint:" htmlFor="plugin-url" required>
        <input
          id="plugin-url"
          required
          type="url"
          value={values.baseUrl}
          onChange={(event) => update('baseUrl', event.target.value)}
          className={cn(compactInputClass, 'font-mono')}
        />
      </Field>
      <Field label="API Key / Secret Token:" htmlFor="plugin-key" required>
        <input
          id="plugin-key"
          required
          type="password"
          autoComplete="off"
          value={values.apiKey}
          onChange={(event) => update('apiKey', event.target.value)}
          className={cn(compactInputClass, 'font-mono')}
        />
      </Field>
      <Field label="Webhook URL nhận phản hồi:" htmlFor="plugin-webhook">
        <input
          id="plugin-webhook"
          type="url"
          value={values.webhookUrl}
          onChange={(event) => update('webhookUrl', event.target.value)}
          className={cn(compactInputClass, 'font-mono')}
        />
      </Field>
      <Field label="Mô tả tác vụ liên kết:" htmlFor="plugin-desc">
        <textarea
          id="plugin-desc"
          rows={3}
          value={values.description}
          onChange={(event) => update('description', event.target.value)}
          className={compactInputClass}
        />
      </Field>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleTestPing}
          disabled={pingState === 'testing'}
          className={cn(
            'flex w-full items-center justify-center gap-1.5 rounded-xl border py-2 font-semibold transition-all',
            pingState === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 text-slate-700 hover:bg-slate-50',
          )}
        >
          {pingState === 'idle' && (
            <>
              <Radio className="h-3.5 w-3.5 text-blue-600" /> Kiểm tra kết nối
              (Test Ping)
            </>
          )}
          {pingState === 'testing' && (
            <>
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Đang ping
              API...
            </>
          )}
          {pingState === 'success' && (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Kết nối thành
              công (mô phỏng)
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/** Drawer with the connection guide and the linked-system configuration form. */
function PluginDrawer({
  open,
  plugin,
  formKey,
  onClose,
  onSave,
}: PluginDrawerProps) {
  const guide = getPluginGuide(plugin);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={
        plugin?.configured
          ? `Cấu hình kết nối: ${plugin.name}`
          : 'Thiết lập kết nối mới'
      }
      footer={
        <>
          <Button
            variant="outline"
            className="border-transparent"
            onClick={onClose}
          >
            Đóng
          </Button>
          <Button type="submit" form={FORM_ID} className="px-5">
            Lưu kết nối
          </Button>
        </>
      }
    >
      <div className="space-y-2.5 rounded-2xl border border-blue-200/80 bg-blue-50/80 p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-blue-600 text-[10px] text-white">
            <BookOpen className="h-3 w-3" />
          </div>
          <span>{guide.title}</span>
        </div>
        <ol className="space-y-2 text-xs">
          {guide.steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
                {index + 1}
              </span>
              <div className="flex-1 space-y-0.5">
                <div className="text-[11px] font-bold text-slate-800">
                  {step.title}
                </div>
                <div className="text-[11px] leading-relaxed text-slate-600">
                  {step.description}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <PluginForm key={formKey} plugin={plugin} onSave={onSave} />
    </Drawer>
  );
}

export default PluginDrawer;
