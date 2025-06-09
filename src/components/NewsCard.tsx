
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface NewsCardProps {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
  category?: string;
  dataAiHint?: string;
}

export default function NewsCard({ title, date, description, imageUrl, imageAlt, link, category, dataAiHint }: NewsCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full group hover:scale-105 transform">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
            data-ai-hint={dataAiHint || "news article"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        {category && <Badge variant="secondary" className="mb-2 self-start">{category}</Badge>}
        <CardTitle className="text-xl font-headline mb-2 group-hover:text-primary transition-colors">{title}</CardTitle>
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <CalendarDays className="h-4 w-4 mr-1.5" />
          <span>{date}</span>
        </div>
        <CardDescription className="text-sm text-foreground/80 flex-grow mb-4">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={link}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
