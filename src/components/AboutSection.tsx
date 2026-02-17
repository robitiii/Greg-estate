import ctAurumWalking from '@/assets/Ct/Aurum Walking .jpeg';
import ctCampsBay from '@/assets/Ct/Camps Bay Drone .jpeg';
import ctSeaDrone from '@/assets/Ct/Sea Drone.jpeg';
import ctSeaPoint from '@/assets/Ct/Sea Point Drone .jpeg';
import ctFishHoek from '@/assets/Ct/Fish hoek.jpeg';
import muGolfOutline from '@/assets/Mauritius/Golf .jpeg';
import muReef from '@/assets/Mauritius/Reef landscap.jpeg';
import muSugarBeach from '@/assets/Mauritius/Sugar beach over sea.jpeg';
import muWalkingBalcony from '@/assets/Mauritius/Walking balcony.jpeg';
import duArtOne from '@/assets/Dubai/0477CA74-4C4C-4D38-806B-C20CD5CC89CE_1_102_o.jpeg';
import duArtTwo from '@/assets/Dubai/6D52906A-A210-4CB8-9F6B-B0970172EA5A_1_102_o.jpeg';
import duArtThree from '@/assets/Dubai/7DECCE22-8CF4-4E57-9C7E-6404D911213F_1_102_o.jpeg';
import duArtFour from '@/assets/Dubai/A6F88C5B-E5DF-4739-858A-2364AEA0E8CC_1_102_o.jpeg';
import { useEffect, useRef, useState } from 'react';

interface GalleryTile {
  label: string;
  aspect?: 'square' | 'portrait';
  image?: string;
}

interface GalleryCollection {
  id: string;
  title: string;
  subtitle: string;
  align: 'left' | 'right';
  animation: string;
  tiles: GalleryTile[];
}

interface AboutSectionProps {
  portraitImage: string;
  aboutVideo: string;
}

const galleryCollections: GalleryCollection[] = [
  {
    id: 'about-cape-town',
    title: 'Cape Town',
    subtitle: 'Sunset drives, Atlantic views, and bespoke residences along the coast.',
    align: 'left',
    animation: 'animate-slide-left delay-200',
      tiles: [
        { label: 'V&A Waterfront', image: ctAurumWalking },
        { label: 'Signal Hill Sunrise', image: ctCampsBay },
        { label: 'Clifton Cove', image: ctSeaDrone },
        { label: 'Atlantic Seaboard Drive', image: ctSeaPoint },
        { label: 'Table Mountain Overlook', image: ctFishHoek, aspect: 'portrait' },
      ],
  },
  {
    id: 'about-mauritius',
    title: 'Mauritius',
    subtitle: 'Island escapes, uninterrupted beachfronts, and luxury hospitality retreats.',
    align: 'right',
    animation: 'animate-slide-right delay-300',
      tiles: [
        { label: 'Le Morne Lagoon', image: muReef },
        { label: 'Chamarel Heights', image: muGolfOutline },
        { label: 'Northern Coastline', image: muSugarBeach },
        { label: 'Private Island Yacht', image: muWalkingBalcony, aspect: 'portrait' },
      ],
  },
  {
    id: 'about-dubai',
    title: 'Dubai',
    subtitle: 'Vertical living, desert escapes, and skyline residences with unmatched services.',
    align: 'left',
    animation: 'animate-slide-left delay-400',
      tiles: [
        { label: 'Burj Khalifa District', image: duArtOne },
        { label: 'Palm Jumeirah Residences', image: duArtTwo },
        { label: 'Desert Roadway', image: duArtThree },
        { label: 'Dubai Hills Retreat', image: duArtFour, aspect: 'portrait' },
      ],
  },
];

