import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { config } from "@/config";
import { Bot, Sparkles, Zap, Shield } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const primaryCta = "Explore the platform";

  return (
    <section className="container mx-auto px-6 py-24 md:px-8 md:py-32">
      <div className="grid gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-accent/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            Built for teams shipping AI products
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {config.SITE_NAME}
              <span className="block text-primary">{config.SITE_TAGLINE}</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl md:leading-relaxed">
              {config.SITE_DESCRIPTION}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group w-full sm:w-auto"
              asChild
            >
              <Link to="/sign-up">
                {primaryCta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-card/70 p-5">
              <Badge variant="secondary" className="mb-3 flex items-center gap-2 w-fit">
                <Zap className="h-4 w-4 text-primary" />
                Instant velocity
              </Badge>
              <p className="text-sm text-muted-foreground">
                Type-safe React, Workers API, and Better Auth already wired together so you can ship in days, not weeks.
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/70 p-5">
              <Badge variant="secondary" className="mb-3 flex items-center gap-2 w-fit">
                <Shield className="h-4 w-4 text-primary" />
                Production guardrails
              </Badge>
              <p className="text-sm text-muted-foreground">
                Opinionated defaults for access control, billing, usage metering, and D1 migrations keep you compliant from day one.
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/70 p-5">
              <Badge variant="secondary" className="mb-3 flex items-center gap-2 w-fit">
                <Bot className="h-4 w-4 text-primary" />
                AI-native experiences
              </Badge>
              <p className="text-sm text-muted-foreground">
                Pre-built chat surfaces and Runable Gateway integration let you showcase AI workflows without extra wiring.
              </p>
            </div>
          </div>
        </div>

        <div className="relative hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/20 via-transparent to-accent/40 p-8 shadow-xl shadow-primary/10 md:block">
          <div className="pointer-events-none absolute inset-x-6 -top-6 flex justify-between text-xs uppercase tracking-[0.3em] text-primary/70">
            <span>Ship faster</span>
            <span>Scale smarter</span>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur">
              <h2 className="text-lg font-semibold text-foreground">Live product tour</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore the full VibeStack experience—from onboarding flows to monetisation—in a guided walkthrough.
              </p>
              <Button className="mt-4" variant="secondary" asChild>
                <Link to="/billing">Review pricing flows</Link>
              </Button>
            </div>
            <div className="grid gap-4 rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Auth &amp; sessions</span>
                <Badge variant="outline">Better Auth</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Billing ready</span>
                <Badge variant="outline">Autumn</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>D1 schema</span>
                <Badge variant="outline">Drizzle ORM</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
