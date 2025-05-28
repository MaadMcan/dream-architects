import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    id: 1,
    number: '1',
    title: 'Architectural Design',
    description: 'We offer innovative, sustainable design solutions tailored to your needs, balancing aesthetics with functionality to create exceptional spaces that meet your vision. Our architectural designs embrace contemporary principles while respecting context and tradition.',
    image: 'https://images.pexels.com/photos/5411784/pexels-photo-5411784.jpeg',
  },
  {
    id: 2,
    title: 'Interior Design',
    number: '2',
    description: 'At Dream Architects, we create within a building spaces that enhance the culture, routine and general mood of our clients. Our interior design services transform spaces into personalized environments that enhance daily living.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  },
  {
    id: 3,
    number: '3',
    title: 'Project Supervision',
    description: 'Ensuring precise implementation through comprehensive supervision, guaranteeing your vision becomes reality. We maintain quality control through regular site visits and coordinate with contractors.',
    image: 'https://images.pexels.com/photos/7108227/pexels-photo-7108227.jpeg',
  },
  {
    id: 4,
    number: '4',
    title: 'Project Management',
    description: 'We help our clients ensure the smooth running of all elements of a project and maintain effective management on all outset projects, from inception to completion.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
  },
  {
    id: 5,
    number: '5',
    title: 'Landscape Design',
    description: 'Creating harmonious outdoor spaces that integrate seamlessly with the built environment. Our landscape designs combine aesthetic beauty with ecological functionality.',
    image: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
  },
];

const ServicesPage = () => {
  const [currentService, setCurrentService] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextService = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentService((prev) => (prev + 1) % services.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevService = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentService((prev) => (prev - 1 + services.length) % services.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToService = (index: number) => {
    if (!isTransitioning && index !== currentService) {
      setIsTransitioning(true);
      setCurrentService(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 flex">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="w-full flex-shrink-0 relative transition-transform duration-500"
            style={{
              transform: `translateX(-${currentService * 100}%)`,
            }}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: index === currentService ? 1 : 0,
              }}
            />

            {/* Content */}
            <div className="relative h-screen flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl">
                  <div className="flex items-center mb-8">
                    <span className="text-9xl font-serif font-bold text-secondary-500">
                      {service.number}
                    </span>
                    <div className="h-0.5 w-32 bg-secondary-500 ml-6 mt-8"></div>
                  </div>
                  
                  <h2 className="text-5xl font-serif font-bold mb-6 text-white">
                    {service.title}
                  </h2>
                  
                  <p className="text-lg text-neutral-200 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={prevService}
                className="text-white hover:text-secondary-500 transition-colors"
                disabled={isTransitioning}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="flex items-center space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToService(index)}
                    className="group relative"
                  >
                    <div className="w-12 h-1 bg-white bg-opacity-30">
                      <div 
                        className="absolute left-0 top-0 h-full bg-secondary-500 transition-all duration-500"
                        style={{
                          width: index === currentService ? '100%' : 
                                index < currentService ? '100%' : '0%'
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={nextService}
                className="text-white hover:text-secondary-500 transition-colors"
                disabled={isTransitioning}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="text-white font-medium">
              <span className="text-secondary-500">{String(currentService + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(services.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;