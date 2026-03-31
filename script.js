// ============================================
// BELLE SALUTE | SCRIPT SYSTEM INTERACTION
// ============================================

// 1. HEADER SCROLL & MOBILE MENU
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// 2. ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll('section[id], header[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  document.querySelectorAll('.nav-links a.nav-item').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
}, { passive: true });

// 3. INTERSECTION OBSERVER (Fade-up)
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(el => fadeObserver.observe(el));
});

// 4. COUNTER ANIMATION (HERO/ABOUT STATS)
function animateCounter(el, target) {
  let start = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const elYears = document.getElementById('stat-years');
      const elClients = document.getElementById('stat-clients');
      const elProcs = document.getElementById('stat-procs');
      
      if(elYears) animateCounter(elYears, 11);
      if(elProcs) animateCounter(elProcs, 30);
      
      if(elClients) {
        let count = 0;
        const speed = 5000 / (2000 / 16);
        const t = setInterval(() => {
          count += Math.floor(speed);
          if (count >= 5000) { 
            elClients.textContent = '5.000+'; 
            clearInterval(t); 
          } else { 
            elClients.textContent = (count / 1000).toFixed(1).replace('.', ',') + 'k'; 
          }
        }, 16);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

// 5. PARALLAX EFFECT (IMAGES DE PROFUNDIDADE)
const parallaxImages = document.querySelectorAll('.parallax-img');
window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    parallaxImages.forEach(img => {
      // Calculate position relative to viewport
      const rect = img.parentElement.getBoundingClientRect();
      const scrollPos = window.innerHeight - rect.top;
      // Parallax intensity (0.1 means 10% translation)
      const intensity = 0.1; 
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yOffset = (scrollPos * intensity) - 30; // -30 is base offset
        img.style.transform = `translateY(${yOffset}px)`;
      }
    });
  });
}, { passive: true });

// 6. FAQ ACCORDION LOGIC
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const inner = item.querySelector('.faq-answer-inner');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all others
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.height = '0px';
      }
    });
    
    // Toggle current
    if (isActive) {
      item.classList.remove('active');
      answer.style.height = '0px';
    } else {
      item.classList.add('active');
      answer.style.height = inner.getBoundingClientRect().height + 'px';
    }
  });
});

// 7. FORM SUBMIT HANDLER
function submitForm(e) {
  e.preventDefault();
  const form = document.querySelector('#formContato');
  const btn = form.querySelector('button[type="submit"]');
  
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = 'Processando...';
  
  const nome = form.nome.value.trim();
  const tel = form.telefone.value.trim();
  const servico = form.servico.value;
  
  const wppMessage = encodeURIComponent(
    `Olá, Concierge Belle Salute.\n\nGostaria de solicitar uma triagem.\n\n` +
    `*Nome:* ${nome}\n` +
    `*Telefone:* ${tel}\n` +
    `*Dossiê de Interesse:* ${servico}`
  );
  
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = originalText;
    
    // Redirect WhatsApp
    window.open(`https://wa.me/5562999999999?text=${wppMessage}`, '_blank');
    form.reset();
  }, 600);
}

const formContato = document.getElementById('formContato');
if(formContato) formContato.addEventListener('submit', submitForm);
