# 🎨 Guia Rápido de Customização

Este documento contém as alterações mais comuns e como fazê-las rapidamente.

## ⚡ 5 Minutos

### 1. Mudar Nome da Empresa

**Arquivo:** `index.html` (linha 79) e `js/config.js` (linha 115)

```html
<!-- Antes -->
<span>Dia das Mães</span>

<!-- Depois -->
<span>Minha Loja - Dia das Mães</span>
```

### 2. Mudar Número do WhatsApp

**Arquivo:** `js/config.js` (linha 47)

```javascript
whatsapp: {
  phoneNumber: '5516999999999', // MUDE AQUI
}
```

**Formato:** `+55` + DDD (2 dígitos) + número (com 9 no início)

**Exemplo:** `(16) 99999-9999` → `5516999999999`

### 3. Mudar Cores Principais

**Arquivo:** `css/styles.css` (linhas 18-22)

```css
:root {
  --color-primary: #FF6B9D;        /* Cor principal (rosa) */
  --color-primary-dark: #E8568A;   /* Cor mais escura */
  --color-primary-light: #FFD5E4;  /* Cor mais clara */
}
```

**Onde mudar:**
- Pink: `#FF6B9D` → `#E91E63`
- Azul: `#FF6B9D` → `#2196F3`
- Verde: `#FF6B9D` → `#4CAF50`
- Roxo: `#FF6B9D` → `#9C27B0`

### 4. Mudar Logo/Emoji

**Arquivo:** `index.html` (linhas 79-81)

```html
<!-- Antes -->
<span>💐</span>
<span>Dia das Mães</span>

<!-- Depois -->
<span>👰</span>
<span>Presentes Especiais</span>
```

### 5. Mudar Preço do Frete

**Arquivo:** `js/config.js` (linhas 80-85)

```javascript
cart: {
  defaultShippingCost: 15.00,        // MUDE AQUI
  freeShippingThreshold: 200.00,     // Frete grátis acima de
}
```

---

## 📝 15 Minutos

### 6. Adicionar Seus Produtos

**Arquivo:** `js/products-data.js` (procure por `const PRODUCTS = [`)

Copie o template abaixo e adicione antes do fechamento do array:

```javascript
{
  id: 'seu-produto',
  name: 'Nome do Seu Produto',
  price: 99.90,
  oldPrice: 150.00,
  image: 'https://link-da-imagem.jpg',
  category: 'jewelry', // ou 'cosmetics', 'flowers', 'gifts'
  description: 'Descrição detalhada...',
  highlights: ['Destaque 1', 'Destaque 2'],
  inStock: true,
  stockCount: 50,
  featured: true,
  badge: 'Novo',
  rating: 5.0,
  reviewCount: 10
}
```

### 7. Adicionar Depoimentos

**Arquivo:** `js/products-data.js` (procure por `const TESTIMONIALS = [`)

```javascript
{
  id: 5,
  name: 'Nome do Cliente',
  avatar: 'https://i.pravatar.cc/150?img=10',
  rating: 5,
  text: '"Adorei o presente! Minha mãe amou!"',
  product: 'seu-produto-id',
  date: '2024-04-30'
}
```

### 8. Mudar FAQ

**Arquivo:** `js/products-data.js` (procure por `const FAQ = [`)

```javascript
{
  question: 'Sua pergunta aqui?',
  answer: 'Sua resposta aqui.'
}
```

### 9. Ativar Google Analytics

**Arquivo:** `js/config.js` (procure por `googleAnalytics`)

```javascript
googleAnalytics: {
  enabled: true,  // MUDE PARA true
  measurementId: 'G-XXXXXXXXXX'  // Seu ID aqui
}
```

### 10. Ativar Meta Pixel

**Arquivo:** `js/config.js` (procure por `metaPixel`)

```javascript
metaPixel: {
  enabled: true,  // MUDE PARA true
  pixelId: 'XXXXXXXXXX'  // Seu ID aqui
}
```

---

## 🎯 30 Minutos

### 11. Integrar Mercado Pago

1. Crie conta em https://www.mercadopago.com.br
2. Vá em Configurações → Credenciais
3. Copie suas chaves
4. Em `js/config.js`:

```javascript
CONFIG.payment = {
  paymentGateway: 'mercadopago',  // MUDE PARA 'mercadopago'
  
  mercadopago: {
    publicKey: 'APP_USR-XXXXXXXX',  // Cole aqui
    accessToken: 'APP_USR-XXXXXXXX' // Cole aqui
  }
}
```

### 12. Integrar Stripe

1. Crie conta em https://stripe.com
2. Vá em Developers → API Keys
3. Copie sua Publishable Key
4. Em `js/config.js`:

