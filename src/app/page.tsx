
'use client';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import NewsSection from '@/components/sections/NewsSection'; // Import NewsSection
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 }); // Adjust threshold as needed

    document.querySelectorAll('.animated-section').forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return (
    <>
    <HeroSection className="animated-section" />
    <AboutSection className="animated-section" />
    <ProjectsSection className="animated-section" />
    <NewsSection className="animated-section" /> 
    <ContactSection className="animated-section" />
  </>

  );
}
