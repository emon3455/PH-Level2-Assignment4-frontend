import { useState } from "react";
import {
  Menu,
  X,
  Book,
  Plus,
  FileText,
  Search,
  Bell,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetBorrowSummaryQuery } from "../redux/features/borrow/borrowApiSlice";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center px-3 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Badge = ({ children, className = "", ...props }) => (
  <span
    className={`inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold ${className}`}
    {...props}
  >
    {children}
  </span>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isLoading } = useGetBorrowSummaryQuery();

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LibraryHub
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Digital Library</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/books">
              <Button className="bg-transparent hover:bg-blue-50 hover:text-blue-600">
                <Book className="h-4 w-4 mr-1" />
                <span>All Books</span>
              </Button>
            </Link>
            <Link to="/create-book">
              <Button className="bg-transparent hover:bg-green-50 hover:text-green-600">
                <Plus className="h-4 w-4 mr-1" />
                <span>Add Book</span>
              </Button>
            </Link>
            <Link to="/borrow-summary">
              <Button className="bg-transparent hover:bg-purple-50 hover:text-purple-600 relative">
                <FileText className="h-4 w-4 mr-1" />
                <span>Borrow Summary</span>
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0">
                  {isLoading ? 0 : data?.length}
                </Badge>
              </Button>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-3">
            <Button className="bg-transparent relative hover:bg-gray-100">
              <Search className="h-4 w-4" />
            </Button>
            <Button className="bg-transparent relative hover:bg-gray-100">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0">2</Badge>
            </Button>
            <Button className="bg-transparent hover:bg-gray-100">
              <User className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button className="bg-transparent" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 bg-white">
            <Link to="/books" className="block">
              <Button className="w-full justify-start hover:bg-blue-50 hover:text-blue-600">
                <Book className="h-4 w-4 mr-1" />
                <span>All Books</span>
              </Button>
            </Link>
            <Link to="/create-book" className="block">
              <Button className="w-full justify-start hover:bg-green-50 hover:text-green-600">
                <Plus className="h-4 w-4 mr-1" />
                <span>Add Book</span>
              </Button>
            </Link>
            <Link to="/borrow-summary" className="block">
              <Button className="w-full justify-start hover:bg-purple-50 hover:text-purple-600 relative">
                <FileText className="h-4 w-4 mr-1" />
                <span>Borrow Summary</span>
                <Badge className="ml-auto h-5 w-5 p-0">{data?.length}</Badge>
              </Button>
            </Link>
            <div className="border-t border-gray-200 pt-4 mt-4 flex space-x-2">
              <Button className="flex-1 hover:bg-gray-100">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button className="flex-1 relative hover:bg-gray-100">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge className="ml-1 h-4 w-4 p-0">2</Badge>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
