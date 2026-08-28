/* ============================================
   SHIP FAST — Interactive Scripts
   ============================================ */

// --- Navbar scroll effect ---
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
});

// --- Stat counter animation ---
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            
            counter.textContent = current;
            if (target === 100) counter.textContent = current + '%';
            if (target === 24) counter.textContent = current + 'h';
            if (target === 47) counter.textContent = current + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// --- Intersection Observer for fade-in animations ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate on scroll
    const animateOnScroll = [
        '.service-card',
        '.step',
        '.testimonial-card',
        '.pricing-card',
        '.contact-form',
        '.section-header'
    ];
    
    animateOnScroll.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i * 0.08}s`;
            observer.observe(el);
        });
    });
    
    // Start hero counter animation
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);
});

// --- Form handling ---
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Animate button
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate send (replace with actual endpoint)
    setTimeout(() => {
        submitBtn.innerHTML = '<span>✓ Request Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        // Log form data to console (for testing)
        console.log('Form submitted:', data);
        
        // Reset after 3 seconds
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = '<span>Send Request →</span>';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.background = '';
        }, 3000);
    }, 1200);
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- Mouse glow effect on service cards ---
document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.background = `
            radial-gradient(
                300px circle at ${x}px ${y}px,
                rgba(139, 92, 246, 0.06),
                transparent 50%
            ),
            var(--bg-card)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

// --- Parallax effect on background orbs ---
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 15;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

console.log('⚡ ShipFast loaded. Ready to hustle.');
