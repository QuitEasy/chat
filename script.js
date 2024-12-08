// Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking on links
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    burger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            toggleMenu();
        }
    });
});

// Mobile Menu Animation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links li');

    // Set initial item indices for staggered animation
    mobileNavLinks.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Handle touch events for mobile menu
    let touchStartY = 0;
    let touchEndY = 0;

    mobileMenu.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    mobileMenu.addEventListener('touchmove', (e) => {
        if (!mobileMenu.classList.contains('active')) return;
        
        touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        // If swiping down and near the top of the menu
        if (diff < -50 && window.scrollY <= 0) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Prevent menu toggle from being hidden behind content
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.top = window.scrollY > 20 ? '1rem' : '1.5rem';
        }
    });
});

// Initialize ScrollReveal
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 400
});

// Apply animations to different sections
sr.reveal('.welcome-text', { delay: 500 });
sr.reveal('.stats-row', { delay: 600 });
sr.reveal('.cta-group', { delay: 700 });
sr.reveal('.float-card', { interval: 300 });
sr.reveal('.feature-card', { interval: 300 });
sr.reveal('.creator-card', { delay: 400 });
sr.reveal('.social-links', { delay: 600 });

// Floating cards animation
const floatCards = document.querySelectorAll('.float-card');
floatCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
});

// Chat message animations
const messages = document.querySelectorAll('.chat-message');
messages.forEach((message, index) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(message);
});

// Create and animate particles
function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    // Create new particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        container.appendChild(particle);
    }
}

// Initialize particles when creator section is visible
const creatorSection = document.querySelector('.creator-section');
if (creatorSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createParticles();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(creatorSection);
}

// Glowing text animation for welcome panel
const glowingText = document.querySelector('.glowing-text');
if (glowingText) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        glowingText.style.textShadow = `0 0 10px hsla(${hue}, 100%, 50%, 0.5)`;
    }, 50);
}

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    const updateCount = () => {
        if (count < target) {
            count += increment;
            stat.textContent = Math.round(count);
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target;
        }
    };

    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCount();
            observer.disconnect();
        }
    });

    observer.observe(stat);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to animate
const animateElements = [
    '.feature-card',
    '.timeline-item',
    '.chat-interface',
    '.creator-card',
    '.section-title',
    '.stats-grid',
    '.hero-content'
].join(',');

document.querySelectorAll(animateElements).forEach(el => {
    el.classList.add('animate-hidden');
    observer.observe(el);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px var(--shadow-color)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Typing animation for AI coach messages
const aiMessages = document.querySelectorAll('.chat-message.ai .message-content');
aiMessages.forEach(message => {
    const text = message.textContent;
    message.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            message.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.disconnect();
        }
    });

    observer.observe(message);
});

// Profile card hover effect
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Chat button animation
const chatBtn = document.querySelector('.chat-btn');
chatBtn.addEventListener('click', () => {
    chatBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        chatBtn.style.transform = 'scale(1)';
    }, 200);
});

// Gradient animation for hero section
const gradientBg = document.querySelector('.gradient-bg');
let gradientPosition = 0;
function animateGradient() {
    gradientPosition = (gradientPosition + 1) % 400;
    gradientBg.style.backgroundPosition = `${gradientPosition}% 50%`;
    requestAnimationFrame(animateGradient);
}
animateGradient();

// Enhanced parallax effect for How It Works section
window.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.step');
    const creatorSection = document.querySelector('.profile-card');
    
    steps.forEach(step => {
        const stepTop = step.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (stepTop < windowHeight * 0.8) {
            step.classList.add('visible');
        }
    });

    if (creatorSection) {
        const creatorTop = creatorSection.getBoundingClientRect().top;
        const scrolled = window.pageYOffset;
        const rate = creatorTop / 5;
        
        creatorSection.style.transform = `translateY(${rate}px)`;
    }
});

// Chat Interface Functionality
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chat-messages');
const typingIndicator = document.querySelector('.typing-indicator');

