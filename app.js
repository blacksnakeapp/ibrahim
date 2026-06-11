/* ==========================================================================
   STATE MANAGEMENT & VARIABLES
   ========================================================================= */

// Global Portfolio Data Variable
window.portfolioData = null;

// DOM Elements
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');
const msgTextarea = document.getElementById('message');
const charCounter = document.getElementById('char-counter');
const successToast = document.getElementById('success-toast');

// Modal Elements
const projectModal = document.getElementById('project-modal');
const modalProjectBody = document.getElementById('modal-project-body');

/* ==========================================================================
   THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */

function initTheme() {
    const savedTheme = localStorage.getItem('theme');

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
   DYNAMIC RENDERING FUNCTIONS
   ========================================================================== */

function renderBiodata() {
    const bio = window.portfolioData.biodata;

    // Hero Elements
    const heroBadge = document.getElementById('hero-badge');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const heroAvatar = document.querySelector('.hero-avatar');

    if (heroBadge) heroBadge.textContent = bio.role;
    if (heroTitle) heroTitle.innerHTML = `Menghidupkan Cerita Melalui <br><span class="gradient-text">Video Audio Visual</span>`;
    if (heroDesc) heroDesc.textContent = `Saya seorang ${bio.role} profesional yang fokus menyusun narasi visual yang memukau, efek grafis dinamis, dan kualitas audio sinematik.`;
    if (heroAvatar && bio.avatar) {
        heroAvatar.src = bio.avatar;
    }

    // About Elements
    const aboutGreeting = document.getElementById('about-greeting');
    const aboutText = document.getElementById('about-text');
    const bioName = document.getElementById('bio-name');
    const bioRole = document.getElementById('bio-role');
    const bioLocation = document.getElementById('bio-location');
    const bioEducation = document.getElementById('bio-education');

    if (aboutGreeting) aboutGreeting.innerHTML = `Halo, nama saya <span>${bio.name}</span>`;
    if (aboutText) aboutText.textContent = bio.about;
    if (bioName) bioName.textContent = bio.name;
    if (bioRole) bioRole.textContent = bio.role;
    if (bioLocation) bioLocation.textContent = bio.location;
    if (bioEducation) bioEducation.textContent = bio.education;

    // Stat Elements
    const statExp = document.getElementById('stat-exp');
    const statProj = document.getElementById('stat-proj');
    const statClients = document.getElementById('stat-clients');

    if (statExp) statExp.textContent = bio.stats.experience;
    if (statProj) statProj.textContent = bio.stats.completedProjects;
    if (statClients) statClients.textContent = bio.stats.satisfiedClients;

    // Contact Details
    const contactEmail = document.getElementById('contact-email');
    const contactEmailLink = document.getElementById('contact-email-link');
    const contactWa = document.getElementById('contact-wa');
    const contactWaLink = document.getElementById('contact-wa-link');
    const contactLocation = document.getElementById('contact-location');

    if (contactEmail) contactEmail.textContent = bio.email;
    if (contactEmailLink) contactEmailLink.href = `mailto:${bio.email}`;
    if (contactWa) contactWa.textContent = bio.whatsapp;
    if (contactWaLink) {
        const cleanedWa = bio.whatsapp.replace(/[^0-9]/g, '');
        contactWaLink.href = `https://wa.me/${cleanedWa}`;
    }
    if (contactLocation) contactLocation.textContent = bio.location;
}

function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = '';

    // Group skills by category
    const categories = {};
    window.portfolioData.skills.forEach(skill => {
        if (!categories[skill.category]) {
            categories[skill.category] = [];
        }
        categories[skill.category].push(skill);
    });

    // Define category icons
    const categoryIcons = {
        "Produksi Video": "fa-film",
        "Desain & Grafis": "fa-palette",
        "Audio & Penyiaran": "fa-volume-high"
    };

    for (const catName in categories) {
        const icon = categoryIcons[catName] || "fa-screwdriver-wrench";
        const skillListHTML = categories[catName].map(skill => `
            <div class="skill-item">
                <div class="skill-info">
                    <span>${skill.name}</span>
                    <span>${skill.level}</span>
                </div>
                <div class="skill-progress-bar">
                    <div class="skill-progress" data-level="${skill.level}"></div>
                </div>
            </div>
        `).join('');

        const cardHTML = `
            <div class="skill-category-card">
                <div class="skill-category-header">
                    <i class="fa-solid ${icon} skill-cat-icon"></i>
                    <h3>${catName}</h3>
                </div>
                <div class="skill-list">
                    ${skillListHTML}
                </div>
            </div>
        `;
        skillsGrid.insertAdjacentHTML('beforeend', cardHTML);
    }
}

