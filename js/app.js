/**
 * ═══════════════════════════════════════════════════════════════════
 * APLICAÇÃO PRINCIPAL - E-COMMERCE DIA DAS MÃES
 * ═══════════════════════════════════════════════════════════════════
 */

class App {
  constructor() {
    this.currentCategory = 'all';
    this.currentSort = CONFIG.products.defaultSort;
    this.filteredProducts = [...PRODUCTS];
    this.init();
  }

  /**
   * Inicializa a aplicação
   */
  init() {
    // Aguarda DOM carregar
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  /**
   * Executado quando DOM está pronto
   */
  onDOMReady() {
    this.renderCategories();
    this.renderProducts();
    this.renderTestimonials();
    this.renderFAQ();
    this.setupEventListeners();
    this.initAnimations();
    this.updateCountdown();
    
    // Validar configuração
    const validation = CONFIG.validate();
    if (!validation.isValid) {
      console.warn('Configuração incompleta:', validation.errors);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // RENDERIZAÇÃO DE PRODUTOS
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Renderiza grade de produtos
   */
  renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    // Filtra e ordena
    this.filteredProducts = this.filterAndSortProducts();

    if (this.filteredProducts.length === 0) {
      container.innerHTML = `
        <div class="no-products">
          <p>Nenhum produto encontrado nesta categoria.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.filteredProducts.map(product => `
      <article class="product-card" data-product-id="${product.id}">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        ${product.oldPrice ? `<span class="product-discount">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>` : ''}
        
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="quick-add" onclick="cart.addItem('${product.id}')" aria-label="Adicionar ao carrinho">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Adicionar</span>
          </button>
        </div>

        <div class="product-info">
          <h3>${product.name}</h3>
          
          <div class="product-rating">
            ${this.renderStars(product.rating)}
            <span>(${product.reviewCount})</span>
          </div>

          <div class="product-price">
            ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
            <span class="current-price">R$ ${product.price.toFixed(2)}</span>
          </div>

          ${CONFIG.ui.showStockCounter && product.stockCount < CONFIG.ui.lowStockThreshold ? `
            <p class="stock-warning">Apenas ${product.stockCount} unidades!</p>
          ` : ''}

          <button class="btn-view-product" onclick="app.viewProduct('${product.id}')">
            Ver Detalhes
          </button>
        </div>
      </article>
    `).join('');

    // Anima entrada dos cards
    if (CONFIG.ui.enableAnimations) {
      this.animateProductCards();
    }
  }

  /**
   * Renderiza estrelas de avaliação
   */
  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
    
    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars += '<svg class="star filled" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
    
    // Meia estrela
    if (hasHalfStar) {
      stars += '<svg class="star half" width="16" height="16" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
    
    // Estrelas vazias
    for (let i = 0; i < emptyStars; i++) {
      stars += '<svg class="star empty" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }

    return stars;
  }

  /**
   * Filtra e ordena produtos
   */
  filterAndSortProducts() {
    let products = [...PRODUCTS];

    // Filtrar por categoria
    if (this.currentCategory !== 'all') {
      products = products.filter(p => p.category === this.currentCategory);
    }

    // Ordenar
    switch (this.currentSort) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return products;
  }

  /**
   * Visualiza detalhes do produto
   */
  viewProduct(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Analytics
    cart.trackEvent('view_item', {
      product_id: productId,
      product_name: product.name,
      price: product.price
    });

    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('.modal-content');

    modalContent.innerHTML = `
      <button class="modal-close" onclick="app.closeProductModal()">&times;</button>
      
      <div class="product-modal-grid">
        <div class="product-modal-image">
          <img src="${product.image}" alt="${product.name}">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>

        <div class="product-modal-info">
          <h2>${product.name}</h2>
          
          <div class="product-rating">
            ${this.renderStars(product.rating)}
            <span>(${product.reviewCount} avaliações)</span>
          </div>

          <div class="product-price large">
            ${product.oldPrice ? `<span class="old-price">De R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
            <span class="current-price">Por R$ ${product.price.toFixed(2)}</span>
          </div>

          <p class="product-description">${product.description}</p>

          ${product.highlights && product.highlights.length > 0 ? `
            <div class="product-highlights">
              <h4>Destaques:</h4>
              <ul>
                ${product.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${CONFIG.ui.showStockCounter ? `
            <div class="stock-info ${product.stockCount < CONFIG.ui.lowStockThreshold ? 'low' : ''}">
              ${product.inStock ? 
                `<span>✓ Em estoque (${product.stockCount} disponíveis)</span>` :
                `<span class="out-of-stock">Esgotado</span>`
              }
            </div>
          ` : ''}

          <div class="product-actions">
            <div class="quantity-selector">
              <button onclick="app.decreaseQuantity()">-</button>
              <input type="number" id="modalQuantity" value="1" min="1" max="${product.stockCount || 99}">
              <button onclick="app.increaseQuantity()">+</button>
            </div>
            
            <button class="btn-add-to-cart" onclick="app.addToCartFromModal('${product.id}')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  increaseQuantity() {
    const input = document.getElementById('modalQuantity');
    input.value = Math.min(parseInt(input.value) + 1, parseInt(input.max));
  }

  decreaseQuantity() {
    const input = document.getElementById('modalQuantity');
    input.value = Math.max(parseInt(input.value) - 1, 1);
  }

  addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    cart.addItem(productId, quantity);
  }

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORIAS
  // ═══════════════════════════════════════════════════════════════════

  renderCategories() {
    const container = document.getElementById('categoriesNav');
    if (!container) return;

    container.innerHTML = CONFIG.products.categories.map(cat => `
      <button 
        class="category-btn ${cat.id === this.currentCategory ? 'active' : ''}"
        onclick="app.filterByCategory('${cat.id}')"
        data-category="${cat.id}"
      >
        <span class="category-icon">${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `).join('');
  }

  filterByCategory(categoryId) {
    this.currentCategory = categoryId;
    this.renderCategories();
    this.renderProducts();

    // Scroll suave até produtos
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }

  // ═══════════════════════════════════════════════════════════════════
  // DEPOIMENTOS
  // ═══════════════════════════════════════════════════════════════════

  renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;

    container.innerHTML = TESTIMONIALS.map(testimonial => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
          <div>
            <h4>${testimonial.name}</h4>
            <div class="product-rating">
              ${this.renderStars(testimonial.rating)}
            </div>
          </div>
        </div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <span class="testimonial-date">${new Date(testimonial.date).toLocaleDateString('pt-BR')}</span>
      </div>
    `).join('');
  }

  // ═══════════════════════════════════════════════════════════════════
  // FAQ
  // ═══════════════════════════════════════════════════════════════════

  renderFAQ() {
    const container = document.getElementById('faqList');
    if (!container) return;

    container.innerHTML = FAQ.map((item, index) => `
      <div class="faq-item">
        <button class="faq-question" onclick="app.toggleFAQ(${index})">
          <span>${item.question}</span>
          <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="faq-answer">
          <p>${item.answer}</p>
        </div>
      </div>
    `).join('');
  }

  toggleFAQ(index) {
    const items = document.querySelectorAll('.faq-item');
    const item = items[index];
    const isOpen = item.classList.contains('open');

    // Fecha todos
    items.forEach(i => i.classList.remove('open'));

    // Abre o clicado se estava fechado
    if (!isOpen) {
      item.classList.add('open');
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // ANIMAÇÕES
  // ═══════════════════════════════════════════════════════════════════

  initAnimations() {
    if (!CONFIG.ui.enableAnimations) return;

    // Intersection Observer para animações on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 50}ms`;
      card.classList.add('fade-in');
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // COUNTDOWN
  // ═══════════════════════════════════════════════════════════════════

  updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    // Data do Dia das Mães 2024 (segunda domingo de maio)
    const mothersDayDate = new Date('2024-05-12T23:59:59');

    const updateTimer = () => {
      const now = new Date();
      const diff = mothersDayDate - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<span class="countdown-ended">🎉 Feliz Dia das Mães! 🎉</span>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownEl.innerHTML = `
        <div class="countdown-item">
          <span class="countdown-value">${days}</span>
          <span class="countdown-label">dias</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${hours.toString().padStart(2, '0')}</span>
          <span class="countdown-label">horas</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${minutes.toString().padStart(2, '0')}</span>
          <span class="countdown-label">min</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${seconds.toString().padStart(2, '0')}</span>
          <span class="countdown-label">seg</span>
        </div>
      `;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // ═══════════════════════════════════════════════════════════════════
  // EVENT LISTENERS
  // ═══════════════════════════════════════════════════════════════════

  setupEventListeners() {
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
      const modal = document.getElementById('productModal');
      if (e.target === modal) {
        this.closeProductModal();
      }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeProductModal();
        closeCart();
      }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn?.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
}

// Inicializar app
const app = new App();
