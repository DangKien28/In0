import { Play } from 'lucide-react';

interface HomeBannerProps {
  userFirstName: string;
  onStartSample: () => void;
}

function HomeBanner({ userFirstName, onStartSample }: HomeBannerProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg shadow-blue-500/10 md:flex-row md:items-center">
      <div>
        <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          👋 Chào {userFirstName}, hôm nay bạn thế nào?
        </span>
        <h1 className="text-2xl font-black tracking-tight md:text-3xl">
          In0 đã sẵn sàng hỗ trợ tự động hóa nhân sự!
        </h1>
        <p className="mt-1 max-w-xl text-xs text-blue-100 md:text-sm">
          Bạn có thể ra lệnh bằng ngôn ngữ tự nhiên để kết nối Hệ thống A (Tuyển
          dụng) và đồng bộ trúng tuyển sang Hệ thống B (HRM).
        </p>
      </div>
      <button
        type="button"
        onClick={onStartSample}
        className="flex shrink-0 items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-bold text-blue-600 shadow transition-all hover:bg-blue-50"
      >
        <Play className="h-4 w-4 fill-blue-600" /> Bắt đầu quy trình mẫu
      </button>
    </div>
  );
}

export default HomeBanner;
