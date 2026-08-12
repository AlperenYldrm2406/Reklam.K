/**
 * EMEK CİĞERCİSİ ET VE SAKATAT - ANA JAVASCRIPT MİMARİSİ
 */

/**
 * Mobil Hamburger Menü Açma / Kapama İşlevi
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mainNav.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      toggleBtn.innerHTML = isActive 
        ? '<i class="fas fa-times"></i> Kapat' 
        : '<i class="fas fa-bars"></i> Menü';
    });

    // Menü dışına tıklandığında mobilde menüyü kapat
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && !toggleBtn.contains(e.target)) {
        mainNav.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i> Menü';
      }
    });
  }
}

/**
 * Bulunulan Sayfaya Göre Aktif Navigasyon Linkini Belirleme
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * ==========================================================================
 * ÜRÜNLERİMİZ SAYFASI - ÜRÜN VERİLERİ VE FİLTRE SİSTEMİ
 * ==========================================================================
 *
 * NOT: Ürün görselleri henüz belirlenmedi. Her ürüne ait alan aşağıda
 * "placeholder" olarak oluşturulur. Görseller netleştiğinde ilgili kartın
 * içindeki placeholder yapısını <img> etiketiyle değiştirmeniz yeterlidir.
 */

const PRODUCT_DATA = [
  /* ----- DANA GRUBU (Çiğ) ----- */
  { name: 'Dana Ciğeri',        type: 'cig',    category: 'dana' },
  { name: 'Dana Kuyruk',        type: 'cig',    category: 'dana' },
  { name: 'Dana İşkembe',       type: 'cig',    category: 'dana' },
  { name: 'Kelle Eti',          type: 'cig',    category: 'dana' },
  { name: 'Dana Ayak',          type: 'cig',    category: 'dana' },
  { name: 'Doğranmış Ciğer',    type: 'cig',    category: 'dana' },
  { name: 'Dana Dil',           type: 'cig',    category: 'dana' },
  { name: 'Dana Beyin',         type: 'cig',    category: 'dana' },
  { name: 'Dana Yürek',         type: 'cig',    category: 'dana' },
  { name: 'Dana Böbrek',        type: 'cig',    category: 'dana' },
  { name: 'Dana Kavram Yağı',   type: 'cig',    category: 'dana' },
  { name: 'Dana Uykuluk',       type: 'cig',    category: 'dana' },
  { name: 'Dana Sarma Yağı',    type: 'cig',    category: 'dana' },
  { name: 'Dana Böbrek Yağı',   type: 'cig',    category: 'dana' },
  { name: 'Dana Bahar Eti',     type: 'cig',    category: 'dana' },
  { name: 'Dana Kırıntı',       type: 'cig',    category: 'dana' },
  { name: 'Dana Tulum Ayak',    type: 'cig',    category: 'dana' },

  /* ----- KUZU GRUBU (Çiğ) ----- */
  { name: 'Kuzu Ayak',          type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu Yürek',         type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu Ciğer',         type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu Uykuluk',       type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu Kelle',         type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu İşkembe',       type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu Takım Ciğer',   type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu Böbrek Yağı',   type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu Sarma Yağı',    type: 'cig',    category: 'kuzu' },
  { name: 'Kuzu Kasık Yağı',    type: 'cig',    category: 'kuzu' },

  /* ----- PİŞMİŞ ÜRÜNLER ----- */
  { name: 'Pişmiş İşkembe',     type: 'pismis', category: 'pismis' },
  { name: 'Pişmiş Kelle Eti',   type: 'pismis', category: 'pismis' },
  { name: 'Pişmiş Dana Dil',    type: 'pismis', category: 'pismis' },
  { name: 'Pişmiş Dana Ayak',   type: 'pismis', category: 'pismis' },
  { name: 'Pişmiş Dana Damak',  type: 'pismis', category: 'pismis' },
];

/**
 * Ürün vitrinini aktif filtreye göre oluşturur.
 */
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const activeTypeBtn = document.querySelector('.filter-btn[data-product-type].active');
  const activeCategoryBtn = document.querySelector('.filter-btn[data-product-category].active');
  if (!activeTypeBtn || !activeCategoryBtn) return;

  const activeType = activeTypeBtn.dataset.productType;       // 'cig' | 'pismis'
  const activeCategory = activeCategoryBtn.dataset.productCategory; // 'dana' | 'kuzu'

  const filteredProducts = PRODUCT_DATA.filter(product => {
    if (activeType === 'cig') {
      return product.type === 'cig' && product.category === activeCategory;
    }
    return product.type === 'pismis';
  });

  grid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-placeholder">
        <i class="fas ${product.type === 'pismis' ? 'fa-fire' : 'fa-drumstick-bite'}"></i>
        <span class="placeholder-text">Görsel Alanı</span>
        <span class="placeholder-note">Ürün görseli buraya eklenecek</span>
      </div>
      <h3 class="product-name">${product.name}</h3>
    </article>
  `).join('');
}

/**
 * Ürünlerimiz sayfasındaki filtre butonlarına tıklama davranışı.
 */
function initProductFilters() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const categoryBar = document.getElementById('category-bar');

  // Ana filtre: Çiğ Ürünler / Pişmiş Ürünler
  document.querySelectorAll('.filter-btn[data-product-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-product-type]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    });
  });

  // Alt filtre: Dana / Kuzu
  document.querySelectorAll('.filter-btn[data-product-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-product-category]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    });
  });

  // Ürünlerimiz sayfasında alt (Dana/Kuzu) filtresini ana tipe göre göster
  const typeBtns = document.querySelectorAll('.filter-btn[data-product-type]');
  if (categoryBar && typeBtns.length) {
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCigSelected = document.querySelector('.filter-btn[data-product-type].active').dataset.productType === 'cig';
        categoryBar.classList.toggle('visible', isCigSelected);
      });
    });
  }

  renderProducts();
}

/* Sayfa açılışında ürün filtresini başlat */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  setActiveNavLink();
  initProductFilters();
});
