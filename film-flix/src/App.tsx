import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound  from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <h1>FilmFlix</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/movies" element={<h1>Movie Details</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Registration</h1>} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
