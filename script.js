// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💞'];
    let heartCount = 0;
    const maxHearts = 50;
    
    const heartInterval = setInterval(() => {
        if (heartCount >= maxHearts) {
            clearInterval(heartInterval);
            return;
        }
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        heartCount++;
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 500);
}

// Create sparkles
function createSparkles() {
    const container = document.getElementById('sparklesContainer');
    let sparkleCount = 0;
    const maxSparkles = 100;
    
    const sparkleInterval = setInterval(() => {
        if (sparkleCount >= maxSparkles) {
            clearInterval(sparkleInterval);
            return;
        }
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() + 's';
        
        container.appendChild(sparkle);
        sparkleCount++;
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, 200);
}

// Click effect
function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = '💖';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Handle button click
function handleLoveButtonClick() {
    const button = document.getElementById('loveButton');
    const reasonsGrid = document.getElementById('reasonsGrid');
    
    function handleButtonAction(e) {
        // Prevent default behavior
        e.preventDefault();
        
        // Get coordinates, supporting both mouse and touch events
        const x = e.clientX || (e.touches && e.touches[0].clientX) || (e.changedTouches && e.changedTouches[0].clientX) || window.innerWidth / 2;
        const y = e.clientY || (e.touches && e.touches[0].clientY) || (e.changedTouches && e.changedTouches[0].clientY) || window.innerHeight / 2;
        
        // Create burst of hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const offsetX = x + (Math.random() - 0.5) * 100;
                const offsetY = y + (Math.random() - 0.5) * 100;
                createClickHeart(offsetX, offsetY);
            }, i * 50);
        }
        
        // Show reasons grid
        setTimeout(() => {
            reasonsGrid.style.display = 'grid';
            button.style.display = 'none';
        }, 500);
    }
    
    // Add both click and touch event listeners for better mobile support
    button.addEventListener('click', handleButtonAction);
    button.addEventListener('touchend', handleButtonAction);
}

// Add click hearts anywhere on screen (supporting both mouse and touch)
document.addEventListener('click', function(e) {
    // Don't add hearts for button clicks
    if (!e.target.closest('.love-button') && !e.target.closest('.reason-card')) {
        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || window.innerHeight / 2;
        createClickHeart(x, y);
    }
});

// Add touch support for hearts
document.addEventListener('touchend', function(e) {
    // Don't add hearts for button or card touches
    if (!e.target.closest('.love-button') && !e.target.closest('.reason-card')) {
        const touch = e.changedTouches && e.changedTouches[0];
        if (touch) {
            createClickHeart(touch.clientX, touch.clientY);
        }
    }
});

// Add hover effect for cards
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createSparkles();
    handleLoveButtonClick();
    
    // Add special hover effect to reason cards
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(card => {
        const emoji = card.querySelector('.reason-emoji');
        card.addEventListener('mouseenter', function() {
            emoji.style.transition = 'transform 0.3s ease';
            emoji.style.transform = 'scale(1.3) rotate(15deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            emoji.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add a special message to console
console.log('%c💖 Happy Valentine\'s Day! 💖', 'font-size: 30px; color: #ff6b9d; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cMade with love ❤️', 'font-size: 16px; color: #f093fb; font-style: italic;');
