"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const navItems = [
  "About",
  "Services",
  "Process",
  "Solutions",
  "Impact",
  "Trust",
];

const services = [
  {
    title: "System Architecture",
    text: "Design scalable digital blueprints with clear boundaries and growth paths.",
    icon: "architecture",
  },
  {
    title: "Logic-Driven UX",
    text: "Turn complex workflows into intuitive interfaces that feel structured and fast.",
    icon: "ux",
  },
  {
    title: "Integration Layer",
    text: "Connect tools, data, and automations into one coordinated operating system.",
    icon: "integration",
  },
  {
    title: "Decision Intelligence",
    text: "Build analytics foundations that convert signals into confident actions.",
    icon: "intelligence",
  },
  {
    title: "Platform Engineering",
    text: "Ship reliable platforms with performance, observability, and maintainability.",
    icon: "platform",
  },
  {
    title: "Evolution Strategy",
    text: "Plan product layers that adapt without disrupting core operations.",
    icon: "evolution",
  },
];

const processSteps = [
  "Map the current architecture",
  "Define layered system priorities",
  "Build modular components",
  "Integrate and validate logic paths",
  "Measure, optimize, and evolve",
];

const metrics = [
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 98, suffix: "%", label: "Delivery efficiency" },
  { value: 31, suffix: "%", label: "Release velocity uplift" },
  { value: 24, suffix: "/7", label: "System observability" },
];

const testimonials = [
  {
    quote:
      "Logic Layer gave our product architecture a clear structure. Teams now ship with confidence and consistency.",
    name: "Nadia R.",
    role: "VP Product, Helix Systems",
  },
  {
    quote:
      "Their process is precise and calm. Every decision felt intentional, and performance improved across the stack.",
    name: "Ibrahim K.",
    role: "CTO, Northline Digital",
  },
];

function DrawIcon({ type }: { type: string }) {
  const drawProps = {
    initial: { pathLength: 0, opacity: 0.4 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.7 },
  };
  return (
    <motion.svg
      whileHover={{ scale: 1.06 }}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="rounded-lg border border-accent/30 bg-accent/10 p-2 text-accent transition group-hover:shadow-glow"
    >
      {type === "architecture" && (
        <>
          <motion.rect {...drawProps} x="6" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <motion.rect {...drawProps} x="24" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <motion.rect {...drawProps} x="15" y="23" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <motion.path {...drawProps} d="M16 12H24M20 17V23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {type === "ux" && (
        <>
          <motion.path {...drawProps} d="M8 13H32M8 20H22M8 27H28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <motion.circle {...drawProps} cx="27" cy="20" r="5" stroke="currentColor" strokeWidth="1.8" />
        </>
      )}
      {type === "integration" && (
        <>
          <motion.circle {...drawProps} cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
          <motion.circle {...drawProps} cx="30" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
          <motion.circle {...drawProps} cx="20" cy="30" r="4" stroke="currentColor" strokeWidth="1.8" />
          <motion.path {...drawProps} d="M13 13L17 26M27 13L23 26M14 10H26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {type === "intelligence" && (
        <>
          <motion.path {...drawProps} d="M20 7L28 11V19C28 24 25 28 20 31C15 28 12 24 12 19V11L20 7Z" stroke="currentColor" strokeWidth="1.8" />
          <motion.path {...drawProps} d="M16 19L19 22L24 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {type === "platform" && (
        <>
          <motion.rect {...drawProps} x="8" y="8" width="24" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <motion.rect {...drawProps} x="8" y="17" width="24" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <motion.rect {...drawProps} x="8" y="25" width="24" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
        </>
      )}
      {type === "evolution" && (
        <>
          <motion.path {...drawProps} d="M9 27C12 21 17 16 23 13L29 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <motion.path {...drawProps} d="M24 9H30V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <motion.circle {...drawProps} cx="10" cy="27" r="3.5" stroke="currentColor" strokeWidth="1.8" />
          <motion.circle {...drawProps} cx="23" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        </>
      )}
    </motion.svg>
  );
}

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const smooth = useSpring(rounded, { stiffness: 140, damping: 24 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = smooth.on("change", (latest) => setDisplay(Math.round(latest)));
    return () => unsubscribe();
  }, [smooth]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, { duration: 0.72, ease: [0.2, 0.9, 0.2, 1] });
    return () => controls.stop();
  }, [inView, motionValue, value]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6 }}
      className="glass interactive-zone rounded-2xl p-6 transition-shadow duration-300 hover:shadow-glow"
    >
      <p className="text-4xl font-semibold text-white">
        {display}
        {suffix}
      </p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.12 }}
        className="mt-2 text-sm text-slate-300"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

