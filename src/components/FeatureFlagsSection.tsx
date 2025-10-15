import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featureFlags } from "@/config";
import type { FeatureFlag } from "@/types/config";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  CircleSlash2,
  FlaskConical,
  Globe,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const descriptions: Record<
  FeatureFlag,
  { title: string; description: string; icon: LucideIcon }
> = {
  AUTH: {
    title: "Authentication",
    description: "Session management, Better Auth flows, and secure Cloudflare middleware are ready to go.",
    icon: ShieldCheck,
  },
  BILLING: {
    title: "Billing & Plans",
    description: "Autumn-powered subscriptions, plan management, and webhook handling included.",
    icon: TrendingUp,
  },
  USAGE: {
    title: "Usage Analytics",
    description: "Collect, display, and gate access based on per-seat or per-request usage metrics.",
    icon: Sparkles,
  },
  EXPERIMENTAL: {
    title: "Experimental Surface",
    description: "A sandbox for unreleased features. Ship a lab without impacting production flows.",
    icon: FlaskConical,
  },
  PUBLIC: {
    title: "Public API Routes",
    description: "Unauthenticated routes for marketing pages, public data, and webhook ingestion.",
    icon: Globe,
  },
};

export function FeatureFlagsSection() {
  return (
    <section className="container mx-auto px-6 py-20 md:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          Configurable by design
        </Badge>
        <h2 className="text-3xl font-semibold md:text-4xl">
          Toggle features with a single config change
        </h2>
        <p className="text-muted-foreground md:text-lg">
          VibeStack keeps frontend and Worker behaviour in sync. Update `website.config.ts` once, and every surface stays honest.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {(Object.entries(featureFlags) as [FeatureFlag, boolean][]).map(([flag, enabled]) => {
          const { title, description, icon: Icon } = descriptions[flag];
          const isLocked = flag !== "PUBLIC" && !enabled;

          return (
            <Card
              key={flag}
              className="h-full border-border/70 bg-card/80 backdrop-blur transition-all hover:border-border hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2.5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-muted-foreground tracking-wide">
                        {flag}
                      </p>
                      <h3 className="text-lg font-semibold text-foreground">
                        {title}
                      </h3>
                    </div>
                  </div>

                  <Badge
                    variant={enabled ? "outline" : "secondary"}
                    className="flex items-center gap-1.5"
                  >
                    {enabled ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Enabled
                      </>
                    ) : (
                      <>
                        <CircleSlash2 className="h-4 w-4" />
                        Off by default
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
                {isLocked && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Enable `{flag}` in `website.config.ts` to expose related UI and API routes.
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
