import React from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Header from './components/header/Header';
import Profile from './pages/profile/Profile';
import UsersPage from './pages/users/Users';
import Stream from './pages/stream/Stream';
import Leaders from './pages/leaders/Leaders';
import Navbar from './components/navbar/Navbar';
import useLoadAuthUser from './hooks/useLoadAuthUser';
import Notification from './components/notification/Notification';
import useListenMessages from './hooks/useListenMessages';

function App() {
  useListenMessages()
  
  const { authUser } = useAuthContext();
  useLoadAuthUser(authUser)
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Профиль';
      case '/profile':
        return 'Профиль';
      case '/messenger':
        return 'Месенджер';
      case '/users':
        return 'Пользователи';
      case '/stream':
        return 'Видео-эфир';
      case '/leaders':
        return 'Лидеры';
      default:
        return '';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {authUser && <Navbar />}
      <div className="flex flex-col flex-1 overflow-y-scroll">
        {authUser && <Header title={getTitle()} />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={authUser ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/messenger/:userId?" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/profile/:profileId?" element={authUser ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/profile" />} />
            <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/profile" />} />
            <Route path="/users" element={authUser ? <UsersPage /> : <Navigate to="/login" />} />
            <Route path="/leaders" element={<Leaders />} />
          </Routes>
        </div>
        <Toaster />
        <Notification />
      </div>
    </div>
  );
}

export default App;