// Theme handling
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Load saved theme
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', currentTheme === 'dark');
themeSwitch.checked = currentTheme === 'dark';

// Theme Toggle Function
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Save the new theme
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to current page
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Apply saved theme on page load
function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle switch state
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
    }
}

// Theme switch handler
themeSwitch.addEventListener('change', toggleTheme);

// Language handling
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = localStorage.getItem('language') || 'en';

// Load saved language
document.documentElement.lang = currentLang;
document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
highlightSelectedLanguage();

// Language switch handler
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', currentLang);
        translatePage();
        highlightSelectedLanguage();
    });
});

// Translate the page
function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}

// Highlight selected language
function highlightSelectedLanguage() {
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

// Initial translation
translatePage();
applyTheme();
