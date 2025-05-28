import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What services does Dream Architects offer?",
    answer:
      "Dream Architects provides a comprehensive range of services including architectural design, interior design, project management, project supervision, landscape design, feasibility studies, renovation and restoration, and sustainable design consulting.",
  },
  {
    id: 2,
    question: "How long does the architectural design process typically take?",
    answer:
      "The duration varies depending on project complexity and scale. A residential project might take 3-6 months for design development, while larger commercial projects can take 6-12 months. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    id: 3,
    question: "Do you work on residential and commercial projects?",
    answer:
      "Yes, we have extensive experience in both residential and commercial architecture. Our portfolio includes private homes, multi-family residences, office buildings, retail spaces, hospitality venues, and institutional facilities.",
  },
  {
    id: 4,
    question: "How do you charge for your architectural services?",
    answer:
      "We typically use a percentage-based fee structure calculated on the project construction cost, though we also offer fixed-fee arrangements for certain project types. During our initial consultation, we'll discuss your specific needs and provide a detailed fee proposal.",
  },
  {
    id: 5,
    question:
      "Do you incorporate sustainable design principles in your projects?",
    answer:
      "Absolutely. Sustainability is a core value at Dream Architects. We integrate energy-efficient systems, sustainable materials, and environmentally conscious design strategies in all our projects, tailored to each client's specific sustainability goals and budget.",
  },
  {
    id: 6,
    question: "Can you help with obtaining building permits and approvals?",
    answer:
      "Yes, we provide comprehensive assistance with the permitting process. Our team is familiar with local building codes and regulations, and we prepare all necessary documentation for submissions to relevant authorities.",
  },
  {
    id: 7,
    question:
      "Do you provide interior design services along with architectural design?",
    answer:
      "Yes, we offer full interior design services that can be integrated with our architectural work or provided as a standalone service. Our holistic approach ensures a cohesive design throughout the entire project.",
  },
  {
    id: 8,
    question: "What geographic areas do you serve?",
    answer:
      "We primarily serve East Africa with a focus on Uganda, Kenya, and Tanzania. However, we have undertaken projects throughout Africa and are open to international opportunities that align with our expertise.",
  },
];

const FaqPage = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="h-24 md:h-36"></div>

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/3.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative container h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-neutral-200 leading-relaxed">
              Have questions about our architectural services or project
              process? Explore our FAQs to find clear answers or get in touch
              with us for personalized support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-500 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="max-w-2xl mx-auto text-neutral-600">
              Find answers to common questions about our architectural services,
              project process, and how we work with clients to bring their
              vision to life.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  toggleFaq={toggleFaq}
                />
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-16 bg-primary-50 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">
              Still have questions?
            </h3>
            <p className="text-neutral-600 text-center mb-6">
              If you couldn't find the answer to your question, please contact
              us directly and we'll be happy to help.
            </p>
            <div className="flex justify-center">
              <button className="btn btn-primary">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="bg-neutral-900 py-20 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl italic font-serif mb-6">
              "Dream Architects transformed our concept into a stunning reality
              that exceeded our expectations. Their attention to detail and
              innovative approach to problem-solving made all the difference."
            </h2>
            <p className="text-secondary-500 font-medium">
              - James Kibuuka, Residential Client
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

type FaqItemProps = {
  faq: {
    id: number;
    question: string;
    answer: string;
  };
  isOpen: boolean;
  toggleFaq: (id: number) => void;
};

const FaqItem = ({ faq, isOpen, toggleFaq }: FaqItemProps) => {
  return (
    <div className="border-b border-neutral-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left py-4"
        onClick={() => toggleFaq(faq.id)}
      >
        <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
        {isOpen ? (
          <ChevronUp className="flex-shrink-0 text-secondary-500" />
        ) : (
          <ChevronDown className="flex-shrink-0 text-primary-500" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-neutral-600">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FaqPage;
