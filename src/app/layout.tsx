
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import BackToTopButton from '@/components/BackToTopButton';
import StarryNightBackground from '@/components/three/StarryNightBackground';
import CustomCursor from '@/components/effects/CustomCursor'; // Added import

export const metadata: Metadata = {
  title: 'A.X. Studioz - AI for the People',
  description: 'Pioneering artificial intelligence for the betterment of humanity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col relative")}>
        <CustomCursor /> {/* Added CustomCursor component */}
        <div className="fixed inset-0 -z-10">
          <StarryNightBackground />
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow bg-transparent">{children}</main>
          <Footer />
          <Toaster />
          <BackToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
