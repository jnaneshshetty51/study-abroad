'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, DollarSign, Clock, MapPin, TrendingUp, X } from 'lucide-react';

export default function ComparePage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [comparison, setComparison] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/programs')
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data.programs || []);
      });
  }, []);

  useEffect(() => {
    if (selectedPrograms.length > 0) {
      fetch(`/api/programs?ids=${selectedPrograms.join(',')}`)
        .then((res) => res.json())
        .then((data) => {
          setComparison(data.programs || []);
        });
    } else {
      setComparison([]);
    }
  }, [selectedPrograms]);

  const toggleProgram = (programId: string) => {
    if (selectedPrograms.includes(programId)) {
      setSelectedPrograms(selectedPrograms.filter((id) => id !== programId));
    } else if (selectedPrograms.length < 3) {
      setSelectedPrograms([...selectedPrograms, programId]);
    }
  };

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
        <h1 className="text-5xl font-bold mb-4">Compare Programs</h1>
        <p className="text-xl text-gray-600">Compare up to 3 programs side by side</p>
      </div>

      {/* Program Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Select Programs to Compare</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {programs.slice(0, 10).map((program) => (
            <button
              key={program.id}
              onClick={() => toggleProgram(program.id)}
              className={`p-4 border-2 rounded-lg text-left transition ${
                selectedPrograms.includes(program.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={!selectedPrograms.includes(program.id) && selectedPrograms.length >= 3}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{program.name}</h3>
                  <p className="text-sm text-gray-600">{program.university.name}</p>
                </div>
                {selectedPrograms.includes(program.id) && (
                  <X className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </button>
          ))}
        </div>
        {selectedPrograms.length > 0 && (
          <button
            onClick={() => setSelectedPrograms([])}
            className="mt-4 text-red-600 hover:text-red-700"
          >
            Clear Selection
          </button>
        )}
      </div>

      {/* Comparison Table */}
      {comparison.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                {comparison.map((program) => (
                  <th key={program.id} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    <div>
                      <p className="font-semibold">{program.name}</p>
                      <p className="text-xs text-gray-600">{program.university.name}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">University</td>
                {comparison.map((program) => (
                  <td key={program.id} className="px-6 py-4">
                    {program.university.name}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Country</td>
                {comparison.map((program) => (
                  <td key={program.id} className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {program.university.country.name}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Degree</td>
                {comparison.map((program) => (
                  <td key={program.id} className="px-6 py-4">
                    {program.degree}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Duration</td>
                {comparison.map((program) => (
                  <td key={program.id} className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {program.duration} months
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Tuition Fee</td>
                {comparison.map((program) => (
                  <td key={program.id} className="px-6 py-4">
                    {program.tuitionFee ? (
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {formatCurrency(program.tuitionFee, program.currency)}
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Language</td>
                {comparison.map((program) => (
                  <td key={program.id} className="px-6 py-4">
                    {program.language || 'English'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">IELTS Required</td>
                {comparison.map((program) => (
                  <td key={program.id} className="px-6 py-4">
                    {program.ieltsRequired ? `${program.ieltsRequired}` : 'N/A'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

