
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Mail, Lock, GithubIcon, Loader2 } from "lucide-react";
import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup, type AuthError } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<null | 'google' | 'github'>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleEmailLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push('/'); 
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Login Failed",
        description: authError.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: typeof googleProvider | typeof githubProvider, providerName: 'google' | 'github') => {
    setSocialLoading(providerName);
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Login Successful",
        description: `Welcome! You've signed in with ${providerName.charAt(0).toUpperCase() + providerName.slice(1)}.`,
      });
      router.push('/');
    } catch (error) {
      const authError = error as AuthError;
      console.error(`${providerName} login error:`, authError);
      toast({
        title: "Login Failed",
        description: authError.message || `Failed to sign in with ${providerName}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleEmailLogin)} className="space-y-6">
        <div>
          <Label htmlFor="email-login" className="font-semibold">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="email" 
              id="email-login" 
              {...register("email")} 
              placeholder="your@email.com" 
              className="pl-10" 
              aria-invalid={errors.email ? "true" : "false"}
            />
          </div>
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password-login" className="font-semibold">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="password" 
              id="password-login" 
              {...register("password")} 
              placeholder="••••••••" 
              className="pl-10" 
              aria-invalid={errors.password ? "true" : "false"}
            />
          </div>
          {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-end">
          <Link href="#" className="text-sm text-accent hover:text-primary transition-colors duration-150 ease-in-out">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         <Button 
            variant="outline" 
            onClick={() => handleSocialLogin(googleProvider, 'google')} 
            disabled={socialLoading === 'google' || isLoading}
            className="w-full"
          >
           {socialLoading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" /> } 
            Sign in with Google
          </Button>
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin(githubProvider, 'github')}
          disabled={socialLoading === 'github' || isLoading}
          className="w-full"
        >
          {socialLoading === 'github' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GithubIcon className="mr-2 h-4 w-4" />}
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
}
