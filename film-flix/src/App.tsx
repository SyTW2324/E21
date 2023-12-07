import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound  from './pages/notFound/NotFound';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Content from './pages/content/content';
import ContentInfo from './pages/contentInfo/contentInfo';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Content type={'movies'} />} />
          <Route path="/content-info/:contentId" element={<ContentInfo />} />
          <Route path="/series" element={<Content type={'series'} />} />
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
