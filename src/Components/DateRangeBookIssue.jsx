import React, { useState } from 'react';
import axios from 'axios';

const BookIssuedInRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBooksIssuedInRange = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/transactions/date-range', {
        startDate,
        endDate,
      });
      setTransactions(response.data);
    } catch (err) {
      setError('Error fetching books issued in date range');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Books Issued in Date Range</h1>
      <div className="mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full mt-2"
        />
        <button
          onClick={fetchBooksIssuedInRange}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Books
        </button>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}

      {transactions.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Issued Books</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">User Name</th>
                <th className="border border-gray-300 px-4 py-2">Book Name</th>
                <th className="border border-gray-300 px-4 py-2">Issue Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{transaction.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{transaction.bookName}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(transaction.issueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <div className="text-center mt-4">No books issued in this date range.</div>
      )}
    </div>
  );
};

export default BookIssuedInRange;
