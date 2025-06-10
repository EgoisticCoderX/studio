
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
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, type AuthError } from 'firebase/auth';

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const handleEmailSignup: SubmitHandler<SignupFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      // Optionally, update the user's profile with the name
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: data.name });
      }
      toast({
        title: "Signup Successful",
        description: "Your account has been created.",
      });
      router.push('/'); // Redirect to home or a dashboard page
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Signup Failed",
        description: authError.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEmailSignup)} className="space-y-6">
      <div>
        <Label htmlFor="name-signup" className="font-semibold">Full Name</Label>
        <div className="relative mt-1">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text" 
            id="name-signup" 
            {...register("name")} 
            placeholder="Your Full Name" 
            className="pl-10" 
            aria-invalid={errors.name ? "true" : "false"}
          />
        </div>
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email-signup" className="font-semibold">Email</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="email" 
            id="email-signup" 
            {...register("email")} 
            placeholder="your@email.com" 
            className="pl-10" 
            aria-invalid={errors.email ? "true" : "false"}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password-signup" className="font-semibold">Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="password" 
            id="password-signup" 
            {...register("password")} 
            placeholder="Create a password" 
            className="pl-10" 
            aria-invalid={errors.password ? "true" : "false"}
          />
        </div>
        {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
      </div>
       <div>
        <Label htmlFor="confirm-password-signup" className="font-semibold">Confirm Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="password" 
            id="confirm-password-signup" 
            {...register("confirmPassword")} 
            placeholder="Confirm your password" 
            className="pl-10" 
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
        </div>
        {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
      </Button>
    </form>
  );
}
