
'use client';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FoundersWordsSection from '@/components/sections/FoundersWordsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import PlansSection from '@/components/sections/PlansSection';
import ContactSection from '@/components/sections/ContactSection';
import NewsSection from '@/components/sections/NewsSection';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Elements with 'opacity-0' and 'animate-fadeInUp' (or similar) will animate
          // when they become visible due to CSS. This observer is primarily to add 'is-visible'
          // if more complex JS-driven animations were needed based on visibility.
          // For now, CSS handles the animation once elements are not 'opacity-0'.
          entry.target.classList.add('is-visible'); // Add for potential JS use, though CSS handles current animations
        } else {
          // Optional: remove 'is-visible' if animations should re-trigger
          // entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 }); 

    // Sections themselves (or specific elements within them) can be observed
    // if an action is needed when the *section* enters view.
    // The current setup uses `opacity-0` and `animate-fadeInUp` (etc.) on child elements,
    // which trigger based on CSS rules and inline animation delays.
    document.querySelectorAll('.opacity-0').forEach((element) => {
       observer.observe(element);
    });
    
    return () => {
      document.querySelectorAll('.opacity-0').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FoundersWordsSection />
      <ProjectsSection />
      <PlansSection />
      <NewsSection /> 
      <ContactSection />
    </>
  );
}
