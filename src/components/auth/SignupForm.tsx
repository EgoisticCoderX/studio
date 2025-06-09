"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock } from "lucide-react";

export default function SignupForm() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for signup logic
    toast({
      title: "Signup Attempted",
      description: "Signup functionality is not yet implemented.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name-signup" className="font-semibold">Full Name</Label>
        <div className="relative mt-1">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="text" id="name-signup" name="name" required placeholder="Your Full Name" className="pl-10" />
        </div>
      </div>
      <div>
        <Label htmlFor="email-signup" className="font-semibold">Email</Label
        ><div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="email" id="email-signup" name="email" required placeholder="your@email.com" className="pl-10" />
        </div>
      </div>
      <div>
        <Label htmlFor="password-signup" className="font-semibold">Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="password" id="password-signup" name="password" required placeholder="Create a password" className="pl-10" />
        </div>
      </div>
       <div>
        <Label htmlFor="confirm-password-signup" className="font-semibold">Confirm Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="password" id="confirm-password-signup" name="confirmPassword" required placeholder="Confirm your password" className="pl-10" />
        </div>
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Sign Up
      </Button>
    </form>
  );
}
