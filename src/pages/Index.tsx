import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import PropertiesSection from '@/components/PropertiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Import images
import heroImage from '@/assets/greg-hero.jpg';
import portraitImage from '@/assets/greg-about.jpg';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import aboutVideo from '@/assets/THE_AGENCY_GREG.mov';

const properties = [
  {
    id: 1,
    image: property1,
    address: '1247 Maple Ridge Drive',
    price: '$2,450,000',
    beds: 5,
    baths: 4,
    sqft: '4,800',
    status: 'For Sale' as const,
  },
  {
    id: 2,
    image: property2,
    address: '892 Oak Valley Court',
    price: '$1,895,000',
    beds: 4,
    baths: 3,
    sqft: '3,200',
    status: 'Pending' as const,
  },
  {
    id: 3,
    image: property3,
    address: '456 Sunset Vista Lane',
    price: '$3,200,000',
    beds: 6,
    baths: 5,
    sqft: '5,500',
    status: 'Sold' as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection heroImage={heroImage} />
      <AboutSection portraitImage={portraitImage} aboutVideo={aboutVideo} />
      <StatsSection />
      <PropertiesSection properties={properties} />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
