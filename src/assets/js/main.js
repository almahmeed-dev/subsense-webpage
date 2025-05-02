// JavaScript for interactive behaviors (e.g., signup form validation)
document.addEventListener('DOMContentLoaded', () => {
  const mcForm = document.getElementById('mc-embedded-subscribe-form');
  if (mcForm) {
    mcForm.addEventListener('submit', function(e) {
      // TODO: handle form submit via AJAX
    });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      console.log('Menu toggle clicked');
      siteNav.classList.toggle('open');
    });
  }
});
