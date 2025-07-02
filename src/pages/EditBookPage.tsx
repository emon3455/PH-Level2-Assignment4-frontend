import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../redux/features/books/bookApiSlice';

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book } = useGetBookByIdQuery(id!);
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setForm(book as any);
    }
  }, [book]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'copies' ? Number(value) : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateBook({ id: id!, data: form });
    navigate('/books');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input name="title" value={form.title} onChange={handleChange} className="input" />
        <input name="author" value={form.author} onChange={handleChange} className="input" />
        <input name="genre" value={form.genre} onChange={handleChange} className="input" />
        <input name="isbn" value={form.isbn} onChange={handleChange} className="input" />
        <textarea name="description" value={form.description} onChange={handleChange} className="input" />
        <input type="number" name="copies" value={form.copies} onChange={handleChange} className="input" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;
