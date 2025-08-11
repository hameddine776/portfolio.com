// Navbar shadow + back-to-top visibility
(function () {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrolled = window.scrollY > 12;
    navbar.classList.toggle('scrolled', scrolled);

    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Typing effect
(function () {
  const el = document.getElementById('typing');
  if (!el) return;
  const phrases = ['des sites vitrines', 'des boutiques en ligne', 'des menus interactifs', 'des sites web'];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    const delay = deleting ? 45 : 85;
    setTimeout(type, delay);
  }
  type();
})();

// Reveal on scroll + progress bars animation
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  const progressBars = document.querySelectorAll('.progress-bar[data-progress]');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          if (entry.target.classList.contains('skill-card')) {
            const bar = entry.target.querySelector('.progress-bar[data-progress]');
            if (bar) {
              const target = Number(bar.getAttribute('data-progress')) || 0;
              bar.style.width = target + '%';
            }
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => io.observe(el));

  // Fallback if IntersectionObserver not available
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('revealed'));
    progressBars.forEach((bar) => {
      const target = Number(bar.getAttribute('data-progress')) || 0;
      bar.style.width = target + '%';
    });
  }
})();

// Projects filter
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.parentElement.style.display = show ? '' : 'none';
      });
    });
  });
})();

// CV Download functionality
(function () {
  const cvDownloadBtn = document.querySelector('a[href="cv.pdf"]');
  
  if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', function(e) {
      // Add loading state
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Téléchargement...';
      this.style.pointerEvents = 'none';
      
      // Simulate download delay for better UX
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check me-2"></i>CV téléchargé !';
        this.style.background = 'linear-gradient(45deg, #22c55e, #16a34a)';
        
        // Reset after 3 seconds
        setTimeout(() => {
          this.innerHTML = originalText;
          this.style.background = '';
          this.style.pointerEvents = '';
        }, 3000);
      }, 1500);
    });
  }
})();
