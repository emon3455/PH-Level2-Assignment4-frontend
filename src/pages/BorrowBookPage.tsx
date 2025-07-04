"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Hash,
  AlertCircle,
  ArrowLeft,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useBorrowBookMutation } from "../redux/features/borrow/borrowApiSlice";
import { useGetBookByIdQuery } from "../redux/features/books/bookApiSlice";
import { toast } from "react-toastify";

const BorrowBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { isLoading: getBookLoading, data: bookData } = useGetBookByIdQuery(bookId!);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const [form, setForm] = useState({
    quantity: 1,
    dueDate: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.quantity || form.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    } else if (form.quantity > (bookData?.copies ?? 0)) {
      newErrors.quantity = `Only ${bookData?.copies ?? 0} copies available`;
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const selectedDate = new Date(form.dueDate);
      const today = new Date();
      if (selectedDate <= today) {
        newErrors.dueDate = "Due date must be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await borrowBook({ book: bookId!, ...form }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (error) {
      toast.error("Failed to borrow book. Please try again.");
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (getBookLoading || !bookData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/books")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Book Info */}
          <div className="bg-white rounded-xl p-6 shadow border">
            <h2 className="text-xl font-bold mb-4">Book Information</h2>
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <BookOpen className="text-indigo-600 w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold">{bookData.title}</p>
                  <p className="text-sm text-gray-600">by {bookData.author}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Hash className="text-indigo-600 w-5 h-5" />
                <p className="text-sm text-gray-700">ISBN: {bookData.isbn}</p>
              </div>
              <div className="flex gap-2 items-center">
                <CheckCircle className="text-green-600 w-5 h-5" />
                <p className="text-sm font-semibold text-green-700">
                  Available: {bookData.copies}
                </p>
              </div>
            </div>
          </div>

          {/* Borrow Form */}
          <div className="bg-white rounded-xl p-6 shadow border">
            <h2 className="text-xl font-bold mb-4">Borrow Book</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min={1}
                  max={bookData.copies}
                  value={form.quantity}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded-lg ${
                    errors.quantity ? "border-red-400 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.quantity && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.quantity}
                  </p>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  min={getTomorrowDate()}
                  value={form.dueDate}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded-lg ${
                    errors.dueDate ? "border-red-400 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.dueDate && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.dueDate}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    Borrow Book
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowBookPage;
