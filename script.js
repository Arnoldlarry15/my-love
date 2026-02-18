window.addEventListener('load', function() {
  console.log('Valentine card initialized');
  
  // Particle system
  (function() {
    var container = document.getElementById('floatingParticles');
    if (container) {
      var particleCount = 0;
      var maxParticles = 30;
      
      var createParticles = function() {
        var interval = setInterval(function() {
          if (particleCount >= maxParticles) {
            clearInterval(interval);
            setTimeout(createParticles, 2000);
          } else {
            var particle = document.createElement('div');
            particle.className = 'floating-particle';
            var size = Math.random() * 8 + 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = '-20px';
            particle.style.animationDuration = (Math.random() * 4 + 5) + 's';
            particle.style.animationDelay = Math.random() * 1 + 's';
            container.appendChild(particle);
            particleCount += 1;
            setTimeout(function() { particle.remove(); }, 10000);
          }
        }, 300);
      };
      
      createParticles();
    }
  })();
  
  // Heart system
  (function() {
    var container = document.getElementById('floatingHearts');
    if (container) {
      var heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
      var heartCount = 0;
      var maxHearts = 40;
      
      var createHearts = function() {
        var interval = setInterval(function() {
          if (heartCount >= maxHearts) {
            clearInterval(interval);
            setTimeout(createHearts, 3000);
          } else {
            var heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-30px';
            heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
            heart.style.animationDelay = Math.random() * 1.5 + 's';
            container.appendChild(heart);
            heartCount += 1;
            setTimeout(function() { heart.remove(); }, 12000);
          }
        }, 600);
      };
      
      createHearts();
    }
  })();
  
  // Click heart effect
  var createClickHeart = function(x, y) {
    var heart = document.createElement('div');
    heart.className = 'click-heart';
    var hearts = ['💖', '❤️', '💕', '💗'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    setTimeout(function() { heart.remove(); }, 1000);
  };
  
  // Button interactions
  (function() {
    var button = document.getElementById('loveButton');
    var reasonsContainer = document.getElementById('reasonsContainer');
    var closeBtn = document.getElementById('closeReasonsBtn');
    
    if (button && reasonsContainer && closeBtn) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        var rect = button.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + rect.height / 2;
        
        for (var i = 0; i < 25; i++) {
          (function(idx) {
            setTimeout(function() {
              var offsetX = x + (Math.random() - 0.5) * 150;
              var offsetY = y + (Math.random() - 0.5) * 150;
              createClickHeart(offsetX, offsetY);
            }, idx * 40);
          })(i);
        }
        
        setTimeout(function() {
          button.style.opacity = '0';
          button.style.transform = 'scale(0.8)';
          button.style.pointerEvents = 'none';
          reasonsContainer.style.display = 'block';
          reasonsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      });
      
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
        button.style.pointerEvents = 'auto';
        reasonsContainer.style.display = 'none';
        setTimeout(function() {
          button.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      });
    }
  })();
  
  // Reason card interactions
  (function() {
    var reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(function(card) {
      var emoji = card.querySelector('.reason-emoji');
      
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
        var rect = card.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + rect.height / 2;
        
        for (var i = 0; i < 8; i++) {
          (function(idx) {
            setTimeout(function() {
              var offsetX = x + (Math.random() - 0.5) * 80;
              var offsetY = y + (Math.random() - 0.5) * 80;
              createClickHeart(offsetX, offsetY);
            }, idx * 50);
          })(i);
        }
      });
    });
  })();
  
  // Global click hearts
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.surprise-button') && 
        !e.target.closest('.reason-card') && 
        !e.target.closest('.close-reasons-btn')) {
      var x = e.clientX || window.innerWidth / 2;
      var y = e.clientY || window.innerHeight / 2;
      createClickHeart(x, y);
    }
  });
  
  // Scroll effects
  (function() {
    var elements = document.querySelectorAll('.fade-in');
    var observer = new IntersectionObserver(function(entries) {
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
  })();
  
  console.log('All animations initialized');
});
