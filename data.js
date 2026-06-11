// Data Default Portofolio Ibrahim
const defaultPortfolioData = {
    biodata: {
        name: "Ibrahim",
        avatar: "assets/profile_avatar.png",
        role: "Video Editor & Creative Production",
        email: "ibrahimlanceng@gmail.com",
        whatsapp: "+628123456789",
        location: "Jakarta, Indonesia",
        education: "S1 Teknik Informatika",
        about: "Saya adalah seorang Editor Video, Desainer Grafis, dan Produser Media Kreatif yang berdedikasi untuk menciptakan konten digital berkualitas tinggi. Berbekal keahlian di berbagai perangkat lunak produksi standar industri, saya siap merealisasikan visi kreatif Anda menjadi karya yang memukau.",
        stats: {
            experience: "3+",
            completedProjects: "15+",
            satisfiedClients: "99%"
        }
    },
    socials: [
        { platform: "GitHub", url: "https://github.com", icon: "fa-brands fa-github" },
        { platform: "LinkedIn", url: "https://linkedin.com", icon: "fa-brands fa-linkedin" },
        { platform: "Instagram", url: "https://instagram.com", icon: "fa-brands fa-instagram" }
    ],
    skills: [
        { category: "Produksi Video", name: "Adobe Premiere Pro", level: "92%" },
        { category: "Produksi Video", name: "Adobe After Effects", level: "85%" },
        { category: "Desain & Grafis", name: "Adobe Photoshop", level: "88%" },
        { category: "Desain & Grafis", name: "Figma (UI/UX Design)", level: "80%" },
        { category: "Audio & Penyiaran", name: "Studio One", level: "85%" },
        { category: "Audio & Penyiaran", name: "OBS Studio", level: "90%" }
    ],
    projects: [
        {
            id: "web-dashboard",
            category: "web",
            title: "Dasbor Analisis Finansial",
            tag: "Web App",
            description: "Ini adalah aplikasi dasbor keuangan responsif yang dirancang untuk membantu para eksekutif memantau perputaran uang, analitik pendapatan, dan performa tim penjualan secara real-time. Dilengkapi dengan diagram interaktif menggunakan Chart.js, filter tanggal dinamis, ekspor laporan ke format PDF/CSV, dan sistem notifikasi bawaan.",
            techs: ["HTML5", "CSS Variables", "JavaScript ES6", "Chart.js"],
            image: "assets/project_web.png",
            demoUrl: "#",
            codeUrl: "https://github.com"
        },
        {
            id: "ui-travel",
            category: "design",
            title: "Aplikasi Mobile Traveling",
            tag: "UI/UX Design",
            description: "Desain purwarupa (prototype) aplikasi perjalanan wisata yang berfokus pada kemudahan pencarian tiket pesawat, booking hotel, dan panduan destinasi lokal. Menggunakan konsep desain modern dengan latar belakang blur transparan (glassmorphism) dan palet warna yang terinspirasi dari alam tropis.",
            techs: ["Figma", "Design System", "User Research", "Wireframing", "Prototyping"],
            image: "assets/project_design.png",
            demoUrl: "#",
            codeUrl: "https://figma.com"
        },
        {
            id: "video-motion",
            category: "video",
            title: "Video Promosi Produk Digital",
            tag: "Video Karya",
            description: "Proyek video promosi produk untuk perusahaan SaaS. Berisi motion graphics penjelasan fitur produk, transisi yang dinamis, efek visual modern, dan sulih suara (voiceover) berkualitas tinggi. Dibuat untuk dipasang pada landing page dan iklan berbayar di media sosial seperti Instagram dan YouTube.",
            techs: ["Premiere Pro", "After Effects", "Motion Graphics"],
            image: "assets/project_web.png",
            isVideo: true,
            videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            demoUrl: "https://youtube.com",
            codeUrl: "https://youtube.com"
        }
    ]
};

window.defaultPortfolioData = defaultPortfolioData;
