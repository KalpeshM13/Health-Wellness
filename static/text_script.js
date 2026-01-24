// Assessment data storage
let assessmentData = {
    phase1: [],
    phase2: [],
    phase3: [],
    scores: {
        physical: 0,
        mental: 0,
        lifestyle: 0,
        overall: 0
    }
};

let phaseChart = null;
let distributionChart = null;
let trendChart = null;

document.addEventListener('DOMContentLoaded', function() {
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateRealTimeScores();
        });
    });
});

function updateRealTimeScores() {
    // Calculate scores for current phase
    const currentPhase = getCurrentPhase();
    if (currentPhase === 1) {
        calculatePhase1Score();
    } else if (currentPhase === 2) {
        calculatePhase1Score();
        calculatePhase2Score();
    } else if (currentPhase === 3) {
        calculatePhase1Score();
        calculatePhase2Score();
        calculatePhase3Score();
    }
    
    // Update progress bar
    updateProgressBar();
}

function getCurrentPhase() {
    if (!document.getElementById('phase1').classList.contains('hidden')) return 1;
    if (!document.getElementById('phase2').classList.contains('hidden')) return 2;
    if (!document.getElementById('phase3').classList.contains('hidden')) return 3;
    return 0;
}

function calculatePhase1Score() {
    let score = 0;
    for (let i = 1; i <= 6; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            score += parseInt(selected.value);
        }
    }
    assessmentData.scores.physical = score;
    assessmentData.phase1 = Array.from({length: 6}, (_, i) => {
        const selected = document.querySelector(`input[name="q${i+1}"]:checked`);
        return selected ? parseInt(selected.value) : 0;
    });
}

function calculatePhase2Score() {
    let score = 0;
    for (let i = 7; i <= 12; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            score += parseInt(selected.value);
        }
    }
    assessmentData.scores.mental = score;
    assessmentData.phase2 = Array.from({length: 6}, (_, i) => {
        const selected = document.querySelector(`input[name="q${i+7}"]:checked`);
        return selected ? parseInt(selected.value) : 0;
    });
}

function calculatePhase3Score() {
    let score = 0;
    for (let i = 13; i <= 18; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            score += parseInt(selected.value);
        }
    }
    assessmentData.scores.lifestyle = score;
    assessmentData.phase3 = Array.from({length: 6}, (_, i) => {
        const selected = document.querySelector(`input[name="q${i+13}"]:checked`);
        return selected ? parseInt(selected.value) : 0;
    });
}

