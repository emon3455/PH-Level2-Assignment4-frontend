import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookListPage from './pages/BookListPage';
import CreateBookPage from './pages/CreateBookPage';
import EditBookPage from './pages/EditBookPage';
import BorrowBookPage from './pages/BorrowBookPage';
import BorrowSummaryPage from './pages/BorrowSummaryPage';
import { ToastContainer } from 'react-toastify';
import BookDetailsPage from './pages/BookDetailsPage';

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/create-book" element={<CreateBookPage />} />
          <Route path="/edit-book/:id" element={<EditBookPage />} />
          <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
          <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
        </Routes>
      </div>
      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
