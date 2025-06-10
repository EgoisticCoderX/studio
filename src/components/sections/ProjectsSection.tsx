
"use client";

import ProjectCard from "@/components/ProjectCard";
import BeatingHeart from "@/components/three/BeatingHeart";
import { useEffect, useRef, useState } from "react";
import CodingSymbol from "@/components/three/CodingSymbol";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Dokai",
    description: "Revolutionizing healthcare with advanced AI diagnostics and patient care.",
    icon: <BeatingHeart />,
    versions: [
      { name: "Basic", features: ["AI-powered symptom checker", "Personalized health tips", "Appointment reminders"] },
      { name: "Advanced", features: ["Medical image analysis (X-rays, MRIs)", "Predictive diagnostics for early disease detection", "Robotic surgery assistance modules"] },
    ],
    learnMoreLink: "/projects/dokai"
  },
  {
    title: "Ego",
    description: "Empowering developers with an intelligent coding assistant and platform.",
    icon: <CodingSymbol />,
    versions: [
      { name: "Basic", features: ["Smart code completion", "Real-time syntax highlighting", "Version control integration"] },
      { name: "Advanced", features: ["AI-driven code generation & refactoring", "Automated debugging and testing", "Collaborative coding environment with AI pair programmer"] },
    ],
    learnMoreLink: "/projects/ego"
  },
];


export default function ProjectsSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={cn("py-16 md:py-24 overflow-hidden relative bg-gradient-animated", className)}
    >
      <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm z-0"></div> {/* Adjusted overlay for better contrast with animated gradient */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`text-center mb-12 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
            Our Flagship AI Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Discover the innovative AI solutions we're building to shape the future.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="opacity-0 animate-fadeInUp h-full"
              style={{ animationDelay: `${index * 200 + 400}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
