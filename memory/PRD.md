# PRD — OAB-SP Anuidade 2026 · Checkout Premium (Protótipo de Apresentação)

## Original Problem Statement
> "estou negociando com a OAB e preciso melhorar o checkout de pagamento deles.. Tirei print de algumas telas e preciso me me ideias e dicas de sites incriveis para tornar o checkout de pgto perfeito"

**Goal:** Build a high-fidelity, interactive prototype to be presented to the OAB-SP board, showcasing a redesign of the Anuidade 2026 payment checkout — fintech-grade UX with measurable ROI.

## User Choices
- Delivery: **Protótipo interativo de alta fidelidade**
- Métodos: **PIX, Crédito (com parcelamento), Débito, Boleto, Débito em conta, Apple/Google Pay**
- Visual: **Identidade OAB (azul institucional + vermelho)** modernizada com tipografia premium e micro-interações
- Fluxo: **single-page E multi-step** (toggleável)
- Extras: PIX 1-click + QR, simulador de parcelas, dark mode, badges de segurança, comprovante PDF, animações de sucesso, dados pré-preenchidos
- **Iteração 2 — Materiais para apresentação à diretoria:**
  - Página `/proposta` (deck executivo com ROI, benchmark, cronograma, investimento)
  - Modo apresentação (deck com navegação por teclado)
  - Exportar PDF da página (1 clique)
  - QR Code no hero (diretoria escaneia no celular)

## Architecture & Stack
- React 19 · react-router-dom v7 · Tailwind 3.4 · Framer Motion · shadcn/ui · lucide-react
- Frontend-only — sem backend, dados mocados
- Bibliotecas: `qrcode.react`, `jspdf`, `html2canvas`, `canvas-confetti`
- Fontes: Instrument Serif (display) + Manrope (texto) + JetBrains Mono (mono)
- Design tokens em `index.css` (OAB Navy `#0A2540`, OAB Red `#C8102E`), light + dark mode

## File Structure
```
/app/frontend/src/
├── App.js                                # Routes: / e /proposta
├── index.css                             # Design tokens + grain + animations
├── pages/
│   ├── CheckoutShowcase.jsx              # Página principal (/) com PresentationProvider
│   └── ProposalPage.jsx                  # Deck executivo (/proposta)
├── contexts/
│   ├── CheckoutContext.jsx               # Estado do checkout
│   └── PresentationContext.jsx           # Modo apresentação + teclado
├── lib/
│   ├── checkout-data.js                  # Mocks + formatters
│   └── export-pdf.js                     # html2canvas + jsPDF multi-page
└── components/checkout/
    ├── PageActionsHeader.jsx             # Header compartilhado (PDF, Apresentar, Tema, Proposta)
    ├── Hero.jsx                          # Hero (com QR card)
    ├── HeroQRCard.jsx                    # QR Code do protótipo
    ├── ProblemSection.jsx                # Diagnóstico
    ├── CheckoutSection.jsx               # Flow toggle + Multi/Single
    ├── Stepper.jsx
    ├── IdentificationStep.jsx
    ├── PaymentStep.jsx                   # PIX, Card, Boleto, BankDebit, Wallet
    ├── OrderSummary.jsx
    ├── SuccessScreen.jsx                 # Confetti + PDF comprovante
    ├── ComparisonSection.jsx
    ├── PresentationControls.jsx          # Floating dock com prev/next/dots/exit
    └── Footer.jsx
```

## Personas
1. **Diretoria OAB-SP** — buyer. Precisa ver polimento institucional + ROI mensurável.
2. **Advogado(a) inscrito(a)** — end user. Precisa de checkout rápido e confiável.

## Core Requirements (static)
- Manter identidade OAB (navy + red) sem comprometer a marca
- Resumo do pedido + badges de segurança sempre visíveis
- Suportar 6 métodos de pagamento com UX idiomática
- Pré-preencher dados do advogado (mock)
- Dark mode first-class
- Comprovante PDF institucional (jsPDF)
- Materiais de venda: deck executivo + apresentação + export + QR

## What's Been Implemented

### 2026-01 — Iteração 1 (protótipo base)
- ✅ Hero, Diagnóstico, Checkout (Multi/Single), Antes & Depois
- ✅ 6 métodos de pagamento (PIX QR + copy, Card + slider parcelas, Débito, Boleto, Banco, Wallets)
- ✅ Order Summary sticky com toggle de desconto
- ✅ Success screen (confetti + jsPDF receipt + restart)
- ✅ Dark mode + Sonner toasts + responsivo
- ✅ Testing agent iteration_1: 18/18 PASS (100%)

### 2026-01 — Iteração 2 (materiais para apresentação)
- ✅ **/proposta** — Deck executivo (6 seções): Hero, ROI, Benchmark (Stripe/Mercado Pago/Nubank/Apple Pay), Cronograma (4 fases · 12 semanas), Investimento (R$ 480k em 4 marcos), CTA
- ✅ **Modo apresentação** — toggle no header, navegação por ←/→/Espaço/PageUp/Down/Home/End/Esc, dock flutuante com dots/contador/prev/next/exit. Tracking de scroll com supressão durante navegação programática.
- ✅ **Exportar PDF** — `lib/export-pdf.js` usa html2canvas + jsPDF, gera PDF A4 multi-página, esconde badges/controles durante captura, força light mode e restaura, com toasts de progresso.
- ✅ **QR Code no Hero** — `HeroQRCard.jsx` com QR dinâmico (window.location.origin) + botão copiar link.
- ✅ PageActionsHeader compartilhado entre / e /proposta (PDF · Apresentar · Tema · Ver proposta/Protótipo · nav contextual)
- ✅ Testing agent iteration_2: 16/16 PASS (100%)

## Testing
- `/app/test_reports/iteration_1.json` — checkout E2E (18 testes)
- `/app/test_reports/iteration_2.json` — proposta + apresentação + PDF + QR (16 testes)

## URLs
- Preview: https://oab-checkout.preview.emergentagent.com
- Production: https://oab-checkout.emergent.host

## Backlog / Future Enhancements
- **P1** Integrar gateway real (Pagar.me / Cielo / Stone) com backend FastAPI quando aprovado
- **P1** Persistir seleção de banco/wallet no contexto (hoje é state local da PaymentStep)
- **P2** Adicionar `Adicionar à Carteira Apple/Google` para o comprovante
- **P2** A/B test: desconto aplicado por padrão vs celebração ao ativar
- **P2** Substituir mock do selo OAB no PDF por SVG institucional oficial
- **P2** Permitir QR Code apontar para a rota atual (`pathname`) ao invés de sempre `/`
- **P2** Anuncar via aria-live na troca de slide do modo apresentação (acessibilidade)
- **P2** Dashboard admin OAB com métricas de conversão e abandono

## Next Tasks
1. Apresentar à diretoria com `/proposta` + modo apresentação
2. Coletar feedback e ajustar copy/números do ROI
3. Após aprovação: backend FastAPI + integração gateway + selo SVG oficial
