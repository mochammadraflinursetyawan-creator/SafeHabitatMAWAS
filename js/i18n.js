/**
 * MAWAS WebGIS Translation Engine (Bahasa Indonesia <-> English)
 */

const I18N_DICTIONARY = {
  id: {
    // Navigation
    nav_home: "Home",
    nav_maps: "Maps",
    nav_dashboard: "Dashboard",
    nav_pipeline: "Pipeline",
    nav_about: "About",

    // Home Page
    home_title: "MAWAS",
    home_subtitle: "Prioritisasi Habitat Aman Orangutan Kalimantan Berbasis Cloud Spasial",
    home_desc: "Pemodelan komputasi awan Google Earth Engine untuk identifikasi dan prioritisasi habitat aman sementara bagi orangutan Kalimantan (Pongo pygmaeus) di bawah ancaman kebakaran hutan dan kabut asap lintas batas (Mei – Oktober 2019).",
    home_btn_get_started: "Buka Peta Interaktif",

    // Maps Page (peta.html)
    map_desc_header: "MAWAS WebGIS Kalimantan",
    map_desc_body: "Peta interaktif ini menyajikan pemodelan kesesuaian dan prioritisasi habitat sementara orangutan Kalimantan (<em>Pongo pygmaeus</em>) berbasis komputasi awan Google Earth Engine. Pemodelan mengintegrasikan variabel biofisik habitat (MaxEnt), Indeks Kerentanan Ekologi gambut (IVE), serta paparan kabut asap karhutla (PM2.5/PM10) periode Mei – Oktober 2019.",
    map_feature_title: "MAP FEATURE",

    // Layers
    layer_temp_name: "Temporary Potential Habitat",
    layer_temp_desc: "Hasil overlay spasial variabel habitat, IVE, dan polutan udara",
    layer_ive_name: "Ecological Vulnerability Index (IVE)",
    layer_ive_desc: "Kerentanan ekologi gambut berbasis dNBR dan EVI",
    layer_air_name: "Air Pollution Vulnerability",
    layer_air_desc: "Paparan polutan PM2.5/PM10 dan sebaran kabut asap",
    layer_habitat_name: "Habitat Suitability",
    layer_habitat_desc: "Kesesuaian biofisik habitat orangutan berbasis MaxEnt",
    layer_getis_name: "Getis-Ord Gi* (Hotspot)",
    layer_getis_desc: "Analisis klaster spasial hotspot & coldspot habitat orangutan",

    // Basemaps
    basemaps_title: "BASEMAPS",
    bm_roadmap_name: "Google Roadmap",
    bm_roadmap_desc: "Peta jalan standar, label, dan topografi",
    bm_satellite_name: "Google Satellite",
    bm_satellite_desc: "Citra satelit resolusi tinggi dan hibrida",
    bm_dark_name: "Dark Mode",
    bm_dark_desc: "Peta latar tema gelap untuk kontras data tinggi",
    bm_clean_name: "Clean Map",
    bm_clean_desc: "Peta minimalis bersih tanpa teks dan label",

    // Inset
    inset_title: "Peta Inset",
    inset_alt: "Peta Inset Regional Kalimantan",

    // Map Controls Tooltips
    tooltip_recenter: "Pusatkan ke Kalimantan",
    tooltip_zoom_in: "Perbesar (Zoom In)",
    tooltip_zoom_out: "Perkecil (Zoom Out)",
    tooltip_measure: "Alat Ukur Geospasial (Jarak & Luas)",
    tooltip_swipe: "Mode Swipe / Split-Screen Antar Layer",
    tooltip_info: "Informasi & Metodologi",
    tooltip_pixel_inspector: "Pixel Inspector (Inspeksi Nilai Piksel)",
    tooltip_north: "Orientasi Utara",

    // Pixel Inspector
    inspector_title: "Pixel Inspector",
    inspector_period: "Periode Analisis: 1 Mei – 30 Okt 2019",
    inspector_copy: "Salin",
    inspector_copied: "Tersalin!",
    inspector_outside: "Di luar area studi",
    inspector_no_data: "Tidak ada data",
    inspector_active_layer: "Tampil",
    inspector_point_tab: "Inspeksi Titik",
    inspector_area_tab: "Inspeksi Area",

    // Swipe / Split Screen
    swipe_title: "Komparasi Split-Screen",
    swipe_left_lbl: "Sisi Kiri:",
    swipe_right_lbl: "Sisi Kanan:",
    swipe_opt_none: "Hanya Basemap (Tanpa Layer)",
    swipe_close_tooltip: "Tutup Mode Swipe",
    swipe_handle_tooltip: "Geser ke Kiri/Kanan",
    modal_close_tooltip: "Tutup (Esc)",
    opacity_lbl: "Transparansi",

    // Dynamic Legend
    legend_title: "LEGENDA PETA",
    legend_no_layer: "Tidak ada layer aktif. Aktifkan saklar di sidebar untuk melihat data.",
    legend_temp_title: "Temporary Potential Habitat",
    legend_temp_min: "Rendah / Rawan",
    legend_temp_max: "Tinggi / Aman",
    legend_ive_title: "Ecological Vulnerability (IVE)",
    legend_ive_min: "Kerentanan Rendah",
    legend_ive_max: "Sangat Rentan",
    legend_air_title: "Air Pollution Vulnerability",
    legend_air_min: "Rendah / Bersih",
    legend_air_max: "Tinggi / Ekstrem",
    legend_hab_title: "Biofisik Habitat (MaxEnt)",
    legend_hab_min: "Marginal",
    legend_hab_max: "Kesesuaian Optimal",
    legend_getis_title: "Getis-Ord Gi* (Spatial Cluster)",
    legend_getis_min: "Low-Low",
    legend_getis_max: "High-High",
    legend_getis_hh: "High-High",
    legend_getis_hl: "High-Low",
    legend_getis_lh: "Low-High",
    legend_getis_ll: "Low-Low",

    // Measurement Tool
    measure_title: "Alat Ukur Geospasial",
    measure_dist_btn: "Jarak (m/km)",
    measure_area_btn: "Luas (m²/ha)",
    measure_clear: "Hapus",
    measure_finish: "Selesai",
    measure_instruction_default: "Pilih mode pengukuran (Jarak atau Luas) di atas.",
    measure_instruction_line: "Klik di peta untuk mulai mengukur jarak. Klik lagi untuk menambah titik belok. Klik 'Selesai' atau dobel klik untuk mengakhiri.",
    measure_instruction_poly: "Klik di peta untuk membuat titik sudut poligon (minimal 3 titik). Klik 'Selesai' atau klik titik awal untuk menutup area.",
    measure_lbl_total_dist: "Jarak Total:",
    measure_lbl_total_area: "Luas Wilayah:",
    measure_segment: "Segmen",
    measure_point: "Titik",

    // Modal Info
    modal_title: "Informasi Metodologi & Sumber Data",
    modal_p1_strong: "Judul Penelitian:",
    modal_p1_text: " MAWAS: Cloud-Based Geospatial Modeling for Orangutan Safe Habitat Prioritization under Fire and Transboundary Haze in Kalimantan.",
    modal_p2_strong: "Periode Analisis:",
    modal_p2_text: " 1 Mei – 30 Oktober 2019 (Puncak El Niño & Kebakaran Gambut Kalimantan).",
    modal_li1_strong: "Temporary Potential Habitat:",
    modal_li1_text: " Integrasi spasial multikriteria antara kesesuaian biofisik habitat, kerentanan ekologi gambut, dan paparan polutan kabut asap.",
    modal_li2_strong: "Ecological Vulnerability Index (IVE):",
    modal_li2_text: " Diturunkan dari selisih Normalized Burn Ratio (dNBR) Landsat 8/Sentinel-2 dan Enhanced Vegetation Index (EVI).",
    modal_li3_strong: "Air Pollution Vulnerability:",
    modal_li3_text: " Paparan partikulat aerosol PM2.5 dan PM10 dari sensor Sentinel-5P dan MODIS.",
    modal_li4_strong: "Habitat Suitability:",
    modal_li4_text: " Pemodelan Machine Learning MaxEnt berbasis tutupan kanopi hutan dan jarak dari sungai/tepian hutan.",

    // Dashboard Page
    dash_header_title: "MAWAS Analytics & Monitoring Dashboard",
    dash_header_subtitle: "Pusat Komando Analisis Spasiotemporal Kesesuaian Habitat Orangutan Kalimantan (Mei - Oktober 2019)",
    dash_kpi_1_label: "Habitat Potensial Teridentifikasi",
    dash_kpi_1_val: "1.40 Juta Ha",
    dash_kpi_1_sub: "Kesesuaian Biofisik MaxEnt (P ≥ 0.40)",
    dash_kpi_2_label: "Rata-Rata Kerentanan Gambut (IVE)",
    dash_kpi_2_val: "0.50 <span style=\"font-size: 0.85rem; font-weight: 500;\">/ 1.0</span>",
    dash_kpi_2_sub: "23.8% Kubah Gambut Kategori Kritis",
    dash_kpi_3_label: "Titik Observasi Kehadiran",
    dash_kpi_3_val: "400 Titik",
    dash_kpi_3_sub: "Data Survei Sarang & Inventarisasi",
    dash_kpi_4_label: "Klaster Hotspot Inti (Getis-Ord)",
    dash_kpi_4_val: "9.85 Juta Ha",
    dash_kpi_4_sub: "Signifikan 99% Conf. (Z ≥ 2.58)",

    // 4 Main Dashboard Cards
    dash_card_kehadiran_title: "Titik Kehadiran Orangutan",
    dash_card_kehadiran_badge: "DATA OBSERVASI",
    dash_card_kehadiran_caption: "Peta sebaran spasial titik perjumpaan dan observasi lapangan orangutan Kalimantan (Pongo pygmaeus) sebagai data primer kehadiran.",
    dash_card_air_title: "Kualitas Udara & Arah Angin 10 M",
    dash_card_air_badge: "DINAMIKA SPASIOTEMPORAL",
    dash_card_air_caption: "Animasi pergerakan partikulat kabut asap PM2.5/AOD dan vektor angin permukaan 10 meter selama puncak kebakaran hutan Kalimantan 2019.",
    dash_card_getis_title: "Klaster Getis-Ord Gi*",
    dash_card_getis_badge: "AUTOKORELASI SPASIAL",
    dash_card_getis_caption: "Perbandingan analisis klaster spasial Getis-Ord Gi* mengidentifikasi signifikansi statistik zona hotspot (High-High) dan coldspot (Low-Low).",
    dash_card_habitat_title: "Peta Kesesuaian Habitat (MaxEnt)",
    dash_card_habitat_badge: "PEMODELAN BIOFISIK",
    dash_card_habitat_caption: "Permukaan probabilitas kontinu kesesuaian habitat biofisik orangutan hasil pemodelan Machine Learning Maximum Entropy.",

    // Full-Width MaxEnt Section
    dash_maxent_title: "Plot Diagnostik Maximum Entropy (MaxEnt)",
    dash_maxent_badge: "EVALUASI & KURVA RESPONS",
    dash_maxent_desc: "Eksplorasi mendalam metrik akurasi pemodelan spesies, validasi omission, uji kepentingan variabel, serta kurva respons prediktor lingkungan.",
    dash_maxent_eval_title: "1. Evaluasi & Validasi Kinerja Model",
    dash_maxent_eval_sub: "Uji diskriminasi Receiver Operating Characteristic (ROC), laju omission, dan kepentingan variabel jackknife.",
    dash_maxent_curves_title: "2. Kurva Respons Variabel Lingkungan",
    dash_maxent_curves_sub: "Pengaruh marginal setiap gradien biofisik, geomorfologi, iklim, dan antropogenik terhadap probabilitas habitat orangutan.",
    dash_hint_zoom: "Klik untuk Detail",
    modal_view_full: "Buka Gambar Asli Resolusi Penuh",

    // Model Evaluation Cards
    eval_roc_title: "Kurva ROC & Nilai AUC",
    eval_roc_caption: "Akurasi diskriminasi model prediksi terhadap background acak (AUC > 0.85).",
    eval_omission_title: "Tingkat Omission & Area Prediksi",
    eval_omission_caption: "Kalibrasi tingkat kelalaian data terhadap garis prediksi teoritis kumulatif.",
    eval_jackknife_title: "Uji Jackknife Kontribusi Variabel",
    eval_jackknife_caption: "Kuantifikasi perolehan latih (training gain) mandiri dan unik masing-masing variabel prediktor.",

    // Variable Response Curves
    curve_canopy_title: "Kerapatan Kanopi (Tree Canopy)",
    curve_canopy_caption: "Kesesuaian meningkat tajam pada tutupan kanopi lebat > 70%.",
    curve_dem_title: "Elevasi / Ketinggian (DEM)",
    curve_dem_caption: "Preferensi kuat di dataran rendah < 200 m dpl, menurun pada ketinggian > 500 m.",
    curve_d_hutan_title: "Jarak ke Tepi Hutan (Dist. to Forest)",
    curve_d_hutan_caption: "Kesesuaian maksimum berada di dalam hutan dan merosot pada jarak > 1 km.",
    curve_d_jalan_title: "Jarak ke Jaringan Jalan (Dist. to Road)",
    curve_d_jalan_caption: "Kawasan di dekat koridor jalan dihindari akibat kebisingan dan ancaman perburuan.",
    curve_d_permukiman_title: "Jarak ke Permukiman (Dist. to Settlement)",
    curve_d_permukiman_caption: "Pola penghindaran tegas terhadap pusat pemukiman penduduk untuk menghindari konflik.",
    curve_d_sungai_besar_title: "Jarak ke Sungai Besar (Major River)",
    curve_d_sungai_besar_caption: "Sungai lebar bertindak sebagai rintangan biogeografis alami pemisah subspesies.",
    curve_d_sungai_kecil_title: "Jarak ke Anak Sungai (Tributaries)",
    curve_d_sungai_kecil_caption: "Kesesuaian tinggi di sempadan anak sungai yang kaya kelembapan dan pohon pakan.",
    curve_hujan_title: "Curah Hujan (Rainfall)",
    curve_hujan_caption: "Rentang optimal pada 2.500 – 3.800 mm/tahun mendukung produktivitas buah hutan.",
    curve_slope_title: "Kemiringan Lereng (Topographic Slope)",
    curve_slope_caption: "Preferensi topografi datar hingga landai (0° – 8°) dibandingkan lereng terjal.",

    // Modal
    dash_modal_default_title: "Analisis Geospasial MAWAS",

    // About Page (Rebuilt Clean Edition)
    about_page_title: "MAWAS | About",
    about_team_title: "Tim Kami",
    about_team_intro: "Kami adalah tim yang mengembangkan MAWAS, pemodelan geospasial berbasis cloud untuk memprioritaskan habitat aman orangutan Kalimantan saat kebakaran dan kabut asap lintas batas.",
    about_bg_title: "Latar Belakang Proyek",
    about_bg_official_title: "MAWAS: Cloud-Based Geospatial Modeling for Orangutan Safe Habitat Prioritization under Fire and Transboundary Haze in Kalimantan",
    about_bg_p1: "Pulau Kalimantan merupakan salah satu benteng pertahanan terakhir bagi orangutan Kalimantan (<em>Pongo pygmaeus</em>), spesies payung yang kini berada dalam status terancam kritis (<em>Critically Endangered</em>). Keberlangsungan hidup populasi ini menghadapi tekanan berat akibat hilangnya kanopi hutan primer dan fragmentasi habitat alami.",
    about_bg_p2: "Pada periode 1 Mei – 30 Oktober 2019, anomali iklim El Niño memicu kebakaran hutan dan lahan gambut berskala besar di Kalimantan. Bencana ini melepaskan emisi kabut asap tebal lintas batas (<em>transboundary haze</em>) yang mencemari atmosfer regional, merusak vegetasi pakan dan sarang, serta mengancam kesehatan pernapasan satwa liar maupun masyarakat lokal.",
    about_bg_p3: "Menghadapi krisis tersebut, MAWAS dikembangkan untuk memodelkan dan memprioritaskan habitat aman sementara (<em>temporary safe refugia</em>). Memanfaatkan komputasi awan Google Earth Engine (GEE), WebGIS interaktif, dan analisis autokorelasi spasial Getis-Ord Gi*, sistem ini mengintegrasikan kesesuaian biofisik habitat, kerentanan ekologis gambut, dan dinamika sebaran polusi udara secara objektif.",
    about_btn_pipeline: "Lihat Pipeline Analisis",
    about_sdgs_title: "Kontribusi SDGs",
    about_sdgs_intro: "Penerapan pemodelan geospasial MAWAS berkontribusi nyata terhadap pencapaian Tujuan Pembangunan Berkelanjutan (Sustainable Development Goals).",
    about_sdg13_title: "SDG 13: Penanganan Perubahan Iklim",
    about_sdg13_desc: "Memetakan sebaran kabut asap dan paparannya terhadap habitat selama kebakaran Mei-Oktober 2019.",
    about_sdg15_title: "SDG 15: Ekosistem Daratan",
    about_sdg15_desc: "Memprioritaskan habitat aman sementara bagi orangutan Kalimantan menggunakan pemodelan kesesuaian habitat.",
    about_sdg17_title: "SDG 17: Kemitraan untuk Mencapai Tujuan",
    about_sdg17_desc: "Dibangun bersama dan menggabungkan data satelit dari berbagai sumber.",
    about_supported_title: "Dukungan & Kompetisi",
    about_supported_label: "Didukung oleh",
    about_supported_ugm: "Universitas Gadjah Mada",
    about_comp_title: "Kompetisi",
    about_comp_label: "Kompetisi",
    about_comp_desc: "MAWAS merupakan karya pemodelan geospasial yang diikutsertakan dalam ajang ASEAN Geospatial Challenge (AGC), kompetisi inovasi geospasial regional Asia Tenggara yang mendorong penerapan teknologi geospasial untuk pencapaian Sustainable Development Goals.",
    about_comp_agc_caption: "ASEAN Geospatial Challenge",
    about_comp_big_caption: "Badan Informasi Geospasial",

    // Pipeline Page (Metro Map Edition)
    pipeline_page_title: "MAWAS | Pipeline",
    pipeline_header_title: "Pipeline Analisis",
    pipeline_header_subtitle: "Peta Jalur Pemodelan Spasiotemporal Habitat Orangutan Kalimantan",
    pipeline_period_badge: "Periode Analisis: 1 Mei 2019 – 30 Oktober 2019",
    pipeline_play: "Putar Pipeline",
    pipeline_pause: "Jeda",
    pipeline_stop: "Reset",
    pipeline_status_idle: "Klik salah satu stasiun pada peta untuk melihat detail langkah",
    pipeline_status_tour: "Memutar tur alur... Stasiun",
    pipeline_stage1_lbl: "1 Persiapan",
    pipeline_stage2_lbl: "2 Pengolahan Variabel",
    pipeline_stage3_lbl: "3 Sintesis",
    pipeline_stage4_lbl: "4 Analisis Akhir",
    pipeline_stat_period_val: "1 Mei – 30 Okt 2019",
    pipeline_stat_period_lbl: "Periode Data",
    pipeline_stat_unit_val: "Piksel",
    pipeline_stat_unit_lbl: "Unit Spasial",
    pipeline_stat_platform_val: "Google Earth Engine",
    pipeline_stat_platform_lbl: "Platform Komputasi",
    pipeline_track_hab: "Habitat Suitability",
    pipeline_track_ike: "Kerentanan Ekologis (IKE)",
    pipeline_track_air: "Polusi Udara",
    pipeline_btn_prev: "Sebelumnya",
    pipeline_btn_next: "Berikutnya",
    pipeline_btn_summary: "Ringkas",
    pipeline_btn_tech: "Teknis",
    pipeline_lbl_data: "Data & Alat:",
    pipeline_lbl_output: "Keluaran:",
    pipeline_btn_view_results: "Lihat Hasil di Dashboard",
    pipeline_gif_play: "Putar Animasi",
    pipeline_gif_pause: "Jeda Animasi",
    pipeline_overlay_demo_title: "Diagram Sintesis Tiga Lapisan",
    pipeline_panel_close: "Tutup Panel (Esc)",

    // Tanya MAWAS FAQ Widget
    chat_btn_label: "Tanya MAWAS",
    chat_greeting_bubble: "Halo! Ada yang ingin kamu tanyakan?",
    chat_greeting_close: "Tutup sapaan",
    chat_panel_title: "Tanya MAWAS",
    chat_panel_sub: "Pusat Bantuan & Pertanyaan Umum",
    chat_panel_close: "Tutup panel",
    chat_search_placeholder: "Cari topik atau pertanyaan...",
    chat_cat_all: "Semua",
    chat_cat_general: "Umum",
    chat_cat_method: "Metodologi",
    chat_cat_map: "Peta & Fitur",
    chat_cat_cons: "Konservasi",
    chat_no_results: "Tidak ada pertanyaan yang sesuai dengan kata kunci Anda.",
    chat_footer_note: "Pelajari selengkapnya di halaman",
    chat_footer_about: "Tentang Kami",
    chat_footer_or: "atau",
    chat_footer_pipeline: "Pipeline Analisis"
  },

  en: {
    // Navigation
    nav_home: "Home",
    nav_maps: "Maps",
    nav_dashboard: "Dashboard",
    nav_pipeline: "Pipeline",
    nav_about: "About",

    // Home Page
    home_title: "MAWAS",
    home_subtitle: "Cloud-Based Spatial Prioritization of Safe Habitats for Bornean Orangutans",
    home_desc: "Google Earth Engine cloud modeling platform to identify and prioritize temporary safe habitats for Bornean orangutans (Pongo pygmaeus) under the threat of peat fires and transboundary smoke haze (May – October 2019).",
    home_btn_get_started: "Open Interactive Map",

    // Maps Page (peta.html)
    map_desc_header: "MAWAS Kalimantan WebGIS",
    map_desc_body: "This interactive map presents cloud-based geospatial modeling for temporary habitat suitability and safe habitat prioritization of Bornean orangutans (<em>Pongo pygmaeus</em>) using Google Earth Engine. The model integrates biophysical habitat suitability (MaxEnt), peatland Ecological Vulnerability Index (IVE), and fire smoke haze exposure (PM2.5/PM10) for May – October 2019.",
    map_feature_title: "MAP FEATURES",

    // Layers
    layer_temp_name: "Temporary Potential Habitat",
    layer_temp_desc: "Spatial overlay of habitat suitability, IVE, and air pollutants",
    layer_ive_name: "Ecological Vulnerability Index (IVE)",
    layer_ive_desc: "Peatland ecological vulnerability derived from dNBR and EVI",
    layer_air_name: "Air Pollution Vulnerability",
    layer_air_desc: "Exposure to PM2.5 particulates and fire smoke haze",
    layer_habitat_name: "Habitat Suitability",
    layer_habitat_desc: "Biophysical habitat suitability modeled with MaxEnt",
    layer_getis_name: "Getis-Ord Gi* (Hotspot)",
    layer_getis_desc: "Spatial hotspot & coldspot cluster analysis of orangutan habitat",

    // Basemaps
    basemaps_title: "BASEMAPS",
    bm_roadmap_name: "Google Roadmap",
    bm_roadmap_desc: "Standard street map, geographic labels, and terrain",
    bm_satellite_name: "Google Satellite",
    bm_satellite_desc: "High-resolution satellite and hybrid imagery",
    bm_dark_name: "Dark Mode",
    bm_dark_desc: "Dark theme canvas for high contrast data visualization",
    bm_clean_name: "Clean Map",
    bm_clean_desc: "Minimalist neutral canvas without text and labels",

    // Inset
    inset_title: "Inset Map",
    inset_alt: "Regional Inset Map of Kalimantan",

    // Map Controls Tooltips
    tooltip_recenter: "Recenter to Kalimantan",
    tooltip_zoom_in: "Zoom In (+)",
    tooltip_zoom_out: "Zoom Out (-)",
    tooltip_measure: "Geospatial Measure Tool (Distance & Area)",
    tooltip_swipe: "Swipe / Split-Screen Comparison Mode",
    tooltip_info: "Information & Methodology",
    tooltip_pixel_inspector: "Pixel Inspector (Sample Multi-Layer Values)",
    tooltip_north: "North Orientation",

    // Pixel Inspector
    inspector_title: "Pixel Inspector",
    inspector_period: "Analysis Period: 1 May – 30 Oct 2019",
    inspector_copy: "Copy",
    inspector_copied: "Copied!",
    inspector_outside: "Outside study area",
    inspector_no_data: "No data",
    inspector_active_layer: "Visible",
    inspector_point_tab: "Point Inspection",
    inspector_area_tab: "Area Inspection",

    // Swipe / Split Screen
    swipe_title: "Split-Screen Comparison",
    swipe_left_lbl: "Left Side:",
    swipe_right_lbl: "Right Side:",
    swipe_opt_none: "Basemap Only (No Layer)",
    swipe_close_tooltip: "Close Swipe Mode",
    swipe_handle_tooltip: "Drag Left/Right",
    modal_close_tooltip: "Close (Esc)",
    opacity_lbl: "Opacity",

    // Dynamic Legend
    legend_title: "MAP LEGEND",
    legend_no_layer: "No active layers. Enable switches in the sidebar to visualize data.",
    legend_temp_title: "Temporary Potential Habitat",
    legend_temp_min: "Low / High Risk",
    legend_temp_max: "High / Safe",
    legend_ive_title: "Ecological Vulnerability (IVE)",
    legend_ive_min: "Low Vulnerability",
    legend_ive_max: "High Vulnerability",
    legend_air_title: "Air Pollution Vulnerability",
    legend_air_min: "Low / Clean",
    legend_air_max: "High / Extreme",
    legend_hab_title: "Biophysical Habitat (MaxEnt)",
    legend_hab_min: "Marginal",
    legend_hab_max: "Optimal Suitability",
    legend_getis_title: "Getis-Ord Gi* (Spatial Cluster)",
    legend_getis_min: "Low-Low",
    legend_getis_max: "High-High",
    legend_getis_hh: "High-High",
    legend_getis_hl: "High-Low",
    legend_getis_lh: "Low-High",
    legend_getis_ll: "Low-Low",

    // Measurement Tool
    measure_title: "Geospatial Measure Tool",
    measure_dist_btn: "Distance (m/km)",
    measure_area_btn: "Area (m²/ha)",
    measure_clear: "Clear",
    measure_finish: "Finish",
    measure_instruction_default: "Select a measurement mode (Distance or Area) above.",
    measure_instruction_line: "Click on map to place distance points. Click again to add vertices. Double-click or click 'Finish' to complete.",
    measure_instruction_poly: "Click on map to create polygon corners (min. 3 points). Click 'Finish' or click the starting point to close the area.",
    measure_lbl_total_dist: "Total Distance:",
    measure_lbl_total_area: "Total Area:",
    measure_segment: "Segment",
    measure_point: "Point",

    // Modal Info
    modal_title: "Methodology & Data Sources Information",
    modal_p1_strong: "Research Title:",
    modal_p1_text: " MAWAS: Cloud-Based Geospatial Modeling for Orangutan Safe Habitat Prioritization under Fire and Transboundary Haze in Kalimantan.",
    modal_p2_strong: "Study Period:",
    modal_p2_text: " May 1 – October 30, 2019 (Peak El Niño & Kalimantan Peatland Fires).",
    modal_li1_strong: "Temporary Potential Habitat:",
    modal_li1_text: " Spatial multicriteria integration of biophysical habitat suitability, peatland vulnerability, and smoke haze pollution exposure.",
    modal_li2_strong: "Ecological Vulnerability Index (IVE):",
    modal_li2_text: " Derived from differenced Normalized Burn Ratio (dNBR) Landsat 8/Sentinel-2 and Enhanced Vegetation Index (EVI).",
    modal_li3_strong: "Air Pollution Vulnerability:",
    modal_li3_text: " Atmospheric concentrations of PM2.5 and PM10 aerosols from Sentinel-5P TROPOMI and MODIS sensors.",
    modal_li4_strong: "Habitat Suitability:",
    modal_li4_text: " Maximum Entropy (MaxEnt) machine learning modeling based on forest canopy cover, elevation, and distance to river/forest edge.",

    // Dashboard Page
    dash_header_title: "MAWAS Analytics & Monitoring Dashboard",
    dash_header_subtitle: "Command Center for Spatiotemporal Habitat Suitability Analysis of Bornean Orangutans (May - October 2019)",
    dash_kpi_1_label: "Identified Potential Habitat",
    dash_kpi_1_val: "1.40 Million Ha",
    dash_kpi_1_sub: "MaxEnt Biophysical Suitability (P ≥ 0.40)",
    dash_kpi_2_label: "Average Peat Vulnerability (IVE)",
    dash_kpi_2_val: "0.50 <span style=\"font-size: 0.85rem; font-weight: 500;\">/ 1.0</span>",
    dash_kpi_2_sub: "23.8% Peatland at Critical Risk",
    dash_kpi_3_label: "Empirical Occurrence Records",
    dash_kpi_3_val: "400 Points",
    dash_kpi_3_sub: "Ground-Truth Field & Nest Surveys",
    dash_kpi_4_label: "Core Habitat Hotspots (Getis-Ord)",
    dash_kpi_4_val: "9.85 Million Ha",
    dash_kpi_4_sub: "99% Confidence Level (Z ≥ 2.58)",

    // 4 Main Dashboard Cards
    dash_card_kehadiran_title: "Orangutan Occurrence Points",
    dash_card_kehadiran_badge: "FIELD OBSERVATION",
    dash_card_kehadiran_caption: "Spatial distribution of empirical encounter and nest survey points of Bornean orangutans (Pongo pygmaeus) used as ground-truth presence records.",
    dash_card_air_title: "Air Quality & 10m Wind Direction",
    dash_card_air_badge: "SPATIOTEMPORAL DYNAMICS",
    dash_card_air_caption: "Spatiotemporal animation of PM2.5/AOD smoke haze dispersion and 10-meter surface wind vectors during peak 2019 fire events.",
    dash_card_getis_title: "Getis-Ord Gi* Spatial Clusters",
    dash_card_getis_badge: "SPATIAL AUTOCORRELATION",
    dash_card_getis_caption: "Comparative spatial autocorrelation analysis (Getis-Ord Gi*) delineating statistically significant habitat hotspots and coldspots.",
    dash_card_habitat_title: "Habitat Suitability Map (MaxEnt)",
    dash_card_habitat_badge: "BIOPHYSICAL MODELING",
    dash_card_habitat_caption: "Continuous probability surface of Bornean orangutan biophysical habitat suitability modeled with Maximum Entropy.",

    // Full-Width MaxEnt Section
    dash_maxent_title: "Maximum Entropy (MaxEnt) Diagnostics & Curves",
    dash_maxent_badge: "EVALUATION & RESPONSE CURVES",
    dash_maxent_desc: "In-depth exploration of species distribution modeling accuracy metrics, omission testing, variable importance, and environmental response curves.",
    dash_maxent_eval_title: "1. Model Performance & Validation",
    dash_maxent_eval_sub: "Receiver Operating Characteristic (ROC) discrimination test, omission rates, and jackknife variable importance.",
    dash_maxent_curves_title: "2. Environmental Variable Response Curves",
    dash_maxent_curves_sub: "Marginal influence of biophysical, geomorphological, climatic, and anthropogenic gradients on orangutan occurrence.",
    dash_hint_zoom: "Click to Inspect",
    modal_view_full: "View Full Resolution Image",

    // Model Evaluation Cards
    eval_roc_title: "ROC Curve & AUC Metric",
    eval_roc_caption: "Model predictive discrimination accuracy against random background (AUC > 0.85).",
    eval_omission_title: "Omission Rate & Predicted Area",
    eval_omission_caption: "Calibration of empirical omission rate against theoretical cumulative expectations.",
    eval_jackknife_title: "Jackknife Test of Variable Importance",
    eval_jackknife_caption: "Quantification of regularized training gain isolating individual and unique predictors.",

    // Variable Response Curves
    curve_canopy_title: "Tree Canopy Density",
    curve_canopy_caption: "Suitability escalates steeply in closed canopy forest stands > 70%.",
    curve_dem_title: "Elevation / Altitude (DEM)",
    curve_dem_caption: "Strong lowland affinity < 200 m ASL, attenuating steeply above 500 m.",
    curve_d_hutan_title: "Distance to Forest Edge",
    curve_d_hutan_caption: "Suitability peaks within core interior forest and decays beyond 1 km.",
    curve_d_jalan_title: "Distance to Road Networks",
    curve_d_jalan_caption: "Near-road corridors avoided due to vehicle noise and human disturbance.",
    curve_d_permukiman_title: "Distance to Settlements",
    curve_d_permukiman_caption: "Pronounced avoidance of human settlement centers to avert conflict.",
    curve_d_sungai_besar_title: "Distance to Major Rivers",
    curve_d_sungai_besar_caption: "Wide waterways function as natural biogeographic barrier corridors.",
    curve_d_sungai_kecil_title: "Distance to Tributaries",
    curve_d_sungai_kecil_caption: "High suitability along moist, food-rich natural stream riparian buffers.",
    curve_hujan_title: "Annual Rainfall (Precipitation)",
    curve_hujan_caption: "Optimal range between 2,500 – 3,800 mm/year sustaining forest masting.",
    curve_slope_title: "Topographic Slope Gradient",
    curve_slope_caption: "Preference for flat to undulating terrain (0° – 8°) over steep mountain slopes.",

    // Modal
    dash_modal_default_title: "MAWAS Geospatial Analysis",

    // About Page (Rebuilt Clean Edition)
    about_page_title: "MAWAS | About",
    about_team_title: "Our Team",
    about_team_intro: "We are the team behind MAWAS, a cloud-based geospatial model that prioritizes safe habitats for Bornean orangutans during fire and transboundary haze.",
    about_bg_title: "Project Background",
    about_bg_official_title: "MAWAS: Cloud-Based Geospatial Modeling for Orangutan Safe Habitat Prioritization under Fire and Transboundary Haze in Kalimantan",
    about_bg_p1: "The island of Borneo is one of the final strongholds for the Bornean orangutan (<em>Pongo pygmaeus</em>), an umbrella species currently listed as critically endangered. The survival of this population faces intense pressure from primary forest canopy loss and natural habitat fragmentation.",
    about_bg_p2: "Between 1 May and 30 October 2019, an El Niño climate anomaly triggered extensive peatland and forest fires across Kalimantan. This disaster unleashed severe transboundary smoke haze across the region, degrading foraging canopy and nesting sites, while posing acute respiratory risks to wildlife and local communities.",
    about_bg_p3: "In response to this crisis, MAWAS was developed to model and prioritize temporary safe refugia habitats. Leveraging Google Earth Engine (GEE) cloud computing, interactive WebGIS, and Getis-Ord Gi* spatial autocorrelation analysis, this system objectively integrates biophysical habitat suitability, peatland ecological vulnerability, and atmospheric smoke dispersion dynamics.",
    about_btn_pipeline: "View Analysis Pipeline",
    about_sdgs_title: "SDGs Contribution",
    about_sdgs_intro: "The application of MAWAS geospatial modeling actively contributes to the Sustainable Development Goals.",
    about_sdg13_title: "SDG 13: Climate Action",
    about_sdg13_desc: "Mapping smoke haze distribution and its exposure to habitats during the May–October 2019 fires.",
    about_sdg15_title: "SDG 15: Life on Land",
    about_sdg15_desc: "Prioritizing temporary safe habitats for Bornean orangutans using habitat suitability modeling.",
    about_sdg17_title: "SDG 17: Partnerships for the Goals",
    about_sdg17_desc: "Co-developed by integrating multi-source satellite data.",
    about_supported_title: "Supported by & Competition",
    about_supported_label: "Supported by",
    about_supported_ugm: "Universitas Gadjah Mada",
    about_comp_title: "Competition",
    about_comp_label: "Competition",
    about_comp_desc: "MAWAS is a geospatial modeling initiative entered into the ASEAN Geospatial Challenge (AGC), a Southeast Asian regional geospatial innovation competition promoting the application of geospatial technologies toward achieving the Sustainable Development Goals.",
    about_comp_agc_caption: "ASEAN Geospatial Challenge",
    about_comp_big_caption: "National Geospatial Information Agency",

    // Pipeline Page (Metro Map Edition)
    pipeline_page_title: "MAWAS | Pipeline",
    pipeline_header_title: "Analysis Pipeline",
    pipeline_header_subtitle: "Transit Map of Spatiotemporal Bornean Orangutan Habitat Modeling",
    pipeline_period_badge: "Analysis Period: 1 May 2019 – 30 October 2019",
    pipeline_play: "Play Tour",
    pipeline_pause: "Pause",
    pipeline_stop: "Reset",
    pipeline_status_idle: "Click any station on the map to inspect step details",
    pipeline_status_tour: "Touring pipeline... Station",
    pipeline_stage1_lbl: "1 Preparation",
    pipeline_stage2_lbl: "2 Variable Processing",
    pipeline_stage3_lbl: "3 Spatial Synthesis",
    pipeline_stage4_lbl: "4 Final Analysis",
    pipeline_stat_period_val: "1 May – 30 Oct 2019",
    pipeline_stat_period_lbl: "Data Period",
    pipeline_stat_unit_val: "Pixel",
    pipeline_stat_unit_lbl: "Spatial Unit",
    pipeline_stat_platform_val: "Google Earth Engine",
    pipeline_stat_platform_lbl: "Computing Platform",
    pipeline_track_hab: "Habitat Suitability",
    pipeline_track_ike: "Ecological Vulnerability (IVE)",
    pipeline_track_air: "Air Pollution",
    pipeline_btn_prev: "Previous",
    pipeline_btn_next: "Next",
    pipeline_btn_summary: "Summary",
    pipeline_btn_tech: "Technical",
    pipeline_lbl_data: "Data & Tools:",
    pipeline_lbl_output: "Output:",
    pipeline_btn_view_results: "View Results in Dashboard",
    pipeline_gif_play: "Play Animation",
    pipeline_gif_pause: "Pause Animation",
    pipeline_overlay_demo_title: "Three-Layer Synthesis Diagram",
    pipeline_panel_close: "Close Panel (Esc)",

    // Tanya MAWAS FAQ Widget
    chat_btn_label: "Ask MAWAS",
    chat_greeting_bubble: "Hi! Anything you'd like to ask?",
    chat_greeting_close: "Close greeting",
    chat_panel_title: "Ask MAWAS",
    chat_panel_sub: "Help Center & Frequently Asked Questions",
    chat_panel_close: "Close panel",
    chat_search_placeholder: "Search topics or questions...",
    chat_cat_all: "All",
    chat_cat_general: "General",
    chat_cat_method: "Methodology",
    chat_cat_map: "Maps & Features",
    chat_cat_cons: "Conservation",
    chat_no_results: "No questions match your search query.",
    chat_footer_note: "Learn more on the",
    chat_footer_about: "About page",
    chat_footer_or: "or",
    chat_footer_pipeline: "Analysis Pipeline"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('mawas_lang') || 'id';
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.setupListeners();
  }

  setLanguage(lang) {
    if (lang !== 'id' && lang !== 'en') return;
    this.currentLang = lang;
    localStorage.setItem('mawas_lang', lang);
    this.applyLanguage(lang);
    window.dispatchEvent(new CustomEvent('mawas:languageChanged', { detail: { lang } }));
  }

  t(key) {
    const dict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY.id;
    return dict[key] !== undefined ? dict[key] : key;
  }

  applyLanguage(lang) {
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.id;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Update tooltips / title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key] !== undefined) {
        el.setAttribute('title', dict[key]);
      }
    });

    // Update alt attributes
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (dict[key] !== undefined) {
        el.setAttribute('alt', dict[key]);
      }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Update aria-label attributes
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // Update active state of language buttons
    const btnId = document.getElementById('btn-lang-id');
    const btnEn = document.getElementById('btn-lang-en');
    if (btnId && btnEn) {
      if (lang === 'id') {
        btnId.classList.add('active');
        btnEn.classList.remove('active');
      } else {
        btnEn.classList.add('active');
        btnId.classList.remove('active');
      }
    }
  }

  setupListeners() {
    const btnId = document.getElementById('btn-lang-id');
    const btnEn = document.getElementById('btn-lang-en');
    if (btnId) {
      btnId.addEventListener('click', () => this.setLanguage('id'));
    }
    if (btnEn) {
      btnEn.addEventListener('click', () => this.setLanguage('en'));
    }
  }
}

// Global i18n singleton
window.i18n = new I18nManager();
document.addEventListener('DOMContentLoaded', () => {
  window.i18n.init();
});