const diagramLayers = [
  {
    name: "Input Layer",
    teaser: "Controlled entry points for signals and intent.",
    detail:
      "Every touchpoint—UI, API, webhooks, imports—lands in a normalized boundary so noise never floods the core. Validation, rate shaping, and schema checks happen here before work enters the stack.",
    signals: ["Event contracts", "Auth context", "Idempotency keys"],
  },
  {
    name: "Logic Layer",
    teaser: "Decisions, rules, and orchestration in one coherent plane.",
    detail:
      "This is where business rules, workflows, and cross-cutting policies live as explicit modules—not buried in controllers. It coordinates what runs, in what order, and under which constraints.",
    signals: ["Policy graph", "Workflow engine", "State machines"],
  },
  {
    name: "System Layer",
    teaser: "Execution, integrations, and resilient infrastructure.",
    detail:
      "Services talk to databases, queues, and third parties through adapters you can swap or scale independently. Retries, circuit breaks, and observability hooks are first-class so operations stay predictable.",
    signals: ["Service mesh", "Queues & workers", "Data adapters"],
  },
  {
    name: "Insight Layer",
    teaser: "Telemetry and feedback that close the loop.",
    detail:
      "Structured metrics, traces, and product analytics roll up into dashboards and alerts. The system learns from production behavior and feeds the next design iteration without guesswork.",
    signals: ["SLIs & SLOs", "Experiment hooks", "Anomaly routing"],
  },
];

