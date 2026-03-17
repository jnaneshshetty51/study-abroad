'use client';

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Info } from 'lucide-react';

export default function CalculatorPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [inputs, setInputs] = useState({
    tuitionFee: '',
    duration: '12',
    livingCost: '',
    currency: 'USD',
  });
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries || []);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.id === selectedCountry);
      if (country) {
        setInputs((prev) => ({
          ...prev,
          currency: country.currency || 'USD',
          livingCost: country.costOfLiving?.toString() || '',
        }));
      }
    }
  }, [selectedCountry, countries]);

  const calculate = () => {
    const tuition = parseFloat(inputs.tuitionFee) || 0;
    const living = parseFloat(inputs.livingCost) || 0;
    const duration = parseFloat(inputs.duration) || 12;

    const monthlyLiving = living;
    const totalLiving = monthlyLiving * duration;
    const totalTuition = tuition * (duration / 12);
    const totalCost = totalTuition + totalLiving;
    const monthlyCost = totalCost / duration;

    setResults({
      totalCost,
      totalTuition,
      totalLiving,
      monthlyCost,
      monthlyLiving,
      duration,
      currency: inputs.currency,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Calculator className="w-20 h-20 text-blue-600 mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4">Cost Calculator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Estimate the total cost of studying abroad
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Input Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Country</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Annual Tuition Fee ({inputs.currency})
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter annual tuition fee"
                value={inputs.tuitionFee}
                onChange={(e) => setInputs({ ...inputs, tuitionFee: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Program Duration (months)</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={inputs.duration}
                onChange={(e) => setInputs({ ...inputs, duration: e.target.value })}
              >
                <option value="6">6 months</option>
                <option value="12">12 months (1 year)</option>
                <option value="18">18 months</option>
                <option value="24">24 months (2 years)</option>
                <option value="36">36 months (3 years)</option>
                <option value="48">48 months (4 years)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Monthly Living Cost ({inputs.currency})
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter monthly living cost"
                value={inputs.livingCost}
                onChange={(e) => setInputs({ ...inputs, livingCost: e.target.value })}
              />
              {selectedCountry && countries.find((c) => c.id === selectedCountry)?.costOfLiving && (
                <p className="text-xs text-gray-500 mt-1">
                  Average: {formatCurrency(countries.find((c) => c.id === selectedCountry)?.costOfLiving || 0)}/month
                </p>
              )}
            </div>
            <button
              onClick={calculate}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Cost Breakdown</h2>
          {results ? (
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Cost</span>
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(results.totalCost)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  For {results.duration} months
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Tuition Fees</span>
                  <span className="font-semibold">{formatCurrency(results.totalTuition)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Living Expenses</span>
                  <span className="font-semibold">{formatCurrency(results.totalLiving)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Monthly Average</span>
                  <span className="font-semibold">{formatCurrency(results.monthlyCost)}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Note:</p>
                    <p>This is an estimate. Actual costs may vary based on lifestyle, location, and other factors.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Enter your details and click Calculate to see the cost breakdown</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

