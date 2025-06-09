"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for login logic
    toast({
      title: "Login Attempted",
      description: "Login functionality is not yet implemented.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email-login" className="font-semibold">Email</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="email" id="email-login" name="email" required placeholder="your@email.com" className="pl-10" />
        </div>
      </div>
      <div>
        <Label htmlFor="password-login" className="font-semibold">Password</Label>
        <div className="relative mt-1">
           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="password" id="password-login" name="password" required placeholder="••••••••" className="pl-10" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center">
          <Checkbox id="remember-me-login" />
          <Label htmlFor="remember-me-login" className="ml-2 block text-sm">Remember me</Label>
        </div> */}
        <Link href="#" className="text-sm text-accent hover:text-primary transition-colors duration-150 ease-in-out">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Login
      </Button>
    </form>
  );
}
