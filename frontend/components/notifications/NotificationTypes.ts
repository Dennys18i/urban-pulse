export type NotificationType = "Emergency" | "HeroAlert" | "Comment" | "BadgeEarned";

export interface NotificationItem {
  id: number;
  title: string;
  body: string;
  type: NotificationType | number;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export const typeNumMap: Record<number, NotificationType> = {
  0: "Emergency",
  1: "HeroAlert",
  2: "Comment",
  3: "BadgeEarned",
};

export function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}