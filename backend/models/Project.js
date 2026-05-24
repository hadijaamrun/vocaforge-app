const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Judul karya wajib diisi'],
    trim: true // Menghapus spasi di awal/akhir otomatis
  },
  description: {
    type: String,
    required: [true, 'Deskripsi wajib diisi'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Kategori wajib diisi'],
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true, 
    default: 'https://placehold.co/600x400/e0e0e0/555555?text=No+Image+Available',
    validate: {
      validator: function(v) {
        if (!v || v.trim() === '') {
          return true; 
        }
        const urlRegex = /^(http|https):\/\/[^ "]+$/;
        return urlRegex.test(v);
      },
      message: props => `"${props.value}" bukan URL yang valid. Pastikan link diawali dengan http:// atau https://`
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);