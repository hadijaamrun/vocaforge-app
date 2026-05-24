const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Project = require('./models/Project');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Project.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt); 

    const users = [
      { name: 'John Doe', email: 'john@smk.com', password: hashedPassword },
      { name: 'Jane Smith', email: 'jane@smk.com', password: hashedPassword },
      { name: 'Michael Johnson', email: 'michael@smk.com', password: hashedPassword },
    ];

    const createdUsers = await User.insertMany(users);

    const projects = [
      {
        user: createdUsers[0]._id, 
        title: 'Servis Karburator Motor Bebek',
        description: `Panduan membersihkan karburator agar tarikan motor kembali ringan dan irit.

Alat: Obeng, kunci pas/ring, carb cleaner, kuas.
Langkah:
1. Bongkar: Lepas karburator dari mesin, buka mangkuk dan lepaskan komponen (pilot/main jet).
2. Bersihkan: Semprot saluran dan komponen dengan carb cleaner untuk membuang endapan kotoran.
3. Rakit & Setel: Pasang kembali semua komponen dengan rapat, pasang ke mesin, lalu setel sekrup stasioner hingga putaran mesin stabil.`,
        category: 'Otomotif',
        imageUrl: 'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        user: createdUsers[1]._id, 
        title: 'Membuat Jaringan LAN (Kabel Straight)',
        description: `Tutorial crimping kabel UTP RJ45 susunan straight untuk lab komputer.

Alat: Kabel UTP, Konektor RJ45, Tang Crimping, LAN Tester.
Langkah:
1. Kupas: Buka jaket luar kabel UTP sepanjang 2 cm.
2. Urutkan: Susun kabel sesuai standar T568B (Putih Orange - Orange - Putih Hijau - Biru - Putih Biru - Hijau - Putih Coklat - Coklat).
3. Crimping: Potong rata ujungnya, masukkan mentok ke dalam konektor, lalu jepit kuat dengan tang.
4. Tes: Gunakan LAN tester untuk memastikan semua indikator lampu menyala berurutan.`,
        category: 'IT',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        user: createdUsers[2]._id, 
        title: 'Merakit Power Supply DC 12V Sederhana',
        description: `Merakit adaptor mengubah arus AC 220V menjadi DC 12V untuk praktek elektronika.

Komponen: Trafo Step-Down, Dioda Bridge, Elco 2200uF, IC LM7812.
Langkah:
1. Penurunan: Hubungkan listrik PLN ke input trafo.
2. Penyearah: Sambungkan output trafo ke Dioda Bridge untuk mengubah AC menjadi DC.
3. Filter: Pasang kapasitor Elco untuk meratakan riak tegangan.
4. Stabilizer: Lewatkan arus ke IC LM7812 agar output terkunci stabil di angka 12 Volt yang aman untuk komponen.`,
        category: 'Elektronika',
        imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        user: createdUsers[0]._id, 
        title: 'Modifikasi Pembobokan Knalpot',
        description: `Membobok knalpot standar 150cc untuk sirkulasi gas buang lebih baik tanpa suara bising.

Alat: Mesin gerinda, las listrik, pipa strimin, glasswool.
Langkah:
1. Potong: Belah bagian silencer menggunakan gerinda.
2. Bobok: Keluarkan sekat (baffle) bawaan pabrik menggunakan pahat.
3. Modifikasi: Las pipa saringan (strimin) lurus di bagian tengah silencer.
4. Peredam: Balut pipa strimin dengan glasswool padat untuk menghasilkan suara ngebass yang bulat.
5. Finishing: Las kembali silencer hingga rapat tanpa kebocoran, lalu cat ulang.`,
        category: 'Otomotif',
        imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];

    await Project.insertMany(projects);

    console.log('✅ Data Dummy Berhasil Diimpor!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Project.deleteMany();
    await User.deleteMany();

    console.log('🗑️ Semua Data Berhasil Dihapus!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData(); 
} else {
  importData();  
}