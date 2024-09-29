import React, { useState } from 'react';
import axios from 'axios';

const ReturnBook = () => {
  const [bookName, setBookName] = useState('');
  const [userName, setUserName] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); 

    try {

      const response = await axios.post('http://localhost:5000/api/transactions/return', {
        bookName,
        userName,
        returnDate,
      });

      
      if (response.data.message === 'User not found') {
        setMessage('Error: User not found. Please check the username and try again.');
      } else if (response.data.message === 'Book not found') {
        setMessage('Error: Book not found. Please check the book name and try again.');
      } else if (response.data.message === 'Book returned successfully') {
        setMessage('Success: Book return successfully.');
      } else {
        setMessage('Unexpected response received.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(`Error: ${error.response?.data.message}`);
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Return Book</h2>
        {message && (
          <p className={`text-center ${message.startsWith('Success') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bookName" className="block text-sm font-medium text-gray-700">
              Book Name
            </label>
            <input
              type="text"
              id="bookName"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Return Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnBook;
