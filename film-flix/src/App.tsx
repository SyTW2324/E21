import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound  from './pages/NotFound';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient ({
    link: new HttpLink({
        uri: 'http://localhost:4000'
    }),
    cache: new InMemoryCache()
})

function App() {
  return (
    <div className="App h-full bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/movies" element={<h1>Movie Details</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
