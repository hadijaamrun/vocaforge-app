## VocaForge 

VocaForge adalah platform portofolio digital yang dirancang untuk siswa SMK Teknik guna mendokumentasikan hasil praktek, tutorial perbaikan, dan proyek teknik secara terorganisir.

## Deployment
Front-end: https://vocaforge-myskill.vercel.app/

Back-end: https://vocaforge-backend.vercel.app/api/projects

Mobile App:

<img width="300" height="300" alt="Screenshot 2026-05-25 075506" src="https://github.com/user-attachments/assets/f4fd493c-943f-4288-8f5a-63840093d71b" />


## Struktur Proyek

Proyek ini menggunakan struktur monorepo dengan pembagian direktori sebagai berikut:

```text
VocaForge/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── Routes/
│   ├── index.js
│   └── seeder.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
└── mobile-app/
    ├── app/
    │   ├── (tabs)/
    │   └── edit/
    ├── src/
    │   └── utils/
    └── app.json
```
## Fitur Utama
Autentikasi: Sistem Login & Register.

Manajemen Karya (CRUD): Create, Read, Update, Delete data proyek.

Responsive: Mobile-first design & aplikasi Android native.

## Tech Stack
Backend: Node.js, Express, MongoDB

Frontend: React.js, Vite

Mobile: React Native, Expo, EAS Build
