/**
 * MAWAS Geospatial Platform - Pixel Inspector Content & Multi-Layer Schema
 * Bilingual text dictionaries (ID / EN), layer metadata, gradients, and thresholds.
 *
 * Value ranges use channel ratios returned by the Canvas-based pixel sampler:
 *   temporaryHabitat, habitat → G / (R+G+B+1)   (higher = greener = better)
 *   ike, airQuality           → R / (R+G+B+1)   (higher = redder = worse)
 *   getisOrd                  → discrete hue class ('hot' | 'cold' | 'neutral')
 */

window.PIXEL_INSPECTOR_CONTENT = {
  id: {
    title: "Pixel Inspector",
    subtitle: "Inspeksi Nilai Piksel Multi-Layer",
    period_badge: "Periode Analisis: 1 Mei – 30 Okt 2019",
    coords_label: "Koordinat:",
    copy_btn: "Salin",
    copied_btn: "Tersalin!",
    loading: "Mengambil nilai piksel dari data raster...",
    outside_study: "Di luar area studi",
    outside_study_desc: "Koordinat ini berada di laut atau di luar cakupan data Kalimantan.",
    no_data: "Tidak ada data",
    active_layer_badge: "Tampil di Peta",
    close_btn: "Tutup (Esc)",
    tab_point: "Inspeksi Titik",
    tab_area: "Inspeksi Area",
    area_radius_label: "Radius Area:",
    area_stats_title: "Statistik Area Terpilih",
    area_pixels_count: "Jumlah Piksel Sampel:",
    stat_min: "Min",
    stat_mean: "Rata-rata",
    stat_max: "Maks",
    btn_clear: "Hapus Penanda",
    load_failed_title: "Gagal memuat data raster",
    load_failed_desc: "Buka peta melalui server lokal: jalankan server.bat, lalu akses http://localhost:8080/peta.html",
    layers: {
      temporaryHabitat: {
        name: "Temporary Potential Habitat",
        desc: "Sintesis Kesesuaian Habitat Sementara",
        unit: "Indeks Warna",
        gradient: "linear-gradient(to right, #dc2626, #facc15, #15803d)",
        min: 0.0,
        max: 0.65,
        format: (val) => val.toFixed(3),
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val < 0.15) return { label: "Risiko Tinggi", color: "#dc2626" };
          if (val <= 0.35) return { label: "Risiko Sedang", color: "#eab308" };
          return { label: "Potensi Aman (Refugia)", color: "#16a34a" };
        }
      },
      ike: {
        name: "Ecological Vulnerability (IVE)",
        desc: "Indeks Kerentanan Ekologi Gambut",
        unit: "Indeks Warna",
        gradient: "linear-gradient(to right, #a7cc6d, #f6e66e, #f09037, #d7231e)",
        min: 0.35,
        max: 0.77,
        format: (val) => val.toFixed(3),
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val < 0.42) return { label: "Rendah", color: "#8cb04e" };
          if (val <= 0.60) return { label: "Sedang", color: "#f09037" };
          return { label: "Kritis", color: "#d7231e" };
        }
      },
      airQuality: {
        name: "Air Pollution Vulnerability",
        desc: "Paparan Partikulat Asap Karhutla",
        unit: "Indeks Warna",
        gradient: "linear-gradient(to right, #168a2d, #87c626, #eedb20, #f58a16, #aa181c)",
        min: 0.10,
        max: 0.77,
        format: (val) => val.toFixed(3),
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val < 0.20) return { label: "Baik", color: "#168a2d" };
          if (val <= 0.50) return { label: "Sedang", color: "#f58a16" };
          return { label: "Bahaya", color: "#aa181c" };
        }
      },
      habitat: {
        name: "Habitat Suitability",
        desc: "Kesesuaian Biofisik MaxEnt",
        unit: "Indeks Warna",
        gradient: "linear-gradient(to right, #d02323, #f07314, #f5cc1e, #8ec02d, #2e6930)",
        min: 0.12,
        max: 0.53,
        format: (val) => val.toFixed(3),
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val < 0.16) return { label: "Tidak Sesuai", color: "#d02323" };
          if (val <= 0.25) return { label: "Kesesuaian Rendah", color: "#f07314" };
          return { label: "Sangat Sesuai", color: "#2e6930" };
        }
      },
      getisOrd: {
        name: "Getis-Ord Gi* (Hotspot)",
        desc: "Klaster Autokorelasi Spasial",
        unit: "Kelas",
        gradient: "linear-gradient(to right, #2c7bb6, #abd9e9, #ffffbf, #fdae61, #d7191c)",
        min: -1,
        max: 1,
        format: (val) => "",
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val >= 1.96) return { label: "Hotspot (High-High)", color: "#d7191c" };
          if (val <= -1.96) return { label: "Coldspot (Low-Low)", color: "#2c7bb6" };
          return { label: "Netral", color: "#64748b" };
        }
      }
    }
  },

  en: {
    title: "Pixel Inspector",
    subtitle: "Multi-Layer Pixel Value Inspection",
    period_badge: "Analysis Period: 1 May – 30 Oct 2019",
    coords_label: "Coordinates:",
    copy_btn: "Copy",
    copied_btn: "Copied!",
    loading: "Sampling pixel values from raster datasets...",
    outside_study: "Outside study area",
    outside_study_desc: "These coordinates lie in water bodies or outside the Kalimantan raster study extent.",
    no_data: "No data",
    active_layer_badge: "Visible on Map",
    close_btn: "Close (Esc)",
    tab_point: "Point Inspection",
    tab_area: "Area Inspection",
    area_radius_label: "Area Radius:",
    area_stats_title: "Selected Area Statistics",
    area_pixels_count: "Sampled Pixel Count:",
    stat_min: "Min",
    stat_mean: "Mean",
    stat_max: "Max",
    btn_clear: "Clear Marker",
    layers: {
      temporaryHabitat: {
        name: "Temporary Potential Habitat",
        desc: "Temporary Habitat Suitability Synthesis",
        unit: "Color Index",
        gradient: "linear-gradient(to right, #dc2626, #facc15, #15803d)",
        min: 0.0,
        max: 0.65,
        format: (val) => val.toFixed(3),
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val < 0.15) return { label: "High Risk", color: "#dc2626" };
          if (val <= 0.35) return { label: "Moderate Risk", color: "#eab308" };
          return { label: "Safe Refugia", color: "#16a34a" };
        }
      },
      ike: {
        name: "Ecological Vulnerability (IVE)",
        desc: "Peatland Ecological Vulnerability Index",
        unit: "Color Index",
        gradient: "linear-gradient(to right, #a7cc6d, #f6e66e, #f09037, #d7231e)",
        min: 0.35,
        max: 0.77,
        format: (val) => val.toFixed(3),
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val < 0.42) return { label: "Low", color: "#8cb04e" };
          if (val <= 0.60) return { label: "Moderate", color: "#f09037" };
          return { label: "Critical", color: "#d7231e" };
        }
      },
      airQuality: {
        name: "Air Pollution Vulnerability",
        desc: "Wildfire Smoke & PM2.5 Exposure",
        unit: "Color Index",
        gradient: "linear-gradient(to right, #168a2d, #87c626, #eedb20, #f58a16, #aa181c)",
        min: 0.10,
        max: 0.77,
        format: (val) => val.toFixed(3),
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val < 0.20) return { label: "Good", color: "#168a2d" };
          if (val <= 0.50) return { label: "Moderate", color: "#f58a16" };
          return { label: "Hazardous", color: "#aa181c" };
        }
      },
      habitat: {
        name: "Habitat Suitability",
        desc: "MaxEnt Biophysical Suitability",
        unit: "Color Index",
        gradient: "linear-gradient(to right, #d02323, #f07314, #f5cc1e, #8ec02d, #2e6930)",
        min: 0.12,
        max: 0.53,
        format: (val) => val.toFixed(3),
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val < 0.16) return { label: "Unsuitable", color: "#d02323" };
          if (val <= 0.25) return { label: "Low Suitability", color: "#f07314" };
          return { label: "Highly Suitable", color: "#2e6930" };
        }
      },
      getisOrd: {
        name: "Getis-Ord Gi* (Hotspot)",
        desc: "Spatial Autocorrelation Cluster",
        unit: "Class",
        gradient: "linear-gradient(to right, #2c7bb6, #abd9e9, #ffffbf, #fdae61, #d7191c)",
        min: -1,
        max: 1,
        format: (val) => "",
        classify: (val) => {
          if (val === null || isNaN(val)) return null;
          if (val >= 1.96) return { label: "Hotspot (High-High)", color: "#d7191c" };
          if (val <= -1.96) return { label: "Coldspot (Low-Low)", color: "#2c7bb6" };
          return { label: "Neutral", color: "#64748b" };
        }
      }
    }
  }
};
