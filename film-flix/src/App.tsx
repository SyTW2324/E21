import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound  from './pages/NotFound';
import SingUP from './pages/SignUp';

function App() {
  return (
    <div className="App h-full bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/movies" element={<h1>Movie Details</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<SingUP />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
