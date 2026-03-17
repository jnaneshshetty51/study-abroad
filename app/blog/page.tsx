'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const url = category ? `/api/blog?category=${category}` : '/api/blog';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      });
  }, [category]);

  const categories = ['All', 'Study Tips', 'Visa Guide', 'Country Guide', 'University News', 'Success Stories'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient font-display">Study Abroad Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tips, and stories to guide your study abroad journey
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === 'All' ? '' : cat)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              (category === '' && cat === 'All') || category === cat
                ? 'premium-button-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 premium-card max-w-md mx-auto">
          <p className="text-gray-600 text-lg">No blog posts found</p>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {posts.find((p) => p.featured) && (
            <div className="mb-12">
              {(() => {
                const featured = posts.find((p) => p.featured);
                return (
                  <Link href={`/blog/${featured.slug}`} className="block group">
                    <div className="premium-card overflow-hidden">
                      <div className="md:flex">
                        {featured.coverImage && (
                          <div className="md:w-1/2 h-64 md:h-auto bg-gray-200 relative overflow-hidden">
                            <ImageWithFallback
                              src={featured.coverImage}
                              alt={featured.title}
                              width={800}
                              height={400}
                              className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                              objectFit="cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          </div>
                        )}
                        <div className="md:w-1/2 p-8 flex flex-col justify-center">
                          <span className="inline-block premium-badge-gold mb-4 w-fit">
                            ⭐ Featured
                          </span>
                          <h2 className="text-3xl font-bold mb-4 group-hover:text-gradient transition font-display">
                            {featured.title}
                          </h2>
                          {featured.excerpt && (
                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{featured.excerpt}</p>
                          )}
                          <div className="flex items-center text-gray-500 text-sm">
                            <div className="flex items-center mr-6">
                              <User className="w-4 h-4 mr-2 text-blue-600" />
                              <span className="font-medium">{featured.author?.name || 'Admin'}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                              <span>
                                {new Date(featured.publishedAt || featured.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })()}
            </div>
          )}

          {/* Regular Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts
              .filter((p) => !p.featured)
              .map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="premium-card overflow-hidden group"
                >
                  {post.coverImage && (
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <ImageWithFallback
                        src={post.coverImage}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-flex items-center premium-badge-primary mb-3">
                        <Tag className="w-3 h-3 mr-1" />
                        {post.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition line-clamp-2 font-display">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-gray-500 text-sm pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-purple-600" />
                        <span>
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
      </div>
    </div>
  );
}

