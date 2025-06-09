
"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#hero', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#founders-words', label: "Founder's Words" },
  { href: '/#projects', label: 'Projects' },
  { href: '/#plans', label: 'Plans' },
  { href: '/#news', label: 'News' },
  { href: '/#contact', label: 'Contact' },
  { href: '/auth', label: 'Login' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      let currentSectionId = '';
      const headerOffset = 80; // Height of the header

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        if (link.href.startsWith('/#')) {
          const sectionId = link.href.substring(2); // Remove '/#'
          const sectionElement = document.getElementById(sectionId);
          if (sectionElement) {
            const sectionTop = sectionElement.offsetTop;
            const sectionBottom = sectionTop + sectionElement.offsetHeight;
            if (sectionTop <= window.scrollY + headerOffset && sectionBottom > window.scrollY + headerOffset) {
              currentSectionId = sectionId;
              break; 
            }
          }
        }
      }
      
      if (!currentSectionId && window.scrollY < 200) { 
         currentSectionId = 'hero';
      }

      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300",
      hasScrolled ? "translucent-navbar border-border/40" : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => {
            const isActivePage = typeof window !== 'undefined' && window.location.pathname === link.href && !link.href.includes('#');
            // For section links, activeSection will be the id (e.g., 'about')
            // For page links (like /auth), activeSection won't match.
            const isActiveSection = link.href.startsWith('/#') && activeSection === link.href.substring(2);
            const isActive = isActivePage || isActiveSection;
            
            return (
              <Link
                key={link.label} // Using label as key since hrefs can change based on activeSection logic
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-all duration-200 ease-in-out hover:text-primary hover:-translate-y-0.5 transform after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                  { 'active-nav-link': isActive },
                  hasScrolled || activeSection !== 'hero' ? 'text-foreground' : 'text-foreground' 
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {/* Removed md:hidden to make hamburger menu button visible on all screen sizes */}
          <div> 
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
                <div className="mb-6 flex items-center justify-between">
                  <Logo />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => {
                     const isActivePage = typeof window !== 'undefined' && window.location.pathname === link.href && !link.href.includes('#');
                     const isActiveSection = link.href.startsWith('/#') && activeSection === link.href.substring(2);
                     const isActive = isActivePage || isActiveSection;
                    return (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.href}
                           className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            { 'text-primary font-semibold': isActive }
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