```javascript
CONFIG.payment = {
  paymentGateway: 'stripe',  // MUDE PARA 'stripe'
  
  stripe: {
    publishableKey: 'pk_live_XXXXXXXX'  // Cole aqui
  }
}
```

### 13. Adicionar Cupom de Desconto

**Arquivo:** `js/config.js` (procure por `CONFIG.cart.coupons`)

```javascript
coupons: {
  'MAE2024': 15,           // 15% desconto
  'DESCONTO10': 10,        // 10% desconto
  'FRETEGRATIS': 100       // Frete grátis
}
```

### 14. Mudar Desconto por Volume

**Arquivo:** `js/config.js` (procure por `volumeDiscounts`)

```javascript
volumeDiscounts: [
  { minItems: 2, discount: 5 },    // Mude conforme necessário
  { minItems: 4, discount: 10 },
  { minItems: 7, discount: 15 }
]
```

### 15. Personalizar Email da Empresa

**Arquivo:** `js/config.js` (procure por `businessInfo`)

```javascript
businessInfo: {
  name: 'Sua Loja Ltda',
  email: 'contato@sualoja.com',
  phone: '(11) 98765-4321',
  cnpj: '12.345.678/0001-90'
}
```

---

## 🚀 Deploy Rápido (Vercel)

### Via GitHub (Recomendado)

1. Crie repositório em GitHub
2. Faça push do código:
```bash
git add .
git commit -m "Launch day"
git push origin main
```

3. Acesse https://vercel.com
4. Clique "Import Project"
5. Selecione seu repo
6. Clique "Deploy"

**Pronto!** Seu site está em `seu-projeto.vercel.app`

### Via Drag & Drop

1. Vá em https://vercel.com/new
2. Arraste a pasta `mae-ecommerce`
3. Clique "Deploy"
4. Espere 1 minuto

---

## 🎨 Paletas de Cores Prontas

### Tema Rosa (Padrão) ✅
```css
--color-primary: #FF6B9D;
--color-primary-dark: #E8568A;
--color-primary-light: #FFD5E4;
```

### Tema Roxo
```css
--color-primary: #9C27B0;
--color-primary-dark: #7B1FA2;
--color-primary-light: #E1BEE7;
```

### Tema Azul
```css
--color-primary: #2196F3;
--color-primary-dark: #1976D2;
--color-primary-light: #BBDEFB;
```

### Tema Verde
```css
--color-primary: #4CAF50;
--color-primary-dark: #388E3C;
--color-primary-light: #C8E6C9;
```

### Tema Laranja
```css
--color-primary: #FF9800;
--color-primary-dark: #F57C00;
--color-primary-light: #FFE0B2;
```

---

## 📱 Testar em Mobile

### Usando Chrome DevTools

1. Abra seu site
2. Pressione `F12`
3. Clique no ícone de celular (canto superior esquerdo)
4. Selecione "iPhone 12" ou "Galaxy S20"
5. Teste o design e clique nos botões

### Usando Seu Celular Real

1. No mesmo WiFi do seu PC
2. No PC, saiba seu IP local:
   - Windows: `ipconfig` (procure por "IPv4 Address")
   - Mac/Linux: `ifconfig` (procure "inet")
   
3. No celular, acesse:
   ```
   http://seu-ip-local:8000
   ```

---

## ✅ Checklist Rápido

- [ ] Mudei número do WhatsApp
- [ ] Atualizei nome da empresa
- [ ] Mudei cores (opcional)
- [ ] Adicionei meus 5 produtos
- [ ] Atualizei preços
- [ ] Testei carrinho
- [ ] Testei checkout
- [ ] Fiz deploy na Vercel
- [ ] Testei no celular
- [ ] Divulguei nas redes sociais

---

## 🆘 Problemas Comuns

### "Erro ao carregar produtos"
- Cheque se `products-data.js` está salvo corretamente
- Abra Console (F12) e procure por erros
- Verifique se há vírgulas faltando

### "Carrinho não abre"
- Verifique se `cart.js` foi carregado (F12 → Network)
- Limpe cache do navegador (Ctrl+Shift+Delete)

### "WhatsApp não abre"
- Verifique número no formato correto: `55` + DDD + 9 + número
- Teste em outro navegador

### "Imagem não aparece"
- Verifique se URL é válida
- Use HTTPS (não HTTP)
- Teste a URL no navegador diretamente

---

## 🎓 Próximos Passos

1. **Customizar totalmente** - Mude mais cores, fontes, espaçamentos
2. **Integrar backend** - Crie API em Node.js/Python para gerenciar pedidos
3. **Adicionar login** - Permita clientes salvarem favoritos
4. **Email automático** - Envie confirmação por email
5. **Sistema de avaliações** - Deixe clientes avaliar produtos

**Precisa de ajuda?** Consulte `README.md` para documentação completa.

---

**Bom trabalho! Sua loja está linda!** 💐💖
