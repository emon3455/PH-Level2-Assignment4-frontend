import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useGetBooksQuery } from '../redux/features/books/bookApiSlice';

const BookListPage = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetBooksQuery({ page, limit });
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();
  console.log("data: ",data);
  

  if (isLoading) return <p>Loading...</p>;

  const totalPages = Math.ceil(data?.meta?.total as any / limit);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Books</h2>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Copies</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.books?.map((book) => (
            <tr key={book._id} className="text-center border-t">
              <td className="p-2">{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.isbn}</td>
              <td>{book.copies}</td>
              <td>{book.available ? 'Yes' : 'No'}</td>
              <td className="flex gap-2 justify-center mt-1">
                <button onClick={() => navigate(`/edit-book/${book._id}`)} className="text-blue-600">Edit</button>
                <button onClick={() => deleteBook(book._id)} className="text-red-500">Delete</button>
                <button onClick={() => navigate(`/borrow/${book._id}`)} className="text-green-600">Borrow</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookListPage;
