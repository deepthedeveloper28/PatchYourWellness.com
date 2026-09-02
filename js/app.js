/**
 * SUPER PATCH - GLOBAL APPLICATION LOGIC & INTERACTION ENGINE
 * Target Affiliate URL: https://ca.superpatch.com/?rsu=zenwellness
 */

const AFFILIATE_BASE_URL = 'https://ca.superpatch.com/?rsu=zenwellness';

// Global state for Region / Currency (Default: US / USD)
window.SuperPatchState = {
  region: localStorage.getItem('sp_region') || 'US', // 'US' or 'CA'
  currency: localStorage.getItem('sp_currency') || 'USD', // 'USD' or 'CAD'
  rateCADtoUSD: 0.74,
  baseCADPrice: 99.00, // Standard 30-pack / monthly supply
};

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initRegionCurrencySwitcher();
  initAccordions();
  initProductCarousel();
  initWhatTabs();
  updateCurrencyDisplay();
});

/* --------------------------------------------------------------------------
   WHAT IT CAN DO - TAB SWITCHER CONTROLLER
-------------------------------------------------------------------------- */
function initWhatTabs() {
  const tabsNav = document.getElementById('what-tabs-nav');
  if (!tabsNav) return;

  const tabBtns = tabsNav.querySelectorAll('.what-tab-btn');
  const panels = document.querySelectorAll('.what-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   PRODUCT CAROUSEL CONTROLLER
-------------------------------------------------------------------------- */
function initProductCarousel() {
  const track = document.getElementById('featured-carousel-track');
  const prevBtns = [
    document.getElementById('carousel-prev-btn'),
    document.getElementById('carousel-float-prev')
  ];
  const nextBtns = [
    document.getElementById('carousel-next-btn'),
    document.getElementById('carousel-float-next')
  ];

  if (!track) return;

  function getScrollStep() {
    const firstCard = track.querySelector('.product-card');
    if (firstCard) {
      return firstCard.offsetWidth + 24; // card width + 24px gap
    }
    return track.clientWidth * 0.8;
  }

  prevBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }
  });

  nextBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }
  });
}

/* --------------------------------------------------------------------------
   STICKY HEADER & SCROLL DYNAMICS
-------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION MENU
-------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close when clicking any nav link
  const links = mobileMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   REGION & CURRENCY SWITCHER (USA 🇺🇸 / CANADA 🇨🇦)
-------------------------------------------------------------------------- */
function initRegionCurrencySwitcher() {
  const toggles = document.querySelectorAll('.region-currency-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (window.SuperPatchState.region === 'US') {
        window.SuperPatchState.region = 'CA';
        window.SuperPatchState.currency = 'CAD';
      } else {
        window.SuperPatchState.region = 'US';
        window.SuperPatchState.currency = 'USD';
      }

      localStorage.setItem('sp_region', window.SuperPatchState.region);
      localStorage.setItem('sp_currency', window.SuperPatchState.currency);

      updateCurrencyDisplay();
      showToast(`Switched region to ${window.SuperPatchState.region === 'US' ? 'United States (USD $)' : 'Canada (CAD $)'}`);
    });
  });
}

function updateCurrencyDisplay() {
  const isUS = window.SuperPatchState.region === 'US';
  const flagEls = document.querySelectorAll('.region-flag');
  const textEls = document.querySelectorAll('.region-text');
  const priceEls = document.querySelectorAll('[data-cad-price]');
  const origPriceEls = document.querySelectorAll('[data-cad-orig], [data-usd-orig]');

  flagEls.forEach(el => {
    el.textContent = isUS ? '🇺🇸' : '🇨🇦';
  });

  textEls.forEach(el => {
    el.textContent = isUS ? 'US (USD $)' : 'CA (CAD $)';
  });

  priceEls.forEach(el => {
    const cadPrice = parseFloat(el.getAttribute('data-cad-price')) || 99.00;
    const explicitUsd = el.getAttribute('data-usd-price');
    const usdPrice = explicitUsd ? parseFloat(explicitUsd) : 69.00;
    if (isUS) {
      el.textContent = `$${usdPrice.toFixed(2)} USD`;
    } else {
      el.textContent = `$${cadPrice.toFixed(2)} CAD`;
    }
  });

  origPriceEls.forEach(el => {
    const cadOrig = parseFloat(el.getAttribute('data-cad-orig')) || 139.00;
    const explicitUsdOrig = el.getAttribute('data-usd-orig');
    const usdOrig = explicitUsdOrig ? parseFloat(explicitUsdOrig) : 99.00;
    if (isUS) {
      el.textContent = `$${usdOrig.toFixed(2)} USD`;
    } else {
      el.textContent = `$${cadOrig.toFixed(2)} CAD`;
    }
  });
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION COMPONENT
-------------------------------------------------------------------------- */
function initAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   NEWSLETTER SUBSCRIPTION WITH TOAST
-------------------------------------------------------------------------- */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        showToast('Thank you for subscribing! Check your inbox for exclusive wellness tips.');
        input.value = '';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   TOAST NOTIFICATION COMPONENT
-------------------------------------------------------------------------- */
function showToast(message, duration = 4000) {
  let toastContainer = document.getElementById('sp-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'sp-toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 90px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #0f172a;
    color: #ffffff;
    padding: 14px 22px;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transform: translateY(-15px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: auto;
    border: 1px solid rgba(255,255,255,0.15);
  `;
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-15px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* --------------------------------------------------------------------------
   SCIENCE DUAL-TECH TAB SWITCHER
   -------------------------------------------------------------------------- */
window.switchScienceTab = function(tabKey) {
  const buttons = document.querySelectorAll('.science-tab-btn');
  const panels = document.querySelectorAll('.science-tab-panel');

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
  });

  panels.forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabKey}`);
  });
};
