import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/Library1/Books';
import SingleBook from './components/Library1/SingleBook';
import Account from './components/User/Account';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Navigation from './components/Navigation/Navigations';
import LogOut from './components/User/LogOut';

function App() {
  return (
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<SingleBook />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </div>
  );
}

export default App;