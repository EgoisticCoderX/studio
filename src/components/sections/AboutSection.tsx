
'use client';

import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection({ className: incomingClassName }: { className?: string }) {
  const values = [
    { name: 'Innovation', description: 'Continuously pushing the boundaries of AI technology.' },
    { name: 'Ethical AI', description: 'Committing to responsible and fair AI development.' },
    { name: 'Human-Centric', description: 'Focusing on solutions that genuinely benefit people.' },
    { name: 'Accessibility', description: 'Striving to make AI tools available to everyone.' },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    let currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  // Construct the final className string, handling the optional incomingClassName
  const sectionClasses = `py-16 md:py-24 overflow-hidden relative ${incomingClassName || ''}`.trim();

  return (
    <section id="about" ref={sectionRef} className={sectionClasses}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="opacity-0 animate-fadeInUp">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
              About A.X. Studioz
            </h2>
            <p className="mt-4 text-lg text-foreground/80 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              A.X. Studioz is dedicated to pioneering artificial intelligence for the betterment of humanity. We believe in harnessing the power of AI to solve real-world problems, enhance lives, and create a future where technology and human welfare go hand in hand. <br/> <br/>
              Our mission is to build ethical, innovative, and accessible AI solutions that empower individuals and communities. We are driven by a passion for discovery and a commitment to making a positive impact on the world.
            </p>
            <p className="mt-4 text-lg text-foreground/80 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}></p>
            
            <div className="mt-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-2xl font-semibold font-headline">Our Core Values</h3>
              <ul className="mt-4 space-y-3">
                {values.map((value, index) => (
                  <li key={value.name} className="flex items-start opacity-0 animate-fadeInUp" style={{ animationDelay: `${index * 150 + 750}ms` }}>
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                    <div>
                      <span className="font-semibold">{value.name}:</span> {value.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg group opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>

            <Image
              src="https://placehold.co/600x600.png"
              alt="A.X. Studioz Team or Abstract AI concept"
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
              data-ai-hint="team collaboration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
