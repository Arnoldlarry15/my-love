(function() {
  'use strict';

  // Floating Particles
  function createFloatingParticles() {
    var container = document.getElementById('floatingParticles');
    if (!container) return;

    var particleCount = 0;
    var maxParticles = 30;

    var particleInterval = setInterval(function() {
      if (particleCount >= maxParticles) {
        clearInterval(particleInterval);
        setTimeout(createFloatingParticles, 2000);
        return;
      }

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

      setTimeout(function() {
        particle.remove();
      }, 10000);
    }, 300);
  }

  // Floating Hearts
  function createFloatingHearts() {
    var container = document.getElementById('floatingHearts');
    if (!container) return;

    var heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    var heartCount = 0;
    var maxHearts = 40;

    var heartInterval = setInterval(function() {
      if (heartCount >= maxHearts) {
        clearInterval(heartInterval);
        setTimeout(createFloatingHearts, 3000);
        return;
      }

      var heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.bottom = '-30px';
      heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
      heart.style.animationDelay = Math.random() * 1.5 + 's';

      container.appendChild(heart);
      heartCount += 1;

      setTimeout(function() {
        heart.remove();
      }, 12000);
    }, 600);
  }

  // Click Heart Burst
  function createClickHeart(x, y) {
    var heart = document.createElement('div');
    heart.className = 'click-heart';
    var hearts = ['💖', '❤️', '💕', '💗'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    document.body.appendChild(heart);

    setTimeout(function() {
      heart.remove();
    }, 1000);
  }

  // Button Interaction
  function initializeButtonInteraction() {
    var button = document.getElementById('loveButton');
    var reasonsContainer = document.getElementById('reasonsContainer');
    var closeBtn = document.getElementById('closeReasonsBtn');

    if (!button || !reasonsContainer || !closeBtn) {
      console.error('Required elements not found');
      return;
    }

    function handleButtonClick(e) {
      e.preventDefault();
      
      var rect = button.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;

      var i;
      for (i = 0; i < 25; i++) {
        (function(index) {
          setTimeout(function() {
            var offsetX = x + (Math.random() - 0.5) * 150;
            var offsetY = y + (Math.random() - 0.5) * 150;
            createClickHeart(offsetX, offsetY);
          }, index * 40);
        })(i);
      }

      setTimeout(function() {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.8)';
        button.style.pointerEvents = 'none';
        reasonsContainer.style.display = 'block';
        void reasonsContainer.offsetWidth;
        reasonsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }

    function handleCloseClick(e) {
      e.preventDefault();
      button.style.opacity = '1';
      button.style.transform = 'scale(1)';
      button.style.pointerEvents = 'auto';
      reasonsContainer.style.display = 'none';

      setTimeout(function() {
        button.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }

    button.addEventListener('click', handleButtonClick);
    button.addEventListener('touchend', handleButtonClick);
    closeBtn.addEventListener('click', handleCloseClick);
    closeBtn.addEventListener('touchend', handleCloseClick);

    addReasonCardEffects();
  }

  // Reason Card Effects
  function addReasonCardEffects() {
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

        var i;
        for (i = 0; i < 8; i++) {
          (function(index) {
            setTimeout(function() {
              var offsetX = x + (Math.random() - 0.5) * 80;
              var offsetY = y + (Math.random() - 0.5) * 80;
              createClickHeart(offsetX, offsetY);
            }, index * 50);
          })(i);
        }
      });
    });
  }

  // Global Click Hearts
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.surprise-button') && 
        !e.target.closest('.reason-card') && 
        !e.target.closest('.close-reasons-btn')) {
      var x = e.clientX || window.innerWidth / 2;
      var y = e.clientY || window.innerHeight / 2;
      createClickHeart(x, y);
    }
  });

  document.addEventListener('touchend', function(e) {
    if (!e.target.closest('.surprise-button') && 
        !e.target.closest('.reason-card') && 
        !e.target.closest('.close-reasons-btn')) {
      var touch = e.changedTouches && e.changedTouches[0];
      if (touch) {
        createClickHeart(touch.clientX, touch.clientY);
      }
    }
  });

  // Scroll Effects
  function initializeScrollEffects() {
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
  }

  // Initialization
  document.addEventListener('DOMContentLoaded', function() {
    console.log('%c💖 Happy Valentine\'s Day! 💖', 
      'font-size: 28px; color: #FF1654; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%cMade with love for Stacey ❤️', 
      'font-size: 14px; color: #FF1654; font-style: italic; margin-top: 10px;');

    createFloatingParticles();
    createFloatingHearts();
    initializeButtonInteraction();
    initializeScrollEffects();

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          var scrolled = window.pageYOffset;
          var parallexElements = document.querySelectorAll('.hero-section');
          parallexElements.forEach(function(el) {
            el.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  });

  // Page Visibility
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      console.log('Welcome back! 💕');
    }
  });

})();
