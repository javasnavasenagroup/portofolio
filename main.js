// ===== MUNCULKAN BODY (fix bug opacity:0 permanen) =====
document.body.style.opacity = 1;

// ===== TYPED.JS (efek ketik di Home) =====
try {
    var typed = new Typed(".text", {
        strings: ["Frontend Developer", "YouTuber", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
} catch (err) {
    console.error('Typed.js gagal dijalankan:', err);
}

// ===== SCROLL EVENTS: sticky header, progress bar, back-to-top =====
const header = document.querySelector('.header');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (header) header.classList.toggle('sticky', scrollTop > 50);
    if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';

    if (backToTop) {
        if (scrollTop > 300) {
            backToTop.style.opacity = 1;
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = 0;
            backToTop.style.pointerEvents = 'none';
        }
    }
});

// ===== ACTIVE NAV LINK SAAT SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== RIPPLE EFFECT PADA TOMBOL =====
document.querySelectorAll('.btn-box, .btn-outline').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = btn.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 600);
    });
});

// ===== MOBILE MENU (hamburger toggle) =====
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const navOverlay = document.querySelector('.nav-overlay');

function closeMenu() {
    if (!navbar || !menuToggle) return;
    navbar.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
}

function openMenu() {
    if (!navbar || !menuToggle) return;
    navbar.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
}

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', function () {
        const isOpen = navbar.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
}

// ===== FORM CONTACT (belum terhubung ke backend/email) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        formStatus.textContent = 'Terima kasih! Form ini masih contoh tampilan, belum terhubung ke server.';
        contactForm.reset();
    });
}