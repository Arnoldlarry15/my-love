console.log('Script loaded');

var clickHearts = function(x, y) {
  var h = document.createElement('div');
  h.className = 'click-heart';
  h.textContent = '💖';
  h.style.left = x + 'px';
  h.style.top = y + 'px';
  document.body.appendChild(h);
  setTimeout(function() { h.remove(); }, 1000);
};

var startParticles = function() {
  var c = document.getElementById('floatingParticles');
  if (c) {
    var n = 0;
    var t = setInterval(function() {
      if (n >= 30) { 
        clearInterval(t); 
        setTimeout(startParticles, 2000); 
      } else {
        var p = document.createElement('div');
        p.className = 'floating-particle';
        p.style.width = (Math.random() * 8 + 4) + 'px';
        p.style.height = p.style.width;
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = '-20px';
        p.style.animationDuration = (Math.random() * 4 + 5) + 's';
        p.style.animationDelay = Math.random() * 1 + 's';
        c.appendChild(p);
        n++;
        setTimeout(function() { p.remove(); }, 10000);
      }
    }, 300);
  }
};

var startHearts = function() {
  var c = document.getElementById('floatingHearts');
  if (c) {
    var e = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    var n = 0;
    var t = setInterval(function() {
      if (n >= 40) { 
        clearInterval(t); 
        setTimeout(startHearts, 3000); 
      } else {
        var h = document.createElement('div');
        h.className = 'floating-heart';
        h.textContent = e[Math.floor(Math.random() * e.length)];
        h.style.left = Math.random() * 100 + '%';
        h.style.bottom = '-30px';
        h.style.animationDuration = (Math.random() * 3 + 6) + 's';
        h.style.animationDelay = Math.random() * 1.5 + 's';
        c.appendChild(h);
        n++;
        setTimeout(function() { h.remove(); }, 12000);
      }
    }, 600);
  }
};

var setupButton = function() {
  var b = document.getElementById('loveButton');
  var r = document.getElementById('reasonsContainer');
  var cb = document.getElementById('closeReasonsBtn');
  
  if (b && r && cb) {
    b.onclick = function(e) {
      e.preventDefault();
      var rect = b.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      for (var i = 0; i < 25; i++) {
        (function(idx) {
          setTimeout(function() {
            clickHearts(x + (Math.random() - 0.5) * 150, y + (Math.random() - 0.5) * 150);
          }, idx * 40);
        })(i);
      }
      setTimeout(function() {
        b.style.opacity = '0';
        b.style.transform = 'scale(0.8)';
        b.style.pointerEvents = 'none';
        r.style.display = 'block';
        r.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    };
    
    cb.onclick = function(e) {
      e.preventDefault();
      b.style.opacity = '1';
      b.style.transform = 'scale(1)';
      b.style.pointerEvents = 'auto';
      r.style.display = 'none';
      setTimeout(function() { b.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
    };
    
    var cards = document.querySelectorAll('.reason-card');
    cards.forEach(function(card) {
      card.onclick = function() {
        var rect = card.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + rect.height / 2;
        for (var i = 0; i < 8; i++) {
          (function(idx) {
            setTimeout(function() {
              clickHearts(x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80);
            }, idx * 50);
          })(i);
        }
      };
    });
  }
};

document.onclick = function(e) {
  if (!e.target.closest('.surprise-button') && !e.target.closest('.reason-card') && !e.target.closest('.close-reasons-btn')) {
    clickHearts(e.clientX || 0, e.clientY || 0);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM ready');
  startParticles();
  startHearts();
  setupButton();
});
