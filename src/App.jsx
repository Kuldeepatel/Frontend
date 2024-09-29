import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; 
import './App.css';
import Navbar from './Components/Navbar';
import Books from './Components/Books';
import AllUsers from './Components/AllUsers';
import BookHistory from './Components/BookHistory';
import IssueBook from './Components/IssueBook';
import ReturnBook from './Components/ReturnBook';
import UserHistory from './Components/UserHistory';
import DateRangeBookIssue from './Components/DateRangeBookIssue';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/history" element={<BookHistory />} />
        <Route path="/issue" element={<IssueBook />} />
        <Route path="/return" element={<ReturnBook />} />
        <Route path="/userhistory" element={<UserHistory />} />
        <Route path="/range" element={<DateRangeBookIssue />} />
      </Routes>
    </Router>
  );
}

export default App;
