const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.topic-card, .tool-card, .stories-carousel-wrapper, .connect-card, .parent-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);


const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);


document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image-container');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});


function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}


if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


const sectionHeaders = document.querySelectorAll('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, { threshold: 0.2 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    headerObserver.observe(header);
});

const carouselItems = document.querySelectorAll('.story-item');
if (carouselItems.length > 0) {
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    function updateCarousel() {
        carouselItems.forEach((item, index) => {

            item.classList.remove('active', 'prev', 'next', 'prev-hidden', 'next-hidden');

      
            let diff = (index - currentIndex + totalItems) % totalItems;

            if (diff === 0) {
                item.classList.add('active');
            } else if (diff === 1) {
                item.classList.add('next');
            } else if (diff === totalItems - 1) {
                item.classList.add('prev');
            } else if (diff === 2) {
                item.classList.add('next-hidden');
            } else if (diff === totalItems - 2) {
                item.classList.add('prev-hidden');
            }
     
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

   
    updateCarousel();

    
    let carouselInterval = setInterval(nextSlide, 3000);

    
    const carouselWrapper = document.querySelector('.stories-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            clearInterval(carouselInterval); // Clear just in case
            carouselInterval = setInterval(nextSlide, 3000);
        });
    }
}


// Chatbot functionality - wrapped in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbotIcon');
    const chatModal = document.getElementById('chatModal');
    const closeBtn = document.getElementById('closeChat');
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const sendBtn = document.getElementById('sendBtn');

    // Check if elements exist
    if (!chatbotIcon || !chatModal || !userInput || !chatBox) {
        return;
    }

    // Toggle modal on icon click
    chatbotIcon.addEventListener('click', () => {
        chatModal.classList.toggle('active');
        if (chatModal.classList.contains('active')) {
            userInput.focus();
        }
    });

    // Close modal on close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatbotIcon.contains(e.target) && !chatModal.contains(e.target)) {
            chatModal.classList.remove('active');
        }
    });

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        // Add user message to chat
        addMessage(message, "user-message");
        userInput.value = "";

        // Send API request
        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Chat request failed (${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            addMessage(data.response || "I could not generate a response. Please try again.", "bot-message");
        })
        .catch(() => {
            addMessage("Sorry, I encountered an error. Please try again.", "bot-message");
        });
    }

    // Add message to chat
    function addMessage(text, className) {
        const msgDiv = document.createElement("div");
        msgDiv.className = className;
        msgDiv.textContent = text;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Expose sendMessage to window for onclick handler
    window.sendMessage = sendMessage;
});