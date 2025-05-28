import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="z-10">
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/portfolio" 
            label="Portfolio" 
            isActive={location.pathname === '/portfolio'}
          />
          <NavLink 
            to="/services" 
            label="Services" 
            isActive={location.pathname === '/services'}
          />
          <NavLink 
            to="/team" 
            label="Our Team" 
            isActive={location.pathname === '/team'}
          />
          <NavLink 
            to="/faq" 
            label="FAQ" 
            isActive={location.pathname === '/faq'}
          />
          <NavLink 
            to="/contact" 
            label="Contact" 
            isActive={location.pathname === '/contact'}
          />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-10 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-primary-500" />
          ) : (
            <Menu className="h-6 w-6 text-primary-500" />
          )}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''} p-6 pt-20`}
        >
          <div className="flex flex-col space-y-4">
            <MobileNavLink 
              to="/portfolio" 
              label="Portfolio" 
              isActive={location.pathname === '/portfolio'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink 
              to="/services" 
              label="Services" 
              isActive={location.pathname === '/services'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink 
              to="/team" 
              label="Our Team" 
              isActive={location.pathname === '/team'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink 
              to="/faq" 
              label="FAQ" 
              isActive={location.pathname === '/faq'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink 
              to="/contact" 
              label="Contact" 
              isActive={location.pathname === '/contact'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
        
        {/* Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

// Navigation link component for desktop
type NavLinkProps = {
  to: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
};

const NavLink = ({ to, label, isActive }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`font-medium text-sm transition-colors duration-200 ${
        isActive
          ? 'text-primary-500'
          : 'text-neutral-700 hover:text-primary-500'
      }`}
    >
      {label}
    </Link>
  );
};

// Navigation link component for mobile
const MobileNavLink = ({ to, label, isActive, onClick }: NavLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block py-2 text-lg font-medium ${
        isActive
          ? 'text-primary-500'
          : 'text-neutral-700 hover:text-primary-500'
      }`}
    >
      {label}
    </Link>
  );
};

export default Header;