/**
 * Logo da RED FLAG — uma pequena bandeira vermelha tremulando.
 * O mastro usa `currentColor` para se adaptar a fundos claros/escuros.
 */
export function FlagMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M7 3.5v25"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M8.3 4.6c3.4-2.1 6.3 1.9 9.7 1 2.5-.7 4.7-.5 6.4.4v10.9c-1.7-.9-3.9-1.1-6.4-.4-3.4.9-6.3-3.1-9.7-1V4.6z"
        fill="#e11d2e"
      />
      <path
        d="M8.3 4.6c3.4-2.1 6.3 1.9 9.7 1 2.5-.7 4.7-.5 6.4.4v2.1c-1.7-.9-3.9-1.1-6.4-.4-3.4.9-6.3-3.1-9.7-1V4.6z"
        fill="#ffffff"
        opacity="0.16"
      />
    </svg>
  );
}
