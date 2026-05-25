# VocaForge 

VocaForge adalah platform portofolio digital yang dirancang untuk siswa SMK Teknik guna mendokumentasikan hasil praktek, tutorial perbaikan, dan proyek teknik secara terorganisir.

## Struktur Proyek

Proyek ini menggunakan struktur monorepo dengan pembagian direktori sebagai berikut:

```text
VocaForge/
├── backend/        # Server API (Node.js & Express)
├── frontend/       # Aplikasi Web (React & Vite)
├── mobile-app/     # Aplikasi Android (React Native & Expo)
├── .gitignore      # Konfigurasi file yang diabaikan Git
├── package.json    # Konfigurasi dependensi utama
├── vercel.json     # Konfigurasi deployment Vercel
└── README.md       # Dokumentasi proyek

## Fitur Utama
Autentikasi: Sistem Login & Register.

Manajemen Karya (CRUD): Create, Read, Update, Delete data proyek.

Responsive: Mobile-first design & aplikasi Android native.

🛠 Tech Stack
Backend: Node.js, Express, MongoDB

Frontend: React.js, Vite, Tailwind CSS

Mobile: React Native, Expo, EAS Build
