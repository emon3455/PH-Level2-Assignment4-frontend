import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../redux/features/books/bookApiSlice";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import { genres } from "../constant/genres";
import Swal from "sweetalert2";

const BookListPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading } = useGetBooksQuery({
    page,
    limit,
    searchTerm: debouncedSearchTerm,
    filter,
  });

  const totalPages = Math.ceil((data?.meta?.total || 1) / limit);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You want to Delete This Book, This action is not revertable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBook(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your Book has been deleted.",
          icon: "success"
        });
      }
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Banner / Hero */}
      <Hero bookCount={data?.meta?.total} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 w-full"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </span>
            </div>
            <div className="relative w-full lg:w-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full lg:w-48 h-12 pl-10 border border-gray-200 rounded-lg"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre.replace("_", " ")}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Filter className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
              {data?.books?.length || 0} of {data?.meta?.total || 0} books
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.books?.map((book) => (
              <div
                key={book._id}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden rounded-xl flex flex-col"
              >
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
                    </div>
                    <span className={`ml-2 px-3 py-1 text-xs rounded-full ${book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {book.available ? "Available" : "Out of Stock"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{book.genre.replace("_", " ")}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>ISBN: {book.isbn}</div>
                    <div>Copies: {book.copies}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex gap-2 p-5">
                  <button
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    title="Book Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    className="flex-1 border border-blue-300 text-blue-600 rounded-lg px-3 py-2 hover:bg-blue-50 transition flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="flex-1 border border-red-300 text-red-600 rounded-lg px-3 py-2 hover:bg-red-50 transition flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/borrow/${book._id}`)}
                    disabled={!book.available}
                    className={`flex-1 rounded-lg px-3 py-2 flex items-center justify-center gap-1 ${book.available ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Borrow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default BookListPage;
