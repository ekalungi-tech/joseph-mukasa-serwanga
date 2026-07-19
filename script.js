const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const backToTop = document.querySelector('.back-to-top');

navToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 600);
});

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('.video-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    const videoId = placeholder.dataset.videoId;
    if (!videoId || videoId.startsWith('YOUR_')) {
      alert('Add a valid YouTube video ID in index.html before publishing.');
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.className = 'video-frame';
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1`;
    iframe.title = 'YouTube campaign video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    placeholder.replaceWith(iframe);
  });
});

const form = document.getElementById('support-form');
const formStatus = document.getElementById('form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const phone = data.get('phone');
  const interest = data.get('interest');
  const message = data.get('message');

  const text = `Hello Joseph Mukasa Serwanga Campaign,%0A%0AMy name is ${encodeURIComponent(name)}.%0AMy telephone number is ${encodeURIComponent(phone)}.%0AI would like to: ${encodeURIComponent(interest)}.%0A%0AMessage: ${encodeURIComponent(message || 'No additional message.')}`;
  const campaignNumber = '256700000000'; // Replace with the official WhatsApp number.
  formStatus.textContent = 'Opening WhatsApp. Replace the sample campaign number in script.js before publishing.';
  window.open(`https://wa.me/${campaignNumber}?text=${text}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
