import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import ServiceCarousel from "../components/ServiceCarousel";
import { getCarouselItems } from "../lib/sanity";

type CarouselItem = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  order: number;
  linkedProject?: {
    slug: string;
    title: string;
  };
};

const HomePage = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [miniCarouselIndex, setMiniCarouselIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const items = await getCarouselItems();
        console.log('Fetched carousel items:', items);
        setCarouselItems(items);
        setError(null);
      } catch (error) {
        console.error('Error fetching carousel items:', error);
        setError("Failed to load carousel items. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarouselItems();
  }, []);

  const nextItem = () => {
    if (!isTransitioning && carouselItems.length > 0) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      setMiniCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }
  };

  const prevItem = () => {
    if (!isTransitioning && carouselItems.length > 0) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
      setMiniCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-advance carousel
  useEffect(() => {
    if (carouselItems.length > 0) {
      const interval = setInterval(nextItem, 6000);
      return () => clearInterval(interval);
    }
  }, [carouselItems.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-4 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (carouselItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">No carousel items found</p>
          <p className="text-sm text-neutral-400">
            Please add carousel items in Sanity Studio
          </p>
        </div>
      </div>
    );
  }

  const getMiniCarouselItems = () => {
    const items = [];
    for (let i = 0; i < 2; i++) {
      const index = (miniCarouselIndex + i) % carouselItems.length;
      items.push(carouselItems[index]);
    }
    return items;
  };

  const miniCarouselItems = getMiniCarouselItems();

  return (
    <div>
      {/* Hero Section */}
      <section id="portfolio" className="relative h-screen">
        {carouselItems.map((item, index) => {
          const projectLink = item.linkedProject?.slug 
            ? `/portfolio/${item.linkedProject.slug}`
            : null;

          return (
            <div
              key={item._id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: index === currentIndex ? 1 : 0,
              }}
            >
              <div className="container h-full flex items-center pt-20">
                <div className="max-w-xl text-white">
                  <h2 className="text-xl md:text-2xl mb-2">{item.title}</h2>
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    {item.subtitle}
                  </h1>
                  <p className="mb-8 text-neutral-200">{item.description}</p>
                  <div className="flex space-x-4">
                    <Link to="/services" className="btn btn-secondary">
                      Our Services
                    </Link>
                    {projectLink && (
                      <Link
                        to={projectLink}
                        className="btn bg-white text-primary-500 hover:bg-neutral-100"
                      >
                        View Project
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Project Mini Carousel - Hidden on mobile, visible on md and up */}
        <div className="hidden md:block absolute bottom-8 right-8 z-40">
          <div className="bg-transparent rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevItem}
                className="p-2 text-white hover:bg-neutral-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex space-x-2">
                {miniCarouselItems.map((item, idx) => {
                  const absoluteIndex = (miniCarouselIndex + idx) % carouselItems.length;
                  return (
                    <div
                      key={item._id}
                      className="relative w-36 h-24 overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => {
                        setCurrentIndex(absoluteIndex);
                        setMiniCarouselIndex(absoluteIndex);
                        setIsTransitioning(true);
                      }}
                    >
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          absoluteIndex === currentIndex
                            ? "ring-2 ring-secondary-500"
                            : ""
                        }`}
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={nextItem}
                className="p-2 text-white hover:bg-neutral-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Slider Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-10 container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevItem}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full text-white transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextItem}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full text-white transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="flex space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setMiniCarouselIndex(index);
                  setIsTransitioning(true);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-secondary-500 w-6"
                    : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Service Highlights */}
      <section id="services" className="py-16 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Services</h2>
            <p className="max-w-2xl mx-auto text-neutral-600">
              We provide a comprehensive range of architectural and design
              services to bring your vision to life with precision and
              creativity.
            </p>
          </div>

          <ServiceCarousel />
        </div>
      </section>

      <div id="team">
        <TeamSection />
      </div>
    </div>
  );
};

export default HomePage;