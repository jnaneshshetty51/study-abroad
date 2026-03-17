'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, Globe, TrendingUp, Star, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/countries').then((res) => res.json()),
      fetch('/api/universities').then((res) => res.json()),
    ]).then(([countriesData, universitiesData]) => {
      setCountries(countriesData.countries || []);
      setUniversities(universitiesData.universities || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`/api/universities?countryId=${selectedCountry}`)
        .then((res) => res.json())
        .then((data) => {
          setUniversities(data.universities || []);
        });
    } else {
      fetch('/api/universities')
        .then((res) => res.json())
        .then((data) => {
          setUniversities(data.universities || []);
        });
    }
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=600&fit=crop"
            alt="University campus"
            width={1920}
            height={600}
            className="w-full h-full"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <GraduationCap className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-scale-in" />
          <h1 className="text-6xl font-bold mb-6 text-white font-display">Partner Universities</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Explore our partner universities offering high commission rates and
            excellent opportunities for international students worldwide.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">

      <div className="mb-8 bg-white p-6 rounded-2xl shadow-premium">
        <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-3">
          Filter by Country
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : universities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No universities found. Check back later!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university) => (
            <div
              key={university.id}
              className="premium-card overflow-hidden group"
            >
              {/* University Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={university.coverImage || university.logoUrl}
                  alt={university.name}
                  width={400}
                  height={200}
                  className="w-full h-full"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {university.logoUrl && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <Image
                      src={university.logoUrl}
                      alt={`${university.name} logo`}
                      width={200}
                      height={48}
                      className="h-12 w-auto object-contain filter drop-shadow-lg"
                      unoptimized
                    />
                  </div>
                )}
                {university.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600 font-medium">{university.country.name}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition">{university.name}</h3>
                {university.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {university.description}
                  </p>
                )}
                <div className="flex items-center justify-between mb-4">
                  {university.ranking && (
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">#{university.ranking}</span>
                    </div>
                  )}
                  <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-bold text-green-700">
                      {university.commission}% Commission
                    </span>
                  </div>
                </div>
                {university.website && (
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center premium-button-secondary py-2 text-sm"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop"
            alt="Contact us"
            width={1200}
            height={400}
            className="w-full h-full"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-purple-900/95"></div>
        </div>
        <div className="relative z-10 p-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white font-display">Interested in a University?</h2>
          <p className="text-xl mb-8 text-gray-100">Contact us to learn more about admission requirements</p>
          <Link
            href="/contact"
            className="premium-button-primary px-8 py-4 text-lg shadow-2xl inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

