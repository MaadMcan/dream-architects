import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Patricia Kiheyogozi',
    role: 'Managing Director',
    image: 'https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bio: 'Patricia brings 15 years of architectural expertise and business leadership, guiding our firm with vision and strategic direction.',
  },
  {
    id: 2,
    name: 'Bernard Katosi',
    role: 'Operations Manager',
    image: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bio: 'Bernard ensures seamless project execution through effective resource management and operational excellence.',
  },
  {
    id: 3,
    name: 'Isaac Alel',
    role: 'Architect',
    image: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bio: 'Isaac combines innovative design principles with practical solutions, creating spaces that inspire and function beautifully.',
  },
  {
    id: 4,
    name: 'Shariffah Nakanwagi',
    role: 'Admin',
    image: 'https://images.pexels.com/photos/6953581/pexels-photo-6953581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bio: 'Shariffah expertly manages administrative functions, ensuring smooth operations and excellent client communications.',
  },
  {
    id: 5,
    name: 'Timothy Mugume',
    role: 'Interior Designer',
    image: 'https://images.pexels.com/photos/8961057/pexels-photo-8961057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bio: 'Timothy transforms spaces with his unique aesthetic vision, creating interiors that balance beauty and functionality.',
  },
  {
    id: 6,
    name: 'Sarah Namakula',
    role: 'Project Manager',
    image: 'https://images.pexels.com/photos/6953868/pexels-photo-6953868.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bio: 'Sarah expertly coordinates complex projects, ensuring they stay on schedule and within budget while maintaining quality.',
  },
];

const TeamPage = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="h-24 md:h-36"></div>
      
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-500 mb-6">
              Meet the team
            </h1>
            <p className="max-w-2xl mx-auto text-neutral-600">
              Our talented team of professionals combines expertise, creativity, and 
              dedication to deliver exceptional architectural solutions for every project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Values */}
      <section className="bg-primary-50 py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                We're a team that values excellence & innovation
              </h2>
              <p className="text-neutral-600 mb-6">
                At Dream Architects, we believe that great architecture comes from collaborative 
                effort, diverse perspectives, and a shared commitment to excellence. Our team 
                brings together a wealth of experience and specialized skills to create designs 
                that are as functional as they are beautiful.
              </p>
              <p className="text-neutral-600">
                We foster a culture of creativity, continuous learning, and meticulous attention 
                to detail, ensuring that every project we undertake exceeds expectations and 
                creates lasting value for our clients.
              </p>
            </div>
            
            <div>
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Team collaboration" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Our Team */}
      <section className="py-20">
        <div className="container">
          <div className="bg-primary-500 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                  Join Our Team
                </h2>
                <p className="text-primary-100 mb-6">
                  We're always looking for talented individuals who share our passion for 
                  innovative design and exceptional client service. If you're interested in 
                  joining our collaborative team, we'd love to hear from you.
                </p>
                <button className="btn bg-white text-primary-500 hover:bg-neutral-100">
                  View Open Positions
                </button>
              </div>
              
              <div className="flex justify-center md:justify-end">
                <img 
                  src="https://images.pexels.com/photos/7108531/pexels-photo-7108531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Working at Dream Architects" 
                  className="rounded-lg w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

type TeamCardProps = {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
  };
};

const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div className="team-card bg-white rounded-xl overflow-hidden">
      <div className="h-64 bg-primary-500 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-secondary-500 font-medium mb-4">{member.role}</p>
        <p className="text-neutral-600 text-sm">{member.bio}</p>
      </div>
    </div>
  );
};

export default TeamPage;