
import NewsCard from "@/components/NewsCard";
import { useEffect, useRef } from "react";

const newsItems = [
  {
    title: "A.X. Studioz Launches New AI Ethics Initiative",
    date: "October 26, 2023",
    description: "We're proud to announce a new framework for ethical AI development, ensuring our technology serves humanity responsibly.",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "AI Ethics Initiative",
    link: "#",
    category: "Announcement",
    dataAiHint: "ethics policy"
  },
  {
    title: "Dokai AI Achieves Breakthrough in Early Cancer Detection",
    date: "October 15, 2023",
    description: "Our healthcare AI, Dokai, has shown promising results in identifying early signs of certain cancers from medical scans.",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Dokai AI Breakthrough",
    link: "#",
    category: "Healthcare",
    dataAiHint: "medical research"
  },
  {
    title: "Ego Coding Assistant: Now Supporting Three New Languages",
    date: "September 28, 2023",
    description: "Ego, our AI coding assistant, expands its capabilities with support for Python, Java, and C#.",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Ego Coding Assistant Update",
    link: "#",
    category: "Technology",
    dataAiHint: "software development"
  },
];

export default function NewsSection({ className }: { className?: string }) {const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2, // Adjust as needed
      }
    );

    // Observe the section itself for the initial fade-in
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="news" ref={sectionRef} className={`py-16 md:py-24 bg-background overflow-hidden parallax-section ${className} fade-in-section`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 fade-in-element">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
            Latest Updates & Insights
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 fade-in-element" style={{ transitionDelay: '0.2s' }}>
            Stay informed about our latest advancements, research, and company news.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-grid">
        </div>
      </div>
    </section>
  );
}
