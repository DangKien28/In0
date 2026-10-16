import { Plus } from 'lucide-react';
import { useState } from 'react';

import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import PageHeader from '../../components/common/PageHeader';
import PluginDrawer from '../../components/plugins/PluginDrawer';
import PluginList from '../../components/plugins/PluginList';
import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';
import type { Plugin } from '../../types/plugin';

interface DrawerState {
  open: boolean;
  plugin: Plugin | null;
  key: number;
}

/** "Phần mềm liên kết": linked third-party systems In0 orchestrates. */
function Plugins() {
  const { plugins, savePlugin, deletePlugin } = useAppData();
  const { showToast } = useToast();
  const [drawer, setDrawer] = useState<DrawerState>({
    open: false,
    plugin: null,
    key: 0,
  });
  const [pendingDelete, setPendingDelete] = useState<Plugin | null>(null);

  const openDrawer = (plugin: Plugin | null) => {
    setDrawer((current) => ({ open: true, plugin, key: current.key + 1 }));
  };

  const closeDrawer = () =>
    setDrawer((current) => ({ ...current, open: false }));

  const handleSave = (plugin: Plugin) => {
    savePlugin(plugin);
    closeDrawer();
    showToast('Cấu hình hệ thống đích đã được lưu thành công!');
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    deletePlugin(pendingDelete.id);
    showToast(`Đã ngắt kết nối "${pendingDelete.name}".`, 'info');
    setPendingDelete(null);
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <PageHeader
        title="Quản lý Phần mềm liên kết"
        description="Cấu hình kết nối tới Phần mềm Tuyển dụng, Phần mềm Quản lý nhân sự (HRIS), Email,..."
        action={
          <Button onClick={() => openDrawer(null)}>
            <Plus className="h-4 w-4" /> Thêm phần mềm mới
          </Button>
        }
      />

      <PluginList
        plugins={plugins}
        onOpenGuide={openDrawer}
        onEdit={openDrawer}
        onDelete={setPendingDelete}
      />

      <PluginDrawer
        formKey={drawer.key}
        open={drawer.open}
        plugin={drawer.plugin}
        onClose={closeDrawer}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Ngắt kết nối phần mềm"
        message={`Bạn có chắc chắn muốn ngắt kết nối và xóa cấu hình "${pendingDelete?.name ?? ''}"?`}
        confirmLabel="Ngắt kết nối"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </section>
  );
}

export default Plugins;
