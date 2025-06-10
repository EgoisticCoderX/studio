
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Youtube, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const socialLinks = [
    {
      href: "https://www.youtube.com", // Replace with actual YouTube link
      icon: <Youtube className="h-5 w-5" />,
      label: "YouTube",
    },
    {
      href: "https://github.com/your-profile", // Replace with actual GitHub link
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
    },
    {
      href: "mailto:contact@axstudioz.ai",
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
    }
  ];

  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:px-6">
        <Logo />
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} A.X. Studioz. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            AI for the People.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {socialLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                {link.icon}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
