import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { config } from "@/config";
import { ArrowRight, Calendar, Globe2, Sparkles } from "lucide-react";

export default function CTASection() {
  const contactEmail = config.contact?.email ?? "hello@example.com";

  return (
    <section className="container mx-auto px-6 py-24 md:px-8">
      <div className="max-w-5xl mx-auto rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/30 p-10 shadow-lg shadow-primary/10">
        <div className="flex flex-col gap-10 text-center">
          <div className="space-y-4">
            <Badge variant="secondary" className="mx-auto flex items-center gap-2 w-fit px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              Built-in onboarding, billing, and AI tools
            </Badge>
            <h2 className="text-3xl font-semibold md:text-5xl">
              Launch your product with the guardrails investors expect
            </h2>
            <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
              VibeStack packages the hard parts—authentication, usage metering, billing, and AI workflows—so founders can focus on the experience that matters.
              Share the live preview with your stakeholders and ship confidently.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background/90 p-6 text-left backdrop-blur">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                Launch timeline
              </div>
              <p className="mt-3 text-xl font-semibold text-foreground">Go live in 5 days</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Standard flows, production data model, and prebuilt migrations give you a running start.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/90 p-6 text-left backdrop-blur">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Globe2 className="h-4 w-4 text-primary" />
                Works everywhere
              </div>
              <p className="mt-3 text-xl font-semibold text-foreground">Cloudflare-native</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Deploy on the edge with Workers, D1, and durable objects while keeping latency low for every user.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/90 p-6 text-left backdrop-blur">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Founder friendly
              </div>
              <p className="mt-3 text-xl font-semibold text-foreground">Design-first toolkit</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Tailwind tokens, shadcn/ui, and thoughtful defaults craft a premium UX without a dedicated designer.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <Link to="/sign-up">
                Book a build session
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-border/70 sm:w-auto"
              asChild
            >
              <a href={`mailto:${contactEmail}`}>Email our team</a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            No endless configuration: connect your keys, run `bun run preview`, and share your product-ready demo.
          </p>
        </div>
      </div>
    </section>
  );
}
