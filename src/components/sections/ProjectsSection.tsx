import ProjectCard from "@/components/ProjectCard";
import BeatingHeart from "@/components/three/BeatingHeart";
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
  return (
    <section id="projects" className={`py-16 md:py-24 bg-secondary/20 overflow-hidden ${className || ''}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 opacity-0 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Our Flagship AI Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Discover the innovative AI solutions we're building to shape a better tomorrow.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={project.title} className="opacity-0 animate-fadeInUp" style={{ animationDelay: `${index * 200 + 200}ms` }}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
