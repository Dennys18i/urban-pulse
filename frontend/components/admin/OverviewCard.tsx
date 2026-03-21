interface OverviewCardProps {
  title: string;
  stats: { bold: string; text: string }[];
}

export default function OverviewCard({ title, stats }: OverviewCardProps) {
  return (
    <div className="w-full bg-secondary/60 border border-white/10 rounded-2xl p-5">
      {/* Title row */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-3 h-3 rounded-full bg-green-light" />
        <h3 className="text-white font-bold text-base">{title}</h3>
      </div>

      {/* Stats with left accent border */}
      <div className="border-l-2 border-white/20 pl-4 ml-1 flex flex-col gap-1.5">
        {stats.map((stat, i) => (
          <p key={i} className="text-white text-sm">
            <span className="font-bold">{stat.bold}</span> {stat.text}
          </p>
        ))}
      </div>
    </div>
  );
}