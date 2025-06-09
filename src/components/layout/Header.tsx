

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
  { href: '/#projects', label: 'Projects' },
  { href: '/#news', label: 'News' }, // Added News link
  { href: '/#contact', label: 'Contact' },
  { href: '/explain-code', label: 'Explain Code' },
  { href: '/auth', label: 'Login' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      let currentSectionId = '';
      const headerOffset = 80; // Adjusted offset for better accuracy with fixed header

      // Iterate from bottom to top to correctly identify the "last" active section
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        if (link.href.startsWith('/#')) {
          const sectionId = link.href.substring(2);
          const sectionElement = document.getElementById(sectionId);
          if (sectionElement) {
            // A section is active if its top is less than or equal to scrollY + headerOffset
            if (sectionElement.offsetTop <= window.scrollY + headerOffset) {
              currentSectionId = sectionId;
              break; 
            }
          }
        }
      }
      
      // Fallback for when scrolled to the very top or above the first section
      if (!currentSectionId && window.scrollY < 200) {
         currentSectionId = 'hero';
      }

      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call on mount to set initial active link

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="translucent-navbar sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => {
            const isActive = link.href.startsWith('/#') && activeSection === link.href.substring(2);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-all duration-200 ease-in-out hover:text-primary hover:-translate-y-0.5 transform after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                  { 'active-nav-link': isActive }
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <div className="md:hidden">
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
                     const isActive = link.href.startsWith('/#') && activeSection === link.href.substring(2);
                    return (
                      <SheetClose asChild key={link.href}>
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
