import { NotificationItem, formatRelativeTime } from "./NotificationTypes";

export default function BadgeCard({ n, onRead }: { n: NotificationItem; onRead: () => void }) {
  return (
    <div onClick={onRead} className="cursor-pointer active:scale-95 transition-all duration-200">
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${n.isRead ? "rgba(255,255,255,0.06)" : "rgba(255,215,0,0.4)"}` }}
      >
        <div className="bg-[#1C1C1C] px-4 py-3 flex gap-3 items-start relative">
          <div className="w-9 h-9 rounded-full bg-yellow-400/20 flex items-center justify-center text-lg flex-shrink-0">
            🏅
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className={`text-sm font-semibold ${n.isRead ? "text-white/50" : "text-white"}`}>{n.title}</p>
              <span className="text-[10px] text-white/30 whitespace-nowrap">{formatRelativeTime(n.createdAt)}</span>
            </div>
            <p className={`text-xs mt-1 ${n.isRead ? "text-white/30" : "text-yellow-400"}`}>{n.body}</p>
          </div>
          {!n.isRead && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-yellow-400" />}
        </div>
      </div>
    </div>
  );
}