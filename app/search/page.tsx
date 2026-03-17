'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, GraduationCap, MapPin, DollarSign, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchPage() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState<'universities' | 'programs'>('programs');
  const [filters, setFilters] = useState({
    query: '',
    country: '',
    degree: '',
    minTuition: '',
    maxTuition: '',
    duration: '',
    language: '',
    ieltsMin: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => setCountries(data.countries || []));
  }, []);

  const performSearch = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.query) params.append('search', filters.query);
      if (filters.country) params.append('countryId', filters.country);
      if (filters.degree) params.append('degree', filters.degree);
      if (filters.minTuition) params.append('minTuition', filters.minTuition);
      if (filters.maxTuition) params.append('maxTuition', filters.maxTuition);
      if (filters.duration) params.append('duration', filters.duration);
      if (filters.language) params.append('language', filters.language);
      if (filters.ieltsMin) params.append('ieltsMin', filters.ieltsMin);

      const endpoint = searchType === 'universities' ? '/api/universities' : '/api/programs';
      const res = await fetch(`${endpoint}?${params}`);
      const data = await res.json();
      
      if (searchType === 'universities') {
        setUniversities(data.universities || []);
      } else {
        setPrograms(data.programs || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, searchType]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Advanced Search</h1>
        <p className="text-xl text-gray-600">Find the perfect university or program for you</p>
      </div>

      {/* Search Type Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-lg shadow-md inline-flex">
          <button
            onClick={() => setSearchType('programs')}
            className={`px-6 py-2 rounded-lg transition ${
              searchType === 'programs'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Programs
          </button>
          <button
            onClick={() => setSearchType('universities')}
            className={`px-6 py-2 rounded-lg transition ${
              searchType === 'universities'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Universities
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${searchType}...`}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50 flex items-center"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
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
            </div>
            {searchType === 'programs' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Degree</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
                    value={filters.degree}
                    onChange={(e) => setFilters({ ...filters, degree: e.target.value })}
                  >
                    <option value="">All Degrees</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
                    value={filters.language}
                    onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                  >
                    <option value="">All Languages</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Min Tuition</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Min"
                    value={filters.minTuition}
                    onChange={(e) => setFilters({ ...filters, minTuition: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Tuition</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Max"
                    value={filters.maxTuition}
                    onChange={(e) => setFilters({ ...filters, maxTuition: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Min IELTS</label>
                  <input
                    type="number"
                    step="0.5"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Min IELTS"
                    value={filters.ieltsMin}
                    onChange={(e) => setFilters({ ...filters, ieltsMin: e.target.value })}
                  />
                </div>
              </>
            )}
            <div className="md:col-span-3">
              <button
                onClick={() => setFilters({
                  query: '',
                  country: '',
                  degree: '',
                  minTuition: '',
                  maxTuition: '',
                  duration: '',
                  language: '',
                  ieltsMin: '',
                })}
                className="text-red-600 hover:text-red-700"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : searchType === 'programs' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={`/programs/${program.id}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center mb-3">
                <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{program.university.country.name}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{program.name}</h3>
              <p className="text-gray-600 mb-3">{program.university.name}</p>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-600">{program.degree}</span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {program.duration} months
                </div>
              </div>
              {program.tuitionFee && (
                <div className="flex items-center text-green-600 font-semibold">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {formatCurrency(program.tuitionFee, program.currency)}/year
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((university) => (
            <Link
              key={university.id}
              href={`/universities/${university.id}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {university.logoUrl && (
                <Image
                  src={university.logoUrl}
                  alt={university.name}
                  width={300}
                  height={128}
                  className="w-full h-32 object-contain mb-4"
                  unoptimized
                />
              )}
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{university.country.name}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{university.name}</h3>
              {university.ranking && (
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm">Rank #{university.ranking}</span>
                </div>
              )}
              {university.commission > 0 && (
                <div className="text-green-600 font-semibold text-sm">
                  {university.commission}% Commission
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

