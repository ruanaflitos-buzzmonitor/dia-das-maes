/**
 * ═══════════════════════════════════════════════════════════════════
 * DADOS DOS PRODUTOS - DIA DAS MÃES
 * ═══════════════════════════════════════════════════════════════════
 * 
 * COMO ADICIONAR NOVOS PRODUTOS:
 * -------------------------------
 * 1. Copie um dos objetos abaixo como modelo
 * 2. Altere o ID para um valor único
 * 3. Preencha todos os campos necessários
 * 4. Adicione ao array PRODUCTS
 * 
 * ESTRUTURA DE UM PRODUTO:
 * ------------------------
 * {
 *   id: string (único),
 *   name: string,
 *   price: number,
 *   oldPrice: number (opcional),
 *   image: string (URL ou caminho),
 *   category: 'jewelry' | 'cosmetics' | 'flowers' | 'gifts',
 *   description: string,
 *   highlights: string[],
 *   inStock: boolean,
 *   stockCount: number,
 *   featured: boolean (destaque na home),
 *   badge: string (opcional: 'Novo', 'Oferta', etc),
 *   rating: number (0-5),
 *   reviewCount: number
 * }
 */

const PRODUCTS = [
  // ═══════════════════════════════════════════════════════════════════
  // CATEGORIA: JOIAS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'colar-coracao-ouro',
    name: 'Colar Coração Infinito',
    price: 189.90,
    oldPrice: 299.90,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    category: 'jewelry',
    description: 'Colar delicado em ouro 18k com pingente de coração entrelaçado ao símbolo do infinito. Representa o amor eterno entre mãe e filho. Acompanha caixinha de veludo e certificado de autenticidade.',
    highlights: [
      'Ouro 18k certificado',
      'Corrente ajustável 40-45cm',
      'Embalagem premium inclusa',
      'Garantia de 1 ano'
    ],
    inStock: true,
    stockCount: 15,
    featured: true,
    badge: 'Mais Vendido',
    rating: 4.9,
    reviewCount: 127,
    tags: ['elegante', 'ouro', 'delicado']
  },
  {
    id: 'brinco-perola-classico',
    name: 'Brincos de Pérola Clássicos',
    price: 149.90,
    oldPrice: 249.90,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    category: 'jewelry',
    description: 'Par de brincos com pérolas naturais cultivadas, montados em ouro branco 18k. Design clássico e atemporal, perfeito para qualquer ocasião.',
    highlights: [
      'Pérolas naturais AAA',
      'Base em ouro branco 18k',
      'Fecho seguro tipo borboleta',
      'Certificado de qualidade'
    ],
    inStock: true,
    stockCount: 23,
    featured: true,
    rating: 4.8,
    reviewCount: 89,
    tags: ['clássico', 'pérola', 'elegante']
  },
  {
    id: 'pulseira-charms-personalizada',
    name: 'Pulseira com Charms Personalizáveis',
    price: 229.90,
    oldPrice: 349.90,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    category: 'jewelry',
    description: 'Pulseira em prata 925 com sistema de charms removíveis. Inclui 3 charms iniciais: coração "Mãe", flor e estrela. Perfeita para criar memórias únicas.',
    highlights: [
      'Prata 925 de lei',
      '3 charms inclusos',
      'Adicione novos charms',
      'Gravação gratuita do nome'
    ],
    inStock: true,
    stockCount: 31,
    featured: true,
    badge: 'Personalizável',
    rating: 4.9,
    reviewCount: 156,
    tags: ['personalizado', 'prata', 'moderno']
  },
  {
    id: 'anel-zirconia-solitario',
    name: 'Anel Solitário com Zircônia',
    price: 169.90,
    oldPrice: 289.90,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    category: 'jewelry',
    description: 'Anel elegante em ouro rosé 18k com zircônia cúbica de alto brilho. Design sofisticado que combina com qualquer estilo.',
    highlights: [
      'Ouro rosé 18k',
      'Zircônia premium',
      'Disponível em vários tamanhos',
      'Caixinha de veludo inclusa'
    ],
    inStock: true,
    stockCount: 19,
    rating: 4.7,
    reviewCount: 74,
    tags: ['sofisticado', 'ouro rosé', 'brilhante']
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORIA: COSMÉTICOS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'kit-skincare-premium',
    name: 'Kit Skincare Luxury Complete',
    price: 279.90,
    oldPrice: 449.90,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
    category: 'cosmetics',
    description: 'Kit completo de skincare com 5 produtos: sérum vitamina C, ácido hialurônico, creme anti-idade, máscara facial e tônico. Fórmulas premium para todos os tipos de pele.',
    highlights: [
      '5 produtos full size',
      'Dermatologicamente testado',
      'Embalagem luxuosa',
      'Guia de aplicação incluso'
    ],
    inStock: true,
    stockCount: 42,
    featured: true,
    badge: 'Kit Completo',
    rating: 5.0,
    reviewCount: 203,
    tags: ['skincare', 'premium', 'anti-idade']
  },
  {
    id: 'perfume-floral-exclusivo',
    name: 'Perfume Floral Intense 100ml',
    price: 249.90,
    oldPrice: 389.90,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    category: 'cosmetics',
    description: 'Fragrância exclusiva com notas de jasmim, rosa e sândalo. Perfume floral sofisticado de longa duração, perfeito para mães elegantes.',
    highlights: [
      'Fragrância importada',
      'Duração de 8-12 horas',
      'Frasco de vidro premium',
      'Embalagem presenteável'
    ],
    inStock: true,
    stockCount: 28,
    featured: true,
    rating: 4.8,
    reviewCount: 142,
    tags: ['perfume', 'floral', 'luxo']
  },
  {
    id: 'kit-maquiagem-profissional',
    name: 'Kit Maquiagem Profissional',
    price: 329.90,
    oldPrice: 549.90,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    category: 'cosmetics',
    description: 'Kit completo com paleta de sombras, batons, iluminadores, blush e pincéis profissionais. 25 itens para criar looks incríveis.',
    highlights: [
      '25 produtos inclusos',
      'Paleta com 18 cores',
      'Pincéis profissionais',
      'Necessaire organizadora'
    ],
    inStock: true,
    stockCount: 17,
    badge: 'Oferta',
    rating: 4.9,
    reviewCount: 98,
    tags: ['maquiagem', 'profissional', 'completo']
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORIA: FLORES
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'buque-rosas-vermelhas-premium',
    name: 'Buquê Premium 24 Rosas Vermelhas',
    price: 159.90,
    oldPrice: 249.90,
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80',
    category: 'flowers',
    description: 'Buquê luxuoso com 24 rosas vermelhas colombianas de hastes longas. Flores frescas entregues no mesmo dia. Inclui cartão personalizado.',
    highlights: [
      'Rosas colombianas premium',
      'Entrega no mesmo dia',
      'Embalagem sofisticada',
      'Cartão personalizado grátis'
    ],
    inStock: true,
    stockCount: 50,
    featured: true,
    badge: 'Entrega Hoje',
    rating: 5.0,
    reviewCount: 287,
    tags: ['rosas', 'premium', 'romântico']
  },
  {
    id: 'arranjo-flores-mistas',
    name: 'Arranjo Especial Flores do Campo',
    price: 129.90,
    oldPrice: 199.90,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
    category: 'flowers',
    description: 'Arranjo encantador com mix de flores coloridas: lírios, gérberas, astromélias e folhagens. Perfeito para transmitir alegria e carinho.',
    highlights: [
      'Flores frescas variadas',
      'Vaso de cerâmica incluso',
      'Arranjo artesanal',
      'Duração de 7-10 dias'
    ],
    inStock: true,
    stockCount: 38,
    rating: 4.8,
    reviewCount: 156,
    tags: ['colorido', 'alegre', 'vaso']
  },
  {
    id: 'cesta-cafe-flores',
    name: 'Cesta Café da Manhã + Flores',
    price: 199.90,
    oldPrice: 319.90,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    category: 'flowers',
    description: 'Combo especial: mini buquê de rosas + cesta gourmet com pães, geleia, café especial, sucos e frutas. Surpresa completa!',
    highlights: [
      'Buquê + café da manhã',
      'Produtos selecionados',
      'Entrega pela manhã',
      'Embalagem exclusiva'
    ],
    inStock: true,
    stockCount: 25,
    featured: true,
    badge: 'Combo Especial',
    rating: 5.0,
    reviewCount: 193,
    tags: ['combo', 'café', 'completo']
  },
  {
    id: 'orquidea-phalaenopsis',
    name: 'Orquídea Phalaenopsis Branca',
    price: 139.90,
    oldPrice: 219.90,
    image: 'https://images.unsplash.com/photo-1549281899-f75600a24107?w=800&q=80',
    category: 'flowers',
    description: 'Orquídea branca elegante em vaso de cerâmica. Planta de longa duração, simboliza amor e sofisticação. Inclui manual de cuidados.',
    highlights: [
      'Floração duradoura',
      'Vaso de cerâmica premium',
      'Manual de cuidados',
      'Planta viva'
    ],
    inStock: true,
    stockCount: 31,
    rating: 4.9,
    reviewCount: 167,
    tags: ['orquídea', 'elegante', 'duradouro']
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORIA: PRESENTES
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'bolsa-couro-premium',
    name: 'Bolsa de Couro Legítimo Premium',
    price: 389.90,
    oldPrice: 599.90,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    category: 'gifts',
    description: 'Bolsa elegante em couro legítimo com design atemporal. Compartimentos organizados, alça ajustável e forro premium. Disponível em 3 cores.',
    highlights: [
      'Couro legítimo 100%',
      'Design atemporal',
      'Múltiplos compartimentos',
      'Disponível em 3 cores'
    ],
    inStock: true,
    stockCount: 22,
    featured: true,
    rating: 4.9,
    reviewCount: 134,
    tags: ['bolsa', 'couro', 'elegante']
  },
  {
    id: 'quadro-personalizado-familia',
    name: 'Quadro Personalizado Família',
    price: 119.90,
    oldPrice: 189.90,
    image: 'https://cdn.awsli.com.br/2500x2500/403/403361/produto/227111182/painel-fotografico-principal-zvgqpg2ipi.jpg',
    category: 'gifts',
    description: 'Quadro decorativo personalizado com foto da família. Moldura em madeira nobre, impressão em alta qualidade. Presente único e emocionante.',
    highlights: [
      'Totalmente personalizado',
      'Moldura de madeira nobre',
      'Impressão HD profissional',
      'Tamanho: 30x40cm'
    ],
    inStock: true,
    stockCount: 100,
    badge: 'Personalizado',
    rating: 5.0,
    reviewCount: 241,
    tags: ['personalizado', 'foto', 'decoração']
  },
  {
    id: 'livro-receitas-mae',
    name: 'Livro "Receitas da Minha Mãe"',
    price: 79.90,
    oldPrice: 129.90,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    category: 'gifts',
    description: 'Livro de receitas em branco para sua mãe registrar suas receitas especiais. Capa dura personalizada, páginas ilustradas e espaço para fotos.',
    highlights: [
      'Capa dura personalizada',
      '100 páginas ilustradas',
      'Espaço para fotos',
      'Presente emocional'
    ],
    inStock: true,
    stockCount: 88,
    rating: 4.7,
    reviewCount: 92,
    tags: ['livro', 'receitas', 'memórias']
  },
  {
    id: 'kit-cha-gourmet',
    name: 'Kit Chá Gourmet Afternoon Tea',
    price: 149.90,
    oldPrice: 239.90,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    category: 'gifts',
    description: 'Caixa premium com 12 tipos de chás importados, xícara de porcelana, infusor e biscoitos gourmet. Perfeito para mães que amam chá.',
    highlights: [
      '12 chás importados',
      'Xícara de porcelana',
      'Infusor de inox',
      'Biscoitos gourmet inclusos'
    ],
    inStock: true,
    stockCount: 35,
    featured: true,
    badge: 'Gourmet',
    rating: 4.8,
    reviewCount: 118,
    tags: ['chá', 'gourmet', 'sofisticado']
  },
  {
    id: 'dia-spa-voucher',
    name: 'Voucher Day Spa Relaxante',
    price: 299.90,
    oldPrice: 499.90,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    category: 'gifts',
    description: 'Voucher para day spa completo: massagem relaxante, tratamento facial, manicure e pedicure. Válido por 6 meses em rede de spas credenciados.',
    highlights: [
      'Experiência completa',
      'Rede de spas credenciados',
      'Válido por 6 meses',
      'Agendamento flexível'
    ],
    inStock: true,
    stockCount: 50,
    featured: true,
    badge: 'Experiência',
    rating: 5.0,
    reviewCount: 176,
    tags: ['spa', 'relaxamento', 'experiência']
  },
  {
    id: 'kit-vinho-taca',
    name: 'Kit Vinho Premium + Taças',
    price: 219.90,
    oldPrice: 349.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    category: 'gifts',
    description: 'Kit com vinho tinto importado premium, duas taças de cristal e abridor profissional. Embalagem sofisticada em caixa de madeira.',
    highlights: [
      'Vinho importado premium',
      '2 taças de cristal',
      'Abridor profissional',
      'Caixa de madeira'
    ],
    inStock: true,
    stockCount: 27,
    rating: 4.9,
    reviewCount: 145,
    tags: ['vinho', 'sofisticado', 'cristal']
  }
];

