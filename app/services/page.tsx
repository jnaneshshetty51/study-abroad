import Link from 'next/link';
import { Globe, FileCheck, GraduationCap } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: 'Country Selection',
      description: 'Expert guidance to choose the perfect country for your study abroad journey. We analyze your preferences, career goals, and budget to recommend the best destinations.',
      href: '/services/country-selection',
      features: [
        'Comprehensive country comparison',
        'Cost of living analysis',
        'Career opportunities assessment',
        'Cultural fit evaluation',
      ],
    },
    {
      icon: FileCheck,
      title: 'Visa Assistance',
      description: 'Complete visa application support with high success rates. Our experts guide you through every step of the visa process.',
      href: '/services/visa-assistance',
      features: [
        'Document preparation',
        'Application submission',
        'Interview preparation',
        'Follow-up support',
      ],
    },
    {
      icon: GraduationCap,
      title: 'Admission Support',
      description: 'End-to-end admission support for top universities worldwide. We help you get into your dream university.',
      href: '/services/admission-support',
      features: [
        'University selection',
        'Application preparation',
        'Essay review',
        'Scholarship assistance',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient font-display">Our Premium Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive study abroad consultancy services tailored to your needs
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className="premium-card p-8 group hover:shadow-premium-glow transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="text-white w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-gradient transition font-display">{service.title}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-3 font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-blue-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                  Learn More <span className="ml-2">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
          <div className="relative z-10 p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4 font-display">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">Contact us today for a free consultation</p>
            <Link
              href="/contact"
              className="premium-button-secondary bg-white text-blue-600 hover:bg-gray-50 inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

