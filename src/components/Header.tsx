import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/breedify.png';

interface HeaderProps {
  onUploadClick: () => void;
}

export const Header = ({ onUploadClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Breedify Logo" 
              className="w-10 h-10 rounded-lg shadow-md object-cover"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Breedify
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={onUploadClick}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Upload Image
            </button>
            <button
              onClick={() => scrollToSection('breeds')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Breeds
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <nav className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              >
                Home
              </button>
              <button
                onClick={onUploadClick}
                className="text-left text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              >
                Upload Image
              </button>
              <button
                onClick={() => scrollToSection('breeds')}
                className="text-left text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              >
                Breeds
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
