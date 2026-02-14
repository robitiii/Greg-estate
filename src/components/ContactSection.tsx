import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Phone, Mail, MapPin, Instagram, ArrowUpRight } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const whatsappNumber = '27731419668';

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, email, phone, interest, message } = formValues;
    const whatsappMessage = `Hi Greg, my name is ${firstName} ${lastName}. Am reaching out because I'm interested in ${interest || 'real estate services'}. Here's Phone number ${phone} and Email: ${email}.
     Message: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

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
      id="contact"
      className="py-editorial light-section bg-[hsl(var(--bg-light))] text-[hsl(var(--fg-light))]"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Narrative */}
          <div className="lg:col-span-5">
            <span className={`editorial-subhead text-[hsl(40,40%,35%)] block mb-6 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              Let's Connect
            </span>

            <h2 className={`section-headline text-[hsl(var(--fg-light))] mb-8 ${isVisible ? 'animate-slide-left delay-200' : 'opacity-0'}`}>
              Ready To Find<br />
              <span className="font-bold">Your Next Home?</span>
            </h2>

            <div className={`editorial-divider bg-[hsl(40,40%,45%)] mb-8 ${isVisible ? 'animate-line-grow delay-300' : 'w-0'}`} />

            <p className={`body-editorial text-[hsl(var(--fg-light)/0.7)] mb-10 ${isVisible ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
              Whether you're buying, selling, or simply exploring your options,
              I'm here to guide you through every step. Let's have a conversation
              about your real estate goals.
            </p>

            {/* Contact Info */}
            <div className={`space-y-6 ${isVisible ? 'animate-fade-up delay-500' : 'opacity-0'}`}>
              <a
                href="tel:+27731419668"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 border border-[hsl(var(--fg-light)/0.2)] flex items-center justify-center group-hover:bg-[hsl(var(--fg-light))] group-hover:text-[hsl(var(--bg-light))] transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-body text-lg text-[hsl(var(--fg-light))]">
                  073 141 9668
                </span>
              </a>

              <a
                href="mailto:greg@gregmcdonald.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 border border-[hsl(var(--fg-light)/0.2)] flex items-center justify-center group-hover:bg-[hsl(var(--fg-light))] group-hover:text-[hsl(var(--bg-light))] transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-body text-lg text-[hsl(var(--fg-light))]">
                  greg@theagencygroup.co.za
                </span>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[hsl(var(--fg-light)/0.2)] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-body text-lg text-[hsl(var(--fg-light))]">
                  Cape Town  .Dubai  .Mauritius
                </span>
              </div>
            </div>

            {/* Social */}
            <div className={`mt-10 flex gap-4 ${isVisible ? 'animate-fade-up delay-600' : 'opacity-0'}`}>
              <a
                href="https://www.instagram.com/gregmcdonald789/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-[hsl(var(--fg-light)/0.2)] flex items-center justify-center hover:bg-[hsl(var(--fg-light))] hover:text-[hsl(var(--bg-light))] transition-all duration-300"
              >            
                <Instagram className="w-5 h-5" />
              </a>
                <span className="font-body text-lg text-[hsl(var(--fg-light))]">
                  Gregory Mc Donald
                </span>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className={`lg:col-span-6 lg:col-start-7 ${isVisible ? 'animate-slide-right delay-300' : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="editorial-subhead text-[hsl(var(--fg-light)/0.6)] block mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full bg-transparent border-b border-[hsl(var(--fg-light)/0.2)] py-3 text-[hsl(var(--fg-light))] focus:border-[hsl(40,40%,45%)] focus:outline-none transition-colors font-body"
                    placeholder="John"
                    value={formValues.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="editorial-subhead text-[hsl(var(--fg-light)/0.6)] block mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full bg-transparent border-b border-[hsl(var(--fg-light)/0.2)] py-3 text-[hsl(var(--fg-light))] focus:border-[hsl(40,40%,45%)] focus:outline-none transition-colors font-body"
                    placeholder="Smith"
                    value={formValues.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="editorial-subhead text-[hsl(var(--fg-light)/0.6)] block mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-transparent border-b border-[hsl(var(--fg-light)/0.2)] py-3 text-[hsl(var(--fg-light))] focus:border-[hsl(40,40%,45%)] focus:outline-none transition-colors font-body"
                  placeholder="john@example.com"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="editorial-subhead text-[hsl(var(--fg-light)/0.6)] block mb-3">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-transparent border-b border-[hsl(var(--fg-light)/0.2)] py-3 text-[hsl(var(--fg-light))] focus:border-[hsl(40,40%,45%)] focus:outline-none transition-colors font-body"
                  placeholder="073 141 9668"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="editorial-subhead text-[hsl(var(--fg-light)/0.6)] block mb-3">
                  I'm Interested In
                </label>
                <select
                  className="w-full bg-transparent border-b border-[hsl(var(--fg-light)/0.2)] py-3 text-[hsl(var(--fg-light))] focus:border-[hsl(40,40%,45%)] focus:outline-none transition-colors font-body appearance-none cursor-pointer"
                  name="interest"
                  value={formValues.interest}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="buying">Buying a Home</option>
                  <option value="selling">Selling a Home</option>
                  <option value="investing">Real Estate Investment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="editorial-subhead text-[hsl(var(--fg-light)/0.6)] block mb-3">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  className="w-full bg-transparent border-b border-[hsl(var(--fg-light)/0.2)] py-3 text-[hsl(var(--fg-light))] focus:border-[hsl(40,40%,45%)] focus:outline-none transition-colors font-body resize-none"
                  placeholder="Tell me about your real estate goals..."
                  value={formValues.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn-editorial border-[hsl(var(--fg-light)/0.3)] text-[hsl(var(--fg-light))] hover:bg-[hsl(var(--fg-light))] hover:text-[hsl(var(--bg-light))] mt-4 inline-flex items-center gap-3"
              >
                Send Message
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