// Sample responses for demo
const aiResponses = [
    "You're doing great! Every minute without smoking is a victory. ",
    "Remember why you started this journey. Your health is worth it! ",
    "Try this quick exercise: Take 5 deep breaths and walk around for a minute. ",
    "Cravings are temporary, but the benefits of quitting are forever! ",
    "You've got this! I'm here to support you every step of the way. "
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${message}
        </div>
    `;
    
    // Remove typing indicator before adding new message
    typingIndicator.style.display = 'none';
    chatMessages.insertBefore(messageDiv, typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isUser) {
        // Show typing indicator for next potential message
        setTimeout(() => {
            typingIndicator.style.display = 'flex';
        }, 500);
    }
}

function handleUserMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, true);
        messageInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(response);
        }, 1500);
    }
}

// Event listeners for chat
sendButton.addEventListener('click', handleUserMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Timeline Cards Animation
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(180deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(0)';
    });
});

// ScrollReveal Animations
ScrollReveal().reveal('.timeline-item', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.chat-interface', {
    delay: 400,
    distance: '50px',
    duration: 1000,
    origin: 'right'
});

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.timeline-icon, .send-button');

interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.transform = 'scale(1)';
    });
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Typing animation for AI coach messages
const aiMessages = document.querySelectorAll('.chat-message.ai .message-content');
aiMessages.forEach(message => {
    const text = message.textContent;
    message.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            message.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.disconnect();
        }
    });

    observer.observe(message);
});

// Profile card hover effect
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Chat button animation
const chatBtn = document.querySelector('.chat-btn');
chatBtn.addEventListener('click', () => {
    chatBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        chatBtn.style.transform = 'scale(1)';
    }, 200);
});

// Gradient animation for hero section
const gradientBg = document.querySelector('.gradient-bg');
let gradientPosition = 0;
function animateGradient() {
    gradientPosition = (gradientPosition + 1) % 400;
    gradientBg.style.backgroundPosition = `${gradientPosition}% 50%`;
    requestAnimationFrame(animateGradient);
}
animateGradient();

// Enhanced parallax effect for How It Works section
window.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.step');
    const creatorSection = document.querySelector('.profile-card');
    
    steps.forEach(step => {
        const stepTop = step.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (stepTop < windowHeight * 0.8) {
            step.classList.add('visible');
        }
    });

    if (creatorSection) {
        const creatorTop = creatorSection.getBoundingClientRect().top;
        const scrolled = window.pageYOffset;
        const rate = creatorTop / 5;
        
        creatorSection.style.transform = `translateY(${rate}px)`;
    }
});

// Chat Interface Functionality
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chat-messages');
const typingIndicator = document.querySelector('.typing-indicator');

// Sample responses for demo
const aiResponses = [
    "You're doing great! Every minute without smoking is a victory. ",
    "Remember why you started this journey. Your health is worth it! ",
    "Try this quick exercise: Take 5 deep breaths and walk around for a minute. ",
    "Cravings are temporary, but the benefits of quitting are forever! ",
    "You've got this! I'm here to support you every step of the way. "
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${message}
        </div>
    `;
    
    // Remove typing indicator before adding new message
    typingIndicator.style.display = 'none';
    chatMessages.insertBefore(messageDiv, typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isUser) {
        // Show typing indicator for next potential message
        setTimeout(() => {
            typingIndicator.style.display = 'flex';
        }, 500);
    }
}

function handleUserMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, true);
        messageInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(response);
        }, 1500);
    }
}

// Event listeners for chat
sendButton.addEventListener('click', handleUserMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Timeline Cards Animation
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(180deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(0)';
    });
});

// ScrollReveal Animations
ScrollReveal().reveal('.timeline-item', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.chat-interface', {
    delay: 400,
    distance: '50px',
    duration: 1000,
    origin: 'right'
});

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.timeline-icon, .send-button');

interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.transform = 'scale(1)';
    });
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Typing animation for AI coach messages
const aiMessages = document.querySelectorAll('.chat-message.ai .message-content');
aiMessages.forEach(message => {
    const text = message.textContent;
    message.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            message.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.disconnect();
        }
    });

    observer.observe(message);
});

// Profile card hover effect
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Chat button animation
const chatBtn = document.querySelector('.chat-btn');
chatBtn.addEventListener('click', () => {
    chatBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        chatBtn.style.transform = 'scale(1)';
    }, 200);
});

// Gradient animation for hero section
const gradientBg = document.querySelector('.gradient-bg');
let gradientPosition = 0;
function animateGradient() {
    gradientPosition = (gradientPosition + 1) % 400;
    gradientBg.style.backgroundPosition = `${gradientPosition}% 50%`;
    requestAnimationFrame(animateGradient);
}
animateGradient();

// Enhanced parallax effect for How It Works section
window.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.step');
    const creatorSection = document.querySelector('.profile-card');
    
    steps.forEach(step => {
        const stepTop = step.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (stepTop < windowHeight * 0.8) {
            step.classList.add('visible');
        }
    });

    if (creatorSection) {
        const creatorTop = creatorSection.getBoundingClientRect().top;
        const scrolled = window.pageYOffset;
        const rate = creatorTop / 5;
        
        creatorSection.style.transform = `translateY(${rate}px)`;
    }
});

// Chat Interface Functionality
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chat-messages');
const typingIndicator = document.querySelector('.typing-indicator');

