'use client';

import { useState, useEffect } from 'react';
import { Globe, CheckCircle } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export default function CountrySelectionPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient font-display">Country Selection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choosing the right country is crucial for your study abroad journey.
            Our experts help you make an informed decision based on your goals,
            budget, and preferences.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="premium-card p-8">
          <h2 className="text-3xl font-bold mb-6 font-display">Why Country Selection Matters</h2>
          <ul className="space-y-5">
            <li className="flex items-start group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Career Opportunities</h3>
                <p className="text-gray-600 leading-relaxed">
                  Different countries offer varying job markets and career prospects
                  for international students.
                </p>
              </div>
            </li>
            <li className="flex items-start group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Cost of Living</h3>
                <p className="text-gray-600 leading-relaxed">
                  Understanding the cost of living helps you plan your budget
                  effectively.
                </p>
              </div>
            </li>
            <li className="flex items-start group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Quality of Education</h3>
                <p className="text-gray-600 leading-relaxed">
                  Each country has its own education system and quality standards.
                </p>
              </div>
            </li>
            <li className="flex items-start group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Cultural Fit</h3>
                <p className="text-gray-600 leading-relaxed">
                  Finding a country where you&apos;ll feel comfortable and thrive
                  culturally.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="premium-card p-8">
          <h2 className="text-3xl font-bold mb-6 font-display">Our Process</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6 bg-white rounded-xl p-4 hover:shadow-lg transition relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l"></div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3">1</div>
              <h3 className="font-semibold text-lg mb-2">Initial Consultation</h3>
              <p className="text-gray-600 leading-relaxed">
                We discuss your academic background, career goals, and preferences.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 bg-white rounded-xl p-4 hover:shadow-lg transition relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l"></div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3">2</div>
              <h3 className="font-semibold text-lg mb-2">Country Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                We analyze multiple countries based on your criteria and provide
                detailed comparisons.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 bg-white rounded-xl p-4 hover:shadow-lg transition relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l"></div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3">3</div>
              <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                We present you with top country recommendations with detailed
                reasoning.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 bg-white rounded-xl p-4 hover:shadow-lg transition relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l"></div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3">4</div>
              <h3 className="font-semibold text-lg mb-2">Final Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                We help you make the final decision and plan your next steps.
              </p>
            </div>
          </div>
        </div>
      </div>

      {!loading && countries.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center font-display">Popular Destinations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {countries.map((country) => (
              <div
                key={country.id}
                className="premium-card p-6 group hover:shadow-premium-glow transition-all"
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition">{country.name}</h3>
                {country.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">{country.description}</p>
                )}
                {country._count && (
                  <p className="text-sm text-gray-500 font-medium">
                    {country._count.universities} Universities Available
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="premium-card p-8">
        <h2 className="text-3xl font-bold mb-6 text-center font-display">Get Started Today</h2>
        <InquiryForm serviceSlug="country-selection" />
      </div>
      </div>
    </div>
  );
}

