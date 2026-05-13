import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { Showcase } from '../components/landing/Showcase';
import { Features } from '../components/landing/Features';
import { FAQ } from '../components/landing/FAQ';
import { FooterCTA } from '../components/landing/FooterCTA';

export function Landing() {
  return (
    <div className="min-h-screen font-sans text-slate-800 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <FAQ />
      </main>
      <FooterCTA />
    </div>
  );
}