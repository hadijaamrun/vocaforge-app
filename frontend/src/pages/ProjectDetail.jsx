import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiCalendar, FiEdit, FiTrash2 } from 'react-icons/fi';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isDefaultImage = (url) => {
    if (!url) return true;
    return url.includes('placehold.co') || url.includes('via.placeholder.com');
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch { return false; }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch {
        setError('Karya tidak ditemukan atau terjadi kesalahan.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Hapus karya ini?')) {
      try {
        await api.delete(`/projects/${id}`);
        navigate('/home');
      } catch { alert('Gagal menghapus'); }
    }
  };

  if (loading) return <div className="container status-message">Memuat...</div>;
  if (error) return <div className="container status-message error-message">{error}</div>;
  if (!project) return null;

  const date = new Date(project.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const isOwner = user && project.user && user._id === project.user._id;

  return (
    <div className="container">
      <Link to="/home" className="back-link"><FiArrowLeft /> Kembali ke Galeri</Link>
      <div className="detail-container">
        <div className="detail-content">
          <div className="detail-header-action">
            <span className="detail-category">{project.category}</span>
            {isOwner && (
              <div className="action-buttons">
                <Link to={`/edit/${project._id}`} className="btn-edit"><FiEdit /> Edit</Link>
                <button onClick={handleDelete} className="btn-delete"><FiTrash2 /> Hapus</button>
              </div>
            )}
          </div>
          <h1 className="detail-title">{project.title}</h1>
          <div className="detail-author">
            <span className="author-info-row"><FiUser /> Ditulis oleh: <strong>{project.user?.name || 'Anonim'}</strong></span>
            <span className="date-info-row"><FiCalendar /> {date}</span>
          </div>

          {project.imageUrl && 
           typeof project.imageUrl === 'string' && 
           isValidUrl(project.imageUrl) && 
           !isDefaultImage(project.imageUrl) && (
              <div className="detail-img-wrapper">
                <img src={project.imageUrl} alt={project.title} className="detail-img" />
              </div>
          )}
          
          <div className="detail-desc">{project.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;