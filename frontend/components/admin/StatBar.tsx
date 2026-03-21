interface StatBarProps {
  label: string;
  value: string;
  color: string;
  progress: number; // 0-100
}

export default function StatBar({ label, value, color, progress }: StatBarProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-white/50 text-xs text-center leading-tight">
        {label}
      </span>
      <span className="text-white font-bold text-lg">{value}</span>
      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}