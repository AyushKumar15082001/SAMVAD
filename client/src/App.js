import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';
import AuthLayout from "./components/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* not found page */}
        {/* <Route path="*" element={<h1>Not found</h1>} /> */}
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
