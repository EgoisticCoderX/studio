
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export default function FoundersWordsSection({ className }: { className?: string }) {
  return (
    <section id="founders-words" className={`py-16 md:py-24 bg-gradient-animated-secondary overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 opacity-0 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
            A Message From Our Founder
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Insights and vision from the heart of A.X. Studioz.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl overflow-hidden bg-card/80 backdrop-blur-sm opacity-0 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex items-center justify-center opacity-0 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg border-4 border-primary/50">
                <Image
                  src="https://placehold.co/300x300.png"
                  alt="Founder's Name"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="professional portrait"
                />
              </div>
            </div>
            <CardContent className="md:w-2/3 p-6 md:p-8 opacity-0 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <Quote className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed mb-6">
                "At A.X. Studioz, we believe that artificial intelligence holds the key to unlocking solutions
                for humanity's greatest challenges. Our journey is driven by a commitment to ethical innovation,
                relentless curiosity, and the profound potential of AI to create a more equitable and prosperous
                future for all. We're not just building technology; we're crafting a legacy of positive impact."
              </p>
              <div>
                <h3 className="text-xl font-semibold font-headline text-primary">
                  Dr. Evelyn Hayes (Placeholder Name)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Founder & Chief Visionary Officer, A.X. Studioz
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
