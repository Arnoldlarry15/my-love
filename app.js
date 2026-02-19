var app = {
  init: function() {
    this.setupAnimations();
    this.setupButton();
    this.setupCards();
    this.setupClicks();
  },

  createHeart: function(x, y) {
    var heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = '💖';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    var self = this;
    setTimeout(function() {
      heart.remove();
    }, 1000);
  },

  setupAnimations: function() {
    var self = this;
    
    var particleContainer = document.getElementById('floatingParticles');
    if (particleContainer) {
      var particleCount = 0;
      setInterval(function() {
        if (particleCount < 30) {
          var p = document.createElement('div');
          p.className = 'floating-particle';
          var sz = Math.random() * 8 + 4;
          p.style.width = sz + 'px';
          p.style.height = sz + 'px';
          p.style.left = Math.random() * 100 + '%';
          p.style.bottom = '-20px';
          p.style.animationDuration = (Math.random() * 4 + 5) + 's';
          p.style.animationDelay = Math.random() * 1 + 's';
          particleContainer.appendChild(p);
          particleCount = particleCount + 1;
          setTimeout(function() { p.remove(); }, 10000);
        }
      }, 300);
    }
    
    var heartContainer = document.getElementById('floatingHearts');
    if (heartContainer) {
      var hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
      var heartCount = 0;
      setInterval(function() {
        if (heartCount < 40) {
          var h = document.createElement('div');
          h.className = 'floating-heart';
          h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
          h.style.left = Math.random() * 100 + '%';
          h.style.bottom = '-30px';
          h.style.animationDuration = (Math.random() * 3 + 6) + 's';
          h.style.animationDelay = Math.random() * 1.5 + 's';
          heartContainer.appendChild(h);
          heartCount = heartCount + 1;
          setTimeout(function() { h.remove(); }, 12000);
        }
      }, 600);
    }
  },

  setupButton: function() {
    var self = this;
    var button = document.getElementById('loveButton');
    var reasons = document.getElementById('reasonsContainer');
    var closeBtn = document.getElementById('closeReasonsBtn');
    
    if (button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        var rect = button.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + rect.height / 2;
        
        for (var i = 0; i < 25; i++) {
          (function(idx) {
            setTimeout(function() {
              self.createHeart(x + (Math.random() - 0.5) * 150, y + (Math.random() - 0.5) * 150);
            }, idx * 40);
          })(i);
        }
        
        if (reasons) {
          setTimeout(function() {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
            button.style.pointerEvents = 'none';
            reasons.style.display = 'block';
            reasons.scrollIntoView({behavior: 'smooth', block: 'start'});
          }, 300);
        }
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (button && reasons) {
          button.style.opacity = '1';
          button.style.transform = 'scale(1)';
          button.style.pointerEvents = 'auto';
          reasons.style.display = 'none';
          setTimeout(function() {
            button.scrollIntoView({behavior: 'smooth', block: 'center'});
          }, 100);
        }
      });
    }
  },

  setupCards: function() {
    var self = this;
    var cards = document.querySelectorAll('.reason-card');
    
    cards.forEach(function(card) {
      var emoji = card.querySelector('.reason-emoji');
      
      card.addEventListener('mouseenter', function() {
        if (emoji) {
          emoji.style.animation = 'none';
          setTimeout(function() {
            emoji.style.animation = 'emojiSpin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          }, 10);
        }
      });
      
      card.addEventListener('mouseleave', function() {
        if (emoji) {
          emoji.style.animation = 'emojiFloat 3s ease-in-out infinite';
        }
      });
      
      card.addEventListener('click', function() {
        var rect = card.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + rect.height / 2;
        
        for (var i = 0; i < 8; i++) {
          (function(idx) {
            setTimeout(function() {
              self.createHeart(x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80);
            }, idx * 50);
          })(i);
        }
      });
    });
  },

  setupClicks: function() {
    var self = this;
    document.addEventListener('click', function(e) {
      var isButton = e.target.closest('.surprise-button');
      var isCard = e.target.closest('.reason-card');
      var isClose = e.target.closest('.close-reasons-btn');
      
      if (!isButton && !isCard && !isClose) {
        var x = e.clientX || 0;
        var y = e.clientY || 0;
        self.createHeart(x, y);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  app.init();
});
