import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookListPage from './pages/BookListPage';
import CreateBookPage from './pages/CreateBookPage';
import EditBookPage from './pages/EditBookPage';
import BorrowBookPage from './pages/BorrowBookPage';
import BorrowSummaryPage from './pages/BorrowSummaryPage';

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/create-book" element={<CreateBookPage />} />
          <Route path="/edit-book/:id" element={<EditBookPage />} />
          <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
          <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
