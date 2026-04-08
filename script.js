
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.querySelector('.theme-toggle-label');
const storedTheme = localStorage.getItem('anay_theme');

if (storedTheme === 'light') {
  body.classList.remove('theme-dark');
  body.classList.add('theme-light');
  themeLabel.textContent = 'Dark';
}

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('theme-light');
  if (isLight) {
    body.classList.remove('theme-dark');
    localStorage.setItem('anay_theme', 'light');
    themeLabel.textContent = 'Dark';
  } else {
    body.classList.add('theme-dark');
    localStorage.setItem('anay_theme', 'dark');
    themeLabel.textContent = 'Light';
  }
});

const filters = document.querySelectorAll('.filter');
const masonryItems = document.querySelectorAll('.masonry-item');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    masonryItems.forEach((item) => {
      const category = item.dataset.category || '';
      item.style.display = filter === 'all' || category.includes(filter) ? 'inline-block' : 'none';
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');

document.querySelectorAll('.card-hit').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.dataset.title;
    lightboxTitle.textContent = button.dataset.title;
    lightboxCaption.textContent = button.dataset.caption;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeViewer() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

closeLightbox.addEventListener('click', closeViewer);
lightbox.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') closeViewer();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeViewer();
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((item) => observer.observe(item));
