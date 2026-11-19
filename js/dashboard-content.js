/**
 * MAWAS Geospatial Platform - Dashboard Analytical Content & Metadata
 * Data kamus deskripsi mendalam untuk setiap visualisasi (ID & EN)
 */

const DASHBOARD_ITEMS = {
  // --- 4 KARTU UTAMA ---
  kehadiran: {
    id: "kehadiran",
    title_id: "Titik Kehadiran Orangutan (Presence Records)",
    title_en: "Orangutan Occurrence Points (Presence Records)",
    category_id: "DATA LAPANGAN & OBSERVASI",
    category_en: "FIELD OBSERVATION DATA",
    badge: "OCCURRENCE DATA",
    src: "Dashboard/OrangUtan Kehadiran.png",
    caption_id: "Peta spasial titik sebaran perjumpaan orangutan Kalimantan (Pongo pygmaeus) dari survei inventarisasi sarang dan observasi lapangan.",
    caption_en: "Spatial distribution map of Bornean orangutan (Pongo pygmaeus) presence points derived from nest surveys and direct field encounters.",
    desc_id: `
      <h4>Deskripsi & Konteks Analisis:</h4>
      <p>Peta ini menyajikan titik-titik koordinat perjumpaan langsung dan inventarisasi sarang orangutan Kalimantan (<em>Pongo pygmaeus</em>) yang dikompilasi dari survei geospasial di seluruh bentang alam Kalimantan. Titik kehadiran ini berfungsi sebagai <strong>data primer (ground truth)</strong> dalam pemodelan distribusi spasial habitat.</p>
      
      <h4>Signifikansi Metodologis:</h4>
      <ul>
        <li><strong>Input Utama MaxEnt:</strong> Algoritma Maximum Entropy memerlukan data kehadiran spesies (<em>presence-only records</em>) untuk mengestimasi fungsi densitas probabilitas kesesuaian habitat terhadap variabel lingkungan biofisik.</li>
        <li><strong>Pola Spasial:</strong> Klaster kepadatan titik perjumpaan terkonsentrasi di kawasan hutan rawa gambut dan hutan dataran rendah Kalimantan Tengah (seperti Taman Nasional Tanjung Puting dan Sebangau), Kalimantan Barat, serta koridor Wehea-Kelay di Kalimantan Timur.</li>
        <li><strong>Batasan & Verifikasi:</strong> Titik observasi telah diverifikasi dan difilter melalui proses spasial thinning untuk meminimalkan spatial autocorrelation dan bias sampling observasi jalan/sungai.</li>
      </ul>
    `,
    desc_en: `
      <h4>Description & Analytical Context:</h4>
      <p>This map presents empirical occurrence points and nest survey coordinates of the Bornean orangutan (<em>Pongo pygmaeus</em>) compiled across major landscape blocks in Kalimantan. These occurrence points serve as the <strong>primary ground-truth data</strong> for predictive habitat distribution modeling.</p>
      
      <h4>Methodological Significance:</h4>
      <ul>
        <li><strong>MaxEnt Model Foundation:</strong> The Maximum Entropy algorithm relies on presence-only records to estimate species occurrence probability functions across complex environmental gradients.</li>
        <li><strong>Spatial Patterns:</strong> High concentrations of sightings occur in peat swamp forests and lowland dipterocarp forests of Central Kalimantan (e.g., Tanjung Puting and Sebangau National Parks), West Kalimantan, and the Wehea-Kelay landscape in East Kalimantan.</li>
        <li><strong>Data Filtering:</strong> Presence locations underwent geospatial filtering and thinning to eliminate sampling bias and reduce spatial autocorrelation along navigable rivers and logging tracks.</li>
      </ul>
    `
  },

  air_quality: {
    id: "air_quality",
    title_id: "Kualitas Udara & Arah Angin 10m (Mei - Okt 2019)",
    title_en: "Air Quality & 10m Wind Dynamics (May - Oct 2019)",
    category_id: "DINAMIKA SPASIOTEMPORAL",
    category_en: "SPATIOTEMPORAL DYNAMICS",
    badge: "LOOPING ANIMATION",
    src: "Dashboard/Peta Animasi Air Quality.gif",
    caption_id: "Animasi spasiotemporal pergerakan polutan PM2.5/AOD dan vektor angin permukaan 10 meter selama puncak kebakaran gambut Kalimantan 2019.",
    caption_en: "Spatiotemporal dynamics of PM2.5/AOD particulate plume dispersion and 10m surface wind vectors during the 2019 peat fire crisis.",
    desc_id: `
      <h4>Deskripsi & Konteks Analisis:</h4>
      <p>Animasi spasiotemporal ini memvisualisasikan dispersi kabut asap pekat (<em>transboundary smoke haze</em>) yang merefleksikan konsentrasi partikulat aerosol PM2.5 serta Optical Depth (AOD) selama periode krisis kebakaran hutan dan lahan gambut (Mei – Oktober 2019), disertai dinamika vektor arah dan kecepatan angin pada ketinggian 10 meter.</p>
      
      <h4>Temuan & Dampak Ekologis:</h4>
      <ul>
        <li><strong>Dinamika Angin Muson:</strong> Pola angin tenggara-barat daya selama puncak El Niño mendorong kepulan asap dari kubah gambut Kalimantan Tengah dan Selatan melintasi perbatasan provinsi hingga menjangkau negara tetangga.</li>
        <li><strong>Paparan Polutan Berbahaya:</strong> Konsentrasi PM2.5 yang melampaui ambang batas berbahaya (>150 µg/m³) secara berkepanjangan memicu stres fisiologis berat dan infeksi saluran pernapasan akut pada populasi orangutan liar.</li>
        <li><strong>Integrasi Habitat Aman:</strong> Menjadi variabel penapis krusial dalam menentukan zona suaka darurat (<em>temporary safe haven</em>) yang terbebas dari lintasan kabut asap beracun.</li>
      </ul>
    `,
    desc_en: `
      <h4>Description & Analytical Context:</h4>
      <p>This spatiotemporal animation visualizes the dispersion of dense transboundary smoke haze, tracking particulate matter (PM2.5) concentrations and Aerosol Optical Depth (AOD) across Kalimantan during the severe 2019 peatland fire episode, superimposed with 10-meter surface wind vector fields.</p>
      
      <h4>Key Findings & Ecological Implications:</h4>
      <ul>
        <li><strong>Monsoon Wind Dynamics:</strong> Predominant southeasterly wind regimes during the dry El Niño months carried dense smoke plumes from degraded peatlands in Central and South Kalimantan across internal borders and international airspace.</li>
        <li><strong>Severe Pollutant Exposure:</strong> Hazardous PM2.5 levels (>150 µg/m³) persisting for consecutive months subjected wild orangutans to severe respiratory distress, lethargy, and disrupted foraging behavior.</li>
        <li><strong>Safe Haven Identification:</strong> Forms a critical exclusionary filter to delineate temporary refugia where atmospheric pollutant loads remained within tolerable ecological thresholds.</li>
      </ul>
    `
  },

  getis_ord: {
    id: "getis_ord",
    title_id: "Analisis Klaster Spasial Getis-Ord Gi*",
    title_en: "Getis-Ord Gi* Spatial Cluster Analysis",
    category_id: "AUTOKORELASI SPASIAL",
    category_en: "SPATIAL AUTOCORRELATION",
    badge: "HOTSPOT ANALYSIS",
    src: "Dashboard/Cluster GerdOrdGi Comparasion.png",
    caption_id: "Analisis autokorelasi spasial lokal Getis-Ord Gi* mengidentifikasi klaster hotspot (High-High) dan coldspot (Low-Low) habitat orangutan.",
    caption_en: "Local spatial autocorrelation analysis (Getis-Ord Gi*) delineating statistically significant habitat hotspots (High-High) and coldspots (Low-Low).",
    desc_id: `
      <h4>Deskripsi & Konteks Analisis:</h4>
      <p>Visualisasi ini menampilkan perbandingan komprehensif hasil statistik spasial lokal <strong>Getis-Ord Gi* (Z-Score)</strong>. Analisis ini menguji apakah nilai kesesuaian habitat yang tinggi atau rendah mengelompok secara spasial lebih kuat daripada distribusi acak.</p>
      
      <h4>Klasifikasi Kuadran Spasial:</h4>
      <ul>
        <li><strong>High-High (Hotspot):</strong> Wilayah dengan kesesuaian habitat tinggi yang dikelilingi oleh wilayah berkategori serupa dengan tingkat signifikansi statistik tinggi. Menandai bentang alam inti yang wajib dipertahankan.</li>
        <li><strong>Low-Low (Coldspot):</strong> Kawasan dengan nilai kesesuaian rendah yang bertetangga dengan area degradasi tinggi, mencerminkan zona non-habitat atau wilayah terdampak parah.</li>
        <li><strong>High-Low & Low-High (Spatial Outliers):</strong> Wilayah diskontinuitas spasial yang mengidentifikasi kantong habitat terisolasi atau tepi fragmentasi yang membutuhkan koridor konektivitas ekologis.</li>
        <li><strong>Aplikasi Konservasi:</strong> Memandu alokasi sumber daya pemadaman karhutla terfokus pada kantong hotspot bernilai konservasi tertinggi.</li>
      </ul>
    `,
    desc_en: `
      <h4>Description & Analytical Context:</h4>
      <p>This visualization presents a comparative assessment of the <strong>Getis-Ord Gi* spatial statistic (Z-scores)</strong>, detecting whether high or low habitat suitability values exhibit statistically significant spatial clustering beyond random chance.</p>
      
      <h4>Spatial Association Quadrants:</h4>
      <ul>
        <li><strong>High-High (Hotspots):</strong> Significant spatial clusters of high habitat quality bordered by mutually high values. These represent critical core bioclimatic strongholds demanding strict non-degradation mandates.</li>
        <li><strong>Low-Low (Coldspots):</strong> Statistically significant aggregations of degraded, unsuitable landscape conditions resulting from intensive land clearing or recurring peat burn scars.</li>
        <li><strong>High-Low & Low-High (Spatial Outliers):</strong> Transition zones and isolated forest refugia that represent urgent targets for ecological corridor restoration.</li>
        <li><strong>Conservation Utility:</strong> Prioritizes fire suppression and ranger deployment directly toward high-value habitat clusters during fire emergencies.</li>
      </ul>
    `
  },

  habitat_maxent: {
    id: "habitat_maxent",
    title_id: "Peta Kesesuaian Biofisik Habitat (MaxEnt)",
    title_en: "Biophysical Habitat Suitability Map (MaxEnt)",
    category_id: "PEMODELAN BIOFISIK",
    category_en: "BIOPHYSICAL MODELING",
    badge: "SUITABILITY SURFACE",
    src: "Dashboard/Hasil Maximum Entropy Orang Utan.png",
    caption_id: "Peta probabilitas kesesuaian habitat orangutan Kalimantan hasil pemodelan Maximum Entropy (MaxEnt) berbasis multivariabel lingkungan.",
    caption_en: "Continuous habitat suitability probability map for Bornean orangutans modeled via Maximum Entropy across multidimensional environmental variables.",
    desc_id: `
      <h4>Deskripsi & Konteks Analisis:</h4>
      <p>Peta ini menggambarkan probabilitas kesesuaian biofisik habitat orangutan Kalimantan secara kontinu dari skala 0 (sangat tidak sesuai / marginal) hingga 1 (kesesuaian optimal). Pemodelan dihasilkan menggunakan algoritma <strong>Maximum Entropy (MaxEnt)</strong>.</p>
      
      <h4>Variabel Masukan & Sintesis:</h4>
      <ul>
        <li><strong>Komponen Lingkungan:</strong> Mengintegrasikan 8 variabel lingkungan prediktor utama: tutupan kanopi pohon, elevasi SRTM, kemiringan lereng, curah hujan tahunan, jarak dari hutan, sungai besar, anak sungai, jalan, dan permukiman.</li>
        <li><strong>Zonasi Kunci:</strong> Habitat berkategori tinggi terkonsentrasi di dataran rendah berhutan lebat dan kawasan gambut dalam yang belum terkonversi.</li>
        <li><strong>Peran dalam MAWAS:</strong> Lapisan kesesuaian biofisik ini merupakan pilar pondasi yang kemudian dioverlay secara multikriteria dengan Indeks Kerentanan Ekologi (IVE) dan ancaman kabut asap karhutla untuk merumuskan prioritas suaka sementara.</li>
      </ul>
    `,
    desc_en: `
      <h4>Description & Analytical Context:</h4>
      <p>This map illustrates continuous probability values of biophysical habitat suitability for the Bornean orangutan across Kalimantan, ranging from 0 (marginal / unsuitable) to 1 (optimal habitat). Generated using the state-of-the-art <strong>Maximum Entropy (MaxEnt)</strong> algorithm.</p>
      
      <h4>Environmental Predictors & Modeling Synthesis:</h4>
      <ul>
        <li><strong>Predictor Variables:</strong> Integrates 8 fundamental environmental covariates: tree canopy density, SRTM elevation, topographic slope, annual precipitation, and Euclidean distance to forest edges, primary rivers, small streams, roads, and settlements.</li>
        <li><strong>Key Zonation:</strong> High-suitability strata predominantly align with intact lowland dipterocarp forests and undisturbed peat swamp forest complexes.</li>
        <li><strong>Core Role in MAWAS:</strong> This suitability baseline serves as the foundational layer subsequently synthesized with the Peat Ecological Vulnerability Index (IVE) and atmospheric haze severity to determine temporary safe haven priorities.</li>
      </ul>
    `
  },

  // --- SUB-BAGIAN 1: EVALUASI MODEL MAXENT ---
  eval_roc: {
    id: "eval_roc",
    title_id: "Evaluasi Kurva ROC & Nilai AUC",
    title_en: "ROC Curve & AUC Metric Evaluation",
    category_id: "EVALUASI MODEL MAXENT",
    category_en: "MAXENT MODEL EVALUATION",
    badge: "MODEL ACCURACY",
    src: "Dashboard/Plot MaxEntropy/orangutan_roc.png",
    caption_id: "Kurva Receiver Operating Characteristic (ROC) dengan nilai Area Under Curve (AUC) mengukur akurasi daya diskriminasi model MaxEnt.",
    caption_en: "Receiver Operating Characteristic (ROC) curve and Area Under Curve (AUC) evaluating discrimination accuracy of the MaxEnt model.",
    desc_id: `
      <h4>Deskripsi & Konteks Analisis:</h4>
      <p>Kurva ROC (<em>Receiver Operating Characteristic</em>) mengevaluasi performa prediktif model MaxEnt dengan memetakan sensitivitas (True Positive Rate) terhadap 1-spesifisitas (False Positive Rate) pada setiap ambang batas keputusan probabilitas.</p>
      
      <h4>Interpretasi Statistik:</h4>
      <ul>
        <li><strong>Nilai AUC (Area Under Curve):</strong> Garis merah merepresentasikan data latih (<em>training data</em>), sedangkan garis putus-putus biru merepresentasikan model acak (AUC = 0.5).</li>
        <li><strong>Tingkat Keandalan Tinggi:</strong> Kurva yang melengkung tajam ke sudut kiri atas dengan nilai AUC > 0.85 membuktikan model memiliki kemampuan diskriminasi luar biasa dalam membedakan antara habitat yang cocok dan tidak cocok.</li>
        <li><strong>Signifikansi:</strong> Memvalidasi bahwa prediksi kesesuaian habitat orangutan memiliki landasan statistik yang kokoh dan dapat dipercaya untuk perumusan kebijakan konservasi.</li>
      </ul>
    `,
    desc_en: `
      <h4>Description & Analytical Context:</h4>
      <p>The Receiver Operating Characteristic (ROC) curve evaluates the predictive discrimination accuracy of the MaxEnt model by contrasting sensitivity (True Positive Rate) against 1-specificity (fraction of background area) across varying classification thresholds.</p>
      
      <h4>Statistical Interpretation:</h4>
      <ul>
        <li><strong>Area Under the Curve (AUC):</strong> The red curve represents training data performance, while the blue diagonal indicates theoretical performance of a random model (AUC = 0.50).</li>
        <li><strong>High Predictive Skill:</strong> A curve climbing rapidly toward the upper-left quadrant with an AUC well above 0.85 confirms exceptional discriminatory power in discerning suitable habitats from marginal background zones.</li>
        <li><strong>Significance:</strong> Provides robust statistical verification that the modeled orangutan distribution is highly reliable for spatial planning and conservation prioritization.</li>
      </ul>
    `
  },

  eval_omission: {
    id: "eval_omission",
    title_id: "Tingkat Omission & Area Prediksi",
    title_en: "Omission Rate & Predicted Area",
    category_id: "EVALUASI MODEL MAXENT",
    category_en: "MAXENT MODEL EVALUATION",
    badge: "VALIDATION",
    src: "Dashboard/Plot MaxEntropy/orangutan_omission.png",
    caption_id: "Grafik tingkat kelalaian (omission rate) dan fraksi area prediksi terhadap ambang batas kumulatif MaxEnt.",
    caption_en: "Omission rate and predicted area fraction plotted against MaxEnt cumulative thresholds.",
    desc_id: `
      <h4>Deskripsi & Konteks Analisis:</h4>
      <p>Plot ini membandingkan tingkat kelalaian empiris (<em>omission rate</em>) dari titik keberadaan orangutan terhadap garis prediksi teoritis omission pada berbagai tingkat ambang batas kumulatif (<em>cumulative threshold</em>).</p>
      
      <h4>Interpretasi Statistik:</h4>
      <ul>
        <li><strong>Kesesuaian Model (Goodness of Fit):</strong> Garis omission data aktual (biru/hitam) yang berhimpit erat dengan garis omission teoritis (hijau) membuktikan bahwa model tidak mengalami over-fitting maupun under-fitting.</li>
        <li><strong>Fraksi Area Prediksi:</strong> Garis merah menunjukkan proporsi total wilayah geografis yang diprediksi cocok seiring kenaikan nilai ambang batas.</li>
        <li><strong>Penetapan Threshold:</strong> Membantu peneliti dalam menentukan ambang batas biner optimal (misalnya 10th percentile training presence) untuk delineasi batas kawasan konservasi esensial.</li>
      </ul>
    `,
    desc_en: `
      <h4>Description & Analytical Context:</h4>
      <p>This plot assesses the empirical omission rate (proportion of occurrence test/training localities falling outside predicted suitable areas) against theoretical expectations across cumulative threshold values.</p>
      
      <h4>Statistical Interpretation:</h4>
      <ul>
        <li><strong>Model Goodness of Fit:</strong> Close convergence between the empirical omission rate line and the theoretical expectation line indicates excellent model calibration without overfitting.</li>
        <li><strong>Fractional Predicted Area:</strong> The orange/red curve indicates the proportional geographic area classified as suitable as the classification threshold increases.</li>
        <li><strong>Threshold Calibration:</strong> Enables precise selection of decision thresholds (such as minimum training presence or 10-percentile threshold) to establish authoritative binary protection zones.</li>
      </ul>
    `
  },

  eval_jackknife: {
    id: "eval_jackknife",
    title_id: "Uji Jackknife Kontribusi Variabel",
    title_en: "Jackknife Test of Variable Importance",
    category_id: "EVALUASI MODEL MAXENT",
    category_en: "MAXENT MODEL EVALUATION",
    badge: "VARIABLE IMPORTANCE",
    src: "Dashboard/Perbandingan hasil MaxEnt.png",
    caption_id: "Uji Jackknife keteraturan perolehan latih (regularized training gain) mengukur kontribusi relatif tiap variabel prediktor lingkungan.",
    caption_en: "Jackknife of regularized training gain assessing the individual and relative contribution of each environmental predictor.",
    desc_id: `
      <h4>Deskripsi & Konteks Analisis:</h4>
      <p>Uji Jackknife merupakan metode diagnostik sistematik untuk mengkuantifikasi kontribusi relatif masing-masing variabel lingkungan prediktor dalam meningkatkan perolehan model (<em>training gain</em>).</p>
      
      <h4>Komponen Grafik:</h4>
      <ul>
        <li><strong>Batang Biru (With only variable):</strong> Menunjukkan besarnya gain jika model hanya dijalankan menggunakan variabel tersebut secara tunggal. Variabel dengan batang biru terpanjang mengandung <em>informasi paling berguna</em> secara mandiri.</li>
        <li><strong>Batang Cyan/Teal (Without variable):</strong> Menunjukkan penurunan gain jika variabel tersebut dieliminasi dari model. Penurunan terbesar menandai variabel yang memiliki <em>informasi paling unik</em> yang tidak dapat digantikan variabel lain.</li>
        <li><strong>Batang Merah (With all variables):</strong> Nilai perolehan total model saat seluruh variabel diintegrasikan secara simultan.</li>
        <li><strong>Temuan Kunci:</strong> Variabel tutupan kanopi (canopy) dan jarak dari hutan (d_hutan) terbukti mendominasi kontribusi terhadap preferensi habitat orangutan.</li>
      </ul>
    `,
    desc_en: `
      <h4>Description & Analytical Context:</h4>
      <p>The Jackknife test provides a systematic evaluation to quantify the relative importance and predictive power of each individual environmental predictor within the MaxEnt framework.</p>
      
      <h4>Bar Interpretation:</h4>
      <ul>
        <li><strong>Dark Blue Bar (With only variable):</strong> Displays regularized training gain achieved when isolating that single predictor. The longest blue bar represents the environmental factor containing the <em>most useful independent information</em>.</li>
        <li><strong>Teal / Cyan Bar (Without variable):</strong> Represents model gain when removing that specific variable. The greatest drop in gain highlights the predictor carrying the <em>most unique information</em> absent from other layers.</li>
        <li><strong>Red Bar (With all variables):</strong> The overall benchmark training gain achieved with the complete multi-variable model.</li>
        <li><strong>Key Drivers:</strong> Tree canopy closure and proximity to primary forest edges represent the paramount ecological determinants governing Bornean orangutan habitat selection.</li>
      </ul>
    `
  },

  // --- SUB-BAGIAN 2: KURVA RESPONS VARIABEL LINGKUNGAN ---
  curve_canopy: {
    id: "curve_canopy",
    title_id: "Respons: Kerapatan Kanopi Pohon (Tree Canopy)",
    title_en: "Response: Tree Canopy Density",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "VEGETATION STRUCTURE",
    src: "Dashboard/Plot MaxEntropy/orangutan_canopy_1km_only.png",
    caption_id: "Kurva respons probabilitas kesesuaian habitat terhadap persentase kerapatan kanopi pohon.",
    caption_en: "Marginal response curve of habitat suitability probability against percentage tree canopy density.",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva ini memperlihatkan hubungan langsung antara persentase kerapatan kanopi pohon dengan probabilitas kehadiran orangutan Kalimantan.</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Probabilitas kesesuaian meningkat secara eksponensial seiring bertambahnya kerapatan tajuk hutan, mencapai puncaknya pada kerapatan kanopi di atas 70-85%.</li>
        <li><strong>Signifikansi Biologis:</strong> Sebagai satwa arboreal terbesar di dunia, orangutan sangat bergantung pada tajuk kanopi pohon yang bersambung untuk lokomosi, pembuatan sarang harian, dan ketersediaan pakan tajuk (buah, dedaunan muda, kulit pohon).</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve illustrates the functional relationship between percentage tree canopy density and Bornean orangutan occurrence probability.</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Suitability exhibits steep exponential growth as canopy density increases, plateauing at peak levels above 70-85% closed canopy cover.</li>
        <li><strong>Biological Relevance:</strong> As predominantly arboreal mammals, orangutans depend on continuous multi-tiered canopy architecture for efficient brachiation, nocturnal nest construction, and high-energy canopy foraging.</li>
      </ul>
    `
  },

  curve_dem: {
    id: "curve_dem",
    title_id: "Respons: Elevasi / Ketinggian (DEM)",
    title_en: "Response: Elevation / Altitude (DEM)",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "TOPOGRAPHY",
    src: "Dashboard/Plot MaxEntropy/orangutan_dem_1km_only.png",
    caption_id: "Kurva respons probabilitas kesesuaian habitat terhadap elevasi daratan di atas permukaan laut (meter dpl).",
    caption_en: "Marginal response curve of habitat suitability probability against elevation above sea level (meters).",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva ini memetakan preferensi ketinggian tempat tinggal orangutan berdasarkan data Digital Elevation Model (SRTM DEM).</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Probabilitas kehadiran tertinggi berada di dataran rendah (<200 meter dpl) dan menurun drastis pada ketinggian di atas 500 meter dpl. Kesesuaian mendekati nol pada elevasi pegunungan tinggi (>1.000 meter dpl).</li>
        <li><strong>Signifikansi Biologis:</strong> Hutan dataran rendah tropis memiliki produktivitas biomassa dan kelimpahan pohon buah yang jauh lebih kaya dibandingkan vegetasi pegunungan tinggi berhawa dingin.</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve demonstrates orangutan elevational preferences modeled against Digital Elevation Model (SRTM DEM) data.</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Highest habitat affinity is sharply concentrated in coastal and riverine lowlands (<200 m ASL), dropping steeply above 500 m and terminating near zero across montane ridges (>1,000 m ASL).</li>
        <li><strong>Biological Relevance:</strong> Lowland tropical rain forests produce far greater fruit biomass and diverse ficus/dipterocarp assemblages required to support the metabolic demands of large hominoids.</li>
      </ul>
    `
  },

  curve_d_hutan: {
    id: "curve_d_hutan",
    title_id: "Respons: Jarak ke Tepi Hutan (Dist. to Forest)",
    title_en: "Response: Distance to Forest Edge",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "FRAGMENTATION",
    src: "Dashboard/Plot MaxEntropy/orangutan_d_hutan_1km_only.png",
    caption_id: "Kurva respons probabilitas kesesuaian terhadap jarak spasial dari tutupan hutan alami.",
    caption_en: "Marginal response curve of habitat suitability against Euclidean distance from natural forest boundaries.",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva ini mengukur pengaruh jarak dari kawasan berhutan terhadap probabilitas eksistensi orangutan.</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Probabilitas kesesuaian berada pada titik maksimum di nilai 0 (berada di dalam tegakan hutan) dan merosot tajam begitu jarak dari hutan bertambah melebihi 1-2 kilometer.</li>
        <li><strong>Signifikansi Biologis:</strong> Menegaskan bahwa orangutan adalah spesies spesialis hutan sejati (<em>forest-dependent species</em>) yang tidak dapat bertahan hidup di lanskap terbuka non-hutan.</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve measures the dampening effect of geographic distance from contiguous forest cover on orangutan occupancy.</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Probability peaks strictly at zero distance (interior forest) and plummets abruptly as distance from forest boundaries exceeds 1 to 2 kilometers.</li>
        <li><strong>Biological Relevance:</strong> Reaffirms that Bornean orangutans are obligate forest-dwelling species incapable of long-term survival in open non-forest agricultural matrixes.</li>
      </ul>
    `
  },

  curve_d_jalan: {
    id: "curve_d_jalan",
    title_id: "Respons: Jarak ke Jaringan Jalan (Dist. to Road)",
    title_en: "Response: Distance to Roads",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "ANTHROPOGENIC IMPACT",
    src: "Dashboard/Plot MaxEntropy/orangutan_d_jalan_1km_only.png",
    caption_id: "Kurva respons probabilitas kesesuaian terhadap jarak dari jaringan koridor jalan raya.",
    caption_en: "Marginal response curve of habitat suitability probability against distance to road networks.",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva ini mendokumentasikan dampak fragmentasi infrastruktur darat terhadap perilaku spasial orangutan.</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Probabilitas kesesuaian sangat rendah di sekitar koridor jalan (0-1 km) dan secara bertahap meningkat saat menjauhi jalan raya ke kawasan pedalaman hutan yang tenang.</li>
        <li><strong>Signifikansi Biologis:</strong> Jalan menjadi pemicu fragmentasi tajuk, kebisingan lalu lintas, peningkatan aksesibilitas perburuan liar, dan risiko tabrakan satwa.</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve documents the adverse edge and barrier effects of transportation infrastructure on orangutan habitat utilization.</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Suitability is heavily suppressed adjacent to road corridors (0-1 km) and steadily recovers as distance into unfragmented core interior forest increases.</li>
        <li><strong>Biological Relevance:</strong> Roads sever tree canopies, generate acoustic disturbance, and heighten vulnerability to poaching, vehicle collisions, and agricultural expansion.</li>
      </ul>
    `
  },

  curve_d_permukiman: {
    id: "curve_d_permukiman",
    title_id: "Respons: Jarak ke Permukiman (Dist. to Settlements)",
    title_en: "Response: Distance to Settlements",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "HUMAN DISTURBANCE",
    src: "Dashboard/Plot MaxEntropy/orangutan_d_permukiman_1km_only.png",
    caption_id: "Kurva respons probabilitas kesesuaian terhadap jarak dari pusat pemukiman penduduk.",
    caption_en: "Marginal response curve of habitat suitability against distance to human settlement centers.",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva ini mengukur pola penghindaran orangutan terhadap pusat pemukiman manusia.</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Nilai kesesuaian bernilai nol di dekat pemukiman dan mengalami lonjakan positif seiring bertambahnya jarak menjauhi desa atau perkotaan.</li>
        <li><strong>Signifikansi Biologis:</strong> Orangutan secara aktif menghindari kontak antropogenik langsung untuk menghindari konflik satwa-manusia, transmisi zoonosis, dan perusakan habitat.</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve evaluates the avoidance behavioral response of orangutans relative to anthropogenic population centers.</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Habitat value is zero in proximity to settlements and increases sharply with greater distance into remote, undisturbed forest tracts.</li>
        <li><strong>Biological Relevance:</strong> Orangutans consistently avoid direct human exposure to minimize human-wildlife conflict risk, retaliatory hunting, and zoonotic disease exposure.</li>
      </ul>
    `
  },

  curve_d_sungai_besar: {
    id: "curve_d_sungai_besar",
    title_id: "Respons: Jarak ke Sungai Besar (Dist. to Major Rivers)",
    title_en: "Response: Distance to Major Rivers",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "HYDROLOGY & BARRIERS",
    src: "Dashboard/Plot MaxEntropy/orangutan_d_sungai_besar_1km_only.png",
    caption_id: "Kurva respons probabilitas kesesuaian terhadap jarak dari sungai besar berarus deras.",
    caption_en: "Marginal response curve of habitat suitability against distance to major wide river channels.",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva respons terhadap sungai-sungai berukuran besar (seperti Sungai Kapuas, Barito, Mahakam).</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Menunjukkan pola bimodal atau moderat. Area yang terlalu dekat dengan bibir sungai besar memiliki kesesuaian sedang karena sering tergenang atau dijadikan jalur transportasi kapal manusia.</li>
        <li><strong>Signifikansi Biologis:</strong> Sungai besar tidak dapat direnangi oleh orangutan dan bertindak sebagai pembatas biogeografis alami pemisah evolusi subspesies orangutan Kalimantan.</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve reflects habitat dynamics in relation to major river channels (e.g., Kapuas, Barito, and Mahakam Rivers).</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Exhibits moderate suitability near riverbanks due to frequent seasonal flooding and extensive human riverboat traffic.</li>
        <li><strong>Biological Relevance:</strong> Because orangutans cannot swim across wide waterways, large rivers function as natural biogeographic barriers defining morphological subspecies boundaries.</li>
      </ul>
    `
  },

  curve_d_sungai_kecil: {
    id: "curve_d_sungai_kecil",
    title_id: "Respons: Jarak ke Anak Sungai (Dist. to Streams)",
    title_en: "Response: Distance to Tributaries",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "RIPARIAN HABITAT",
    src: "Dashboard/Plot MaxEntropy/orangutan_d_sungai_kecil_1km_only.png",
    caption_id: "Kurva respons probabilitas kesesuaian terhadap jarak dari jaringan anak sungai kecil.",
    caption_en: "Marginal response curve of habitat suitability against proximity to small stream networks.",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva respons terhadap jaringan anak sungai dan alur drainase alami hutan gambut.</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Probabilitas kesesuaian sangat tinggi di sepanjang koridor sempadan anak sungai (0-500 m) dan menurun secara bertahap ke arah pedalaman yang lebih kering.</li>
        <li><strong>Signifikansi Biologis:</strong> Koridor sempadan anak sungai mendukung keberadaan pohon pakan berbuah sepanjang musim serta kelembapan mikroklimat yang terjaga dari bahaya kebakaran gambut.</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve models ecological affinity toward tributary networks and natural forest drainage lines.</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Strong positive suitability along narrow riparian corridors (0-500 m), gradually attenuating toward drier interior plateaus.</li>
        <li><strong>Biological Relevance:</strong> Small riparian corridors sustain rich diversity of year-round fruiting lianas and maintain cooler microclimates resilient to surface fires.</li>
      </ul>
    `
  },

  curve_hujan: {
    id: "curve_hujan",
    title_id: "Respons: Curah Hujan Tahunan (Precipitation)",
    title_en: "Response: Annual Rainfall (Precipitation)",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "CLIMATE & MOISTURE",
    src: "Dashboard/Plot MaxEntropy/orangutan_hujan_1km.png",
    caption_id: "Kurva respons probabilitas kesesuaian terhadap variasi tingkat presipitasi curah hujan tahunan.",
    caption_en: "Marginal response curve of habitat suitability modeled across annual rainfall precipitation gradients.",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva respons terhadap gradien curah hujan tahunan di seluruh wilayah Kalimantan.</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Puncak kesesuaian berada pada rentang curah hujan optimal 2.500 – 3.800 mm/tahun, mencirikan iklim tropis basah (evergreen rain forest).</li>
        <li><strong>Signifikansi Biologis:</strong> Curah hujan yang memadai menjaga keseimbangan tata air gambut dan merangsang sinkronisasi fenologi pembungaan serta pembuahan pohon kanopi hutan.</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve evaluates habitat suitability in response to island-wide annual precipitation gradients.</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Optimal suitability peaks within the 2,500 – 3,800 mm/year precipitation range characteristic of perhumid tropical rainforest ecosystems.</li>
        <li><strong>Biological Relevance:</strong> Adequate rainfall ensures high water-table levels in peatlands and triggers synchronized masting and fruiting phenology among tropical canopy trees.</li>
      </ul>
    `
  },

  curve_slope: {
    id: "curve_slope",
    title_id: "Respons: Kemiringan Lereng (Topographic Slope)",
    title_en: "Response: Topographic Slope Gradient",
    category_id: "KURVA RESPONS VARIABEL",
    category_en: "VARIABLE RESPONSE CURVES",
    badge: "GEOMORPHOLOGY",
    src: "Dashboard/Plot MaxEntropy/orangutan_slope_1km_only.png",
    caption_id: "Kurva respons probabilitas kesesuaian terhadap tingkat kemiringan lereng topografi (derajat).",
    caption_en: "Marginal response curve of habitat suitability against topographic slope gradient (degrees).",
    desc_id: `
      <h4>Interpretasi Ekologis:</h4>
      <p>Kurva respons terhadap derajat kemiringan lereng permukaan bumi (topographic slope).</p>
      <ul>
        <li><strong>Sifat Respons:</strong> Nilai kesesuaian habitat tertinggi berada pada lereng datar hingga landai (0° – 8°) dan mengalami penurunan tajam pada lereng curam (>15° – 25°).</li>
        <li><strong>Signifikansi Biologis:</strong> Wilayah datar dan landai mendukung pertumbuhan pohon hutan berkanopi lebar serta memudahkan pergerakan orangutan betina yang menggendong anak.</li>
      </ul>
    `,
    desc_en: `
      <h4>Ecological Interpretation:</h4>
      <p>This curve illustrates orangutan habitat distribution modeled across land surface slope steepness (in degrees).</p>
      <ul>
        <li><strong>Response Dynamic:</strong> Suitability peaks over flat to gently undulating terrains (0° – 8°) and drops rapidly on steep mountainous slopes (>15° – 25°).</li>
        <li><strong>Biological Relevance:</strong> Flat lowlands foster massive canopy architectures and minimize locomotion energy expenditure for nursing females carrying infants.</li>
      </ul>
    `
  }
};
