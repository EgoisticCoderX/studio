
'use client';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FoundersWordsSection from '@/components/sections/FoundersWordsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import NewsSection from '@/components/sections/NewsSection';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // This IntersectionObserver is for triggering animations on sections as they become visible.
    // The actual animations (fadeInUp, etc.) are defined in tailwind.config.js and applied
    // directly to elements within the section components, often with inline style for animation-delay.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // entry.target.classList.remove('opacity-0'); // If animations are opacity-based
        } else {
          // Optionally, remove the class if you want animations to re-trigger on scroll away and back
          // entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 }); // Adjust threshold as needed (0.1 means 10% of the element is visible)

    // Select all elements intended to be animated when they scroll into view.
    // These elements should have `opacity-0` initially and an animation class like `animate-fadeInUp`.
    document.querySelectorAll('.animated-entry').forEach((element) => {
      observer.observe(element);
    });
    
    // Cleanup observer on component unmount
    return () => {
      document.querySelectorAll('.animated-entry').forEach((element) => {
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
      <NewsSection /> 
      <ContactSection />
    </>
  );
}