// ═══════════════════════════════════════════════════════════════════
// DEPOIMENTOS DE CLIENTES
// ═══════════════════════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Maria Silva',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Minha mãe amou o colar! A qualidade é excelente e a entrega foi super rápida. Recomendo muito!',
    product: 'colar-coracao-ouro',
    date: '2024-04-28'
  },
  {
    id: 2,
    name: 'João Santos',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'O kit de skincare superou as expectativas. Minha mãe está radiante! Melhor presente que já dei.',
    product: 'kit-skincare-premium',
    date: '2024-04-25'
  },
  {
    id: 3,
    name: 'Ana Paula',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'As flores chegaram lindas e frescas. O buquê era ainda mais bonito pessoalmente. Minha mãe chorou de emoção!',
    product: 'buque-rosas-vermelhas-premium',
    date: '2024-04-27'
  },
  {
    id: 4,
    name: 'Carlos Oliveira',
    avatar: 'https://i.pravatar.cc/150?img=13',
    rating: 5,
    text: 'O voucher de spa foi o presente perfeito. Minha mãe merecia esse momento de relaxamento. Obrigado!',
    product: 'dia-spa-voucher',
    date: '2024-04-26'
  }
];

// ═══════════════════════════════════════════════════════════════════
// PERGUNTAS FREQUENTES
// ═══════════════════════════════════════════════════════════════════
const FAQ = [
  {
    question: 'Qual o prazo de entrega?',
    answer: 'Entregamos em até 48h para capitais e 5 dias úteis para demais regiões. Flores podem ter entrega no mesmo dia mediante disponibilidade.'
  },
  {
    question: 'Posso personalizar o presente?',
    answer: 'Sim! Produtos com selo "Personalizável" permitem gravações, mensagens e customizações. Entre em contato pelo WhatsApp para detalhes.'
  },
  {
    question: 'Como funciona a garantia?',
    answer: 'Todos os produtos têm garantia de qualidade. Joias têm 1 ano de garantia, cosméticos são trocados se lacrados, flores são 100% frescas ou reembolsamos.'
  },
  {
    question: 'Posso trocar se minha mãe não gostar?',
    answer: 'Sim! Você tem 7 dias para solicitar troca ou devolução, desde que o produto esteja na embalagem original.'
  },
  {
    question: 'Vocês embrulham para presente?',
    answer: 'Todos os pedidos já vêm em embalagem presenteável sem custo adicional! Papel de seda, laço e cartão personalizado inclusos.'
  }
];

// Exportar dados
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS, TESTIMONIALS, FAQ };
}
