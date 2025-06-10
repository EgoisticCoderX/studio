
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

export default function NewsSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("animate-fadeInUp"); // Ensure animation class is added
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, 
      }
    );

    if (sectionRef.current) {
       observer.observe(sectionRef.current); // Observe the section itself for its own animation
    }
    
    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="news" 
      ref={sectionRef} 
      className={`py-16 md:py-24 overflow-hidden opacity-0 relative ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 opacity-0" style={{ animationDelay: '0s' }}> 
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
            Latest Updates & Insights
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 opacity-0" style={{ animationDelay: '0.2s' }}>
            Stay informed about our latest advancements, research, and company news.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div
              key={item.title}
              ref={el => cardsRef.current[index] = el}
              className="opacity-0 h-full" 
              style={{ animationDelay: `${index * 150 + 400}ms` }} 
            >
              <NewsCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
