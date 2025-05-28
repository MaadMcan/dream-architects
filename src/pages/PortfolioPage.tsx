import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProjects } from '../lib/sanity';

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
  gallery?: string[];
  details?: {
    title: string;
    value: string;
  }[];
};

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        
        // Ensure data is properly formatted
        const validProjects = Array.isArray(data) 
          ? data.filter(project => project?.slug?.current)
          : [];
          
        setProjects(validProjects);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Extract unique categories from projects
  const categories = ['All', ...new Set(
    projects
      .map(p => p.category)
      .filter(Boolean) // Remove any undefined/null categories
  )];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="h-24 md:h-36"></div>
        <div className="animate-pulse text-primary-500">Loading portfolio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="h-24 md:h-36"></div>
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="h-24 md:h-36"></div>
      
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/11.jpg")',
          }}
          
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Our Portfolio
            </h1>
            <p className="text-lg text-neutral-200">
              Explore our diverse collection of architectural projects, 
              each telling a unique story of innovation and design excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16">
        <div className="container">
          {/* Category Filter - Only show if we have multiple categories */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500">
                {projects.length === 0 
                  ? 'No projects found. Please add projects in Sanity Studio.'
                  : 'No projects match the selected category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <Link 
                    to={`/portfolio/${project.slug.current}`}
                    className="block"
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                      {project.mainImage && (
                        <img
                          src={project.mainImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="px-6 py-2 bg-white text-primary-500 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Project
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.category && (
                          <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                            {project.category}
                          </span>
                        )}
                        {project.location && (
                          <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm">
                            {project.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;