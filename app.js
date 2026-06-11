/* ==========================================================================
   STATE MANAGEMENT & VARIABLES
   ========================================================================== */

// DOM Elements
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const contactForm = document.getElementById('contact-form');
const msgTextarea = document.getElementById('message');
const charCounter = document.getElementById('char-counter');
const successToast = document.getElementById('success-toast');

// Modal Elements
const projectModal = document.getElementById('project-modal');
const modalProjectBody = document.getElementById('modal-project-body');

// Projects Data for Lightbox
const projectsData = {
    'web-dashboard': {
        title: 'Dasbor Analisis Finansial',
        tag: 'Web App',
        description: 'Ini adalah aplikasi dasbor keuangan responsif yang dirancang untuk membantu para eksekutif memantau perputaran uang, analitik pendapatan, dan performa tim penjualan secara real-time. Dilengkapi dengan diagram interaktif menggunakan Chart.js, filter tanggal dinamis, ekspor laporan ke format PDF/CSV, dan sistem notifikasi bawaan.',
        techs: ['HTML5', 'CSS Variables', 'JavaScript ES6', 'Chart.js', 'Local Storage'],
        image: 'assets/project_web.png',
        demoUrl: '#',
        codeUrl: 'https://github.com'
    },
    'ui-travel': {
        title: 'Aplikasi Mobile Traveling',
        tag: 'UI/UX Design',
        description: 'Desain purwarupa (prototype) aplikasi perjalanan wisata yang berfokus pada kemudahan pencarian tiket pesawat, booking hotel, dan panduan destinasi lokal. Menggunakan konsep desain modern dengan latar belakang blur transparan (glassmorphism) dan palet warna yang terinspirasi dari alam tropis.',
        techs: ['Figma', 'Design System', 'User Research', 'Wireframing', 'Prototyping'],
        image: 'assets/project_design.png',
        demoUrl: '#',
        codeUrl: 'https://figma.com'
    },
    'video-motion': {
        title: 'Video Promosi Produk Digital',
        tag: 'Video Karya',
        description: 'Proyek video promosi produk untuk perusahaan SaaS. Berisi motion graphics penjelasan fitur produk, transisi yang dinamis, efek visual modern, dan sulih suara (voiceover) berkualitas tinggi. Dibuat untuk dipasang pada landing page dan iklan berbayar di media sosial seperti Instagram dan YouTube.',
        techs: ['Adobe Premiere Pro', 'After Effects', 'Motion Graphics', 'Color Grading', 'Audio Mixing'],
        isVideo: true,
        videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        demoUrl: 'https://youtube.com',
        codeUrl: 'https://youtube.com'
    }
};

/* ==========================================================================
   THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Check local storage or system preference
    if (savedTheme === 'dark') {
        body.classList.add('theme-dark');
        updateThemeIcon('dark');
    } else if (savedTheme === 'light') {
        body.classList.remove('theme-dark');
        updateThemeIcon('light');
    } else {
        // Fallback to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('theme-dark');
            updateThemeIcon('dark');
        } else {
            body.classList.remove('theme-dark');
            updateThemeIcon('light');
        }
    }
}

function toggleTheme() {
    if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        body.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
}

function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);

/* ==========================================================================
   MOBILE NAVIGATION DRAWER
   ========================================================================== */

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

hamburger.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ==========================================================================
   ACTIVE NAV LINK ON SCROLL & SCROLL BACKGROUND
   ========================================================================== */

const sections = document.querySelectorAll('section');
const navbarHeader = document.querySelector('.navbar-container');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY;

    // Sticky Navbar shadow & background opacity on scroll
    if (scrollPos > 50) {
        navbarHeader.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbarHeader.style.boxShadow = 'none';
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ==========================================================================
   PORTFOLIO FILTER LOGIC
   ========================================================================== */

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            // Add scale down animation
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    });
});

/* ==========================================================================
   PROJECT MODAL (LIGHTBOX)
   ========================================================================== */