// Sample responses for demo
const aiResponses = [
    "You're doing great! Every minute without smoking is a victory. ",
    "Remember why you started this journey. Your health is worth it! ",
    "Try this quick exercise: Take 5 deep breaths and walk around for a minute. ",
    "Cravings are temporary, but the benefits of quitting are forever! ",
    "You've got this! I'm here to support you every step of the way. "
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${message}
        </div>
    `;
    
    // Remove typing indicator before adding new message
    typingIndicator.style.display = 'none';
    chatMessages.insertBefore(messageDiv, typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isUser) {
        // Show typing indicator for next potential message
        setTimeout(() => {
            typingIndicator.style.display = 'flex';
        }, 500);
    }
}

function handleUserMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, true);
        messageInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(response);
        }, 1500);
    }
}

// Event listeners for chat
sendButton.addEventListener('click', handleUserMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Timeline Cards Animation
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(180deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(0)';
    });
});

// ScrollReveal Animations
ScrollReveal().reveal('.timeline-item', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.chat-interface', {
    delay: 400,
    distance: '50px',
    duration: 1000,
    origin: 'right'
});

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.timeline-icon, .send-button');

interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.transform = 'scale(1)';
    });
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Typing animation for AI coach messages
const aiMessages = document.querySelectorAll('.chat-message.ai .message-content');
aiMessages.forEach(message => {
    const text = message.textContent;
    message.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            message.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.disconnect();
        }
    });

    observer.observe(message);
});

// Profile card hover effect
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Chat button animation
const chatBtn = document.querySelector('.chat-btn');
chatBtn.addEventListener('click', () => {
    chatBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        chatBtn.style.transform = 'scale(1)';
    }, 200);
});

// Gradient animation for hero section
const gradientBg = document.querySelector('.gradient-bg');
let gradientPosition = 0;
function animateGradient() {
    gradientPosition = (gradientPosition + 1) % 400;
    gradientBg.style.backgroundPosition = `${gradientPosition}% 50%`;
    requestAnimationFrame(animateGradient);
}
animateGradient();

// Enhanced parallax effect for How It Works section
window.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.step');
    const creatorSection = document.querySelector('.profile-card');
    
    steps.forEach(step => {
        const stepTop = step.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (stepTop < windowHeight * 0.8) {
            step.classList.add('visible');
        }
    });

    if (creatorSection) {
        const creatorTop = creatorSection.getBoundingClientRect().top;
        const scrolled = window.pageYOffset;
        const rate = creatorTop / 5;
        
        creatorSection.style.transform = `translateY(${rate}px)`;
    }
});

// Chat Interface Functionality
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chat-messages');
const typingIndicator = document.querySelector('.typing-indicator');

// Sample responses for demo
const aiResponses = [
    "You're doing great! Every minute without smoking is a victory. ",
    "Remember why you started this journey. Your health is worth it! ",
    "Try this quick exercise: Take 5 deep breaths and walk around for a minute. ",
    "Cravings are temporary, but the benefits of quitting are forever! ",
    "You've got this! I'm here to support you every step of the way. "
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${message}
        </div>
    `;
    
    // Remove typing indicator before adding new message
    typingIndicator.style.display = 'none';
    chatMessages.insertBefore(messageDiv, typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isUser) {
        // Show typing indicator for next potential message
        setTimeout(() => {
            typingIndicator.style.display = 'flex';
        }, 500);
    }
}

function handleUserMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, true);
        messageInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(response);
        }, 1500);
    }
}

// Event listeners for chat
sendButton.addEventListener('click', handleUserMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Timeline Cards Animation
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(180deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(0)';
    });
});

// ScrollReveal Animations
ScrollReveal().reveal('.timeline-item', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.chat-interface', {
    delay: 400,
    distance: '50px',
    duration: 1000,
    origin: 'right'
});

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.timeline-icon, .send-button');

interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.transform = 'scale(1)';
    });
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Typing animation for AI coach messages
const aiMessages = document.querySelectorAll('.chat-message.ai .message-content');
aiMessages.forEach(message => {
    const text = message.textContent;
    message.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            message.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.disconnect();
        }
    });

    observer.observe(message);
});

// Profile card hover effect
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Chat button animation
const chatBtn = document.querySelector('.chat-btn');
chatBtn.addEventListener('click', () => {
    chatBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        chatBtn.style.transform = 'scale(1)';
    }, 200);
});

// Gradient animation for hero section
const gradientBg = document.querySelector('.gradient-bg');
let gradientPosition = 0;
function animateGradient() {
    gradientPosition = (gradientPosition + 1) % 400;
    gradientBg.style.backgroundPosition = `${gradientPosition}% 50%`;
    requestAnimationFrame(animateGradient);
}
animateGradient();

// Enhanced parallax effect for How It Works section
window.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.step');
    const creatorSection = document.querySelector('.profile-card');
    
    steps.forEach(step => {
        const stepTop = step.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (stepTop < windowHeight * 0.8) {
            step.classList.add('visible');
        }
    });

    if (creatorSection) {
        const creatorTop = creatorSection.getBoundingClientRect().top;
        const scrolled = window.pageYOffset;
        const rate = creatorTop / 5;
        
        creatorSection.style.transform = `translateY(${rate}px)`;
    }
});

// Chat Interface Functionality
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chat-messages');
const typingIndicator = document.querySelector('.typing-indicator');

// Sample responses for demo
const aiResponses = [
    "You're doing great! Every minute without smoking is a victory. ",
    "Remember why you started this journey. Your health is worth it! ",
    "Try this quick exercise: Take 5 deep breaths and walk around for a minute. ",
    "Cravings are temporary, but the benefits of quitting are forever! ",
    "You've got this! I'm here to support you every step of the way. "
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${message}
        </div>
    `;
    
    // Remove typing indicator before adding new message
    typingIndicator.style.display = 'none';
    chatMessages.insertBefore(messageDiv, typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isUser) {
        // Show typing indicator for next potential message
        setTimeout(() => {
            typingIndicator.style.display = 'flex';
        }, 500);
    }
}

function handleUserMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, true);
        messageInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(response);
        }, 1500);
    }
}

// Event listeners for chat
sendButton.addEventListener('click', handleUserMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Timeline Cards Animation
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(180deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(0)';
    });
});

// ScrollReveal Animations
ScrollReveal().reveal('.timeline-item', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.chat-interface', {
    delay: 400,
    distance: '50px',
    duration: 1000,
    origin: 'right'
});

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.timeline-icon, .send-button');

interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.transform = 'scale(1)';
    });
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Typing animation for AI coach messages
const aiMessages = document.querySelectorAll('.chat-message.ai .message-content');
aiMessages.forEach(message => {
    const text = message.textContent;
    message.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            message.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.disconnect();
        }
    });

    observer.observe(message);
});

// Profile card hover effect
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Chat button animation
const chatBtn = document.querySelector('.chat-btn');
chatBtn.addEventListener('click', () => {
    chatBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        chatBtn.style.transform = 'scale(1)';
    }, 200);
});

// Gradient animation for hero section
const gradientBg = document.querySelector('.gradient-bg');
let gradientPosition = 0;
function animateGradient() {
    gradientPosition = (gradientPosition + 1) % 400;
    gradientBg.style.backgroundPosition = `${gradientPosition}% 50%`;
    requestAnimationFrame(animateGradient);
}
animateGradient();

// Enhanced parallax effect for How It Works section
window.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.step');
    const creatorSection = document.querySelector('.profile-card');
    
    steps.forEach(step => {
        const stepTop = step.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (stepTop < windowHeight * 0.8) {
            step.classList.add('visible');
        }
    });

    if (creatorSection) {
        const creatorTop = creatorSection.getBoundingClientRect().top;
        const scrolled = window.pageYOffset;
        const rate = creatorTop / 5;
        
        creatorSection.style.transform = `translateY(${rate}px)`;
    }
});

// Chat Interface Functionality
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chat-messages');
const typingIndicator = document.querySelector('.typing-indicator');

// Sample responses for demo
const aiResponses = [
    "You're doing great! Every minute without smoking is a victory. ",
    "Remember why you started this journey. Your health is worth it! ",
    "Try this quick exercise: Take 5 deep breaths and walk around for a minute. ",
    "Cravings are temporary, but the benefits of quitting are forever! ",
    "You've got this! I'm here to support you every step of the way. "
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${message}
        </div>
    `;
    
    // Remove typing indicator before adding new message
    typingIndicator.style.display = 'none';
    chatMessages.insertBefore(messageDiv, typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isUser) {
        // Show typing indicator for next potential message
        setTimeout(() => {
            typingIndicator.style.display = 'flex';
        }, 500);
    }
}

function handleUserMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, true);
        messageInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(response);
        }, 1500);
    }
}

// Event listeners for chat
sendButton.addEventListener('click', handleUserMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Timeline Cards Animation
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(180deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-card').style.transform = 'rotateY(0)';
    });
});

// ScrollReveal Animations
ScrollReveal().reveal('.timeline-item', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.chat-interface', {
    delay: 400,
    distance: '50px',
    duration: 1000,
    origin: 'right'
});

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.timeline-icon, .send-button');

interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.transform = 'scale(1)';
    });
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Typing animation for AI coach messages
const aiMessages = document.querySelectorAll('.chat-message.ai .message-content');
aiMessages.forEach(message => {
    const text = message.textContent;
    message.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            message.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.disconnect();
        }
    });

    observer.observe(message);
});

// Profile card hover effect
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
