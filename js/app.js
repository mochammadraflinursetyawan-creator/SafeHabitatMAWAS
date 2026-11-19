/**
 * MAWAS Geospatial Platform - Interactive Application Engine
 * Includes: Slide-to-Get-Started Controller and Tableau Dashboard Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  initSlideToGetStarted();
  initTableauDashboard();
});

// =============================================================================
// 1. Slide to Get Started (Interactive Slider on Home)
// =============================================================================
function initSlideToGetStarted() {
  const container = document.getElementById('slider-container');
  const thumb = document.getElementById('slider-thumb');
  const progress = document.getElementById('slider-progress');
  const sliderText = document.getElementById('slider-text');

  if (!container || !thumb) return;

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  const maxDrag = container.clientWidth - thumb.clientWidth - 8; // 8px for margins

  function onStart(clientX) {
    isDragging = true;
    startX = clientX - currentX;
    thumb.style.transition = 'none';
    if (progress) progress.style.transition = 'none';
  }

  function onMove(clientX) {
    if (!isDragging) return;
    let newX = clientX - startX;
    if (newX < 0) newX = 0;
    if (newX > maxDrag) newX = maxDrag;

    currentX = newX;
    thumb.style.transform = `translateX(${currentX}px)`;
    if (progress) progress.style.width = `${currentX + 24}px`;

    // Fade out text as user slides
    const opacity = 1 - (currentX / maxDrag);
    if (sliderText) sliderText.style.opacity = opacity.toString();

    // Trigger threshold (75%)
    if (currentX >= maxDrag * 0.75) {
      isDragging = false;
      thumb.style.transform = `translateX(${maxDrag}px)`;
      if (progress) progress.style.width = `100%`;
      if (sliderText) {
        sliderText.textContent = "Membuka Dashboard...";
        sliderText.style.opacity = '1';
      }
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 250);
    }
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;

    // If not reached threshold, bounce back
    if (currentX < maxDrag * 0.75) {
      thumb.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      if (progress) progress.style.transition = 'width 0.3s ease';
      if (sliderText) sliderText.style.opacity = '1';
      
      thumb.style.transform = 'translateX(0px)';
      if (progress) progress.style.width = '0px';
      currentX = 0;
    }
  }

  // Mouse Events
  thumb.addEventListener('mousedown', (e) => onStart(e.clientX));
  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', onEnd);

  // Touch Events (Mobile)
  thumb.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', onEnd);

  // Fallback click on container to auto-slide
  container.addEventListener('click', (e) => {
    if (e.target === thumb) return;
    thumb.style.transition = 'transform 0.35s ease';
    if (progress) progress.style.transition = 'width 0.35s ease';
    thumb.style.transform = `translateX(${maxDrag}px)`;
    if (progress) progress.style.width = '100%';
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 280);
  });
}

// =============================================================================
// 2. Tableau Dashboard Synchronization
// =============================================================================
function initTableauDashboard() {
  const iframe = document.getElementById('dash-gee-frame');
  if (iframe && typeof CONFIG !== 'undefined' && CONFIG.GEE_APP_URL) {
    iframe.src = CONFIG.GEE_APP_URL;
  }
}
