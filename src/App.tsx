import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import logoRaw from "@/assets/avatar-school-logo.png";
const logo = { url: logoRaw };
import dinheiroRaw from "@/assets/dinheiro-plataformas-1200.webp";
const dinheiro = { url: dinheiroRaw };
import eggmanRaw from "@/assets/turma-eggman.webp";
const eggman = { url: eggmanRaw };
import edmondRaw from "@/assets/turma-edmond-lebon.webp";
const edmond = { url: edmondRaw };
import billRaw from "@/assets/turma-bill-smith.webp";
const bill = { url: billRaw };
import jeenRaw from "@/assets/turma-jeen-rockfelly.webp";
const jeen = { url: jeenRaw };
import kwonRaw from "@/assets/turma-kwon-blaze-kim.webp";
const kwon = { url: kwonRaw };
import jeanphilRaw from "@/assets/turma-jean-phil.webp";
const jeanphil = { url: jeanphilRaw };
import arthurRaw from "@/assets/turma-arthur-teddington.webp";
const arthur = { url: arthurRaw };
import sebastianRaw from "@/assets/turma-sebastian-perfil.webp";
const sebastian = { url: sebastianRaw };
import silkyRaw from "@/assets/turma-silky.webp";
const silky = { url: silkyRaw };
import miltonRaw from "@/assets/turma-milton-bumford.webp";
const milton = { url: miltonRaw };
import abuRaw from "@/assets/turma-abu-shalab.webp";
const abu = { url: abuRaw };
import barnabyRaw from "@/assets/turma-barnaby-nugget.webp";
const barnaby = { url: barnabyRaw };
import reelAbuRaw from "@/assets/reel-abu-shalab.mp4";
const reelAbu = { url: reelAbuRaw };
import reelJeanRaw from "@/assets/reel-jean-philanthrope.mp4";
const reelJean = { url: reelJeanRaw };
import reelFarquaadRaw from "@/assets/reel-lord-farquaad.mp4";
const reelFarquaad = { url: reelFarquaadRaw };
import proAvatarRaw from "@/assets/pro-avatar.webp";
const proAvatar = { url: proAvatarRaw };
import depoLucasRaw from "@/assets/depo-lucas-en-420.webp";
const depoLucas = { url: depoLucasRaw };
import depoFelipeRaw from "@/assets/depo-felipe-en-420.webp";
const depoFelipe = { url: depoFelipeRaw };
import depoAndreRaw from "@/assets/depo-andre-en-420.webp";
const depoAndre = { url: depoAndreRaw };
import { Button } from "@/components/ui/button";


const BRAND = "Escola de Avatares";
// Substitua pelos seus links de pagamento reais
const CHECKOUT_STARTER = "https://pay.hotmart.com/L107952254U?checkoutMode=10&bid=1791520207025";
const CHECKOUT_PRO = "https://pay.hotmart.com/M107952299D?checkoutMode=10&bid=1791589412827";
const CHECKOUT_PRO_OFERTA = "https://pay.hotmart.com/P107967395C?bid=1791602093315";


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Cta = ({ children = "I want my character →", href = "#pricing" }: { children?: React.ReactNode; href?: string }) => (
  <a href={href} className="btn-pop bg-coral text-primary-foreground">{children}</a>
);

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-navy bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy shadow-pop">
    {children}
  </span>
);

function Section({ id, bg = "bg-paper", children }: { id?: string; bg?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${bg} border-t-[3px] border-navy px-4 py-20 md:py-28`}>
      <div className="reveal mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}

const Title = ({ a, b }: { a: string; b: string }) => (
  <h2 className="mx-auto mt-5 max-w-4xl text-center text-4xl font-black leading-[1.05] md:text-6xl">
    {a} <span className="text-outline">{b}</span>
  </h2>
);

const turma = [
  { name: "Eggman", img: eggman },
  { name: "Edmond Lebon", img: edmond },
  { name: "Bill Smith", img: bill },
  { name: "Jeen Rockfelly", img: jeen },
  { name: "Kwon Blaze Kim", img: kwon },
  { name: "Jean Phil", img: jeanphil },
  { name: "Arthur Teddington", img: arthur },
  { name: "Sebastián Perfil", img: sebastian },
  { name: "Silky", img: silky },
  { name: "Milton Bumford", img: milton },
  { name: "Abu Shalab", img: abu },
  { name: "Barnaby Nugget", img: barnaby },
];

function usePerPage() {
  const [per, setPer] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPer(w >= 1180 ? 4 : w >= 900 ? 3 : w >= 620 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return per;
}

function TurmaCarousel() {
  const per = usePerPage();
  const slides: (typeof turma[number] | null)[] = [...turma, null];
  // Every page shows exactly `per` cards; the last page slides back so it is never half empty.
  const starts = useMemo(() => {
    const last = Math.max(0, slides.length - per);
    const s: number[] = [];
    for (let i = 0; i < last; i += per) s.push(i);
    s.push(last);
    return s;
  }, [per, slides.length]);
  const pages = starts.length;
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const go = useCallback((i: number) => setPage(((i % pages) + pages) % pages), [pages]);
  const offset = (starts[Math.min(page, pages - 1)] ?? 0) * (100 / per);

  useEffect(() => {
    if (page > pages - 1) setPage(pages - 1);
  }, [pages, page]);

  useEffect(() => {
    if (paused || pages < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 3800);
    return () => clearInterval(t);
  }, [paused, pages]);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    start.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (start.current === null) return;
    setDrag(e.clientX - start.current);
  };
  const onUp = () => {
    if (start.current === null) return;
    const d = drag;
    const w = box.current?.clientWidth ?? 1;
    start.current = null;
    setDrag(0);
    const t = Math.max(45, w / (per * 3));
    if (d <= -t) go(page + 1);
    else if (d >= t) go(page - 1);
  };

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={box}
        role="group"
        aria-roledescription="carousel"
        aria-label={`Class of AI characters, group ${page + 1} of ${pages}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); go(page - 1); }
          if (e.key === "ArrowRight") { e.preventDefault(); go(page + 1); }
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="touch-pan-y select-none cursor-grab overflow-hidden px-1 py-3 active:cursor-grabbing focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-navy"
      >
        <div
          className="flex items-stretch"
          style={{
            transform: `translateX(calc(${-offset}% + ${drag}px))`,
            transition: start.current === null ? "transform .55s cubic-bezier(.22,.61,.36,1)" : "none",
          }}
        >
          {slides.map((s, i) => (
            <div key={s?.name ?? "vaga"} className="shrink-0 grow-0 px-2" style={{ flexBasis: `${100 / per}%` }}>
              {s ? (
                <img
                  src={s.img.url}
                  alt={`${s.name}, a character created with AI`}
                  width={1087}
                  height={1446}
                  loading="lazy"
                  draggable={false}
                  className="shadow-soft w-full"
                  style={{ transform: `rotate(${i % 2 ? 0.7 : -0.7}deg)` }}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-[28px] border-[3px] border-dashed border-navy bg-cream p-6 text-center">
                  <span className="font-display text-6xl leading-none text-coral">+</span>
                  <p className="font-pixel text-2xl text-navy">SPOT OPEN</p>
                  <p className="font-bold text-navy">Create your own character</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(page - 1)}
          aria-label="Previous characters"
          className="shadow-pop inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-navy bg-card font-display text-2xl font-black text-navy transition-transform hover:-translate-y-0.5 active:translate-y-1"
        >
          ←
        </button>
        <span className="font-pixel text-2xl text-navy sm:hidden">
          {String(page + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}
        </span>
        <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to character group ${i + 1}`}
              aria-current={i === page}
              className={`h-3.5 rounded-full border-2 border-navy transition-all ${i === page ? "w-9 bg-coral" : "w-3.5 bg-card hover:bg-butter"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(page + 1)}
          aria-label="Next characters"
          className="shadow-pop inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-navy bg-card font-display text-2xl font-black text-navy transition-transform hover:-translate-y-0.5 active:translate-y-1"
        >
          →
        </button>
      </div>
    </div>
  );
}

// ============= Reels reais =============

type IcoProps = { className?: string };

const HeartIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 20.7 4.3 13a5 5 0 1 1 7.1-7l.6.6.6-.6a5 5 0 1 1 7.1 7z" />
  </svg>
);

const CommentIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-4 4v-4H5a2 2 0 0 1-2-2z" />
  </svg>
);

const RepostIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9h11a3 3 0 0 1 3 3v2M15 6l3 3-3 3M20 15H9a3 3 0 0 1-3-3v-2M9 18l-3-3 3-3" />
  </svg>
);

const ShareIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
  </svg>
);

const SaveIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-5-7 5V4a1 1 0 0 1 1-1z" />
  </svg>
);

