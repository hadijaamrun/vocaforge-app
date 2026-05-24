import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import '../styles/Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchProjects();
  }, []); 

  const baseCategories = ['Semua', 'Otomotif', 'Elektronika', 'Bangunan', 'IT', 'Kayu', 'Robotika', 'Umum', 'Energi Terbarukan'];
  const categories = user ? ['Karya Saya', ...baseCategories] : baseCategories;

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'Karya Saya') return user && project.user?._id === user._id;
    if (activeFilter !== 'Semua') return project.category === activeFilter;
    return true;
  });

  return (
    <div className="container">
      <div className="home-header">
        <h1 className="home-title">Galeri Karya Siswa</h1>
        <div className="filter-container">
          {categories.map(cat => (
            <button key={cat} className={`filter-btn ${activeFilter === cat ? 'active' : ''}`} onClick={() => setActiveFilter(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      {loading ? <p style={{ textAlign: 'center' }}>Memuat...</p> : filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map(project => <ProjectCard key={project._id} project={project} />)}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Belum ada karya.</h3>
          <p>{activeFilter === 'Karya Saya' ? 'Anda belum membuat karya.' : 'Jadilah yang pertama berbagi!'}</p>
        </div>
      )}
    </div>
  );
};
export default Home;