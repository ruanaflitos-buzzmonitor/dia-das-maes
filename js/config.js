/**
 * ═══════════════════════════════════════════════════════════════════
 * CONFIGURAÇÃO CENTRAL DO SISTEMA - E-COMMERCE DIA DAS MÃES
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Este arquivo centraliza TODAS as configurações do sistema.
 * Modificações aqui afetam todo o comportamento da aplicação.
 * 
 * ÍNDICE RÁPIDO:
 * 1. Configuração de Recebimento (linha 25)
 * 2. Configuração de API (linha 50)
 * 3. Configuração de Produtos (linha 75)
 * 4. Configuração de Carrinho (linha 95)
 * 5. Configuração de UI/UX (linha 115)
 * 6. Configuração de Analytics (linha 135)
 */

const CONFIG = {
  
  // ═══════════════════════════════════════════════════════════════════
  // 1. CONFIGURAÇÃO DE RECEBIMENTO
  // ═══════════════════════════════════════════════════════════════════
  /**
   * COMO ALTERAR A CONTA DE RECEBIMENTO:
   * ------------------------------------
   * Substitua os valores abaixo pelos dados da sua conta de pagamento.
   * 
   * OPÇÕES DE INTEGRAÇÃO:
   * - Mercado Pago: Configure 'paymentGateway' como 'mercadopago' e adicione seu access_token
   * - Stripe: Configure 'paymentGateway' como 'stripe' e adicione sua publishable_key
   * - PagSeguro: Configure 'paymentGateway' como 'pagseguro' e adicione seu token
   * - Checkout Direto via WhatsApp: Configure 'paymentGateway' como 'whatsapp'
   */
  payment: {
    // Gateway de pagamento: 'mercadopago' | 'stripe' | 'pagseguro' | 'whatsapp' | 'mock'
    paymentGateway: 'whatsapp',
    
    // Configurações específicas do gateway
    mercadopago: {
      publicKey: 'SEU_PUBLIC_KEY_AQUI',
      accessToken: 'SEU_ACCESS_TOKEN_AQUI'
    },
    
    stripe: {
      publishableKey: 'SEU_PUBLISHABLE_KEY_AQUI'
    },
    
    pagseguro: {
      email: 'seu-email@exemplo.com',
      token: 'SEU_TOKEN_AQUI'
    },
    
    whatsapp: {
      phoneNumber: '5571981664170', // Formato: código do país + DDD + número
      message: 'Olá! Gostaria de finalizar minha compra para o Dia das Mães 💐'
    },
    
    // Dados da conta para recebimento
    businessInfo: {
      name: 'Lírio do Vale LTDA',
      email: 'liriodovale@gmail.com',
      phone: '(71) 8166-4170',
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. CONFIGURAÇÃO DE API E ENDPOINTS
  // ═══════════════════════════════════════════════════════════════════
  /**
   * COMO INTEGRAR COM BACKEND REAL:
   * --------------------------------
   * 1. Mude 'useMockAPI' para false
   * 2. Configure os endpoints da sua API
   * 3. Implemente autenticação se necessário
   */
  api: {
    useMockAPI: true, // true = usa dados locais | false = usa API real
    
    // Endpoints da API (quando useMockAPI = false)
    endpoints: {
      products: 'https://sua-api.com/api/products',
      orders: 'https://sua-api.com/api/orders',
      checkout: 'https://sua-api.com/api/checkout',
      inventory: 'https://sua-api.com/api/inventory'
    },
    
    // Headers personalizados (autenticação, etc)
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer SEU_TOKEN_AQUI'
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. CONFIGURAÇÃO DE PRODUTOS
  // ═══════════════════════════════════════════════════════════════════
  /**
   * COMO ADICIONAR NOVOS PRODUTOS:
   * -------------------------------
   * 1. Abra o arquivo 'js/products-data.js'
   * 2. Adicione um novo objeto no array PRODUCTS seguindo o modelo
   * 3. A estrutura é:
   *    {
   *      id: 'produto-unico-id',
   *      name: 'Nome do Produto',
   *      price: 99.90,
   *      oldPrice: 149.90, // opcional
   *      image: 'caminho/para/imagem.jpg',
   *      category: 'categoria',
   *      description: 'Descrição completa',
   *      highlights: ['Destaque 1', 'Destaque 2'],
   *      inStock: true,
   *      stockCount: 50
   *    }
   * 
   * COMO ALTERAR PREÇOS:
   * --------------------
   * 1. Vá em 'js/products-data.js'
   * 2. Localize o produto pelo ID
   * 3. Altere o valor de 'price' e opcionalmente 'oldPrice'
   */
  products: {
    // Categorias disponíveis
    categories: [
      { id: 'all', name: 'Todos os Produtos', icon: '🎁' },
      { id: 'jewelry', name: 'Joias', icon: '💎' },
      { id: 'cosmetics', name: 'Cosméticos', icon: '💄' },
      { id: 'flowers', name: 'Flores', icon: '🌹' },
      { id: 'gifts', name: 'Presentes', icon: '🎀' }
    ],
    
    // Ordenação padrão: 'featured' | 'price-asc' | 'price-desc' | 'name'
    defaultSort: 'featured',
    
    // Produtos por página
    itemsPerPage: 12
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. CONFIGURAÇÃO DE CARRINHO
  // ═══════════════════════════════════════════════════════════════════
  /**
   * COMO MODIFICAR COMPORTAMENTO DO CARRINHO:
   * -----------------------------------------
   * Ajuste as configurações abaixo conforme necessário
   */
  cart: {
    // Tempo de expiração do carrinho em minutos (0 = nunca expira)
    expirationMinutes: 60,
    
    // Frete grátis acima de
    freeShippingThreshold: 200.00,
    
    // Valor do frete padrão
    defaultShippingCost: 15.00,
    
    // Desconto progressivo (%)
    volumeDiscounts: [
      { minItems: 3, discount: 5 },   // 5% desconto em 3+ itens
      { minItems: 5, discount: 10 },  // 10% desconto em 5+ itens
      { minItems: 10, discount: 15 }  // 15% desconto em 10+ itens
    ],
    
    // Permitir cupons de desconto
    allowCoupons: true,
    
    // Cupons válidos (código: desconto em %)
    coupons: {
      'MAE2024': 15,
      'PRIMEIRACOMPRA': 10,
      'FRETEGRATIS': 100 // 100% desconto no frete
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. CONFIGURAÇÃO DE UI/UX
  // ═══════════════════════════════════════════════════════════════════
  ui: {
    // Mostrar badge de "Novo" em produtos novos
    showNewBadge: true,
    newProductDays: 7, // Produtos com menos de X dias são "novos"
    
    // Mostrar contador de estoque
    showStockCounter: true,
    lowStockThreshold: 5, // Exibir alerta quando estoque < X
    
    // Animações
    enableAnimations: true,
    animationDuration: 300, // ms
    
    // Toast notifications
    toastDuration: 3000, // ms
    
    // Tema
    theme: 'light', // 'light' | 'dark' | 'auto'
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. CONFIGURAÇÃO DE ANALYTICS E TRACKING
  // ═══════════════════════════════════════════════════════════════════
  /**
   * COMO ADICIONAR ANALYTICS:
   * -------------------------
   * 1. Crie uma conta no Google Analytics, Meta Pixel, etc
   * 2. Adicione seus IDs abaixo
   * 3. Os eventos serão automaticamente rastreados
   */
  analytics: {
    // Google Analytics 4
    googleAnalytics: {
      enabled: false,
      measurementId: 'G-XXXXXXXXXX'
    },
    
    // Meta Pixel (Facebook)
    metaPixel: {
      enabled: false,
      pixelId: 'XXXXXXXXXXXXXXX'
    },
    
    // Google Tag Manager
    googleTagManager: {
      enabled: false,
      containerId: 'GTM-XXXXXXX'
    },
    
    // Eventos que serão rastreados
    trackEvents: {
      pageView: true,
      productView: true,
      addToCart: true,
      removeFromCart: true,
      beginCheckout: true,
      purchase: true
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. CONFIGURAÇÃO DE SEO
  // ═══════════════════════════════════════════════════════════════════
  seo: {
    siteName: 'Presentes Dia das Mães 2024',
    siteDescription: 'Os melhores presentes para o Dia das Mães. Entrega rápida, produtos selecionados com carinho.',
    siteUrl: 'https://seu-dominio.com',
    ogImage: '/assets/og-image.jpg',
    twitterHandle: '@seuTwitter'
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. CONFIGURAÇÃO DE EMAIL
  // ═══════════════════════════════════════════════════════════════════
  email: {
    // Serviço de email: 'sendgrid' | 'mailgun' | 'resend' | 'smtp'
    provider: 'mock',
    
    sendgrid: {
      apiKey: 'SEU_API_KEY_AQUI',
      fromEmail: 'noreply@suaempresa.com',
      fromName: 'Presentes Dia das Mães'
    },
    
    // Templates de email
    templates: {
      orderConfirmation: 'template-id-aqui',
      shipping: 'template-id-aqui'
    }
  }
};

// ═══════════════════════════════════════════════════════════════════
// FUNÇÕES UTILITÁRIAS
// ═══════════════════════════════════════════════════════════════════

/**
 * Retorna a configuração de pagamento atual
 */
CONFIG.getPaymentConfig = function() {
  return this.payment[this.payment.paymentGateway];
};

/**
 * Valida se todas as configurações necessárias estão preenchidas
 */
CONFIG.validate = function() {
  const errors = [];
  
  if (this.payment.paymentGateway !== 'mock' && this.payment.paymentGateway !== 'whatsapp') {
    const gateway = this.payment[this.payment.paymentGateway];
    if (!gateway || Object.values(gateway).some(v => v.includes('SEU_'))) {
      errors.push(`Configure as credenciais do ${this.payment.paymentGateway}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Retorna URL completa para um caminho
 */
CONFIG.getUrl = function(path) {
  return `${this.seo.siteUrl}${path}`;
};

// Exportar configuração
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