function getCloudinaryThumbnail(url) {
    if (!url) return null;
    if (url.includes('res.cloudinary.com') && url.includes('/video/upload/')) {
        let thumbUrl = url.replace(/\.[^/.]+$/, ".jpg");
        if (!thumbUrl.includes('/so_')) {
            thumbUrl = thumbUrl.replace('/video/upload/', '/video/upload/w_640,h_360,c_fill,so_0/');
        }
        return thumbUrl;
    }
    return null;
}

function getYouTubeThumbnail(url) {
    if (!url) return null;
    let videoId = null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        videoId = match[2];
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
}

function renderProjects() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';

    window.portfolioData.projects.forEach(project => {
        let mediaHTML = '';
        const isVideoCategory = project.category === 'video';
        const hasEmbed = project.isVideo && project.videoEmbedUrl && project.videoEmbedUrl.trim() !== '';
        
        let ytThumb = null;
        let clThumb = null;
        if (isVideoCategory) {
            const videoUrl = project.videoEmbedUrl || project.demoUrl;
            ytThumb = getYouTubeThumbnail(videoUrl);
            clThumb = getCloudinaryThumbnail(videoUrl);
        }

        if (project.image && project.image.trim() !== '') {
            mediaHTML = `<img src="${project.image}" alt="${project.title}" class="card-img">`;
        } else if (clThumb) {
            mediaHTML = `<img src="${clThumb}" alt="${project.title}" class="card-img">`;
        } else if (ytThumb) {
            mediaHTML = `<img src="${ytThumb}" alt="${project.title}" class="card-img">`;
        } else if (isVideoCategory) {
            mediaHTML = `
                <div class="video-placeholder-gradient">
                    <i class="fa-solid fa-circle-play video-play-icon"></i>
                    <span class="video-duration">Play</span>
                </div>
            `;
        } else {
            mediaHTML = `<img src="assets/project_web.png" alt="${project.title}" class="card-img">`;
        }

        const techsHTML = project.techs.map(tech => `<span>${tech}</span>`).join('');

        const isProtected = project.password && project.password.trim() !== '';
        let linkBtnHTML = '';
        let detailBtnLabel = '';
        let detailBtnIcon = '';
        let detailBtnAction = '';

        if (isVideoCategory) {
            if (isProtected) {
                linkBtnHTML = `
                    <a href="#" onclick="openProjectModal('${project.id}'); return false;" style="width: 100%; justify-content: center;" aria-label="Kunci"><i class="fa-solid fa-lock"></i> Kunci Putar (Sandi)</a>
                `;
                detailBtnLabel = 'Buka Video';
                detailBtnIcon = 'fa-solid fa-lock';
                detailBtnAction = `openProjectModal('${project.id}')`;
            } else if (hasEmbed) {
                linkBtnHTML = `
                    <a href="${project.demoUrl || '#'}" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i> YouTube</a>
                    <a href="#" onclick="openProjectModal('${project.id}'); return false;" aria-label="Putar"><i class="fa-solid fa-circle-play"></i> Putar</a>
                `;
                detailBtnLabel = 'Putar Video';
                detailBtnIcon = 'fa-solid fa-play';
                detailBtnAction = `openProjectModal('${project.id}')`;
            } else {
                linkBtnHTML = `
                    <a href="${project.demoUrl || '#'}" target="_blank" rel="noopener" aria-label="Tonton" style="width: 100%; justify-content: center;"><i class="fa-brands fa-youtube"></i> Tonton di YouTube</a>
                `;
                detailBtnLabel = 'Tonton Video';
                detailBtnIcon = 'fa-brands fa-youtube';
                detailBtnAction = `window.open('${project.demoUrl || '#'}', '_blank')`;
            }
        } else {
            if (isProtected) {
                linkBtnHTML = `
                    <a href="#" onclick="openProjectModal('${project.id}'); return false;" style="width: 100%; justify-content: center;" aria-label="Kunci"><i class="fa-solid fa-lock"></i> Kunci Akses (Sandi)</a>
                `;
                detailBtnLabel = 'Buka Proyek';
                detailBtnIcon = 'fa-solid fa-lock';
                detailBtnAction = `openProjectModal('${project.id}')`;
            } else {
                linkBtnHTML = `
                    <a href="${project.codeUrl || '#'}" target="_blank" rel="noopener" aria-label="Source"><i class="fa-brands ${project.tag === 'UI/UX Design' ? 'fa-figma' : 'fa-github'}"></i> Link</a>
                    <a href="#" onclick="openProjectModal('${project.id}'); return false;" aria-label="Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>
                `;
                detailBtnLabel = 'Lihat Detail';
                detailBtnIcon = 'fa-solid fa-expand';
                detailBtnAction = `openProjectModal('${project.id}')`;
            }
        }

        const cardHTML = `
            <div class="portfolio-card" data-category="${project.category}">
                <div class="card-img-wrapper">
                    ${mediaHTML}
                    <div class="card-overlay">
                        <button class="btn btn-detail" onclick="${detailBtnAction}">${detailBtnLabel} <i class="${detailBtnIcon}"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    <span class="card-tag">${project.tag}</span>
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-description">${project.description}</p>
                    <div class="card-techs">
                        ${techsHTML}
                    </div>
                    <div class="card-links">
                        ${linkBtnHTML}
                    </div>
                </div>
            </div>
        `;
        portfolioGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

/* ==========================================================================
   PORTFOLIO FILTER LOGIC
   ========================================================================== */

function initFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const portfolioCards = document.querySelectorAll('.portfolio-card');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');

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
}

/* ==========================================================================
   PROJECT MODAL (LIGHTBOX)
   ========================================================================== */

function renderActualModalContent(data) {
    let mediaHTML = '';
    if (data.isVideo) {
        const url = data.videoEmbedUrl || '';
        const isDirectVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg') || url.includes('/video/upload/');

        if (isDirectVideo) {
            mediaHTML = `
                <div class="modal-detail-video-placeholder">
                    <video width="100%" height="100%" controls autoplay style="position: absolute; top:0; left:0; width:100%; height:100%; border-radius: var(--radius-md); object-fit: contain; background: #000;">
                        <source src="${url}" type="video/mp4">
                        Browser Anda tidak mendukung tag video HTML5.
                    </video>
                </div>
            `;
        } else {
            mediaHTML = `
                <div class="modal-detail-video-placeholder">
                    <iframe width="100%" height="100%" src="${url}" title="${data.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top:0; left:0; width:100%; height:100%; border-radius: var(--radius-md);"></iframe>
                </div>
            `;
        }
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
            <a href="${data.codeUrl || '#'}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-brands ${data.tag === 'UI/UX Design' ? 'fa-figma' : 'fa-github'}"></i> Lihat Source</a>
            <a href="${data.demoUrl || '#'}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo Projek</a>
        </div>
    `;

    modalProjectBody.innerHTML = content;
}

function renderPasswordPrompt(data) {
    const content = `
        <div class="modal-detail-password-locked" style="padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-color); min-height: 250px; margin-bottom: 20px;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 16px;"><i class="fa-solid fa-lock"></i></div>
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 8px;">Karya Dilindungi Kata Sandi</h3>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 24px; max-width: 350px;">Karya ini bersifat privat. Silakan masukkan kata sandi untuk membukanya.</p>
            
            <div style="display: flex; gap: 8px; width: 100%; max-width: 320px;">
                <input type="password" id="modal-project-password-input" placeholder="Masukkan Sandi..." onkeydown="if(event.key === 'Enter') verifyModalProjectPassword('${data.id}')" style="flex: 1; padding: 12px 16px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.95rem; outline: none;">
                <button class="btn btn-primary" onclick="verifyModalProjectPassword('${data.id}')" style="padding: 12px 20px;"><i class="fa-solid fa-unlock"></i> Buka</button>
            </div>
            <p id="modal-project-password-error" style="color: #ef4444; font-size: 0.85rem; margin-top: 12px; display: none;">Kata sandi salah. Silakan coba lagi!</p>
        </div>
        
        <span class="modal-detail-tag">${data.tag}</span>
        <h3 class="modal-detail-title">${data.title}</h3>
        <p class="modal-detail-description">${data.description}</p>
        <div class="modal-detail-techs">
            ${data.techs.map(tech => `<span>${tech}</span>`).join('')}
        </div>
    `;

    modalProjectBody.innerHTML = content;
    setTimeout(() => {
        const input = document.getElementById('modal-project-password-input');
        if (input) input.focus();
    }, 100);
}

function openProjectModal(projectId) {
    const data = window.portfolioData.projects.find(p => p.id === projectId);
    if (!data) return;

    const isProtected = data.password && data.password.trim() !== '';

    if (isProtected) {
        renderPasswordPrompt(data);
    } else {
        renderActualModalContent(data);
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

window.verifyModalProjectPassword = function(projectId) {
    const data = window.portfolioData.projects.find(p => p.id === projectId);
    if (!data) return;

    const input = document.getElementById('modal-project-password-input');
    const errorMsg = document.getElementById('modal-project-password-error');

    if (input && input.value === data.password) {
        renderActualModalContent(data);
    } else {
        if (errorMsg) errorMsg.style.display = 'block';
        if (input) {
            input.value = '';
            input.focus();
        }
    }
};

function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalProjectBody.innerHTML = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Bind to window for global inline onclick support
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

/* ==========================================================================
   SKILL PROGRESS ANIMATION ON SCROLL
   ========================================================================== */

let skillSection = document.getElementById('keahlian');
let skillObserver = null;

function initSkillObserver() {
    const progressBars = document.querySelectorAll('.skill-progress');
    skillSection = document.getElementById('keahlian');

    skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const targetLevel = bar.getAttribute('data-level');
                    bar.style.width = targetLevel;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    if (skillSection) {
        skillObserver.observe(skillSection);
    }
}

/* ==========================================================================
   CONTACT FORM VALIDATION & FEEDBACK
   ========================================================================== */

if (contactForm) {
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
            showToast();
            contactForm.reset();
            charCounter.textContent = '0 / 500';
        }
    });

    function showError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        formGroup.classList.add('invalid');
    }

    function windowClearError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        if (formGroup) formGroup.classList.remove('invalid');
    }

    function clearError(inputElement) {
        windowClearError(inputElement);
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
}

/* ==========================================================================
   TOAST CONTROLS
   ========================================================================== */

let toastTimeout;

function showToast() {
    clearTimeout(toastTimeout);
    successToast.classList.add('active');
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    successToast.classList.remove('active');
}

window.hideToast = hideToast;

/* ==========================================================================
   FIREBASE BACKGROUND SYNC
   ========================================================================== */

async function loadFirebaseData(config) {
    try {
        // Dynamic import Firebase SDKs agar load awal website tetap di bawah 100ms
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
        const { getFirestore, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
        
        const app = initializeApp(config);
        const db = getFirestore(app);
        
        const docRef = doc(db, "portfolio", "data");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const freshData = docSnap.data();
            
            // Bandingkan data cloud dengan data lokal saat ini
            const currentDataStr = JSON.stringify(window.portfolioData);
            const freshDataStr = JSON.stringify(freshData);
            
            if (currentDataStr !== freshDataStr) {
                window.portfolioData = freshData;
                localStorage.setItem('portfolioData', freshDataStr);
                
                // Render ulang komponen secara dinamis tanpa reload halaman penuh
                renderBiodata();
                renderSkills();
                renderProjects();
                
                // Inisialisasi ulang progress bar observer untuk elemen baru
                if (skillObserver && skillSection) {
                    skillObserver.unobserve(skillSection);
                }
                initSkillObserver();
            }
        }
    } catch (e) {
        console.error("Gagal menyinkronkan data dari Firebase Firestore:", e);
    }
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Load portfolio data from localStorage or default data.js
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        try {
            window.portfolioData = JSON.parse(savedData);
        } catch (e) {
            window.portfolioData = defaultPortfolioData;
        }
    } else {
        window.portfolioData = defaultPortfolioData;
    }

    // Render dynamic components
    renderBiodata();
    renderSkills();
    renderProjects();

    // Initialize interaction systems
    initTheme();
    initFilters();
    initSkillObserver();

    // Sinkronisasi data Firestore di latar belakang jika terkonfigurasi
    const env = window.__ENV__ || {};
    const firebaseConfig = {
        apiKey: env.FIREBASE_API_KEY || "",
        authDomain: env.FIREBASE_AUTH_DOMAIN || "",
        projectId: env.FIREBASE_PROJECT_ID || "",
        storageBucket: env.FIREBASE_STORAGE_BUCKET || "",
        messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || "",
        appId: env.FIREBASE_APP_ID || ""
    };
    const isFirebaseConfigured = !!firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("ISI_");

    if (isFirebaseConfigured) {
        loadFirebaseData(firebaseConfig);
    }
});
