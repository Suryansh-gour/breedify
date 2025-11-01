import { Heart, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import logo from '../assets/breedify.png';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src={logo} 
                  alt="Breedify Logo" 
                  className="w-10 h-10 rounded-lg"
                />
                <span className="text-2xl font-bold">Breedify</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI for Indigenous Breeds
              </p>
              <p className="text-gray-500 text-sm">
                Preserving India's livestock heritage through technology
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-green-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#breeds" className="text-gray-400 hover:text-green-400 transition-colors">
                    Breeds
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-green-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-green-400 transition-colors">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@breedify.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Us</span>
                </a>
                <div className="flex gap-4 mt-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 Breedify. All rights reserved.
              </p>
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                Made with <Heart className="w-4 h-4 text-red-500" /> by Sachi Mishra
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
