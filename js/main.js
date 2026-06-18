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
