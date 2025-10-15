import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { config } from "@/config";
import {
  Brain,
  Cpu,
  Globe,
  Lock,
  Zap,
  Database,
  Code,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Integration",
    description: "Seamlessly integrate with leading AI models including GPT, Claude, and custom LLMs for intelligent application features.",
    badge: "AI-Powered",
  },
  {
    icon: Cpu,
    title: "Modern Architecture",
    description: "Build scalable applications with React, TypeScript, and serverless backend using Cloudflare Workers and Hono.",
    badge: "Modern",
  },
  {
    icon: Globe,
    title: "Global Deployment",
    description: "Deploy applications worldwide with Cloudflare Workers for sub-second response times and 99.9% uptime guarantee.",
    badge: "Scalable",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "End-to-end encryption, role-based access control, and compliance with SOC 2, GDPR, and industry standards.",
    badge: "Secure",
  },
  {
    icon: Zap,
    title: "Real-time Features",
    description: "Handle real-time data, WebSocket connections, and event-driven architectures for responsive user experiences.",
    badge: "Fast",
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Built-in database with Drizzle ORM, migrations, and type-safe queries for reliable data persistence.",
    badge: "Reliable",
  },
  {
    icon: Code,
    title: "Developer Tools",
    description: "Comprehensive tooling with TypeScript, ESLint, hot reload, and modern development workflow.",
    badge: "Developer",
  },
  {
    icon: Shield,
    title: "Authentication & Billing",
    description: "Complete user management with Better Auth, subscription handling, and payment processing built-in.",
    badge: "Complete",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="container mx-auto px-6 py-24 md:px-8 bg-muted/30"
    >
      <div className="flex flex-col items-center gap-16">
        <div className="text-center max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            Why teams choose {config.SITE_NAME}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Everything you need to build
            <span className="block text-primary">amazing applications</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            A comprehensive starter kit designed for rapid application development with modern technologies and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {features.map((feature, index) => (
            <Card key={index} className="group relative overflow-hidden border-border/50 hover:border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card">
              <CardContent className="pt-8 pb-6 relative">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
