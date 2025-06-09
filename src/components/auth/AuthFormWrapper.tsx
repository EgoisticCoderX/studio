"use client";

import { useState } from 'react';
import SolarSystem from '@/components/three/SolarSystem';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default function AuthFormWrapper() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      <Card className="w-full max-w-4xl lg:max-w-5xl shadow-2xl overflow-hidden">
        <div className={cn(
          "flex flex-col md:flex-row transition-all duration-700 ease-in-out min-h-[70vh] md:min-h-[80vh]",
           isLogin ? "md:flex-row" : "md:flex-row-reverse"
        )}>
          {/* Solar System Panel */}
          <div className="w-full md:w-1/2 h-64 md:h-auto bg-secondary/30 p-4 md:p-8 flex items-center justify-center order-1 transition-all duration-700 ease-in-out">
            <div className="w-full h-full max-w-md max-h-md aspect-square">
               <SolarSystem isAnimating={true} />
            </div>
          </div>

          {/* Form Panel */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center order-2 transition-all duration-700 ease-in-out">
            <CardContent className="p-0">
              <div className="mb-6 text-center">
                 <h1 className="text-3xl font-bold text-primary font-headline">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isLogin ? 'Login to access your A.X. Studioz account.' : 'Join A.X. Studioz to explore AI innovations.'}
                </p>
              </div>
             
              {isLogin ? <LoginForm /> : <SignupForm />}
              
              <div className="mt-6 text-center">
                <Button variant="link" onClick={toggleForm} className="text-accent hover:text-primary">
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
