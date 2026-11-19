/**
 * MAWAS WebGIS Interactive Map Controller (Leaflet.js)
 * Features:
 * 1. Synchronized Main Map and Inset Map Basemaps (Watermark-Free Esri Canvas & Google Tiles)
 * 2. Distinctly Characterized Raster Layer Overlays (Forest Greens, Peat Burn Severity, Toxic Smoke Haze, Risk vs Safe)
 * 3. Dynamic Multilingual Map Legend with Individual Real-Time Opacity Sliders
 * 4. Interactive Geospatial Measurement Tool (Line Distance & Polygon Area)
 * 5. Interactive Swipe / Split-Screen Comparison Mode with Draggable Divider
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Setup
  const kalimantanCenter = [-0.2, 114.5];
  const initialZoom = 5;

  const map = L.map('main-map', {
    center: kalimantanCenter,
    zoom: initialZoom,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    zoomControl: false,
    attributionControl: false
  });

  // Expose map instance globally for extensions (Pixel Inspector, Measure, etc.)
  window.mawasMap = map;

  // Create custom panes for Swipe / Split-Screen comparison
  map.createPane('swipeLeftPane');
  map.getPane('swipeLeftPane').style.zIndex = 430;
  map.createPane('swipeRightPane');
  map.getPane('swipeRightPane').style.zIndex = 431;

  // Layer group for measurements
  const measureLayerGroup = L.layerGroup().addTo(map);

  // Swipe / Split-Screen Comparison Elements and State (Declared at top to prevent TDZ)
  const btnSwipeTool = document.getElementById('btn-swipe-tool');
  const swipeToolbar = document.getElementById('swipe-toolbar');
  const swipeDivider = document.getElementById('swipe-divider');
  const btnCloseSwipe = document.getElementById('btn-close-swipe');
  const swipeLeftSelect = document.getElementById('swipe-left-select');
  const swipeRightSelect = document.getElementById('swipe-right-select');

  let isSwipeActive = false;
  let isDraggingSwipe = false;
  let swipeLeftLayer = null;
  let swipeRightLayer = null;
  let currentDividerX = 0;

  // Measurement Tool Elements and State (Declared at top to prevent TDZ)
  const measurePanel = document.getElementById('measure-panel');
  const btnMeasureTool = document.getElementById('btn-measure-tool');
  const btnCloseMeasure = document.getElementById('btn-close-measure');
  const btnModeDistance = document.getElementById('btn-mode-distance');
  const btnModeArea = document.getElementById('btn-mode-area');
  const btnMeasureClear = document.getElementById('btn-measure-clear');
  const btnMeasureFinish = document.getElementById('btn-measure-finish');
  const measureInstruction = document.getElementById('measure-instruction');
  const measureResultBox = document.getElementById('measure-result-box');
  const measureResultLabel = document.getElementById('measure-result-label');
  const measureResultValue = document.getElementById('measure-result-value');

  let measureMode = null; // null | 'distance' | 'area'
  let measurePoints = [];
  let currentShape = null; // L.polyline or L.polygon
  let guideLine = null; // L.polyline for rubberband preview
  let vertexMarkers = [];

  // 2. Basemap Layer Definitions (Watermark-Free, High Reliability)
  const basemaps = {
    roadmap: L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 19,
      attribution: 'Google'
    }),
    satellite: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 19,
      attribution: 'Google'
    }),
    dark: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: '&copy; Esri, HERE, Garmin'
    }),
    clean: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: '&copy; Esri, HERE, Garmin'
    })
  };

  // Basemaps for Inset Map (Synchronized)
  const insetBasemaps = {
    roadmap: L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 18 }),
    satellite: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { maxZoom: 18 }),
    dark: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18 }),
    clean: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18 })
  };

  // Add default basemap
  let currentBasemapKey = 'roadmap';
  let activeBasemap = basemaps.roadmap;
  activeBasemap.addTo(map);

  // 3. Inset Map Initialization (Synchronized with Basemap)
  let insetMap = null;
  let activeInsetBasemap = null;
  let insetBoundingBox = null;

  const insetContainer = document.getElementById('mini-inset-map');
  if (insetContainer && typeof L !== 'undefined') {
    try {
      insetMap = L.map('mini-inset-map', {
        attributionControl: false,
        zoomControl: false,
        zoomSnap: 0.1,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false
      }).setView([-0.8, 117.0], 2.2);

      activeInsetBasemap = insetBasemaps.roadmap;
      activeInsetBasemap.addTo(insetMap);

      // Bounding Box Kalimantan on Inset Map
      insetBoundingBox = L.rectangle([[-4.3, 108.6], [4.4, 119.0]], {
        color: "#ea580c",
        weight: 2,
        fillColor: "#ea580c",
        fillOpacity: 0.22
      }).addTo(insetMap);
    } catch (err) {
      console.log('Inset map error:', err);
    }
  }

  function syncInsetBasemap(key) {
    if (!insetMap || !insetBasemaps[key]) return;
    if (activeInsetBasemap && insetMap.hasLayer(activeInsetBasemap)) {
      insetMap.removeLayer(activeInsetBasemap);
    }
    activeInsetBasemap = insetBasemaps[key];
    activeInsetBasemap.addTo(insetMap);
    if (insetBoundingBox) {
      insetBoundingBox.bringToFront();
    }
  }

  // 4. Distinctly Characterized Raster Overlay Definitions
  const rasterOverlays = {
    temporaryHabitat: {
      id: 'layer-temporary-habitat',
      sliderId: 'val-opacity-temp',
      key: 'temp',
      name: 'Temporary Potential Habitat',
      url: 'assets/rasters/KesesuaianSementara.png',
      bounds: [[-4.9896, 108.5614], [4.4422, 119.0662]],
      opacity: 0.88,
      layer: L.imageOverlay('assets/rasters/KesesuaianSementara.png', [
        [-4.9896, 108.5614],
        [4.4422, 119.0662]
      ], { opacity: 0.88 }),
      gradient: 'linear-gradient(to right, #dc2626, #facc15, #15803d)'
    },
    ike: {
      id: 'layer-ike',
      sliderId: 'val-opacity-ive',
      key: 'ive',
      name: 'Ecological Vulnerability Index (IVE)',
      url: 'assets/rasters/VariabelIKE.png',
      bounds: [[-4.7454, 108.6791], [4.4084, 118.9899]],
      opacity: 0.85,
      layer: L.imageOverlay('assets/rasters/VariabelIKE.png', [
        [-4.7454, 108.6791],
        [4.4084, 118.9899]
      ], { opacity: 0.85 }),
      gradient: 'linear-gradient(to right, #a7cc6d, #f6e66e, #f09037, #d7231e)'
    },
    airQuality: {
      id: 'layer-air-pollution',
      sliderId: 'val-opacity-air',
      key: 'air',
      name: 'Air Pollution Vulnerability',
      url: 'assets/rasters/AirQuality.png',
      bounds: [[-4.9896, 108.5614], [4.4422, 119.0662]],
      opacity: 0.85,
      layer: L.imageOverlay('assets/rasters/AirQuality.png', [
        [-4.9896, 108.5614],
        [4.4422, 119.0662]
      ], { opacity: 0.85 }),
      gradient: 'linear-gradient(to right, #168a2d, #87c626, #eedb20, #f58a16, #aa181c)'
    },
    habitat: {
      id: 'layer-habitat-suitability',
      sliderId: 'val-opacity-hab',
      key: 'hab',
      name: 'Habitat Suitability',
      url: 'assets/rasters/VariabelHabitat.png',
      bounds: [[-5.1198, 108.1037], [4.8165, 119.2008]],
      opacity: 0.85,
      layer: L.imageOverlay('assets/rasters/VariabelHabitat.png', [
        [-5.1198, 108.1037],
        [4.8165, 119.2008]
      ], { opacity: 0.85 }),
      gradient: 'linear-gradient(to right, #d02323, #f07314, #f5cc1e, #8ec02d, #2e6930)'
    },
    getisOrd: {
      id: 'layer-getis-ord',
      sliderId: 'val-opacity-getis',
      key: 'getis',
      name: 'Getis-Ord Gi* (Hotspot)',
      url: 'assets/rasters/GetisOrdGiZScore.png',
      bounds: [[-4.9853, 108.5614], [4.4422, 119.0664]],
      opacity: 0.88,
      layer: L.imageOverlay('assets/rasters/GetisOrdGiZScore.png', [
        [-4.9853, 108.5614],
        [4.4422, 119.0664]
      ], { opacity: 0.88 }),
      gradient: 'linear-gradient(to right, #2c7bb6, #abd9e9, #ffffbf, #fdae61, #d7191c)'
    }
  };

  // Expose raster overlays configuration
  window.rasterOverlays = rasterOverlays;

  // 5. Opacity Control Function (Operates from Legend inside Map)
  function setLayerOpacity(key, percent) {
    const item = rasterOverlays[key];
    if (!item) return;
    const opacity = percent / 100;
    item.opacity = opacity;
    item.layer.setOpacity(opacity);

    if (isSwipeActive) {
      const leftKey = swipeLeftSelect ? swipeLeftSelect.value : '';
      const rightKey = swipeRightSelect ? swipeRightSelect.value : '';
      if (key === leftKey && swipeLeftLayer) {
        swipeLeftLayer.setOpacity(opacity);
      }
      if (key === rightKey && swipeRightLayer) {
        swipeRightLayer.setOpacity(opacity);
      }
    }

    // Update matching legend slider inputs and text badges
    document.querySelectorAll(`.legend-opacity-slider[data-layer-key="${key}"]`).forEach(slider => {
      slider.value = percent;
    });

    const legendBadge = document.querySelector(`.legend-opacity-val[data-layer-key="${key}"]`);
    if (legendBadge) legendBadge.innerText = `${percent}%`;
  }

  // Active layer order tracking (Most recently activated layer is at index 0 / top of legend)
  const activeLayerOrder = [];
  window.activeLayerOrder = activeLayerOrder;

  // 6. Dynamic Multilingual Legend Function with Opacity Sliders
  function updateLegend() {
    const legendContainer = document.getElementById('map-legend');
    if (!legendContainer) return;

    const t = window.i18n ? (k) => window.i18n.t(k) : (k) => k;

    let html = `
      <div class="legend-title">
        <span><i class="fas fa-layer-group" style="color:var(--primary);margin-right:6px;"></i> ${t('legend_title')}</span>
        <button id="btn-toggle-legend" style="background:none;border:none;cursor:pointer;color:#6b7280;font-size:0.8rem;" title="Minimize"><i class="fas fa-chevron-down"></i></button>
      </div>
      <div id="legend-content">
    `;

    let activeCount = 0;

    if (isSwipeActive) {
      // In Swipe Mode: show comparison layers
      const leftKey = swipeLeftSelect ? swipeLeftSelect.value : 'temporaryHabitat';
      const rightKey = swipeRightSelect ? swipeRightSelect.value : 'habitat';

      const keysToShow = [];
      if (leftKey && leftKey !== 'none' && rasterOverlays[leftKey]) {
        keysToShow.push({ key: leftKey, side: 'left', sideLbl: t('swipe_left_lbl') || 'Sisi Kiri:' });
      }
      if (rightKey && rightKey !== 'none' && rasterOverlays[rightKey] && rightKey !== leftKey) {
        keysToShow.push({ key: rightKey, side: 'right', sideLbl: t('swipe_right_lbl') || 'Sisi Kanan:' });
      }

      keysToShow.forEach(({ key, side, sideLbl }) => {
        activeCount++;
        const item = rasterOverlays[key];
        const title = t(`legend_${item.key}_title`);
        const minLbl = t(`legend_${item.key}_min`);
        const maxLbl = t(`legend_${item.key}_max`);
        const currentPct = Math.round(item.opacity * 100);
        const iconSide = side === 'left' ? '◀' : '▶';

        html += `
          <div class="legend-block" data-layer-key="${key}">
            <div class="legend-header-row">
              <span class="legend-layer-name">
                <span style="display:inline-block;padding:1px 5px;background:#ffedd5;color:var(--primary);border-radius:4px;font-size:0.68rem;font-weight:700;margin-right:4px;">${iconSide} ${sideLbl}</span>
                ${title}
              </span>
              <div class="legend-opacity-ctrl" title="${t('opacity_lbl')}">
                <i class="fas fa-adjust" style="font-size: 0.65rem; color: #9ca3af;"></i>
                <input type="range" class="legend-opacity-slider" min="0" max="100" value="${currentPct}" data-layer-key="${key}">
                <span class="legend-opacity-val" data-layer-key="${key}">${currentPct}%</span>
              </div>
            </div>
            <div class="legend-gradient-bar" style="background: ${item.gradient};"></div>
            <div class="legend-labels">
              <span>${minLbl}</span>
              <span>${maxLbl}</span>
            </div>
            ${key === 'getisOrd' ? `
              <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;margin-top:6px;font-size:0.68rem;color:#374151;">
                <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:9px;height:9px;border-radius:2px;background:#d7191c;flex-shrink:0;"></span> <strong>${t('legend_getis_hh') || 'High-High'}</strong></span>
                <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:9px;height:9px;border-radius:2px;background:#fdae61;flex-shrink:0;"></span> <strong>${t('legend_getis_hl') || 'High-Low'}</strong></span>
                <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:9px;height:9px;border-radius:2px;background:#abd9e9;flex-shrink:0;"></span> <strong>${t('legend_getis_lh') || 'Low-High'}</strong></span>
                <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:9px;height:9px;border-radius:2px;background:#2c7bb6;flex-shrink:0;"></span> <strong>${t('legend_getis_ll') || 'Low-Low'}</strong></span>
              </div>
            ` : ''}
          </div>
        `;
      });

      if (activeCount === 0) {
        html += `<div style="color:#9ca3af;font-size:0.75rem;padding:4px 0;">${t('legend_no_layer')}</div>`;
      }
    } else {
      // Normal Mode: show sidebar checked layers in MRU order (most recently activated layer at the TOP)
      activeLayerOrder.forEach(key => {
        const item = rasterOverlays[key];
        if (!item) return;
        const checkbox = document.getElementById(item.id);
        if (checkbox && checkbox.checked) {
          activeCount++;
          const title = t(`legend_${item.key}_title`);
          const minLbl = t(`legend_${item.key}_min`);
          const maxLbl = t(`legend_${item.key}_max`);
          const currentPct = Math.round(item.opacity * 100);

          if (key === 'getisOrd') {
            html += `
              <div class="legend-block" data-layer-key="getisOrd">
                <div class="legend-header-row">
                  <span class="legend-layer-name">${title}</span>
                  <div class="legend-opacity-ctrl" title="${t('opacity_lbl')}">
                    <i class="fas fa-adjust" style="font-size: 0.65rem; color: #9ca3af;"></i>
                    <input type="range" class="legend-opacity-slider" min="0" max="100" value="${currentPct}" data-layer-key="getisOrd">
                    <span class="legend-opacity-val" data-layer-key="getisOrd">${currentPct}%</span>
                  </div>
                </div>
                <div class="legend-gradient-bar" style="background: ${item.gradient};"></div>
                <div class="legend-labels">
                  <span>${minLbl}</span>
                  <span>${maxLbl}</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;margin-top:6px;font-size:0.68rem;color:#374151;">
                  <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:9px;height:9px;border-radius:2px;background:#d7191c;flex-shrink:0;"></span> <strong>${t('legend_getis_hh') || 'High-High'}</strong></span>
                  <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:9px;height:9px;border-radius:2px;background:#fdae61;flex-shrink:0;"></span> <strong>${t('legend_getis_hl') || 'High-Low'}</strong></span>
                  <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:9px;height:9px;border-radius:2px;background:#abd9e9;flex-shrink:0;"></span> <strong>${t('legend_getis_lh') || 'Low-High'}</strong></span>
                  <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:9px;height:9px;border-radius:2px;background:#2c7bb6;flex-shrink:0;"></span> <strong>${t('legend_getis_ll') || 'Low-Low'}</strong></span>
                </div>
              </div>
            `;
          } else {
            html += `
              <div class="legend-block" data-layer-key="${key}">
                <div class="legend-header-row">
                  <span class="legend-layer-name">${title}</span>
                  <div class="legend-opacity-ctrl" title="${t('opacity_lbl')}">
                    <i class="fas fa-adjust" style="font-size: 0.65rem; color: #9ca3af;"></i>
                    <input type="range" class="legend-opacity-slider" min="0" max="100" value="${currentPct}" data-layer-key="${key}">
                    <span class="legend-opacity-val" data-layer-key="${key}">${currentPct}%</span>
                  </div>
                </div>
                <div class="legend-gradient-bar" style="background: ${item.gradient};"></div>
                <div class="legend-labels">
                  <span>${minLbl}</span>
                  <span>${maxLbl}</span>
                </div>
              </div>
            `;
          }
        }
      });

      if (activeCount === 0) {
        html += `<div style="color:#9ca3af;font-size:0.75rem;padding:4px 0;">${t('legend_no_layer')}</div>`;
      }
    }

    html += `</div>`;
    legendContainer.innerHTML = html;

    // Attach listeners to legend sliders
    legendContainer.querySelectorAll('.legend-opacity-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const key = e.target.getAttribute('data-layer-key');
        setLayerOpacity(key, parseInt(e.target.value, 10));
      });
    });

    const toggleBtn = document.getElementById('btn-toggle-legend');
    const content = document.getElementById('legend-content');
    if (toggleBtn && content) {
      toggleBtn.addEventListener('click', () => {
        if (content.style.display === 'none') {
          content.style.display = 'block';
          toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
          content.style.display = 'none';
          toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
      });
    }
  }

  // 7. Connect Sidebar Switches to Layers
  for (const key in rasterOverlays) {
    const item = rasterOverlays[key];
    const checkbox = document.getElementById(item.id);
    if (!checkbox) continue;

    if (checkbox.checked) {
      item.layer.addTo(map);
      activeLayerOrder.push(key);
    }

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (!map.hasLayer(item.layer)) item.layer.addTo(map);
        if (item.layer.bringToFront) item.layer.bringToFront();
        // Move to the very top (index 0) of legend & stack
        const idx = activeLayerOrder.indexOf(key);
        if (idx !== -1) activeLayerOrder.splice(idx, 1);
        activeLayerOrder.unshift(key);
      } else {
        if (map.hasLayer(item.layer)) map.removeLayer(item.layer);
        const idx = activeLayerOrder.indexOf(key);
        if (idx !== -1) activeLayerOrder.splice(idx, 1);
      }
      updateLegend();
    });
  }

  updateLegend();

  // 8. Connect Basemap Radios (Synchronizes both Main Map and Inset Map)
  const basemapRadios = [
    { id: 'bm-roadmap', key: 'roadmap', layer: basemaps.roadmap },
    { id: 'bm-satellite', key: 'satellite', layer: basemaps.satellite },
    { id: 'bm-dark', key: 'dark', layer: basemaps.dark },
    { id: 'bm-clean', key: 'clean', layer: basemaps.clean }
  ];

  basemapRadios.forEach(({ id, key, layer }) => {
    const radio = document.getElementById(id);
    if (!radio) return;

    radio.addEventListener('change', () => {
      if (radio.checked) {
        currentBasemapKey = key;
        if (activeBasemap && map.hasLayer(activeBasemap)) {
          map.removeLayer(activeBasemap);
        }
        activeBasemap = layer;
        activeBasemap.addTo(map);

        // Bring raster overlays to front in order of activeLayerOrder (activeLayerOrder[0] on very top)
        for (let i = activeLayerOrder.length - 1; i >= 0; i--) {
          const rKey = activeLayerOrder[i];
          const rItem = rasterOverlays[rKey];
          if (rItem && map.hasLayer(rItem.layer) && rItem.layer.bringToFront) {
            rItem.layer.bringToFront();
          }
        }
        // Bring measurements to front
        measureLayerGroup.eachLayer(l => {
          if (l.bringToFront) l.bringToFront();
        });

        // Sync with Inset Map
        syncInsetBasemap(key);
      }
    });
  });

  // 9. Connect Floating Control Buttons (Recenter, Zoom, Info)
  const btnRecenter = document.getElementById('btn-recenter');
  if (btnRecenter) {
    btnRecenter.addEventListener('click', () => {
      map.flyTo(kalimantanCenter, initialZoom, { duration: 1.0 });
    });
  }

  const btnZoomIn = document.getElementById('btn-zoom-in');
  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => map.zoomIn());
  }

  const btnZoomOut = document.getElementById('btn-zoom-out');
  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => map.zoomOut());
  }

  const btnMapInfo = document.getElementById('btn-map-info');
  if (btnMapInfo) {
    btnMapInfo.addEventListener('click', () => {
      const modal = document.getElementById('map-info-modal');
      if (modal) modal.classList.toggle('active');
    });
  }

  const btnCloseModal = document.getElementById('btn-close-modal');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      const modal = document.getElementById('map-info-modal');
      if (modal) modal.classList.remove('active');
    });
  }

  // =========================================================================
  // 10. Interactive Measurement Tool (Penggaris Jarak & Luas Poligon)
  // =========================================================================

  // Toggle Measure Panel
  if (btnMeasureTool && measurePanel) {
    btnMeasureTool.addEventListener('click', () => {
      const isVisible = measurePanel.style.display !== 'none';
      if (isVisible) {
        closeMeasureTool();
      } else {
        if (isSwipeActive) exitSwipeMode();
        measurePanel.style.display = 'block';
        btnMeasureTool.classList.add('active-tool');
        setMeasureMode('distance');
      }
    });
  }

  if (btnCloseMeasure) {
    btnCloseMeasure.addEventListener('click', closeMeasureTool);
  }

  function closeMeasureTool() {
    if (measurePanel) measurePanel.style.display = 'none';
    if (btnMeasureTool) btnMeasureTool.classList.remove('active-tool');
    deactivateDrawing();
  }

  function setMeasureMode(mode) {
    measureMode = mode;
    resetDrawingState();

    const t = window.i18n ? (k) => window.i18n.t(k) : (k) => k;

    if (btnModeDistance && btnModeArea) {
      if (mode === 'distance') {
        btnModeDistance.classList.add('active');
        btnModeArea.classList.remove('active');
        if (measureInstruction) measureInstruction.innerHTML = t('measure_instruction_line');
        if (measureResultLabel) measureResultLabel.innerText = t('measure_lbl_total_dist');
      } else if (mode === 'area') {
        btnModeArea.classList.add('active');
        btnModeDistance.classList.remove('active');
        if (measureInstruction) measureInstruction.innerHTML = t('measure_instruction_poly');
        if (measureResultLabel) measureResultLabel.innerText = t('measure_lbl_total_area');
      }
    }

    const container = map.getContainer();
    container.style.cursor = 'crosshair';
  }

  if (btnModeDistance) {
    btnModeDistance.addEventListener('click', () => setMeasureMode('distance'));
  }
  if (btnModeArea) {
    btnModeArea.addEventListener('click', () => setMeasureMode('area'));
  }

  function deactivateDrawing() {
    measureMode = null;
    const container = map.getContainer();
    container.style.cursor = '';
    if (btnModeDistance) btnModeDistance.classList.remove('active');
    if (btnModeArea) btnModeArea.classList.remove('active');
    if (guideLine && map.hasLayer(guideLine)) map.removeLayer(guideLine);
    guideLine = null;
    if (btnMeasureFinish) btnMeasureFinish.style.display = 'none';
  }

  function resetDrawingState() {
    measurePoints = [];
    currentShape = null;
    vertexMarkers = [];
    if (guideLine && map.hasLayer(guideLine)) map.removeLayer(guideLine);
    guideLine = null;
    if (btnMeasureFinish) btnMeasureFinish.style.display = 'none';
  }

  function clearAllMeasurements() {
    measureLayerGroup.clearLayers();
    resetDrawingState();
    if (btnMeasureClear) btnMeasureClear.disabled = true;
    if (measureResultBox) measureResultBox.style.display = 'none';
    if (measureInstruction) {
      const t = window.i18n ? (k) => window.i18n.t(k) : (k) => k;
      measureInstruction.innerHTML = measureMode === 'area' ? t('measure_instruction_poly') : t('measure_instruction_line');
    }
  }

  if (btnMeasureClear) {
    btnMeasureClear.addEventListener('click', clearAllMeasurements);
  }

  if (btnMeasureFinish) {
    btnMeasureFinish.addEventListener('click', finalizeMeasurement);
  }

  function calculateSphericalArea(latlngs) {
    if (latlngs.length < 3) return 0;
    const RADIUS = 6378137.0;
    let area = 0.0;
    const len = latlngs.length;
    for (let i = 0; i < len; i++) {
      const p1 = latlngs[i];
      const p2 = latlngs[(i + 1) % len];
      const dLambda = (p2.lng - p1.lng) * Math.PI / 180.0;
      const sinPhi1 = Math.sin(p1.lat * Math.PI / 180.0);
      const sinPhi2 = Math.sin(p2.lat * Math.PI / 180.0);
      area += dLambda * (2 + sinPhi1 + sinPhi2);
    }
    area = Math.abs(area * RADIUS * RADIUS / 2.0);
    return area;
  }

  function formatDistance(meters) {
    if (meters < 1000) return `${meters.toFixed(1)} m`;
    return `${(meters / 1000).toFixed(2)} km`;
  }

  function formatArea(sqMeters) {
    if (sqMeters < 10000) {
      return `${sqMeters.toLocaleString('id-ID', { maximumFractionDigits: 1 })} m²`;
    }
    const ha = (sqMeters / 10000).toFixed(2);
    if (sqMeters < 1000000) {
      return `${sqMeters.toLocaleString('id-ID', { maximumFractionDigits: 0 })} m² (${ha} ha)`;
    }
    const km2 = (sqMeters / 1000000).toFixed(2);
    return `${km2} km² (${ha} ha)`;
  }

  map.on('click', (e) => {
    if (!measureMode) return;
    const latlng = e.latlng;
    measurePoints.push(latlng);

    if (btnMeasureClear) btnMeasureClear.disabled = false;
    if (btnMeasureFinish) btnMeasureFinish.style.display = 'inline-flex';

    const vertexMarker = L.circleMarker(latlng, {
      radius: 5,
      color: '#c2410c',
      weight: 2,
      fillColor: '#ffffff',
      fillOpacity: 1
    }).addTo(measureLayerGroup);
    vertexMarkers.push(vertexMarker);

    if (measureMode === 'distance') {
      handleDistanceClick();
    } else if (measureMode === 'area') {
      handleAreaClick();
    }
  });

  function handleDistanceClick() {
    let totalDist = 0;
    for (let i = 0; i < measurePoints.length - 1; i++) {
      totalDist += map.distance(measurePoints[i], measurePoints[i + 1]);
    }

    if (!currentShape) {
      currentShape = L.polyline(measurePoints, {
        color: '#ea580c',
        weight: 3.5,
        opacity: 0.9,
        dashArray: '6, 6'
      }).addTo(measureLayerGroup);
    } else {
      currentShape.setLatLngs(measurePoints);
    }

    if (measureResultBox && measureResultValue) {
      measureResultBox.style.display = 'block';
      measureResultValue.innerText = formatDistance(totalDist);
    }

    const lastIdx = measurePoints.length - 1;
    if (lastIdx > 0) {
      vertexMarkers[lastIdx].bindTooltip(formatDistance(totalDist), {
        permanent: true,
        direction: 'top',
        className: 'measure-tooltip'
      }).openTooltip();
    }
  }

  function handleAreaClick() {
    if (!currentShape) {
      currentShape = L.polygon(measurePoints, {
        color: '#c2410c',
        weight: 2.5,
        fillColor: '#ea580c',
        fillOpacity: 0.28,
        dashArray: '5, 5'
      }).addTo(measureLayerGroup);
    } else {
      currentShape.setLatLngs(measurePoints);
    }

    if (measurePoints.length >= 3) {
      const area = calculateSphericalArea(measurePoints);
      if (measureResultBox && measureResultValue) {
        measureResultBox.style.display = 'block';
        measureResultValue.innerText = formatArea(area);
      }
    }
  }

  map.on('mousemove', (e) => {
    if (!measureMode || measurePoints.length === 0) return;
    const currentLatLng = e.latlng;
    const lastLatLng = measurePoints[measurePoints.length - 1];

    if (!guideLine) {
      guideLine = L.polyline([lastLatLng, currentLatLng], {
        color: '#f97316',
        weight: 2,
        opacity: 0.7,
        dashArray: '4, 4'
      }).addTo(map);
    } else {
      guideLine.setLatLngs([lastLatLng, currentLatLng]);
    }
  });

  map.on('dblclick', () => {
    if (!measureMode || measurePoints.length < 2) return;
    finalizeMeasurement();
  });

  function finalizeMeasurement() {
    if (guideLine && map.hasLayer(guideLine)) {
      map.removeLayer(guideLine);
      guideLine = null;
    }

    if (measureMode === 'area' && measurePoints.length >= 3 && currentShape) {
      const area = calculateSphericalArea(measurePoints);
      const center = currentShape.getBounds().getCenter();
      
      L.popup({ closeButton: false, className: 'measure-tooltip' })
        .setLatLng(center)
        .setContent(`<strong>${formatArea(area)}</strong>`)
        .openOn(map);

      if (measureResultBox && measureResultValue) {
        measureResultBox.style.display = 'block';
        measureResultValue.innerText = formatArea(area);
      }
    } else if (measureMode === 'distance' && measurePoints.length >= 2) {
      let totalDist = 0;
      for (let i = 0; i < measurePoints.length - 1; i++) {
        totalDist += map.distance(measurePoints[i], measurePoints[i + 1]);
      }
      if (measureResultBox && measureResultValue) {
        measureResultBox.style.display = 'block';
        measureResultValue.innerText = formatDistance(totalDist);
      }
    }

    resetDrawingState();
  }

  // =========================================================================
  // 11. Interactive Swipe / Split-Screen Comparison Mode
  // =========================================================================
  if (btnSwipeTool) {
    btnSwipeTool.addEventListener('click', () => {
      if (isSwipeActive) {
        exitSwipeMode();
      } else {
        enterSwipeMode();
      }
    });
  }

  if (btnCloseSwipe) {
    btnCloseSwipe.addEventListener('click', exitSwipeMode);
  }

  function onMapMoveSwipe() {
    if (isSwipeActive) {
      updateDividerPosition(currentDividerX);
    }
  }

  function enterSwipeMode() {
    isSwipeActive = true;
    closeMeasureTool();
    if (btnSwipeTool) btnSwipeTool.classList.add('active-tool');

    if (swipeToolbar) swipeToolbar.style.display = 'block';
    if (swipeDivider) swipeDivider.style.display = 'block';

    // Temporarily remove standard overlays from map
    for (const key in rasterOverlays) {
      const item = rasterOverlays[key];
      if (map.hasLayer(item.layer)) {
        map.removeLayer(item.layer);
      }
    }

    // Bind map events so panning/zooming recalculates clipping
    map.on('move', onMapMoveSwipe);
    map.on('zoom', onMapMoveSwipe);
    map.on('resize', onMapMoveSwipe);

    // Set initial position at 50%
    const mapWidth = map.getSize().x;
    currentDividerX = mapWidth * 0.5;

    // Render left & right comparison layers
    updateSwipeLayers();
  }

  function exitSwipeMode() {
    isSwipeActive = false;
    if (btnSwipeTool) btnSwipeTool.classList.remove('active-tool');

    if (swipeToolbar) swipeToolbar.style.display = 'none';
    if (swipeDivider) swipeDivider.style.display = 'none';

    // Unbind map events
    map.off('move', onMapMoveSwipe);
    map.off('zoom', onMapMoveSwipe);
    map.off('resize', onMapMoveSwipe);

    // Clean up swipe layers
    if (swipeLeftLayer && map.hasLayer(swipeLeftLayer)) map.removeLayer(swipeLeftLayer);
    if (swipeRightLayer && map.hasLayer(swipeRightLayer)) map.removeLayer(swipeRightLayer);
    swipeLeftLayer = null;
    swipeRightLayer = null;

    // Reset pane clipPaths completely
    const leftPane = map.getPane('swipeLeftPane');
    const rightPane = map.getPane('swipeRightPane');
    if (leftPane) {
      leftPane.style.clip = '';
      leftPane.style.clipPath = '';
      leftPane.style.webkitClipPath = '';
    }
    if (rightPane) {
      rightPane.style.clip = '';
      rightPane.style.clipPath = '';
      rightPane.style.webkitClipPath = '';
    }

    // Restore standard overlays based on sidebar checkboxes in activeLayerOrder
    for (let i = activeLayerOrder.length - 1; i >= 0; i--) {
      const key = activeLayerOrder[i];
      const item = rasterOverlays[key];
      if (!item) continue;
      const cb = document.getElementById(item.id);
      if (cb && cb.checked) {
        if (!map.hasLayer(item.layer)) item.layer.addTo(map);
        if (item.layer.bringToFront) item.layer.bringToFront();
      }
    }
    updateLegend();
  }

  function updateSwipeLayers() {
    if (!isSwipeActive) return;

    const leftKey = swipeLeftSelect ? swipeLeftSelect.value : 'temporaryHabitat';
    const rightKey = swipeRightSelect ? swipeRightSelect.value : 'habitat';

    if (swipeLeftLayer && map.hasLayer(swipeLeftLayer)) {
      map.removeLayer(swipeLeftLayer);
      swipeLeftLayer = null;
    }
    if (swipeRightLayer && map.hasLayer(swipeRightLayer)) {
      map.removeLayer(swipeRightLayer);
      swipeRightLayer = null;
    }

    const leftConfig = rasterOverlays[leftKey];
    const rightConfig = rasterOverlays[rightKey];

    if (leftConfig) {
      swipeLeftLayer = L.imageOverlay(leftConfig.url, leftConfig.bounds, {
        pane: 'swipeLeftPane',
        opacity: leftConfig.opacity || 0.95
      }).addTo(map);
    }

    if (rightConfig) {
      swipeRightLayer = L.imageOverlay(rightConfig.url, rightConfig.bounds, {
        pane: 'swipeRightPane',
        opacity: rightConfig.opacity || 0.95
      }).addTo(map);
    }

    updateDividerPosition(currentDividerX);
    updateLegend();
  }

  function updateDividerPosition(x) {
    if (!swipeDivider) return;
    const mapSize = map.getSize();
    const mapWidth = mapSize.x;
    const clampedX = Math.max(10, Math.min(x, mapWidth - 10));
    currentDividerX = clampedX;

    swipeDivider.style.left = `${clampedX}px`;

    // Accurate Leaflet Container-to-Layer coordinate translation
    const nw = map.containerPointToLayerPoint([0, 0]);
    const se = map.containerPointToLayerPoint(mapSize);
    const clipX = nw.x + clampedX;

    const leftPane = map.getPane('swipeLeftPane');
    const rightPane = map.getPane('swipeRightPane');

    // Left pane visible area: from viewport left (nw.x) to divider (clipX)
    const leftClipRect = `rect(${nw.y}px, ${clipX}px, ${se.y}px, ${nw.x}px)`;
    const leftClipPoly = `polygon(${nw.x}px ${nw.y}px, ${clipX}px ${nw.y}px, ${clipX}px ${se.y}px, ${nw.x}px ${se.y}px)`;

    // Right pane visible area: from divider (clipX) to viewport right (se.x)
    const rightClipRect = `rect(${nw.y}px, ${se.x}px, ${se.y}px, ${clipX}px)`;
    const rightClipPoly = `polygon(${clipX}px ${nw.y}px, ${se.x}px ${nw.y}px, ${se.x}px ${se.y}px, ${clipX}px ${se.y}px)`;

    if (leftPane) {
      leftPane.style.clip = leftClipRect;
      leftPane.style.clipPath = leftClipPoly;
      leftPane.style.webkitClipPath = leftClipPoly;
    }
    if (rightPane) {
      rightPane.style.clip = rightClipRect;
      rightPane.style.clipPath = rightClipPoly;
      rightPane.style.webkitClipPath = rightClipPoly;
    }
  }

  if (swipeLeftSelect) swipeLeftSelect.addEventListener('change', updateSwipeLayers);
  if (swipeRightSelect) swipeRightSelect.addEventListener('change', updateSwipeLayers);

  // Swipe Divider Drag Handling (Mouse and Touch)
  if (swipeDivider) {
    swipeDivider.addEventListener('mousedown', (e) => {
      isDraggingSwipe = true;
      e.preventDefault();
      e.stopPropagation();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingSwipe || !isSwipeActive) return;
      const mapRect = map.getContainer().getBoundingClientRect();
      const x = e.clientX - mapRect.left;
      updateDividerPosition(x);
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingSwipe) isDraggingSwipe = false;
    });

    // Touch support for mobile / touchpads
    swipeDivider.addEventListener('touchstart', (e) => {
      isDraggingSwipe = true;
      e.preventDefault();
      e.stopPropagation();
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingSwipe || !isSwipeActive || !e.touches[0]) return;
      const mapRect = map.getContainer().getBoundingClientRect();
      const x = e.touches[0].clientX - mapRect.left;
      updateDividerPosition(x);
    });

    window.addEventListener('touchend', () => {
      if (isDraggingSwipe) isDraggingSwipe = false;
    });
  }

  // Update measurement and legend texts on language change
  window.addEventListener('mawas:languageChanged', () => {
    updateLegend();
    const t = window.i18n ? (k) => window.i18n.t(k) : (k) => k;
    if (measureMode === 'distance' && measureInstruction) {
      measureInstruction.innerHTML = t('measure_instruction_line');
    } else if (measureMode === 'area' && measureInstruction) {
      measureInstruction.innerHTML = t('measure_instruction_poly');
    }
  });
});
