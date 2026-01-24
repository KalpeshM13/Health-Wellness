document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.mockup-feature');
    const solutionText = document.getElementById('solution-text-content');
    if (!features.length || !solutionText) return;

    const featureInfo = {
        'ai-chat': `
            <h3>AI-guided First-Aid Support</h3>
            <p>Interactive chat box that offers coping strategies and refers students to professionals when needed. Provides immediate emotional support and crisis intervention.</p>
            <div class="solution-benefits">
                <div class="benefit"><i class="fas fa-check-circle"></i><span>24/7 Available</span></div>
                <div class="benefit"><i class="fas fa-check-circle"></i><span>Crisis Support</span></div>
                <div class="benefit"><i class="fas fa-check-circle"></i><span>Professional Referral</span></div>
            </div>
        `,
        'booking': `
            <h3>Confidential Booking System</h3>
            <p>Secure appointment booking for on-campus counselors or mental health helplines. Ensures privacy and removes barriers to seeking help.</p>
            <div class="solution-benefits">
                <div class="benefit"><i class="fas fa-check-circle"></i><span>Privacy Protected</span></div>
                <div class="benefit"><i class="fas fa-check-circle"></i><span>Easy Scheduling</span></div>
                <div class="benefit"><i class="fas fa-check-circle"></i><span>Reminder System</span></div>
            </div>
        `,
        'resources': `
            <h3>Psychoeducational Resource Hub</h3>
            <p>Comprehensive library of videos, relaxation audio, and mental wellness guides available in regional languages for cultural relevance.</p>
            <div class="solution-benefits">
                <div class="benefit"><i class="fas fa-check-circle"></i><span>Multilingual</span></div>
                <div class="benefit"><i class="fas fa-check-circle"></i><span>Cultural Context</span></div>
                <div class="benefit"><i class="fas fa-check-circle"></i><span>Self-Help Tools</span></div>
            </div>
        `
    };

    features.forEach(f => {
        f.addEventListener('click', function () {
            features.forEach(x => x.classList.remove('active'));
            this.classList.add('active');
            const key = this.getAttribute('data-feature');
            if (featureInfo[key]) {
                solutionText.innerHTML = featureInfo[key];
            }
        });
    });
});