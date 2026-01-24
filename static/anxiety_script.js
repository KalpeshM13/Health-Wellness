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

// Breathing Exercise Timer
let breathingInterval;
let currentPhase = 0;
let timeRemaining = 0;
const phases = [
    { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose' },
    { name: 'Hold', duration: 7, instruction: 'Hold your breath' },
    { name: 'Exhale', duration: 8, instruction: 'Breathe out slowly through your mouth' }
];

function startBreathing() {
    const button = document.querySelector('.breathing-button');
    const timer = document.getElementById('breathing-timer');
    
    if (breathingInterval) {
        // Stop the exercise
        clearInterval(breathingInterval);
        breathingInterval = null;
        button.textContent = 'Start Breathing Exercise';
        timer.classList.add('hidden');
        timer.classList.remove('active');
        currentPhase = 0;
        timeRemaining = 0;
    } else {
        // Start the exercise
        button.textContent = 'Stop Exercise';
        timer.classList.remove('hidden');
        timer.classList.add('active');
        currentPhase = 0;
        timeRemaining = phases[0].duration;
        updateTimer();
        breathingInterval = setInterval(updateBreathing, 1000);
    }
}

function updateBreathing() {
    const timer = document.getElementById('breathing-timer');
    
    if (timeRemaining > 0) {
        timer.innerHTML = `
            <div>
                <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">${phases[currentPhase].instruction}</div>
                <div style="font-size: 3rem;">${timeRemaining}</div>
            </div>
        `;
        timeRemaining--;
    } else {
        // Move to next phase
        currentPhase = (currentPhase + 1) % phases.length;
        timeRemaining = phases[currentPhase].duration;
        
        if (currentPhase === 0) {
            // Completed one full cycle
            timer.innerHTML = `
                <div>
                    <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">Cycle complete! Continue or stop.</div>
                    <div style="font-size: 2rem; color: #10b981;">✓</div>
                </div>
            `;
            // Pause for 2 seconds before next cycle
            setTimeout(() => {
                timeRemaining = phases[currentPhase].duration;
                updateTimer();
            }, 2000);
        } else {
            updateTimer();
        }
    }
}

function updateTimer() {
    const timer = document.getElementById('breathing-timer');
    timer.innerHTML = `
        <div>
            <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">${phases[currentPhase].instruction}</div>
            <div style="font-size: 3rem;">${timeRemaining}</div>
        </div>
    `;
}

// Add scroll animation for cards
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

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.solution-card, .technique-item, .resource-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
