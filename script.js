// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to chatbot function
function scrollToChatbot() {
    document.querySelector('#chatbot').scrollIntoView({
        behavior: 'smooth'
    });
}

// Chatbot functionality
const chatLog = document.getElementById('chatLog');
const userInput = document.getElementById('userInput');

// Store conversation history
let conversationHistory = [];

function createMessageElement(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = text;
    return messageDiv;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Add user message to chat and history
    chatLog.appendChild(createMessageElement(message, true));
    conversationHistory.push({ role: "user", content: message });
    userInput.value = '';

    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'ai-message');
    loadingDiv.textContent = 'Thinking...';
    chatLog.appendChild(loadingDiv);

    try {
        const response = await fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are AI Quiteasy, a helpful and friendly AI assistant. Keep your responses concise and engaging." },
                    ...conversationHistory
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const aiResponse = data.choices[0].message.content;
            // Remove loading message
            chatLog.removeChild(loadingDiv);
            // Add AI response
            chatLog.appendChild(createMessageElement(aiResponse, false));
            conversationHistory.push({ role: "assistant", content: aiResponse });
        } else {
            throw new Error('Invalid API response');
        }
    } catch (error) {
        console.error('Error:', error);
        // Remove loading message
        chatLog.removeChild(loadingDiv);
        // Show error message
        chatLog.appendChild(createMessageElement("Sorry, I'm having trouble connecting right now. Please try again later.", false));
    }

    // Scroll to bottom of chat
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Handle Enter key in chat input
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Contact form submission
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Placeholder for form submission
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Add initial welcome message
window.addEventListener('load', () => {
    const welcomeMessage = "Hello! I'm AI Quiteasy. How can I assist you today?";
    chatLog.appendChild(createMessageElement(welcomeMessage, false));
});

// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Chat Functionality
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatLogMobile = document.querySelector('.chat-log');

if (messageInput && sendButton && chatLogMobile) {
    const appendMessage = (message, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        messageDiv.textContent = message;
        chatLogMobile.appendChild(messageDiv);
        chatLogMobile.scrollTop = chatLogMobile.scrollHeight;
    };

    const sendMessageMobile = async () => {
        const message = messageInput.value.trim();
        if (!message) return;

        // Add user message to chat
        appendMessage(message, true);
        messageInput.value = '';

        try {
            const response = await fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            appendMessage(data.response);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Sorry, I encountered an error. Please try again later.');
        }
    };

    sendButton.addEventListener('click', sendMessageMobile);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessageMobile();
        }
    });
}

// Particles Background
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});
