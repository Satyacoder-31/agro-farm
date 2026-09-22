/**
 * GUJARAT AGRO FARM — Interactive Core Engine
 * 3-Second Cinematic Hero Slideshow, Lightbox, Dynamic WhatsApp Generator, Mobile Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initStickyHeader();
  initMobileDrawer();
  initInquiryModal();
  initLightbox();
  initFaqAccordions();
});

/* ==========================================================================
   1. HERO SLIDESHOW ENGINE (3-SECOND AUTO-ADVANCE)
   ========================================================================== */
function initHeroSlider() {
  const sliderSection = document.querySelector('.hero-slider-section');
  if (!sliderSection) return;

  const slides = sliderSection.querySelectorAll('.hero-slide');
  const dots = sliderSection.querySelectorAll('.slider-dot');
  const prevBtn = sliderSection.querySelector('.slider-prev');
  const nextBtn = sliderSection.querySelector('.slider-next');

  if (slides.length <= 1) return;

  let currentSlide = 0;
  const slideCount = slides.length;
  let slideInterval = null;
  const INTERVAL_TIME = 3000; // Exact 3-second requirement

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = (index + slideCount) % slideCount;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, INTERVAL_TIME);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Events
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      startAutoplay();
    });
  });

  // Pause on hover
  sliderSection.addEventListener('mouseenter', stopAutoplay);
  sliderSection.addEventListener('mouseleave', startAutoplay);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Start initial auto-slide
  startAutoplay();
}

/* ==========================================================================
   2. STICKY HEADER SCROLL EFFECT
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.drawer-close');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  // Close when clicking links inside drawer
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* ==========================================================================
   4. QUICK INQUIRY MODAL & DIRECT WHATSAPP GENERATOR
   ========================================================================== */
function initInquiryModal() {
  const modal = document.querySelector('#inquiryModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const triggerBtns = document.querySelectorAll('[data-enquire]');
  const breedSelect = modal.querySelector('#modalBreedSelect');
  const inquiryForm = modal.querySelector('#inquiryForm');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const breedName = btn.getAttribute('data-enquire') || '';
      if (breedSelect && breedName) {
        breedSelect.value = breedName;
      }
      modal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = inquiryForm.querySelector('#modalName')?.value || 'Valued Customer';
      const phone = inquiryForm.querySelector('#modalPhone')?.value || '';
      const breed = inquiryForm.querySelector('#modalBreedSelect')?.value || 'Farm Livestock';
      const qty = inquiryForm.querySelector('#modalQty')?.value || '1';
      const city = inquiryForm.querySelector('#modalCity')?.value || 'Gujarat';

      const whatsappNumber = '917359326555';
      const message = `*Namaste Gujarat Agro Farm!*\n\nI would like to enquire about:\n- *Category/Breed:* ${breed}\n- *Quantity:* ${qty}\n- *Customer Name:* ${name}\n- *Phone:* ${phone}\n- *Location/City:* ${city}\n\nPlease share latest live pricing, availability and delivery details.`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
      modal.classList.remove('open');
    });
  }
}

/* ==========================================================================
   5. IMAGE LIGHTBOX GALLERY
   ========================================================================== */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  let lightbox = document.querySelector('.lightbox-modal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
      <div class="lightbox-close">&times;</div>
      <img src="" alt="Enlarged Farm Image" class="lightbox-img">
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
      }
    });
  });

  closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
}

/* ==========================================================================
   6. FAQ ACCORDIONS
   ========================================================================== */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}
