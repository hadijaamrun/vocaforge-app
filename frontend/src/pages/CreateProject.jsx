import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../utils/api';
import '../styles/Project.css';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const categories = ['Otomotif', 'Elektronika', 'Bangunan', 'IT', 'Kayu', 'Robotika', 'Umum', 'Energi Terbarukan'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanImageUrl = imageUrl.trim();

    if (cleanImageUrl !== '') {
      const urlRegex = /^(http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(cleanImageUrl)) {
        setError('URL Gambar tidak valid. Pastikan link diawali dengan http:// atau https://');
        setIsLoading(false);
        return; 
      }
    }

    try {
      await api.post('/projects', {
        title: cleanTitle, 
        category, 
        imageUrl: cleanImageUrl || undefined, 
        description: cleanDescription
      });
      
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan karya.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Link to="/home" className="back-link">
        <FiArrowLeft /> Kembali ke Galeri
      </Link>

      <div className="create-form-container">
        <h2 className="create-title">Tambah Karya Baru</h2>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Judul Karya</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Pilih Kategori</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL Gambar (Opsional)</label>
            <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://contoh.com/gambar.jpg" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Deskripsi & Langkah-langkah</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="6" required></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Unggah Karya'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;