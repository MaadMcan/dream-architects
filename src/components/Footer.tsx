import { PhoneCall, Mail, MapPin } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-primary-500 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and About */}
          <div>
            <Logo variant="light" className="mb-6" />
            <p className="text-neutral-100 text-sm leading-relaxed mb-6">
              We are an award-winning architectural firm dedicated to creating innovative, 
              sustainable, and aesthetically pleasing designs that transform spaces and enhance lives.
            </p>
          </div>

          {/* Quick Links and Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-medium mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-neutral-100 hover:text-white text-sm">Home</Link></li>
                <li><Link to="/services" className="text-neutral-100 hover:text-white text-sm">Services</Link></li>
                <li><Link to="/about-us" className="text-neutral-100 hover:text-white text-sm">About Us</Link></li>
                <li><Link to="/team" className="text-neutral-100 hover:text-white text-sm">Our Team</Link></li>
                <li><Link to="/projects" className="text-neutral-100 hover:text-white text-sm">Projects</Link></li>
                <li><Link to="/faq" className="text-neutral-100 hover:text-white text-sm">FAQ</Link></li>
                <li><Link to="/locator" className="text-neutral-100 hover:text-white text-sm">Branch Locator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <PhoneCall className="w-4 h-4 text-secondary-500 mt-1 mr-2" />
                  <div>
                    <p className="text-neutral-100 text-sm font-medium">Phone number:</p>
                    <a href="tel:+256758198298" className="text-white text-sm">+256 758 198 298</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-4 h-4 text-secondary-500 mt-1 mr-2" />
                  <div>
                    <p className="text-neutral-100 text-sm font-medium">Email address:</p>
                    <a href="mailto:info@dreamarchitects.com" className="text-white text-sm break-all">info@dreamarchitects.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-secondary-500 mt-1 mr-2" />
                  <div>
                    <p className="text-neutral-100 text-sm font-medium">Address:</p>
                    <address className="text-white text-sm not-italic">
                      Amber Heights, Ground Floor Suite A2<br />
                      Plot 29/33 Kampala Road<br />
                      Kitintale, Kampala - Uganda
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-400 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-200 text-sm">
            &copy; {new Date().getFullYear()} Dream Architects. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-neutral-200 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-200 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
