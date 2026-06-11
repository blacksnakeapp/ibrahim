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

    if (heroBadge) heroBadge.innerHTML = `<i class="fa-solid fa-video"></i> ${bio.role}`;
    if (heroTitle) heroTitle.innerHTML = `Menghidupkan Cerita Melalui <br><span class="gradient-text">Visual</span>`;
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

function renderProjects() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';

    window.portfolioData.projects.forEach(project => {
        let mediaHTML = '';
        if (project.isVideo) {
            mediaHTML = `
                <div class="video-placeholder-gradient">
                    <i class="fa-solid fa-circle-play video-play-icon"></i>
                    <span class="video-duration">Play</span>
                </div>
            `;
        } else {
            mediaHTML = `<img src="${project.image}" alt="${project.title}" class="card-img">`;
        }

        const techsHTML = project.techs.map(tech => `<span>${tech}</span>`).join('');

        const linkBtnHTML = project.isVideo ? `
            <a href="${project.demoUrl || '#'}" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i> YouTube</a>
            <a href="#" onclick="openProjectModal('${project.id}'); return false;" aria-label="Putar"><i class="fa-solid fa-circle-play"></i> Putar</a>
        ` : `
            <a href="${project.codeUrl || '#'}" target="_blank" rel="noopener" aria-label="Source"><i class="fa-brands ${project.tag === 'UI/UX Design' ? 'fa-figma' : 'fa-github'}"></i> Link</a>
            <a href="#" onclick="openProjectModal('${project.id}'); return false;" aria-label="Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>
        `;

        const detailBtnLabel = project.isVideo ? 'Putar Video' : 'Lihat Detail';
        const detailBtnIcon = project.isVideo ? 'fa-play' : 'fa-expand';

        const cardHTML = `
            <div class="portfolio-card" data-category="${project.category}">
                <div class="card-img-wrapper">
                    ${mediaHTML}
                    <div class="card-overlay">
                        <button class="btn btn-detail" onclick="openProjectModal('${project.id}')">${detailBtnLabel} <i class="fa-solid ${detailBtnIcon}"></i></button>
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

function openProjectModal(projectId) {
    const data = window.portfolioData.projects.find(p => p.id === projectId);
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
            <a href="${data.codeUrl || '#'}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-brands ${data.tag === 'UI/UX Design' ? 'fa-figma' : 'fa-github'}"></i> Lihat Source</a>
            <a href="${data.demoUrl || '#'}" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo Projek</a>
        </div>
    `;

    modalProjectBody.innerHTML = content;
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

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
});
