function initValentinesCard() {
  console.log('Starting init');
  
  var createClickHeart = function(x, y) {
    var h = document.createElement('div');
    h.className = 'click-heart';
    h.textContent = '💖';
    h.style.left = x + 'px';
    h.style.top = y + 'px';
    document.body.appendChild(h);
    setTimeout(function() {
      h.remove();
    }, 1000);
  };
  
  var container = document.getElementById('floatingParticles');
  if (container) {
    var n = 0;
    setInterval(function() {
      if (n < 30) {
        var p = document.createElement('div');
        p.className = 'floating-particle';
        var sz = Math.random() * 8 + 4;
        p.style.width = sz + 'px';
        p.style.height = sz + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = '-20px';
        p.style.animationDuration = (Math.random() * 4 + 5) + 's';
        p.style.animationDelay = Math.random() * 1 + 's';
        container.appendChild(p);
        n = n + 1;
        setTimeout(function() {
          p.remove();
        }, 10000);
      }
    }, 300);
  }
  
  var hcont = document.getElementById('floatingHearts');
  if (hcont) {
    var emojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    var hc = 0;
    setInterval(function() {
      if (hc < 40) {
        var h = document.createElement('div');
        h.className = 'floating-heart';
        h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        h.style.left = Math.random() * 100 + '%';
        h.style.bottom = '-30px';
        h.style.animationDuration = (Math.random() * 3 + 6) + 's';
        h.style.animationDelay = Math.random() * 1.5 + 's';
        hcont.appendChild(h);
        hc = hc + 1;
        setTimeout(function() {
          h.remove();
        }, 12000);
      }
    }, 600);
  }
  
  var btn = document.getElementById('loveButton');
  var reasons = document.getElementById('reasonsContainer');
  var closeBtn = document.getElementById('closeReasonsBtn');
  
  if (btn && reasons && closeBtn) {
    btn.onclick = function(e) {
      e.preventDefault();
      var rect = btn.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      
      var i = 0;
      while (i < 25) {
        (function(idx) {
          setTimeout(function() {
            createClickHeart(cx + (Math.random() - 0.5) * 150, cy + (Math.random() - 0.5) * 150);
          }, idx * 40);
        })(i);
        i = i + 1;
      }
      
      setTimeout(function() {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';
        btn.style.pointerEvents = 'none';
        reasons.style.display = 'block';
        reasons.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    };
    
    closeBtn.onclick = function(e) {
      e.preventDefault();
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1)';
      btn.style.pointerEvents = 'auto';
      reasons.style.display = 'none';
      setTimeout(function() {
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    };
  }
  
  var cards = document.querySelectorAll('.reason-card');
  cards.forEach(function(card) {
    var emoji = card.querySelector('.reason-emoji');
    
    card.onmouseenter = function() {
      emoji.style.animation = 'none';
      setTimeout(function() {
        emoji.style.animation = 'emojiSpin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }, 10);
    };
    
    card.onmouseleave = function() {
      emoji.style.animation = 'emojiFloat 3s ease-in-out infinite';
    };
    
    card.onclick = function() {
      var rect = card.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var j = 0;
      while (j < 8) {
        (function(idx) {
          setTimeout(function() {
            createClickHeart(cx + (Math.random() - 0.5) * 80, cy + (Math.random() - 0.5) * 80);
          }, idx * 50);
        })(j);
        j = j + 1;
      }
    };
  });
  
  document.onclick = function(e) {
    if (!e.target.closest('.surprise-button') && !e.target.closest('.reason-card') && !e.target.closest('.close-reasons-btn')) {
      createClickHeart(e.clientX || 0, e.clientY || 0);
    }
  };
  
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
  
  console.log('Init complete');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initValentinesCard);
} else {
  initValentinesCard();
}
