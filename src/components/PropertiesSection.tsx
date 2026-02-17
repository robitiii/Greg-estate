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
  garage?: number;
  status: 'For Sale' | 'For Rent' | 'Pending';
}

interface PropertiesSectionProps {
  properties: Property[];
}

type PropertyCardVariant = 'featured' | 'standard';

const propertyCardStyles: Record<PropertyCardVariant, {
  containerHeight: string;
  gradientClass: string;
  priceClass: string;
  descriptionClass: string;
  metaClass: string;
  showSqFt: boolean;
  showArrow: boolean;
}> = {
  featured: {
    containerHeight: 'relative h-[400px] lg:h-full min-h-[500px]',
    gradientClass: 'from-background via-background/20',
    priceClass: 'font-display text-3xl lg:text-4xl block text-foreground',
    descriptionClass: 'font-display text-xl lg:text-2xl mt-2 text-foreground',
    metaClass: 'flex gap-6 mt-4 editorial-subhead text-muted-foreground',
    showSqFt: true,
    showArrow: true,
  },
  standard: {
    containerHeight: 'relative h-[300px] lg:h-[280px]',
    gradientClass: 'from-background via-background/30',
    priceClass: 'font-display text-2xl block text-foreground',
    descriptionClass: 'font-body text-sm mt-1 text-muted-foreground',
    metaClass: 'flex gap-4 mt-2 text-xs editorial-subhead text-muted-foreground',
    showSqFt: false,
    showArrow: false,
  },
};

const statusBadgeClass = (status: Property['status']) => {
  if (status === 'Sold') {
    return 'bg-muted-foreground';
  }

  if (status === 'Pending') {
    return 'bg-primary';
  }

  return 'bg-accent';
};

const PropertyStatusBadge = ({ status }: { status: Property['status'] }) => {
  const badgeClass = 'editorial-subhead px-3 py-1 text-background ' + statusBadgeClass(status);
  return <span className={badgeClass}>{status}</span>;
};

const PropertyCard = ({ property, variant }: { property: Property; variant: PropertyCardVariant }) => {
  const config = propertyCardStyles[variant];

  return (
    <div className={config.containerHeight}>
      <img
        src={property.image}
        alt={property.address}
        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
      />
      <div className={'absolute inset-0 bg-gradient-to-t ' + config.gradientClass + ' to-transparent'} />
      <div className='absolute top-6 left-6'>
        <PropertyStatusBadge status={property.status} />
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-6 lg:p-10'>
        <span className={config.priceClass}>{property.price}</span>
        <h3 className={config.descriptionClass}>{property.address}</h3>
        <div className={config.metaClass}>
          <span>{property.beds} Beds</span>
          <span>{property.baths} Baths</span>
          {property.garage !== undefined && <span>{property.garage} Garage</span>}
          {config.showSqFt && <span>{property.sqft}m²</span>}
        </div>
      </div>
      {config.showArrow && (
        <div className='absolute top-6 right-6 w-12 h-12 border border-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <ArrowUpRight className='w-5 h-5' />
        </div>
      )}
    </div>
  );
};

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

  const subheadClass =
    'editorial-subhead text-accent block mb-4 ' + (isVisible ? 'animate-fade-up' : 'opacity-0');
  const headlineClass = 'section-headline ' + (isVisible ? 'animate-slide-left delay-200' : 'opacity-0');
  const paragraphClass = 'body-editorial max-w-md mt-6 lg:mt-0 ' + (isVisible ? 'animate-fade-up delay-300' : 'opacity-0');
  const featuredContainerClass =
    'lg:col-span-7 lg:row-span-2 group relative overflow-hidden ' + (isVisible ? 'animate-fade-up delay-400' : 'opacity-0');
  const standardContainerClass =
    'lg:col-span-5 group relative overflow-hidden ' + (isVisible ? 'animate-fade-up' : 'opacity-0');
  const viewLinkClass = 'mt-12 lg:mt-16 text-center ' + (isVisible ? 'animate-fade-up delay-700' : 'opacity-0');

  return (
    <section ref={sectionRef} id='properties' className='py-editorial'>
      <div className='container-editorial'>
        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-20'>
          <div>
            <span className={subheadClass}>Portfolio</span>
            <h2 className={headlineClass}>
              Featured
              <br />
              <span className='font-bold'>Properties</span>
            </h2>
          </div>
          <p className={paragraphClass}>
            A curated selection of exceptional homes, each representing Greg and his commitment to quality and value.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
          {properties[0] && (
            <div className={featuredContainerClass}>
              <PropertyCard property={properties[0]} variant='featured' />
            </div>
          )}

          {properties.slice(1, 3).map((property, index) => (
            <div
              key={property.id}
              className={standardContainerClass}
              style={{ animationDelay: (500 + index * 100) + 'ms' }}
            >
              <PropertyCard property={property} variant='standard' />
            </div>
          ))}
        </div>

        <div className={viewLinkClass}>
          <a
            href='https://www.theagencygroup.co.za/agents/greg-mcdonald/62722/'
            target='_blank'
            className='btn-editorial inline-flex items-center gap-3'
          >
            View All Properties
            <ArrowUpRight className='w-4 h-4' />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
