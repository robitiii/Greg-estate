import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Property {
  id: number;
  image: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  status: 'For Sale' | 'Sold' | 'Pending';
}

interface PropertiesSectionProps {
  properties: Property[];
}

const PropertiesSection = ({ properties }: PropertiesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="properties" className="py-editorial">
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-20">
          <div>
            <span className={`editorial-subhead text-accent block mb-4 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              Portfolio
            </span>
            <h2 className={`section-headline ${isVisible ? 'animate-slide-left delay-200' : 'opacity-0'}`}>
              Featured<br />
              <span className="font-bold">Properties</span>
            </h2>
          </div>
          <p className={`body-editorial max-w-md mt-6 lg:mt-0 ${isVisible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
            A curated selection of exceptional homes,
            each representing Greg's commitment to quality and value.
          </p>
        </div>

        {/* Magazine-Style Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured Large Property */}
          {properties[0] && (
            <div
              className={`lg:col-span-7 lg:row-span-2 group relative overflow-hidden ${
                isVisible ? 'animate-fade-up delay-400' : 'opacity-0'
              }`}
            >
              <div className="relative h-[400px] lg:h-full min-h-[500px]">
                <img
                  src={properties[0].image}
                  alt={properties[0].address}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6">
                  <span className="editorial-subhead bg-accent text-background px-4 py-2">
                    {properties[0].status}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <span className="stat-number text-3xl lg:text-4xl block text-foreground">
                    {properties[0].price}
                  </span>
                  <h3 className="font-display text-xl lg:text-2xl mt-2 text-foreground">
                    {properties[0].address}
                  </h3>
                  <div className="flex gap-6 mt-4 editorial-subhead text-muted-foreground">
                    <span>{properties[0].beds} Beds</span>
                    <span>{properties[0].baths} Baths</span>
                    <span>{properties[0].sqft} Sq Ft</span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 w-12 h-12 border border-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}

          {/* Smaller Properties */}
          {properties.slice(1, 3).map((property, index) => (
            <div
              key={property.id}
              className={`lg:col-span-5 group relative overflow-hidden ${
                isVisible ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="relative h-[300px] lg:h-[280px]">
                <img
                  src={property.image}
                  alt={property.address}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                {/* Status */}
                <div className="absolute top-4 left-4">
                  <span className={`editorial-subhead px-3 py-1 ${
                    property.status === 'Sold' 
                      ? 'bg-muted-foreground' 
                      : property.status === 'Pending'
                      ? 'bg-primary'
                      : 'bg-accent'
                  } text-background`}>
                    {property.status}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-display text-2xl block">{property.price}</span>
                  <h3 className="font-body text-sm mt-1 text-muted-foreground">
                    {property.address}
                  </h3>
                  <div className="flex gap-4 mt-2 text-xs editorial-subhead text-muted-foreground">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className={`mt-12 lg:mt-16 text-center ${isVisible ? 'animate-fade-up delay-700' : 'opacity-0'}`}>
          <a href="#" className="btn-editorial inline-flex items-center gap-3">
            View All Properties
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
