// Create floating particles
function createFloatingParticles() {
    const container = document.getElementById('floatingParticles');
    if (!container) {
        return;
    }

    let particleCount = 0;
    const maxParticles = 30;

    const particleInterval = setInterval(function() {
        if (particleCount >= maxParticles) {
            clearInterval(particleInterval);
            setTimeout(function() {
                createFloatingParticles();
            }, 2000);
            return;
        }

        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-20px';
        particle.style.animationDuration = (Math.random() * 4 + 5) + 's';
        particle.style.animationDelay = Math.random() * 1 + 's';

        container.appendChild(particle);
        particleCount++;

        setTimeout(function() {
            particle.remove();
        }, 10000);
    }, 300);
}

// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) {
        return;
    }

    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    let heartCount = 0;
    const maxHearts = 40;

    const heartInterval = setInterval(function() {
        if (heartCount >= maxHearts) {
            clearInterval(heartInterval);
            setTimeout(function() {
                createFloatingHearts();
            }, 3000);
            return;
        }

        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-30px';
        heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
        heart.style.animationDelay = Math.random() * 1.5 + 's';

        container.appendChild(heart);
        heartCount++;

        setTimeout(function() {
            heart.remove();
        }, 12000);
    }, 600);
}

// Create click hearts
function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    const hearts = ['💖', '❤️', '💕', '💗'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    document.body.appendChild(heart);

    setTimeout(function() {
        heart.remove();
    }, 1000);
}

// Initialize button interaction
function initializeButtonInteraction() {
    const button = document.getElementById('loveButton');
    const reasonsContainer = document.getElementById('reasonsContainer');
    const closeBtn = document.getElementById('closeReasonsBtn');

    if (!button || !reasonsContainer || !closeBtn) {
        console.error('Required elements not found');
        return;
    }

    function handleButtonClick(e) {
        e.preventDefault();
        
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        for (let i = 0; i < 25; i++) {
            setTimeout(function() {
                const offsetX = x + (Math.random() - 0.5) * 150;
                const offsetY = y + (Math.random() - 0.5) * 150;
                createClickHeart(offsetX, offsetY);
            }, i * 40);
        }

        setTimeout(function() {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
            button.style.pointerEvents = 'none';

            reasonsContainer.style.display = 'block';
            void reasonsContainer.offsetWidth;
            
            reasonsContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }

    function handleCloseClick(e) {
        e.preventDefault();

        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
        button.style.pointerEvents = 'auto';
        reasonsContainer.style.display = 'none';

        setTimeout(function() {
            button.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    }

    button.addEventListener('click', handleButtonClick);
    button.addEventListener('touchend', handleButtonClick);
    closeBtn.addEventListener('click', handleCloseClick);
    closeBtn.addEventListener('touchend', handleCloseClick);

    addReasonCardEffects();
}

// Add reason card effects
function addReasonCardEffects() {
    const reasonCards = document.querySelectorAll('.reason-card');

    reasonCards.forEach(function(card) {
        const emoji = card.querySelector('.reason-emoji');

        card.addEventListener('mouseenter', function() {
            emoji.style.animation = 'none';
            setTimeout(function() {
                emoji.style.animation = 'emojiSpin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 10);
        });

        card.addEventListener('mouseleave', function() {
            emoji.style.animation = 'emojiFloat 3s ease-in-out infinite';
        });

        card.addEventListener('click', function() {
            const rect = card.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            for (let i = 0; i < 8; i++) {
                setTimeout(function() {
                    const offsetX = x + (Math.random() - 0.5) * 80;
                    const offsetY = y + (Math.random() - 0.5) * 80;
                    createClickHeart(offsetX, offsetY);
                }, i * 50);
            }
        });
    });
}

// Global click hearts
document.addEventListener('click', function(e) {
    if (!e.target.closest('.surprise-button') && 
        !e.target.closest('.reason-card') && 
        !e.target.closest('.close-reasons-btn')) {
        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || window.innerHeight / 2;
        createClickHeart(x, y);
    }
});

document.addEventListener('touchend', function(e) {
    if (!e.target.closest('.surprise-button') && 
        !e.target.closest('.reason-card') && 
        !e.target.closest('.close-reasons-btn')) {
        const touch = e.changedTouches && e.changedTouches[0];
        if (touch) {
            createClickHeart(touch.clientX, touch.clientY);
        }
    }
});

// Initialize scroll effects
function initializeScrollEffects() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(element) {
        observer.observe(element);
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c💖 Happy Valentine\'s Day! 💖', 
        'font-size: 28px; color: #FF1654; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%cMade with love for Stacey ❤️', 
        'font-size: 14px; color: #FF1654; font-style: italic; margin-top: 10px;');

    createFloatingParticles();
    createFloatingHearts();
    initializeButtonInteraction();
    initializeScrollEffects();

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const parallexElements = document.querySelectorAll('.hero-section');
                parallexElements.forEach(function(el) {
                    el.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
                });
                ticking = false;
            });
            ticking = true;
        }
    });
});

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('Welcome back! 💕');
    }
});
