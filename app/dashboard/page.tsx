'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  GraduationCap, 
  FileText, 
  Bell, 
  Heart, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    favorites: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push('/login');
          return;
        }
        setUser(data.user);
        loadDashboardData();
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const loadDashboardData = () => {
    Promise.all([
      fetch('/api/applications').then((res) => res.json()),
      fetch('/api/notifications').then((res) => res.json()),
      fetch('/api/favorites').then((res) => res.json()),
    ]).then(([appsData, notifData, favData]) => {
      setApplications(appsData.applications || []);
      setNotifications(notifData.notifications || []);
      
      const apps = appsData.applications || [];
      setStats({
        totalApplications: apps.length,
        pendingApplications: apps.filter((a: any) => 
          ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW'].includes(a.status)
        ).length,
        acceptedApplications: apps.filter((a: any) => a.status === 'ACCEPTED').length,
        favorites: favData.favorites?.length || 0,
      });
      setLoading(false);
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'UNDER_REVIEW':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient font-display">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 text-lg">Track your applications and manage your study abroad journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="premium-card p-6 group hover:shadow-premium-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Applications</p>
                <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stats.totalApplications}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="premium-card p-6 group hover:shadow-premium-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Pending</p>
                <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">{stats.pendingApplications}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="premium-card p-6 group hover:shadow-premium-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Accepted</p>
                <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">{stats.acceptedApplications}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="premium-card p-6 group hover:shadow-premium-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Favorites</p>
                <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">{stats.favorites}</p>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Applications */}
        <div className="md:col-span-2">
          <div className="premium-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">My Applications</h2>
              <Link
                href="/dashboard/applications/new"
                className="premium-button-primary px-5 py-2.5 text-sm"
              >
                New Application
              </Link>
            </div>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-4 text-lg">No applications yet</p>
                <Link
                  href="/dashboard/applications/new"
                  className="premium-button-primary inline-block"
                >
                  Start your first application →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 5).map((app: any) => (
                  <Link
                    key={app.id}
                    href={`/dashboard/applications/${app.id}`}
                    className="block premium-card p-5 hover:shadow-premium-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">{app.university.name}</h3>
                        <p className="text-gray-600 mb-2">{app.program.name} - {app.program.degree}</p>
                        <p className="text-sm text-gray-500">
                          Applied: {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(app.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {applications.length > 5 && (
                  <Link
                    href="/dashboard/applications"
                    className="block text-center text-blue-600 hover:text-blue-700 font-semibold pt-4"
                  >
                    View all applications →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="premium-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-display">Notifications</h2>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notif: any) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-xl transition-all ${!notif.read ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <p className="font-semibold text-sm mb-1">{notif.title}</p>
                  <p className="text-xs text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {notifications.length > 5 && (
                <Link
                  href="/dashboard/notifications"
                  className="block text-center text-blue-600 hover:text-blue-700 text-sm font-semibold pt-2"
                >
                  View all →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 premium-card p-6">
        <h2 className="text-2xl font-bold mb-6 font-display">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link
            href="/universities"
            className="premium-card p-6 text-center group hover:shadow-premium-glow transition-all"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition">Browse Universities</p>
          </Link>
          <Link
            href="/scholarships"
            className="premium-card p-6 text-center group hover:shadow-premium-glow transition-all"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-gray-900 group-hover:text-green-600 transition">Find Scholarships</p>
          </Link>
          <Link
            href="/dashboard/favorites"
            className="premium-card p-6 text-center group hover:shadow-premium-glow transition-all"
          >
            <div className="bg-gradient-to-br from-red-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-gray-900 group-hover:text-red-600 transition">My Favorites</p>
          </Link>
          <Link
            href="/dashboard/documents"
            className="premium-card p-6 text-center group hover:shadow-premium-glow transition-all"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition">Documents</p>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