function LayerDiagram() {
  const [focused, setFocused] = useState(1);
  const layer = diagramLayers[focused]!;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:grid lg:grid-cols-[1fr_minmax(260px,320px)] lg:gap-8 lg:items-start">
      <div className="relative min-h-[280px] lg:min-h-[340px]">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 500 340" fill="none" aria-hidden>
          {diagramLayers.map((_, i) => (
            <motion.path
              key={i}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              animate={{
                opacity: focused === i ? 0.95 : i < focused ? 0.48 : 0.22,
                stroke: focused === i ? "rgba(30, 227, 207, 0.92)" : "rgba(30, 227, 207, 0.32)",
                strokeWidth: focused === i ? 2 : 1.4,
              }}
              transition={{
                pathLength: { duration: 0.62, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
                stroke: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
                strokeWidth: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
              }}
              d={`M90 ${72 + i * 62} C 180 ${92 + i * 62}, 250 ${77 + i * 62}, 340 ${97 + i * 62}`}
              strokeLinecap="round"
              strokeDasharray="4 8"
            />
          ))}
        </svg>
        <div className="relative space-y-3 pt-2">
          {diagramLayers.map((item, i) => (
            <motion.button
              type="button"
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.52, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setFocused(i)}
              aria-pressed={focused === i}
              className={`interactive-zone block w-full rounded-xl border px-4 py-3 text-left transition duration-300 ${
                focused === i
                  ? "border-accent/50 bg-accent/15 shadow-glow"
                  : "border-white/10 bg-white/[0.04] hover:border-white/25"
              }`}
              style={{ transform: `translateX(${i * 10}px)` }}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Layer {i + 1}</p>
              <p className="text-base font-medium text-white">{item.name}</p>
              <p className="mt-1 line-clamp-2 text-sm text-slate-400">{item.teaser}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative mt-8 min-h-[200px] lg:mt-0 lg:min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={focused}
            role="region"
            aria-label={`${layer.name} details`}
            initial={{ opacity: 0, x: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm lg:sticky lg:top-28"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Focus</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{layer.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{layer.detail}</p>
            <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
              {layer.signals.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MagneticButton({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.22);
    y.set((e.clientY - cy) * 0.22);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`interactive-zone inline-flex ${className ?? ""}`}
    >
      <motion.span style={{ x: springX, y: springY }} className="inline-flex items-center justify-center">
        {children}
      </motion.span>
    </motion.a>
  );
}

function ParallaxSection({
  id,
  className,
  children,
  depth = 1,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  depth?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [depth * 10, -depth * 10],
  );

  return (
    <motion.section ref={ref} id={id} style={{ y }} className={className}>
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const syncGridY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [0, -10, -18],
  );
  const syncGlowY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [0, 14, 24],
  );
  const syncDriftX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 10]);

  useEffect(() => {
    const move = (event: MouseEvent) =>
      setCursor((prev) => ({ ...prev, x: event.clientX, y: event.clientY }));
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setCursor((prev) => ({
        ...prev,
        active: Boolean(target?.closest(".interactive-zone")),
      }));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <main className="relative overflow-hidden">
      <motion.div
        style={{ y: syncGridY }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 grid-overlay opacity-[0.18]"
        />
      </motion.div>
      <motion.div
        style={{ y: syncGlowY, x: syncDriftX }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <motion.div
          animate={{ opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,227,207,0.12),transparent_40%),radial-gradient(circle_at_80%_55%,rgba(139,124,255,0.1),transparent_45%)]"
        />
      </motion.div>
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[70] hidden h-8 w-8 rounded-full md:block ${
          cursor.active ? "bg-accent/20" : "bg-white/10"
        }`}
        animate={{
          x: cursor.x - 16,
          y: cursor.y - 16,
          scale: cursor.active ? 1.45 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.3 }}
      />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/60 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#hero" className="text-lg font-semibold tracking-wide text-white">
            Logic Layer
          </a>
          <ul className="hidden gap-7 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative transition hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <MagneticButton
            href="#cta"
            className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:shadow-glow"
          >
            Start a Build
          </MagneticButton>
        </nav>
      </header>

      <ParallaxSection id="hero" depth={1.05} className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
          className="grid gap-14 lg:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <p className="mb-5 inline-block rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
              Intelligent Digital Architecture
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {"Build structured systems with layered logic and premium execution."
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.04, ease: [0.2, 0.9, 0.2, 1] }}
                    className="mr-2 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Logic Layer designs and ships modern software systems where every component connects with clarity, depth, and precision.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton
                href="#services"
                className="shine-btn rounded-full bg-accent px-7 py-3 font-medium text-bg transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                Explore Services
              </MagneticButton>
              <MagneticButton
                href="#process"
                className="rounded-full border border-white/20 px-7 py-3 font-medium text-white transition hover:border-white/40"
              >
                View Process
              </MagneticButton>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            className="glass relative rounded-3xl p-6"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
              className="absolute -top-6 left-8 h-10 w-36 rounded-xl border border-white/20 bg-white/10"
            />
            <div className="absolute -left-8 top-10 h-20 w-20 rounded-2xl border border-accent/40 bg-accent/10" />
            <div className="absolute -right-8 bottom-8 h-24 w-24 rounded-full border border-violet/40 bg-violet/10" />
            {["Signal Layer", "Logic Layer", "Execution Layer", "Insight Layer"].map((item) => (
              <div key={item} className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 last:mb-0">
                <p className="text-sm text-slate-400">Module</p>
                <p className="text-lg font-medium text-white">{item}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </ParallaxSection>

      <ParallaxSection id="about" depth={-0.75} className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">What “Logic Layer” means</h2>
            <p className="mt-6 text-slate-300">
              Logic Layer stands for building systems with depth. We treat products as connected layers: data, operations, interfaces, and decision paths.
            </p>
            <p className="mt-4 text-slate-300">
              Each layer is clear on its own and stronger together, producing architecture that scales with speed and confidence.
            </p>
          </div>
          <LayerDiagram />
        </motion.div>
      </ParallaxSection>

      <ParallaxSection id="services" depth={0.9} className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
        >
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Service Layers</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, idx) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="glass interactive-zone group rounded-2xl p-6 transition-shadow hover:shadow-glow"
              >
                <div className="mb-4">
                  <DrawIcon type={service.icon} />
                </div>
                <h3 className="text-xl font-medium text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{service.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </ParallaxSection>

      <ParallaxSection id="process" depth={-0.55} className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
        >
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-4">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step}
                whileHover={{ x: 6 }}
                className="interactive-zone relative rounded-xl border border-white/10 bg-white/[0.04] p-5 pl-12 transition hover:border-accent/40"
              >
                <div className="absolute left-5 top-6 h-3 w-3 rounded-full bg-accent" />
                {idx < processSteps.length - 1 && <div className="absolute left-[1.42rem] top-10 h-10 w-px bg-gradient-to-b from-accent/70 to-transparent" />}
                <p className="text-slate-200">
                  <span className="mr-2 text-accent">0{idx + 1}</span>
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ParallaxSection>

      <ParallaxSection id="solutions" depth={0.65} className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
          className="grid gap-6 lg:grid-cols-3"
        >
          <div className="glass interactive-zone rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-3xl font-semibold text-white">Structured solutions showcase</h2>
            <p className="mt-4 text-slate-300">From platform modernization to analytics orchestration, each engagement is organized into interoperable layers.</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Featured Stack</p>
            <p className="mt-3 text-xl text-white">Core + Integration + Intelligence</p>
          </div>
        </motion.div>
      </ParallaxSection>

      <ParallaxSection id="impact" depth={-0.85} className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
        >
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Measured impact</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <Counter key={metric.label} value={metric.value} suffix={metric.suffix} label={metric.label} />
            ))}
          </div>
        </motion.div>
      </ParallaxSection>

      <ParallaxSection id="trust" depth={0.5} className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
        >
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Trusted by ambitious teams</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <article key={item.name} className="glass interactive-zone rounded-2xl p-7 transition-shadow hover:shadow-glow">
                <p className="text-lg leading-relaxed text-slate-200">“{item.quote}”</p>
                <p className="mt-6 text-white">{item.name}</p>
                <p className="text-sm text-slate-400">{item.role}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </ParallaxSection>

      <ParallaxSection id="cta" depth={-0.45} className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
          className="glass relative overflow-hidden rounded-3xl p-10 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-violet/20" />
          <div className="relative">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Engineer your next layer of growth</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">Partner with Logic Layer to design systems that are elegant today and resilient tomorrow.</p>
            <MagneticButton
              href="#hero"
              className="shine-btn mt-8 rounded-full bg-accent px-8 py-3 font-medium text-bg transition hover:shadow-glow"
            >
              Book Discovery Session
            </MagneticButton>
          </div>
        </motion.div>
      </ParallaxSection>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Logic Layer</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-slate-200">About</a>
            <a href="#services" className="hover:text-slate-200">Services</a>
            <a href="#trust" className="hover:text-slate-200">Clients</a>
          </div>
          <div className="flex gap-4">
            <span className="h-8 w-8 rounded-full border border-white/20" />
            <span className="h-8 w-8 rounded-full border border-white/20" />
            <span className="h-8 w-8 rounded-full border border-white/20" />
          </div>
        </div>
      </footer>
    </main>
  );
}
