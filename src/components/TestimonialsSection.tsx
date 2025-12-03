import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Greg's dedication to finding us the perfect home was unmatched. He listened to every detail of what we wanted and delivered beyond our expectations.",
    author: "Sarah & Michael Thompson",
    role: "First-Time Homebuyers",
  },
  {
    id: 2,
    quote: "Working with Greg made selling our family home of 30 years a smooth and emotional journey. His care and expertise made all the difference.",
    author: "Robert Chen",
    role: "Home Seller",
  },
  {
    id: 3,
    quote: "As an investor, I need an agent who understands the market deeply. Greg's insights have helped me build a portfolio that performs.",
    author: "Jennifer Williams",
    role: "Real Estate Investor",
  },
];

const TestimonialsSection = () => {
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
    <section ref={sectionRef} id="results" className="py-editorial relative overflow-hidden">
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -z-10" />

      <div className="container-editorial">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-24">
          <span className={`editorial-subhead text-accent block mb-4 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Client Stories
          </span>
          <h2 className={`section-headline ${isVisible ? 'animate-slide-left delay-200' : 'opacity-0'}`}>
            Trust Built On<br />
            <span className="font-bold">Real Results</span>
          </h2>
        </div>

        {/* Testimonials - Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative ${
                index === 0
                  ? 'lg:col-span-6'
                  : index === 1
                  ? 'lg:col-span-5 lg:col-start-8 lg:-mt-12'
                  : 'lg:col-span-6 lg:col-start-4'
              } ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              <div className="bg-card border border-border/50 p-8 lg:p-10 relative">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-accent/40 mb-6" />

                {/* Quote Text */}
                <blockquote className="font-display text-xl lg:text-2xl leading-relaxed mb-8 text-foreground">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="editorial-divider" />
                  <div>
                    <span className="font-body font-medium block text-foreground">
                      {testimonial.author}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </span>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-accent/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