const AboutSection = ({ portraitImage, aboutVideo }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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
      <div className="container-editorial space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Video Column */}
          <div className="lg:col-span-6 relative">
            <div className={`relative ${isVisible ? 'animate-slide-left' : ''}`}>
              <div className="absolute -top-8 -left-8 w-full h-full border border-[hsl(var(--fg-light)/0.1)]" />
              <div className="relative overflow-hidden rounded-[28px]">
                <video
                  src={aboutVideo}
                  poster={portraitImage}
                  muted={isMuted}
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-[600px] lg:h-[700px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--fg-light)/0.35)] to-transparent" />
              </div>
              <button
                type="button"
                onClick={() => setIsMuted((prev) => !prev)}
                className="absolute bottom-6 left-6 z-20 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--bg-light)/0.8)] bg-[hsl(var(--bg-light)/0.85)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--fg-light))] transition hover:bg-[hsl(var(--bg-light))]"
              >
                {isMuted ? 'Unmute video' : 'Mute video'}
              </button>
              <div className="absolute -bottom-6 -right-6 bg-[hsl(var(--fg-light))] text-[hsl(var(--bg-light))] p-5 lg:p-8 max-w-xs shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <span className="font-display text-lg lg:text-xl italic leading-relaxed">
                  "Real estate is about relationships, not transactions."
                </span>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-6">
            <span className={`editorial-subhead text-[hsl(40,40%,35%)] block ${isVisible ? 'animate-fade-up delay-200' : ''}`}>
              The Story
            </span>
            <h2 className={`section-headline text-[hsl(var(--fg-light))] ${isVisible ? 'animate-fade-up delay-300' : ''}`}>
              Local Expert.<br />
              <span className="font-bold">Trusted Advisor.</span>
            </h2>
            <div className={`editorial-divider bg-[hsl(40,40%,45%)] ${isVisible ? 'animate-line-grow delay-400' : 'w-0'}`} />
            <div className={`space-y-6 ${isVisible ? 'animate-fade-up delay-500' : ''}`}>
              <p className="body-editorial text-[hsl(var(--fg-light)/0.7)]">
                  Originally from Johannesburg, I relocated to Cape Town 15 years ago, drawn by the vibrant lifestyle and my passion for the outdoors.
                  My enthusiasm for real estate was ignited at a young age, and over the past nine years in the industry, I’ve cultivated a deep love for this profession.
              </p>
              <p className="body-editorial text-[hsl(var(--fg-light)/0.7)]">
                  Growing up with a keen interest in property, I developed a knack for spotting investment opportunities and brokering deals across a variety of property types.
                  I truly value the relationships I build with both new and long-standing clients, and I’m committed to guiding them every step of the way of their buying or selling journey.
              </p>
              <p className="body-editorial text-[hsl(var(--fg-light)/0.7)]">
                  I thrive on uncovering those “needle in a haystack” opportunities that unlock undiscovered potential - whether for my clients or my own investments.
                  In addition to my expertise in the local market, I have a keen interest in offshore investments and offer support to clients looking to buy or sell property in Mauritius.
              </p>
            </div>
            <div className={`mt-6 ${isVisible ? 'animate-fade-up delay-600' : ''}`}>
              <a href="#contact" className="btn-editorial border-[hsl(var(--fg-light)/0.3)] text-[hsl(var(--fg-light))] hover:bg-[hsl(var(--fg-light))] hover:text-[hsl(var(--bg-light))]">
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Gallery Collections */}
        <div className="space-y-20">
          {galleryCollections.map((collection) => {
            const isLeft = collection.align === 'left';
            const textAlignment = isLeft ? 'lg:text-left' : 'lg:text-right lg:pl-8';
            const textOrder = isLeft ? 'lg:order-1' : 'lg:order-2';
            const galleryOrder = isLeft ? 'lg:order-2' : 'lg:order-1';
            const tileAnimation = isLeft ? 'animate-slide-right' : 'animate-slide-left';
            return (
              <section
                key={collection.id}
                id={collection.id}
                className={`grid gap-10 lg:grid-cols-12 items-center ${isVisible ? collection.animation : ''}`}
                aria-label={`Gallery collection for ${collection.title}`}
              >
                <div className={`lg:col-span-5 ${textOrder} ${textAlignment}`}>
                  <p className="editorial-subhead text-[hsl(40,40%,35%)]">Visual Narrative</p>
                  <div className="mt-3 space-y-3">
                    <h3 className="section-headline leading-tight">{collection.title}</h3>
                    <p className="body-editorial text-[hsl(var(--fg-light)/0.7)]">{collection.subtitle}</p>
                    <a
                      href={`#${collection.id}`}
                      className="text-xs font-semibold tracking-[0.4em] uppercase text-accent inline-flex items-center gap-2 hover:underline"
                    >
                      View collection
                    </a>
                  </div>
                </div>
                <div className={`lg:col-span-7 ${galleryOrder}`}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
                    {collection.tiles.map((tile, tileIndex) => {
                      const delay = 200 + tileIndex * 100;
                      const animationClass = `${tileAnimation} delay-${delay}`;
                      const aspectClass = tile.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-square';
                      return (
                        <div
                          key={`${collection.id}-${tile.label}`}
                          className={`relative w-full ${aspectClass} min-h-[360px] lg:min-h-[420px] xl:min-h-[520px] rounded-[28px] border border-[hsl(var(--fg-light)/0.15)] bg-[hsl(var(--fg-light)/0.03)] shadow-[0_25px_60px_rgba(0,0,0,0.25)] overflow-hidden ${isVisible ? animationClass : ''}`}
                        >
                          {tile.image && (
                            <img
                              src={tile.image}
                              alt={tile.label}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg-light))] via-transparent to-transparent opacity-70" />
                          <div className="relative z-10 flex h-full items-end p-5">
                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                              {tile.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
