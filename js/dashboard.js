/**
 * MAWAS Geospatial Platform - Dashboard Interactive Controller (js/dashboard.js)
 * Manages lightbox modal interactions, bilingual synchronization, and responsive behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const modalBackdrop = document.getElementById('dash-modal');
  const modalTitle = document.getElementById('dash-modal-title');
  const modalBadge = document.getElementById('dash-modal-badge');
  const modalImg = document.getElementById('dash-modal-img');
  const modalDesc = document.getElementById('dash-modal-desc');
  const modalCloseBtn = document.getElementById('dash-modal-close');
  const modalImgLink = document.getElementById('dash-modal-img-link');

  let currentActiveKey = null;

  // Helper to get active language ('id' or 'en')
  function getCurrentLang() {
    if (window.i18n && typeof window.i18n.getCurrentLanguage === 'function') {
      return window.i18n.getCurrentLanguage();
    }
    return localStorage.getItem('mawas_lang') || 'id';
  }

  // Open Modal with specific item
  function openModal(itemKey) {
    if (typeof DASHBOARD_ITEMS === 'undefined' || !DASHBOARD_ITEMS[itemKey]) {
      console.warn('Dashboard item not found:', itemKey);
      return;
    }

    currentActiveKey = itemKey;
    const item = DASHBOARD_ITEMS[itemKey];
    const lang = getCurrentLang();

    const title = lang === 'en' ? item.title_en : item.title_id;
    const desc = lang === 'en' ? item.desc_en : item.desc_id;
    const badge = item.badge || 'ANALYTICS';

    if (modalTitle) modalTitle.textContent = title;
    if (modalBadge) modalBadge.textContent = badge;
    if (modalImg) {
      modalImg.src = item.src;
      modalImg.alt = title;
    }
    if (modalImgLink) {
      modalImgLink.href = item.src;
    }
    if (modalDesc) modalDesc.innerHTML = desc;

    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll while modal open
    }
  }

  // Close Modal
  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      currentActiveKey = null;
    }
  }

  // Bind click handlers to all interactive cards
  const clickableCards = document.querySelectorAll('[data-item-key]');
  clickableCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on an explicit external link button
      if (e.target.closest('a') || e.target.closest('button')) return;
      const key = card.getAttribute('data-item-key');
      if (key) {
        openModal(key);
      }
    });
  });

  // Close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Click outside dialog to close
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Keyboard accessibility (ESC to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Re-translate modal if open when language switcher clicked
  window.addEventListener('mawas:languageChanged', (e) => {
    if (currentActiveKey && modalBackdrop && modalBackdrop.classList.contains('active')) {
      openModal(currentActiveKey);
    }
  });

  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        if (currentActiveKey && modalBackdrop && modalBackdrop.classList.contains('active')) {
          openModal(currentActiveKey);
        }
      }, 50);
    });
  });
});
