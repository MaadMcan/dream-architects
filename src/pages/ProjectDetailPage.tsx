import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectBySlug } from '../lib/sanity';
import { ArrowLeft } from 'lucide-react';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setSelectedImage(data.mainImage);
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

  return (
    <div>
      <div className="h-24 md:h-36"></div>

      <div className="container py-12">
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center text-primary-500 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Portfolio
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Section */}
          <div>
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={selectedImage || project.mainImage}
                alt={project.title}
                className="w-full h-[500px] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {project.gallery?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[project.mainImage, ...project.gallery].map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all ${
                      selectedImage === image 
                        ? 'ring-2 ring-primary-500 transform scale-105' 
                        : 'hover:ring-1 hover:ring-neutral-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - ${index === 0 ? 'Main' : 'Gallery ' + index}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Section */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                project.category,
                project.location,
                project.year
              ].filter(Boolean).map((item, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    index === 0 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            {project.description && (
              <div className="prose max-w-none mb-8">
                {project.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-neutral-600 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {project.details?.length > 0 && (
              <div className="border-t border-neutral-200 pt-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.details.map((detail, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-medium text-neutral-500 mb-1 text-sm uppercase tracking-wider">
                        {detail.title}
                      </h3>
                      <p className="text-lg text-neutral-800">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;