const BURST = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 24; i++) {
    const r = i % 2 ? 40 : 50;
    const a = (Math.PI * i) / 12 - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
})();

const reels = [
  {
    handle: "@abu.shalab",
    caption: "🏠 🏃",
    views: "23.7M",
    video: reelAbu,
    stats: [
      { n: "794K", label: "likes", Ico: HeartIco },
      { n: "25.6K", label: "comments", Ico: CommentIco },
      { n: "55.5K", label: "reposts", Ico: RepostIco },
      { n: "811K", label: "shares", Ico: ShareIco },
      { n: "62K", label: "saves", Ico: SaveIco },
    ],
  },
  {
    handle: "@jean_philanthrope",
    caption: "Elle m’appelle le soir, elle t’appelle bout d’chou",
    views: "36.2M",
    video: reelJean,
    featured: true,
    stats: [
      { n: "1.7M", label: "likes", Ico: HeartIco },
      { n: "52.9K", label: "comments", Ico: CommentIco },
      { n: "66.6K", label: "reposts", Ico: RepostIco },
      { n: "3.1M", label: "shares", Ico: ShareIco },
      { n: "170K", label: "saves", Ico: SaveIco },
    ],
  },
  {
    handle: "@lord.farquaad.sol",
    caption: "Feeling fresh",
    views: "3.4M",
    video: reelFarquaad,
    stats: [
      { n: "351K", label: "likes", Ico: HeartIco },
      { n: "2,608", label: "comments", Ico: CommentIco },
      { n: "22.8K", label: "reposts", Ico: RepostIco },
      { n: "263K", label: "shares", Ico: ShareIco },
      { n: "56.3K", label: "saves", Ico: SaveIco },
    ],
  },
];

const proof = [
  ["36.2M", "views on a single reel"],
  ["200K+", "followers in 24 hours"],
  ["355K", "followers with just 14 posts"],
] as const;

const proofSolo = ["3.1M", "shares on a single reel"] as const;

function ReelPhone({ reel }: { reel: (typeof reels)[number] }) {
  const v = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    let visible = false;
    const tryPlay = () => {
      if (!visible) return;
      if (el.paused) el.play().catch(() => {});
    };
    const restart = () => {
      el.currentTime = 0;
      tryPlay();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = !!e?.isIntersecting;
        if (visible) tryPlay();
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    el.addEventListener("ended", restart);
    el.addEventListener("canplay", tryPlay);
    return () => {
      io.disconnect();
      el.removeEventListener("ended", restart);
      el.removeEventListener("canplay", tryPlay);
    };
  }, []);
  const unmute = () => {
    const el = v.current;
    if (el) {
      el.muted = false;
      void el.play();
    }
    setMuted(false);
  };
  return (
    <figure className={`relative mx-auto w-full max-w-[280px] ${reel.featured ? "lg:-translate-y-10 lg:max-w-[310px]" : ""}`}>
      <span className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 rounded-full border-[3px] border-navy bg-butter px-3 py-1 font-pixel text-lg leading-none text-navy shadow-pop">
        ✦ Hyper-realistic AI
      </span>
      <div className="overflow-hidden rounded-[36px] border-[5px] border-navy bg-navy shadow-pop-lg">
        <div className="relative aspect-[9/16]">
          <video
            ref={v}
            src={reel.video.url}
            aria-label={`Reel by ${reel.handle}`}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <span className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-navy" aria-hidden="true" />
          <span className="absolute left-3 top-3 text-xs font-bold text-white drop-shadow-md">Reels</span>

          <div className="absolute right-1.5 top-7 h-28 w-28">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <polygon points={BURST} fill="var(--primary)" stroke="var(--navy)" strokeWidth="3" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
              <span className="font-display text-2xl font-black text-white">{reel.views}</span>
              <span className="font-pixel text-[11px] tracking-wide text-white">VIEWS</span>
            </div>
          </div>

          <ul className="absolute bottom-16 right-2 flex flex-col items-center gap-2.5 text-white">
            {reel.stats.map((st) => {
              const Ico = st.Ico;
              return (
                <li key={st.label} className="flex flex-col items-center" title={st.label}>
                  <Ico className="h-5 w-5 drop-shadow-md" />
                  <span className="text-[10px] font-bold drop-shadow-md">{st.n}</span>
                </li>
              );
            })}
          </ul>

          <div className="absolute inset-x-3 bottom-3 pr-10">
            <p className="text-sm font-bold text-white drop-shadow-md">{reel.handle}</p>
            <p className="mt-0.5 text-xs text-white/90 drop-shadow-md">{reel.caption}</p>
          </div>

          {muted && (
            <button
              type="button"
              onClick={unmute}
              aria-label={`Turn on sound for ${reel.handle}'s reel`}
              className="absolute inset-0 flex items-end justify-center bg-transparent pb-24 hover:bg-navy/10"
            >
              <span className="rounded-full border-[3px] border-navy bg-card px-3 py-1 text-xs font-bold text-navy shadow-pop">
                🔊 tap for sound
              </span>
            </button>
          )}
        </div>
      </div>
    </figure>
  );
}

const tools = [
  ["Writes your prompts for you", "professional prompts, even if you have no idea where to start.", 96],
  ["Creates your character", "hyper-realistic characters: type \"bowl cut\" and get a person in 4K.", 124],
  ["Swaps the person for your character", "the swap: new character, same street, same walk.", 104],
  ["Rescues the hardest shots", "turns and crowds that still look real.", 144],
  ["Adds the finish, up to 4K", "the expensive-video look: blurry in, crisp out.", 116],
] as const;

const toolBullets = [
  "No more guessing. Go straight to the tools behind this look.",
  "Know which tool to open for each shot, and why.",
  "Stop wasting time on apps that still spit out waxy-skinned, obviously fake videos.",
  "Be the one who knows, not the one asking in the comments.",
];

const N = "var(--navy)", C = "var(--primary)", B = "var(--butter)", K = "var(--sky)";
const StepArt = ({ n }: { n: number }) => {
  const common = { viewBox: "0 0 240 140", className: "h-36 w-full", "aria-hidden": true } as const;
  if (n === 0)
    return (
      <svg {...common}>
        <rect x="45" y="18" width="150" height="104" rx="10" fill="white" stroke={N} strokeWidth="4" />
        {[60, 100, 140].map((x) => (
          <g key={x}>
            <rect x={x} y="28" width="36" height="56" rx="5" fill={B} stroke={N} strokeWidth="4" />
            <circle cx={x + 18} cy="52" r="10" fill={N} />
            <path d={`M${x + 8} 50 a10 10 0 0 1 20 0 z`} fill={C} />
            <path d={`M${x + 4} 84 a14 12 0 0 1 28 0 z`} fill={N} />
          </g>
        ))}
        <rect x="62" y="94" width="80" height="5" rx="2.5" fill="var(--muted)" />
        <rect x="62" y="104" width="60" height="5" rx="2.5" fill="var(--muted)" />
        <path d="M168 122 l40 -30 l6 8 l-40 30 l-10 2 z" fill={B} stroke={N} strokeWidth="3.5" strokeLinejoin="round" />
      </svg>
    );
  if (n === 1)
    return (
      <svg {...common}>
        <rect x="92" y="10" width="56" height="78" rx="8" fill={K} stroke={N} strokeWidth="6" />
        <text x="102" y="26" fontSize="8" fontWeight="700" fill={N}>REC</text>
        <circle cx="134" cy="23" r="4" fill="var(--stamp)" />
        <circle cx="120" cy="48" r="9" fill={N} />
        <path d="M104 82 a16 14 0 0 1 32 0 z" fill={N} />
        <path d="M120 88 v44 M120 92 l-22 38 M120 92 l22 38" stroke={N} strokeWidth="5" strokeLinecap="round" />
        <circle cx="178" cy="34" r="13" fill={B} stroke={N} strokeWidth="3" />
        <path d="M178 12 v-6 M196 20 l5 -4 M162 20 l-5 -4 M200 36 h6" stroke={B} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  if (n === 2)
    return (
      <svg {...common}>
        <rect x="58" y="34" width="56" height="94" rx="8" fill={K} stroke={N} strokeWidth="4" />
        <circle cx="86" cy="70" r="11" fill="var(--muted-foreground)" />
        <path d="M66 126 a20 18 0 0 1 40 0 z" fill="var(--muted-foreground)" />
        <rect x="126" y="34" width="56" height="94" rx="8" fill={B} stroke={N} strokeWidth="4" />
        <circle cx="154" cy="68" r="13" fill={N} />
        <path d="M141 66 a13 13 0 0 1 26 0 z" fill={C} />
        <path d="M134 126 a20 18 0 0 1 40 0 z" fill={N} />
        <path d="M105 76 h20 l-6 -5 M125 98 h-20 l6 5" stroke={C} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M120 6 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="white" stroke={N} strokeWidth="3" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="78" y="22" width="84" height="84" rx="8" fill={B} stroke={N} strokeWidth="7" />
      {[[92, 40], [150, 46], [96, 88], [146, 92], [110, 32]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill="var(--muted-foreground)" />)}
      <circle cx="120" cy="56" r="13" fill={N} />
      <path d="M96 103 a24 20 0 0 1 48 0 z" fill={N} />
      <path d="M120 134 v-20 M112 121 l8 -8 l8 8" stroke={N} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="146" y="10" width="44" height="22" rx="11" fill={C} stroke={N} strokeWidth="3" />
      <text x="168" y="26" textAnchor="middle" fontSize="12" fontWeight="900" fill="white">4K</text>
    </svg>
  );
};

const steps = [
  {
    t: "Creation", bg: "bg-sky",
    d: "Create a character that sticks in people's minds from a single frame and stays identical in every video.",
    items: ["Your hyper-realistic character, made with prompts you just copy and paste", "The caricature formula: exaggerate one or two features and keep everything else almost too real", "A consistency library, so video #12 looks identical to video #1"],
  },
  {
    t: "The base video", bg: "bg-cream",
    d: "A short real-life clip. Film it yourself, ask a friend, or grab any video from the internet.",
    items: ["Calm movement, deadpan face. AI loves calm, and so does comedy.", "A simple checklist to get your video ready for the swap", "Streets and framing that make the illusion convincing"],
  },
  {
    t: "The secret tools", bg: "bg-peach", lock: true,
    d: "The part everyone wants to know. Little-known AI tools swap the person for your character, while the street, the movement and the camera stay real.",
    items: ["The secret AI tools behind these videos, revealed by name", "Which tool to use for each shot, so every take looks its best", "Click-by-click tutorials, even if you've never opened an AI tool"],
  },
  {
    t: "Finishing and posting", bg: "bg-mintbg",
    d: "Give it a high-budget look, up to 4K, and keep it sharp when you post.",
    items: ["The finishing touches that make it look \"real\"", "How to post so Instagram and TikTok keep it sharp", "Add the AI label. On every platform, every time."],
  },
];

const SparkIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3c.8 4.5 2.5 6.2 7 7-4.5.8-6.2 2.5-7 7-.8-4.5-2.5-6.2-7-7 4.5-.8 6.2-2.5 7-7z" />
  </svg>
);

const SlashIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
    <path d="M2.5 15.5 12.5 3h4.5L7 15.5z" fill="var(--primary)" />
  </svg>
);

const VideoIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="6" width="13" height="12" rx="3" />
    <path d="m15 10 6-3v10l-6-3" />
  </svg>
);

const SpeakerIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" />
  </svg>
);

const ShirtIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3 3 6l2 4 2-1v12h10V9l2 1 2-4-6-3a3 3 0 0 1-6 0z" />
  </svg>
);

const BriefcaseIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
  </svg>
);

const DollarIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M15 9.5c0-1.4-1.3-2-3-2s-3 .6-3 2 1.2 1.8 3 2.2 3 .9 3 2.3-1.3 2-3 2-3-.6-3-2" />
  </svg>
);

const ScreenIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="m10 8.5 4 2-4 2zM8 21h8M12 17v4" />
  </svg>
);

const LinkIco = ({ className }: IcoProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 14a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
    <path d="M14 10a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
  </svg>
);

type ModuleDef = { n: string; t: string; d: string; reveal?: boolean; items: string[] };

const modules: ModuleDef[] = [
  {
    n: "1", t: "The Format, Decoded",
    d: 'Why the brain says "that\'s real" and the gut says "wait…".',
    items: [
      "The anatomy of a character video, second by second",
      "Why the double take makes people comment, share and rewatch",
      "What every viral character has in common",
      "How to pick a character concept with room to grow: pages, mascots, ads, music videos and memes",
    ],
  },
  {
    n: "2", t: "Create Your Character",
    d: "A hyper-realistic character that sticks in people's minds from a single frame, identical in every video.",
    items: [
      "Your character, created with prompts you just copy and paste",
      "The caricature formula: hair, face, outfit and deadpan expression",
      "Every angle of your character, ready for the swap",
      "Your consistency library: same face, same hair, same suit",
    ],
  },
  {
    n: "3", t: "The Base Video",
    d: "The real scene your character will step into. No need to film yourself.",
    items: [
      "Three easy sources: film it, ask a friend, or use any video from the internet",
      "A simple checklist to get your video ready for the swap",
      "The slow, deadpan walk that makes everyone rewind",
      "Streets and settings that make the illusion convincing, plus privacy and consent basics",
    ],
  },
  {
    n: "4", t: "The Secret AI Tools, Revealed", reveal: true,
    d: "The most-asked question in the comments: which AI tools make this? All of them, by name, and how to use each one.",
    items: [
      "The black bars come off: every tool behind these videos, named, on a single page",
      "Your first swap, click by click: the person goes out, your character comes in",
      "Which tool to use for each type of shot, and why",
      "A premium look, even if you've never opened an AI tool",
    ],
  },
  {
    n: "5", t: "Finishing, Posting and the AI Label",
    d: "A high-budget look, crisp posting and fair play.",
    items: [
      'The finishing touches that make it look "real", up to 4K',
      "How to post so your video stays sharp on Instagram and TikTok",
      "The AI label, switched on. On every platform, every time.",
      "The basics of what's off-limits: no using real people's likeness, no impersonating anyone",
    ],
  },
  {
    n: "6", t: "The Persona Factory",
    d: "Turn one great video into a character worth following.",
    items: [
      "Name, catchphrase, quirks and a backstory",
      "Captions, hooks and music that stay in character",
      "A posting schedule you can actually stick to",
      "How to reply to comments in character",
    ],
  },
  {
    n: "7", t: "Advanced Swaps",
    d: "Go way beyond the walk.",
    items: [
      "Dance and high-motion videos",
      "Mini-stories with the same character from start to finish",
      "Longer videos for monetization programs that require that format",
      "How to fix the giveaway AI flaws: hands, faces and backgrounds",
    ],
  },
  {
    n: "8", t: "Monetization in Practice",
    d: "Put your character to work: 7 paths and how to start each one.",
    items: [
      "Brand deals: pitch and rate-card templates, plus proper disclosure with #ad and the platform's paid-partnership label",
      "Custom mascots and ads for local businesses",
      "Personalized videos, commercials, character merch and shops",
      "Platform monetization programs, affiliate links and your own products",
    ],
  },
];

