import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Book,
  User,
  Tag,
  Hash,
  FileText,
  Copy,
  Save,
  ArrowLeft,
  AlertCircle,
  Edit,
  CheckCircle,
} from "lucide-react";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../redux/features/books/bookApiSlice";

const genres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
  "MYSTERY",
  "ROMANCE",
  "THRILLER",
  "CHILDREN",
];

const EditBookPage = () => {
  const { id } = useParams();
  const { data: book, isLoading: isBookLoading } = useGetBookByIdQuery(id || "");
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
  if (book && Object.keys(book).length > 0) {
    setForm({
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "",
      isbn: book.isbn || "",
      description: book.description || "",
      copies: book.copies || 1,
    });
  }
}, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "copies" ? Number(value) : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleGenreChange = (e) => {
    setForm({ ...form, genre: e.target.value });
    if (errors.genre) setErrors({ ...errors, genre: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.genre) newErrors.genre = "Genre is required";
    if (!form.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (form.copies < 1) newErrors.copies = "Copies must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await updateBook({ id, data: form });
      setShowSuccess(true);
      setTimeout(() => navigate("/books"), 1500);
    } catch (error) {
      alert("Error updating book.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isBookLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center bg-white rounded-xl shadow-xl p-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Updated Successfully!</h3>
          <p className="text-gray-600 mb-4">"{form.title}" has been updated in your library.</p>
          <div className="animate-pulse text-sm text-gray-500">Redirecting to books page...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link
            to="/books"
            className="mb-4 inline-flex items-center text-blue-700 hover:text-blue-900 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Edit className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Edit Book</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Update the book information below to keep your library current and accurate.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <Book className="h-4 w-4 mr-2 text-blue-600" />
                  Book Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  className={`h-12 w-full rounded border px-3 focus:outline-none ${
                    errors.title
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.title && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.title}
                  </div>
                )}
              </div>

              {/* Author Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <User className="h-4 w-4 mr-2 text-green-600" />
                  Author *
                </label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className={`h-12 w-full rounded border px-3 focus:outline-none ${
                    errors.author
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.author && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.author}
                  </div>
                )}
              </div>

              {/* Genre Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <Tag className="h-4 w-4 mr-2 text-purple-600" />
                  Genre *
                </label>
                <select
                  name="genre"
                  value={form.genre}
                  onChange={handleGenreChange}
                  className={`h-12 w-full rounded border px-3 focus:outline-none ${
                    errors.genre
                      ? "border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                >
                  <option value="">Select a genre</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g.replace("_", " ")}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.genre}
                  </div>
                )}
              </div>

              {/* ISBN Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <Hash className="h-4 w-4 mr-2 text-orange-600" />
                  ISBN *
                </label>
                <input
                  name="isbn"
                  value={form.isbn}
                  onChange={handleChange}
                  placeholder="Enter ISBN number"
                  className={`h-12 w-full rounded border px-3 focus:outline-none ${
                    errors.isbn
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.isbn && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.isbn}
                  </div>
                )}
              </div>

              {/* Copies Field */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <Copy className="h-4 w-4 mr-2 text-indigo-600" />
                  Number of Copies *
                </label>
                <input
                  name="copies"
                  type="number"
                  min="1"
                  value={form.copies}
                  onChange={handleChange}
                  placeholder="Enter number of copies"
                  className={`h-12 w-full max-w-xs rounded border px-3 focus:outline-none ${
                    errors.copies
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.copies && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.copies}
                  </div>
                )}
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                <FileText className="h-4 w-4 mr-2 text-teal-600" />
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="Enter book description, summary, or key details..."
                className={`w-full rounded border px-3 py-2 resize-none focus:outline-none ${
                  errors.description
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
              {errors.description && (
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </div>
              )}
              <div className="text-xs text-gray-500">{form?.description?.length}/500 characters</div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Book...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg shadow p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Edit className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Editing Guidelines</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Ensure all information is accurate and up-to-date</li>
                <li>• ISBN changes may affect catalog integration</li>
                <li>• Reducing copies below current loans may cause conflicts</li>
                <li>• Genre changes help with better book categorization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;
