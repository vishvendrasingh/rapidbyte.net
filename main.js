// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header on Scroll
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animated Counters for Performance Stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            // Handle decimal places for values like 99.99
            if (target % 1 !== 0) {
                element.textContent = current.toFixed(2);
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            // Set final value
            if (target % 1 !== 0) {
                element.textContent = target.toFixed(2);
            } else {
                element.textContent = target;
            }
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseFloat(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat values
document.querySelectorAll('.stat-value').forEach(stat => {
    statsObserver.observe(stat);
});

// Smooth Scroll Animation for Sections
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Add initial styles and observe sections
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    section.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(section);
});

// Feature Cards Hover Effect Enhancement
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Pricing Cards Hover Effect
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.1)';
        } else {
            this.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.2)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// POP Network Animation Enhancement
document.querySelectorAll('.pop-location').forEach((pop, index) => {
    pop.style.animationDelay = `${index * 0.2}s`;
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
const optimizedScroll = (callback) => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(callback);
};

// Keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Add ripple effect on CTA buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-effect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        color: var(--color-primary);
    }
`;
document.head.appendChild(style);

console.log('Rapidbyte Landing Page - Loaded Successfully');
