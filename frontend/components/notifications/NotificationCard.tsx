import { NotificationItem, typeNumMap } from "./NotificationTypes";
import HeroAlertCard from "./HeroAlertCard";
import EmergencyCard from "./EmergencyCard";
import CommentCard from "./CommentCard";
import BadgeCard from "./BadgeCard";

export default function NotificationCard({ n, onRead }: { n: NotificationItem; onRead: () => void }) {
  const typeKey = typeof n.type === "number" ? typeNumMap[n.type] : n.type;
  switch (typeKey) {
    case "HeroAlert":   return <HeroAlertCard n={n} onRead={onRead} />;
    case "Emergency":   return <EmergencyCard n={n} onRead={onRead} />;
    case "Comment":     return <CommentCard n={n} onRead={onRead} />;
    case "BadgeEarned": return <BadgeCard n={n} onRead={onRead} />;
    default:            return <CommentCard n={n} onRead={onRead} />;
  }
}