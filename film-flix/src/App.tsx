import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound  from './pages/NotFound';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App h-full bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/movies" element={<h1>Movie Details</h1>} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
