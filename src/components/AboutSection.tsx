import { useState, useEffect } from 'react';
import { getAboutContent } from '../lib/sanity';

type AboutContent = {
  vision: string;
  mission: string;
  coreValues: string;
  // Add additional fields if needed
  introduction?: string;
};

const AboutSection = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      setIsLoading(true);
      try {
        const content = await getAboutContent();
        if (!content) {
          throw new Error('About content not found');
        }
        setAboutContent(content);
        setError(null);
      } catch (error) {
        console.error('Error fetching about content:', error);
        setError('Failed to load about content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutContent();
  }, []);

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-center">
            <div className="animate-pulse text-center text-primary-500">
              Loading about content...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white">
        <div className="container">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white" id="about">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">About Us</h2>
          {aboutContent?.introduction ? (
            <p className="max-w-2xl mx-auto text-neutral-600">
              {aboutContent.introduction}
            </p>
          ) : (
            <p className="max-w-2xl mx-auto text-neutral-600">
              Dream Architects is a full-service design firm offering comprehensive 
              solutions for architectural, interior, and landscape design projects.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AboutCard
            title="OUR VISION"
            description={aboutContent?.vision || 'Vision statement coming soon'}
          />
          <AboutCard
            title="OUR MISSION"
            description={aboutContent?.mission || 'Mission statement coming soon'}
          />
          <AboutCard
            title="OUR CORE VALUES"
            description={aboutContent?.coreValues || 'Core values coming soon'}
          />
        </div>
      </div>
    </section>
  );
};

type AboutCardProps = {
  title: string;
  description: string;
};

const AboutCard = ({ title, description }: AboutCardProps) => {
  return (
    <div className="bg-primary-500 rounded-full aspect-square flex flex-col items-center justify-center text-center p-8 transition-transform duration-300 hover:-translate-y-2">
      <h3 className="text-white font-medium text-xl mb-4">{title}</h3>
      <p className="text-primary-100 text-sm">{description}</p>
    </div>
  );
};

export default AboutSection;