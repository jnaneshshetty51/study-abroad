import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-bold mb-4 font-display bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Study Abroad
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for global education opportunities. Premium consultancy services for your study abroad journey.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg text-white">Services</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/services/country-selection" className="hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Country Selection
                </Link>
              </li>
              <li>
                <Link href="/services/visa-assistance" className="hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Visa Assistance
                </Link>
              </li>
              <li>
                <Link href="/services/admission-support" className="hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Admission Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg text-white">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/universities" className="hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Universities
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg text-white">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✉</span>
                <div>
                  <p>info@studyabroad.com</p>
                  <p>support@studyabroad.com</p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">📞</span>
                <p>+1 (555) 123-4567</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Study Abroad Consultancy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

