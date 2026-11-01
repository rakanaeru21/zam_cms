
document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // KONFIGURASI SANITY
  // ==========================================

  const PROJECT_ID = 'tly2hu5w';
  const DATASET = 'production';
  const API_VERSION = '2025-01-01';

  const catalog = document.getElementById('menu-catalog-content');

  if (!catalog) return;

  // ==========================================
  // QUERY SANITY
  // ==========================================

  const query = `*[_type == "menuCategory" && coalesce(isActive, true) == true]
    | order(order asc) {
      _id,
      title,
      slug,
      description,
      eyebrow,

      "items": *[
        _type == "menuItem" &&
        category._ref == ^._id &&
        coalesce(isAvailable, true) == true
      ]
      | order(isFeatured desc, order asc) {
        _id,
        name,
        description,
        price,
        isFeatured,
        image {
          asset->{url}
        }
      }
    }`;

  const endpoint =
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  const escapeHTML = (value = '') => {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  };

  const formatPrice = price => {
    return `Rp ${Number(price || 0).toLocaleString('id-ID')}`;
  };

  // ==========================================
  // TEMPLATE KARTU MENU
  // ==========================================

  function createMenuCard(item, categoryTitle) {
    const image = item.image?.asset?.url || '';

    return `
      <article
        class="menu-item"
        tabindex="0"
        role="button"
        data-menu-id="${escapeHTML(item._id)}"
        aria-label="Lihat detail ${escapeHTML(item.name)}"
      >

        <div class="menu-item-image">
          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(item.name)}"
            loading="lazy"
          >
        </div>

        <div class="menu-item-meta">

          <span class="menu-item-category">
            ${item.isFeatured
              ? 'Signature'
              : escapeHTML(categoryTitle)}
          </span>

          <span class="menu-item-price">
            ${formatPrice(item.price)}
          </span>

        </div>

        <h3 class="menu-item-name">
          ${escapeHTML(item.name)}
        </h3>

        <p class="menu-item-desc">
          ${escapeHTML(item.description || '')}
        </p>

      </article>
    `;
  }

  // ==========================================
  // RENDER KATEGORI DAN MENU UNGGULAN
  // ==========================================

  function renderCategories(categories) {
    if (!categories.length) {
      catalog.innerHTML = `
        <p class="section-desc">
          Belum ada kategori menu yang tersedia.
        </p>
      `;
      return;
    }

    // Navigasi kategori
    const navigation = `
      <nav class="menu-categories" aria-label="Kategori menu">
        ${categories.map(category => `
          <a href="#${escapeHTML(category.slug?.current || '')}">
            ${escapeHTML(category.title)}
          </a>
        `).join('')}
      </nav>
    `;

    // Mengumpulkan menu unggulan dari semua kategori
    const featuredItems = categories.flatMap(category =>
      (category.items || [])
        .filter(item => item.isFeatured === true)
        .map(item => ({
          ...item,
          categoryTitle: category.title
        }))
    );

    // Section Menu Unggulan
    const featuredSection = featuredItems.length > 0
      ? `
        <section class="menu-featured-section">

          <div class="menu-category-heading">
            <span class="label">Pilihan Spesial</span>

            <h2 class="section-heading">
              Menu Unggulan
            </h2>

            <p class="section-desc">
              Pilihan spesial yang menjadi favorit di Zamzam.
            </p>
          </div>

          <div class="menu-grid menu-grid-featured">
            ${featuredItems.map(item =>
              createMenuCard(item, item.categoryTitle)
            ).join('')}
          </div>

        </section>
      `
      : '';

    // Section setiap kategori
    const sections = categories.map(category => {
      const slug = category.slug?.current;

      if (!slug) return '';

      const items = category.items || [];

      return `
        <section
          class="menu-category"
          id="${escapeHTML(slug)}"
        >

          <div class="menu-category-heading">

            ${category.eyebrow
              ? `<span class="label">${escapeHTML(category.eyebrow)}</span>`
              : ''
            }

            <h2 class="section-heading">
              ${escapeHTML(category.title)}
            </h2>

            ${category.description
              ? `<p class="section-desc">${escapeHTML(category.description)}</p>`
              : ''
            }

          </div>

          <div class="menu-grid">

            ${items.length > 0
              ? items.map(item =>
                  createMenuCard(item, category.title)
                ).join('')
              : `
                <p class="section-desc">
                  Belum ada menu dalam kategori ini.
                </p>
              `
            }

          </div>

        </section>
      `;
    }).join('');

    // Gabungkan seluruh tampilan
    catalog.innerHTML =
      navigation + featuredSection + sections;

    // Navigasi kategori
    catalog.querySelectorAll('.menu-categories a').forEach(link => {
      link.addEventListener('click', event => {
        const targetId = decodeURIComponent(
          link.getAttribute('href').slice(1)
        );

        const target = document.getElementById(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        history.replaceState(null, '', `#${targetId}`);
      });
    });
  }

  // ==========================================
  // MEMUAT DATA DARI SANITY
  // ==========================================

  async function loadMenu() {
    try {
      catalog.innerHTML = `
        <p class="section-desc">
          Memuat daftar menu...
        </p>
      `;

      const response = await fetch(endpoint);

      if (!response.ok) {
        const errorDetail = await response.text();

        throw new Error(
          `Sanity API error: ${response.status} - ${errorDetail}`
        );
      }

      const result = await response.json();

      console.log(
        'Data kategori dan menu dari Sanity:',
        result.result
      );

      renderCategories(result.result || []);

    } catch (error) {
      console.error('Gagal memuat menu:', error);

      catalog.innerHTML = `
        <p class="section-desc">
          Menu belum dapat dimuat. Silakan coba beberapa saat lagi.
        </p>
      `;
    }
  }

  // ==========================================
  // DETAIL MENU
  // ==========================================

  function openMenuDetail(item) {
    const modal = document.getElementById('menu-detail-modal');

    if (!modal) return;

    const image = item.querySelector('img');
    const title = item.querySelector('.menu-item-name');
    const description = item.querySelector('.menu-item-desc');
    const price = item.querySelector('.menu-item-price');
    const category = item.querySelector('.menu-item-category');

    const detailImage = document.getElementById('menu-detail-image');
    const detailTitle = document.getElementById('menu-detail-title');
    const detailDescription = document.getElementById('menu-detail-description');
    const detailPrice = document.getElementById('menu-detail-price');
    const detailCategory = document.getElementById('menu-detail-category');

    if (detailImage) {
      detailImage.src = image?.src || '';
      detailImage.alt = image?.alt || '';
    }

    if (detailTitle) {
      detailTitle.textContent =
        title?.textContent.trim() || '';
    }

    if (detailDescription) {
      detailDescription.textContent =
        description?.textContent.trim() || '';
    }

    if (detailPrice) {
      detailPrice.textContent =
        price?.textContent.trim() || '';
    }

    if (detailCategory) {
      detailCategory.textContent =
        category?.textContent.trim() || '';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeMenuDetail() {
    const modal = document.getElementById('menu-detail-modal');

    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================

  // Klik kartu menu
  catalog.addEventListener('click', event => {
    const item = event.target.closest('[data-menu-id]');

    if (!item) return;

    openMenuDetail(item);
  });

  // Keyboard Enter dan Space
  catalog.addEventListener('keydown', event => {
    const item = event.target.closest('[data-menu-id]');

    if (!item || !['Enter', ' '].includes(event.key)) return;

    event.preventDefault();

    openMenuDetail(item);
  });

  // Tombol tutup modal
  document.querySelectorAll('.js-close-menu-detail').forEach(button => {
    button.addEventListener('click', closeMenuDetail);
  });

  // Tombol Escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenuDetail();
    }
  });

  // ==========================================
  // JALANKAN
  // ==========================================

  loadMenu();
});
