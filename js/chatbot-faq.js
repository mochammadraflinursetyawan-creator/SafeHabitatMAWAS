/**
 * MAWAS WebGIS - Tanya MAWAS Knowledge Base & FAQ (js/chatbot-faq.js)
 * Static bilingual dataset & intelligent offline intent matcher.
 */
(function () {
  'use strict';

  window.MAWAS_FAQ_DATA = [
    {
      id: 'gen-1',
      category: 'general',
      keywords: ['mawas', 'apa itu mawas', 'platform', 'tujuan', 'latar belakang', 'fungsi', 'suaka', 'refugia', 'webgis', 'what is mawas', 'purpose', 'overview', 'about mawas'],
      q_id: 'Apa itu platform MAWAS?',
      q_en: 'What is the MAWAS platform?',
      a_id: 'MAWAS (Multi-criteria Assessment for Wildlife Accommodation & Sanctuary) adalah platform WebGIS interaktif berbasis komputasi awan Google Earth Engine untuk memodelkan dan memprioritaskan habitat aman sementara (temporary safe refugia) bagi orangutan Kalimantan saat bencana kebakaran hutan dan kabut asap.',
      a_en: 'MAWAS is an interactive Google Earth Engine-powered WebGIS platform that models and prioritizes temporary safe refugia for Bornean orangutans during forest fires and transboundary haze crises.'
    },
    {
      id: 'gen-2',
      category: 'general',
      keywords: ['2019', 'mei', 'oktober', 'el nino', 'periode', 'kenapa 2019', 'kebakaran 2019', 'kabut asap', 'haze', 'transboundary', 'asap', 'why 2019', 'fire season'],
      q_id: 'Mengapa fokus pada periode kebakaran Mei – Oktober 2019?',
      q_en: 'Why focus on the May – October 2019 fire period?',
      a_id: 'Periode Mei–Oktober 2019 mencatat kebakaran hutan dan lahan gambut berskala besar di Kalimantan akibat anomali iklim El Niño kuat, menghasilkan emisi kabut asap tebal lintas batas (transboundary haze) yang mengancam kesehatan pernapasan dan kelangsungan hidup orangutan.',
      a_en: 'The May–October 2019 period marked catastrophic peatland fires across Kalimantan driven by a severe El Niño anomaly, generating thick transboundary haze that threatened the survival and respiratory health of Bornean orangutans.'
    },
    {
      id: 'gen-3',
      category: 'general',
      keywords: ['siapa', 'pengembang', 'tim', 'ugm', 'universitas gadjah mada', 'agc', 'asean', 'challenge', 'pembuat', 'kompetisi', 'who developed', 'team', 'author', 'creators'],
      q_id: 'Siapa yang mengembangkan platform MAWAS?',
      q_en: 'Who developed the MAWAS platform?',
      a_id: 'MAWAS dikembangkan oleh tim mahasiswa Universitas Gadjah Mada (UGM) sebagai inisiatif pemodelan geospasial dalam ajang kompetisi regional ASEAN Geospatial Challenge (AGC).',
      a_en: 'MAWAS was developed by a student research team from Universitas Gadjah Mada (UGM) as a geospatial modeling initiative entered into the ASEAN Geospatial Challenge (AGC).'
    },
    {
      id: 'meth-1',
      category: 'method',
      keywords: ['maxent', 'kesesuaian', 'habitat', 'entropi', 'maximum entropy', 'variabel', 'biopisik', 'ndvi', 'elevasi', 'sungai', 'jalan', 'suitability', 'modeling', 'model'],
      q_id: 'Bagaimana pemodelan kesesuaian habitat (MaxEnt) bekerja?',
      q_en: 'How does MaxEnt habitat suitability modeling work?',
      a_id: 'Metode Maximum Entropy (MaxEnt) memprediksi probabilitas kesesuaian habitat berdasarkan titik kehadiran spesies (presence-only) dan 8 variabel biopisik (tutupan lahan, indeks vegetasi NDVI, elevasi, kelerengan, jarak ke sungai, dan jarak ke jalan).',
      a_en: 'Maximum Entropy (MaxEnt) predicts habitat suitability probabilities by integrating species occurrence points (presence-only) with 8 biophysical environmental variables (land cover, NDVI, elevation, slope, river proximity, and road distance).'
    },
    {
      id: 'meth-2',
      category: 'method',
      keywords: ['ike', 'ive', 'kerentanan', 'ekologis', 'gambut', 'dnbr', 'pvi', 'lahan gambut', 'sentinel-2', 'vulnerability', 'peatland', 'burn severity'],
      q_id: 'Apa itu Indeks Kerentanan Ekologis (IKE / IVE)?',
      q_en: 'What is the Peatland Ecological Vulnerability Index (IVE)?',
      a_id: 'IKE mengintegrasikan tingkat keparahan kebakaran gambut (dNBR) dan indeks vegetasi gambut (PVI) dari citra Sentinel-2 untuk mengukur sensitivitas ekosistem gambut terhadap degradasi api.',
      a_en: 'The Ecological Vulnerability Index (IVE) combines peat burn severity (dNBR) and peat vegetation index (PVI) from Sentinel-2 satellite imagery to measure the sensitivity of peat ecosystems to fire damage.'
    },
    {
      id: 'meth-3',
      category: 'method',
      keywords: ['getis', 'gi*', 'getis-ord', 'hotspot', 'coldspot', 'klaster', 'autokorelasi', 'spasial', 'z-score', 'cluster', 'signifikan', 'spatial autocorrelation'],
      q_id: 'Apa fungsi analisis autokorelasi spasial Getis-Ord Gi*?',
      q_en: 'What is the role of Getis-Ord Gi* spatial autocorrelation?',
      a_id: 'Getis-Ord Gi* mengidentifikasi klaster spasial bernilai tinggi yang signifikan secara statistik, membedakan zona konsentrasi habitat aman (hotspot / Z-score tinggi) dan area berisiko tinggi (coldspot).',
      a_en: 'Getis-Ord Gi* identifies statistically significant spatial clusters, distinguishing safe habitat concentrations (hotspots with high Z-scores) from high-risk vulnerable areas (coldspots).'
    },
    {
      id: 'map-1',
      category: 'map',
      keywords: ['pixel', 'inspector', 'pipet', 'piksel', 'nilai', 'baca nilai', 'klik peta', 'cek data', 'raster', 'sample', 'probe', 'inspect'],
      q_id: 'Bagaimana cara menggunakan fitur Pixel Inspector?',
      q_en: 'How do I use the Pixel Inspector feature?',
      a_id: 'Buka halaman Maps (peta.html), aktifkan ikon pipet di bilah navigasi kanan peta, lalu klik titik mana pun di pulau Kalimantan untuk membaca nilai raster kesesuaian habitat, kerentanan ekologis, polusi udara, dan status hotspot secara langsung.',
      a_en: 'Navigate to the Maps page (peta.html), toggle the dropper icon on the right map toolbar, and click anywhere on Kalimantan to inspect live multi-layer raster values (habitat suitability, ecological vulnerability, air pollution, and hotspot status).'
    },
    {
      id: 'map-2',
      category: 'map',
      keywords: ['swipe', 'geser', 'bandingkan', 'komparasi', 'compare', 'slider', 'dua lapisan', 'split', 'layer comparison'],
      q_id: 'Apa kegunaan Mode Swipe (Bandingkan Lapisan)?',
      q_en: 'What is the purpose of Swipe Mode (Layer Comparison)?',
      a_id: 'Mode Swipe membagi peta menjadi dua lapisan berdampingan dengan slider geser interaktif, memudahkan Anda menganalisis korelasi spasial langsung antara sebaran polusi kabut asap dengan zona habitat aman orangutan.',
      a_en: 'Swipe Mode divides the map canvas into two side-by-side layers with an interactive slider, allowing direct visual comparison between fire smoke pollution and safe orangutan habitats.'
    },
    {
      id: 'cons-1',
      category: 'cons',
      keywords: ['orangutan', 'kritis', 'iucn', 'terancam', 'punah', 'pongo', 'pygmaeus', 'deforestasi', 'status', 'populasi', 'critically endangered', 'extinction', 'threat'],
      q_id: 'Mengapa orangutan Kalimantan (Pongo pygmaeus) berstatus Kritis?',
      q_en: 'Why is the Bornean orangutan critically endangered?',
      a_id: 'Orangutan Kalimantan berstatus Kritis (Critically Endangered - IUCN) akibat kehilangan kanopi hutan primer, deforestasi berkelanjutan, kebakaran gambut berulang, dan fragmentasi koridor hidup alami yang membatasi pergerakan populasi.',
      a_en: 'The Bornean orangutan is classified as Critically Endangered (IUCN Red List) due to primary canopy loss, persistent deforestation, recurring peat fires, and habitat fragmentation restricting wildlife movement.'
    },
    {
      id: 'cons-2',
      category: 'cons',
      keywords: ['konservasi', 'kebijakan', 'bksda', 'mitigasi', 'manfaat', 'evakuasi', 'koridor', 'rekomendasi', 'pemda', 'policy', 'decision', 'action', 'protect', 'shelter'],
      q_id: 'Bagaimana data MAWAS dapat membantu upaya konservasi?',
      q_en: 'How does MAWAS data support conservation efforts?',
      a_id: 'Peta prioritisasi MAWAS menyediakan rekomendasi spasial berbasis bukti ilmiah bagi lembaga konservasi dan otoritas kehutanan dalam merencanakan koridor perlindungan darurat dan pos mitigasi kebakaran hutan.',
      a_en: 'MAWAS spatial prioritization maps provide evidence-based spatial recommendations for conservation bodies and forestry authorities to plan emergency wildlife corridors and fire mitigation outposts.'
    }
  ];

  // Smart Offline Intent Matcher
  window.mawasMatchIntent = function (userText, lang) {
    if (!userText || typeof userText !== 'string') return null;
    const clean = userText.toLowerCase().trim();

    // 1. Greetings
    const greetings = ['halo', 'hai', 'hello', 'hi', 'hey', 'pagi', 'siang', 'sore', 'malam', 'assalamualaikum'];
    if (greetings.some(g => clean === g || clean.startsWith(g + ' ') || clean.endsWith(' ' + g))) {
      return {
        type: 'greeting',
        text: lang === 'en'
          ? "Hello! I am MAWAS Assistant. How can I assist you with orangutan habitat modeling, research methodology, or interactive map features today?"
          : "Halo! Saya Asisten MAWAS. Ada yang bisa saya bantu seputar pemodelan habitat orangutan, metodologi penelitian, atau fitur peta interaktif MAWAS?"
      };
    }

    // 2. Gratitude
    const thanks = ['terima kasih', 'makasih', 'thanks', 'thank you', 'tq', 'matur nuwun'];
    if (thanks.some(t => clean.includes(t))) {
      return {
        type: 'thanks',
        text: lang === 'en'
          ? "You're very welcome! Feel free to ask anything else about the MAWAS platform."
          : "Sama-sama! Senang bisa membantu. Jangan ragu bertanya hal lain seputar platform MAWAS ya."
      };
    }

    // 3. Match against FAQ dataset
    let bestMatch = null;
    let highestScore = 0;

    const stopWords = ['apa', 'itu', 'bagaimana', 'mengapa', 'kenapa', 'siapa', 'dimana', 'ada', 'yang', 'bisa', 'tolong', 'jelaskan', 'tentang', 'apakah', 'pada', 'dan', 'di', 'ke', 'dari', 'is', 'the', 'what', 'how', 'why', 'who', 'where', 'can', 'you', 'tell', 'me', 'about', 'explain'];
    const tokens = clean
      .replace(/[?!.,;:"'()\[\]{}]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1 && !stopWords.includes(t));

    window.MAWAS_FAQ_DATA.forEach(item => {
      let score = 0;
      const qText = (lang === 'en' ? item.q_en : item.q_id).toLowerCase();
      const aText = (lang === 'en' ? item.a_en : item.a_id).toLowerCase();

      // Check whole clean string in question or keywords
      if (qText.includes(clean)) score += 30;
      item.keywords.forEach(kw => {
        if (clean.includes(kw)) score += 20;
      });

      // Token match
      tokens.forEach(tok => {
        if (item.keywords.some(kw => kw.includes(tok))) score += 8;
        if (qText.includes(tok)) score += 5;
        if (aText.includes(tok)) score += 2;
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (highestScore >= 8 && bestMatch) {
      return {
        type: 'faq',
        item: bestMatch,
        text: lang === 'en' ? bestMatch.a_en : bestMatch.a_id
      };
    }

    // 4. Out-of-domain fallback (injeksi pertanyaan di luar yang diketahui)
    return {
      type: 'fallback',
      text: lang === 'en'
        ? "Sorry, that specific information is not available in the MAWAS knowledge base. I can help explain MaxEnt habitat modeling, the Ecological Vulnerability Index (IVE), Getis-Ord Gi* hotspot analysis, interactive map features, or Bornean orangutan conservation. Please choose from the topics below."
        : "Maaf, informasi tersebut belum tersedia dalam basis pengetahuan MAWAS. Saya dapat membantu menjelaskan tentang pemodelan habitat MaxEnt, Indeks Kerentanan Ekologis (IKE), analisis klaster Getis-Ord Gi*, fitur peta interaktif, atau konservasi orangutan Kalimantan. Silakan pilih topik di bawah ini."
    };
  };
})();
