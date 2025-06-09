import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  versions: { name: string; features: string[] }[];
  learnMoreLink?: string;
}

export default function ProjectCard({ title, description, icon, versions, learnMoreLink = "#" }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
      <CardHeader className="items-center text-center p-6 bg-secondary/30">
        <div className="mb-4 h-32 w-32 flex items-center justify-center">{icon}</div>
        <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        <CardDescription className="mt-1 text-foreground/70">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        {versions.map((version, index) => (
          <div key={version.name} className={index < versions.length - 1 ? "mb-6" : ""}>
            <h4 className="text-lg font-semibold mb-2 flex items-center">
              {version.name} Version
              {version.name.toLowerCase().includes('advanced') && <Badge variant="default" className="ml-2 bg-primary text-primary-foreground">Advanced</Badge>}
              {version.name.toLowerCase().includes('basic') && <Badge variant="outline" className="ml-2">Basic</Badge>}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
              {version.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={learnMoreLink}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
