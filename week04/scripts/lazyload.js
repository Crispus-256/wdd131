document.addEventListener("DOMContentLoaded", () => {
  const lastEl = document.getElementById('last-modified');
  if (lastEl) {
    lastEl.textContent = new Date(document.lastModified).toLocaleString();
  }

  const images = Array.from(document.querySelectorAll("img[loading='lazy']"));

  const revealImage = (img) => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      }, { once: true });
    }
  };

  if ('IntersectionObserver' in window && images.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          revealImage(img);
          obs.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    });

    images.forEach(img => observer.observe(img));
  } else {
    images.forEach(img => revealImage(img));
  }
});