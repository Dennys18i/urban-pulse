import { NotificationItem, formatRelativeTime } from "./NotificationTypes";

export default function HeroAlertCard({ n, onRead }: { n: NotificationItem; onRead: () => void }) {
  const isSkill = n.body.toLowerCase().includes("skill");
  const badgeBg = isSkill ? "#BEDCF5" : "#4ADE80";
  const badgeText = isSkill ? "#04007D" : "#000";
  const label = isSkill ? "SKILL" : "LEND";
  const alertColor = "#FF7E7E";

  const colonIndex = n.body.indexOf(":");
  const alertLabel = colonIndex !== -1 ? n.body.substring(0, colonIndex) : n.body;
  const alertBody = colonIndex !== -1 ? n.body.substring(colonIndex + 1).trim() : "";

  return (
    <div onClick={onRead} className="cursor-pointer active:scale-95 transition-all duration-200 relative pt-5">

      <div
        className="absolute top-0 right-3 z-10 px-4 py-1 rounded-full text-xs font-bold"
        style={{ background: badgeBg, color: badgeText }}
      >
        {label}
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${n.isRead ? "rgba(165, 61, 61, 0.06)" : "rgba(255,126,126,0.25)"}` }}
      >
        <div
          className="relative px-4 pt-4 pb-3"
          style={{ background: n.isRead ? "#1C1C1C" : "rgba(255,126,126,0.08)" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm flex-shrink-0">
              👤
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm font-semibold leading-tight ${n.isRead ? "text-white/50" : "text-white"}`}>
                  {n.title}{" "}
                  <span className={n.isRead ? "text-white/30" : "text-white/60"}>needs help!</span>
                </p>
                <span className="text-[10px] text-white/30 whitespace-nowrap flex-shrink-0">
                  {formatRelativeTime(n.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="ml-12">
            <p className="text-xs font-bold" style={{ color: alertColor }}>
              {alertLabel}:{" "}
              <span className={n.isRead ? "text-white" : "text-white"} style={{ fontWeight: 400 }}>
                {alertBody}
              </span>
            </p>
          </div>

          {!n.isRead && (
            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full" style={{ background: alertColor }} />
          )}
        </div>
      </div>
    </div>
  );
}