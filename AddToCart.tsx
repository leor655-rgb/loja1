@import "tailwindcss";

@theme {
  --font-display: "Anton", "Arial Narrow", Impact, sans-serif;
  --font-sans: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;

  --color-cream: #0c0c0c; /* base: preto urbano */
  --color-cream-2: #131313; /* superfícies */
  --color-ink: #f4f1ea; /* texto osso */
  --color-ink-soft: #a8a49b;
  --color-muted: #6f6c64;
  --color-line: #262624;
  --color-sand: #1c1c1a;
  --color-pine: #dc2626; /* vermelho bandeira */
  --color-pine-2: #a91d1d;
  --color-terracotta: #ef3b2f; /* vermelho vivo */
  --color-gold: #f59e0b;
  --color-bone: #e9e4d6; /* seção invertida */
  --color-tape: #f2c511; /* fita de sinalização */
}

:root {
  color-scheme: dark;
}

html {
  background: #0c0c0c;
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-cream);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Grão de filme sobre toda a cena — textura ambiente sutil */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 90;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E");
}

::selection {
  background: var(--color-pine);
  color: #fff;
}

.font-display {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.01em;
}

/* Texto vazado (outline) — assinatura do streetwear */
.text-outline {
  color: transparent;
  -webkit-text-stroke: 2px var(--color-ink);
}
.text-outline-dark {
  color: transparent;
  -webkit-text-stroke: 2px #0c0c0c;
}

/* Grade técnica de fundo */
.grid-bg {
  background-image:
    linear-gradient(to right, rgb(244 241 234 / 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(244 241 234 / 0.045) 1px, transparent 1px);
  background-size: 54px 54px;
}

/* Fita zebrada de sinalização industrial */
.tape {
  background-image: repeating-linear-gradient(
    -45deg,
    #f2c511 0 16px,
    #0c0c0c 16px 32px
  );
}

/* Letreiro contínuo */
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  animation: marquee 26s linear infinite;
}
@keyframes marquee-reverse {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

/* Scrollbar dos drawers */
.scroll-area {
  scrollbar-width: thin;
  scrollbar-color: var(--color-line) transparent;
}
.scroll-area::-webkit-scrollbar {
  width: 6px;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: var(--color-line);
  border-radius: 999px;
}

/* Reveal on scroll */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.reveal[data-visible="true"] {
  opacity: 1;
  transform: none;
}

/* Zoom de imagem no hover */
.img-zoom {
  overflow: hidden;
}
.img-zoom img {
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.img-zoom:hover img {
  transform: scale(1.06);
}

/* Botões — arestas vivas, attitude */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  border-radius: 0;
  padding: 0.95rem 1.9rem;
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.15s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}
.btn:active {
  transform: translateY(2px);
}
.btn-dark {
  background: var(--color-pine);
  color: #fff;
  box-shadow: 0 0 0 0 rgb(220 38 38 / 0);
}
.btn-dark:hover {
  background: var(--color-terracotta);
  box-shadow: 0 10px 30px -8px rgb(220 38 38 / 0.55);
}
.btn-outline {
  border: 1px solid var(--color-ink);
  color: var(--color-ink);
  background: transparent;
}
.btn-outline:hover {
  background: var(--color-ink);
  color: #0c0c0c;
}
.btn-pine {
  background: var(--color-pine);
  color: #fff;
}
.btn-pine:hover {
  background: var(--color-terracotta);
}

/* Drawer do carrinho */
.drawer-content {
  transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .img-zoom:hover img {
    transform: none;
  }
  .drawer-content {
    transition: none;
  }
  .animate-marquee,
  .animate-marquee-reverse {
    animation: none;
  }
}

.detail-list li {
  position: relative;
  padding-left: 1.5rem;
}
.detail-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.15em;
  width: 10px;
  height: 12px;
  background: var(--color-pine);
  clip-path: polygon(0 0, 100% 18%, 100% 82%, 0 100%, 22% 50%);
}
