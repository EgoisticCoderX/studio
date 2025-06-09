
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection({ className }: { className?: string }) {
  const { toast } = useToast();

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
    <section id="contact" className={`py-16 md:py-24 bg-background overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 opacity-0 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
            Get In Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
                style={{ animationDelay: `${index * 150 + 450}ms` }}
              >
                {item.icon}
                {item.text}
              </div>
            ))}
            <p className="text-foreground/70 pt-4 opacity-0 animate-fadeInUp" style={{ animationDelay: `${contactItems.length * 150 + 450}ms` }}>
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
