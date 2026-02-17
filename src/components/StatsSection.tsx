import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: '$50M+', label: 'In Sales Volume', description: 'Lifetime real estate transactions' },
  { number: '150+', label: 'Families Served', description: 'Clients who trusted Greg' },
  { number: '98%', label: 'Client Satisfaction', description: 'Based on client reviews' },
  { number: '10+', label: 'Years Experience', description: 'In the local market' },
];

const StatsSection = () => {
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
    <section id="stats" ref={sectionRef} className="py-editorial relative">
      <div className="container-editorial">
        {/* Section Header - Asymmetrical */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <div className="lg:col-span-5 lg:col-start-2">
            <span className={`editorial-subhead text-accent block mb-4 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              Track Record
            </span>
            <h2 className={`section-headline ${isVisible ? 'animate-slide-left delay-200' : 'opacity-0'}`}>
              Results That<br />
              <span className="font-bold">Speak Volumes</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-8 flex items-end">
            <p className={`body-editorial ${isVisible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
              Every number represents a family finding their perfect home,
              a seller achieving their goals, or an investor building wealth.
            </p>
          </div>
        </div>

        {/* Stats Grid - Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative p-8 border border-border/30 ${
                index % 2 === 0 ? 'lg:translate-y-8' : ''
              } ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              {/* Accent Corner */}
              <div className="absolute top-0 left-0 w-8 h-px bg-accent" />
              <div className="absolute top-0 left-0 w-px h-8 bg-accent" />

              <span className="stat-number block text-foreground">
                {stat.number}
              </span>
              <span className="editorial-subhead block mt-4 text-foreground">
                {stat.label}
              </span>
              <p className="text-sm text-muted-foreground mt-2 font-body font-light">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
