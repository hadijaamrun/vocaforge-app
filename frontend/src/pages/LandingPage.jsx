import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container landing-container">
      <h1 className="landing-title">
        Bangun Portofolio, <br />Pamerkan Keahlianmu.
      </h1>
      <p className="landing-desc">
        VocaForge adalah platform khusus untuk siswa SMK Teknik untuk mendokumentasikan hasil praktek, berbagi tutorial perbaikan, dan saling menginspirasi dalam satu wadah profesional.
      </p>
      
      <div className="landing-actions">
        {user ? (
          <Link to="/home" className="btn-primary btn-primary-icon">
            Lihat Karya <FiArrowRight />
          </Link>
        ) : (
          <>
            <Link to="/register" className="btn-primary btn-primary-icon">
              Mulai Bergabung <FiArrowRight />
            </Link>
            <Link to="/login" className="btn-outline">
              Masuk
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;