import { useState, useEffect } from "react";
import { getAboutContent } from "../lib/sanity";

type AboutContent = {
  hero: {
    title: string;
    description: string;
    backgroundImage: string;
  };
  vision: string;
  mission: string;
  coreValues: string;
  story: {
    title: string;
    content: string[];
    image: string;
  };
  philosophy: {
    title: string;
    description: string;
    backgroundImage: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
};

const AboutPage = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const content = await getAboutContent();
        setAboutContent(content);
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };
    fetchAboutContent();
  }, []);

  if (!aboutContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="h-24 md:h-36"></div>

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${aboutContent.hero.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {aboutContent.hero.title}
            </h1>
            <p className="text-lg text-neutral-200">
              {aboutContent.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-500 rounded-full aspect-square flex flex-col items-center justify-center text-center p-8 transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-white font-medium text-xl mb-4">
                OUR VISION
              </h3>
              <p className="text-primary-100 text-sm">{aboutContent.vision}</p>
            </div>
            <div className="bg-primary-500 rounded-full aspect-square flex flex-col items-center justify-center text-center p-8 transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-white font-medium text-xl mb-4">
                OUR MISSION
              </h3>
              <p className="text-primary-100 text-sm">{aboutContent.mission}</p>
            </div>
            <div className="bg-primary-500 rounded-full aspect-square flex flex-col items-center justify-center text-center p-8 transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-white font-medium text-xl mb-4">
                OUR CORE VALUES
              </h3>
              <p className="text-primary-100 text-sm">
                {aboutContent.coreValues}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                {aboutContent.story.title}
              </h2>
              {aboutContent.story.content.map((paragraph, index) => (
                <p key={index} className="text-neutral-600 mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative">
              <img
                src={aboutContent.story.image}
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section className="relative py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${aboutContent.philosophy.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black/70"></div>
        </div>
        <div className="relative container z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {aboutContent.philosophy.title}
            </h2>
            <p className="text-lg leading-relaxed">
              {aboutContent.philosophy.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl italic font-serif mb-6">
              "{aboutContent.testimonial.quote}"
            </h2>
            <p className="text-secondary-500 font-medium">
              - {aboutContent.testimonial.author},{" "}
              {aboutContent.testimonial.role}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
