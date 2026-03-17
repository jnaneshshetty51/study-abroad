import Link from 'next/link';
import { Globe, FileCheck, GraduationCap, Award, Calculator, Search, BarChart3, Heart, Sparkles, Star, Quote, MapPin, Users, CheckCircle, Clock, BookOpen, HelpCircle, Play, TrendingUp, Shield, Trophy, Zap, Target, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function Home() {
  const services = [
    {
      icon: Globe,
      title: 'Country Selection',
      description: 'Expert guidance to choose the perfect country for your study abroad journey',
      href: '/services/country-selection',
      color: 'bg-blue-500',
    },
    {
      icon: FileCheck,
      title: 'Visa Assistance',
      description: 'Complete visa application support with high success rates',
      href: '/services/visa-assistance',
      color: 'bg-green-500',
    },
    {
      icon: GraduationCap,
      title: 'Admission Support',
      description: 'End-to-end admission support for top universities worldwide',
      href: '/services/admission-support',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
            alt="Students studying abroad"
            width={1920}
            height={1080}
            className="w-full h-full"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Premium Study Abroad Consultancy</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight animate-fade-in">
            Your Gateway to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
              Global Education
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100 leading-relaxed animate-slide-up">
            Expert study abroad consultancy services with partnerships with top universities
            offering high commission rates. Transform your future with world-class education.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-scale-in">
            <Link
              href="/services"
              className="premium-button-primary px-8 py-4 text-lg shadow-2xl"
            >
              Explore Our Services
            </Link>
            <Link
              href="/search"
              className="premium-button-secondary px-8 py-4 text-lg bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            >
              Search Programs
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-gray-200">Successful Applications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-200">Partner Universities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%+</div>
              <div className="text-gray-200">Success Rate</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Our Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your study abroad journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="premium-card p-8 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${service.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <Icon className="text-white w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-6 text-blue-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                    Learn More <span className="ml-2">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4">High Commission Universities</h3>
              <p className="text-gray-600 mb-4">
                We partner with universities offering competitive commission rates,
                ensuring you get the best value for your investment.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Expert Guidance</h3>
              <p className="text-gray-600 mb-4">
                Our experienced consultants provide personalized guidance throughout
                your study abroad journey.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">End-to-End Support</h3>
              <p className="text-gray-600 mb-4">
                From country selection to visa approval, we handle every step of
                the process.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Proven Track Record</h3>
              <p className="text-gray-600 mb-4">
                Thousands of successful applications and satisfied students worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Powerful Tools & Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make informed decisions about your education
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, title: 'Advanced Search', desc: 'Find programs by country, degree, tuition, and more', href: '/search', color: 'from-blue-500 to-blue-600' },
              { icon: Award, title: 'Scholarship Finder', desc: 'Discover funding opportunities worldwide', href: '/scholarships', color: 'from-yellow-500 to-orange-500' },
              { icon: Calculator, title: 'Cost Calculator', desc: 'Estimate your study abroad expenses', href: '/calculator', color: 'from-green-500 to-emerald-600' },
              { icon: BarChart3, title: 'Compare Programs', desc: 'Side-by-side program comparison', href: '/compare', color: 'from-purple-500 to-pink-600' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="premium-card p-8 text-center group relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
                  <div className={`relative bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <Icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 1: Testimonials/Reviews */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from students who achieved their study abroad dreams
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', country: 'USA', university: 'Harvard University', rating: 5, text: 'The team made my application process seamless. Their expertise and support were invaluable in getting me into my dream university.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
              { name: 'Ahmed Hassan', country: 'Egypt', university: 'MIT', rating: 5, text: 'Outstanding service from start to finish. They helped me secure a scholarship and navigate the visa process with ease.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
              { name: 'Priya Patel', country: 'India', university: 'Stanford University', rating: 5, text: 'Professional, reliable, and incredibly helpful. I couldn&apos;t have done it without their guidance and support.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
            ].map((testimonial, index) => (
              <div key={index} className="premium-card p-8 group hover:shadow-premium-glow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-500 mb-4 opacity-50" />
                <p className="text-gray-700 mb-6 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                    objectFit="cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.university}</p>
                    <p className="text-xs text-gray-500">{testimonial.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Success Stories */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Inspiring journeys of students who transformed their lives
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Maria Garcia', from: 'Spain', to: 'Oxford University', achievement: 'Full Scholarship', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop', story: 'Secured a full scholarship to study at Oxford University with our comprehensive support.' },
              { name: 'David Kim', from: 'South Korea', to: 'Cambridge University', achievement: 'Visa Approved', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop', story: 'Successfully navigated the complex visa process and now studying at Cambridge.' },
            ].map((story, index) => (
              <div key={index} className="premium-card overflow-hidden group">
                <div className="relative h-64">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.name}
                    width={600}
                    height={400}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="premium-badge-gold mb-2">{story.achievement}</div>
                    <h3 className="text-2xl font-bold mb-1">{story.name}</h3>
                    <p className="text-sm opacity-90">{story.from} → {story.to}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Popular Destinations */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Popular Study Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore top countries where students love to study
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'United States', students: '1.1M+', universities: '4,000+', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop', flag: '🇺🇸' },
              { name: 'United Kingdom', students: '500K+', universities: '150+', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', flag: '🇬🇧' },
              { name: 'Canada', students: '640K+', universities: '200+', image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop', flag: '🇨🇦' },
              { name: 'Australia', students: '700K+', universities: '43+', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', flag: '🇦🇺' },
            ].map((country, index) => (
              <Link key={index} href="/universities" className="premium-card overflow-hidden group hover:shadow-premium-glow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={country.image}
                    alt={country.name}
                    width={400}
                    height={300}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    objectFit="cover"
                  />
                  <div className="absolute top-4 right-4 text-4xl">{country.flag}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition">{country.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><Users className="w-4 h-4 inline mr-2" />{country.students} Students</p>
                    <p><GraduationCap className="w-4 h-4 inline mr-2" />{country.universities} Universities</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: University Partners Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Our Partner Universities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Top-ranked institutions worldwide offering exclusive opportunities
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Harvard University', 'MIT', 'Stanford University', 'Oxford University',
              'Cambridge University', 'Yale University', 'Princeton University', 'Columbia University'
            ].map((university, index) => (
              <div key={index} className="premium-card p-6 text-center group hover:shadow-premium-glow">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-gradient transition">{university}</h3>
                <div className="mt-2 flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">Top Ranked</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/universities" className="premium-button-primary inline-flex items-center">
              View All Universities <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Process/Timeline */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Our Simple Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From consultation to enrollment in 5 easy steps
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { step: '1', title: 'Free Consultation', desc: 'Discuss your goals and preferences with our expert consultants', icon: Users },
                { step: '2', title: 'University Selection', desc: 'We help you find the perfect universities matching your profile', icon: Search },
                { step: '3', title: 'Application Support', desc: 'Complete assistance with applications, essays, and documents', icon: FileCheck },
                { step: '4', title: 'Visa Processing', desc: 'Expert guidance through visa application and interview preparation', icon: Shield },
                { step: '5', title: 'Pre-Departure Support', desc: 'Final preparations and orientation before you leave', icon: CheckCircle },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-6 premium-card p-6 group hover:shadow-premium-glow">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Icon className="w-6 h-6 text-blue-600 mr-2" />
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gradient transition">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Statistics/Achievements */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 font-display">Our Achievements</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Numbers that speak for our excellence and commitment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Successful Applications', icon: Trophy, color: 'from-yellow-400 to-orange-500' },
              { number: '50+', label: 'Partner Universities', icon: GraduationCap, color: 'from-blue-400 to-cyan-500' },
              { number: '95%+', label: 'Visa Success Rate', icon: Shield, color: 'from-green-400 to-emerald-500' },
              { number: '150+', label: 'Countries Served', icon: Globe, color: 'from-purple-400 to-pink-500' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`bg-gradient-to-br ${stat.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 7: Blog Highlights */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Latest Insights & Tips</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert advice and updates to guide your study abroad journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Top 10 Scholarships for International Students', category: 'Scholarships', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop', date: '2 days ago' },
              { title: 'Visa Application Guide: Step-by-Step Process', category: 'Visa Guide', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop', date: '5 days ago' },
              { title: 'Best Countries for STEM Programs in 2024', category: 'Country Guide', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', date: '1 week ago' },
            ].map((post, index) => (
              <Link key={index} href="/blog" className="premium-card overflow-hidden group hover:shadow-premium-glow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    objectFit="cover"
                  />
                  <div className="absolute top-4 left-4 premium-badge-primary">{post.category}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" /> {post.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog" className="premium-button-primary inline-flex items-center">
              Read More Articles <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about studying abroad
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'How long does the application process take?', a: 'Typically, the complete process takes 3-6 months, depending on the country and university. We guide you through each step to ensure timely submission.' },
              { q: 'Do you help with visa applications?', a: 'Yes! We provide comprehensive visa assistance including document preparation, application submission, and interview coaching with a 95%+ success rate.' },
              { q: 'What are your service fees?', a: 'We offer competitive pricing with transparent fee structures. Many of our services are commission-based through partner universities, reducing costs for students.' },
              { q: 'Can you help me find scholarships?', a: 'Absolutely! We maintain an extensive database of scholarships and help you identify and apply for funding opportunities that match your profile.' },
            ].map((faq, index) => (
              <div key={index} className="premium-card p-6">
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Video Testimonial Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Watch Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear directly from students about their study abroad experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2].map((item) => (
              <div key={item} className="premium-card overflow-hidden group relative">
                <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop`}
                    alt="Video testimonial"
                    width={800}
                    height={400}
                    className="w-full h-full opacity-50"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-16 h-16 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Student Success Story #{item}</h3>
                  <p className="text-gray-600">Watch how we helped this student achieve their dream of studying abroad</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Scholarship Highlights */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Featured Scholarships</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Exclusive funding opportunities for international students
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Full Tuition Scholarship', amount: '$50,000', university: 'Harvard University', deadline: 'March 15, 2024', type: 'Merit-based' },
              { title: 'International Excellence Award', amount: '$30,000', university: 'MIT', deadline: 'April 1, 2024', type: 'Need-based' },
              { title: 'Global Leaders Program', amount: '$25,000', university: 'Stanford University', deadline: 'March 30, 2024', type: 'Leadership' },
            ].map((scholarship, index) => (
              <div key={index} className="premium-card p-6 group hover:shadow-premium-glow">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-4 rounded-xl mb-4">
                  <Award className="w-8 h-8 mb-2" />
                  <div className="text-3xl font-bold">{scholarship.amount}</div>
                  <div className="text-sm opacity-90">{scholarship.type}</div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition">{scholarship.title}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" /> {scholarship.university}
                </p>
                <p className="text-sm text-gray-500 flex items-center mb-4">
                  <Clock className="w-4 h-4 mr-2" /> Deadline: {scholarship.deadline}
                </p>
                <Link href="/scholarships" className="text-blue-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                  Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/scholarships" className="premium-button-primary inline-flex items-center">
              Browse All Scholarships <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 11: Country Comparison */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Compare Study Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Make informed decisions with our comprehensive country comparison
            </p>
          </div>
          <div className="premium-card p-8 max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Country</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Avg. Tuition</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Living Cost</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Work Permit</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">PR Options</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { country: 'United States', tuition: '$25,000-$50,000', living: '$12,000-$18,000', work: 'Yes (OPT)', pr: 'Complex' },
                  { country: 'United Kingdom', tuition: '£15,000-£35,000', living: '£10,000-£15,000', work: 'Yes (20hrs)', pr: 'Available' },
                  { country: 'Canada', tuition: 'CAD $15,000-$30,000', living: 'CAD $10,000-$15,000', work: 'Yes (20hrs)', pr: 'Easier' },
                  { country: 'Australia', tuition: 'AUD $20,000-$45,000', living: 'AUD $15,000-$20,000', work: 'Yes (20hrs)', pr: 'Available' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 font-semibold text-gray-900">{row.country}</td>
                    <td className="py-4 px-4 text-gray-600">{row.tuition}</td>
                    <td className="py-4 px-4 text-gray-600">{row.living}</td>
                    <td className="py-4 px-4 text-gray-600">{row.work}</td>
                    <td className="py-4 px-4 text-gray-600">{row.pr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <Link href="/compare" className="premium-button-secondary inline-flex items-center">
              Detailed Comparison <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 12: Student Resources */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Student Resources</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Essential tools and guides to support your journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'Study Guides', desc: 'Comprehensive guides for exams and applications', color: 'from-blue-500 to-cyan-500' },
              { icon: Calculator, title: 'Cost Calculator', desc: 'Estimate your total study abroad expenses', color: 'from-green-500 to-emerald-500' },
              { icon: FileCheck, title: 'Document Checklist', desc: 'Never miss a document with our checklist', color: 'from-purple-500 to-pink-500' },
              { icon: Zap, title: 'Quick Tips', desc: 'Expert tips to ace your applications', color: 'from-yellow-500 to-orange-500' },
            ].map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="premium-card p-6 text-center group hover:shadow-premium-glow">
                  <div className={`bg-gradient-to-br ${resource.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gradient transition">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 13: Trust Indicators/Certifications */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient font-display">Trusted & Certified</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recognized by leading educational organizations worldwide
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'ISO Certified', desc: 'Quality management certified', icon: Shield, color: 'from-blue-500 to-blue-600' },
              { title: 'AIRC Member', desc: 'American International Recruitment Council', icon: Award, color: 'from-purple-500 to-purple-600' },
              { title: '10+ Years Experience', desc: 'Serving students since 2014', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
            ].map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="premium-card p-8 text-center group hover:shadow-premium-glow">
                  <div className={`bg-gradient-to-br ${cert.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition">{cert.title}</h3>
                  <p className="text-gray-600">{cert.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
            alt="Students"
            width={1920}
            height={1080}
            className="w-full h-full"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-purple-900/90 to-blue-900/95"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 text-white font-display">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-10 text-gray-100 max-w-2xl mx-auto">
            Join thousands of students who have transformed their futures with our premium consultancy services
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="premium-button-primary px-10 py-4 text-lg shadow-2xl"
            >
              Contact Us
            </Link>
            <Link
              href="/register"
              className="premium-button-secondary px-10 py-4 text-lg bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

