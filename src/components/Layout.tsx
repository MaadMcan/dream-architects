import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  // Handle page transitions and scroll to top
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Handle transition animation
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${isPageTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;