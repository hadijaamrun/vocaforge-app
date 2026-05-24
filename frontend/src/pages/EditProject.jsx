import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import '../styles/EditProject.css';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Otomotif', 'Elektronika', 'Bangunan', 'IT', 'Kayu', 'Robotika', 'Umum', 'Energi Terbarukan'];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setTitle(res.data.title);
        setCategory(res.data.category);
        setImageUrl(res.data.imageUrl);
        setDescription(res.data.description);
      } catch {
        setError('Gagal memuat data karya');
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.put(`/projects/${id}`, {
        title,
        category,
        imageUrl,
        description
      });
      navigate(`/project/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengedit karya.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="create-form-container">
        <h2 className="create-title">Edit Karya</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Judul Karya</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <select 
              id="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              required
            >
              <option value="" disabled>Pilih Kategori</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL Gambar</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Deskripsi & Langkah-langkah</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(`/project/${id}`)} className="btn-cancel">
              Batal
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;