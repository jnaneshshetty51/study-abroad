'use client';

import { FileCheck, Clock, DollarSign, FileText } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export default function VisaAssistancePage() {
  const visaSteps = [
    {
      icon: FileText,
      title: 'Document Preparation',
      description: 'We help you gather and prepare all required documents for your visa application.',
    },
    {
      icon: FileCheck,
      title: 'Application Submission',
      description: 'Our experts review and submit your application to ensure accuracy and completeness.',
    },
    {
      icon: Clock,
      title: 'Processing & Follow-up',
      description: 'We track your application status and follow up with the embassy or consulate.',
    },
    {
      icon: FileCheck,
      title: 'Interview Preparation',
      description: 'We prepare you for visa interviews with mock sessions and tips.',
    },
  ];

  const requiredDocuments = [
    'Valid Passport',
    'Admission Letter',
    'Financial Proof',
    'Academic Transcripts',
    'English Proficiency Test Results',
    'Medical Examination Report',
    'Police Clearance Certificate',
    'Visa Application Form',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-green-600/10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient font-display">Visa Assistance</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete visa application support with high success rates. Our experienced
            team guides you through every step of the visa process.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="premium-card p-8">
          <h2 className="text-3xl font-bold mb-6 font-display">Our Visa Services</h2>
          <div className="space-y-6">
            {visaSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-start group">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl mr-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="premium-card p-8">
          <h2 className="text-3xl font-bold mb-6 font-display">Required Documents</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
            <ul className="space-y-3">
              {requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-center group">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="premium-card p-8 mb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <h2 className="text-3xl font-bold mb-8 text-center font-display">Why Choose Our Visa Assistance?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">95%+</div>
            <div className="text-gray-700 font-medium">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">24/7</div>
            <div className="text-gray-700 font-medium">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Expert</div>
            <div className="text-gray-700 font-medium">Consultants</div>
          </div>
        </div>
      </div>

      <div className="premium-card p-8">
        <h2 className="text-3xl font-bold mb-6 text-center font-display">Start Your Visa Application</h2>
        <InquiryForm serviceSlug="visa-assistance" />
      </div>
      </div>
    </div>
  );
}

