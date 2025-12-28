document.addEventListener('DOMContentLoaded', () => {

    // Initial Page Load Animation
    const body = document.getElementById('body-content');
    const heroElements = document.querySelectorAll('.hero-anim');

    // Reveal body gently
    setTimeout(() => {
        body.classList.remove('opacity-0');
    }, 100);

    // Staggered Hero Animation
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.remove('opacity-0', 'translate-y-4', 'translate-y-8');
            el.style.transition = 'all 1s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 600 + (index * 200)); // Start after body fades in
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.reveal-section');
    scrollElements.forEach(el => observer.observe(el));

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.style.background = 'rgba(253, 251, 247, 0.95)';
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.style.background = 'rgba(253, 251, 247, 0.85)';
        }
    });

    // Smooth Scroll for Anchor Links (polishing behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // If it's just '#', scroll to top
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
