'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const progessBars = document.querySelectorAll('.skills__progessbar');

  function handleIntersection(entries, observe) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('d');
        const progessBar = entry.target;
        const percentage = progessBar.querySelector('.skills__percentage');
        const text = percentage.querySelector(
          '.skills__percentage-text',
        ).textContent;
        const value = parseInt(text, 10);
        percentage.style.width = value - 1 + '%';
        observer.unobserve(progessBar);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });

  progessBars.forEach((bar) => {
    observer.observe(bar);
  });
});
