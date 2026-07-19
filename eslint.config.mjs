import type { ReactNode } from "react";

function StarShape({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.56l-5.91 3.1 1.13-6.57L2.45 9.44l6.6-.96L12 2.5z" />
    </svg>
  );
}

export function Stars({
  value,
  size = 16,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const stars: ReactNode[] = Array.from({ length: 5 }, (_, i) => (
    <StarShape key={i} size={size} />
  ));
  return (
    <span
      className={`inline-flex items-center ${className}`}
      role="img"
      aria-label={`${value.toFixed(1)} de 5 estrelas`}
    >
      <span className="relative inline-flex" style={{ width: size * 5, height: size }}>
        <span className="absolute inset-0 inline-flex gap-[1px] text-[#3a3a36]">
          {stars}
        </span>
        <span
          className="absolute inset-0 inline-flex gap-[1px] overflow-hidden text-gold"
          style={{ width: `${pct}%` }}
        >
          {stars}
        </span>
      </span>
    </span>
  );
}
