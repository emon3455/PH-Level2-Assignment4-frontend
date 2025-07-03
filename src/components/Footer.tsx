import {
  Book,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  // You can add your newsletter logic here

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LibraryHub
                </h3>
                <p className="text-xs text-gray-400">Digital Library</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your gateway to knowledge and adventure. Discover, manage, and explore thousands of books in our
              comprehensive digital library platform.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-full hover:bg-sky-500 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/books"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group"
                >
                  <Book className="h-3 w-3 mr-2 group-hover:text-blue-400" />
                  Browse Books
                </Link>
              </li>
              <li>
                <Link
                  to="/create-book"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:text-green-400" />
                  Add New Book
                </Link>
              </li>
              <li>
                <Link
                  to="/borrow-summary"
                  className="text-gray-300 hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:text-purple-400" />
                  Borrow Summary
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:text-blue-400" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:text-blue-400" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Library Street
                  <br />
                  Knowledge City, KC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@libraryhub.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest book recommendations and library updates.
            </p>
            <form
              className="space-y-2"
              onSubmit={e => {
                e.preventDefault();
                // Add your subscribe logic here
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 rounded bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2024 LibraryHub. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for book lovers everywhere.</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
