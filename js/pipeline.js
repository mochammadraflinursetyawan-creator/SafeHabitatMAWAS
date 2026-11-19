/**
 * MAWAS Geospatial Platform - Metro Transit Map Controller (js/pipeline.js)
 * Precision SVG track routing, station selection, sticky/bottom-sheet detail panel,
 * GIF canvas freeze controller, guided tour, glossary tooltips, and bilingual sync.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM References
  const canvasWrapper = document.getElementById('metro-map-canvas');
  const svgLayer = document.getElementById('metro-svg-layer');
  const detailPanel = document.getElementById('detail-panel');
  const backdrop = document.getElementById('detail-panel-backdrop');
  const panelCloseBtn = document.getElementById('panel-close-btn');

  // Panel Elements
  const panelStageBadge = document.getElementById('panel-stage-badge');
  const panelTitle = document.getElementById('panel-title');
  const panelDesc = document.getElementById('panel-desc');
  const panelModeBtns = document.querySelectorAll('.panel-mode-btn');
  const panelVisualBox = document.getElementById('panel-visual-box');
  const panelVisualImg = document.getElementById('panel-visual-img');
  const panelGifPlayer = document.getElementById('panel-gif-player');
  const panelGifImg = document.getElementById('panel-gif-img');
  const panelGifCanvas = document.getElementById('panel-gif-canvas');
  const btnPanelGif = document.getElementById('btn-panel-gif');
  const panelGifStatus = document.getElementById('panel-gif-status');
  const panelOverlayDemo = document.getElementById('panel-overlay-demo');
  const panelDataTools = document.getElementById('panel-data-tools');
  const panelOutput = document.getElementById('panel-output');
  const panelViewBtn = document.getElementById('panel-view-btn');
  const btnPanelPrev = document.getElementById('btn-panel-prev');
  const btnPanelNext = document.getElementById('btn-panel-next');

  // Toolbar & Tour Elements
  const btnPlay = document.getElementById('btn-play-pipeline');
  const btnPause = document.getElementById('btn-pause-pipeline');
  const btnStop = document.getElementById('btn-stop-pipeline');
  const statusPill = document.getElementById('pipe-status-pill');

  // Stage Guide Tags
  const stageTags = document.querySelectorAll('.stage-guide-tag');

  // State Variables
  let currentStationId = 'step_hab_input';
  let detailMode = 'summary'; // 'summary' | 'tech'
  let isTourPlaying = false;
  let tourTimer = null;
  let isGifPaused = false;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper: Get active language
  function getCurrentLang() {
    if (window.i18n && typeof window.i18n.getCurrentLanguage === 'function') {
      return window.i18n.getCurrentLanguage();
    }
    return localStorage.getItem('mawas_lang') || 'id';
  }

  // Translation helper
  function t(key) {
    if (window.i18n && typeof window.i18n.t === 'function') {
      return window.i18n.t(key);
    }
    return key;
  }

  // Helper: Escape HTML attributes
  function escapeAttr(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ==========================================================================
  // 2. Glossary Tooltip Formatter
  // ==========================================================================
  function formatGlossaryTerms(text) {
    if (!text || typeof GLOSSARY_TERMS === 'undefined') return text || '';
    const lang = getCurrentLang();
    let formatted = text;

    // Sort terms by length descending so longer phrases match first
    const terms = Object.keys(GLOSSARY_TERMS).sort((a, b) => b.length - a.length);

    terms.forEach(term => {
      const gData = GLOSSARY_TERMS[term];
      if (!gData) return;
      const def = lang === 'en' ? gData.def_en : gData.def_id;
      const title = lang === 'en' ? gData.name_en : gData.name_id;

      // Safe escape regex
      const escaped = term.replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&');
      // Only replace whole terms not inside HTML tags
      const regex = new RegExp(`(?<![<\\/\\w])(${escaped})(?![>\\w])`, 'gi');

      formatted = formatted.replace(regex, (match) => {
        return `<span class="glossary-term" tabindex="0" role="button" aria-describedby="pipeline-floating-tooltip" data-tooltip-title="${escapeAttr(title)}" data-tooltip-def="${escapeAttr(def)}">${match}</span>`;
      });
    });

    return formatted;
  }

  // ==========================================================================
  // 2b. Floating Glossary Tooltip Manager (Collision & Clipping Free)
  // ==========================================================================
  let floatingTooltip = document.getElementById('pipeline-floating-tooltip');
  if (!floatingTooltip) {
    floatingTooltip = document.createElement('div');
    floatingTooltip.id = 'pipeline-floating-tooltip';
    floatingTooltip.className = 'pipeline-floating-tooltip';
    floatingTooltip.setAttribute('role', 'tooltip');
    floatingTooltip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(floatingTooltip);
  }

  let activeTooltipTerm = null;

  function showFloatingTooltip(termEl) {
    if (!termEl || !floatingTooltip) return;
    const title = termEl.getAttribute('data-tooltip-title');
    const def = termEl.getAttribute('data-tooltip-def');
    if (!title && !def) return;

    activeTooltipTerm = termEl;
    floatingTooltip.innerHTML = `<strong class="pipe-tooltip-title">${title || ''}</strong><div class="pipe-tooltip-def">${def || ''}</div>`;
    floatingTooltip.classList.add('visible');
    floatingTooltip.setAttribute('aria-hidden', 'false');

    positionFloatingTooltip(termEl);
  }

  function positionFloatingTooltip(termEl) {
    if (!termEl || !floatingTooltip || !floatingTooltip.classList.contains('visible')) return;

    const termRect = termEl.getBoundingClientRect();
    const tipWidth = floatingTooltip.offsetWidth || 250;
    const tipHeight = floatingTooltip.offsetHeight || 90;
    const padding = 12;

    // Horizontal placement: Center on term, clamped within window viewport
    let left = termRect.left + termRect.width / 2 - tipWidth / 2;
    left = Math.max(padding, Math.min(window.innerWidth - tipWidth - padding, left));

    // Vertical placement: Default try ABOVE the term
    let top = termRect.top - tipHeight - 10;
    let isBelow = false;

    // Determine the safe top boundary (under navbar and detail panel header / mode toggle)
    let minAllowedTop = 64; // Navbar height buffer
    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel) {
      const modeToggle = detailPanel.querySelector('.panel-mode-toggle');
      if (modeToggle) {
        const toggleRect = modeToggle.getBoundingClientRect();
        // If mode toggle is visible on screen, ensure tooltip doesn't overlap it when above
        minAllowedTop = Math.max(minAllowedTop, toggleRect.bottom + 6);
      }
    }

    // If placing above would hit minAllowedTop, flip below!
    if (top < minAllowedTop) {
      top = termRect.bottom + 10;
      isBelow = true;

      // If placing below also overflows bottom of viewport, clamp it
      if (top + tipHeight > window.innerHeight - padding) {
        top = Math.max(padding, window.innerHeight - tipHeight - padding);
      }
    }

    floatingTooltip.style.left = `${Math.round(left)}px`;
    floatingTooltip.style.top = `${Math.round(top)}px`;
    floatingTooltip.classList.toggle('tooltip-below', isBelow);
  }

  function hideFloatingTooltip() {
    if (!floatingTooltip) return;
    floatingTooltip.classList.remove('visible');
    floatingTooltip.setAttribute('aria-hidden', 'true');
    activeTooltipTerm = null;
  }

  // Bind tooltip events using event delegation
  document.addEventListener('mouseover', (e) => {
    const term = e.target.closest('.glossary-term');
    if (term) {
      showFloatingTooltip(term);
    }
  });

  document.addEventListener('mouseout', (e) => {
    const term = e.target.closest('.glossary-term');
    if (term) {
      hideFloatingTooltip();
    }
  });

  document.addEventListener('focusin', (e) => {
    const term = e.target.closest('.glossary-term');
    if (term) {
      showFloatingTooltip(term);
    }
  });

  document.addEventListener('focusout', (e) => {
    const term = e.target.closest('.glossary-term');
    if (term) {
      hideFloatingTooltip();
    }
  });

  // Also listen to scroll on .panel-body
  const panelBodyEl = document.querySelector('.panel-body');
  if (panelBodyEl) {
    panelBodyEl.addEventListener('scroll', () => {
      if (activeTooltipTerm) {
        const pRect = panelBodyEl.getBoundingClientRect();
        const tRect = activeTooltipTerm.getBoundingClientRect();
        if (tRect.bottom < pRect.top || tRect.top > pRect.bottom) {
          hideFloatingTooltip();
        } else {
          positionFloatingTooltip(activeTooltipTerm);
        }
      }
    }, { passive: true });
  }

  window.addEventListener('scroll', () => {
    if (activeTooltipTerm) hideFloatingTooltip();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (activeTooltipTerm) positionFloatingTooltip(activeTooltipTerm);
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideFloatingTooltip();
  });

  // ==========================================================================
  // 3. SVG Metro Track Drawing (Curved Bezier Funnel & Branches)
  // ==========================================================================
  function getCenter(el) {
    if (!el || !canvasWrapper) return null;
    const dot = el.querySelector('.metro-node-dot') || el;
    const rBox = canvasWrapper.getBoundingClientRect();
    const dBox = dot.getBoundingClientRect();
    return {
      x: dBox.left + dBox.width / 2 - rBox.left,
      y: dBox.top + dBox.height / 2 - rBox.top
    };
  }

  function renderMetroTracks() {
    if (!svgLayer || !canvasWrapper) return;

    const rBox = canvasWrapper.getBoundingClientRect();
    svgLayer.setAttribute('viewBox', `0 0 ${rBox.width} ${rBox.height}`);
    svgLayer.innerHTML = '';

    // Collect station DOM elements
    const habIn = document.getElementById('station-hab_input');
    const habProc = document.getElementById('station-hab_proc');
    const habOut = document.getElementById('habitat');

    const ikeIn = document.getElementById('station-ike_input');
    const ikeProc = document.getElementById('station-ike_proc');
    const ikeOut = document.getElementById('ike');

    const airIn = document.getElementById('station-air_input');
    const airProc = document.getElementById('station-air_proc');
    const airOut = document.getElementById('air-pollution');

    const overlay = document.getElementById('overlay');
    const tempHab = document.getElementById('station-temp_hab_out');

    const getis = document.getElementById('getis-ord');
    const hotspotMap = document.getElementById('station-hotspot_map');

    // Helper to create path
    function createTrack(d, color, trackGroup, trackId) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', color);
      path.setAttribute('class', `metro-svg-track track-${trackGroup}`);
      path.setAttribute('data-track-group', trackGroup);
      if (trackId) path.setAttribute('id', trackId);
      svgLayer.appendChild(path);
      return path;
    }

    // 1. Stage 2: Three Vertical Lanes
    const pHabIn = getCenter(habIn);
    const pHabProc = getCenter(habProc);
    const pHabOut = getCenter(habOut);

    const pIkeIn = getCenter(ikeIn);
    const pIkeProc = getCenter(ikeProc);
    const pIkeOut = getCenter(ikeOut);

    const pAirIn = getCenter(airIn);
    const pAirProc = getCenter(airProc);
    const pAirOut = getCenter(airOut);

    const pOverlay = getCenter(overlay);
    const pTempHab = getCenter(tempHab);

    // Habitat Track (Green)
    if (pHabIn && pHabProc && pHabOut) {
      createTrack(`M ${pHabIn.x} ${pHabIn.y} L ${pHabProc.x} ${pHabProc.y} L ${pHabOut.x} ${pHabOut.y}`, '#16a34a', 'habitat', 'track-hab-v');
    }

    // IKE Track (Amber)
    if (pIkeIn && pIkeProc && pIkeOut) {
      createTrack(`M ${pIkeIn.x} ${pIkeIn.y} L ${pIkeProc.x} ${pIkeProc.y} L ${pIkeOut.x} ${pIkeOut.y}`, '#d97706', 'ike', 'track-ike-v');
    }

    // Air Track (Purple)
    if (pAirIn && pAirProc && pAirOut) {
      createTrack(`M ${pAirIn.x} ${pAirIn.y} L ${pAirProc.x} ${pAirProc.y} L ${pAirOut.x} ${pAirOut.y}`, '#7c3aed', 'air', 'track-air-v');
    }

    // 2. Stage 2 -> Stage 3 Funnel Merge into Overlay
    if (pOverlay) {
      if (pHabOut) {
        // Curve from left (habitat) into center overlay
        const cy = pHabOut.y + (pOverlay.y - pHabOut.y) * 0.5;
        const d = `M ${pHabOut.x} ${pHabOut.y} C ${pHabOut.x} ${cy}, ${pOverlay.x} ${cy}, ${pOverlay.x} ${pOverlay.y}`;
        createTrack(d, '#16a34a', 'habitat', 'funnel-hab');
      }
      if (pIkeOut) {
        // Straight / smooth merge from middle (IKE) into center overlay
        const d = `M ${pIkeOut.x} ${pIkeOut.y} L ${pOverlay.x} ${pOverlay.y}`;
        createTrack(d, '#d97706', 'ike', 'funnel-ike');
      }
      if (pAirOut) {
        // Curve from right (air) into center overlay
        const cy = pAirOut.y + (pOverlay.y - pAirOut.y) * 0.5;
        const d = `M ${pAirOut.x} ${pAirOut.y} C ${pAirOut.x} ${cy}, ${pOverlay.x} ${cy}, ${pOverlay.x} ${pOverlay.y}`;
        createTrack(d, '#7c3aed', 'air', 'funnel-air');
      }
    }

    // 3. Stage 3 Vertical Track: Overlay -> Temp Potential Habitat
    if (pOverlay && pTempHab) {
      createTrack(`M ${pOverlay.x} ${pOverlay.y} L ${pTempHab.x} ${pTempHab.y}`, '#0284c7', 'synthesis', 'track-temp-hab');
    }

    // 4. Stage 3 -> Stage 4: Temp Potential Habitat -> Getis-Ord -> Hotspot Map
    const pGetis = getCenter(getis);
    const pHotspotMap = getCenter(hotspotMap);

    if (pTempHab && pGetis) {
      createTrack(`M ${pTempHab.x} ${pTempHab.y} L ${pGetis.x} ${pGetis.y}`, '#475569', 'final', 'track-temp-getis');
    }

    if (pGetis && pHotspotMap) {
      createTrack(`M ${pGetis.x} ${pGetis.y} L ${pHotspotMap.x} ${pHotspotMap.y}`, '#475569', 'final', 'track-hotspot-map');
    }

    // Update track highlight based on currently active station
    highlightConnectedTracks(currentStationId);
  }

  // Highlight active tracks and dim others
  function highlightConnectedTracks(nodeId) {
    if (!svgLayer) return;
    const data = typeof PIPELINE_NODES !== 'undefined' ? PIPELINE_NODES[nodeId] : null;
    const trackGroup = data ? data.track : null;

    const allTracks = svgLayer.querySelectorAll('.metro-svg-track');
    allTracks.forEach(track => {
      const group = track.getAttribute('data-track-group');
      if (!trackGroup || group === trackGroup || trackGroup === 'general' || group === 'synthesis') {
        track.classList.remove('dimmed');
        if (group === trackGroup) {
          track.classList.add('active-track');
        } else {
          track.classList.remove('active-track');
        }
      } else {
        track.classList.add('dimmed');
        track.classList.remove('active-track');
      }
    });

    // Dim stations that are not in the same track if relevant
    const allStations = document.querySelectorAll('.metro-station, .metro-mini-station');
    allStations.forEach(st => {
      const sTrack = st.getAttribute('data-track');
      if (!trackGroup || sTrack === trackGroup || trackGroup === 'general' || sTrack === 'synthesis') {
        st.classList.remove('dimmed');
      } else {
        st.classList.add('dimmed');
      }
    });
  }

  // ==========================================================================
  // 4. Detail Panel Update & Station Activation
  // ==========================================================================
  function selectStation(nodeId, shouldScroll = false) {
    if (typeof PIPELINE_NODES === 'undefined' || !PIPELINE_NODES[nodeId]) {
      nodeId = 'step_hab_input';
    }

    currentStationId = nodeId;
    const data = PIPELINE_NODES[nodeId];
    const lang = getCurrentLang();

    // 1. Update station button styles and ARIA states
    document.querySelectorAll('.metro-station, .metro-mini-station, .stat-unit-col').forEach(el => {
      const id = el.getAttribute('data-node-id');
      if (id === nodeId) {
        el.classList.add('active');
        el.setAttribute('aria-expanded', 'true');
      } else {
        el.classList.remove('active');
        el.setAttribute('aria-expanded', 'false');
      }
    });

    // 2. Highlight connected tracks
    highlightConnectedTracks(nodeId);

    // 3. Update Left Stage Guide Tag
    if (data.stage && stageTags.length > 0) {
      stageTags.forEach(tag => {
        if (parseInt(tag.getAttribute('data-stage'), 10) === data.stage) {
          tag.classList.add('active');
        } else {
          tag.classList.remove('active');
        }
      });
    }

    // 4. Update Detail Panel Contents with smooth fade
    if (panelDesc) {
      panelDesc.classList.add('fading');
    }

    setTimeout(() => {
      // Stage badge & title
      if (panelStageBadge) {
        const stageName = lang === 'en' ? data.stage_name_en : data.stage_name_id;
        const typeName = lang === 'en' ? data.type_en : data.type_id;
        panelStageBadge.textContent = `${stageName.toUpperCase()} • ${typeName.toUpperCase()}`;
      }

      if (panelTitle) {
        panelTitle.textContent = lang === 'en' ? data.title_en : data.title_id;
      }

      // Narrative text
      if (panelDesc) {
        const descText = detailMode === 'tech'
          ? (lang === 'en' ? data.desc_tech_en : data.desc_tech_id)
          : (lang === 'en' ? data.desc_summary_en : data.desc_summary_id);
        panelDesc.innerHTML = formatGlossaryTerms(descText);
        panelDesc.classList.remove('fading');
      }

      // Metadata rows
      if (panelDataTools) {
        panelDataTools.innerHTML = formatGlossaryTerms(lang === 'en' ? data.data_tools_en : data.data_tools_id);
      }
      if (panelOutput) {
        panelOutput.innerHTML = formatGlossaryTerms(lang === 'en' ? data.output_en : data.output_id);
      }

      // Visual Asset Box
      updateVisualBox(data);

      // View Results in Dashboard link
      if (panelViewBtn) {
        if (data.view_link) {
          panelViewBtn.href = data.view_link;
          panelViewBtn.style.display = 'inline-flex';
        } else {
          panelViewBtn.style.display = 'none';
        }
      }

      // Prev / Next button states
      updatePanelNavButtons();
    }, 80);

    // 5. Open Bottom Sheet on Tablet/Mobile if < 1100px
    if (window.innerWidth < 1100) {
      if (detailPanel) detailPanel.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
    }

    // 6. Smooth Scroll if requested (e.g. during Guided Tour)
    if (shouldScroll && !prefersReducedMotion) {
      const activeEl = document.querySelector(`.metro-station.active, .metro-mini-station.active`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  // Visual Asset Box Controller
  function updateVisualBox(data) {
    if (!panelVisualBox) return;

    // Reset visual elements
    if (panelVisualImg) panelVisualImg.style.display = 'none';
    if (panelGifPlayer) panelGifPlayer.style.display = 'none';
    if (panelOverlayDemo) panelOverlayDemo.style.display = 'none';

    if (!data.visual_type) {
      panelVisualBox.style.display = 'none';
      return;
    }

    panelVisualBox.style.display = 'flex';

    if (data.visual_type === 'image' && panelVisualImg) {
      panelVisualImg.src = data.visual_src;
      panelVisualImg.alt = data.title_id || 'Visual Hasil';
      panelVisualImg.style.display = 'block';
    } else if (data.visual_type === 'gif' && panelGifPlayer) {
      panelGifPlayer.style.display = 'flex';
      if (panelGifImg) {
        panelGifImg.src = data.visual_src;
        panelGifImg.style.display = 'block';
      }
      if (panelGifCanvas) panelGifCanvas.style.display = 'none';
      isGifPaused = false;
      updateGifStatus();
    } else if (data.visual_type === 'overlay_demo' && panelOverlayDemo) {
      panelOverlayDemo.style.display = 'flex';
    }
  }

  // GIF Play / Pause Controller using Canvas frame freeze
  function toggleGifPlayPause() {
    if (!panelGifImg || !panelGifCanvas) return;

    if (!isGifPaused) {
      // Freeze frame to canvas
      try {
        const w = panelGifImg.naturalWidth || panelGifImg.clientWidth || 320;
        const h = panelGifImg.naturalHeight || panelGifImg.clientHeight || 200;
        panelGifCanvas.width = w;
        panelGifCanvas.height = h;
        const ctx = panelGifCanvas.getContext('2d');
        ctx.drawImage(panelGifImg, 0, 0, w, h);

        panelGifCanvas.style.display = 'block';
        panelGifImg.style.display = 'none';
        isGifPaused = true;
      } catch (e) {
        console.warn('Canvas freeze error:', e);
      }
    } else {
      // Resume animated GIF
      panelGifCanvas.style.display = 'none';
      panelGifImg.style.display = 'block';
      isGifPaused = false;
    }
    updateGifStatus();
  }

  function updateGifStatus() {
    if (!btnPanelGif || !panelGifStatus) return;
    const lang = getCurrentLang();
    if (isGifPaused) {
      btnPanelGif.innerHTML = `<i class="fas fa-play"></i> <span>${lang === 'en' ? 'Play Animation' : 'Putar Animasi'}</span>`;
      panelGifStatus.textContent = lang === 'en' ? 'Paused' : 'Dijeda';
    } else {
      btnPanelGif.innerHTML = `<i class="fas fa-pause"></i> <span>${lang === 'en' ? 'Pause Animation' : 'Jeda Animasi'}</span>`;
      panelGifStatus.textContent = lang === 'en' ? 'Playing' : 'Memutar';
    }
  }

  if (btnPanelGif) {
    btnPanelGif.addEventListener('click', toggleGifPlayPause);
  }

  // Prev / Next Panel Navigation Buttons
  function updatePanelNavButtons() {
    if (typeof METRO_STATION_ORDER === 'undefined') return;
    const idx = METRO_STATION_ORDER.indexOf(currentStationId);

    if (btnPanelPrev) {
      btnPanelPrev.disabled = (idx <= 0);
    }
    if (btnPanelNext) {
      btnPanelNext.disabled = (idx < 0 || idx >= METRO_STATION_ORDER.length - 1);
    }
  }

  if (btnPanelPrev) {
    btnPanelPrev.addEventListener('click', () => {
      const idx = METRO_STATION_ORDER.indexOf(currentStationId);
      if (idx > 0) {
        selectStation(METRO_STATION_ORDER[idx - 1], true);
      }
    });
  }

  if (btnPanelNext) {
    btnPanelNext.addEventListener('click', () => {
      const idx = METRO_STATION_ORDER.indexOf(currentStationId);
      if (idx >= 0 && idx < METRO_STATION_ORDER.length - 1) {
        selectStation(METRO_STATION_ORDER[idx + 1], true);
      }
    });
  }

  // Summary / Tech Mode Toggle
  panelModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (mode === detailMode) return;
      detailMode = mode;
      panelModeBtns.forEach(b => b.classList.toggle('active', b === btn));
      selectStation(currentStationId);
    });
  });

  // Close Bottom Sheet on Mobile
  function closeDetailPanel() {
    if (detailPanel) detailPanel.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  }

  if (panelCloseBtn) panelCloseBtn.addEventListener('click', closeDetailPanel);
  if (backdrop) backdrop.addEventListener('click', closeDetailPanel);

  // Keyboard navigation: Esc to close, Arrow keys to navigate
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailPanel();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      const idx = METRO_STATION_ORDER.indexOf(currentStationId);
      if (idx >= 0 && idx < METRO_STATION_ORDER.length - 1) {
        selectStation(METRO_STATION_ORDER[idx + 1], true);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      const idx = METRO_STATION_ORDER.indexOf(currentStationId);
      if (idx > 0) {
        selectStation(METRO_STATION_ORDER[idx - 1], true);
      }
    }
  });

  // ==========================================================================
  // 5. Station Click Event Binding
  // ==========================================================================
  document.querySelectorAll('.metro-station, .metro-mini-station, .stat-unit-col').forEach(btn => {
    btn.addEventListener('click', () => {
      const nodeId = btn.getAttribute('data-node-id');
      if (isTourPlaying) pauseTour();
      selectStation(nodeId, false);
    });
  });

  // ==========================================================================
  // 6. Guided Tour Player Controller
  // ==========================================================================
  function playTour() {
    if (typeof METRO_STATION_ORDER === 'undefined') return;
    isTourPlaying = true;

    if (btnPlay) btnPlay.style.display = 'none';
    if (btnPause) btnPause.style.display = 'inline-flex';
    if (btnStop) btnStop.style.display = 'inline-flex';

    if (statusPill) {
      statusPill.classList.add('touring');
      statusPill.innerHTML = `<i class="fas fa-route fa-spin"></i> <span>${t('pipeline_status_playing')}</span>`;
    }

    advanceTour();
    tourTimer = setInterval(advanceTour, 3500);
  }

  function advanceTour() {
    const idx = METRO_STATION_ORDER.indexOf(currentStationId);
    let nextIdx = idx + 1;
    if (nextIdx >= METRO_STATION_ORDER.length) {
      nextIdx = 0; // loop back or stop
    }
    selectStation(METRO_STATION_ORDER[nextIdx], true);
  }

  function pauseTour() {
    isTourPlaying = false;
    if (tourTimer) clearInterval(tourTimer);

    if (btnPlay) btnPlay.style.display = 'inline-flex';
    if (btnPause) btnPause.style.display = 'none';
    if (btnStop) btnStop.style.display = 'inline-flex';

    if (statusPill) {
      statusPill.classList.remove('touring');
      statusPill.innerHTML = `<i class="fas fa-pause"></i> <span>${t('pipeline_status_paused')}</span>`;
    }
  }

  function stopTour() {
    isTourPlaying = false;
    if (tourTimer) clearInterval(tourTimer);

    if (btnPlay) btnPlay.style.display = 'inline-flex';
    if (btnPause) btnPause.style.display = 'none';
    if (btnStop) btnStop.style.display = 'none';

    if (statusPill) {
      statusPill.classList.remove('touring');
      statusPill.innerHTML = `<i class="fas fa-info-circle"></i> <span>${t('pipeline_status_idle')}</span>`;
    }

    selectStation('step_prep', true);
  }

  if (btnPlay) btnPlay.addEventListener('click', playTour);
  if (btnPause) btnPause.addEventListener('click', pauseTour);
  if (btnStop) btnStop.addEventListener('click', stopTour);

  // ==========================================================================
  // 7. URL Hash Navigation
  // ==========================================================================
  const HASH_MAP = {
    '#prep': 'step_prep',
    '#habitat': 'step_hab_out',
    '#ike': 'step_ike_out',
    '#air-pollution': 'step_air_out',
    '#overlay': 'step_overlay',
    '#getis-ord': 'step_getis',
    '#aoi': 'step_aoi_trend',
    '#hotspot-map': 'step_hotspot_map'
  };

  function handleInitialHash() {
    const hash = window.location.hash.toLowerCase();
    if (HASH_MAP[hash]) {
      return HASH_MAP[hash];
    }
    if (hash.startsWith('#step_') && typeof PIPELINE_NODES !== 'undefined' && PIPELINE_NODES[hash.substring(1)]) {
      return hash.substring(1);
    }
    return 'step_hab_input';
  }

  // ==========================================================================
  // 8. Bilingual Language Sync
  // ==========================================================================
  function updateAllStationLabels() {
    const lang = getCurrentLang();
    if (typeof PIPELINE_NODES === 'undefined') return;

    document.querySelectorAll('[data-node-label]').forEach(el => {
      const nodeId = el.getAttribute('data-node-label');
      const data = PIPELINE_NODES[nodeId];
      if (data) {
        el.textContent = lang === 'en' ? (data.label_short_en || data.title_en) : (data.label_short_id || data.title_id);
      }
    });

    // Update Detail Panel with current lang
    selectStation(currentStationId, false);

    // Update status pill
    if (!isTourPlaying && statusPill) {
      statusPill.innerHTML = `<i class="fas fa-info-circle"></i> <span>${t('pipeline_status_idle')}</span>`;
    }
  }

  window.addEventListener('mawas:languageChanged', updateAllStationLabels);

  // Also bind to language switcher buttons if present
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(updateAllStationLabels, 50);
    });
  });

  // ==========================================================================
  // 9. Resize & Font Load Re-rendering of Tracks
  // ==========================================================================
  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  window.addEventListener('resize', debounce(renderMetroTracks, 120));

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      renderMetroTracks();
    });
  }

  // Initial load execution
  const initialStation = handleInitialHash();
  updateAllStationLabels();
  selectStation(initialStation, false);

  // Slight delay for DOM dimensions to stabilize before drawing SVG
  setTimeout(renderMetroTracks, 100);
});
