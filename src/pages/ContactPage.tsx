import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <div className="h-24 md:h-36"></div>
      
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&crop=entropy)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-neutral-200">
              We're here to help bring your architectural vision to life. 
              Reach out to us to discuss your project or schedule a consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ContactCard
              icon={<Phone className="w-6 h-6" />}
              title="Phone"
              details={['+256 758 198 298', '+256 704 123 456']}
            />
            <ContactCard
              icon={<Mail className="w-6 h-6" />}
              title="Email"
              details={['info@dreamarchitects.com', 'support@dreamarchitects.com']}
            />
            <ContactCard
              icon={<MapPin className="w-6 h-6" />}
              title="Location"
              details={['Amber Heights, Ground Floor Suite A2', 'Plot 29/33 Kampala Road', 'Kitintale, Kampala - Uganda']}
            />
            <ContactCard
              icon={<Clock className="w-6 h-6" />}
              title="Working Hours"
              details={['Monday - Friday: 8am - 6pm', 'Saturday: 9am - 1pm', 'Sunday: Closed']}
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-neutral-600 mb-8">
                Whether you have a project in mind or just want to explore possibilities, 
                we're here to help. Fill out the form below, and we'll get back to you 
                within 24 hours.
              </p>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
            
            <div>
              <div className="sticky top-24">
                <div className="aspect-square rounded-lg overflow-hidden mb-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.757558009251!2d32.58959661475356!3d0.3152491997750905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0932058e0f%3A0x31c75a4f5c5563c1!2sKampala%20Road%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1645608000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="bg-primary-500 text-white p-8 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 mr-3"></div>
                      <p>15+ years of architectural excellence</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 mr-3"></div>
                      <p>Award-winning design team</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 mr-3"></div>
                      <p>Sustainable design practices</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 mr-3"></div>
                      <p>Personalized client service</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  details: string[];
};

const ContactCard = ({ icon, title, details }: ContactCardProps) => {
  return (
    <div className="bg-neutral-50 p-6 rounded-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="text-primary-500 mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <div className="space-y-1">
        {details.map((detail, index) => (
          <p key={index} className="text-neutral-600">{detail}</p>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;