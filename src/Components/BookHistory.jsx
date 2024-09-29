import React, { useState } from 'react';
import axios from 'axios';

const BookHistory = () => {
  const [bookName, setBookName] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentlyIssued, setCurrentlyIssued] = useState(null);
  const [error, setError] = useState(null);
  const [totalRent, setTotalRent] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTransactionHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/transactions/bookhistory', { bookName: bookName.trim() });
      setTransactions(response.data.transactions);
      setTotalCount(response.data.totalCount);
      setCurrentlyIssued(response.data.currentlyIssued);
      setTotalRent(response.data.totalRent);
    } catch (err) {
      setError('Error fetching transaction history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Book History</h1>
      <div className=" mb-4">
        <input
          type="text"
          placeholder="Enter Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchTransactionHistory}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Get History
        </button>
      </div>

      {loading && <div className="text-center text-blue-600">Loading...</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}

      <div className="mt-4">
        {totalCount > 0 && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
            <p className="font-semibold">Total Issued: {totalCount}</p>
            <p className="font-semibold">Total Rent: {totalRent}</p>
            {currentlyIssued ? (
              <p>Currently Issued By: <strong>{currentlyIssued.userName}</strong></p>
            ) : (
              <p>Status: <strong>Not Issued at the moment</strong></p>
            )}
          </div>
        )}

        <div className="flex mt-4">
          {transactions.length > 0 && (
            <div className="flex-1 mr-2 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">User Name</th>
                    <th className="border border-gray-300 px-4 py-2">Issue Date</th>
                    <th className="border border-gray-300 px-4 py-2">Return Date</th>
                    <th className="border border-gray-300 px-4 py-2">Total Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-gray-100 transition">
                      <td className="border border-gray-300 px-4 py-2">{transaction.userName}</td>
                      <td className="border border-gray-300 px-4 py-2">{new Date(transaction.issueDate).toLocaleDateString()}</td>
                      <td className="border border-gray-300 px-4 py-2">{transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                      <td className="border border-gray-300 px-4 py-2">{transaction.totalRent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {currentlyIssued && (
            <div className="flex-1 ml-2 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">Currently Issued</h2>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Book Name</th>
                    <th className="border border-gray-300 px-4 py-2">User Name</th>
                    <th className="border border-gray-300 px-4 py-2">Issue Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-2">{currentlyIssued.bookName}</td>
                    <td className="border border-gray-300 px-4 py-2">{currentlyIssued.userName}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(currentlyIssued.issueDate).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookHistory;
