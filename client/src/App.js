import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './component/login/Login';
import Register from './component/register/Register';
// import Home from './component/home/Home';
import Navbar from './component/nabBar/NavBar';
import JournalPage from './component/journal/journalPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token on initial load
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token validity (you can fetch a protected API or decode JWT on the client side)
      const isTokenValid = () => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.exp * 1000 > Date.now(); // Check if token is expired
        } catch (e) {
          return false;
        }
      };

      setIsLoggedIn(isTokenValid());
    }
  }, []);

  return (
    <>
      {/* Conditionally render Navbar */}
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      {/* Routes */}
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <JournalPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
