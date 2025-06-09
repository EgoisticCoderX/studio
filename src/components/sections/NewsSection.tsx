
import NewsCard from "@/components/NewsCard";

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
  return (
    <section id="news" className={`py-16 md:py-24 bg-background overflow-hidden parallax-section ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 opacity-0 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
            Latest Updates & Insights
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Stay informed about our latest advancements, research, and company news.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div key={item.title} className="opacity-0 animate-fadeInUp h-full" style={{ animationDelay: `${index * 150 + 400}ms` }}>
              <NewsCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
