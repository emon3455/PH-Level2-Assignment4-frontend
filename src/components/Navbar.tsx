import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6">
      <Link to="/books" className="hover:underline">All Books</Link>
      <Link to="/create-book" className="hover:underline">Add Book</Link>
      <Link to="/borrow-summary" className="hover:underline">Borrow Summary</Link>
    </nav>
  );
};

export default Navbar;
