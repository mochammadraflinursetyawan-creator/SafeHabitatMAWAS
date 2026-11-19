/**
 * MAWAS WebGIS - Tanya MAWAS FAQ & Interactive Chat Controller (js/chatbot.js)
 * Fully bilingual (ID / EN) live interactive chat with intent matching,
 * fallback guard for out-of-domain questions, and quick question cards.
 */
(function () {
  'use strict';

  // SVG Avatars (48x48)
  const AVATAR_LAUNCHER_SVG = `
    <svg viewBox="0 0 48 48" aria-hidden="true" width="44" height="44">
      <circle cx="24" cy="24" r="24" fill="#FFF8F1"/>
      <circle cx="9.5" cy="26" r="4.5" fill="#E8731F"/>
      <circle cx="38.5" cy="26" r="4.5" fill="#E8731F"/>
      <ellipse cx="24" cy="24" rx="14" ry="15" fill="#E8731F"/>
      <ellipse cx="24" cy="27" rx="9.5" ry="10.5" fill="#FBE3CC"/>
      <ellipse cx="24" cy="32" rx="5.5" ry="3.8" fill="#F3C8A2"/>
      <circle cx="20" cy="25" r="1.7" fill="#3B1D0E"/>
      <circle cx="28" cy="25" r="1.7" fill="#3B1D0E"/>
      <path d="M21.5 33 Q24 35 26.5 33" fill="none" stroke="#7A3A1A" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `;

  const AVATAR_HEADER_SVG = `
    <svg viewBox="0 0 48 48" aria-hidden="true" width="42" height="42">
      <circle cx="24" cy="24" r="24" fill="#C2410C"/>
      <circle cx="9.5" cy="26" r="4.5" fill="#F59E5B"/>
      <circle cx="38.5" cy="26" r="4.5" fill="#F59E5B"/>
      <ellipse cx="24" cy="24" rx="14" ry="15" fill="#F59E5B"/>
      <ellipse cx="24" cy="27" rx="9.5" ry="10.5" fill="#FBE3CC"/>
      <ellipse cx="24" cy="32" rx="5.5" ry="3.8" fill="#F3C8A2"/>
      <circle cx="20" cy="25" r="1.7" fill="#3B1D0E"/>
      <circle cx="28" cy="25" r="1.7" fill="#3B1D0E"/>
      <path d="M21.5 33 Q24 35 26.5 33" fill="none" stroke="#7A3A1A" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `;

  const AVATAR_MSG_SVG = `
    <svg viewBox="0 0 48 48" aria-hidden="true" width="28" height="28">
      <circle cx="24" cy="24" r="24" fill="#C2410C"/>
      <circle cx="9.5" cy="26" r="4.5" fill="#F59E5B"/>
      <circle cx="38.5" cy="26" r="4.5" fill="#F59E5B"/>
      <ellipse cx="24" cy="24" rx="14" ry="15" fill="#F59E5B"/>
      <ellipse cx="24" cy="27" rx="9.5" ry="10.5" fill="#FBE3CC"/>
      <ellipse cx="24" cy="32" rx="5.5" ry="3.8" fill="#F3C8A2"/>
      <circle cx="20" cy="25" r="1.7" fill="#3B1D0E"/>
      <circle cx="28" cy="25" r="1.7" fill="#3B1D0E"/>
      <path d="M21.5 33 Q24 35 26.5 33" fill="none" stroke="#7A3A1A" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `;

  // UI Strings Dictionary for English and Indonesian
  const I18N_STRINGS = {
    id: {
      launcher_label: 'Tanya MAWAS',
      teaser_title: 'Ada pertanyaan soal MAWAS?',
      teaser_desc: 'Cari jawaban singkat tentang data, metode, dan fitur peta.',
      panel_title: 'Tanya MAWAS',
      panel_subtitle: 'Pusat bantuan & pertanyaan umum',
      welcome_banner: 'Butuh Informasi seputar MAWAS? Tanyakan Si Mawas!',
      input_placeholder: 'Tanyakan kepada kami...',
      send_btn_aria: 'Kirim pertanyaan',
      close_panel_aria: 'Tutup chatbot',
      close_teaser_aria: 'Tutup sapaan',
      cats: {
        all: 'Semua',
        general: 'Umum',
        method: 'Metodologi',
        map: 'Peta & Fitur',
        cons: 'Konservasi'
      },
      footer_text: 'Belum ketemu jawabannya? Baca <a href="about.html">Tentang Kami</a> atau <a href="pipeline.html">Pipeline Analisis</a>.',
      related_title: 'Pertanyaan terkait:'
    },
    en: {
      launcher_label: 'Ask MAWAS',
      teaser_title: 'Have questions about MAWAS?',
      teaser_desc: 'Find quick answers about data, methods, and map features.',
      panel_title: 'Ask MAWAS',
      panel_subtitle: 'Help center & frequently asked questions',
      welcome_banner: 'Need information about MAWAS? Ask Mawas!',
      input_placeholder: 'Ask us anything...',
      send_btn_aria: 'Send question',
      close_panel_aria: 'Close chatbot',
      close_teaser_aria: 'Close teaser',
      cats: {
        all: 'All',
        general: 'General',
        method: 'Methodology',
        map: 'Maps & Features',
        cons: 'Conservation'
      },
      footer_text: 'Haven’t found your answer? Read <a href="about.html">About Us</a> or <a href="pipeline.html">Analysis Pipeline</a>.',
      related_title: 'Related questions:'
    }
  };

  class MawasChatbotWidget {
    constructor() {
      this.currentCategory = 'all';
      this.isOpen = false;
      this.teaserDismissed = false;
      this.teaserTimer = null;
      this.chatHistory = [];
    }

    init() {
      this.buildWidgetDOM();
      this.cacheElements();
      this.bindEvents();
      this.renderQuickCards();
      this.initTeaserBubble();
    }

    getLang() {
      if (window.i18n && window.i18n.currentLang) {
        return window.i18n.currentLang;
      }
      return localStorage.getItem('mawas_lang') || 'id';
    }

    getStrings() {
      const lang = this.getLang();
      return I18N_STRINGS[lang] || I18N_STRINGS.id;
    }

    buildWidgetDOM() {
      const strings = this.getStrings();
      const root = document.createElement('div');
      root.id = 'mawas-widget-root';
      root.innerHTML = `
        <!-- Teaser Bubble -->
        <div class="mawas-teaser-bubble" id="mawas-teaser-bubble" role="status" aria-live="polite">
          <div class="mawas-teaser-header">
            <h4 class="mawas-teaser-title" id="mawas-teaser-title">${strings.teaser_title}</h4>
            <button class="mawas-teaser-close" id="mawas-teaser-close" aria-label="${strings.close_teaser_aria}">&times;</button>
          </div>
          <p class="mawas-teaser-desc" id="mawas-teaser-desc">${strings.teaser_desc}</p>
        </div>

        <!-- Pill Launcher Button -->
        <button class="mawas-launcher-btn" id="mawas-launcher-btn" type="button" 
                aria-label="${strings.launcher_label}" 
                title="${strings.launcher_label}" 
                aria-expanded="false" 
                aria-controls="mawas-panel">
          <div class="mawas-launcher-avatar">
            ${AVATAR_LAUNCHER_SVG}
          </div>
          <span class="mawas-launcher-label" id="mawas-launcher-label">${strings.launcher_label}</span>
        </button>

        <!-- Backdrop Overlay (for mobile bottom sheet) -->
        <div class="mawas-backdrop" id="mawas-backdrop"></div>

        <!-- Main Panel -->
        <div class="mawas-panel" id="mawas-panel" role="dialog" aria-labelledby="mawas-panel-title" aria-modal="true">
          <!-- Header -->
          <div class="mawas-panel-header">
            <div class="mawas-panel-brand">
              <div class="mawas-panel-avatar">
                ${AVATAR_HEADER_SVG}
              </div>
              <div class="mawas-panel-titles">
                <h3 class="mawas-panel-title" id="mawas-panel-title">${strings.panel_title}</h3>
                <p class="mawas-panel-subtitle" id="mawas-panel-subtitle">${strings.panel_subtitle}</p>
              </div>
            </div>
            <button class="mawas-panel-close" id="mawas-panel-close" aria-label="${strings.close_panel_aria}" type="button">
              <i class="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>

          <!-- Chat Body Stream -->
          <div class="mawas-chat-body" id="mawas-chat-body" role="log" aria-live="polite">
            <!-- Welcome Banner (Like SIGAP Image) -->
            <div class="mawas-welcome-banner">
              <div class="mawas-banner-avatar">
                ${AVATAR_HEADER_SVG}
              </div>
              <p class="mawas-banner-text" id="mawas-banner-text">${strings.welcome_banner}</p>
            </div>

            <!-- Category Filter Chips -->
            <div class="mawas-chips-bar" role="tablist" aria-label="Kategori Pertanyaan" id="mawas-chips-bar">
              <button class="mawas-chip" data-cat="all" role="tab" aria-pressed="true">${strings.cats.all}</button>
              <button class="mawas-chip" data-cat="general" role="tab" aria-pressed="false">${strings.cats.general}</button>
              <button class="mawas-chip" data-cat="method" role="tab" aria-pressed="false">${strings.cats.method}</button>
              <button class="mawas-chip" data-cat="map" role="tab" aria-pressed="false">${strings.cats.map}</button>
              <button class="mawas-chip" data-cat="cons" role="tab" aria-pressed="false">${strings.cats.cons}</button>
            </div>

            <!-- Quick Questions Cards (SIGAP Reference Style) -->
            <div class="mawas-quick-cards-list" id="mawas-quick-cards-list"></div>

            <!-- Dynamic Messages Thread -->
            <div class="mawas-messages-thread" id="mawas-messages-thread" style="display: flex; flex-direction: column; gap: 12px;"></div>
          </div>

          <!-- Chat Input Bar (Bottom) -->
          <div class="mawas-input-bar-container">
            <form class="mawas-input-row" id="mawas-chat-form">
              <input type="text" class="mawas-chat-input" id="mawas-chat-input" 
                     placeholder="${strings.input_placeholder}" 
                     autocomplete="off" 
                     aria-label="${strings.input_placeholder}">
              <button class="mawas-send-btn" id="mawas-send-btn" type="submit" aria-label="${strings.send_btn_aria}">
                <i class="fas fa-paper-plane" aria-hidden="true"></i>
              </button>
            </form>
            <p class="mawas-footer-note" id="mawas-footer-note">${strings.footer_text}</p>
          </div>
        </div>
      `;

      document.body.appendChild(root);
    }

    cacheElements() {
      this.launcherBtn = document.getElementById('mawas-launcher-btn');
      this.launcherLabel = document.getElementById('mawas-launcher-label');
      this.teaserBubble = document.getElementById('mawas-teaser-bubble');
      this.teaserTitle = document.getElementById('mawas-teaser-title');
      this.teaserDesc = document.getElementById('mawas-teaser-desc');
      this.teaserClose = document.getElementById('mawas-teaser-close');
      this.panel = document.getElementById('mawas-panel');
      this.panelTitle = document.getElementById('mawas-panel-title');
      this.panelSubtitle = document.getElementById('mawas-panel-subtitle');
      this.panelClose = document.getElementById('mawas-panel-close');
      this.backdrop = document.getElementById('mawas-backdrop');

      this.chatBody = document.getElementById('mawas-chat-body');
      this.bannerText = document.getElementById('mawas-banner-text');
      this.chipsBar = document.getElementById('mawas-chips-bar');
      this.quickCardsList = document.getElementById('mawas-quick-cards-list');
      this.messagesThread = document.getElementById('mawas-messages-thread');

      this.chatForm = document.getElementById('mawas-chat-form');
      this.chatInput = document.getElementById('mawas-chat-input');
      this.sendBtn = document.getElementById('mawas-send-btn');
      this.footerNote = document.getElementById('mawas-footer-note');
    }

    bindEvents() {
      // Toggle panel
      this.launcherBtn.addEventListener('click', () => {
        this.dismissTeaser();
        this.togglePanel();
      });

      // Teaser interaction
      this.teaserBubble.addEventListener('click', (e) => {
        if (e.target === this.teaserClose || e.target.closest('#mawas-teaser-close')) {
          e.stopPropagation();
          this.dismissTeaser();
        } else {
          this.dismissTeaser();
          this.openPanel();
        }
      });

      // Close buttons & backdrop
      this.panelClose.addEventListener('click', () => this.closePanel());
      this.backdrop.addEventListener('click', () => this.closePanel());

      // Chat submission form
      this.chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.chatInput.value.trim();
        if (!text) return;
        this.handleUserSubmit(text);
        this.chatInput.value = '';
      });

      // Category chips filtering
      this.chipsBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.mawas-chip');
        if (!chip) return;
        this.chipsBar.querySelectorAll('.mawas-chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        this.currentCategory = chip.getAttribute('data-cat') || 'all';
        this.renderQuickCards();
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closePanel();
        }
      });

      // Listen to language switch event from i18n.js
      window.addEventListener('mawas:languageChanged', () => {
        this.updateLanguageUI();
      });
    }

    updateLanguageUI() {
      const strings = this.getStrings();
      const lang = this.getLang();

      this.launcherLabel.textContent = strings.launcher_label;
      this.launcherBtn.setAttribute('aria-label', strings.launcher_label);
      this.launcherBtn.setAttribute('title', strings.launcher_label);
      this.teaserTitle.textContent = strings.teaser_title;
      this.teaserDesc.textContent = strings.teaser_desc;
      this.panelTitle.textContent = strings.panel_title;
      this.panelSubtitle.textContent = strings.panel_subtitle;
      this.bannerText.textContent = strings.welcome_banner;
      this.chatInput.setAttribute('placeholder', strings.input_placeholder);
      this.chatInput.setAttribute('aria-label', strings.input_placeholder);
      this.sendBtn.setAttribute('aria-label', strings.send_btn_aria);
      this.footerNote.innerHTML = strings.footer_text;

      // Update chip texts
      this.chipsBar.querySelectorAll('.mawas-chip').forEach(chip => {
        const cat = chip.getAttribute('data-cat');
        if (strings.cats[cat]) chip.textContent = strings.cats[cat];
      });

      // Re-render quick question cards in new language
      this.renderQuickCards();

      // Refresh any previous messages in chat thread if present
      if (this.chatHistory.length > 0) {
        this.refreshThreadLanguage(lang);
      }
    }

    refreshThreadLanguage(lang) {
      this.messagesThread.querySelectorAll('.mawas-msg').forEach((msgEl, idx) => {
        const item = this.chatHistory[idx];
        if (!item) return;

        if (item.sender === 'bot' && item.faqItem) {
          const bubble = msgEl.querySelector('.mawas-msg-bubble');
          if (bubble) {
            bubble.innerHTML = `<p style="margin: 0;">${lang === 'en' ? item.faqItem.a_en : item.faqItem.a_id}</p>`;
          }
        }
      });
    }

    initTeaserBubble() {
      let alreadySeen = false;
      try {
        alreadySeen = sessionStorage.getItem('mawas_teaser_seen') === '1';
      } catch (err) {}

      if (alreadySeen) return;

      this.teaserTimer = setTimeout(() => {
        if (!this.isOpen && !this.teaserDismissed) {
          this.teaserBubble.classList.add('is-visible');
        }
      }, 2500);
    }

    dismissTeaser() {
      this.teaserDismissed = true;
      if (this.teaserTimer) clearTimeout(this.teaserTimer);
      if (this.teaserBubble) {
        this.teaserBubble.classList.remove('is-visible');
      }
      try {
        sessionStorage.setItem('mawas_teaser_seen', '1');
      } catch (err) {}
    }

    openPanel() {
      this.isOpen = true;
      this.panel.classList.add('is-open');
      this.backdrop.classList.add('is-visible');
      this.launcherBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mawas-panel-active');

      setTimeout(() => {
        if (this.chatInput) this.chatInput.focus();
      }, 100);
    }

    closePanel() {
      this.isOpen = false;
      this.panel.classList.remove('is-open');
      this.backdrop.classList.remove('is-visible');
      this.launcherBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mawas-panel-active');
      this.launcherBtn.focus();
    }

    togglePanel() {
      if (this.isOpen) {
        this.closePanel();
      } else {
        this.openPanel();
      }
    }

    renderQuickCards() {
      if (!window.MAWAS_FAQ_DATA || !this.quickCardsList) return;
      const lang = this.getLang();

      const filtered = window.MAWAS_FAQ_DATA.filter(item => {
        if (this.currentCategory !== 'all' && item.category !== this.currentCategory) {
          return false;
        }
        return true;
      });

      this.quickCardsList.innerHTML = '';
      filtered.forEach(item => {
        const card = document.createElement('button');
        card.className = 'mawas-quick-card';
        card.type = 'button';
        const qText = lang === 'en' ? item.q_en : item.q_id;
        card.innerHTML = `
          <p class="mawas-quick-card-text">${qText}</p>
          <i class="fas fa-chevron-right mawas-quick-card-chevron" aria-hidden="true"></i>
        `;

        card.addEventListener('click', () => {
          this.handleQuickQuestionClick(item);
        });

        this.quickCardsList.appendChild(card);
      });
    }

    handleQuickQuestionClick(faqItem) {
      const lang = this.getLang();
      const question = lang === 'en' ? faqItem.q_en : faqItem.q_id;
      const answer = lang === 'en' ? faqItem.a_en : faqItem.a_id;

      // Hide the initial quick cards once conversation begins to focus on chat flow
      this.quickCardsList.style.display = 'none';

      // 1. Append User Message
      this.appendUserMessage(question);

      // 2. Show Typing Indicator
      this.showTypingIndicator();

      // 3. Bot responds after 400ms
      setTimeout(() => {
        this.removeTypingIndicator();
        this.appendBotMessage(answer, faqItem);
      }, 400);
    }

    handleUserSubmit(query) {
      const lang = this.getLang();

      // Hide the quick cards once user starts active messaging
      this.quickCardsList.style.display = 'none';

      // 1. Append user message
      this.appendUserMessage(query);

      // 2. Show typing indicator
      this.showTypingIndicator();

      // 3. Run intelligent offline intent match
      setTimeout(() => {
        this.removeTypingIndicator();
        const match = window.mawasMatchIntent ? window.mawasMatchIntent(query, lang) : null;

        if (match && match.text) {
          this.appendBotMessage(match.text, match.item || null, match.type === 'fallback');
        } else {
          // Fallback if no match function
          const fallbackText = lang === 'en'
            ? "Sorry, that specific information is not available in the MAWAS knowledge base."
            : "Maaf, informasi tersebut belum tersedia dalam basis pengetahuan MAWAS.";
          this.appendBotMessage(fallbackText, null, true);
        }
      }, 450);
    }

    appendUserMessage(text) {
      this.chatHistory.push({ sender: 'user', text });
      const msg = document.createElement('div');
      msg.className = 'mawas-msg user';
      msg.innerHTML = `
        <div class="mawas-msg-bubble">
          <p style="margin: 0;">${this.escapeHtml(text)}</p>
        </div>
      `;
      this.messagesThread.appendChild(msg);
      this.scrollToBottom();
    }

    showTypingIndicator() {
      this.removeTypingIndicator();
      const typing = document.createElement('div');
      typing.id = 'mawas-typing-indicator-node';
      typing.className = 'mawas-msg bot';
      typing.innerHTML = `
        <div class="mawas-msg-avatar">${AVATAR_MSG_SVG}</div>
        <div class="mawas-typing-indicator">
          <span class="mawas-typing-dot"></span>
          <span class="mawas-typing-dot"></span>
          <span class="mawas-typing-dot"></span>
        </div>
      `;
      this.messagesThread.appendChild(typing);
      this.scrollToBottom();
    }

    removeTypingIndicator() {
      const node = document.getElementById('mawas-typing-indicator-node');
      if (node) node.remove();
    }

    appendBotMessage(text, faqItem, isFallback = false) {
      const lang = this.getLang();
      const strings = this.getStrings();
      this.chatHistory.push({ sender: 'bot', text, faqItem });

      const msg = document.createElement('div');
      msg.className = 'mawas-msg bot';
      msg.innerHTML = `
        <div class="mawas-msg-avatar">${AVATAR_MSG_SVG}</div>
        <div class="mawas-msg-bubble">
          <p style="margin: 0;">${text}</p>
        </div>
      `;
      this.messagesThread.appendChild(msg);

      // Offer related questions / fallback suggestions
      let suggestions = [];
      if (faqItem) {
        suggestions = window.MAWAS_FAQ_DATA.filter(it => it.id !== faqItem.id && it.category === faqItem.category).slice(0, 2);
      } else if (isFallback) {
        // Offer popular starting questions
        suggestions = window.MAWAS_FAQ_DATA.slice(0, 3);
      }

      if (suggestions.length > 0) {
        const chipsWrap = document.createElement('div');
        chipsWrap.className = 'mawas-followup-chips';
        chipsWrap.innerHTML = `<span style="font-size: 11px; font-weight: 600; color: #8A776A; text-transform: uppercase;">${strings.related_title}</span>`;

        suggestions.forEach(sug => {
          const pill = document.createElement('button');
          pill.className = 'mawas-followup-pill';
          pill.type = 'button';
          pill.textContent = lang === 'en' ? sug.q_en : sug.q_id;
          pill.addEventListener('click', () => {
            this.handleQuickQuestionClick(sug);
          });
          chipsWrap.appendChild(pill);
        });

        this.messagesThread.appendChild(chipsWrap);
      }

      this.scrollToBottom();
    }

    scrollToBottom() {
      setTimeout(() => {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
      }, 50);
    }

    escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }

  // Initialize once DOM is ready on index.html
  document.addEventListener('DOMContentLoaded', () => {
    const widget = new MawasChatbotWidget();
    widget.init();
    window.mawasChatbot = widget;
  });
})();
