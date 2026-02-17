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
import property1 from '@/assets/properties/Apartment-Block-Lansdowne.png';
import property2 from '@/assets/properties/Stonehurst-Mountain-Estate.png';
import property3 from '@/assets/properties/The_Rockefeller.png';
import aboutVideo from '@/assets/THE_AGENCY_GREG.mov';

const properties = [
  {
    id: 1,
    image: property1,
    address: '50 Bedroom Apartment Block For Sale in Lansdowne',
    price: 'R 38 000,000',
    beds: 50,
    baths: 50,
    garage: 10,
    sqft: '4,800',
    status: 'For Sale' as const,
  },
  {
    id: 2,
    image: property2,
    address: '3 Bedroom House To Let in Stonehurst Mountain Estate',
    price: 'R75,000 pm',
    beds: 3,
    baths: 3.5,
    garage: 2,
    sqft: '3,200',
    status: 'For Rent' as const,
  },
  {
    id: 3,
    image: property3,
    address: '1 Bedroom Apartment For Sale in Cape Town City Centre',
    price: 'R1,750,000',
    beds:1,
    baths: 1,
    sqft: '25.00',
    status: 'For Sale' as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection heroImage={heroImage} />
      <AboutSection portraitImage={portraitImage} aboutVideo={aboutVideo} />
      <PropertiesSection properties={properties} />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
