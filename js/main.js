document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark-theme') {
    document.body.classList.add('dark-theme');
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) icon.className = 'bx bx-sun';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const icon = themeToggleBtn.querySelector('i');
      
      let theme = 'light-theme';
      if (document.body.classList.contains('dark-theme')) {
        theme = 'dark-theme';
        if (icon) icon.className = 'bx bx-sun';
      } else {
        if (icon) icon.className = 'bx bx-moon';
      }
      localStorage.setItem('theme', theme);
    });
  }

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const faqAnswer = question.nextElementSibling;
      const isActive = faqItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get values (optional, for validation or analytic tracking)
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const email = document.getElementById('form-email').value;
      const service = document.getElementById('form-service').value;
      const message = document.getElementById('form-message').value;

      // Mocking submission: store name in localstorage to display custom greeting in obrigado.html
      localStorage.setItem('clientName', name);

      // Redirect to thank you page
      window.location.href = 'obrigado.html';
    });
  }

  // Scroll Entrance Animations
  const animateElements = document.querySelectorAll('[data-animate]');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Animates only once
      }
    });
  }, observerOptions);

  animateElements.forEach(el => {
    observer.observe(el);
  });
});
