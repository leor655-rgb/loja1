import { FlagMark } from "./FlagMark";

/**
 * Letreiro contínuo (ticker) — o conteúdo é duplicado para o loop
 * perfeito de translateX(-50%) controlado por CSS.
 */
export function Marquee({
  items,
  className = "",
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const Half = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10 pr-10">
          <span>{item}</span>
          <FlagMark className="h-4 w-4 shrink-0 text-current opacity-90" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`flex w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <Half />
        <Half hidden />
      </div>
    </div>
  );
}
