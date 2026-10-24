// WhatsApp number, international format, digits only.
const WHATSAPP_NUMBER = '201204667925';
const WA_MESSAGE = "Hi Yassin, I'd like to discuss a video for my product.\nProduct: \nHow I see it, my vision: \nReferences: \nBudget: \nGoal of the video: ";

// Ranked 1 (highest) to 8 (lowest). Order here is the display order.
const projects = [1, 2, 3, 4, 5, 6, 7, 8].map(n => ({
  rank: n,
  src: `${n}.mp4`,
  poster: `posters/${n}.jpg`,
  title: `Project ${String(n).padStart(2, '0')}`,
}));

const grid = document.getElementById('grid');
const pad = n => String(n).padStart(2, '0');

projects.forEach((p, i) => {
  const card = document.createElement('button');
  card.className = `card rank-${p.rank}`;
  card.type = 'button';
  card.setAttribute('aria-label', `Play ${p.title}`);
  card.innerHTML = `
    <div class="thumb">
      <span class="badge">${pad(p.rank)}</span><span class="corner tl"></span><span class="corner br"></span>
      <img src="${p.poster}" alt="" loading="lazy">
      <video muted loop playsinline preload="none"></video>
    </div>
    <div class="meta"><span class="label">${p.title}</span><span class="label">Play</span></div>`;
  const v = card.querySelector('video');
  const start = () => {
    if (!v.src) v.src = p.src;
    v.play().then(() => card.classList.add('playing')).catch(() => {});
  };
  const stop = () => { v.pause(); card.classList.remove('playing'); };
  if (matchMedia('(hover:hover)').matches) {
    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);
  }
  card.addEventListener('click', () => { stop(); openLb(i); });
  grid.appendChild(card);
});

// Lightbox
const lb = document.getElementById('lb');
const lbVideo = document.getElementById('lbVideo');
const lbCap = document.getElementById('lbCap');
const prev = document.getElementById('lbPrev');
const next = document.getElementById('lbNext');
let cur = 0;

function show(i) {
  cur = i;
  lbVideo.src = projects[i].src;
  lbVideo.poster = projects[i].poster;
  lbVideo.play().catch(() => {});
  lbCap.textContent = `${pad(projects[i].rank)} / ${pad(projects.length)}  ${projects[i].title}`;
  prev.disabled = i === 0;
  next.disabled = i === projects.length - 1;
}
function openLb(i) { lb.hidden = false; document.body.style.overflow = 'hidden'; show(i); }
function closeLb() { lb.hidden = true; lbVideo.pause(); lbVideo.removeAttribute('src'); lbVideo.load(); document.body.style.overflow = ''; }

document.getElementById('lbClose').onclick = closeLb;
prev.onclick = () => cur > 0 && show(cur - 1);
next.onclick = () => cur < projects.length - 1 && show(cur + 1);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') prev.click();
  if (e.key === 'ArrowRight') next.click();
});

// WhatsApp links
document.querySelectorAll('[data-wa]').forEach(a => {
  if (WHATSAPP_NUMBER) {
    a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
    a.target = '_blank';
    a.rel = 'noopener';
  }
});

document.getElementById('yr').textContent = new Date().getFullYear();

// Theme: oxblood (dark) by default, cream (light) on toggle
const themeBtn = document.getElementById('theme');
const root = document.documentElement;
const syncTheme = () => { themeBtn.textContent = root.dataset.theme === 'light' ? 'Dark' : 'Light'; };
themeBtn.addEventListener('click', () => {
  const t = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = t;
  try { localStorage.setItem('yo-theme', t); } catch (e) {}
  syncTheme();
});
syncTheme();

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.section-head, .card, .services article, .steps li, .doc, .contact > *').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  io.observe(el);
});
