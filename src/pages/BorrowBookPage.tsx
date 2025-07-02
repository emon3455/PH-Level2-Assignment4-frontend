import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBorrowBookMutation } from '../redux/features/borrow/borrowApiSlice';

const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    quantity: 1,
    dueDate: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'quantity' ? Number(value) : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await borrowBook({ book: bookId!, ...form });
    navigate('/borrow-summary');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="input" />
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="input" />
        <button type="submit" className="bg-purple-500 text-white px-4 py-2">Borrow</button>
      </form>
    </div>
  );
};

export default BorrowBookPage;
