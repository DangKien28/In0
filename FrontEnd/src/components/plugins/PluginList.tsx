import type { Plugin } from '../../types/plugin';

import PluginCard from './PluginCard';

interface PluginListProps {
  plugins: Plugin[];
  onOpenGuide: (plugin: Plugin) => void;
  onEdit: (plugin: Plugin) => void;
  onDelete: (plugin: Plugin) => void;
}

function PluginList({
  plugins,
  onOpenGuide,
  onEdit,
  onDelete,
}: PluginListProps) {
  if (plugins.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 py-10 text-center text-xs text-gray-500">
        Chưa có phần mềm liên kết nào. Bấm "Thêm phần mềm mới" để bắt đầu.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {plugins.map((plugin) => (
        <PluginCard
          key={plugin.id}
          plugin={plugin}
          onOpenGuide={onOpenGuide}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default PluginList;
