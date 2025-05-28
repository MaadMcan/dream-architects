import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Villa Design",
    description: "Contemporary residential architecture with sustainable features",
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
    link: "/projects/modern-villa"
  },
  {
    id: 2,
    title: "Urban Office Complex",
    description: "Mixed-use development in the heart of the city",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    link: "/projects/urban-office"
  },
  {
    id: 3,
    title: "Luxury Residence",
    description: "Custom-designed home with premium finishes",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    link: "/projects/luxury-residence"
  }
];

const PortfolioCarousel = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProject = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }
  };

  const prevProject = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevProject}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="relative w-32 h-32 overflow-hidden rounded-lg">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentProject ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => {
                  // Update main background image and content
                  const heroSection = document.getElementById('hero-section');
                  if (heroSection) {
                    heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${project.image})`;
                    // Update hero content (implement this part)
                  }
                }}
              />
            ))}
          </div>

          <button
            onClick={nextProject}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCarousel;