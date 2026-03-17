import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center space-x-2 group ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition"></div>
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 font-display">StudyAbroad</span>
        <span className="text-xs text-gray-500 -mt-1">Premium Consultancy</span>
      </div>
    </Link>
  );
}

