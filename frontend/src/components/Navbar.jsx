import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut, FiPlusCircle, FiUser, FiLayout } from 'react-icons/fi'; 
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          VocaForge
        </Link>
        <div className="nav-menu">
          {user ? (
            <>
              <Link to="/home" className="nav-link"><FiLayout /> Lihat Karya</Link>
              <Link to="/create" className="nav-link"><FiPlusCircle /> Tambah Karya</Link>
              <span className="nav-user"><FiUser /> {user.name}</span>
              <button onClick={handleLogout} className="btn-logout"><FiLogOut /> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;