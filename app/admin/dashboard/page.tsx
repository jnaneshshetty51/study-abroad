'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  DollarSign,
  MessageSquare,
  BarChart3,
  Calendar,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalInquiries: 0,
    totalUniversities: 0,
    totalScholarships: 0,
    totalRevenue: 0,
    pendingInquiries: 0,
    pendingApplications: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(() => {
    Promise.all([
      fetch('/api/admin/stats').then((res) => res.json()),
      fetch('/api/admin/activity').then((res) => res.json()),
    ]).then(([statsData, activityData]) => {
      setStats((prevStats) => statsData.stats || prevStats);
      setRecentActivity(activityData.activities || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'ADMIN') {
          router.push('/login');
          return;
        }
        setUser(data.user);
        loadDashboardData();
      })
      .catch(() => router.push('/login'));
  }, [router, loadDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient font-display">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="premium-card p-6 group hover:shadow-premium-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Users</p>
                <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stats.totalUsers}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="premium-card p-6 group hover:shadow-premium-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Applications</p>
                <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">{stats.totalApplications}</p>
                {stats.pendingApplications > 0 && (
                  <p className="text-yellow-600 text-sm mt-1 font-semibold">{stats.pendingApplications} pending</p>
                )}
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="premium-card p-6 group hover:shadow-premium-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Inquiries</p>
                <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">{stats.totalInquiries}</p>
                {stats.pendingInquiries > 0 && (
                  <p className="text-yellow-600 text-sm mt-1 font-semibold">{stats.pendingInquiries} pending</p>
                )}
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="premium-card p-6 group hover:shadow-premium-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Universities</p>
                <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">{stats.totalUniversities}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="premium-card p-6">
          <h2 className="text-2xl font-bold mb-6 font-display">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/universities"
              className="block premium-card p-4 hover:shadow-premium-lg transition-all group"
            >
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium group-hover:text-blue-600 transition">Manage Universities</span>
              </div>
            </Link>
            <Link
              href="/admin/inquiries"
              className="block premium-card p-4 hover:shadow-premium-lg transition-all group"
            >
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium group-hover:text-purple-600 transition">View Inquiries</span>
              </div>
            </Link>
            <Link
              href="/admin/applications"
              className="block premium-card p-4 hover:shadow-premium-lg transition-all group"
            >
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium group-hover:text-green-600 transition">Manage Applications</span>
              </div>
            </Link>
            <Link
              href="/admin/scholarships"
              className="block premium-card p-4 hover:shadow-premium-lg transition-all group"
            >
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium group-hover:text-yellow-600 transition">Manage Scholarships</span>
              </div>
            </Link>
            <Link
              href="/admin/blog"
              className="block premium-card p-4 hover:shadow-premium-lg transition-all group"
            >
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium group-hover:text-indigo-600 transition">Manage Blog</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="md:col-span-2 premium-card p-6">
          <h2 className="text-2xl font-bold mb-6 font-display">Recent Activity</h2>
          {recentActivity.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-lg">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity: any, idx: number) => (
                <div key={idx} className="premium-card p-4 hover:shadow-premium-lg transition-all">
                  <p className="font-semibold text-lg mb-1">{activity.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

