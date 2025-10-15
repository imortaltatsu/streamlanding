import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import portalBg from "@assets/portal-bg.png";
import characterImg from "@assets/character.png";
import streamInterface from "@assets/stream-interface.png";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Sparkles,
  Radio,
  Cpu,
  Flame,
  Link2,
  Orbit,
  Play,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StreamHighlight = {
  title: string;
  status: string;
  description: string;
  metric: string;
  delta: string;
  tags: string[];
  art?: string;
};

const streamHighlights: StreamHighlight[] = [
  {
    title: "Portal Pilot Party",
    status: "Live now",
    description:
      "Rick's AI twin spins chaotic multiverse DJ sets while Morty arbitrages viral pump.fun memes in real time.",
    metric: "16.2K viewers synced",
    delta: "+326% pump energy",
    tags: ["AI improv", "Glitch loops", "Live trading"],
    art: streamInterface,
  },
  {
    title: "Citadel Heist Heuristics",
    status: "Starting soon",
    description:
      "An interdimensional quest where AI Mortys brute-force liquidity puzzles to mint rare portal passes.",
    metric: "8.4K portal reservations",
    delta: "+92% retention",
    tags: ["Quantum co-op", "Puzzle stream"],
  },
  {
    title: "Schwifty Signal Simulator",
    status: "Community vote",
    description:
      "Viewers steer a narrative-driven pump.fun launch by feeding prompts to the AI Rick overlord.",
    metric: "36K prompt submissions",
    delta: "87% hype score",
    tags: ["Prompt battle", "Collaborative"],
  },
];

