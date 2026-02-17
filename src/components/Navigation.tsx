import { useState, useEffect, type FocusEvent, type MouseEvent } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

type SubmenuLink = { label: string; href: string };
type NavLink = { label: string; href: string; submenu?: SubmenuLink[] };

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openedMobileDropdown, setOpenedMobileDropdown] = useState<string | null>(null);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenedMobileDropdown(null);
  };

  const toggleMobileDropdown = (label: string) => {
    setOpenedMobileDropdown((prev) => (prev === label ? null : label));
  };

  const handleMobileLinkClick = (event: MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    if (link.submenu) {
      event.preventDefault();
      toggleMobileDropdown(link.label);
      return;
    }
    closeMobileMenu();
  };

  const handleDesktopDropdownMouseEnter = (label: string) => {
    setActiveDesktopDropdown(label);
  };

  const handleDesktopDropdownMouseLeave = () => {
    setActiveDesktopDropdown(null);
  };

  const handleDesktopDropdownBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setActiveDesktopDropdown(null);
    }
  };

  const navLinks: NavLink[] = [
    {
      label: 'Meet your Agent',
      href: '#about',
      submenu: [
        { label: 'Agency', href: '#about' },
        { label: 'Cape Town', href: '#about-cape-town' },
        { label: 'Mauritius', href: '#about-mauritius' },
        { label: 'Dubai', href: '#about-dubai' },
      ],
    },
    { label: 'Properties', href: '#properties' },
    {
      label: 'Marketing',
      href: '#stats',
    },
    { label: 'Contact', href: 'https://wa.me/27731419668' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-editorial">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#" className="relative z-50">
            <span className="font-display text-xl md:text-2xl tracking-tight">
              <span className="font-normal">GREG</span>{' '}
              <span className="font-bold">MCDONALD</span>
              <span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isDropdownOpen = activeDesktopDropdown === link.label;
              const dropdownVisibilityClass = isDropdownOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0';

              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={link.submenu ? () => handleDesktopDropdownMouseEnter(link.label) : undefined}
                  onMouseLeave={link.submenu ? handleDesktopDropdownMouseLeave : undefined}
                  onBlurCapture={link.submenu ? handleDesktopDropdownBlur : undefined}
                >
                  <a
                    href={link.href}
                    onFocus={link.submenu ? () => handleDesktopDropdownMouseEnter(link.label) : undefined}
                    className="editorial-subhead text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                  {link.submenu && (
                    <div
                      className={`transition-opacity duration-200 absolute left-0 top-full mt-0 w-56 rounded-md border border-border bg-background shadow-lg ${dropdownVisibilityClass}`}
                    >
                      {link.submenu.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onFocus={() => handleDesktopDropdownMouseEnter(link.label)}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-6">
            <a href="https://wa.me/27731419668" className="btn-editorial">
              Work With Greg
            </a>
            <a
              href="tel:+27731419668"
              className="editorial-subhead text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
            073 141 9668
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
            className="md:hidden relative z-50 p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background z-40 md:hidden transition-transform duration-500 ${
          isMobileMenuOpen
            ? 'translate-x-0 pointer-events-auto'
            : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full container-editorial">
          {navLinks.map((link, index) => {
            const isDropdownOpen = openedMobileDropdown === link.label;
            return (
              <div
                key={link.label}
                style={{ animationDelay: `${index * 100}ms` }}
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <a
                    href={link.href}
                    onClick={(event) => handleMobileLinkClick(event, link)}
                    className="font-display text-4xl py-4 hover:text-accent transition-colors block"
                  >
                    {link.label}
                  </a>
                  {link.submenu && (
                    <button
                      type="button"
                      aria-expanded={isDropdownOpen}
                      aria-label={`Toggle ${link.label} submenu`}
                      onClick={() => toggleMobileDropdown(link.label)}
                      className="p-2 -mr-2"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>
                {link.submenu && isDropdownOpen && (
                  <div className="ml-4 border-l border-border pl-4">
                    {link.submenu.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="font-display text-3xl py-2 hover:text-accent transition-colors block"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="mt-8">
            <a
              href="https://wa.me/27731419668"
              onClick={closeMobileMenu}
              className="btn-editorial-filled"
            >
              Work With Greg
            </a>
          </div>
          <div className="mt-4 editorial-subhead text-muted-foreground">
            <a
              href="tel:+27731419668"
              onClick={closeMobileMenu}
              className="hover:text-foreground transition-colors"
            >
              073 141 9668
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
