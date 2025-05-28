import { useState, useEffect } from 'react';
import { getTeamMembers } from '../lib/sanity';

type TeamMember = {
  _id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
};

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await getTeamMembers();
        setTeamMembers(members);
        setError(null);
      } catch (err) {
        setError('Failed to load team members');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse">Loading team members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

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
              <TeamCard key={member._id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

type TeamCardProps = {
  member: TeamMember;
};

const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div className="team-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-64 bg-primary-500 overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
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