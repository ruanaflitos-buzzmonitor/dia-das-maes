/**
 * ═══════════════════════════════════════════════════════════════════
 * SISTEMA DE CARRINHO DE COMPRAS
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Gerencia todas as operações do carrinho:
 * - Adicionar/remover produtos
 * - Atualizar quantidades
 * - Calcular totais e descontos
 * - Persistência em localStorage
 * - Integração com checkout
 */

class ShoppingCart {
  constructor() {
    this.items = [];
    this.couponCode = null;
    this.couponDiscount = 0;
    this.loadFromStorage();
    this.setupEventListeners();
  }

  // ═══════════════════════════════════════════════════════════════════
  // GERENCIAMENTO DE ITENS
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Adiciona produto ao carrinho
   */
  addItem(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
      this.showToast('Produto não encontrado', 'error');
      return false;
    }

    if (!product.inStock) {
      this.showToast('Produto fora de estoque', 'error');
      return false;
    }

    const existingItem = this.items.find(item => item.productId === productId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.stockCount && newQuantity > product.stockCount) {
        this.showToast(`Apenas ${product.stockCount} unidades disponíveis`, 'warning');
        return false;
      }

      existingItem.quantity = newQuantity;
    } else {
      this.items.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.saveToStorage();
    this.updateUI();
    this.showToast(`${product.name} adicionado ao carrinho!`, 'success');
    
    // Analytics
    this.trackEvent('add_to_cart', {
      product_id: productId,
      product_name: product.name,
      price: product.price,
      quantity
    });

    return true;
  }

  /**
   * Remove produto do carrinho
   */
  removeItem(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    this.items = this.items.filter(item => item.productId !== productId);
    
    this.saveToStorage();
    this.updateUI();
    this.showToast(`${product?.name || 'Produto'} removido do carrinho`, 'info');
    
    // Analytics
    this.trackEvent('remove_from_cart', {
      product_id: productId
    });
  }

  /**
   * Atualiza quantidade de um produto
   */
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (!item || quantity < 1) {
      return this.removeItem(productId);
    }

    if (product.stockCount && quantity > product.stockCount) {
      this.showToast(`Apenas ${product.stockCount} unidades disponíveis`, 'warning');
      return false;
    }

    item.quantity = quantity;
    this.saveToStorage();
    this.updateUI();
    return true;
  }

  /**
   * Limpa todo o carrinho
   */
  clear() {
    this.items = [];
    this.couponCode = null;
    this.couponDiscount = 0;
    this.saveToStorage();
    this.updateUI();
  }

  // ═══════════════════════════════════════════════════════════════════
  // CÁLCULOS
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Calcula subtotal (sem descontos)
   */
  getSubtotal() {
    return this.items.reduce((total, item) => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  /**
   * Calcula desconto por volume
   */
  getVolumeDiscount() {
    if (!CONFIG.cart.volumeDiscounts) return 0;

    const totalItems = this.getTotalItems();
    const subtotal = this.getSubtotal();

    // Encontra o maior desconto aplicável
    const applicableDiscount = CONFIG.cart.volumeDiscounts
      .filter(d => totalItems >= d.minItems)
      .sort((a, b) => b.discount - a.discount)[0];

    return applicableDiscount ? (subtotal * applicableDiscount.discount / 100) : 0;
  }

  /**
   * Calcula desconto de cupom
   */
  getCouponDiscount() {
    if (!this.couponCode || !CONFIG.cart.allowCoupons) return 0;

    const discountPercent = CONFIG.cart.coupons[this.couponCode];
    if (!discountPercent) return 0;

    const subtotal = this.getSubtotal();
    return subtotal * discountPercent / 100;
  }

  /**
   * Calcula frete
   */
  getShipping() {
    const subtotal = this.getSubtotal();
    
    if (subtotal >= CONFIG.cart.freeShippingThreshold) {
      return 0;
    }

    // Se cupom for "FRETEGRATIS", frete é zero
    if (this.couponCode === 'FRETEGRATIS') {
      return 0;
    }

    return CONFIG.cart.defaultShippingCost;
  }

  /**
   * Calcula total final
   */
  getTotal() {
    const subtotal = this.getSubtotal();
    const volumeDiscount = this.getVolumeDiscount();
    const couponDiscount = this.getCouponDiscount();
    const shipping = this.getShipping();

    return subtotal - volumeDiscount - couponDiscount + shipping;
  }

  /**
   * Retorna quantidade total de itens
   */
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Aplica cupom de desconto
   */
  applyCoupon(code) {
    if (!CONFIG.cart.allowCoupons) {
      this.showToast('Cupons não estão habilitados', 'error');
      return false;
    }

    const upperCode = code.toUpperCase();
    
    if (!CONFIG.cart.coupons[upperCode]) {
      this.showToast('Cupom inválido', 'error');
      return false;
    }

    this.couponCode = upperCode;
    this.saveToStorage();
    this.updateUI();
    this.showToast(`Cupom ${upperCode} aplicado!`, 'success');
    return true;
  }

  /**
   * Remove cupom
   */
  removeCoupon() {
    this.couponCode = null;
    this.saveToStorage();
    this.updateUI();
    this.showToast('Cupom removido', 'info');
  }

  // ═══════════════════════════════════════════════════════════════════
  // PERSISTÊNCIA
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Salva carrinho no localStorage
   */
  saveToStorage() {
    const data = {
      items: this.items,
      couponCode: this.couponCode,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cart', JSON.stringify(data));
  }

  /**
   * Carrega carrinho do localStorage
   */
  loadFromStorage() {
    try {
      const data = JSON.parse(localStorage.getItem('cart'));
      
      if (!data) return;

      // Verifica se carrinho expirou
      if (CONFIG.cart.expirationMinutes > 0) {
        const ageMinutes = (new Date() - new Date(data.timestamp)) / 1000 / 60;
        if (ageMinutes > CONFIG.cart.expirationMinutes) {
          localStorage.removeItem('cart');
          return;
        }
      }

      this.items = data.items || [];
      this.couponCode = data.couponCode || null;
      this.updateUI();
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // CHECKOUT
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Inicia processo de checkout
   */
  async checkout() {
    if (this.items.length === 0) {
      this.showToast('Carrinho vazio', 'warning');
      return;
    }

    // Analytics
    this.trackEvent('begin_checkout', {
      value: this.getTotal(),
      items: this.items.length
    });

    const gateway = CONFIG.payment.paymentGateway;

    if (gateway === 'whatsapp') {
      this.checkoutWhatsApp();
    } else if (gateway === 'mock') {
      this.checkoutMock();
    } else {
      this.checkoutAPI();
    }
  }

  /**
   * Checkout via WhatsApp
   */
  checkoutWhatsApp() {
    const { phoneNumber, message } = CONFIG.payment.whatsapp;
    
    // Monta mensagem com detalhes do pedido
    let orderMessage = message + '\n\n*ITENS DO PEDIDO:*\n';
    
    this.items.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      orderMessage += `\n• ${item.quantity}x ${product.name} - R$ ${(product.price * item.quantity).toFixed(2)}`;
    });

    orderMessage += `\n\n*RESUMO:*`;
    orderMessage += `\nSubtotal: R$ ${this.getSubtotal().toFixed(2)}`;
    
    const volumeDiscount = this.getVolumeDiscount();
    if (volumeDiscount > 0) {
      orderMessage += `\nDesconto: -R$ ${volumeDiscount.toFixed(2)}`;
    }

    if (this.couponCode) {
      const couponDiscount = this.getCouponDiscount();
      orderMessage += `\nCupom ${this.couponCode}: -R$ ${couponDiscount.toFixed(2)}`;
    }

    const shipping = this.getShipping();
    orderMessage += `\nFrete: ${shipping === 0 ? 'GRÁTIS' : 'R$ ' + shipping.toFixed(2)}`;
    orderMessage += `\n\n*TOTAL: R$ ${this.getTotal().toFixed(2)}*`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappURL, '_blank');
  }

  /**
   * Checkout via API
   */
  async checkoutAPI() {
    try {
      const orderData = {
        items: this.items.map(item => {
          const product = PRODUCTS.find(p => p.id === item.productId);
          return {
            productId: item.productId,
            productName: product.name,
            quantity: item.quantity,
            price: product.price
          };
        }),
        subtotal: this.getSubtotal(),
        discount: this.getVolumeDiscount() + this.getCouponDiscount(),
        shipping: this.getShipping(),
        total: this.getTotal(),
        couponCode: this.couponCode
      };

      const response = await fetch(CONFIG.api.endpoints.checkout, {
        method: 'POST',
        headers: CONFIG.api.headers,
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        // Redireciona para página de pagamento
        window.location.href = result.paymentUrl;
      } else {
        throw new Error(result.message || 'Erro no checkout');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      this.showToast('Erro ao processar pedido. Tente novamente.', 'error');
    }
  }

  /**
   * Checkout mock (para demonstração)
   */
  checkoutMock() {
    alert('MODO DEMONSTRAÇÃO\n\nEm produção, aqui seria redirecionado para o gateway de pagamento.\n\nTotal: R$ ' + this.getTotal().toFixed(2));
  }

  // ═══════════════════════════════════════════════════════════════════
  // UI E EVENTOS
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Atualiza interface do carrinho
   */
  updateUI() {
    this.updateCartBadge();
    this.updateCartDrawer();
    this.updateCheckoutButton();
  }

  /**
   * Atualiza badge do carrinho
   */
  updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    const count = this.getTotalItems();
    
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  /**
   * Atualiza drawer do carrinho
   */
  updateCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    if (!drawer) return;

    const itemsContainer = drawer.querySelector('.cart-items');
    const summaryContainer = drawer.querySelector('.cart-summary');

    if (this.items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Seu carrinho está vazio</p>
          <button onclick="closeCart()" class="btn-primary">Continuar Comprando</button>
        </div>
      `;
      summaryContainer.style.display = 'none';
      return;
    }

    // Renderiza itens
    itemsContainer.innerHTML = this.items.map(item => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      return `
        <div class="cart-item" data-product-id="${item.productId}">
          <img src="${product.image}" alt="${product.name}">
          <div class="cart-item-details">
            <h4>${product.name}</h4>
            <p class="cart-item-price">R$ ${product.price.toFixed(2)}</p>
            <div class="quantity-controls">
              <button onclick="cart.updateQuantity('${item.productId}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
              <span>${item.quantity}</span>
              <button onclick="cart.updateQuantity('${item.productId}', ${item.quantity + 1})">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="cart.removeItem('${item.productId}')" aria-label="Remover">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;
    }).join('');

    // Renderiza resumo
    const subtotal = this.getSubtotal();
    const volumeDiscount = this.getVolumeDiscount();
    const couponDiscount = this.getCouponDiscount();
    const shipping = this.getShipping();
    const total = this.getTotal();

    summaryContainer.style.display = 'block';
    summaryContainer.innerHTML = `
      <div class="summary-row">
        <span>Subtotal</span>
        <span>R$ ${subtotal.toFixed(2)}</span>
      </div>
      ${volumeDiscount > 0 ? `
        <div class="summary-row discount">
          <span>Desconto por volume</span>
          <span>-R$ ${volumeDiscount.toFixed(2)}</span>
        </div>
      ` : ''}
      ${this.couponCode ? `
        <div class="summary-row discount">
          <span>Cupom ${this.couponCode}</span>
          <span>-R$ ${couponDiscount.toFixed(2)}</span>
        </div>
      ` : ''}
      <div class="summary-row">
        <span>Frete</span>
        <span>${shipping === 0 ? 'GRÁTIS' : 'R$ ' + shipping.toFixed(2)}</span>
      </div>
      ${shipping === 0 && subtotal < CONFIG.cart.freeShippingThreshold ? `
        <div class="free-shipping-bar">
          <div class="progress" style="width: ${(subtotal / CONFIG.cart.freeShippingThreshold) * 100}%"></div>
        </div>
        <p class="free-shipping-text">Faltam R$ ${(CONFIG.cart.freeShippingThreshold - subtotal).toFixed(2)} para frete grátis!</p>
      ` : ''}
      <div class="summary-row total">
        <span>Total</span>
        <span>R$ ${total.toFixed(2)}</span>
      </div>
      ${CONFIG.cart.allowCoupons ? `
        <div class="coupon-section">
          <input type="text" id="couponInput" placeholder="Código do cupom" ${this.couponCode ? 'disabled' : ''}>
          <button onclick="applyCouponFromInput()" ${this.couponCode ? 'disabled' : ''}>
            ${this.couponCode ? '✓ Aplicado' : 'Aplicar'}
          </button>
        </div>
      ` : ''}
      <button onclick="cart.checkout()" class="btn-checkout">
        Finalizar Compra
      </button>
    `;
  }

  /**
   * Atualiza botão de checkout
   */
  updateCheckoutButton() {
    const btn = document.querySelector('.btn-checkout');
    if (btn) {
      btn.disabled = this.items.length === 0;
    }
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Auto-save ao fechar aba
    window.addEventListener('beforeunload', () => {
      this.saveToStorage();
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // UTILS
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Exibe toast notification
   */
  showToast(message, type = 'info') {
    // Remove toast anterior se existir
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animação de entrada
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove após duração configurada
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, CONFIG.ui.toastDuration);
  }

  /**
   * Rastreia eventos (analytics)
   */
  trackEvent(eventName, params = {}) {
    // Google Analytics
    if (CONFIG.analytics.googleAnalytics.enabled && window.gtag) {
      gtag('event', eventName, params);
    }

    // Meta Pixel
    if (CONFIG.analytics.metaPixel.enabled && window.fbq) {
      fbq('track', eventName, params);
    }

    // Console log para debug
    console.log('[Analytics]', eventName, params);
  }
}

// Inicializar carrinho global
const cart = new ShoppingCart();

// Funções globais para uso no HTML
function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

function applyCouponFromInput() {
  const input = document.getElementById('couponInput');
  const code = input.value.trim();
  if (code) {
    cart.applyCoupon(code);
  }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShoppingCart;
}
