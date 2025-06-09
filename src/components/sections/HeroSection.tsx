
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

export default function HeroSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    // Parallax effect is driven by global scroll, no need for sectionRef here for offsetY
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero" // Added ID for scroll spy
      ref={sectionRef} 
      className={`py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30 overflow-hidden relative ${className}`}
    >
      {/* Parallax background element */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden" 
        style={{ transform: `translateY(${offsetY * 0.3}px)` }} // Adjusted parallax speed slightly
      >
        <Image
          src="https://placehold.co/1920x1080.png" // Using a common large placeholder size
          alt="Abstract futuristic background"
          layout="fill"
          objectFit="cover"
          className="opacity-10" // Reduced opacity for subtlety
          data-ai-hint="abstract technology"
          priority
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline opacity-0 animate-fadeInUp">
          Innovating AI for a{' '}
          <span className="text-primary">Brighter Future</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl opacity-0 animate-fadeInUp-200">
          A.X. Studioz is at the forefront of developing intelligent solutions
          that empower individuals and transform industries for the welfare of people.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fadeInUp-400">
          <Button asChild size="lg" className="px-8 py-3 text-lg">
            <Link href="/#projects">Explore Our Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/#contact">Get In Touch</Link>
          </Button>
        </div>
        <div className="mt-16 relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl opacity-0 animate-fadeInUp-600">
            <Image 
              src="https://placehold.co/1200x675.png" 
              alt="AI Technology Showcase" 
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="futuristic interface"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-left">
                <h2 className="text-3xl font-bold text-white">AI in Action</h2>
                <p className="text-lg text-white/80 mt-2">Visualizing the future of intelligent systems.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
