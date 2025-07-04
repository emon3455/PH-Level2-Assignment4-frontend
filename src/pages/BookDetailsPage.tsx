import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Hash,
  Tag,
  FileText,
  BookMarked,
  Clock,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteBookMutation, useGetBookByIdQuery } from "../redux/features/books/bookApiSlice";
import Swal from "sweetalert2";

const BookDetailsPage = () => {
  // Sample book data based on your structure
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: book } = useGetBookByIdQuery(id!);
  const [deleteBook] = useDeleteBookMutation();

  const formatGenre = (genre: string) => {
    return genre
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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
        navigate("/")
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-medium">Loading Books...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Library</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-3 leading-tight">{book.title}</h1>
                  <p className="text-xl text-blue-100 mb-4">by {book.author}</p>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {formatGenre(book.genre)}
                    </span>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${book.available
                        ? "bg-green-500/20 text-green-100 border border-green-400/30"
                        : "bg-red-500/20 text-red-100 border border-red-400/30"
                        }`}
                    >
                      {book.available ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {book.available ? "Available" : "Out of Stock"}
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">About This Book</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-6 rounded-xl border-l-4 border-indigo-500">
                {book.description}
              </p>
            </div>

            {/* Book Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Hash className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">ISBN</p>
                    <p className="text-lg font-semibold text-gray-800">{book.isbn}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Tag className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Genre</p>
                    <p className="text-lg font-semibold text-gray-800">{formatGenre(book.genre)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BookMarked className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Available Copies</p>
                    <p className="text-lg font-semibold text-gray-800">{book.copies}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Added to Library</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(book.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Last updated on {formatDate(book.updatedAt)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled={!book?.available}
                onClick={() => navigate(`/borrow/${book?._id}`)}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${book.available
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <BookOpen className="w-6 h-6" />
                {book?.available ? "Borrow This Book" : "Currently Unavailable"}
              </button>

              <button onClick={() => navigate(`/edit-book/${book?._id}`)} className="flex items-center justify-center gap-3 py-4 px-6 border-2 border-indigo-300 text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all duration-200 hover:border-indigo-400">
                <Edit className="w-6 h-6" />
                Edit Book
              </button>

              <button onClick={() => handleDelete(book._id)} className="flex items-center justify-center gap-3 py-4 px-6 border-2 border-red-300 text-red-600 rounded-xl font-semibold text-lg hover:bg-red-50 transition-all duration-200 hover:border-red-400">
                <Trash2 className="w-6 h-6" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsPage