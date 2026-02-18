var init = function() {
  var createClickHeart = function(x, y) {
    var heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = '💖';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    setTimeout(function() {
      heart.remove();
    }, 1000);
  };

  var setupParticles = function() {
    var container = document.getElementById('floatingParticles');
    if (container) {
      var count = 0;
      var max = 30;
      var interval = setInterval(function() {
        if (count >= max) {
          clearInterval(interval);
          setTimeout(setupParticles, 2000);
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
          count = count + 1;
          setTimeout(function() {
            particle.remove();
          }, 10000);
        }
      }, 300);
    }
  };

  var setupHearts = function() {
    var container = document.getElementById('floatingHearts');
    if (container) {
      var emojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
      var count = 0;
      var max = 40;
      var interval = setInterval(function() {
        if (count >= max) {
          clearInterval(interval);
          setTimeout(setupHearts, 3000);
        } else {
          var heart = document.createElement('div');
          heart.className = 'floating-heart';
          heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          heart.style.left = Math.random() * 100 + '%';
          heart.style.bottom = '-30px';
          heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
          heart.style.animationDelay = Math.random() * 1.5 + 's';
          container.appendChild(heart);
          count = count + 1;
          setTimeout(function() {
            heart.remove();
          }, 12000);
        }
      }, 600);
    }
  };

  var setupButton = function() {
    var button = document.getElementById('loveButton');
    var reasonsContainer = document.getElementById('reasonsContainer');
    var closeBtn = document.getElementById('closeReasonsBtn');
    
    if (button && reasonsContainer && closeBtn) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        var rect = button.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + rect.height / 2;
        
        var i = 0;
        while (i < 25) {
          (function(idx) {
            setTimeout(function() {
              var offsetX = x + (Math.random() - 0.5) * 150;
              var offsetY = y + (Math.random() - 0.5) * 150;
              createClickHeart(offsetX, offsetY);
            }, idx * 40);
          })(i);
          i = i + 1;
        }
        
        setTimeout(function() {
          button.style.opacity = '0';
          button.style.transform = 'scale(0.8)';
          button.style.pointerEvents = 'none';
          reasonsContainer.style.display = 'block';
          reasonsContainer.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 300);
      });
      
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
        button.style.pointerEvents = 'auto';
        reasonsContainer.style.display = 'none';
        setTimeout(function() {
          button.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 100);
      });
    }
  };

  var setupCards = function() {
    var cards = document.querySelectorAll('.reason-card');
    cards.forEach(function(card) {
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
        
        var i = 0;
        while (i < 8) {
          (function(idx) {
            setTimeout(function() {
              var offsetX = x + (Math.random() - 0.5) * 80;
              var offsetY = y + (Math.random() - 0.5) * 80;
              createClickHeart(offsetX, offsetY);
            }, idx * 50);
          })(i);
          i = i + 1;
        }
      });
    });
  };

  var setupGlobalClicks = function() {
    document.addEventListener('click', function(e) {
      var isButton = e.target.closest('.surprise-button');
      var isCard = e.target.closest('.reason-card');
      var isClose = e.target.closest('.close-reasons-btn');
      
      if (!isButton && !isCard && !isClose) {
        var x = e.clientX || window.innerWidth / 2;
        var y = e.clientY || window.innerHeight / 2;
        createClickHeart(x, y);
      }
    });
  };

  setupParticles();
  setupHearts();
  setupButton();
  setupCards();
  setupGlobalClicks();
};

document.addEventListener('DOMContentLoaded', init);
