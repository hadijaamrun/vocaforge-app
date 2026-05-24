import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Navbar from './components/Navbar';
import './styles/global.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import EditProject from './pages/EditProject';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop /> 
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/home" element={
            <PrivateRoute><Home /></PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute><CreateProject /></PrivateRoute>
          } />
          <Route path="/project/:id" element={
            <PrivateRoute><ProjectDetail /></PrivateRoute>
          } />
          <Route path="/edit/:id" element={
            <PrivateRoute><EditProject /></PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;