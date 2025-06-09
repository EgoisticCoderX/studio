
import PlanCard from "@/components/PlanCard";
import { Zap, Cpu, Users, Brain, ShieldCheck, BarChartBig } from "lucide-react";

const plans = [
  {
    title: "Starter AI Kit",
    price: "$19",
    description: "Ideal for individuals and small teams starting with AI.",
    features: [
      { text: "Basic Ego Code Completion (1 Language)", icon: <Cpu className="h-5 w-5" /> },
      { text: "Limited Dokai Health Tips", icon: <Zap className="h-5 w-5" /> },
      { text: "Community Forum Support", icon: <Users className="h-5 w-5" /> },
      { text: "1000 AI Credits/month", icon: <BarChartBig className="h-5 w-5" /> },
    ],
    ctaText: "Get Started",
    ctaLink: "/auth?plan=starter",
  },
  {
    title: "Innovator Pro",
    price: "$99",
    description: "Perfect for professionals and growing businesses needing more power.",
    features: [
      { text: "Full Ego Code Assistant (Multi-language, AI Generation)", icon: <Cpu className="h-5 w-5" /> },
      { text: "Advanced Dokai Symptom Checker & Insights", icon: <Zap className="h-5 w-5" /> },
      { text: "Priority Email Support", icon: <Users className="h-5 w-5" /> },
      { text: "10,000 AI Credits/month", icon: <BarChartBig className="h-5 w-5" /> },
      { text: "Access to New AI Models", icon: <Brain className="h-5 w-5" /> },
    ],
    ctaText: "Choose Pro",
    ctaLink: "/auth?plan=pro",
    isRecommended: true,
  },
  {
    title: "Enterprise AI Suite",
    price: "Custom",
    description: "Tailored solutions for large organizations with specific needs.",
    features: [
      { text: "Customizable Ego & Dokai Solutions", icon: <Cpu className="h-5 w-5" /> },
      { text: "Dedicated AI Model Training & Deployment", icon: <Brain className="h-5 w-5" /> },
      { text: "Premium 24/7 Support & SLA", icon: <Users className="h-5 w-5" /> },
      { text: "Unlimited AI Credits (Fair Use)", icon: <BarChartBig className="h-5 w-5" /> },
      { text: "Advanced Security & Compliance", icon: <ShieldCheck className="h-5 w-5" /> },
    ],
    ctaText: "Contact Sales",
    ctaLink: "/#contact?subject=Enterprise+Plan",
  },
];

export default function PlansSection({ className }: { className?: string }) {
  return (
    <section id="plans" className={`py-16 md:py-24 bg-background overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 opacity-0 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
            Flexible Plans for Every Innovator
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Choose the perfect plan to power your AI journey with A.X. Studioz.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={plan.title} 
              className="opacity-0 animate-fadeInUp h-full" 
              style={{ animationDelay: `${index * 150 + 400}ms` }}
            >
              <PlanCard {...plan} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
