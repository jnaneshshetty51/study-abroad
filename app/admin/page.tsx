'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Globe, FileText, Users, TrendingUp, BarChart3 } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'ADMIN') {
          router.push('/login');
          return;
        }
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const adminSections = [
    {
      icon: GraduationCap,
      title: 'Universities',
      description: 'Manage universities and their commission rates',
      href: '/admin/universities',
      color: 'bg-blue-500',
    },
    {
      icon: Globe,
      title: 'Countries',
      description: 'Add and manage countries',
      href: '/admin/countries',
      color: 'bg-green-500',
    },
    {
      icon: FileText,
      title: 'Inquiries',
      description: 'View and manage customer inquiries',
      href: '/admin/inquiries',
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      title: 'Users',
      description: 'Manage user accounts',
      href: '/admin/users',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/dashboard"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
        >
          <div className="bg-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold mb-2">Analytics</h2>
          <p className="text-gray-600 text-sm">View statistics and reports</p>
        </Link>
        {adminSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
            >
              <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <Icon className="text-white w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p className="text-gray-600 text-sm">{section.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

