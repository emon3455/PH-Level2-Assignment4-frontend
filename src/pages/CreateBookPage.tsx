import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateBookMutation } from '../redux/features/books/bookApiSlice';

const CreateBookPage = () => {
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'copies' ? Number(value) : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createBook(form);
    navigate('/books');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="input" />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} className="input" />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} className="input" />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} className="input" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input" />
        <input type="number" name="copies" value={form.copies} onChange={handleChange} className="input" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Book</button>
      </form>
    </div>
  );
};

export default CreateBookPage;
