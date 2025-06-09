
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  icon: ReactNode;
}

interface PlanCardProps {
  title: string;
  price: string;
  pricePeriod?: string;
  description: string;
  features: PlanFeature[];
  ctaText: string;
  ctaLink: string;
  isRecommended?: boolean;
  className?: string;
}

export default function PlanCard({
  title,
  price,
  pricePeriod = "/ month",
  description,
  features,
  ctaText,
  ctaLink,
  isRecommended = false,
  className,
}: PlanCardProps) {
  return (
    <Card className={cn(
      "flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform group hover:scale-105",
      isRecommended ? "border-primary border-2 relative" : "",
      className
    )}>
      {isRecommended && (
        <Badge 
          variant="default" 
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm bg-primary text-primary-foreground shadow-md"
        >
          Recommended
        </Badge>
      )}
      <CardHeader className="p-6 text-center">
        <CardTitle className="text-2xl font-headline mb-2 group-hover:text-primary transition-colors">{title}</CardTitle>
        <p className="text-4xl font-bold text-foreground">
          {price}
          { price !== "Custom" && <span className="text-sm font-normal text-muted-foreground">{pricePeriod}</span> }
        </p>
        <CardDescription className="mt-2 text-foreground/70 h-12">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-3 mt-0.5 shrink-0">{feature.icon || <CheckCircle className="h-5 w-5" />}</span>
              <span className="text-foreground/80">{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 border-t mt-auto">
        <Button asChild className={cn(
          "w-full text-lg py-6",
          isRecommended ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-accent hover:bg-accent/90 text-accent-foreground"
        )}>
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
