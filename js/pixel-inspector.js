/**
 * MAWAS - Pixel Inspector Engine (js/pixel-inspector.js)
 *
 * Samples pixel values from pre-decoded raster data (window.MAWAS_RASTER_DATA).
 * Completely immune to file:// protocol security restrictions, CORS, and tainted canvas.
 * Execution is synchronous and instantaneous with 0ms buffering.
 * Supports smooth, seamless toggling between Point and Area inspection while open.
 */
(function () {
  'use strict';

  /* =====================================================================
     Pre-decoded raster store
  ===================================================================== */
  const decodedData = {};

  function initData() {
    const raw = window.MAWAS_RASTER_DATA;
    if (!raw) return;
    Object.keys(raw).forEach(key => {
      const item = raw[key];
      const binary = atob(item.data);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      decodedData[key] = {
        width: item.width,
        height: item.height,
        bounds: item.bounds,
        data: bytes
      };
    });
  }

  /* =====================================================================
     Point sampler
  ===================================================================== */
  function samplePoint(key, lat, lon) {
    if (!decodedData[key]) initData();
    const layer = decodedData[key];
    if (!layer) return null;
    const { latSW, lonSW, latNE, lonNE } = layer.bounds;
    if (lon < lonSW || lon > lonNE || lat < latSW || lat > latNE) return null;

    const W = layer.width, H = layer.height;
    const px = Math.min(W - 1, Math.max(0, Math.floor(((lon - lonSW) / (lonNE - lonSW)) * W)));
    const py = Math.min(H - 1, Math.max(0, Math.floor(((latNE - lat) / (latNE - latSW)) * H)));
    const byte = layer.data[py * W + px];
    if (byte === 0) return null;

    if (key === 'getisOrd') {
      return byte === 1 ? 'cold' : byte === 3 ? 'hot' : 'neutral';
    }
    return byte / 255.0;
  }

  /* =====================================================================
     Area sampler (5 km / 10 km / 25 km / 50 km circle)
  ===================================================================== */
  function sampleArea(key, lat, lon, radiusKm) {
    if (!decodedData[key]) initData();
    const layer = decodedData[key];
    if (!layer || key === 'getisOrd') return null;
    const { latSW, lonSW, latNE, lonNE } = layer.bounds;
    const W = layer.width, H = layer.height;

    const dLat = radiusKm / 111.0;
    const dLon = radiusKm / (111.0 * Math.cos(lat * Math.PI / 180));

    const px0 = Math.max(0, Math.floor(((lon - dLon - lonSW) / (lonNE - lonSW)) * W));
    const px1 = Math.min(W - 1, Math.ceil(((lon + dLon - lonSW) / (lonNE - lonSW)) * W));
    const py0 = Math.max(0, Math.floor(((latNE - (lat + dLat)) / (latNE - latSW)) * H));
    const py1 = Math.min(H - 1, Math.ceil(((latNE - (lat - dLat)) / (latNE - latSW)) * H));
    if (px1 <= px0 || py1 <= py0) return null;

    const r2 = radiusKm * radiusKm;
    const vals = [];
    for (let row = py0; row <= py1; row++) {
      const curLat = latNE - ((row + 0.5) / H) * (latNE - latSW);
      const dlatKm = (curLat - lat) * 111.0;
      for (let col = px0; col <= px1; col++) {
        const curLon = lonSW + ((col + 0.5) / W) * (lonNE - lonSW);
        const dlonKm = (curLon - lon) * 111.0 * Math.cos(lat * Math.PI / 180);
        if (dlatKm * dlatKm + dlonKm * dlonKm > r2) continue;
        const b = layer.data[row * W + col];
        if (b > 0) vals.push(b / 255.0);
      }
    }
    if (!vals.length) return null;
    let sum = 0, minV = Infinity, maxV = -Infinity;
    vals.forEach(v => { sum += v; if (v < minV) minV = v; if (v > maxV) maxV = v; });
    return { count: vals.length, min: minV, max: maxV, mean: sum / vals.length };
  }

  /* =====================================================================
     State
  ===================================================================== */
  let isActive   = false;
  let mode       = 'point';     // 'point' | 'area'
  let areaKm     = 10;
  let curMarker  = null;
  let curCircle  = null;
  let curPopup   = null;
  let curCoords  = null;
  let curResults = null;

  /* =====================================================================
     Helpers
  ===================================================================== */
  function getLang() {
    return (window.i18n && typeof window.i18n.getCurrentLanguage === 'function')
      ? window.i18n.getCurrentLanguage()
      : (localStorage.getItem('mawas_lang') || 'id');
  }

  function getC() {
    const cfg = window.PIXEL_INSPECTOR_CONTENT || (typeof PIXEL_INSPECTOR_CONTENT !== 'undefined' ? PIXEL_INSPECTOR_CONTENT : null);
    if (!cfg) return {};
    return cfg[getLang()] || cfg.id || {};
  }

  function isLayerOn(key) {
    if (window.rasterOverlays && window.rasterOverlays[key]) {
      const el = document.getElementById(window.rasterOverlays[key].id);
      return el ? el.checked : false;
    }
    return false;
  }

  /* =====================================================================
     Global interactive handlers (inline attributes for 100% reliability)
  ===================================================================== */
  window.mawasInspectorSwitchTab = function (newMode) {
    if (newMode === mode) return;
    mode = newMode;
    const map = window.mawasMap;
    if (!map || !curCoords) return;
    runInspection(map, curCoords.lat, curCoords.lon);
  };

  window.mawasInspectorSetRadius = function (newRadius) {
    areaKm = parseFloat(newRadius) || 10;
    const map = window.mawasMap;
    if (!map || !curCoords) return;
    if (curCircle) curCircle.setRadius(areaKm * 1000);
    runInspection(map, curCoords.lat, curCoords.lon);
  };

  window.mawasInspectorCopyCoords = function (btn) {
    if (!curCoords) return;
    const c = getC();
    const txt = `${curCoords.lat.toFixed(5)}, ${curCoords.lon.toFixed(5)}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(() => {
        btn.innerHTML = `<i class="fas fa-check"></i> <span>${c.copied_btn || 'Tersalin!'}</span>`;
        setTimeout(() => {
          btn.innerHTML = `<i class="fas fa-copy"></i> <span>${c.copy_btn || 'Salin'}</span>`;
        }, 1800);
      });
    }
  };

  /* =====================================================================
     HTML builder
  ===================================================================== */
  function buildHTML(lat, lon, results) {
    const c    = getC();
    const latS = lat.toFixed(4);
    const lonS = lon.toFixed(4);

    let h = `
<div class="inspector-header">
  <div class="inspector-header-top">
    <h3 class="inspector-title">
      <span>${c.title || 'Pixel Inspector'}</span>
    </h3>
  </div>
</div>
<div class="inspector-coords-row">
  <span class="coords-text">${latS}°, ${lonS}°</span>
  <button class="btn-copy-coords" id="pi-copy-btn" onclick="window.mawasInspectorCopyCoords(this)">
    <i class="fas fa-copy"></i> <span>${c.copy_btn || 'Salin'}</span>
  </button>
</div>
<div class="inspector-tabs">
  <button class="inspector-tab-btn ${mode === 'point' ? 'active' : ''}" data-tab="point" onclick="window.mawasInspectorSwitchTab('point')">
    <i class="fas fa-map-pin"></i> <span>${c.tab_point || 'Titik'}</span>
  </button>
  <button class="inspector-tab-btn ${mode === 'area' ? 'active' : ''}" data-tab="area" onclick="window.mawasInspectorSwitchTab('area')">
    <i class="fas fa-circle-notch"></i> <span>${c.tab_area || 'Area'}</span>
  </button>
</div>`;

    if (mode === 'area') {
      h += `<div class="inspector-area-ctrls">
  <span>${c.area_radius_label || 'Radius:'}</span>
  <select class="area-radius-select" id="pi-radius-sel" onchange="window.mawasInspectorSetRadius(this.value)">
    <option value="5"  ${areaKm === 5 ? 'selected' : ''}>5 km</option>
    <option value="10" ${areaKm === 10 ? 'selected' : ''}>10 km</option>
    <option value="25" ${areaKm === 25 ? 'selected' : ''}>25 km</option>
    <option value="50" ${areaKm === 50 ? 'selected' : ''}>50 km</option>
  </select>
</div>`;
    }

    h += `<div class="inspector-body">`;

    if (!results || results.allNull) {
      h += `<div class="inspector-outside-box">
  <div class="outside-title"><i class="fas fa-water"></i> <span>${c.outside_study || 'Di luar area studi'}</span></div>
  <div class="outside-desc">${c.outside_study_desc || 'Titik ini di luar cakupan raster Kalimantan.'}</div>
</div>`;

    } else {
      ['temporaryHabitat', 'ike', 'airQuality', 'habitat', 'getisOrd'].forEach(k => {
        const meta = c.layers && c.layers[k];
        if (!meta) return;
        const on   = isLayerOn(k);
        const d    = results[k];

        h += `<div class="inspector-layer-row ${on ? 'is-active-on-map' : ''}">
  <div class="layer-row-top">
    <div class="layer-name-wrap">
      <span>${meta.name}</span>
      ${on ? `<span class="layer-badge-active">${c.active_layer_badge || 'Aktif'}</span>` : ''}
    </div>`;

        if (mode === 'point') {
          if (k === 'getisOrd') {
            const cls = d ? d.cls : null;
            if (!cls) {
              h += `<span class="layer-val-num nodata">${c.no_data || 'Tidak ada data'}</span>`;
            } else {
              const fakeZ = cls === 'hot' ? 2.5 : cls === 'cold' ? -2.5 : 0;
              const ci    = meta.classify ? meta.classify(fakeZ) : null;
              h += `<div class="layer-val-wrap">
  ${ci ? `<span class="layer-class-pill" style="background:${ci.color};">${ci.label}</span>` : `<span class="layer-val-num">${cls}</span>`}
</div>`;
              if (meta.gradient) {
                const pct = cls === 'hot' ? 90 : cls === 'cold' ? 10 : 50;
                h += `<div class="layer-bar-container" style="background:${meta.gradient};">
  <div class="layer-bar-pointer" style="left:${pct}%;"></div>
</div>`;
              }
            }
          } else {
            const val = d ? d.val : null;
            if (val === null || val === undefined) {
              h += `<span class="layer-val-num nodata">${c.no_data || 'Tidak ada data'}</span>`;
            } else {
              const fmt = meta.format ? meta.format(val) : val.toFixed(3);
              const ci  = meta.classify ? meta.classify(val) : null;
              h += `<div class="layer-val-wrap">
  <span class="layer-val-num">${fmt}</span>
  ${ci ? `<span class="layer-class-pill" style="background:${ci.color};">${ci.label}</span>` : ''}
</div>`;
              if (meta.gradient && meta.min !== undefined && meta.max !== undefined) {
                const pct = Math.max(0, Math.min(100,
                  ((Math.max(meta.min, Math.min(meta.max, val)) - meta.min) / (meta.max - meta.min)) * 100));
                h += `<div class="layer-bar-container" style="background:${meta.gradient};">
  <div class="layer-bar-pointer" style="left:${pct}%;"></div>
</div>`;
              }
            }
          }
          h += `</div>`; // closes layer-row-top
        } else {
          // area mode
          h += `</div>`; // closes layer-row-top
          const stats = d ? d.stats : null;
          if (!stats) {
            h += `<div style="padding: 4px 0;"><span class="layer-val-num nodata">${k === 'getisOrd' ? (getLang() === 'en' ? 'Point-only analysis' : 'Analisis titik tunggal') : (c.no_data || 'Tidak ada data')}</span></div>`;
          } else {
            h += `
<div class="area-stats-grid">
  <div class="area-stat-item"><span class="stat-label">${c.stat_min || 'Min'}</span><span class="stat-val">${stats.min.toFixed(3)}</span></div>
  <div class="area-stat-item"><span class="stat-label">${c.stat_mean || 'Rerata'}</span><span class="stat-val" style="color:var(--primary,#c2410c);">${stats.mean.toFixed(3)}</span></div>
  <div class="area-stat-item"><span class="stat-label">${c.stat_max || 'Maks'}</span><span class="stat-val">${stats.max.toFixed(3)}</span></div>
</div>
<div class="area-pixel-count">${c.area_pixels_count || 'Piksel:'} ${stats.count} px</div>`;
          }
        }

        h += `</div>`; // closes inspector-layer-row
      });
    }

    h += `</div>`; // closes inspector-body
    return h;
  }

  /* =====================================================================
     Popup management
  ===================================================================== */
  function openPopup(map, lat, lon, html) {
    const cardHTML = `<div class="inspector-card" role="dialog">${html}</div>`;

    if (!curPopup) {
      curPopup = L.popup({
        className:      'pixel-inspector-popup',
        offset:         [0, -10],
        closeButton:    true,
        autoPan:        true,
        autoPanPadding: [20, 20],
        closeOnClick:   false,
        maxWidth:       340
      }).setLatLng([lat, lon]).setContent(cardHTML).openOn(map);

      curPopup.on('remove', () => {
        clearOverlays(map);
        curPopup = null;
      });
    } else {
      curPopup.setLatLng([lat, lon]);
      curPopup.setContent(cardHTML);
      if (!map.hasLayer(curPopup)) curPopup.openOn(map);
    }
  }

  /* =====================================================================
     Map overlays
  ===================================================================== */
  function placeMarker(map, lat, lon) {
    if (!curMarker) {
      curMarker = L.marker([lat, lon], {
        icon: L.divIcon({
          className: 'pixel-inspector-marker',
          html: '<div class="pin-pulse"></div><div class="pin-center"></div>',
          iconSize: [24, 24], iconAnchor: [12, 12]
        }),
        zIndexOffset: 1000
      }).addTo(map);
    } else {
      curMarker.setLatLng([lat, lon]);
    }
  }

  function placeCircle(map, lat, lon) {
    if (mode !== 'area') {
      if (curCircle && map.hasLayer(curCircle)) map.removeLayer(curCircle);
      return;
    }
    if (!curCircle) {
      curCircle = L.circle([lat, lon], {
        radius: areaKm * 1000,
        color: '#c2410c',
        weight: 2,
        fillColor: '#ea580c',
        fillOpacity: 0.12,
        dashArray: '4,4'
      }).addTo(map);
    } else {
      curCircle.setLatLng([lat, lon]).setRadius(areaKm * 1000);
      if (!map.hasLayer(curCircle)) curCircle.addTo(map);
    }
  }

  function clearOverlays(map) {
    if (!map) return;
    if (curMarker && map.hasLayer(curMarker)) map.removeLayer(curMarker);
    if (curCircle && map.hasLayer(curCircle)) map.removeLayer(curCircle);
    curMarker = null;
    curCircle = null;
    curCoords = null;
    curResults = null;
  }

  /* =====================================================================
     Main inspection execution (synchronous & instantaneous)
  ===================================================================== */
  function runInspection(map, lat, lon) {
    curCoords = { lat, lon };
    placeMarker(map, lat, lon);
    placeCircle(map, lat, lon);

    if (!Object.keys(decodedData).length) {
      initData();
    }

    const results = {};
    let allNull = true;
    ['temporaryHabitat', 'ike', 'airQuality', 'habitat', 'getisOrd'].forEach(k => {
      if (mode === 'point') {
        const v = samplePoint(k, lat, lon);
        if (v === null || v === undefined) { results[k] = null; return; }
        allNull = false;
        results[k] = k === 'getisOrd' ? { cls: v } : { val: v };
      } else {
        const st = sampleArea(k, lat, lon, areaKm);
        if (!st) { results[k] = null; return; }
        allNull = false;
        results[k] = { stats: st };
      }
    });
    results.allNull = allNull;
    curResults = results;

    openPopup(map, lat, lon, buildHTML(lat, lon, results));
  }

  /* =====================================================================
     Activate / deactivate
  ===================================================================== */
  function activate() {
    isActive = true;
    const btn   = document.getElementById('btn-pixel-inspector');
    const mapEl = document.getElementById('main-map');
    if (btn)   btn.classList.add('active');
    if (mapEl) mapEl.classList.add('pixel-inspector-active');
    const cm = document.getElementById('btn-close-measure');
    if (cm) cm.click();
    initData();
  }

  function deactivate() {
    isActive = false;
    const btn   = document.getElementById('btn-pixel-inspector');
    const mapEl = document.getElementById('main-map');
    if (btn)   btn.classList.remove('active');
    if (mapEl) mapEl.classList.remove('pixel-inspector-active');
    const map = window.mawasMap;
    if (curPopup && map) { map.closePopup(curPopup); curPopup = null; }
    clearOverlays(map);
  }

  function toggle() { isActive ? deactivate() : activate(); }

  /* =====================================================================
     Init
  ===================================================================== */
  function init() {
    initData();

    // Button click
    const btn = document.getElementById('btn-pixel-inspector');
    if (btn) btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); toggle(); });

    // Map click (wait for mawasMap to be ready)
    const poll = setInterval(() => {
      const map = window.mawasMap;
      if (!map) return;
      clearInterval(poll);

      map.on('click', e => {
        if (!isActive) return;
        const tgt = e.originalEvent ? e.originalEvent.target : null;
        if (tgt && tgt.closest('.leaflet-control,.measure-floating-panel,.swipe-floating-toolbar,.map-right-panel,.site-nav,.leaflet-popup')) return;
        runInspection(map, e.latlng.lat, e.latlng.lng);
      });
    }, 100);

    // Esc key
    window.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (curPopup && window.mawasMap && window.mawasMap.hasLayer(curPopup)) {
        window.mawasMap.closePopup(curPopup);
      } else if (isActive) {
        deactivate();
      }
    });

    // Language switch → re-render popup
    window.addEventListener('mawas:languageChanged', () => {
      if (curCoords && curPopup && window.mawasMap) {
        runInspection(window.mawasMap, curCoords.lat, curCoords.lon);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