function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;
    
    let mediaHTML = '';
    if (data.isVideo) {
        mediaHTML = `
            <div class="modal-detail-video-placeholder">
                <iframe width="100%" height="100%" src="${data.videoEmbedUrl}" title="${data.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top:0; left:0; width:100%; height:100%; border-radius: var(--radius-md);"></iframe>
            </div>
        `;
    } else {
        mediaHTML = `<img src="${data.image}" alt="${data.title}" class="modal-detail-img">`;
    }
    
    const techsHTML = data.techs.map(tech => `<span>${tech}</span>`).join('');
    
    const content = `
        ${mediaHTML}
        <span class="modal-detail-tag">${data.tag}</span>
        <h3 class="modal-detail-title">${data.title}</h3>
        <p class="modal-detail-description">${data.description}</p>
        <div class="modal-detail-techs">
            ${techsHTML}
        </div>
        <div class="modal-detail-links">
            <a href="${data.codeUrl}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-brands ${data.tag === 'UI/UX Design' ? 'fa-figma' : 'fa-github'}"></i> Lihat Source</a>
            <a href="${data.demoUrl}" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo Projek</a>
        </div>
    `;
    
    modalProjectBody.innerHTML = content;
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Stop background scroll
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Resume background scroll
    // Clear iframe src to stop video playing on close
    modalProjectBody.innerHTML = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

/* ==========================================================================
   SKILL PROGRESS ANIMATION ON SCROLL
   ========================================================================== */

const skillSection = document.getElementById('keahlian');
const progressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressBars.forEach(bar => {
                const targetLevel = bar.getAttribute('data-level');
                bar.style.width = targetLevel;
            });
            // Stop observing after animating once
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

if (skillSection) {
    skillObserver.observe(skillSection);
}

/* ==========================================================================
   CONTACT FORM VALIDATION & FEEDBACK
   ========================================================================== */

// Live Character Counter
msgTextarea.addEventListener('input', () => {
    const currentLength = msgTextarea.value.length;
    charCounter.textContent = `${currentLength} / 500`;
    
    if (currentLength >= 500) {
        charCounter.style.color = '#ef4444';
    } else {
        charCounter.style.color = 'var(--text-muted)';
    }
});

// Form Submission & Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    
    // Validate Name
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        showError(nameInput);
        isFormValid = false;
    } else {
        clearError(nameInput);
    }
    
    // Validate Email
    const emailInput = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput);
        isFormValid = false;
    } else {
        clearError(emailInput);
    }
    
    // Validate Subject
    const subjectInput = document.getElementById('subject');
    if (subjectInput.value.trim() === '') {
        showError(subjectInput);
        isFormValid = false;
    } else {
        clearError(subjectInput);
    }
    
    // Validate Message
    if (msgTextarea.value.trim().length < 10) {
        showError(msgTextarea);
        isFormValid = false;
    } else {
        clearError(msgTextarea);
    }
    
    if (isFormValid) {
        // Success case (local simulation)
        showToast();
        contactForm.reset();
        charCounter.textContent = '0 / 500';
    }
});

function showError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    formGroup.classList.add('invalid');
}

function clearError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    formGroup.classList.remove('invalid');
}

// Live validation on focusout
const inputs = contactForm.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focusout', () => {
        if (input.id === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(input.value.trim())) {
                clearError(input);
            }
        } else if (input.id === 'message') {
            if (input.value.trim().length >= 10) {
                clearError(input);
            }
        } else {
            if (input.value.trim() !== '') {
                clearError(input);
            }
        }
    });
    
    input.addEventListener('input', () => {
        // Live clear error on input
        if (input.id === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(input.value.trim())) {
                clearError(input);
            }
        } else if (input.id === 'message') {
            if (input.value.trim().length >= 10) {
                clearError(input);
            }
        } else {
            if (input.value.trim() !== '') {
                clearError(input);
            }
        }
    });
});

/* ==========================================================================
   TOAST CONTROLS
   ========================================================================== */

let toastTimeout;

function showToast() {
    // Clear any active toast timeouts
    clearTimeout(toastTimeout);
    
    successToast.classList.add('active');
    
    // Auto hide after 5 seconds
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    successToast.classList.remove('active');
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});
