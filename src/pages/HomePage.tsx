import { useState, useEffect } from "react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
        console.log("Fetched carousel items:", items);
        setCarouselItems(items);
        setError(null);
      } catch (error) {
        console.error("Error fetching carousel items:", error);
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
      setCurrentIndex(
        (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
      );
      setMiniCarouselIndex(
        (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
      );
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
                  const absoluteIndex =
                    (miniCarouselIndex + idx) % carouselItems.length;
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

      {/* Dream Home Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary-500 mb-6">
                BUILDING THE FUTURE, <br />
                RESTORING THE PAST.
              </h2>
              <p className="text-neutral-600 mb-8">
                At Dream Architects, we blend creativity, sustainability, and
                structural excellence to deliver spaces that inspire. From
                bespoke residences to visionary commercial spaces, we turn your
                ideas into architectural landmarks.
              </p>
              <Link
                to="/portfolio"
                className="inline-block px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                VIEW PORTFOLIO
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/1.jpg"
                alt="Contemporary residential design"
                className="rounded-lg w-full h-48 object-cover"
              />
              <img
                src="/images/2.jpg"
                alt="Modern commercial building"
                className="rounded-lg w-full h-48 object-cover"
              />
              <img
                src="/images/3.jpg"
                alt="Innovative architectural project"
                className="rounded-lg w-full col-span-2 h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mirror Quote Section */}
      <section className="bg-primary-500 py-12 text-center">
        <div className="container">
          <h2 className="text-2xl md:text-3xl text-white font-serif italic">
            Mirror, mirror on the wall, you reflect a fabulous home.
          </h2>
        </div>
      </section>
      <br />

      {/* Design Philosophy Section */}
      <section
        className="relative min-h-[60vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.34), rgba(0,0,0,0.85)), url(/images/4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container relative z-10">
          <div className="flex justify-end">
            <div className="max-w-2xl text-right">
              <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white">
                WE BELIEVE THAT DESIGN IS NOT JUST A MATTER OF AESTHETICS, BUT A
                CONCRETE MANIFESTATION OF VALUES AND EMOTIONS.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Who We Are</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Dream Architects is a full-service design firm offering
              comprehensive solutions for architectural, interior, and landscape
              design projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-neutral-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-neutral-600">
                To be a vibrant, evolving architectural firm that exudes
                excellence in client care, design delivery, project management
                and training of Uganda’s future architects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-neutral-600">
                Being on the cutting edge of the architectural profession with
                respect to training and innovations in environmental
                sensitivity, health and safety.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-neutral-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Values</h3>
              <p className="text-neutral-600">
                Christ-like <br /> Creativity <br /> Commitment
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className=" bg-primary-500 py-24 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6 text-white">
              Our Services
            </h2>
            <p className="text-neutral-600 text-white max-w-2xl mx-auto">
              We provide comprehensive architectural solutions tailored to your
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-neutral-200 text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block px-8 py-3 bg-secondary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Meet Our Team
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our talented team brings together years of experience and a
              passion for creating exceptional spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary-500 mb-4">{member.role}</p>
                  <p className="text-neutral-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/team"
              className="inline-block px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              Meet the Full Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    title: "Architectural Design",
    description:
      "We offer innovative, sustainable design solutions tailored to your needs, balancing aesthetics with functionality to create exceptional spaces that meet your vision. Our...",
    image: "/images/5.jpg",
  },
  {
    title: "Interior Design",
    description:
      "At Dream Architects, we create within a building spaces that enhance the culture, routine and general mood of our clients. Our interior design services transform...",
    image: "/images/10.jpg",
  },
  {
    title: "Project Management",
    description:
      "Ensuring precise implementation through comprehensive supervision, guaranteeing your vision becomes reality. We maintain quality control through regular site...",
    image: "/images/7.jpg",
  },
];

const teamMembers = [
  {
    name: "Patricia Khayongo Rutiba",
    role: "Managing Director",
    bio: "15+ years of experience in sustainable architectural design.",
    image: "/images/12.png",
  },
  {
    name: "Ronald Kalinzi",
    role: "Operations Manager",
    bio: "Specialist in modern residential and commercial design.",
    image: "/images/12.png",
  },
  {
    name: "Brenda Apiliga",
    role: "Chief Human Resource Manager",
    bio: "Expert in managing complex architectural projects.",
    image: "/images/12.png",
  },
];

export default HomePage;
