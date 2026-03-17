'use client';

import { useState, useEffect } from 'react';
import { Award, DollarSign, Calendar, MapPin, GraduationCap, Heart, Search, Filter, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    country: '',
    amount: '',
    search: '',
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    Promise.all([
      fetch('/api/scholarships').then((res) => res.json()),
      fetch('/api/countries').then((res) => res.json()),
      fetch('/api/favorites?type=SCHOLARSHIP').then((res) => res.json()),
    ]).then(([scholarshipsData, countriesData, favoritesData]) => {
      setScholarships(scholarshipsData.scholarships || []);
      setCountries(countriesData.countries || []);
      if (favoritesData.favorites) {
        setFavorites(new Set(favoritesData.favorites.map((f: any) => f.itemId)));
      }
      setLoading(false);
    });
  }, []);

  const toggleFavorite = async (scholarshipId: string) => {
    const isFavorite = favorites.has(scholarshipId);
    const method = isFavorite ? 'DELETE' : 'POST';
    
    try {
      const res = await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'SCHOLARSHIP',
          itemId: scholarshipId,
        }),
      });

      if (res.ok) {
        if (isFavorite) {
          setFavorites((prev) => {
            const newSet = new Set(prev);
            newSet.delete(scholarshipId);
            return newSet;
          });
        } else {
          setFavorites((prev) => {
            const newSet = new Set(prev);
            newSet.add(scholarshipId);
            return newSet;
          });
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    if (filters.country && scholarship.countryId !== filters.country) return false;
    if (filters.search && !scholarship.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.amount) {
      const amount = scholarship.amount || 0;
      switch (filters.amount) {
        case 'low':
          if (amount > 5000) return false;
          break;
        case 'medium':
          if (amount < 5000 || amount > 20000) return false;
          break;
        case 'high':
          if (amount < 20000) return false;
          break;
      }
    }
    return scholarship.active;
  });

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=600&fit=crop"
            alt="Scholarships"
            width={1920}
            height={600}
            className="w-full h-full"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/90 via-orange-900/80 to-yellow-900/90"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium text-white">Premium Scholarship Database</span>
          </div>
          <Award className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-scale-in" />
          <h1 className="text-6xl font-bold mb-6 text-white font-display">Find Scholarships</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Discover funding opportunities to support your study abroad journey
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-premium mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search scholarships..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={filters.amount}
            onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
          >
            <option value="">All Amounts</option>
            <option value="low">Under $5,000</option>
            <option value="medium">$5,000 - $20,000</option>
            <option value="high">Over $20,000</option>
          </select>
          <button
            onClick={() => setFilters({ country: '', amount: '', search: '' })}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredScholarships.length === 0 ? (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No scholarships found matching your criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="premium-card overflow-hidden group"
            >
              {/* Scholarship Header */}
              <div className="relative h-32 bg-gradient-to-r from-yellow-400 to-orange-500 p-6">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleFavorite(scholarship.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition ${
                      favorites.has(scholarship.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(scholarship.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <Award className="w-12 h-12 text-white mb-2" />
                <h3 className="text-xl font-bold text-white line-clamp-2">{scholarship.title}</h3>
              </div>
              
              <div className="p-6">
                {scholarship.country && (
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm font-medium">{scholarship.country.name}</span>
                  </div>
                )}
                {scholarship.university && (
                  <div className="flex items-center text-gray-600 mb-3">
                    <GraduationCap className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-sm font-medium">{scholarship.university.name}</span>
                  </div>
                )}

                {scholarship.amount && (
                  <div className="bg-green-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center">
                      <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                      <span className="text-3xl font-bold text-green-700">
                        {formatCurrency(scholarship.amount, scholarship.currency)}
                      </span>
                    </div>
                  </div>
                )}

              {scholarship.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {scholarship.description}
                </p>
              )}

              {scholarship.deadline && (
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>
              )}

                <div className="flex gap-2 mt-4">
                  {scholarship.link && (
                    <a
                      href={scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 premium-button-primary py-2 text-center text-sm"
                    >
                      Apply Now
                    </a>
                  )}
                  <Link
                    href={`/scholarships/${scholarship.id}`}
                    className="flex-1 premium-button-secondary py-2 text-center text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

