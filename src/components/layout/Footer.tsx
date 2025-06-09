import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} A.X. Studioz. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          AI for the People.
        </p>
      </div>
    </footer>
  );
}
