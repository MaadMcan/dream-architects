import TeamSection from "../components/TeamSection";

const TeamPage = () => {
  // Static content data
  const teamContent = {
    hero: {
      title: "Our Creative Team",
      subtitle: "The talented individuals behind our visionary designs",
      backgroundImage: "/images/4.jpg",
    },
    values: {
      title: "We're a team that values excellence & innovation",
      description: `At Dream Architects, we believe that great architecture comes from collaborative 
      effort, diverse perspectives, and a shared commitment to excellence. Our team 
      brings together a wealth of experience and specialized skills to create designs 
      that are as functional as they are beautiful.`,
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
    },
    // joinTeam: {
    //   title: "Join Our Team",
    //   description: `We're always looking for talented individuals who share our passion for 
    //   innovative design and exceptional client service. If you're interested in 
    //   joining our collaborative team, we'd love to hear from you.`,
    //   image: "https://images.pexels.com/photos/7108531/pexels-photo-7108531.jpeg",
    // }
  };

  return (
    <div>
      <div className="h-24 md:h-36"></div>

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${teamContent.hero.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        <div className="relative container h-full flex items-center">
          <div className="text-white max-w-3xl text-center mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              {teamContent.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200">
              {teamContent.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <TeamSection />
      
      {/* Team Values */}
      <section className="bg-primary-50 py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                {teamContent.values.title}
              </h2>
              <p className="text-neutral-600">
                {teamContent.values.description}
              </p>
            </div>
            
            <div>
              <img 
                src={teamContent.values.image}
                alt="Team collaboration" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Our Team */}
      {/* <section className="py-20">
        <div className="container">
          <div className="bg-primary-500 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                  {teamContent.joinTeam.title}
                </h2>
                <p className="text-primary-100 mb-6">
                  {teamContent.joinTeam.description}
                </p>
                <button className="btn bg-white text-primary-500 hover:bg-neutral-100">
                  View Open Positions
                </button>
              </div>
              
              <div className="flex justify-center md:justify-end">
                <img 
                  src={teamContent.joinTeam.image}
                  alt="Working at Dream Architects" 
                  className="rounded-lg w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default TeamPage;