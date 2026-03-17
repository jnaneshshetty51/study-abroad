'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, TrendingUp } from 'lucide-react';

export default function AdminUniversitiesPage() {
  const router = useRouter();
  const [universities, setUniversities] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    countryId: '',
    description: '',
    website: '',
    logoUrl: '',
    commission: '',
    ranking: '',
  });

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'ADMIN') {
          router.push('/login');
          return;
        }
        loadData();
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const loadData = () => {
    Promise.all([
      fetch('/api/countries').then((res) => res.json()),
      fetch('/api/universities').then((res) => res.json()),
    ]).then(([countriesData, universitiesData]) => {
      setCountries(countriesData.countries || []);
      setUniversities(universitiesData.universities || []);
      setLoading(false);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingUniversity
      ? `/api/universities/${editingUniversity.id}`
      : '/api/universities';
    const method = editingUniversity ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          commission: parseFloat(formData.commission) || 0,
          ranking: formData.ranking ? parseInt(formData.ranking) : null,
        }),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingUniversity(null);
        setFormData({
          name: '',
          countryId: '',
          description: '',
          website: '',
          logoUrl: '',
          commission: '',
          ranking: '',
        });
        loadData();
      }
    } catch (error) {
      console.error('Error saving university:', error);
    }
  };

  const handleEdit = (university: any) => {
    setEditingUniversity(university);
    setFormData({
      name: university.name,
      countryId: university.countryId,
      description: university.description || '',
      website: university.website || '',
      logoUrl: university.logoUrl || '',
      commission: university.commission?.toString() || '',
      ranking: university.ranking?.toString() || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university?')) return;

    try {
      const res = await fetch(`/api/universities/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error deleting university:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Universities</h1>
        <button
          onClick={() => {
            setEditingUniversity(null);
            setFormData({
              name: '',
              countryId: '',
              description: '',
              website: '',
              logoUrl: '',
              commission: '',
              ranking: '',
            });
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add University
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingUniversity ? 'Edit University' : 'Add New University'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.countryId}
                  onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Commission (%) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.commission}
                  onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ranking</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.ranking}
                  onChange={(e) => setFormData({ ...formData, ranking: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border rounded-md"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingUniversity ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingUniversity(null);
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Commission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ranking</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {universities.map((university) => (
              <tr key={university.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{university.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{university.country.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-600 font-semibold">{university.commission}%</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {university.ranking ? `#${university.ranking}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(university)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(university.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

