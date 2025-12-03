import { useEffect, useRef, useState } from 'react';

interface AboutSectionProps {
  portraitImage: string;
}

const AboutSection = ({ portraitImage }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-editorial light-section bg-[hsl(var(--bg-light))] text-[hsl(var(--fg-light))]"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image Column - Overlapping Effect */}
          <div className="lg:col-span-6 relative">
            <div className={`relative ${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
              {/* Background Shape */}
              <div className="absolute -top-8 -left-8 w-full h-full border border-[hsl(var(--fg-light)/0.1)]" />
              
              {/* Main Image */}
              <div className="relative overflow-hidden">
                <img
                  src={portraitImage}
                  alt="Greg McDonald"
                  className="w-full h-[600px] lg:h-[700px] object-cover object-top"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--fg-light)/0.3)] to-transparent" />
              </div>

              {/* Floating Quote */}
              <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-16 bg-[hsl(var(--fg-light))] text-[hsl(var(--bg-light))] p-6 lg:p-8 max-w-xs">
                <span className="font-display text-lg lg:text-xl italic leading-relaxed">
                  "Real estate is about relationships, not transactions."
                </span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-5 lg:col-start-8">
            <span className={`editorial-subhead text-[hsl(40,40%,35%)] block mb-6 ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              The Story
            </span>

            <h2 className={`section-headline text-[hsl(var(--fg-light))] mb-8 ${isVisible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
              Local Expert.<br />
              <span className="font-bold">Trusted Advisor.</span>
            </h2>

            <div className={`editorial-divider bg-[hsl(40,40%,45%)] mb-8 ${isVisible ? 'animate-line-grow delay-400' : 'w-0'}`} />

            <div className={`space-y-6 ${isVisible ? 'animate-fade-up delay-500' : 'opacity-0'}`}>
              <p className="body-editorial text-[hsl(var(--fg-light)/0.7)]">
                With over a decade of experience in the local real estate market,
                Greg McDonald has built his reputation on one fundamental principle:
                putting people first.
              </p>
              <p className="body-editorial text-[hsl(var(--fg-light)/0.7)]">
                Whether you're buying your first home, selling a family property,
                or investing in your future, Greg brings the same level of dedication,
                market expertise, and genuine care to every transaction.
              </p>
              <p className="body-editorial text-[hsl(var(--fg-light)/0.7)]">
                His approach is simple—listen intently, work tirelessly, and deliver
                results that exceed expectations. It's not about closing deals; it's
                about opening doors to new possibilities.
              </p>
            </div>

            <div className={`mt-10 ${isVisible ? 'animate-fade-up delay-600' : 'opacity-0'}`}>
              <a href="#contact" className="btn-editorial border-[hsl(var(--fg-light)/0.3)] text-[hsl(var(--fg-light))] hover:bg-[hsl(var(--fg-light))] hover:text-[hsl(var(--bg-light))]">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
