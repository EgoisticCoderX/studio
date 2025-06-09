
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react"; 
import { useEffect, useRef, useState } from 'react';

export default function ContactSection({ className }: { className?: string }) {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 } // Adjust threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    (event.target as HTMLFormElement).reset();
  };

  const contactItems = [
    {
      icon: <Mail className="h-6 w-6 text-accent" />,
      text: <a href="mailto:contact@axstudioz.ai" className="hover:text-primary transition-colors">contact@axstudioz.ai</a>,
      key: "email"
    },
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      text: <span>+1 (555) 123-4567</span>,
      key: "phone"
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      text: <span>123 AI Lane, Innovation City, Techtopia 12345</span>,
      key: "address"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`py-16 md:py-24 bg-background overflow-hidden parallax-section ${className}`}
      style={{ backgroundPositionY: `${scrollY * 0.3}px` }} // Enhance parallax effect
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
            Get In Touch
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-lg text-foreground/80 transition-opacity duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            We'd love to hear from you. Whether you have a question about our projects,
            partnerships, or anything else, our team is ready to answer all your inquiries.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold font-headline opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>Contact Information</h3>
            {contactItems.map((item, index) => (
              <div 
                key={item.key} 
                className="flex items-center space-x-3 opacity-0 animate-fadeInUp" 
                style={{ transition: 'opacity 0.8s ease-out', transitionDelay: `${index * 0.2 + 0.5}s` }} // Smooth transition with delay
              >
                {item.icon}
                {item.text}
              </div>
            ))}
            <p className={`text-foreground/70 pt-4 transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              Connect with us to explore how A.X. Studioz can help drive innovation and create impactful AI solutions for your needs.
            </p> 
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8 border rounded-lg shadow-lg bg-card opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div>
              <Label htmlFor="name" className="font-semibold">Full Name</Label>
              <Input type="text" id="name" name="name" required className="mt-1" placeholder="Your Name" />
            </div>
            <div>
              <Label htmlFor="email" className="font-semibold">Email Address</Label>
              <Input type="email" id="email" name="email" required className="mt-1" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="subject" className="font-semibold">Subject</Label>
              <Input type="text" id="subject" name="subject" required className="mt-1" placeholder="Regarding..." />
            </div>
            <div>
              <Label htmlFor="message" className="font-semibold">Message</Label>
              <Textarea id="message" name="message" rows={5} required className="mt-1" placeholder="Your message..." />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
