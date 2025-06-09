"use client";

import ProjectCard from "@/components/ProjectCard";
import BeatingHeart from "@/components/three/BeatingHeart";
import { useEffect, useRef, useState } from "react";
import CodingSymbol from "@/components/three/CodingSymbol";

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
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`py-16 md:py-24 overflow-hidden relative ${className || ""}`}
      style={{
        backgroundImage: `url('/images/projects-background.webp')`, // Replace with your background image
        backgroundSize: 'cover',
        backgroundPosition: `center ${offsetY * 0.2}px`, // Adjust parallax speed
        backgroundAttachment: 'fixed' // Helps with parallax
      }}
    >
      <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm z-0"></div> {/* Overlay for readability */}
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Our Flagship AI Projects
          </h2>
        </div>
      </div>
    </section>
  );
}