const techFeatures: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  highlight: string;
}> = [
  {
    title: "AI Reactor Core",
    description:
      "Synthetically clones Rick's decision tree to auto-generate 24/7 interdimensional stream content.",
    icon: Cpu,
    highlight: "Model mix: GPT-4o, Claude Opus, custom fine-tunes",
  },
  {
    title: "Quantum Meme Relay",
    description:
      "Pipes portal chat, pump.fun on-chain data, and Twitter lore into one surreal narrative engine.",
    icon: Radio,
    highlight: "Real-time data streaming with optimized latency",
  },
  {
    title: "Portal Liquidity Sync",
    description:
      "Auto-publishes stream catalysts straight to pump.fun so fans can ape in before the timeline collapses.",
    icon: Link2,
    highlight: "Direct pump.fun intent links & wallet deep-links",
  },
] as const;

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { heroTilt, heroLift, portalDrift } = useMemo(() => {
    const tilt = Math.min(scrollY * 0.02, 12);
    const lift = Math.min(scrollY * 0.15, 90);
    const drift = Math.min(scrollY * 0.08, 60);

    return {
      heroTilt: tilt,
      heroLift: lift,
      portalDrift: drift,
    };
  }, [scrollY]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-col gap-24">
        <section
          id="hero"
          className="relative overflow-hidden px-6 pt-24 pb-20 md:px-12 lg:px-24"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-lg transition-transform duration-[1200ms] ease-out"
              style={{
                transform: `translate3d(0, ${portalDrift * -0.4}px, 0) rotate(${heroTilt * 0.4}deg)`,
              }}
            >
              <img
                src={portalBg}
                alt="Interdimensional portal energy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col-reverse gap-16 md:flex-row md:items-center">
            <div className="w-full space-y-8 md:w-1/2">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary shadow-[0_0_25px_var(--glow-primary)]">
                <Sparkles className="h-4 w-4" />
                YeetLabs signal straight from the Citadel of Ricks
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground drop-shadow-[0_0_20px_var(--glow-primary)] md:text-6xl">
                  Enter the Agentic Streamers Multiverse
                </h1>
                <p className="max-w-xl text-base text-muted-foreground md:text-lg">
                  Dive into Agentic Streamers by YeetLabs where AI-forged Rick and Morty storylines ignite pump.fun launches with neon portals, zero-latency chat relays, and crowd-sourced chaos guiding every move.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-[0_0_45px_var(--glow-primary)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_60px_var(--glow-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <a href="https://pump.fun" target="_blank" rel="noreferrer">
                    Launch YeetLabs pump.fun portal
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </Button>
                <a
                  href="#streams"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition duration-200 hover:translate-y-[-4px] hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
                >
                  Watch featured streams
                  <Play className="h-4 w-4" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6 text-sm md:text-base">
                <div className="rounded-3xl border border-primary/30 bg-card/70 p-4 shadow-[0_0_30px_var(--glow-secondary)]">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Active universes</div>
                  <div className="text-2xl font-semibold text-primary">42</div>
                  <div className="text-xs text-muted-foreground">Simultaneous narrative branches</div>
                </div>
                <div className="rounded-3xl border border-accent/30 bg-card/70 p-4 shadow-[0_0_30px_var(--glow-accent)]">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Pump.fun TVL</div>
                  <div className="text-2xl font-semibold text-accent-foreground">$3.8M</div>
                  <div className="text-xs text-muted-foreground">Liquidity synced across timelines</div>
                </div>
              </div>
            </div>

            <div className="relative w-full md:w-1/2" style={{ perspective: "1400px" }}>
              <div
                className="relative mx-auto aspect-square w-full max-w-[420px] overflow-visible"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${heroTilt}deg) rotateY(${heroTilt * -0.6}deg)`,
                  transition: "transform 0.6s ease-out",
                }}
              >
                <div
                  className="absolute inset-0 rounded-full border border-primary/40 bg-card/40 backdrop-blur-3xl shadow-[0_0_65px_var(--glow-primary)]"
                  style={{
                    transform: `translateZ(0px) translateY(${heroLift * -0.3}px)`,
                  }}
                />
                <div
                  className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
                  style={{
                    transform: `translateZ(20px) rotate(${heroTilt * 1.2}deg)`,
                    boxShadow: "0 0 90px var(--glow-accent)",
                  }}
                />
                <img
                  src={portalBg}
                  alt="Portal energy swirl"
                  className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover opacity-80"
                  style={{
                    transform: `translateZ(10px) translateY(${heroLift * -0.25}px)`,
                    filter: "drop-shadow(0 0 45px var(--glow-primary))",
                  }}
                />
                <img
                  src={characterImg}
                  alt="Rick & Morty AI avatar"
                  className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_20px_40px_var(--shadow-portal)]"
                  style={{
                    transform: `translateZ(60px) translateY(${heroLift * -0.4}px) rotateY(${heroTilt * -0.2}deg)`,
                    transition: "transform 0.6s ease-out",
                  }}
                />
                <img
                  src={streamInterface}
                  alt="Stream interface mock"
                  className="absolute left-1/2 top-[12%] w-[220px] -translate-x-1/2 rounded-3xl border border-primary/40 bg-card/80 p-4 shadow-[0_30px_60px_var(--shadow-void)]"
                  style={{
                    transform: `translateZ(120px) translateY(${heroLift * -0.6}px) rotateX(${heroTilt * -0.3}deg)`,
                    transition: "transform 0.6s ease-out",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="streams" className="relative px-6 md:px-12 lg:px-24">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="absolute -top-40 right-24 h-56 w-56 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--glow-accent) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 left-20 h-64 w-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)" }} />
          </div>
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold md:text-4xl">
                  Featured interdimensional streams
                </h2>
                <p className="max-w-2xl text-muted-foreground">
                  Every stream blends real-time AI storytelling with pump.fun market mechanics.
                  Choose a portal and step into a timeline where the chat drives the narrative.
                </p>
              </div>
              <a
                href="https://pump.fun"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
              >
                Explore on pump.fun
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {streamHighlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-primary/25 bg-card/70 p-6 shadow-[0_0_45px_var(--glow-secondary)] transition-transform duration-300 ease-out hover:-translate-y-4 hover:shadow-[0_0_75px_var(--glow-secondary)]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `translateZ(0) translateY(${index % 2 === 0 ? -portalDrift * 0.15 : portalDrift * 0.1}px)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 20%, var(--glow-primary) 0%, transparent 55%)" }} />
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      <Orbit className="h-4 w-4" />
                      {highlight.status}
                    </div>
                    <h3 className="text-2xl font-semibold leading-tight text-foreground drop-shadow-sm">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                    {highlight.art ? (
                      <div className="overflow-hidden rounded-2xl border border-primary/20 bg-background/60 p-4 shadow-[0_0_40px_var(--glow-primary)]">
                        <img
                          src={highlight.art}
                          alt={`${highlight.title} interface preview`}
                          className="w-full rounded-xl opacity-90"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 font-semibold text-primary">
                        <Sparkles className="h-4 w-4" />
                        {highlight.metric}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 font-semibold text-accent-foreground">
                        <Flame className="h-4 w-4" />
                        {highlight.delta}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                      {highlight.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/40 bg-background/60 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative px-6 pb-24 md:px-12 lg:px-24"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="space-y-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent-foreground">
                YeetLabs × pump.fun integration core
              </span>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Built for terminal degenerates and lore hunters alike
              </h2>
              <p className="mx-auto max-w-3xl text-muted-foreground">
                From AI prompt reactors to pump.fun liquidity syncing, every system is engineered to keep the
                stream, the trade, and the story perfectly in phase.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {techFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="relative overflow-hidden rounded-[2rem] border border-accent/30 bg-card/70 p-6 shadow-[0_0_45px_var(--glow-accent)] transition duration-300 hover:-translate-y-3 hover:shadow-[0_0_70px_var(--glow-accent)]"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100" style={{ background: "radial-gradient(circle at 80% 0%, var(--glow-secondary) 0%, transparent 65%)" }} />
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <feature.icon className="h-4 w-4" />
                      Tech stack
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                      {feature.highlight}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-32 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-primary/30 bg-card/70 p-10 shadow-[0_0_60px_var(--glow-primary)]">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <h3 className="text-3xl font-semibold md:text-4xl">Ready to distort the stream timeline?</h3>
                <p className="max-w-2xl text-muted-foreground">
                  Sync your wallet, stake your fandom, and let the AI Ricks spin the wheel. Pump.fun links are baked directly into every storyline so you never miss the next portal opening.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="relative overflow-hidden rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-[0_0_45px_var(--glow-primary)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_70px_var(--glow-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <a href="https://pump.fun" target="_blank" rel="noreferrer">
                    Connect to pump.fun
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <a
                  href="mailto:support@yeetlabs.ai"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-sm font-semibold text-accent-foreground transition duration-200 hover:-translate-y-1 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground/70"
                >
                  Talk to the YeetLabs crew
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
