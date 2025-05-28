import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectBySlug } from '../lib/sanity';
import { ArrowLeft, X } from 'lucide-react';

type ProjectDetail = {
  title: string;
  value: string;
};

type Project = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: string;
  location: string;
  year: string;
  description: string;
  mainImage: string;
  gallery: string[];
  details: ProjectDetail[];
};

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        if (slug) {
          const data = await getProjectBySlug(slug);
          if (!data) {
            throw new Error('Project not found');
          }
          setProject(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project. Please try again later.');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  const openImage = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const navigateImages = (direction: 'prev' | 'next') => {
    if (!project) return;
    
    const images = [project.mainImage, ...project.gallery];
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (currentIndex + 1) % images.length;
    }
    
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary-500">Loading project...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/portfolio')}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Project not found</p>
          <button
            onClick={() => navigate('/portfolio')}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
          >
            View All Projects
          </button>
        </div>
      </div>
    );
  }

  const allImages = [project.mainImage, ...project.gallery];

  return (
    <div className="min-h-screen bg-white">
      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white hover:text-primary-500 transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-6xl h-full max-h-screen flex items-center">
            <button
              onClick={() => navigateImages('prev')}
              className="absolute left-4 p-2 text-white hover:text-primary-500 transition-colors z-10"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt={`${project.title} - View ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <button
              onClick={() => navigateImages('next')}
              className="absolute right-4 p-2 text-white hover:text-primary-500 transition-colors z-10"
              aria-label="Next image"
            >
              <ArrowLeft className="w-8 h-8 transform rotate-180" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Hero Section with Project Image */}
      <section 
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${project.mainImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="absolute inset-0 container flex items-center">
          <div className="text-white max-w-3xl">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => navigate('/portfolio')}
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Portfolio
              </button>
              <div className="h-6 w-px bg-white/30" />
              <span className="text-white/80">{project.category}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              {project.title}
            </h1>
            <div className="flex items-center space-x-6 text-lg">
              <span>{project.location}</span>
              <span className="w-2 h-2 rounded-full bg-white/50" />
              <span>{project.year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <div className="container py-20">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none mb-12">
            <p className="text-xl text-neutral-600 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {project.details?.length > 0 && (
  <div className="space-y-8 mb-20">
    <h2 className="text-2xl font-serif font-bold">Project Details</h2>
    <div className="grid grid-cols-1 gap-8">
      {project.details.map((detail, index) => (
        <div key={index} className="border-l-2 border-primary-500 pl-6">
          <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">
            {detail.title}
          </h3>
          <p className="text-lg text-neutral-800">{detail.value}</p>
        </div>
      ))}
    </div>
  </div>
)}

        </div>

        {/* Simple Grid Gallery */}
        {project.gallery?.length > 0 && (
          <div className="space-y-8">
            {/* <h2 className="text-3xl font-serif font-bold text-center mb-12">Project Gallery</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allImages.map((image, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-zoom-in"
                  onClick={() => openImage(image, index)}
                >
                  <img
                    src={image}
                    alt={`${project.title} - View ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;