function updateProgressBar() {
    const currentPhase = getCurrentPhase();
    const progress = (currentPhase / 3) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Phase ${currentPhase} of 3`;
}

function nextPhase(currentPhase) {
    // Validate current phase is complete
    if (currentPhase === 1) {
        if (!validatePhase(1, 6)) {
            alert('Please answer all questions in Phase 1 before proceeding.');
            return;
        }
        calculatePhase1Score();
        document.getElementById('phase1').classList.add('hidden');
        document.getElementById('phase2').classList.remove('hidden');
    } else if (currentPhase === 2) {
        if (!validatePhase(7, 12)) {
            alert('Please answer all questions in Phase 2 before proceeding.');
            return;
        }
        calculatePhase2Score();
        document.getElementById('phase2').classList.add('hidden');
        document.getElementById('phase3').classList.remove('hidden');
    }
    updateProgressBar();
}

function validatePhase(startQ, endQ) {
    for (let i = startQ; i <= endQ; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) {
            return false;
        }
    }
    return true;
}

function completeAssessment() {
    if (!validatePhase(13, 18)) {
        alert('Please answer all questions in Phase 3 before viewing results.');
        return;
    }
    
    calculatePhase3Score();
    
    // Calculate overall score
    assessmentData.scores.overall = 
        assessmentData.scores.physical + 
        assessmentData.scores.mental + 
        assessmentData.scores.lifestyle;
    
    document.getElementById('phase3').classList.add('hidden');
    document.getElementById('analytics').classList.remove('hidden');
    
    initializeAnimatedGradient();
    
    displayScores();
    
    generateCharts();
    
    generateRecommendations();
}

function displayScores() {
    document.getElementById('physicalScore').textContent = assessmentData.scores.physical;
    document.getElementById('mentalScore').textContent = assessmentData.scores.mental;
    document.getElementById('lifestyleScore').textContent = assessmentData.scores.lifestyle;
    document.getElementById('overallScore').textContent = assessmentData.scores.overall;
    
    // Overall score label
    const overallLabel = document.getElementById('overallLabel');
    const percentage = (assessmentData.scores.overall / 90) * 100;
    if (percentage >= 80) {
        overallLabel.textContent = 'Excellent Health';
        overallLabel.style.color = '#4caf50';
    } else if (percentage >= 60) {
        overallLabel.textContent = 'Good Health';
        overallLabel.style.color = '#8bc34a';
    } else if (percentage >= 40) {
        overallLabel.textContent = 'Fair Health';
        overallLabel.style.color = '#ff9800';
    } else {
        overallLabel.textContent = 'Needs Improvement';
        overallLabel.style.color = '#f44336';
    }
}

function generateCharts() {
    // Phase Comparison Chart (Bar Chart)
    const phaseCtx = document.getElementById('phaseChart').getContext('2d');
    if (phaseChart) phaseChart.destroy();
    phaseChart = new Chart(phaseCtx, {
        type: 'bar',
        data: {
            labels: ['Physical Health', 'Mental Health', 'Lifestyle'],
            datasets: [{
                label: 'Health Scores',
                data: [
                    assessmentData.scores.physical,
                    assessmentData.scores.mental,
                    assessmentData.scores.lifestyle
                ],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(102, 126, 234, 0.6)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(102, 126, 234, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 30,
                    ticks: {
                        stepSize: 5
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Distribution Chart (Doughnut Chart)
    const distCtx = document.getElementById('distributionChart').getContext('2d');
    if (distributionChart) distributionChart.destroy();
    distributionChart = new Chart(distCtx, {
        type: 'doughnut',
        data: {
            labels: ['Physical Health', 'Mental Health', 'Lifestyle'],
            datasets: [{
                data: [
                    assessmentData.scores.physical,
                    assessmentData.scores.mental,
                    assessmentData.scores.lifestyle
                ],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(76, 175, 80, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(76, 175, 80, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Trend Analysis Chart (Line Chart showing question-by-question scores)
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    if (trendChart) trendChart.destroy();
    
    const allScores = [
        ...assessmentData.phase1,
        ...assessmentData.phase2,
        ...assessmentData.phase3
    ];
    
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 18}, (_, i) => `Q${i + 1}`),
            datasets: [{
                label: 'Question Scores',
                data: allScores,
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

function generateRecommendations() {
    const recommendations = [];
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    // Physical Health Recommendations
    if (assessmentData.scores.physical < 18) {
        recommendations.push({
            category: 'Physical Health',
            priority: 'High',
            message: 'Your physical health score is below optimal. Consider improving sleep quality, increasing physical activity, and maintaining a balanced diet.'
        });
    } else if (assessmentData.scores.physical < 24) {
        recommendations.push({
            category: 'Physical Health',
            priority: 'Medium',
            message: 'Your physical health is good but could be improved. Focus on consistent exercise and better sleep patterns.'
        });
    }
    
    // Mental Health Recommendations
    if (assessmentData.scores.mental < 18) {
        recommendations.push({
            category: 'Mental Health',
            priority: 'High',
            message: 'Your mental health needs attention. Consider stress management techniques, mindfulness practices, and seeking professional support if needed.'
        });
    } else if (assessmentData.scores.mental < 24) {
        recommendations.push({
            category: 'Mental Health',
            priority: 'Medium',
            message: 'Your mental health is decent. Practice regular relaxation and maintain social connections.'
        });
    }
    
    // Lifestyle Recommendations
    if (assessmentData.scores.lifestyle < 18) {
        recommendations.push({
            category: 'Lifestyle',
            priority: 'High',
            message: 'Improve your lifestyle habits by reducing screen time, maintaining work-life balance, and establishing healthy routines.'
        });
    } else if (assessmentData.scores.lifestyle < 24) {
        recommendations.push({
            category: 'Lifestyle',
            priority: 'Medium',
            message: 'Your lifestyle is generally good. Focus on hydration and regular breaks throughout the day.'
        });
    }
    
    // Overall Recommendations
    if (assessmentData.scores.overall >= 75) {
        recommendations.push({
            category: 'Overall',
            priority: 'Low',
            message: 'Excellent overall health! Continue maintaining your healthy habits and routines.'
        });
    } else if (assessmentData.scores.overall >= 60) {
        recommendations.push({
            category: 'Overall',
            priority: 'Medium',
            message: 'Good health overall. Focus on the areas with lower scores to optimize your well-being.'
        });
    } else {
        recommendations.push({
            category: 'Overall',
            priority: 'High',
            message: 'Your health assessment indicates areas needing attention. Consider consulting with healthcare professionals and making gradual lifestyle improvements.'
        });
    }
    
    // Display recommendations
    recommendations.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        const priorityColor = rec.priority === 'High' ? '#f44336' : rec.priority === 'Medium' ? '#ff9800' : '#4caf50';
        item.innerHTML = `
            <strong style="color: ${priorityColor}">${rec.category} (${rec.priority} Priority)</strong>
            <span>${rec.message}</span>
        `;
        recommendationsList.appendChild(item);
    });
}

function initializeAnimatedGradient() {
    const container = document.getElementById('animatedGradient');
    if (!container) return;
    
    // Clear existing gradient
    container.innerHTML = '';
    
    // Get container dimensions
    const analyticsDashboard = document.getElementById('analytics');
    const width = analyticsDashboard.offsetWidth;
    const height = analyticsDashboard.offsetHeight;
    const circleSize = Math.max(width, height);
    
    // Define colors based on health scores
    const colors = [
        '#667eea', // Purple
        '#764ba2', // Dark purple
        '#f093fb', // Pink
        '#4facfe', // Blue
        '#00f2fe', // Cyan
        '#43e97b'  // Green
    ];
    
    // Blur level
    const blurClass = 'gradient-blur-light';
    
    // Create blur container
    const blurContainer = document.createElement('div');
    blurContainer.className = blurClass;
    blurContainer.style.position = 'absolute';
    blurContainer.style.inset = '0';
    
    // Create SVG circles
    colors.forEach((color, index) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'animate-background-gradient gradient-circle');
        
        // Random positions
        const top = Math.random() * 50;
        const left = Math.random() * 50;
        
        // Random transform values
        const tx1 = Math.random() - 0.5;
        const ty1 = Math.random() - 0.5;
        const tx2 = Math.random() - 0.5;
        const ty2 = Math.random() - 0.5;
        const tx3 = Math.random() - 0.5;
        const ty3 = Math.random() - 0.5;
        const tx4 = Math.random() - 0.5;
        const ty4 = Math.random() - 0.5;
        
        // Random size multiplier
        const sizeMultiplier = 0.5 + Math.random();
        const svgSize = circleSize * sizeMultiplier;
        
        svg.setAttribute('width', svgSize);
        svg.setAttribute('height', svgSize);
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.position = 'absolute';
        svg.style.top = `${top}%`;
        svg.style.left = `${left}%`;
        svg.style.setProperty('--background-gradient-speed', `${5}s`);
        svg.style.setProperty('--tx-1', tx1);
        svg.style.setProperty('--ty-1', ty1);
        svg.style.setProperty('--tx-2', tx2);
        svg.style.setProperty('--ty-2', ty2);
        svg.style.setProperty('--tx-3', tx3);
        svg.style.setProperty('--ty-3', ty3);
        svg.style.setProperty('--tx-4', tx4);
        svg.style.setProperty('--ty-4', ty4);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', '50');
        circle.setAttribute('fill', color);
        circle.style.opacity = '0.3';
        
        svg.appendChild(circle);
        blurContainer.appendChild(svg);
    });
    
    container.appendChild(blurContainer);
}

function restartAssessment() {
    // Reset all data
    assessmentData = {
        phase1: [],
        phase2: [],
        phase3: [],
        scores: {
            physical: 0,
            mental: 0,
            lifestyle: 0,
            overall: 0
        }
    };
    
    // Clear all radio button selections
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Destroy charts
    if (phaseChart) phaseChart.destroy();
    if (distributionChart) distributionChart.destroy();
    if (trendChart) trendChart.destroy();
    
    // Clear animated gradient
    const gradientContainer = document.getElementById('animatedGradient');
    if (gradientContainer) {
        gradientContainer.innerHTML = '';
    }
    
    // Reset UI
    document.getElementById('analytics').classList.add('hidden');
    document.getElementById('phase1').classList.remove('hidden');
    document.getElementById('phase2').classList.add('hidden');
    document.getElementById('phase3').classList.add('hidden');
    
    updateProgressBar();
}

