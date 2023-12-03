import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound  from './pages/not-found/NotFound';
import SignUp from './pages/sign-up/SignUp';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Movies from './pages/movies/movies';

function App() {
  return (
    <div className="App h-full bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/profile" element={<Profile />} />
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
