import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Service = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
};

const services: Service[] = [
  {
    id: 1,
    number: '1',
    title: 'Architectural Design',
    description: 'We offer innovative, sustainable design solutions tailored to your needs, balancing aesthetics with functionality to create exceptional spaces that meet your vision.',
    image: 'https://images.pexels.com/photos/5411784/pexels-photo-5411784.jpeg',
  },
  {
    id: 2,
    number: '2',
    title: 'Interior Design',
    description: 'As Dream Architects, we create habitats of elegance and sophistication where functionality harmonizes with style, reflecting your unique lifestyle.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  },
  {
    id: 3,
    number: '3',
    title: 'Project Supervision',
    description: 'The implementation of a project should take the same levels of precision as planning. We help our clients ensure that what they envision is what is delivered.',
    image: 'https://images.pexels.com/photos/7108227/pexels-photo-7108227.jpeg',
  },
  {
    id: 4,
    number: '4',
    title: 'Project Management',
    description: 'Managing the intricate aspects of a project can be challenging. We help our clients ensure the smooth running of all elements of a project.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
  },
  {
    id: 5,
    number: '5',
    title: 'Landscape Design',
    description: 'We believe in connecting architecture with landscape, creating harmonious outdoor spaces that integrate seamlessly with the built environment.',
    image: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
  },
];

const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextService = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
  };

  const prevService = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    }
  };

  const goToService = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {services.map((service) => (
          <div 
            key={service.id}
className="w-full flex-shrink-0 h-screen relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${service.image})` }}
          >
            <div className="w-full h-full flex items-center justify-end px-8 lg:px-20 bg-black/40">
              <div className="max-w-xl text-white text-right">
                <div className="mb-6">
                  <span className="text-6xl font-serif font-bold text-secondary-500">
                    {service.number}
                  </span>
                  <div className="w-32 h-1 bg-secondary-500 mt-2 ml-auto"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  {service.title}
                </h2>
                <p className="text-lg leading-relaxed text-white/90">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4 w-[90%] max-w-xl">
        {/* Progress Bar with Dots */}
        <div className="relative w-full h-2 bg-white/30 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-secondary-500 rounded-full transition-all duration-500"
            style={{ width: `${(currentIndex + 1) * (100 / services.length)}%` }}
          />
          <div className="absolute top-0 left-0 w-full h-full flex justify-between">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToService(index)}
                className={`w-3 h-3 rounded-full transform -translate-y-0.5 transition-all ${
                  index === currentIndex ? 'bg-white scale-110' : 'bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex space-x-6">
          <button
            onClick={prevService}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-neutral-100 transition-colors"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-5 h-5 text-primary-500" />
          </button>

          <button
            onClick={nextService}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-neutral-100 transition-colors"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-5 h-5 text-primary-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;
