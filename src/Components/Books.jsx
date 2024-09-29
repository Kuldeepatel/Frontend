import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/getallbook');
        setBooks(response.data);
      } catch (err) {
        setError('Error fetching books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">All Books</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Book Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Rent Per Day</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{book.bookName}</td>
              <td className="border border-gray-300 px-4 py-2">{book.category}</td>
              <td className="border border-gray-300 px-4 py-2">{book.rentPerDay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckAllBooks;
