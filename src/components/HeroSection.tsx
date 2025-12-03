import { useEffect, useRef } from 'react';
import heroVideo from '@/assets/greg-hero.mp4';

interface HeroSectionProps {
  heroImage: string;
}

const HeroSection = ({ heroImage }: HeroSectionProps) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0002})`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 opacity-0-initial animate-scale-reveal"
      >
        <video
          className="w-full h-full object-cover object-center md:hidden"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
        />
        <img
          src={heroImage}
          alt="Greg McDonald - Real Estate Expert"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-end pb-16 md:pb-24 lg:pb-32">
        <div className="container-editorial">
          <div className="max-w-3xl">
            {/* Subhead */}
            <div className="opacity-0-initial animate-fade-up delay-200 mb-6 md:mb-8">
              <span className="editorial-subhead text-accent">
                Local Market Authority
              </span>
            </div>

            {/* Main Headline - Asymmetrical */}
            <h1 className="opacity-0-initial animate-slide-left delay-300">
              <span className="hero-headline block">GREG</span>
              <span className="hero-headline hero-headline-bold block -mt-2 md:-mt-4">
                MCDONALD<span className="text-accent">.</span>
              </span>
            </h1>

            {/* Description */}
            <p className="body-editorial mt-6 md:mt-8 max-w-lg opacity-0-initial animate-fade-up delay-500">
              Real Estate Professional
              <br />
              Specializing in sales in Cape Town and Mauritius
              <br />
              With a passion for renovation projects
              <br />
              Anything Property
            </p>

            {/* CTAs - Off-grid placement */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12 opacity-0-initial animate-fade-up delay-600">
              <a href="#properties" className="btn-editorial-filled">
                Browse Homes
              </a>
              <a href="#contact" className="btn-editorial">
                Work With Greg
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-editorial hidden lg:flex flex-col items-center gap-3 opacity-0-initial animate-fade-in delay-800">
          <span className="editorial-subhead text-muted-foreground writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-lr' }}>
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
