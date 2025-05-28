import React from 'react';

type ServiceProps = {
  service: {
    id: number;
    number: string;
    title: string;
    description: string;
    image: string;
  };
};

const ServicePreview = ({ service }: ServiceProps) => {
  const isEven = service.id % 2 === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className={`${isEven ? 'md:order-2' : ''}`}>
        <div className="relative">
          <div className="absolute top-6 left-6 z-10">
            <div className="flex items-center">
              <div className="relative">
                <span className="text-5xl font-serif font-bold text-secondary-500">
                  {service.number}
                </span>
                <div className="service-number-line w-24 mt-1"></div>
              </div>
            </div>
          </div>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className={`${isEven ? 'md:order-1 md:pr-12' : 'md:pl-12'}`}>
        <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
        <p className="text-neutral-600 leading-relaxed mb-6">
          {service.description}
        </p>
        
        {/* Service pagination dots */}
        <div className="service-pagination flex items-center">
          <div className={`dot ${service.id === 1 ? 'active' : ''}`}></div>
          <div className={`line mx-1 ${service.id === 1 || service.id === 2 ? 'active' : ''}`}></div>
          <div className={`dot ${service.id === 2 ? 'active' : ''}`}></div>
          <div className={`line mx-1 ${service.id === 2 || service.id === 3 ? 'active' : ''}`}></div>
          <div className={`dot ${service.id === 3 ? 'active' : ''}`}></div>
          <div className={`line mx-1 ${service.id === 3 || service.id === 4 ? 'active' : ''}`}></div>
          <div className={`dot ${service.id === 4 ? 'active' : ''}`}></div>
          <div className={`line mx-1 ${service.id === 4 || service.id === 5 ? 'active' : ''}`}></div>
          <div className={`dot ${service.id === 5 ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ServicePreview;