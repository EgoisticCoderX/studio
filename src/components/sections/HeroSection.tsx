
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function HeroSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  const headlines = [
    "Innovating AI for a Brighter Future",
    "Empowering People with Intelligent Tech",
    "Shaping Tomorrow with Ethical AI",
    "Pioneering Advancements for Humanity"
  ];
  const typewriterIsLooping = true;

  const { typedText: typedHeadlineContent, currentFullText, isDeleting: typewriterIsDeletingCurrentState } = useTypewriter(headlines, {
    typingSpeed: 70,
    loop: typewriterIsLooping,
    delayAfterTyping: 2000 // Slightly shorter delay before deleting
  });

  const renderHeadline = () => {
    // Show cursor if:
    // 1. Not fully typed for the current phrase OR
    // 2. Looping AND (there's some text OR it's paused before deleting OR just finished deleting and about to type next)
    const showCursor = (typedHeadlineContent.length < currentFullText.length) ||
                       (typewriterIsLooping && 
                           (typedHeadlineContent.length > 0 || 
                           (typedHeadlineContent.length === currentFullText.length && !typewriterIsDeletingCurrentState) ||
                           (typewriterIsDeletingCurrentState && typedHeadlineContent.length === 0) 
                           )
                       );

    return <>{typedHeadlineContent}{showCursor && <span className="inline-block animate-pulse">|</span>}</>;
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`py-20 md:py-32 relative z-10 overflow-hidden ${className || ''}`}
    >
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline opacity-100 min-h-[100px] md:min-h-[160px] lg:min-h-[190px]">
          {renderHeadline()}
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl opacity-0 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          A.X. Studioz is at the forefront of developing intelligent solutions
          that empower individuals and transform industries for the welfare of people.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          <Button asChild size="lg" className="px-8 py-3 text-lg">
            <Link href="/#projects">Explore Our Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/#contact">Get In Touch</Link>
          </Button>
        </div>
        <div className="mt-16 relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl opacity-0 animate-fadeInUp bg-card/50 backdrop-blur-sm" style={{animationDelay: '0.6s'}}>
            <Image
              src="https://placehold.co/1200x675.png"
              alt="AI Technology Showcase"
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="futuristic interface"
              className="opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-left">
                <h2 className="text-3xl font-bold text-white">AI in Action</h2>
                <p className="text-lg text-white/80 mt-2">Visualizing the future of intelligent systems.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
