
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import StarryNightBackground from '@/components/three/StarryNightBackground';
import Image from 'next/image';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function HeroSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  const fullHeadline = "Innovating AI for a Brighter Future";
  const typedHeadlineContent = useTypewriter(fullHeadline, { typingSpeed: 70, loop: true, delayAfterTyping: 2500 });

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      setOffsetY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); 
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const renderHeadline = () => {
    const keyword = "Brighter Future";
    const keywordActual = fullHeadline.includes(keyword) ? keyword : "";
  
    let currentlyTypedKeyword = "";
    if (typedHeadlineContent.length > fullHeadline.indexOf(keywordActual)) {
      currentlyTypedKeyword = typedHeadlineContent.substring(
        fullHeadline.indexOf(keywordActual), 
        Math.min(typedHeadlineContent.length, fullHeadline.indexOf(keywordActual) + keywordActual.length)
      );
    }
  
    const beforeKeywordText = typedHeadlineContent.substring(0, fullHeadline.indexOf(keywordActual));
    const afterKeywordText = typedHeadlineContent.substring(fullHeadline.indexOf(keywordActual) + keywordActual.length);

    // Only add cursor if typing is not complete OR if it's looping and current text is shorter than full
    const showCursor = typedHeadlineContent.length < fullHeadline.length || (typedHeadlineContent.length > 0 && loop);


    if (keywordActual && typedHeadlineContent.length >= fullHeadline.indexOf(keywordActual)) {
      return (
        <>
          {beforeKeywordText}
          <span className="text-primary">{currentlyTypedKeyword}</span>
          {afterKeywordText}
          {showCursor && <span className="inline-block animate-pulse">|</span>}
        </>
      );
    }
    return <>{typedHeadlineContent}{showCursor && <span className="inline-block animate-pulse">|</span>}</>;
  };


  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className={`py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30 overflow-hidden relative ${className}`}
    >
      <div 
        className="absolute inset-0 z-0 overflow-hidden opacity-70" // Increased opacity
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      >
        <StarryNightBackground />
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline opacity-100 min-h-[100px] md:min-h-[160px]">
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
        <div className="mt-16 relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl opacity-0 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
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
