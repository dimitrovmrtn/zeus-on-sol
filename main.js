/* ==========================================================================
   $ZEUS MEMECOIN - INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* --- Custom Cursor Logic --- */
  const cursor = document.querySelector('.custom-cursor');
  
  // Detect touch devices to disable custom cursor
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (cursor && !isTouchDevice) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
      // Use requestAnimationFrame for smoother performance
      window.requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    });
    
    // Add hover classes to cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .render-image-container, .social-icon, .nav-logo, .ca-box');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  }

  /* --- Contract Address Copy Logic --- */
  const copyBtn = document.getElementById('copy-btn');
  const caText = document.getElementById('ca-text');
  const tooltip = document.getElementById('copy-tooltip');

  if (copyBtn && caText) {
    copyBtn.addEventListener('click', () => {
      const address = caText.textContent;
      navigator.clipboard.writeText(address).then(() => {
        // Show copied status
        copyBtn.classList.add('copied');
        if (tooltip) tooltip.textContent = 'Copied!';
        
        // Reset tooltip after 2 seconds
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (tooltip) tooltip.textContent = 'Copy';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  /* --- Scroll Reveal Animations --- */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to optimize performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Reveal when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Offset reveal point slightly for better flow
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* --- Navbar Scroll Effect --- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(0, 0, 0, 0.85)';
      header.style.backdropFilter = 'blur(12px)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
      header.style.padding = '1.5rem 0';
    } else {
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.borderBottom = 'none';
      header.style.padding = '2.5rem 0';
    }
  });

  /* --- Smooth Scroll for Navigation --- */
  const navLinks = document.querySelectorAll('.nav-link, .logo-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

});
