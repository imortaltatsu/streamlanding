import { config } from "@/config";
import {
  ArrowUpRight,
  Atom,
  Orbit,
  Rocket,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navLinks: NavLink[] = [
  { label: "Featured Streams", href: "#streams" },
  { label: "YeetLabs Tech", href: "#features" },
  { label: "pump.fun Dashboard", href: "https://pump.fun", external: true },
];

const socialLinks: SocialLink[] = [
  {
    label: "Join the YeetLabs Discord",
    href: "https://discord.gg/yeetlabs",
    icon: Orbit,
  },
  {
    label: "X / @yeetlabs",
    href: "https://x.com/yeetlabs",
    icon: Sparkles,
  },
  {
    label: "pump.fun",
    href: "https://pump.fun",
    icon: Rocket,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contactEmail = config.contact?.email
    ? `mailto:${config.contact.email}`
    : undefined;

  return (
    <footer className="relative border-t border-primary/25 bg-background/70 backdrop-blur">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute -top-24 right-16 h-48 w-48 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--glow-accent) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)" }} />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-[0_0_35px_var(--glow-primary)]">
              <Atom className="h-4 w-4" />
              {config.SITE_NAME}
            </div>
            <p className="max-w-xl text-muted-foreground md:text-lg">
              {config.SITE_DESCRIPTION}
            </p>
            <div className="rounded-3xl border border-accent/30 bg-card/70 p-6 text-sm text-muted-foreground shadow-[0_0_45px_var(--glow-accent)]">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-accent-foreground">
                <Sparkles className="h-4 w-4" />
                Canonical disclaimer
              </h3>
              Agentic Streamers by YeetLabs is a fan-made AI experiment inspired by Rick and Morty. All adventures are procedurally generated and pumped via pump.fun integrations.
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Quick links
              </h3>
              <ul className="space-y-3 text-sm">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="group inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-foreground transition duration-200 hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Connect across dimensions
              </h3>
              <ul className="space-y-3 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 px-3 py-2 text-muted-foreground transition duration-200 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              {contactEmail && (
                <a
                  href={contactEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/30 px-3 py-2 text-sm font-semibold text-accent-foreground transition duration-200 hover:-translate-y-1 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground/70"
                >
                  Ping the YeetLabs crew
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-primary/10 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>
            © {currentYear} {config.SITE_NAME}. Powered by AI chaos, community lore, and pump.fun liquidity loops.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
              <Orbit className="h-3.5 w-3.5" />
              Timeline-synced
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-accent-foreground">
              <Rocket className="h-3.5 w-3.5" />
              pump.fun ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