function ModuleCard({ m, defaultOpen = false }: { m: ModuleDef; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article className="card-pop rounded-[24px] p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-pixel text-lg tracking-[0.15em] text-azure">MODULE {m.n}</p>
          <h3 className="mt-1 font-display text-2xl font-black text-navy">{m.t}</h3>
          <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{m.d}</p>
          {m.reveal && (
            <span className="mt-3 inline-block rounded-md bg-foreground px-2.5 py-1 text-xs font-bold tracking-wide text-butter">
              ★ THE BIG REVEAL
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? `Hide Module ${m.n} lessons` : `Show Module ${m.n} lessons`}
          className="shadow-pop flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-navy bg-butter font-display text-xl font-black text-navy transition-transform hover:-translate-y-0.5 active:translate-y-1"
        >
          {open ? "×" : "+"}
        </button>
      </div>
      {open && (
        <ul className="mt-4 space-y-2.5 border-t-2 border-dashed border-navy/20 pt-4">
          {m.items.map((it) => (
            <li key={it} className="flex gap-3 text-[15px] font-bold leading-snug text-navy">
              <SlashIco className="mt-0.5 h-4 w-4 shrink-0" />
              {it}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

const moneyPaths = [
  {
    t: "Personalized videos", flag: true, Ico: VideoIco, bg: "bg-cream",
    d: 'An AI-made "knight" character offers personalized videos on Cameo starting at US$ 20. Birthday wishes, but deadpan.',
  },
  {
    t: "Ad space", flag: true, Ico: SpeakerIco, bg: "bg-butter",
    d: 'Some character pages sell ad space, literally a little box that says "YOUR AD HERE". Very 2000s. Very real.',
  },
  {
    t: "Merch and shop", flag: true, Ico: ShirtIco, bg: "bg-peach",
    d: "Some character accounts already run little shops for products and gifts. Put that face on a mug, a T-shirt or a sticker.",
  },
  {
    t: "Brand deals", Ico: BriefcaseIco, bg: "bg-sky",
    d: "Your character walks past a store, holds a product, drops the catchphrase. Always disclose clearly: #ad and the platform's paid-partnership label. Advertising standards (like Brazil's CONAR) require ads to be clearly identified.",
  },
  {
    t: "Platform monetization", Ico: DollarIco, bg: "bg-mintbg",
    d: "Platform monetization programs, like YouTube Shorts revenue and the TikTok and Facebook creator programs, subject to each one's rules and availability.",
  },
  {
    t: "Custom work", Ico: ScreenIco, bg: "bg-cream",
    d: "The coffee shop on the corner deserves an ad people actually want to watch. Create a deadpan mascot just for them and charge for it.",
  },
  {
    t: "Affiliates and your own products", Ico: LinkIco, bg: "bg-butter",
    d: "Recommend tools you genuinely use to your audience (clearly stating it's an affiliate link) or something you made yourself. Like a course. Like this page. Hi.",
  },
];

const faqs = [
  ["Do I need to film myself?", "No. Your base video can be filmed by you, filmed by or starring a friend, or be any video from the internet. Whoever appears in it gets swapped for your character, so that face never ends up in the final video. Bringing in a friend? Just ask for their OK first."],
  ["Can I use videos from the internet?", "Yes. Any video from the internet can become your base video. The person in it gets swapped for your character, while the street, the movement and the camera stay the same. Just follow the rules of the platform you're posting on."],
  ["Which AI tools do you use?", "Nice try. 🕶️ That's the classified part, and the heart of the course. Module 4, included in both plans, removes the black bars: every tool behind these videos, by name, which one to use for each shot and why. And since AI tools change fast, the Pro Updates Lab gets a new lesson whenever a better one shows up."],
  ["I've never used AI. Can I really do this?", "Yes. Escola de Avatares was built for people starting from zero. Every step is shown click by click, the prompts are copy-and-paste, and the lessons are simple and visual. If you can follow a video on your phone, you can create your first character."],
  ["Do I need a computer?", "Recommended, but not required to get started. You can create your character on your phone. For the AI steps, a laptop or desktop makes life easier. No powerful machine needed: the AI does the heavy lifting."],
  ["What can I do with my character?", "Pretty much anything: an entertainment page, a faceless channel, a brand mascot, ads for a local business, a music video, memes or an episodic story. In Pro, the Monetization in Practice module maps out 7 ways to put your character to work."],
  ["How soon can I make my first video?", "Fast. The lessons are short and in order: you can start the same day you join, create your first character on day one, and finish your first video as soon as you complete Modules 1 to 5."],
  ["Is this allowed on Instagram and TikTok?", "Yes. Both platforms allow AI-generated content as long as you follow their rules, like turning on the AI label. We show you exactly how, plus the short list of what's off-limits: no using real people's likeness without consent and no impersonating anyone."],
  ["Are the lessons in Portuguese?", "Yes. The lessons are in Portuguese, simple and visual, and most prompts are copy-and-paste. The videos work through visuals and deadpan expressions, not dialogue, so they cross borders. The comments under them already come in more than one language."],
  ["Is it a one-time payment? How long do I get access?", "Yes, a one-time payment: $19.90 or $29.90, paid once, no monthly fee. Your login arrives by email right after purchase, and access is lifetime. Watch on any device, at your own pace, and come back whenever a new character idea hits you at 2 a.m."],
  ["What if I don't like it?", "Email us within 7 days of purchase and we'll refund 100% of your money. That's the Deadpan Guarantee."],
];

// ============= Oferta de saída (celular) =============

function ExitOffer() {
  const [show, setShow] = useState(false);
  const seen = useRef(false);

  const open = useCallback(() => {
    if (seen.current) return;
    try { if (sessionStorage.getItem("ea-exit-offer") === "1") return; } catch { /* noop */ }
    seen.current = true;
    try { sessionStorage.setItem("ea-exit-offer", "1"); } catch { /* noop */ }
    setShow(true);
  }, []);

  const close = useCallback(() => setShow(false), []);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [show, close]);

  // Abre a oferta direto quando a página é aberta com ?oferta (útil para conferir a tela).
  useEffect(() => {
    try {
      const on = new URLSearchParams(window.location.search).has("oferta") || window.location.hash === "#oferta";
      if (!on) return;
      seen.current = false;
      try { sessionStorage.removeItem("ea-exit-offer"); } catch { /* noop */ }
      setShow(true);
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    // Só no celular: gatilho de saída por tentativa de voltar.
    if (!window.matchMedia("(hover: none), (max-width: 768px)").matches) return;
    let cancelled = false;
    let pushed = false;

    const arm = () => {
      if (cancelled || pushed || seen.current) return;
      try {
        history.pushState({ exitOffer: true }, "");
        pushed = true;
      } catch { /* noop */ }
    };

    const onPop = (e: PopStateEvent) => {
      if (cancelled || !pushed) return;
      // Só abre quando o histórico realmente voltou para a entrada da armadilha.
      // A navegação por âncora (ex.: href="#pricing") também dispara popstate,
      // mas com state nulo — essa não é uma tentativa de sair.
      if (!e.state || (e.state as { exitOffer?: boolean }).exitOffer !== true) return;
      pushed = false;
      open();
      // Rearma para o caso de a pessoa fechar a oferta e tentar voltar de novo.
      window.setTimeout(arm, 300);
    };

    // No Chrome do celular o pushState precisa acontecer durante um toque real,
    // senão o botão voltar sai da página sem disparar o popstate.
    window.addEventListener("touchstart", arm, { passive: true });
    window.addEventListener("pointerdown", arm, { passive: true });
    window.addEventListener("scroll", arm, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      cancelled = true;
      window.removeEventListener("touchstart", arm);
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("scroll", arm);
      window.removeEventListener("popstate", onPop);
    };
  }, [open]);

  if (!show) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Special Pro offer" className="bg-sky-hero fixed inset-0 z-50 overflow-y-auto px-4 py-10">
      <div className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center text-center">
        <img src={logo.url} alt="Avatar School" width={560} height={560} className="w-28" />
        <span className="shadow-pop mt-4 inline-flex items-center gap-2 rounded-full border-[3px] border-navy bg-card px-5 py-2 text-xs font-black uppercase tracking-widest text-navy">
          <span className="h-2.5 w-2.5 rounded-full bg-stamp" aria-hidden="true" /> Wait, before you go
        </span>
        <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] text-navy">
          Get <span className="text-coral [-webkit-text-stroke:2px_var(--navy)] [paint-order:stroke_fill]">Pro</span> for less than Starter.
        </h2>
        <p className="mt-3 text-[17px] leading-relaxed text-navy">The <b>complete</b> method, all 8 modules, for $19.80. <b>Only on this page.</b></p>
        <div className="shadow-pop-lg relative mt-7 w-full rounded-[26px] border-[3px] border-dashed border-navy px-6 pb-6 pt-5 text-left" style={{ background: "color-mix(in oklab, var(--butter) 30%, var(--card))" }}>
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-4 grid h-16 w-16 rotate-12 place-items-center bg-coral text-center font-display text-[13px] font-black uppercase leading-tight text-primary-foreground [text-shadow:0_1px_0_var(--navy)]"
            style={{ clipPath: "polygon(50% 0,61% 18%,82% 10%,80% 32%,100% 40%,84% 56%,96% 76%,74% 78%,68% 100%,50% 86%,32% 100%,26% 78%,4% 76%,16% 56%,0 40%,20% 32%,18% 10%,39% 18%)" }}
          >
            −34%
          </span>
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-navy">Escola de Avatares · Pro</p>
          <div className="mt-3 flex items-center justify-center gap-3 text-navy">
            <span className="font-display text-2xl font-black text-stamp line-through decoration-[3px]">$29.90</span>
            <span className="font-display font-black leading-none"><span className="align-top text-2xl">$</span><span className="text-6xl">19</span><span className="align-top text-2xl">.80</span></span>
          </div>
          <ul className="mt-4 space-y-2.5 text-[15px] font-bold text-navy">
            {[
              "Persona, advanced swaps and monetization (Modules 6, 7 and 8)",
              "Prompt Vault, ready to copy and paste",
              "7-day guarantee and lifetime access",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-navy" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href={CHECKOUT_PRO_OFERTA} className="btn-pop mt-5 w-full bg-coral font-display text-lg text-primary-foreground">
            Get Pro for $19.80 <span aria-hidden="true">→</span>
          </a>
          <button type="button" onClick={close} className="btn-pop mt-3 w-full bg-card font-display text-lg text-navy">
            No, thanks
          </button>
        </div>
      </div>
    </div>
  );
}

function Index() {
  useReveal();
  const [revealed, setRevealed] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden">
      <ExitOffer />
      {/* Marquee */}
      <div className="overflow-hidden bg-navy py-3">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-display text-lg font-black uppercase text-cream">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i}>Last day <span className="text-coral">★</span></span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <header className="bg-sky-hero relative px-4 pb-24 pt-10 text-center">
        <div className="animate-drift pointer-events-none absolute left-0 top-1/3 h-24 w-56 rounded-full bg-card/80 blur-sm" />
        <div className="animate-drift pointer-events-none absolute right-0 top-2/3 h-28 w-72 rounded-full bg-card/70 blur-sm" />
        <div className="relative mx-auto max-w-[620px]">
          <span className="animate-twinkle absolute left-2 top-10 text-4xl text-butter">✦</span>
          <span className="animate-twinkle absolute right-4 top-24 text-3xl text-navy [animation-delay:1s]">✦</span>
          <img src={logo.url} alt="Avatar School logo with three AI characters" width={560} height={560} className="animate-float mx-auto w-full max-w-[560px] drop-shadow-xl" />
        </div>
        <div className="relative mt-8"><Kicker><span className="h-2.5 w-2.5 rounded-full bg-coral" /> The new AI side income</Kicker></div>
        <h1 className="relative mx-auto mt-6 max-w-3xl text-[2.6rem] font-black leading-[1.02] md:text-7xl">
          AI characters are pulling millions of views.
          <span className="text-outline block">And some platforms are already paying up to $10,000 per video.</span>
        </h1>
        <p className="relative mx-auto mt-5 max-w-2xl font-display text-xl font-bold italic leading-snug text-navy md:text-2xl">
          Learn to create yours in under 30 minutes, without showing your face and without knowing anything about AI. If you can read, type and click, you can start earning today.
        </p>
        <div className="relative mt-8 flex flex-col items-center gap-5">
          <a href="#pricing" className="btn-pop w-full max-w-sm bg-coral py-5 font-display text-xl text-primary-foreground">I want my character <span className="ml-2">→</span></a>
          <a href="#money" className="border-b-[3px] border-coral pb-1 font-bold text-navy transition-colors hover:text-coral">See how much you can earn ↓</a>
        </div>
        <p className="relative mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Escola de Avatares reveals the little-known AI tools behind these videos and shows you, step by step, how to create your character, go viral and turn views into money.
        </p>
        <div className="relative mt-6 flex flex-wrap justify-center gap-3 text-sm font-bold text-navy">
          {["🙈 No face on camera", "🔰 Zero AI experience", "⚡ Ready in under 30 minutes"].map((t) => (
            <span key={t} className="rounded-full border-2 border-navy bg-card px-4 py-2">{t}</span>
          ))}
        </div>
      </header>

      {/* Money */}
      <Section id="money" bg="bg-cream">
        <div className="text-center"><Kicker>💸 How the money comes in</Kicker></div>
        <Title a="Companies are paying" b="you to post videos." />
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg">There's a platform where big companies pay creators per view. <b>You post. The video gets views. You get paid.</b></p>

        <figure className="card-pop mx-auto mt-12 max-w-3xl overflow-hidden p-3">
          <img
            src={dinheiro.url}
            alt="Platforms that pay per posted video: platform cards with the maximum payout per video, a phone playing a reel and stacks of dollars"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full rounded-[22px] object-cover"
          />
        </figure>
        <p className="mt-3 text-center font-type text-sm text-muted-foreground">Platforms that pay per posted video</p>

        <div className="card-pop mx-auto mt-10 max-w-xl rotate-[-0.6deg] border-dashed bg-butter/70 p-6 text-center">
          <p className="font-display text-6xl font-black text-coral md:text-7xl">US$ 1</p>
          <p className="mt-1 font-bold uppercase tracking-[0.2em] text-navy">per 1,000 views*</p>
        </div>

        <div className="mx-auto mt-6 grid max-w-xl gap-4">
          {[
            ["1 video with 100K views", "US$ 100"],
            ["10 videos like that", "US$ 1,000"],
          ].map(([l, v], i) => (
            <div key={l} className="card-pop flex flex-wrap items-center justify-between gap-4 px-6 py-5" style={{ transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}>
              <span className="font-display text-xl font-black">{l}</span>
              <span className="font-display text-2xl font-black text-coral">= {v}</span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-lg">And a single reel in this format has already hit <b>36 million views</b>. Do the math.</p>

        <div className="card-pop mx-auto mt-8 max-w-xl rotate-[0.6deg] bg-navy p-8 text-cream shadow-[0_10px_0_var(--coral-d)]">
          <span className="inline-block rounded-full bg-butter px-4 py-1 font-pixel text-xl text-navy">UP TO US$ 10,000</span>
          <p className="mt-4 text-lg text-cream/85">And <b className="text-cream">Higgsfield</b>, one of the biggest AI companies in the world, pays up to <b className="text-cream">US$ 10,000</b> for a single video.</p>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-lg text-muted-foreground">With a viral character you can also land brand deals, sell as an affiliate and much more. But the fastest way to start is this: <b className="text-navy">getting paid per view.</b></p>
        <div className="mt-10 text-center"><Cta /></div>
      </Section>


      {/* Characters */}
      <Section bg="bg-sky">
        <div className="text-center"><Kicker>★ Meet the class</Kicker></div>
        <Title a="AI characters are going viral worldwide." b="In Brazil, the space is still wide open." />
        <TurmaCarousel />
        <p className="mt-4 text-center font-pixel text-xl text-muted-foreground">
          <span className="sm:hidden">← swipe or use the arrows →</span>
          <span className="hidden sm:inline">← drag, use the arrows or the dots →</span>
        </p>
        <div className="mt-8 text-center"><Cta>Create my character →</Cta></div>
      </Section>

      {/* Reels reais */}
      <Section id="reels" bg="bg-sky bg-dots">
        <div className="text-center"><Kicker>📈 Real numbers, real reels</Kicker></div>
        <h2 className="mx-auto mt-5 max-w-4xl text-center text-4xl font-black leading-[1.05] md:text-6xl">
          The numbers don't lie. <span className="italic text-azure">This is viral.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground">
          Hyper-realistic AI characters are the feed's latest craze: everyone does a double take.
          Check out three real reels in this format, credited to their creators.
        </p>

        <div className="mt-16 grid items-start gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {reels.map((r) => <ReelPhone key={r.handle} reel={r} />)}
        </div>

        <p className="mt-10 text-center font-pixel text-xl text-muted-foreground">
          Tap a video to turn on the sound 🔊
        </p>

        <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-relaxed">
          These 3 reels alone: <b className="text-navy">63M+</b> views, <b className="text-navy">2.8M+</b> likes
          and <b className="text-navy">4.1M+</b> shares. On two of the three, shares outnumbered likes.{" "}
          <span className="font-bold text-coral">The kind of video that ends up in the family group chat.</span>
        </p>

        <h3 className="mx-auto mt-8 max-w-3xl text-center text-2xl font-black md:text-4xl">
          In other words, about <span className="text-coral">US$ 63K</span> from just 3 videos.
        </h3>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {proof.map(([n, l], i) => (
            <div key={n} className={`card-pop p-6 text-center ${i === 1 ? "rotate-[0.8deg]" : "rotate-[-0.8deg]"}`}>
              <p className="font-display text-4xl font-black text-coral">{n}</p>
              <p className="mt-2 font-bold text-navy">{l}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-6 max-w-sm">
          <div className="card-pop rotate-[0.6deg] p-6 text-center">
            <p className="font-display text-4xl font-black text-coral">{proofSolo[0]}</p>
            <p className="mt-2 font-bold text-navy">{proofSolo[1]}</p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="font-display text-lg italic text-navy">Proof this format has staying power.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Public third-party reels, shown with proper credit. Numbers as of October 1, 2026.
            These are not student results.
          </p>
        </div>
      </Section>

      {/* Dossier */}
      <section className="dossier-bg border-t-[3px] border-navy px-4 py-20 md:py-28">
        <div className="reveal mx-auto max-w-[760px]">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-navy bg-stamp px-5 py-2 text-sm font-black uppercase tracking-wide text-paper shadow-pop">
              🗂️ Top secret
            </span>
          </div>
          <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-4xl font-black leading-[1.05] text-cream md:text-6xl">
            The secret AI tools{" "}
            <span className="block italic text-coral">behind these videos.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-cream/85">
            Millions of people have watched, and the comments keep asking which AI made this. Here's every tool behind these videos and what each one does. Only the names are blacked out. Module 4 reveals them all.
          </p>

          <div className="relative mx-auto mt-14 max-w-2xl">
            <span className="absolute -top-7 left-4 z-10 rounded-t-xl border-[3px] border-b-0 border-navy bg-cream px-4 py-2 font-type text-sm text-navy">
              CONFIDENTIAL · FILE CS-04
            </span>
            <svg viewBox="0 0 30 80" className="absolute -top-8 right-8 z-20 h-16 w-8" aria-hidden="true">
              <path d="M10 70 V15 a8 8 0 0 1 16 0 V60 a12 12 0 0 1 -24 0 V22" fill="none" stroke="var(--muted-foreground)" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
            <div className="dossier-paper rounded-2xl border-[3px] border-navy p-6 text-navy shadow-pop-lg md:p-8">
              <p className="pt-2 font-type text-sm leading-7">
                <b>SUBJECT:</b> the tools behind viral AI characters.<br />
                <b>STATUS:</b> names redacted.
              </p>
              <ol className="mt-4">
                {tools.map(([role, desc, w], i) => (
                  <li key={i} className="border-b-2 border-dashed border-navy/25 py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-type tracking-[0.2em] text-stamp">TOOL #{i + 1}:</span>
                      <button
                        onClick={() => setRevealed((r) => [...r, i])}
                        aria-label="Black bar: try to reveal"
                        className="h-5 rounded-sm bg-foreground transition-transform hover:-rotate-2"
                        style={{ width: w }}
                      />
                    </div>
                    <p className="mt-2 font-display text-xl font-black">{role}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-navy/80">
                      <b className="text-stamp">The secret to</b> {desc}
                    </p>
                    {revealed.includes(i) && <p className="mt-1 font-type text-sm text-stamp">Nice try. 🕶️ Only Module 4 reveals it.</p>}
                  </li>
                ))}
              </ol>
              <p className="mt-6 inline-block -rotate-3 rounded-lg border-[3px] border-stamp bg-butter/60 px-4 py-1.5 font-display text-lg font-black uppercase tracking-wide text-stamp">
                Revealed in Module 4
              </p>
              <p className="mt-4 font-type text-sm text-navy/75">This file will not self-destruct. The names stay redacted until you enroll.</p>
              <p className="mt-3 font-type text-sm text-navy/75">Tap a black bar. If you dare.</p>
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-2xl space-y-5">
            {toolBullets.map((t) => (
              <li key={t} className="flex gap-3 text-lg font-bold leading-snug text-cream">
                <span className="mt-0.5 text-butter" aria-hidden="true">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Cta>Create my character →</Cta>
            <p className="mt-4 text-sm text-cream/70">Module 4 included in both plans · 7-day guarantee</p>
          </div>
        </div>
      </section>

      {/* Why now */}
      <Section bg="bg-navy">
        <p className="text-center font-pixel text-2xl text-butter">⏳ WHY NOW</p>
        <h2 className="mx-auto mt-4 max-w-4xl text-center text-4xl font-black leading-tight text-cream md:text-6xl">
          A new era of AI video has just begun. <span className="text-outline">The time is now.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-cream/80">When a format is new, the mystery does half the work. <b className="text-cream">And you only get to be early once.</b></p>
        <div className="mt-10 text-center"><Cta /></div>
      </Section>

      {/* Steps */}
      <Section bg="bg-paper">
        <div className="text-center"><Kicker>🪄 From "huh?" to "HOW?" in 4 steps</Kicker></div>
        <h2 className="mx-auto mt-5 max-w-3xl text-center font-display text-4xl font-black leading-[1.08] text-navy md:text-6xl">
          Real video in. Out comes a{" "}
          <span className="relative inline-block">
            "Wait… is this real?"
            <svg viewBox="0 0 300 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full" aria-hidden="true">
              <path d="M3 8 Q150 1 297 7" stroke="var(--primary)" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          It all starts with a real video of someone walking through a real place: a video you film, one starring a friend, or any video from the internet. Then the secret AI tools swap whoever's on screen. No green screen, no editing skills, no acting required. The street, the movement and the camera stay real. The person becomes your character.
        </p>
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {steps.map((st, i) => (
            <article key={st.t} className={`relative rounded-[28px] border-[3px] border-navy ${st.bg} p-6 shadow-pop-lg md:p-7`}>
              <span className="absolute left-3 top-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-navy bg-coral-d font-display text-2xl font-black text-paper">{i + 1}</span>
              <div className="rounded-2xl border-[3px] border-navy bg-card px-4 py-3"><StepArt n={i} /></div>
              <p className="mt-6 font-pixel text-xl tracking-wide text-coral-d">STEP 0{i + 1}</p>
              {"lock" in st && st.lock && (
                <span className="mt-1 inline-block rounded-md bg-foreground px-2 py-0.5 text-xs font-bold text-butter">🔒 Revealed in Module 4</span>
              )}
              <h3 className="mt-1 font-display text-2xl font-black text-navy">{st.t}</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-navy/85">{st.d}</p>
              <ul className="mt-4 space-y-2.5">
                {st.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] font-bold leading-snug text-navy">
                    <span className="text-coral" aria-hidden="true">✓</span>{it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Checklist dos módulos */}
      <Section bg="bg-sky">
        <div className="text-center"><Kicker>📄 The cheat sheet</Kicker></div>
        <h2 className="mx-auto mt-5 max-w-4xl text-center font-display text-4xl font-black leading-[1.08] md:text-6xl">
          8 short modules.{" "}
          <span className="italic text-coral">The secret tools, revealed.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          Short, simple modules. Watch, practice, next. Modules 1 to 5 take you from a blank page to your first posted video, and they're in both plans. Module 4 is the big reveal: the little-known AI tools behind these videos, and how to use each one. Modules 6 to 8, the Prompt Vault, the templates and the Updates Lab are Pro-only.
        </p>

        <div className="ruled-paper mx-auto mt-14 max-w-3xl rounded-[28px] border-[3px] border-navy p-4 shadow-pop-lg md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-2xl font-black text-navy">Escola de Avatares · Module checklist</h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border-[3px] border-navy bg-butter px-3 py-1 text-xs font-black uppercase tracking-wide text-navy">Starter + Pro</span>
              <span className="rounded-full border-[3px] border-navy bg-coral-d px-3 py-1 text-xs font-black uppercase tracking-wide text-paper">Pro only</span>
            </div>
          </div>
          <ol className="relative mt-8 space-y-6 pl-8 before:absolute before:bottom-3 before:left-[9px] before:top-3 before:border-l-[3px] before:border-dashed before:border-coral">
            {modules.map((m) => (
              <li key={m.n} className="relative">
                <span className="absolute -left-8 top-7 h-4 w-4 rounded-full border-[3px] border-navy bg-card" aria-hidden="true" />
                <ModuleCard m={m} defaultOpen={m.n === "1"} />
              </li>
            ))}
            <li className="relative">
              <span className="absolute -left-8 top-7 h-4 w-4 rounded-full border-[3px] border-navy bg-card" aria-hidden="true" />
              <div className="rounded-[24px] border-[3px] border-dashed border-coral-d bg-peach/60 p-5 md:p-6">
                <span className="inline-block rounded-full border-[3px] border-coral-d bg-coral-d px-3 py-1 text-xs font-black uppercase tracking-wide text-paper">Pro bonus</span>
                <p className="mt-3 text-[15px] leading-relaxed text-navy">
                  <b className="font-display text-lg">The Updates Lab.</b> AI tools change fast. When a better one comes out, we test it and add a new lesson, so your secret arsenal never goes out of date.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-10 text-center"><Cta>Create my character →</Cta></div>
      </Section>

      {/* Secretaria de matrículas */}
      <Section bg="bg-cream">
        <div className="text-center"><Kicker>🎒 Admissions office</Kicker></div>
        <h2 className="mx-auto mt-5 max-w-4xl text-center font-display text-4xl font-black leading-[1.08] md:text-6xl">
          You've got this. <span className="text-coral">Even starting from zero.</span>
        </h2>
        <div className="relative mx-auto mt-16 max-w-2xl rotate-[-0.6deg] rounded-[28px] border-[3px] border-navy bg-butter p-6 shadow-pop-lg md:p-8">
          <span className="absolute -top-5 right-6 rotate-[3deg] rounded-lg border-[3px] border-coral-d bg-cream px-4 py-1.5 font-display text-lg font-black uppercase tracking-wide text-coral-d shadow-pop">No excuses</span>
          <ul className="space-y-5">
            {[
              ["Never used AI?", "You'll create your first character in a single day."],
              ["Never edited anything?", 'Turn an ordinary video into a "wait, is this real?".'],
              ["Don't want to show your face?", "Your character is the face. You never show yours."],
              ["Can't draw?", "Just describe the character and the AI does the rest."],
            ].map(([q, a]) => (
              <li key={q} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-[3px] border-navy bg-card">
                  <SparkIco className="h-5 w-5 text-coral-d" />
                </span>
                <p className="text-[17px] leading-snug text-navy"><b className="text-coral-d">{q}</b> {a}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 text-center"><Cta /></div>
      </Section>


      {/* Excursão da turma: o dinheiro */}
      <Section bg="bg-navy bg-dots">
        <div className="text-center">
          <span className="shadow-pop inline-flex items-center gap-2 rounded-full border-[3px] border-navy bg-butter px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">🤑 Class field trip: the money</span>
        </div>
        <h2 className="mx-auto mt-5 max-w-4xl text-center font-display text-4xl font-black leading-[1.08] text-cream md:text-6xl">
          Yes, fake people have <span className="italic text-butter">real side income.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-cream/85">
          A character with an audience is basically a tiny media company with a mustache. Here are 7 paths. Some we've spotted in the wild, others are common creator programs. None are automatic. They're possibilities, not promises.
        </p>
        <div className="mx-auto mt-14 grid max-w-5xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {moneyPaths.map((p, i) => (
            <article key={p.t} className={`rounded-[24px] border-[3px] border-navy ${p.bg} p-6 shadow-pop-lg`} style={{ transform: `rotate(${i % 2 ? 0.7 : -0.7}deg)` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-navy bg-card">
                <p.Ico className="h-6 w-6 text-coral-d" />
              </span>
              {p.flag && <p className="mt-4 font-type text-sm text-stamp">Spotted in the wild</p>}
              <h3 className="mt-1 font-display text-2xl font-black text-navy">{p.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy/85">{p.d}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" bg="bg-sky">
        <div className="text-center"><Kicker>🎟️ Enrollment open</Kicker></div>
        <div className="mt-6"><Title a="Pick your class." b="Grab your student ID." /></div>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">Two ways in. One-time payment. Lifetime access. Learn the exact method behind these videos today.</p>
        <div className="mx-auto mt-12 grid max-w-4xl items-start gap-8 md:grid-cols-2">
          {[
            {
              n: "Pro", p: "29", c: "90", href: CHECKOUT_PRO, hot: true, code: "CS-PRO-029",
              d: "Everything you need to build the character, the page and the business around it.",
              sub: "one-time payment · the most complete",
              f: [
                ["", "Everything in Starter (Modules 1 to 5), including the secret tools, unredacted"],
                ["Module 6:", "The Persona Factory (name, catchphrase, captions, music, posting rhythm, replying in character)"],
                ["Module 7:", "Advanced Swaps (dance videos, mini-stories, longer videos, fixing glitches)"],
                ["Module 8:", "Monetization in Practice, the guide to 7 paths for putting your character to work"],
                ["", "The Prompt Vault: ready-to-paste prompts for characters, swaps and fixes"],
                ["", "Character library and consistency templates"],
                ["", "Ready-to-use scene ideas for your base videos"],
                ["", "Caption, hook and catchphrase templates"],
                ["", "Posting guide for Instagram and TikTok"],
                ["", "Brand pitch and rate-card templates, with an ad-disclosure checklist"],
                ["", "Custom-work kit: pricing, proposals and delivery for business clients"],
                ["", "Platform safety checklist: AI label, ad disclosure, no impersonation"],
                ["", "The Updates Lab: new lessons whenever a better AI tool comes out"],
                ["", "All future Pro modules included"],
                ["", "Lifetime access"],
              ],
            },
            {
              n: "Starter", p: "19", c: "90", href: CHECKOUT_STARTER, code: "CS-STR-019",
              d: "The essential method. Create, swap, finish, post.",
              sub: "one-time payment",
              f: [
                ["Module 1:", "The Format, Decoded"],
                ["Module 2:", "Create Your Character (hyper-realistic, identical in every video)"],
                ["Module 3:", "The Base Video (film it, ask a friend, or use any video from the internet)"],
                ["Module 4:", "The Secret AI Tools, Revealed (every tool behind these videos, by name)"],
                ["Module 5:", "Finishing, Posting and the AI Label (crisp, up to 4K, ready to post)"],
                ["", "Click-by-click lessons, made for beginners"],
                ["", "Lifetime access to the essential method"],
                ["x", "Persona, advanced swaps, monetization guide and Prompt Vault"],
              ],
            },
          ].map((pl) => (
            <div key={pl.n} className="relative overflow-hidden rounded-[2rem] border-[3px] border-navy bg-card shadow-[0_10px_0_var(--navy)]">
              <div className={`flex items-center justify-between border-b-[3px] border-navy px-6 py-4 text-xs font-bold uppercase tracking-widest ${pl.hot ? "bg-stamp text-primary-foreground" : "bg-butter text-navy"}`}>
                <span>Student ID · {pl.n}</span>
                {!pl.hot && <span className="h-6 w-8 rounded-md border-[3px] border-navy bg-butter" />}
              </div>
              {pl.hot && (
                <div className="absolute right-2 top-1 grid h-24 w-24 rotate-12 place-items-center bg-butter text-center font-display text-[10px] font-black uppercase leading-tight text-navy" style={{ clipPath: "polygon(50% 0,61% 18%,82% 10%,80% 32%,100% 40%,84% 56%,96% 76%,74% 78%,68% 100%,50% 86%,32% 100%,26% 78%,4% 76%,16% 56%,0 40%,20% 32%,18% 10%,39% 18%)" }}>
                  Teacher's<br />pet
                </div>
              )}
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border-[3px] border-navy bg-butter">
                    {pl.hot ? <img src={proAvatar.url} alt="Pro character" className="h-full w-full object-cover" /> : (
                      <svg viewBox="0 0 80 96" className="h-full w-full"><circle cx="40" cy="40" r="14" fill="var(--navy)" /><path d="M26 38 a14 14 0 0 1 28 0 z" fill="var(--primary)" /><path d="M14 96 a26 26 0 0 1 52 0 z" fill="var(--navy)" /></svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black text-navy">{pl.n}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{pl.d}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-end gap-3 text-navy">
                  <p className="font-display font-black leading-none"><span className="align-top text-2xl">$</span><span className="text-6xl">{pl.p}</span><span className="align-top text-2xl">.{pl.c}</span></p>
                  <p className="pb-2 text-xs font-bold text-muted-foreground">{pl.sub}</p>
                </div>
                <ul className="mt-6 space-y-2 text-sm font-semibold text-navy">
                  {pl.f.map(([k, v]) => k === "x" ? (
                    <li key={v} className="flex gap-3 text-muted-foreground line-through"><span className="no-underline">✕</span>{v}</li>
                  ) : (
                    <li key={v} className="flex gap-3"><span className="text-mint font-black text-green-700">✓</span><span>{k && <b className={pl.hot ? "text-stamp" : ""}>{k} </b>}{v}</span></li>
                  ))}
                </ul>
                <a href={pl.href} className={`btn-pop mt-8 w-full ${pl.hot ? "bg-coral text-primary-foreground" : "bg-cream text-navy"}`}>Get {pl.n} for ${pl.p}.{pl.c} →</a>
                <div className="mt-4 h-8" style={{ background: "repeating-linear-gradient(90deg, var(--navy) 0 2px, transparent 2px 5px, var(--navy) 5px 6px, transparent 6px 9px)" }} />
                <div className="mt-2 flex justify-between font-mono text-[11px] uppercase text-muted-foreground"><span>Valid: for life</span><span>{pl.code}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-navy/15 bg-card/70 px-6 py-4 text-center text-sm font-semibold text-navy">
          <p>🛡️ 7-day guarantee on both plans</p>
          <p className="mt-1">One-time payment, no monthly fee · Lifetime access</p>
        </div>
        <div className="mx-auto mt-5 flex max-w-4xl gap-4 rounded-3xl border-2 border-dashed border-coral bg-card px-6 py-5 text-navy">
          <span className="text-2xl">🎓</span>
          <p>Founding class. Pay once and the plan is yours forever. Pro founders also get every future Pro module and every Updates Lab lesson, at no extra cost.</p>
        </div>
      </Section>

      {/* Student messages */}
      <Section id="mensagens-dos-alunos" bg="bg-cream">
        <div className="text-center">
          <Kicker><span aria-hidden="true">💬</span> Student messages</Kicker>
          <Title a="They applied it," b="and sent screenshots." />
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
          {[
            { name: "Lucas", image: depoLucas, h: 1210 },
            { name: "Felipe", image: depoFelipe, h: 1208 },
            { name: "André", image: depoAndre, h: 1208 },
          ].map(({ name, image, h }) => (
            <figure key={name} className="w-full max-w-[340px] overflow-hidden rounded-[28px] border-[7px] border-navy bg-navy">
              <img
                src={image.url}
                alt={`Screenshot of a chat with ${name} about their results with AI characters`}
                width={680}
                height={h}
                loading="lazy"
                className="block h-auto w-full"
              />
            </figure>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">Profile photos hidden. Results vary from person to person.</p>
        <div className="mt-10 text-center">
          <Button asChild className="btn-pop h-auto whitespace-normal bg-coral px-7 py-5 font-display text-xl font-black text-primary-foreground">
            <a href="#pricing">I want my character <span aria-hidden="true">→</span></a>
          </Button>
        </div>
      </Section>

      {/* Guarantee */}
      <section id="garantia" aria-labelledby="garantia-title" className="bg-paper px-5 py-24 text-navy">
        <div className="guarantee-ticket mx-auto max-w-2xl rounded-[28px] border-[3px] border-navy bg-butter px-5 pb-7 pt-7 text-center shadow-pop-lg sm:px-7">
          <div className="relative mx-auto mb-12 flex h-32 w-32 items-center justify-center" aria-label="7-day free pass">
            <svg viewBox="0 0 128 128" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <polygon points="64,4 75,20 94,14 97,33 116,36 109,55 125,66 109,78 116,97 97,100 94,119 75,113 64,127 53,111 34,118 31,99 12,96 19,77 3,66 19,54 12,35 31,32 34,13 53,20" className="fill-coral stroke-navy" strokeWidth="4" />
            </svg>
            <div className="relative pt-3 font-display font-black text-primary-foreground [text-shadow:0_2px_0_var(--navy)]">
              <span className="block text-6xl leading-none">7</span>
              <span className="mt-1 block text-sm leading-[0.9]">DAY FREE<br />PASS</span>
            </div>
          </div>
          <p className="font-pixel text-xl leading-tight text-coral sm:text-2xl">7-DAY UNCONDITIONAL GUARANTEE</p>
          <h2 id="garantia-title" className="mx-auto max-w-sm font-display text-3xl font-black leading-none tracking-normal sm:text-[34px]">The Deadpan Guarantee.</h2>
          <p className="mx-auto mt-1 max-w-lg font-display text-xl font-black italic leading-snug sm:text-[23px]">Refund? We'll hand it back without even raising an eyebrow.</p>
          <p className="mx-auto mt-4 max-w-lg text-base leading-[1.65] sm:text-[17px]">Join the course. Watch the lessons. Discover the names behind the black bars, create your character and make your first swap. If within 7 days of purchase you decide Escola de Avatares isn't for you, just send an email and we'll refund 100% of what you paid. No guilt trips. No &quot;are you sure?&quot; maze.</p>
          <p className="mt-4 flex items-center justify-center gap-4 font-display text-2xl font-black italic"><span aria-hidden="true" className="h-[2px] w-15 bg-navy" />The Principal</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="perguntas" aria-labelledby="faq-title" className="bg-cream px-5 pb-8 pt-16 text-navy md:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-navy bg-card px-4 py-2 text-sm font-bold uppercase tracking-widest shadow-pop"><span aria-hidden="true">◴</span> Office hours</span>
          <h2 id="faq-title" className="mt-4 font-display text-4xl font-black leading-tight tracking-normal">Questions from the <span className="text-coral-d">back of the class</span></h2>
          <p className="mt-4 text-[17px] leading-relaxed">Didn't find your answer? Email <a href="mailto:hello@charactersschool.com" className="underline underline-offset-2">hello@charactersschool.com</a> and we'll get back to you.</p>
          <Button asChild className="btn-pop mt-5 h-auto max-w-full whitespace-normal bg-coral px-6 py-4 font-display text-xl font-black text-primary-foreground">
            <a href="#pricing">Instant access for $19.90 <span aria-hidden="true">→</span></a>
          </Button>
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a], i) => (
            <div key={q} className={`overflow-hidden rounded-[20px] border-2 border-navy bg-card ${open === i ? "shadow-pop" : ""}`}>
              <Button variant="ghost" id={`faq-question-${i}`} onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`faq-answer-${i}`} className="flex h-auto min-h-[66px] w-full justify-between gap-4 whitespace-normal rounded-none px-5 py-4 text-left font-sans text-[18px] font-bold leading-relaxed text-navy hover:bg-cream">
                <span>{q}</span><span aria-hidden="true" className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-navy text-lg leading-none ${open === i ? "bg-butter" : ""}`}>{open === i ? "×" : "+"}</span>
              </Button>
              <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={open !== i} className="border-t-2 border-navy"><p className="px-5 pb-5 text-[17px] leading-relaxed">{a}</p></div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Final */}
      <section className="final-scallop relative border-t-[3px] border-navy bg-sky px-5 pb-24 pt-32 text-center text-navy md:pb-28 md:pt-36">
        <div className="mx-auto max-w-2xl">
          <div className="breach-card mx-auto flex h-[268px] w-[200px] items-center justify-center overflow-hidden rounded-[30px] border-[4px] border-dashed border-coral shadow-[0_8px_0_var(--primary)]" aria-hidden="true">
            <div className="relative mt-auto h-28 w-32 rounded-t-full bg-navy/15 before:absolute before:-top-16 before:left-1/2 before:h-20 before:w-20 before:-translate-x-1/2 before:rounded-full before:bg-navy/15">
              <span className="absolute -top-24 left-1/2 w-40 -translate-x-1/2 -rotate-6 font-display text-[42px] font-black leading-[0.9] text-coral [paint-order:stroke_fill] [-webkit-text-stroke:2px_var(--navy)] [text-shadow:3px_4px_0_var(--navy)]">Window<br />open</span>
            </div>
          </div>
          <h2 className="mt-8 text-[42px] font-black leading-[1.02] md:text-6xl">The window is open. <span className="text-outline block">Who will you create now?</span></h2>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed">While you read this, AI characters are racking up millions of views, and companies are paying for every one of them. Almost no one in Brazil knows how these videos are made. You're one click away from knowing.</p>
          <p className="mx-auto mt-3 max-w-xl text-[17px] leading-relaxed">Escola de Avatares shows you the tools, the step-by-step and how to turn views into money, even if you've never used AI.</p>
          <p className="mt-5 font-display text-2xl font-black">It's your turn to start earning.</p>
          <Button asChild className="btn-pop mt-7 h-auto w-full max-w-[300px] bg-coral py-4 font-display text-lg font-black text-primary-foreground">
            <a href={CHECKOUT_STARTER}>I want my character <span aria-hidden="true">→</span></a>
          </Button>
          <a href={CHECKOUT_PRO} className="mx-auto mt-5 block w-fit border-b-2 border-coral pb-1 font-bold">Or go all in with Pro</a>
          <div className="mx-auto mt-4 flex max-w-[420px] flex-wrap justify-center gap-x-4 gap-y-1 rounded-full border border-navy/10 bg-card/80 px-5 py-3 text-sm font-bold">
            <span>7-day guarantee</span><span>One-time payment</span><span>Lifetime access</span>
          </div>
        </div>
      </section>

      <footer className="bg-navy px-5 py-12 text-sm leading-relaxed text-cream">
        <div className="mx-auto max-w-[940px]">
          <img src={logo.url} alt="Avatar School" width={560} height={560} className="w-44" />
          <p className="mt-3 font-bold">Create ultra-realistic viral videos with AI. Honest methods.</p>
          <nav aria-label="Legal links" className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-bold">
            <a href="#perguntas">Terms</a><a href="#perguntas">Privacy</a><a href="#garantia">Refunds</a><a href="mailto:hello@charactersschool.com">Contact</a>
          </nav>
          <div className="my-7 h-px bg-cream/20" />
          <div className="space-y-3 text-cream/90">
            <p><strong className="text-cream">AI disclosure:</strong> The characters on this page are AI-generated, and some appear in scenes that look real. They are not real people. We label AI-made content and teach our students to do the same.</p>
            <p><strong className="text-cream">Earnings disclaimer:</strong> Escola de Avatares is an educational course. We do not guarantee income, views, followers or virality. The numbers on this page refer to public third-party posts, as observed on October 1, 2026. They are not student results and are not typical. Your results depend on your effort, your consistency and factors beyond anyone's control.</p>
            <p><strong className="text-cream">No affiliation:</strong> Escola de Avatares is an independent course. It is not affiliated with, endorsed or sponsored by Instagram, Facebook or Meta; TikTok or ByteDance; YouTube or Google; Cameo; any AI tool provider; or any creator, account or character shown on this page. All trademarks belong to their respective owners. Third-party reels are shown with credit; creators can request removal by emailing <a href="mailto:hello@charactersschool.com" className="underline underline-offset-2">hello@charactersschool.com</a>.</p>
          </div>
          <p className="mt-3">© {new Date().getFullYear()} {BRAND}</p>
        </div>
      </footer>
    </main>
  );
}

export default Index;
