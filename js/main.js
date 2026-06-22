const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '60px';
  navLinks.style.right = '20px';
  navLinks.style.background = '#1a1a1a';
  navLinks.style.padding = '20px 28px';
  navLinks.style.border = '1px solid #333';
  navLinks.style.gap = '20px';
});

let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) { existing.qty += 1; } else { cart.push({ name, price, qty: 1 }); }
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart-items');
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');
  list.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = '<span>' + item.name + ' x' + item.qty + '</span><span>KSh ' + (item.price * item.qty).toLocaleString() + '</span>';
    list.appendChild(li);
  });
  countEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  totalEl.textContent = total.toLocaleString();
}

function checkout() {
  if (cart.length === 0) { alert('Your cart is empty!'); return; }
  const items = cart.map(i => i.name + ' x' + i.qty + ' = KSh ' + (i.price * i.qty).toLocaleString()).join('%0A');
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const msg = 'Hello Veve Boyz 254! I would like to order:%0A' + items + '%0A%0ATotal: KSh ' + total.toLocaleString();
  window.open('https://wa.me/254726147471?text=' + msg, '_blank');
}

function sendWhatsApp() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();
  if (!name || !service) { alert('Please fill in your name and select a service.'); return; }
  const msg = 'Hello Veve Boyz 254!%0A%0AName: ' + name + '%0APhone: ' + phone + '%0AService: ' + service + '%0AMessage: ' + message;
  window.open('https://wa.me/254726147471?text=' + msg, '_blank');
}

document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===========================
// OCCASION HERO THEME
// ===========================

function applyOccasionTheme() {
  const occasion = getOccasion();
  if (!occasion) return;

  const style = document.createElement('style');
  style.textContent = `
    /* Override hero glow with occasion color */
    .hero::after {
      background: radial-gradient(circle, ${occasion.color}26 0%, transparent 70%) !important;
    }
    .hero::before {
      background-image:
        linear-gradient(${occasion.color}0d 1px, transparent 1px),
        linear-gradient(90deg, ${occasion.color}0d 1px, transparent 1px) !important;
    }
    .hero-eyebrow {
      color: ${occasion.color} !important;
      text-shadow: 0 0 20px ${occasion.color}66 !important;
    }
    .hero-logo {
      border-color: ${occasion.color} !important;
      box-shadow: 0 0 40px ${occasion.color}66, 0 0 80px ${occasion.color}22 !important;
    }
    .navbar {
      border-bottom-color: ${occasion.color}55 !important;
      box-shadow: 0 4px 30px ${occasion.color}22 !important;
    }
    .nav-logo span {
      color: ${occasion.color} !important;
      text-shadow: 0 0 20px ${occasion.color}66 !important;
    }
    .section-eyebrow {
      color: ${occasion.color} !important;
      text-shadow: 0 0 15px ${occasion.color}66 !important;
    }
    .btn-outline {
      border-color: ${occasion.color}88 !important;
    }
    .btn-outline:hover {
      border-color: ${occasion.color} !important;
      color: ${occasion.color} !important;
      box-shadow: 0 0 20px ${occasion.color}66 !important;
    }
    .service-card::before {
      background: linear-gradient(90deg, transparent, ${occasion.color}, transparent) !important;
    }
    .service-card:hover {
      border-color: ${occasion.color}88 !important;
      box-shadow: 0 20px 40px ${occasion.color}26 !important;
    }
    .gallery-item:hover {
      border-color: ${occasion.color}88 !important;
      box-shadow: 0 10px 40px ${occasion.color}33 !important;
    }
    .gallery-item span {
      border-color: ${occasion.color}55 !important;
    }
    .contact-item strong {
      color: ${occasion.color} !important;
    }
    .contact-form input:focus,
    .contact-form select:focus,
    .contact-form textarea:focus {
      border-color: ${occasion.color} !important;
      box-shadow: 0 0 15px ${occasion.color}33 !important;
    }
    .footer-logo span {
      color: ${occasion.color} !important;
      text-shadow: 0 0 20px ${occasion.color}66 !important;
    }
    ::-webkit-scrollbar-thumb {
      background: ${occasion.color} !important;
    }
  `;
  document.head.appendChild(style);

  // Also add floating occasion emoji particles in hero
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.textContent = occasion.emoji;
      particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 1.5 + 0.8}rem;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.15 + 0.05};
        z-index: 1;
        pointer-events: none;
        animation: floatParticle ${Math.random() * 6 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
      `;
      hero.appendChild(particle);
    }

    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
      @keyframes floatParticle {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.08; }
        50% { transform: translateY(-30px) rotate(10deg); opacity: 0.18; }
      }
    `;
    document.head.appendChild(particleStyle);
  }
}

window.addEventListener('load', applyOccasionTheme);
