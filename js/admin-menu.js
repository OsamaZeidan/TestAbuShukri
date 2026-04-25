// ═══════════════════════════════════════════════════════════
// ADMIN MENU EDITOR v2 — Enhanced with bilingual, image
// upload, discount redesign, slug auto-gen, reorder
// ═══════════════════════════════════════════════════════════
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ─── Utilities ─────────────────────────── */
  function slugify(text) {
    return (text || '').toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .trim();
  }

  // Returns Arabic if available & lang is ar, else English
  function t(en, ar) {
    return (currentLang === 'ar' && ar) ? ar : (en || '');
  }

  // Resize an image file to max width, returns data URL
  function resizeImage(file, maxW = 900) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          if (img.width <= maxW) { resolve(ev.target.result); return; }
          const canvas = document.createElement('canvas');
          const ratio = maxW / img.width;
          canvas.width = maxW;
          canvas.height = Math.round(img.height * ratio);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = () => resolve(ev.target.result);
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ─── State ─────────────────────────────── */
  let menuState = null;
  let currentLang = 'en';
  let pendingDelete = null;

  // Category modal state
  let editCatIndex = -1;
  let catSlugManual = false;

  // Item modal state
  let editItemCatIndex = -1;
  let editItemIndex = -1;
  let currentImages = [];
  let itemSlugManual = false;
  let discountType = 'percent';

  /* ─── Init ──────────────────────────────── */
  function init() {
    parseState();
    if (!menuState) return;
    renderMenu();
    setupModals();
    setupFABs();
    setupLangToggle();
    setupCatForm();
    setupItemForm();
    initPublicSheet();
  }

  function parseState() {
    const el = $('#menu-state');
    if (!el) return;
    try {
      const published = localStorage.getItem('abushukri_menu_published');
      const draft = localStorage.getItem('abushukri_menu_draft');
      if (published) menuState = JSON.parse(published);
      else if (draft) menuState = JSON.parse(draft);
      else menuState = JSON.parse(el.textContent);
    } catch (e) {
      console.error(e);
      try { menuState = JSON.parse(el.textContent); } catch(_) {}
    }
  }

  /* ═══════════════════════════════════════════
     RENDER MENU (Bilingual)
  ═══════════════════════════════════════════ */
  function renderMenu() {
    const catsWrap = $('#menu-categories');
    const secsWrap = $('#menu-sections');
    if (!catsWrap || !secsWrap) return;

    catsWrap.innerHTML = '';
    secsWrap.innerHTML = '';

    // Update context section
    const menu = menuState.menu;
    const branch = menuState.branch;
    $('#ctx-title').textContent = t(menu.name, menu.name_ar);
    $('#ctx-desc').textContent = t(menu.description, menu.description_ar);
    $('#ctx-row').innerHTML = `
      <span class="menu-context-chip"><b>${t('Location:','الموقع:')}</b> ${t(branch.name, branch.name_ar)}</span>
      <span class="menu-context-chip"><b>${t('Hours:','ساعات العمل:')}</b> ${t(branch.hours, branch.hours_ar)}</span>
      <span class="menu-context-chip"><b>${t('Phone:','هاتف:')}</b> <span dir="ltr">${branch.phone_numbers[0]}</span></span>
    `;

    const cats = menu.categories;
    if (!cats.length) {
      secsWrap.innerHTML = '<p style="color:var(--muted);font-family:Cairo,sans-serif;text-align:center;padding:3rem;">No categories yet. Click "Add Category" to start.</p>';
      return;
    }

    cats.forEach((cat, ci) => {
      const displayTitle = t(cat.title, cat.title_ar);
      const displayEyebrow = t(cat.eyebrow, cat.eyebrow_ar);

      // ─── Tab button ───
      const btn = document.createElement('button');
      btn.className = `cat-btn${ci === 0 ? ' on' : ''}`;
      btn.dataset.cat = cat.slug;
      btn.type = 'button';
      btn.innerHTML = `
        <span class="ic">${cat.icon || ''}</span>${displayTitle}
        <span class="admin-cat-actions">
          <button class="admin-act-btn reorder" data-action="cat-left" data-ci="${ci}" title="Move Left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="admin-act-btn reorder" data-action="cat-right" data-ci="${ci}" title="Move Right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="admin-act-btn edit" data-action="edit-cat" data-ci="${ci}" title="Edit Category">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          </button>
          <button class="admin-act-btn del" data-action="del-cat" data-ci="${ci}" title="Delete Category">&times;</button>
        </span>`;
      catsWrap.appendChild(btn);

      // ─── Section ───
      const sec = document.createElement('section');
      sec.className = `cat-sec${ci === 0 ? ' vis' : ''}`;
      sec.id = `sec-${cat.slug}`;

      const head = document.createElement('div');
      head.className = 'sec-head';
      head.innerHTML = `<h2>${displayEyebrow} <em>${displayTitle}</em></h2><div class="sec-line"></div>`;
      sec.appendChild(head);

      const grid = document.createElement('div');
      grid.className = 'grid';

      cat.items.forEach((item, ii) => {
        const displayName = t(item.name, item.name_ar);
        const displayDesc = t(item.description, item.description_ar);
        const coverImg = item.images?.[0] || item.image_url || '';

        const card = document.createElement('article');
        card.className = 'card';
        card.dataset.ci = ci;
        card.dataset.ii = ii;

        const priceHtml = item.discounted_price != null
          ? `<span class="card-price strike">${item.base_price} ₪</span><span class="card-price">${item.discounted_price} ₪</span>`
          : `<span class="card-price">${item.price} ₪</span>`;

        const sizeLabel = currentLang === 'ar' ? 'أحجام' : 'sizes';
        const extraLabel = currentLang === 'ar' ? 'إضافات' : 'extras';

        card.innerHTML = `
          <div class="admin-card-actions">
            <button class="admin-act-btn edit" data-action="edit-item" data-ci="${ci}" data-ii="${ii}" title="Edit Item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </button>
            <button class="admin-act-btn del" data-action="del-item" data-ci="${ci}" data-ii="${ii}" title="Delete Item">&times;</button>
          </div>
          <div class="card-img">
            ${coverImg ? `<img src="${coverImg}" alt="${displayName}" loading="lazy">` : '<div style="width:100%;height:100%;background:var(--bg3);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:2rem;">📷</div>'}
            ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
            ${item.discount_label ? `<span class="discount-pill">${item.discount_label}</span>` : ''}
          </div>
          <div class="card-body">
            <h3 class="card-title">${displayName}</h3>
            <p class="card-desc">${displayDesc}</p>
            <div class="card-foot">
              ${priceHtml}
              ${item.sizes?.length ? `<span class="card-meta-chip">${item.sizes.length} ${sizeLabel}</span>` : ''}
              ${item.addons?.length ? `<span class="card-meta-chip">${item.addons.length} ${extraLabel}</span>` : ''}
            </div>
          </div>`;
        grid.appendChild(card);
      });

      sec.appendChild(grid);
      secsWrap.appendChild(sec);
    });

    initCategoryTabs();
  }

  function initCategoryTabs() {
    const btns = $$('.cat-btn');
    const secs = $$('.cat-sec');
    const activate = (slug) => {
      btns.forEach(b => b.classList.toggle('on', b.dataset.cat === slug));
      secs.forEach(s => s.classList.toggle('vis', s.id === `sec-${slug}`));
    };
    btns.forEach(b => b.addEventListener('click', (e) => {
      if (e.target.closest('.admin-act-btn')) return;
      activate(b.dataset.cat);
    }));
  }

  /* ═══════════════════════════════════════════
     DELEGATE CLICKS
  ═══════════════════════════════════════════ */
  document.addEventListener('click', (e) => {
    const actBtn = e.target.closest('.admin-act-btn');
    if (actBtn) {
      e.stopPropagation();
      const action = actBtn.dataset.action;
      const ci = parseInt(actBtn.dataset.ci);
      const ii = actBtn.dataset.ii !== undefined ? parseInt(actBtn.dataset.ii) : null;

      if (action === 'edit-cat') openCategoryModal(ci);
      if (action === 'del-cat') openConfirmModal('category', ci);
      if (action === 'edit-item') openItemModal(ci, ii);
      if (action === 'del-item') openConfirmModal('item', ci, ii);
      if (action === 'cat-left') moveCategory(ci, -1);
      if (action === 'cat-right') moveCategory(ci, 1);
      return;
    }

    // Clicking card body opens Item Edit
    const card = e.target.closest('.card');
    if (card) {
      e.preventDefault();
      openItemModal(parseInt(card.dataset.ci), parseInt(card.dataset.ii));
    }
  });

  /* ═══════════════════════════════════════════
     CATEGORY REORDER
  ═══════════════════════════════════════════ */
  function moveCategory(ci, dir) {
    const cats = menuState.menu.categories;
    const newIdx = ci + dir;
    if (newIdx < 0 || newIdx >= cats.length) return;
    [cats[ci], cats[newIdx]] = [cats[newIdx], cats[ci]];
    renderMenu();
    showToast('Category reordered.');
  }

  /* ═══════════════════════════════════════════
     LANGUAGE TOGGLE
  ═══════════════════════════════════════════ */
  function setupLangToggle() {
    const btn = $('#lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      document.body.dataset.lang = currentLang;
      document.body.dataset.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      btn.textContent = currentLang === 'en' ? 'AR' : 'EN';
      renderMenu();
    });
  }

  /* ═══════════════════════════════════════════
     CATEGORY MODAL
  ═══════════════════════════════════════════ */
  function openCategoryModal(ci = -1) {
    editCatIndex = ci;
    catSlugManual = false;
    const modal = $('#modal-category');
    const isEdit = ci >= 0;
    $('#modal-cat-title').textContent = isEdit ? 'Edit Category' : 'Add Category';

    const cat = isEdit ? menuState.menu.categories[ci] : { title: '', title_ar: '', eyebrow: '', eyebrow_ar: '', icon: '', slug: '' };
    $('#cat-title').value = cat.title || '';
    $('#cat-title-ar').value = cat.title_ar || '';
    $('#cat-eyebrow').value = cat.eyebrow || '';
    $('#cat-eyebrow-ar').value = cat.eyebrow_ar || '';
    $('#cat-icon').value = cat.icon || '';
    $('#cat-slug').value = cat.slug || '';
    updateCatSlugHint(cat.slug ? true : false);

    openModal(modal);
  }

  function updateCatSlugHint(isManual) {
    const hint = $('#cat-slug-hint');
    if (isManual) {
      hint.textContent = 'Manually edited';
      hint.classList.add('manual');
    } else {
      hint.textContent = 'Auto from title';
      hint.classList.remove('manual');
    }
  }

  function setupCatForm() {
    // Auto-slug from English title
    $('#cat-title').addEventListener('input', () => {
      if (!catSlugManual) {
        $('#cat-slug').value = slugify($('#cat-title').value);
        updateCatSlugHint(false);
      }
    });
    // Detect manual slug edit
    $('#cat-slug').addEventListener('input', () => {
      catSlugManual = true;
      updateCatSlugHint(true);
    });

    // Apply
    $('#cat-apply').addEventListener('click', () => {
      const title = $('#cat-title').value.trim();
      if (!title) { showToast('Title is required.', 'danger'); return; }

      const data = {
        title: title,
        title_ar: $('#cat-title-ar').value.trim(),
        eyebrow: $('#cat-eyebrow').value.trim(),
        eyebrow_ar: $('#cat-eyebrow-ar').value.trim(),
        icon: $('#cat-icon').value.trim(),
        slug: $('#cat-slug').value.trim() || slugify(title),
        items: editCatIndex >= 0 ? menuState.menu.categories[editCatIndex].items : []
      };

      if (editCatIndex >= 0) {
        menuState.menu.categories[editCatIndex] = data;
      } else {
        menuState.menu.categories.push(data);
      }

      renderMenu();
      closeModal($('#modal-category'));
      showToast('Category saved.');
    });
  }

  /* ═══════════════════════════════════════════
     ITEM MODAL
  ═══════════════════════════════════════════ */
  function openItemModal(ci, ii = -1) {
    editItemCatIndex = ci;
    editItemIndex = ii;
    itemSlugManual = false;
    const modal = $('#modal-item');
    const isEdit = ii >= 0;
    $('#modal-item-title').textContent = isEdit ? 'Edit Item' : 'Add Item';

    // Populate category dropdown
    const catSelect = $('#item-category');
    catSelect.innerHTML = menuState.menu.categories.map((c, i) =>
      `<option value="${i}" ${i === ci ? 'selected' : ''}>${c.title}</option>`
    ).join('');

    const item = isEdit ? menuState.menu.categories[ci].items[ii] : {
      name: '', name_ar: '', description: '', description_ar: '',
      base_price: 0, price: 0, discounted_price: null,
      discount_type: 'percent', discount_value: 0, discount_label: '',
      badge: '', slug: '', image_url: '', images: [], sizes: [], addons: []
    };

    // Populate fields
    $('#item-name').value = item.name || '';
    $('#item-name-ar').value = item.name_ar || '';
    $('#item-desc').value = item.description || '';
    $('#item-desc-ar').value = item.description_ar || '';
    $('#item-base-price').value = item.base_price || 0;
    $('#item-badge').value = item.badge || '';
    $('#item-slug').value = item.slug || '';
    updateItemSlugHint(item.slug ? true : false);

    // Discount
    discountType = item.discount_type || 'percent';
    setDiscountTypeUI(discountType);
    $('#item-disc-value').value = item.discount_value || 0;
    updateDiscountPreview();

    // Images — load into temp array
    currentImages = [...(item.images || [])];
    if (!currentImages.length && item.image_url) currentImages.push(item.image_url);
    renderImageGallery();

    // Sizes
    const sizesList = $('#item-sizes-list');
    sizesList.innerHTML = '';
    if (item.sizes?.length) {
      item.sizes.forEach(s => addSizeRow(s.label || '', s.label_ar || '', s.delta_price || 0));
    }

    // Addons
    const addonsList = $('#item-addons-list');
    addonsList.innerHTML = '';
    if (item.addons?.length) {
      item.addons.forEach(a => addAddonRow(a.label || '', a.label_ar || '', a.price || 0));
    }

    openModal(modal);
  }

  function updateItemSlugHint(isManual) {
    const hint = $('#item-slug-hint');
    if (isManual) {
      hint.textContent = 'Manually edited';
      hint.classList.add('manual');
    } else {
      hint.textContent = 'Auto from name';
      hint.classList.remove('manual');
    }
  }

  /* ─── Discount UI ─── */
  function setDiscountTypeUI(type) {
    discountType = type;
    $$('.disc-type-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.type === type);
    });
  }

  function updateDiscountPreview() {
    const basePrice = parseFloat($('#item-base-price').value) || 0;
    const discVal = parseFloat($('#item-disc-value').value) || 0;
    const labelEl = $('#disc-preview-label');
    const priceEl = $('#disc-preview-price');

    if (!discVal || !basePrice) {
      labelEl.textContent = '';
      priceEl.textContent = '';
      return;
    }

    let finalPrice, labelText;
    if (discountType === 'percent') {
      finalPrice = +(basePrice * (1 - discVal / 100)).toFixed(2);
      labelText = `${discVal}% OFF`;
    } else {
      finalPrice = +Math.max(0, basePrice - discVal).toFixed(2);
      labelText = `${discVal} ₪ OFF`;
    }

    labelEl.textContent = labelText;
    priceEl.textContent = `${finalPrice} ₪`;
  }

  /* ─── Image Gallery ─── */
  function renderImageGallery() {
    const scroll = $('#item-images-scroll');
    scroll.innerHTML = '';

    if (!currentImages.length) {
      scroll.innerHTML = '<div class="admin-img-empty">No images yet. Upload one below.</div>';
      return;
    }

    currentImages.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = `admin-img-card${i === 0 ? ' is-cover' : ''}`;
      card.innerHTML = `
        <img src="${src}" alt="Image ${i + 1}" />
        <div class="img-reorder">
          ${i > 0 ? `<button class="img-move-btn" data-dir="left" data-idx="${i}" title="Move left">◀</button>` : ''}
          ${i < currentImages.length - 1 ? `<button class="img-move-btn" data-dir="right" data-idx="${i}" title="Move right">▶</button>` : ''}
        </div>
        <button class="img-del-btn" data-idx="${i}" title="Delete image">&times;</button>
        ${i === 0 ? '<div class="img-cover-badge">Cover</div>' : ''}
      `;
      scroll.appendChild(card);
    });

    // Reorder / delete handlers
    scroll.querySelectorAll('.img-move-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx);
        const dir = btn.dataset.dir === 'left' ? -1 : 1;
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= currentImages.length) return;
        [currentImages[idx], currentImages[newIdx]] = [currentImages[newIdx], currentImages[idx]];
        renderImageGallery();
      });
    });

    scroll.querySelectorAll('.img-del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx);
        currentImages.splice(idx, 1);
        renderImageGallery();
      });
    });
  }

  /* ─── Size Row ─── */
  function addSizeRow(label, labelAr, deltaPrice) {
    const container = $('#item-sizes-list');
    const div = document.createElement('div');
    div.className = 'admin-list-item';
    div.innerHTML = `
      <div class="admin-list-label-group">
        <input type="text" value="${label}" placeholder="Size name (EN)" data-field="label" />
        <div class="admin-list-sep"></div>
        <input type="text" value="${labelAr}" placeholder="اسم الحجم (AR)" data-field="label_ar" dir="rtl" />
      </div>
      <div class="admin-list-price-group">
        <span class="size-price-prefix">+</span>
        <input type="number" value="${deltaPrice}" step="0.1" min="0" placeholder="0" data-field="delta_price" />
        <span class="size-price-suffix">₪</span>
      </div>
      <button class="rm-btn" type="button">&times;</button>
    `;
    div.querySelector('.rm-btn').addEventListener('click', () => div.remove());
    container.appendChild(div);
    return div;
  }

  /* ─── Addon Row ─── */
  function addAddonRow(label, labelAr, price) {
    const container = $('#item-addons-list');
    const div = document.createElement('div');
    div.className = 'admin-list-item';
    div.innerHTML = `
      <div class="admin-list-label-group">
        <input type="text" value="${label}" placeholder="Extra name (EN)" data-field="label" />
        <div class="admin-list-sep"></div>
        <input type="text" value="${labelAr}" placeholder="اسم الإضافة (AR)" data-field="label_ar" dir="rtl" />
      </div>
      <div class="admin-list-price-group">
        <span class="addon-price-prefix">+</span>
        <input type="number" value="${price}" step="0.1" min="0" placeholder="0" data-field="price" />
        <span class="addon-price-suffix">₪</span>
      </div>
      <button class="rm-btn" type="button">&times;</button>
    `;
    div.querySelector('.rm-btn').addEventListener('click', () => div.remove());
    container.appendChild(div);
    return div;
  }

  /* ─── Item Form Setup ─── */
  function setupItemForm() {
    // Auto-slug from item name
    $('#item-name').addEventListener('input', () => {
      if (!itemSlugManual) {
        $('#item-slug').value = slugify($('#item-name').value);
        updateItemSlugHint(false);
      }
    });
    // Detect manual slug edit
    $('#item-slug').addEventListener('input', () => {
      itemSlugManual = true;
      updateItemSlugHint(true);
    });

    // Discount type toggle
    $$('.disc-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setDiscountTypeUI(btn.dataset.type);
        updateDiscountPreview();
      });
    });

    // Discount value change → update preview
    $('#item-disc-value').addEventListener('input', updateDiscountPreview);
    $('#item-base-price').addEventListener('input', updateDiscountPreview);

    // Image upload
    const uploadBtn = $('#item-upload-img');
    const fileInput = $('#item-file-input');
    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async () => {
      const files = Array.from(fileInput.files);
      if (!files.length) return;

      for (const file of files) {
        const dataUrl = await resizeImage(file);
        currentImages.push(dataUrl);
      }
      renderImageGallery();
      fileInput.value = ''; // Reset so same file can be re-uploaded
    });

    // Add size button
    $('#item-add-size').addEventListener('click', () => {
      const row = addSizeRow('', '', 0);
      row.querySelector('input[data-field="label"]').focus();
    });

    // Add addon button
    $('#item-add-addon').addEventListener('click', () => {
      const row = addAddonRow('', '', 0);
      row.querySelector('input[data-field="label"]').focus();
    });

    // Apply item
    $('#item-apply').addEventListener('click', () => {
      const name = $('#item-name').value.trim();
      if (!name) { showToast('Item name is required.', 'danger'); return; }

      const basePrice = parseFloat($('#item-base-price').value) || 0;
      const discVal = parseFloat($('#item-disc-value').value) || 0;

      // Calculate discount
      let discountedPrice = null;
      let discountLabel = '';
      if (discVal > 0 && basePrice > 0) {
        if (discountType === 'percent') {
          discountedPrice = +(basePrice * (1 - discVal / 100)).toFixed(2);
          discountLabel = `${discVal}% OFF`;
        } else {
          discountedPrice = +Math.max(0, basePrice - discVal).toFixed(2);
          discountLabel = `${discVal} ₪ OFF`;
        }
      }

      const coverImg = currentImages[0] || '';

      // Parse sizes
      const sizes = [];
      $$('#item-sizes-list .admin-list-item').forEach(row => {
        const label = row.querySelector('input[data-field="label"]')?.value.trim() || '';
        const labelAr = row.querySelector('input[data-field="label_ar"]')?.value.trim() || '';
        const delta = parseFloat(row.querySelector('input[data-field="delta_price"]')?.value) || 0;
        if (label) sizes.push({ label, label_ar: labelAr, delta_price: delta });
      });

      // Parse addons
      const addons = [];
      $$('#item-addons-list .admin-list-item').forEach(row => {
        const label = row.querySelector('input[data-field="label"]')?.value.trim() || '';
        const labelAr = row.querySelector('input[data-field="label_ar"]')?.value.trim() || '';
        const price = parseFloat(row.querySelector('input[data-field="price"]')?.value) || 0;
        if (label) addons.push({ label, label_ar: labelAr, price });
      });

      const newItem = {
        name: name,
        name_ar: $('#item-name-ar').value.trim(),
        description: $('#item-desc').value.trim(),
        description_ar: $('#item-desc-ar').value.trim(),
        base_price: basePrice,
        price: basePrice,
        discounted_price: discountedPrice,
        discount_type: discountType,
        discount_value: discVal,
        discount_label: discountLabel,
        badge: $('#item-badge').value.trim(),
        slug: $('#item-slug').value.trim() || slugify(name),
        image_url: coverImg,
        images: [...currentImages],
        sizes: sizes,
        addons: addons
      };

      // Target category index from dropdown (handles moving items)
      const targetCatIndex = parseInt($('#item-category').value);

      if (editItemIndex >= 0) {
        if (targetCatIndex !== editItemCatIndex) {
          menuState.menu.categories[editItemCatIndex].items.splice(editItemIndex, 1);
          menuState.menu.categories[targetCatIndex].items.push(newItem);
        } else {
          menuState.menu.categories[editItemCatIndex].items[editItemIndex] = newItem;
        }
      } else {
        menuState.menu.categories[targetCatIndex].items.push(newItem);
      }

      renderMenu();
      closeModal($('#modal-item'));
      showToast('Item saved.');
    });
  }

  /* ═══════════════════════════════════════════
     CONFIRM DELETE
  ═══════════════════════════════════════════ */
  function openConfirmModal(type, ci, ii = null) {
    pendingDelete = { type, ci, ii };
    const modal = $('#modal-confirm');
    const name = type === 'category'
      ? menuState.menu.categories[ci].title
      : menuState.menu.categories[ci].items[ii].name;
    $('#confirm-message').textContent = `Delete "${name}"? This cannot be undone.`;
    openModal(modal);
  }

  $('#confirm-ok').addEventListener('click', () => {
    if (!pendingDelete) return;
    const { type, ci, ii } = pendingDelete;
    if (type === 'category') {
      menuState.menu.categories.splice(ci, 1);
    } else {
      menuState.menu.categories[ci].items.splice(ii, 1);
    }
    pendingDelete = null;
    renderMenu();
    closeModal($('#modal-confirm'));
    showToast('Deleted successfully.', 'danger');
  });

  /* ═══════════════════════════════════════════
     MODAL UTILS
  ═══════════════════════════════════════════ */
  function openModal(m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal(m) { m.classList.remove('open'); document.body.style.overflow = ''; }

  function setupModals() {
    $$('.admin-modal').forEach(m => {
      $('.admin-modal-backdrop', m).addEventListener('click', () => closeModal(m));
      $('.admin-modal-close', m)?.addEventListener('click', () => closeModal(m));
      $$('.admin-modal-cancel', m).forEach(b => b.addEventListener('click', () => closeModal(m)));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') $$('.admin-modal.open').forEach(closeModal);
    });
  }

  /* ═══════════════════════════════════════════
     FABs
  ═══════════════════════════════════════════ */
  function setupFABs() {
    $('#btn-add-category').addEventListener('click', () => openCategoryModal());

    $('#btn-add-item').addEventListener('click', () => {
      if (menuState.menu.categories.length === 0) {
        showToast('Please add a category first.', 'danger');
        return;
      }
      openItemModal(0); // Default to first category
    });

    $('#btn-save-draft').addEventListener('click', () => {
      localStorage.setItem('abushukri_menu_draft', JSON.stringify(menuState));
      showToast('Draft saved!');
    });

    $('#btn-publish').addEventListener('click', () => {
      localStorage.setItem('abushukri_menu_published', JSON.stringify(menuState));
      localStorage.removeItem('abushukri_menu_draft');
      showToast('Menu published!');
    });

    $('#admin-discard-btn').addEventListener('click', () => {
      parseState(); // Reset to original or published
      renderMenu();
      showToast('Changes discarded.', 'danger');
    });
  }

  /* ═══════════════════════════════════════════
     TOAST
  ═══════════════════════════════════════════ */
  function showToast(msg, type = 'success') {
    const c = $('#admin-toast');
    const el = document.createElement('div');
    el.className = `admin-toast-msg admin-toast-msg--${type}`;
    el.textContent = msg;
    c.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  /* ═══════════════════════════════════════════
     PUBLIC BOTTOM SHEET (Preserved)
  ═══════════════════════════════════════════ */
  function initPublicSheet() {
    const bd = $('#backdrop');
    const sh = $('#sheet');
    if (!bd || !sh) return;

    const close = () => {
      bd.classList.remove('open');
      document.body.classList.remove('locked');
    };

    $('#closeSheet')?.addEventListener('click', close);
    bd.addEventListener('click', e => { if (e.target === bd) close(); });
  }

  /* ─── Bootstrap ──────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);
})();