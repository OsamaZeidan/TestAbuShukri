// ═══════════════════════════════════════════════════════════
// ADMIN EDITOR v4 — All items editable, brand-styled
// ═══════════════════════════════════════════════════════════
(() => {
  'use strict';

  const SAMPLE_DATA = {
    en: {
      page_title: 'Abu Shukri | Since 1989 | Ramallah',
      hero: {
        badge: 'Since 1989 · Ramallah',
        logo_url: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=200&h=200&fit=crop',
        title_line_1: 'ABU', title_line_2: 'SHUKRI',
        tagline: 'Flavors you never forget',
        subtext: 'Fresh bagels, sandwiches, salads, coffee, and warm service across our branches.',
        primary_cta_href: '#locations', primary_cta_label: 'Visit Locations',
        secondary_cta_href: '#story', secondary_cta_label: 'Our Story'
      },
      navigation: {
        brand: 'ABU SHUKRI', home_label: 'Home', story_label: 'Our Story',
        gallery_label: 'Gallery', locations_label: 'Locations',
        forms_label: 'Forms', contact_label: 'Contact', menu_label: 'View Menu'
      },
      story: {
        eyebrow: 'Our Story', title_main: 'A taste', title_emphasis: 'from another time',
        image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=500&fit=crop',
        paragraphs: [
          'Since 1989, Abu Shukri has been more than a cafe. It has been a daily ritual, a meeting point, and a keeper of memories for the people of Ramallah.',
          'What started as a single small spot grew into beloved branches serving the same handcrafted bagels, fresh sandwiches, and carefully brewed coffee.',
          'Every item on the menu carries decades of refinement so every visit feels familiar, comforting, and full of character.'
        ],
        stats: [
          { value: 35, suffix: '+', label: 'Years of Flavor' },
          { value: 3, suffix: '', label: 'Locations' },
          { value: 20, suffix: '+', label: 'Menu Items' }
        ]
      },
      gallery: {
        eyebrow: 'Gallery', title_main: 'Inside', title_emphasis: 'Abu Shukri',
        items: [
          { image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop', label: 'Interior', href: '' },
          { image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop', label: 'Counter', href: '' },
          { image_url: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=600&h=400&fit=crop', label: 'Bagels', href: '' },
          { image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop', label: 'Coffee', href: '' },
          { image_url: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop', label: '', href: 'https://www.chatgpt.com' }
        ]
      },
      branches_section: { eyebrow: 'Find Us', title_main: 'Three', title_emphasis: 'Locations', description: 'Visit any Abu Shukri branch and get the same quality, warmth, and menu experience.' },
      branches: [
        { name: 'Ein Yabroud - Main Street', address: 'Ein Yabroud, Main Street, opposite the mosque', landing_blurb: 'Our original branch with the classic Abu Shukri atmosphere.', phone_numbers: ['+970 592 200 201'], hours: 'Daily · 7:00 AM - 10:00 PM', map_url: 'https://maps.google.com/?q=Ein+Yabroud+Ramallah', slug: 'ein-yabroud-main-street' },
        { name: 'Silwad - Main Street', address: 'Silwad, Main Street, opposite Al Amal Medical Center', landing_blurb: 'A busy branch built for fast service and familiar favourites.', phone_numbers: ['+970 592 200 202'], hours: 'Daily · 7:00 AM - 10:00 PM', map_url: 'https://maps.google.com/?q=Silwad+Ramallah', slug: 'silwad-main-street' },
        { name: 'Birzeit - Main Street', address: 'Birzeit, Main Street, near 2000 gas station roundabout', landing_blurb: 'A welcoming branch close to the university and the daily city flow.', phone_numbers: ['+970 592 200 204'], hours: 'Daily · 7:00 AM - 10:00 PM', map_url: 'https://maps.google.com/?q=Birzeit+Ramallah', slug: 'birzeit-main-street' }
      ],
      contact: {
        eyebrow: 'Get in Touch', title_main: "We'd love to", title_emphasis: 'hear from you',
        description: 'For questions, feedback, recruitment, or promotions, use the forms below or contact a branch directly.',
        hours_summary: 'Every day · 7:00 AM - 10:00 PM',
        forms_title: 'Choose the Form You Need', forms_note: 'Paste the published Google Forms links from the admin panel. They will render inline on the site.',
        location_summary: 'Three branches across Ramallah, West Bank, Palestine',
        forms: [],
        social_links: [
          { platform_label: 'Facebook', url: 'https://facebook.com', icon_text: 'FB', icon_svg: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.8c-.3 0-1.3-.1-2.5-.1C11.8 4.7 10 6.1 10 8.7V11H7.3v3H10v8h3.5Z"></path></svg>' }
        ]
      },
      footer: { brand: 'ABU SHUKRI', copy: 'All rights reserved.', links: [{ label: 'Story', href: '#story' }, { label: 'Locations', href: '#locations' }, { label: 'Contact', href: '#contact' }] },
      ui: { scroll: 'Scroll', google_maps: 'Google Maps', google_form: 'Open Form', follow_us: 'Follow Us' }
    },
    ar: {
      page_title: 'أبو شكري | منذ 1989 | رام الله',
      hero: {
        badge: 'منذ 1989 · رام الله',
        logo_url: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=200&h=200&fit=crop',
        title_line_1: 'أبو', title_line_2: 'شكري',
        tagline: 'نكهات لا تُنسى',
        subtext: 'بيغل طازج، ساندويتشات، سلطة، قهوة، وخدمة دافئة في جميع فروعنا.',
        primary_cta_href: '#locations', primary_cta_label: 'زيارة الفروع',
        secondary_cta_href: '#story', secondary_cta_label: 'قصتنا'
      },
      navigation: {
        brand: 'أبو شكري', home_label: 'الرئيسية', story_label: 'قصتنا',
        gallery_label: 'المعرض', locations_label: 'المواقع',
        forms_label: 'النماذج', contact_label: 'تواصل', menu_label: 'القائمة'
      },
      story: {
        eyebrow: 'قصتنا', title_main: 'طعم', title_emphasis: 'من زمن آخر',
        image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=500&fit=crop',
        paragraphs: [
          'منذ عام 1989، أبو شكري لم يكن مجرد مقهى. كان طقساً يومياً، ونقطة التقاء، وحارساً لذكريات أهل رام الله.',
          'ما بدأ كمنفذ صغير واحد نمى ليصبح فروعاً محبوبة تقدم نفس البيغل المصنوع يدوياً، الساندويتشات الطازجة، والقهوة المخمولة بعناية.',
          'كل عنصر في القائمة يحمل عقوداً من التحسين لكي تكون كل زيارة مألوفة، ومريحة، ومليئة بالشخصية.'
        ],
        stats: [
          { value: 35, suffix: '+', label: 'سنة من النكهة' },
          { value: 3, suffix: '', label: 'فروع' },
          { value: 20, suffix: '+', label: 'عنصر في القائمة' }
        ]
      },
      gallery: {
        eyebrow: 'المعرض', title_main: 'داخل', title_emphasis: 'أبو شكري',
        items: [
          { image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop', label: 'الداخلية', href: '' },
          { image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop', label: 'المنضدة', href: '' },
          { image_url: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=600&h=400&fit=crop', label: 'بيغل', href: '' },
          { image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop', label: 'قهوة', href: '' },
          { image_url: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop', label: '', href: '' }
        ]
      },
      branches_section: { eyebrow: 'موقعنا', title_main: 'ثلاثة', title_emphasis: 'فروع', description: 'قم بزيارة أي فرع من فروع أبو شكري واحصل على نفس الجودة والدفء وتجربة القائمة.' },
      branches: [
        { name: 'عين يبرود - الشارع الرئيسي', address: 'عين يبرود، الشارع الرئيسي، مقابل المسجد', landing_blurb: 'فرعنا الأصلي بأجواء أبو شكري الكلاسيكية.', phone_numbers: ['+970 592 200 201'], hours: 'يومياً · 7:00 ص - 10:00 م', map_url: 'https://maps.google.com/?q=Ein+Yabroud+Ramallah', slug: 'ein-yabroud-main-street' },
        { name: 'سلواد - الشارع الرئيسي', address: 'سلواد، الشارع الرئيسي، مقابل مركز الأمل الطبي', landing_blurb: 'فرع نشط مبني للخدمة السريعة والمفضلات المألوفة.', phone_numbers: ['+970 592 200 202'], hours: 'يومياً · 7:00 ص - 10:00 م', map_url: 'https://maps.google.com/?q=Silwad+Ramallah', slug: 'silwad-main-street' },
        { name: 'بيرزيت - الشارع الرئيسي', address: 'بيرزيت، الشارع الرئيسي، قرب دوار محطة 2000', landing_blurb: 'فرع ترحيبي قريب من الجامعة وتدفق المدينة اليومي.', phone_numbers: ['+970 592 200 204'], hours: 'يومياً · 7:00 ص - 10:00 م', map_url: 'https://maps.google.com/?q=Birzeit+Ramallah', slug: 'birzeit-main-street' }
      ],
      contact: {
        eyebrow: 'تواصل معنا', title_main: 'نود أن', title_emphasis: 'نسمع منك',
        description: 'للأسئلة، التعليقات، التوظيف، أو العروض، استخدم النماذج أدناه أو تواصل مع فرع مباشرة.',
        hours_summary: 'يومياً · 7:00 ص - 10:00 م',
        forms_title: 'اختر النموذج الذي تحتاجه', forms_note: 'الصق روابط نماذج Google المنشورة من لوحة الإدارة.',
        location_summary: 'ثلاثة فروع في رام الله، الضفة الغربية، فلسطين',
        forms: [],
        social_links: [
          { platform_label: 'فيسبوك', url: 'https://facebook.com', icon_text: 'FB', icon_svg: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.8c-.3 0-1.3-.1-2.5-.1C11.8 4.7 10 6.1 10 8.7V11H7.3v3H10v8h3.5Z"></path></svg>' }
        ]
      },
      footer: { brand: 'أبو شكري', copy: 'جميع الحقوق محفوظة.', links: [{ label: 'القصة', href: '#story' }, { label: 'المواقع', href: '#locations' }, { label: 'تواصل', href: '#contact' }] },
      ui: { scroll: 'مرر', google_maps: 'خرائط جوجل', google_form: 'فتح النموذج', follow_us: 'تابعنا' }
    }
  };

  // ─── SCHEMAS: isStringArray marks list of strings (not objects) ──
  const LIST_SCHEMAS = {
    'story.paragraphs': [
      { key: 'text', label: 'Paragraph Text', type: 'textarea', isStringArray: true }
    ],
    'story.stats': [
      { key: 'value', label: 'Value', type: 'number' },
      { key: 'suffix', label: 'Suffix (e.g. +)', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' }
    ],
    'gallery.items': [
      { key: 'image_url', label: 'Image URL', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'href', label: 'Link URL (optional)', type: 'text' }
    ],
    'branches': [
      { key: 'name', label: 'Branch Name', type: 'text' },
      { key: 'address', label: 'Address', type: 'text' },
      { key: 'landing_blurb', label: 'Summary', type: 'textarea' },
      { key: 'phone_numbers', label: 'Phones (comma separated)', type: 'text', isArray: true },
      { key: 'hours', label: 'Hours', type: 'text' },
      { key: 'map_url', label: 'Google Maps URL', type: 'text' },
      { key: 'slug', label: 'URL Slug', type: 'text' }
    ],
    'contact.social_links': [
      { key: 'platform_label', label: 'Platform Name', type: 'text' },
      { key: 'url', label: 'Profile URL', type: 'text' },
      { key: 'icon_text', label: 'Icon Text (e.g. FB, IG)', type: 'text' }
    ],
    'contact.forms': [
      { key: 'title', label: 'Form Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'google_form_url', label: 'Google Form URL', type: 'text' },
      { key: 'badge', label: 'Badge Text (optional)', type: 'text' }
    ]
  };

  let currentLang = 'en';
  let currentData = JSON.parse(JSON.stringify(SAMPLE_DATA));
  let activeEditKey = null;
  let activeEditElement = null;
  let pencilHideTimeout = null;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function getNestedValue(obj, path) {
    return path.split('.').reduce((o, k) => {
      const m = k.match(/^([^\[]+)\[(\d+)\]$/);
      if (m) return o ? o[m[1]][parseInt(m[2])] : undefined;
      return o ? o[k] : undefined;
    }, obj);
  }
  function setNestedValue(obj, path, value) {
    const parts = path.split('.'); let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const m = parts[i].match(/^([^\[]+)\[(\d+)\]$/);
      cur = m ? cur[m[1]][parseInt(m[2])] : cur[parts[i]];
    }
    const last = parts[parts.length - 1], m = last.match(/^([^\[]+)\[(\d+)\]$/);
    if (m) cur[m[1]][parseInt(m[2])] = value; else cur[last] = value;
  }
  function pushNestedArray(obj, path, item) { const a = getNestedValue(obj, path); if (Array.isArray(a)) a.push(item); }
  function removeNestedIndex(obj, path, index) { const a = getNestedValue(obj, path); if (Array.isArray(a) && index >= 0 && index < a.length) a.splice(index, 1); }

  // ─── Action buttons HTML ────────────────────────────────
  function itemActions(listKey, index) {
    return `<div class="admin-item-actions">
      <button class="admin-edit-item-btn" data-list-key="${listKey}" data-list-index="${index}" title="Edit">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
      </button>
      <button class="admin-remove-btn" data-list-key="${listKey}" data-list-index="${index}" title="Remove">&times;</button>
    </div>`;
  }

  // ─── RENDER ─────────────────────────────────────────────
  function renderPage(data, lang) {
    const d = data[lang];
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.dataset.lang = lang;
    document.body.dataset.dir = dir;
    document.title = d.page_title;

    const phoneSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.7A2 2 0 0 1 2.18 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.91 8.09a16 16 0 0 0 6 6l1.45-1.45a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/></svg>';
    const mapSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 6.5-9 13-9 13s-9-6.5-9-13a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

    const html = `<div class="public-shell" data-public-shell="landing">
      <nav class="site-nav">
        <a href="#home" class="nav-logo">
          <img src="${d.hero.logo_url}" alt="${d.navigation.brand}" data-inline-edit-key="hero.logo_url" data-inline-edit-type="image" />
          <span data-inline-edit-key="navigation.brand">${d.navigation.brand}</span>
        </a>
        <ul class="nav-links">
          <li><a href="#home" class="active" data-inline-edit-key="navigation.home_label">${d.navigation.home_label}</a></li>
          <li><a href="#story" data-inline-edit-key="navigation.story_label">${d.navigation.story_label}</a></li>
          <li><a href="#gallery" data-inline-edit-key="navigation.gallery_label">${d.navigation.gallery_label}</a></li>
          <li><a href="#locations" data-inline-edit-key="navigation.locations_label">${d.navigation.locations_label}</a></li>
          <li><a href="#forms" data-inline-edit-key="navigation.forms_label">${d.navigation.forms_label}</a></li>
          <li><a href="#contact" data-inline-edit-key="navigation.contact_label">${d.navigation.contact_label}</a></li>
        </ul>
        <div class="site-nav-actions">
          <a href="#" class="lang-toggle-link">${lang === 'en' ? 'AR' : 'EN'}</a>
          <button class="hamburger" type="button" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </nav>

      <div class="mobile-menu">
        <a href="#home">${d.navigation.home_label}</a>
        <a href="#story">${d.navigation.story_label}</a>
        <a href="#gallery">${d.navigation.gallery_label}</a>
        <a href="#locations">${d.navigation.locations_label}</a>
        <a href="#forms">${d.navigation.forms_label}</a>
        <a href="#contact">${d.navigation.contact_label}</a>
      </div>

      <main>
        <section id="home" class="hero">
          <div class="hero-bg"></div><div class="hero-grain"></div>
          <div class="hero-content">
            <span class="hero-badge" data-inline-edit-key="hero.badge">${d.hero.badge}</span>
            <img src="${d.hero.logo_url}" alt="${d.navigation.brand}" class="hero-logo-img" data-inline-edit-key="hero.logo_url" data-inline-edit-type="image" />
            <h1><span data-inline-edit-key="hero.title_line_1">${d.hero.title_line_1}</span><br /><em data-inline-edit-key="hero.title_line_2">${d.hero.title_line_2}</em></h1>
            <p class="hero-tagline" data-inline-edit-key="hero.tagline">${d.hero.tagline}</p>
            <p class="hero-sub" data-inline-edit-key="hero.subtext">${d.hero.subtext}</p>
            <div class="hero-cta">
              <a href="${d.hero.primary_cta_href}" class="btn-primary" data-inline-edit-key="hero.primary_cta_label">${d.hero.primary_cta_label}</a>
              <a href="${d.hero.secondary_cta_href}" class="btn-outline" data-inline-edit-key="hero.secondary_cta_label">${d.hero.secondary_cta_label}</a>
            </div>
          </div>
          <div class="hero-scroll"><span data-inline-edit-key="ui.scroll">${d.ui.scroll}</span><div class="hero-scroll-line"></div></div>
        </section>

        <section id="story" class="story">
          <div class="container"><div class="story-grid">
            <div class="story-image reveal">
              <div class="story-img-frame">
                <img src="${d.story.image_url}" alt="${d.story.title_main} ${d.story.title_emphasis}" data-inline-edit-key="story.image_url" data-inline-edit-type="image" />
                <div class="story-img-corner"></div>
              </div>
              <div class="story-stats" data-inline-edit-list="story.stats">
                ${d.story.stats.map((s, i) => `
                  <div class="stat-item admin-removable" data-list-index="${i}">
                    ${itemActions('story.stats', i)}
                    <div class="stat-num" data-count="${s.value}" data-suffix="${s.suffix}">${s.value}<span>${s.suffix}</span></div>
                    <div class="stat-label">${s.label}</div>
                  </div>
                `).join('')}
              </div>
              <div class="admin-add-row"><button class="admin-add-btn" data-list-key="story.stats" title="Add Stat">+</button></div>
            </div>
            <div class="reveal">
              <span class="section-label" data-inline-edit-key="story.eyebrow">${d.story.eyebrow}</span>
              <h2 class="section-title"><span data-inline-edit-key="story.title_main">${d.story.title_main}</span> <em data-inline-edit-key="story.title_emphasis">${d.story.title_emphasis}</em></h2>
              <div class="section-divider"></div>
              <div class="story-copy-list" data-inline-edit-list="story.paragraphs">
                ${d.story.paragraphs.map((p, i) => `
                  <div class="story-paragraph-wrap admin-removable" data-list-index="${i}">
                    ${itemActions('story.paragraphs', i)}
                    <p class="section-desc story-copy" data-inline-edit-key="story.paragraphs[${i}]">${p}</p>
                  </div>
                `).join('')}
              </div>
              <div class="admin-add-row"><button class="admin-add-btn" data-list-key="story.paragraphs" title="Add Paragraph">+</button></div>
              <a href="#locations" class="btn-primary" data-inline-edit-key="navigation.locations_label">${d.navigation.locations_label}</a>
            </div>
          </div></div>
        </section>

        <section id="gallery" class="gallery">
          <div class="container">
            <div class="reveal">
              <span class="section-label" data-inline-edit-key="gallery.eyebrow">${d.gallery.eyebrow}</span>
              <h2 class="section-title"><span data-inline-edit-key="gallery.title_main">${d.gallery.title_main}</span> <em data-inline-edit-key="gallery.title_emphasis">${d.gallery.title_emphasis}</em></h2>
              <div class="section-divider"></div>
            </div>
            <div class="gallery-grid" data-inline-edit-list="gallery.items">
              ${d.gallery.items.map((item, i) => `
                <div class="gallery-item reveal admin-removable" data-list-index="${i}">
                  ${itemActions('gallery.items', i)}
                  ${item.href ? `
                    <a href="${item.href}" target="_blank" rel="noreferrer" class="gallery-link-out">
                      <img src="${item.image_url}" alt="${item.label}" />
                      <div class="gallery-item-overlay"><span class="gallery-item-label">${item.label}</span></div>
                    </a>
                  ` : `
                    <button type="button" class="gallery-lightbox-btn" data-lightbox-src="${item.image_url}" data-lightbox-alt="${item.label}">
                      <img src="${item.image_url}" alt="${item.label}" />
                      <div class="gallery-item-overlay"><span class="gallery-item-label">${item.label}</span></div>
                    </button>
                  `}
                </div>
              `).join('')}
            </div>
            <div class="admin-add-row"><button class="admin-add-btn" data-list-key="gallery.items" title="Add Image">+</button></div>
          </div>
        </section>

        <section id="locations" class="locations">
          <div class="container">
            <div class="reveal">
              <span class="section-label" data-inline-edit-key="branches_section.eyebrow">${d.branches_section.eyebrow}</span>
              <h2 class="section-title"><span data-inline-edit-key="branches_section.title_main">${d.branches_section.title_main}</span> <em data-inline-edit-key="branches_section.title_emphasis">${d.branches_section.title_emphasis}</em></h2>
              <div class="section-divider"></div>
              <p class="section-desc" data-inline-edit-key="branches_section.description">${d.branches_section.description}</p>
            </div>
            <div class="locations-grid" data-inline-edit-list="branches">
              ${d.branches.map((b, i) => `
                <article class="location-card reveal admin-removable" data-list-index="${i}">
                  ${itemActions('branches', i)}
                  <div class="location-num">${String(i + 1).padStart(2, '0')}</div>
                  <div class="location-name">${b.name}</div>
                  <p class="location-address">${b.address}</p>
                  <p class="location-summary">${b.landing_blurb}</p>
                    ${b.phone_numbers.map(ph => `<a href="tel:${ph}" class="location-phone">${phoneSvg} <span dir="ltr">${ph}</span></a>`).join('')}                  <div class="location-hours">
                    <div class="location-hours-title">${d.contact.hours_summary}</div>
                    <div class="location-hours-text">${b.hours}</div>
                  </div>
                  <div class="location-actions">
                    <a href="${b.map_url}" class="location-map-btn" target="_blank" rel="noreferrer">${mapSvg} ${d.ui.google_maps}</a>
                    <a href="#" class="location-menu-btn">${d.navigation.menu_label}</a>
                  </div>
                </article>
              `).join('')}
            </div>
            <div class="admin-add-row"><button class="admin-add-btn" data-list-key="branches" title="Add Branch">+</button></div>
          </div>
        </section>

        <section id="contact" class="contact">
          <div class="container">
            <div class="reveal">
              <span class="section-label" data-inline-edit-key="contact.eyebrow">${d.contact.eyebrow}</span>
              <h2 class="section-title"><span data-inline-edit-key="contact.title_main">${d.contact.title_main}</span> <em data-inline-edit-key="contact.title_emphasis">${d.contact.title_emphasis}</em></h2>
              <div class="section-divider"></div>
              <p class="section-desc" data-inline-edit-key="contact.description">${d.contact.description}</p>
            </div>
            <div class="contact-grid">
              <div id="forms" class="contact-actions reveal">
                <div class="contact-actions-label" data-inline-edit-key="navigation.forms_label">${d.navigation.forms_label}</div>
                <h3 class="contact-actions-title" data-inline-edit-key="contact.forms_title">${d.contact.forms_title}</h3>
                <p class="contact-actions-note" data-inline-edit-key="contact.forms_note">${d.contact.forms_note}</p>
                <div class="form-actions-grid" data-inline-edit-list="contact.forms">
                  ${d.contact.forms.map((f, i) => `
                    <article class="form-action-card admin-removable" data-list-index="${i}">
                      ${itemActions('contact.forms', i)}
                      ${f.badge ? `<span class="form-action-badge">${f.badge}</span>` : ''}
                      <h4 class="form-action-title">${f.title}</h4>
                      <p class="form-action-desc">${f.description}</p>
                      <a href="${f.google_form_url}" target="_blank" rel="noreferrer" class="btn-outline form-action-link">${d.ui.google_form}</a>
                      <div class="form-embed-wrap"><iframe loading="lazy" src="${f.google_form_url}" title="${f.title}"></iframe></div>
                    </article>
                  `).join('')}
                </div>
                <div class="admin-add-row"><button class="admin-add-btn" data-list-key="contact.forms" title="Add Form">+</button></div>
              </div>
              <div class="contact-info reveal">
                <div class="contact-info-item">
                  <div class="contact-info-label" data-inline-edit-key="navigation.locations_label">${d.navigation.locations_label}</div>
                  <div class="contact-info-text" data-inline-edit-key="contact.location_summary">${d.contact.location_summary}</div>
                </div>
                <div class="contact-info-item">
                  <div class="contact-info-label" data-inline-edit-key="navigation.contact_label">${d.navigation.contact_label}</div>
                  <div class="contact-info-text">
                    ${d.branches.flatMap(b => b.phone_numbers).map(ph => `<a href="tel:${ph}">${ph}</a>`).join('<br />')}
                  </div>
                </div>
                <div class="contact-info-item">
                  <div class="contact-info-label" data-inline-edit-key="contact.forms_title">${d.contact.forms_title}</div>
                  <div class="contact-info-text" data-inline-edit-key="contact.hours_summary">${d.contact.hours_summary}</div>
                </div>
                <div class="contact-info-item" data-inline-edit-list="contact.social_links">
                  <div class="contact-info-label" data-inline-edit-key="ui.follow_us">${d.ui.follow_us}</div>
                  <div class="social-links">
                    ${d.contact.social_links.map((s, i) => `
                      <div class="social-link-wrap admin-removable" data-list-index="${i}">
                        ${itemActions('contact.social_links', i)}
                        <a href="${s.url}" class="social-link" target="_blank" rel="noreferrer" aria-label="${s.platform_label}">
                          ${s.icon_svg ? s.icon_svg : `<span class="social-link-fallback">${s.icon_text}</span>`}
                        </a>
                      </div>
                    `).join('')}
                  </div>
                  <div class="admin-add-row"><button class="admin-add-btn" data-list-key="contact.social_links" title="Add Social Link">+</button></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div class="container"><div class="footer-inner">
          <a href="#home" class="footer-logo">
            <img src="${d.hero.logo_url}" alt="${d.footer.brand}" />
            <span data-inline-edit-key="footer.brand">${d.footer.brand}</span>
          </a>
          <ul class="footer-links">
            ${d.footer.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
          </ul>
          <p class="footer-copy">&copy; ${new Date().getFullYear()} <span data-inline-edit-key="footer.brand">${d.footer.brand}</span>. <span data-inline-edit-key="footer.copy">${d.footer.copy}</span></p>
        </div></div>
      </footer>

      <div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <img src="" alt="" />
      </div>
    </div>`;

    $('#spa-root').innerHTML = html;
    initPublicFeatures();
  }

  // ─── PUBLIC FEATURES ────────────────────────────────────
  function initPublicFeatures() {
    const nav = $('.site-nav');
    if (nav) { const h = () => nav.classList.toggle('scrolled', window.scrollY > 60); h(); window.addEventListener('scroll', h, { passive: true }); }
    const hamburger = $('.hamburger'), mm = $('.mobile-menu');
    if (hamburger && mm) {
      hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); mm.classList.toggle('open'); });
      $$('a', mm).forEach(a => a.addEventListener('click', () => { hamburger.classList.remove('open'); mm.classList.remove('open'); }));
    }
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }), { threshold: 0.1 });
    $$('.reveal').forEach(el => obs.observe(el));
    const lb = $('.lightbox');
    if (lb) {
      const img = $('img', lb);
      $$('.gallery-lightbox-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (e.target.closest('.admin-edit-item-btn, .admin-remove-btn, .admin-item-actions')) return;
          img.src = btn.dataset.lightboxSrc || ''; img.alt = btn.dataset.lightboxAlt || '';
          lb.classList.add('open'); document.body.style.overflow = 'hidden';
        });
      });
      $('.lightbox-close', lb).addEventListener('click', closeLightbox);
      lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    }
  }
  function closeLightbox() { const lb = $('.lightbox'); if (lb) lb.classList.remove('open'); document.body.style.overflow = ''; }

  // ─── ADMIN FEATURES ─────────────────────────────────────
  const pencil = $('#admin-edit-pencil');

  function initAdmin() {
    renderPage(currentData, currentLang);
    updateLangUI();

    // Hover: show pencil for [data-inline-edit-key]
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.admin-item-actions, .admin-add-btn, #admin-bar, #admin-fab, .admin-modal')) return;
      const target = e.target.closest('[data-inline-edit-key]');
      if (target && !target.classList.contains('admin-editing')) {
        clearTimeout(pencilHideTimeout);
        activeEditKey = target.dataset.inlineEditKey;
        activeEditElement = target;
        positionPencil(target);
        pencil.classList.add('visible');
      }
    });
    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-inline-edit-key]');
      if (target) { pencilHideTimeout = setTimeout(() => { if (!pencil.matches(':hover')) pencil.classList.remove('visible'); }, 300); }
    });
    pencil.addEventListener('mouseenter', () => clearTimeout(pencilHideTimeout));
    pencil.addEventListener('mouseleave', () => pencil.classList.remove('visible'));

    // ── CLICK HANDLER: process admin buttons FIRST ──
    document.addEventListener('click', (e) => {

      // 1) Edit button on list items (highest priority)
      const editBtn = e.target.closest('.admin-edit-item-btn');
      if (editBtn) {
        e.preventDefault(); e.stopPropagation();
        openItemModal(editBtn.dataset.listKey, parseInt(editBtn.dataset.listIndex));
        return;
      }

      // 2) Remove button on list items
      const removeBtn = e.target.closest('.admin-remove-btn');
      if (removeBtn) {
        e.preventDefault(); e.stopPropagation();
        openConfirmModal(removeBtn.dataset.listKey, parseInt(removeBtn.dataset.listIndex));
        return;
      }

      // 3) Add button
      const addBtn = e.target.closest('.admin-add-btn');
      if (addBtn) {
        e.preventDefault(); e.stopPropagation();
        openItemModal(addBtn.dataset.listKey, -1);
        return;
      }

      // 4) Skip admin chrome
      if (e.target.closest('#admin-bar, #admin-fab, .admin-modal, .admin-edit-pencil')) return;

      // 5) Inline-edit-key click
      const target = e.target.closest('[data-inline-edit-key]');
      if (target && !target.classList.contains('admin-editing')) {
        e.preventDefault(); e.stopPropagation();
        if (target.dataset.inlineEditType === 'image') {
          openImageModal(target.dataset.inlineEditKey);
        } else {
          startTextEditing(target, target.dataset.inlineEditKey);
        }
        pencil.classList.remove('visible');
      }
    });

    // Pencil click
    pencil.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!activeEditElement) return;
      if (activeEditElement.dataset.inlineEditType === 'image') openImageModal(activeEditKey);
      else startTextEditing(activeEditElement, activeEditKey);
      pencil.classList.remove('visible');
    });

    setupModals();

    // FABs
    $('#btn-save-draft').addEventListener('click', () => {
      localStorage.setItem('abushukri_draft', JSON.stringify(currentData));
      showToast('Draft saved successfully!', 'success');
    });
    $('#btn-publish').addEventListener('click', () => {
      localStorage.setItem('abushukri_published', JSON.stringify(currentData));
      localStorage.removeItem('abushukri_draft');
      showToast('Changes published!', 'success');
    });
    $('#admin-discard-btn').addEventListener('click', () => {
      currentData = JSON.parse(JSON.stringify(SAMPLE_DATA));
      renderPage(currentData, currentLang);
      showToast('Changes discarded.', 'danger');
    });
    $('#admin-lang-toggle').addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      const sy = window.scrollY;
      renderPage(currentData, currentLang);
      window.scrollTo(0, sy);
      updateLangUI();
    });

    const draft = localStorage.getItem('abushukri_draft');
    if (draft) { try { currentData = JSON.parse(draft); renderPage(currentData, currentLang); showToast('Draft loaded.', 'success'); } catch (e) { /* ignore */ } }
  }

  function updateLangUI() {
    const l = currentLang === 'en' ? 'EN' : 'AR';
    const n = currentLang === 'en' ? 'AR' : 'EN';
    $('#admin-lang-label').textContent = `Editing: ${l}`;
    $('#admin-lang-toggle span').textContent = `Switch to ${n}`;
  }

  function positionPencil(el) {
    const rect = el.getBoundingClientRect();
    let top = rect.top + window.scrollY - 18;
    let left = rect.right + window.scrollX - 18;
    if (top < window.scrollY + 50) top = rect.top + window.scrollY + 4;
    if (left > window.scrollX + window.innerWidth - 40) left = rect.left + window.scrollX - 18;
    pencil.style.top = `${top}px`; pencil.style.left = `${left}px`;
  }

  function startTextEditing(el, key) {
    el.classList.add('admin-editing');
    el.setAttribute('contenteditable', 'true');
    el.focus();
    const range = document.createRange(); range.selectNodeContents(el);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);

    const finish = () => {
      el.removeAttribute('contenteditable');
      el.classList.remove('admin-editing');
      // Get only direct text (no child element text from admin buttons)
      let text = '';
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
      });
      text = text.trim();
      setNestedValue(currentData[currentLang], key, text);
      el.removeEventListener('blur', finish);
      el.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); el.blur(); }
      if (e.key === 'Escape') el.blur();
    };
    el.addEventListener('blur', finish);
    el.addEventListener('keydown', onKey);
  }

  // ─── IMAGE MODAL ────────────────────────────────────────
  function openImageModal(key) {
    const modal = $('#admin-image-modal');
    const urlInput = $('#admin-image-url-input');
    const fileInput = $('#admin-image-file-input');
    const previewWrap = $('#admin-image-preview-wrap');
    const preview = $('#admin-image-preview');

    const cur = getNestedValue(currentData[currentLang], key) || '';
    urlInput.value = cur; fileInput.value = '';
    previewWrap.style.display = cur ? 'block' : 'none';
    if (cur) preview.src = cur;

    urlInput.oninput = () => { preview.src = urlInput.value; previewWrap.style.display = urlInput.value ? 'block' : 'none'; };
    fileInput.onchange = () => {
      const f = fileInput.files[0];
      if (f) { const r = new FileReader(); r.onload = (e) => { urlInput.value = e.target.result; preview.src = e.target.result; previewWrap.style.display = 'block'; }; r.readAsDataURL(f); }
    };

    $('#admin-image-apply').onclick = () => {
      setNestedValue(currentData[currentLang], key, urlInput.value);
      $$(`[data-inline-edit-key="${key}"]`).forEach(el => { if (el.tagName === 'IMG') el.src = urlInput.value; });
      closeModal(modal);
      showToast('Image updated.', 'success');
    };
    openModal(modal);
  }

  // ─── ITEM MODAL ─────────────────────────────────────────
  function openItemModal(listKey, index) {
    const modal = $('#admin-item-modal');
    const title = $('#admin-item-modal-title');
    const body = $('#admin-item-modal-body');
    const schema = LIST_SCHEMAS[listKey];
    if (!schema) return;

    const isEdit = index >= 0;
    const isStringArray = schema.some(f => f.isStringArray);
    title.textContent = isEdit ? 'Edit Item' : 'Add New Item';

    const arr = getNestedValue(currentData[currentLang], listKey);
    const existing = isEdit && arr ? arr[index] : {};

    let html = '';
    schema.forEach(f => {
      let val = '';
      if (isEdit && existing !== undefined) {
        if (f.isStringArray) val = existing; // existing IS the string
        else if (f.isArray) val = (existing[f.key] || []).join(', ');
        else val = existing[f.key] || '';
      }
      html += `<div style="margin-bottom:1rem">
        <label class="admin-field-label">${f.label}</label>
        ${f.type === 'textarea'
          ? `<textarea class="admin-field-input admin-field-textarea" data-field-key="${f.key}" data-field-is-string="${!!f.isStringArray}" data-field-array="${!!f.isArray}">${val}</textarea>`
          : `<input type="${f.type}" class="admin-field-input" data-field-key="${f.key}" data-field-is-string="${!!f.isStringArray}" data-field-array="${!!f.isArray}" value="${val}" />`
        }</div>`;
    });
    body.innerHTML = html;

    $('#admin-item-apply').onclick = () => {
      if (isStringArray) {
        // Paragraph: save as plain string
        const textarea = $('[data-field-is-string="true"]', body);
        const text = textarea ? textarea.value : '';
        if (isEdit) {
          arr[index] = text;
        } else {
          arr.push(text);
        }
      } else {
        // Object item
        const item = {};
        $$('[data-field-key]', body).forEach(inp => {
          let v = inp.value;
          if (inp.dataset.fieldArray === 'true') v = v.split(',').map(s => s.trim()).filter(Boolean);
          else if (inp.type === 'number') v = parseInt(v) || 0;
          item[inp.dataset.fieldKey] = v;
        });
        if (isEdit) {
          arr[index] = item;
        } else {
          arr.push(item);
        }
      }

      const sy = window.scrollY;
      renderPage(currentData, currentLang);
      window.scrollTo(0, sy);
      closeModal(modal);
      showToast(isEdit ? 'Item updated.' : 'Item added.', 'success');
    };
    openModal(modal);
  }

  // ─── CONFIRM MODAL ──────────────────────────────────────
  function openConfirmModal(listKey, index) {
    const modal = $('#admin-confirm-modal');
    $('#admin-confirm-message').textContent = 'Are you sure you want to remove this item?';
    $('#admin-confirm-ok').onclick = () => {
      removeNestedIndex(currentData[currentLang], listKey, index);
      const sy = window.scrollY;
      renderPage(currentData, currentLang);
      window.scrollTo(0, sy);
      closeModal(modal);
      showToast('Item removed.', 'danger');
    };
    openModal(modal);
  }

  // ─── MODAL UTILS ────────────────────────────────────────
  function openModal(m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal(m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  function setupModals() {
    $$('.admin-modal').forEach(m => {
      $('.admin-modal-backdrop', m).addEventListener('click', () => closeModal(m));
      $('.admin-modal-close', m).addEventListener('click', () => closeModal(m));
      $$('.admin-modal-cancel', m).forEach(b => b.addEventListener('click', () => closeModal(m)));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { $$('.admin-modal.open').forEach(closeModal); closeLightbox(); }
    });
  }

  function showToast(msg, type = 'success') {
    const c = $('#admin-toast'), el = document.createElement('div');
    el.className = `admin-toast-msg admin-toast-msg--${type}`;
    el.textContent = msg; c.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  document.addEventListener('DOMContentLoaded', initAdmin);
})();