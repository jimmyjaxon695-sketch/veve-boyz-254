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

// ===== LOADER =====
window.addEventListener('load', function() {
  setTimeout(function() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2200);
});

// ===== SCROLL PROGRESS + BACK TO TOP =====
window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = progress + '%';

  const btn = document.getElementById('back-to-top');
  if (btn) {
    if (scrollTop > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }
});

// ===== SIZE SELECTOR =====
function selectSize(btn) {
  const siblings = btn.parentElement.querySelectorAll('.size-btn');
  siblings.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ===== LIGHTBOX =====
const galleryImages = [
  { src: 'images/matatu-vibes.jpg', caption: 'Matatu Vibes 🚌' },
  { src: 'images/coast-road.jpeg', caption: 'Coast Road 🌊' },
  { src: 'images/rift-valley.jpeg', caption: 'Rift Valley 🏔️' },
  { src: 'images/safari-mode.jpeg', caption: 'Safari Mode 🦁' },
  { src: 'images/night-drives.jpg', caption: 'Night Drives 🌙' },
  { src: 'images/wedding-convoy.jpg', caption: 'Wedding Convoy 💍' },
  { src: 'images/gallery-02.jpeg', caption: 'Road Life 🛣️' },
  { src: 'images/gallery-03.jpeg', caption: 'The Journey 🌍' },
  { src: 'images/gallery-o1.jpeg', caption: 'Veve Boyz 🔥' }
];
let currentLightbox = 0;

function openLightbox(index) {
  currentLightbox = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  img.src = galleryImages[index].src;
  cap.textContent = galleryImages[index].caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  currentLightbox = (currentLightbox + dir + galleryImages.length) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentLightbox].src;
  document.getElementById('lightbox-caption').textContent = galleryImages[currentLightbox].caption;
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft') lightboxNav(-1);
});

// Attach lightbox to gallery items
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(function(item, i) {
    item.addEventListener('click', function() { openLightbox(i); });
  });
});

// ===== TRIP CALCULATOR =====
const prices = {
  destinations: { coast: 8000, rift: 4000, mara: 12000, nakuru: 3500, meru: 5000, naivasha: 3000 },
  services: { matatu: 1500, roadtrip: 3000, wedding: 10000, group: 2500 }
};

function calculatePrice() {
  const dest = document.getElementById('calc-destination').value;
  const service = document.getElementById('calc-service').value;
  const people = parseInt(document.getElementById('calc-people').value) || 1;
  const date = document.getElementById('calc-date').value;

  if (!dest || !service) return;

  const destPrice = prices.destinations[dest] || 0;
  const servicePrice = prices.services[service] || 0;
  let total = destPrice + servicePrice;

  // Weekend surcharge
  let surcharge = 0;
  if (date) {
    const day = new Date(date).getDay();
    if (day === 0 || day === 6) { surcharge = Math.round(total * 0.1); total += surcharge; }
  }

  document.getElementById('price-amount').textContent = 'KSh ' + total.toLocaleString();
  const breakdown = document.getElementById('price-breakdown');
  breakdown.innerHTML =
    '<div><span>Destination</span><span>KSh ' + destPrice.toLocaleString() + '</span></div>' +
    '<div><span>Service</span><span>KSh ' + servicePrice.toLocaleString() + '</span></div>' +
    (surcharge ? '<div><span>Weekend surcharge</span><span>KSh ' + surcharge.toLocaleString() + '</span></div>' : '') +
    '<div><span>People</span><span>' + people + '</span></div>' +
    '<div><span><strong>Total for group</strong></span><span><strong>KSh ' + (total * people).toLocaleString() + '</strong></span></div>';
}

function bookNowWhatsApp() {
  const dest = document.getElementById('calc-destination');
  const service = document.getElementById('calc-service');
  const people = document.getElementById('calc-people').value || '1';
  const date = document.getElementById('calc-date').value || 'TBD';
  const price = document.getElementById('price-amount').textContent;

  if (!dest.value || !service.value) { alert('Please select a destination and service first!'); return; }

  const msg = 'Hello Veve Boyz 254!%0A%0AI would like to book a trip:%0ADestination: ' + dest.options[dest.selectedIndex].text + '%0AService: ' + service.options[service.selectedIndex].text + '%0APeople: ' + people + '%0ADate: ' + date + '%0AEstimated Price: ' + price;
  window.open('https://wa.me/254726147471?text=' + msg, '_blank');
}

// ===== REFERRAL CODE =====
const validCodes = {
  'VEVE10': '10% OFF your booking!',
  'ROAD20': '20% OFF road trips!',
  'SQUAD15': '15% OFF group adventures!',
  'BRIDE25': '25% OFF wedding bookings!'
};

function applyReferral() {
  const code = document.getElementById('referral-input').value.trim().toUpperCase();
  const result = document.getElementById('referral-result');
  if (validCodes[code]) {
    result.textContent = '🎉 Code ' + code + ' applied — ' + validCodes[code];
    result.style.display = 'inline-block';
    result.style.color = '#16a34a';
    result.style.borderColor = '#16a34a';
  } else {
    result.textContent = '❌ Invalid code. Try VEVE10 for 10% off!';
    result.style.display = 'inline-block';
    result.style.color = '#e84c0a';
    result.style.borderColor = '#e84c0a';
  }
}
