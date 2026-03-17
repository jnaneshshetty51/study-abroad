'use client';

import { GraduationCap, Target, Award, Users } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export default function AdmissionSupportPage() {
  const services = [
    {
      icon: Target,
      title: 'University Selection',
      description: 'We help you identify universities that match your academic profile and career goals.',
    },
    {
      icon: GraduationCap,
      title: 'Application Preparation',
      description: 'Complete support in preparing your application, including essays, recommendations, and portfolios.',
    },
    {
      icon: Award,
      title: 'Scholarship Assistance',
      description: 'Guidance on finding and applying for scholarships and financial aid.',
    },
    {
      icon: Users,
      title: 'Ongoing Support',
      description: 'Continuous support throughout the admission process until you receive your acceptance letter.',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Profile Assessment',
      description: 'We analyze your academic background, test scores, and preferences.',
    },
    {
      step: '2',
      title: 'University Shortlisting',
      description: 'We create a list of universities that align with your profile and goals.',
    },
    {
      step: '3',
      title: 'Application Preparation',
      description: 'We help you prepare all application materials and documents.',
    },
    {
      step: '4',
      title: 'Submission & Follow-up',
      description: 'We submit your applications and track their status.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient font-display">Admission Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end admission support for top universities worldwide. We help you
            get into your dream university with our comprehensive services.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center font-display">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="premium-card p-6 group hover:shadow-premium-glow transition-all">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition font-display">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center font-display">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {processSteps.map((item) => (
            <div key={item.step} className="premium-card p-6 text-center group hover:shadow-premium-glow transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-gradient transition">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="premium-card p-8 mb-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <h2 className="text-3xl font-bold mb-8 text-center font-display">What Makes Us Different?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">1000+</div>
            <div className="text-gray-700 font-medium">Successful Applications</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-gray-700 font-medium">Partner Universities</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">90%+</div>
            <div className="text-gray-700 font-medium">Acceptance Rate</div>
          </div>
        </div>
      </div>

      <div className="premium-card p-8">
        <h2 className="text-3xl font-bold mb-6 text-center font-display">Start Your Admission Journey</h2>
        <InquiryForm serviceSlug="admission-support" />
      </div>
      </div>
    </div>
  );
}

