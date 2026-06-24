# PRD — OAB-SP Anuidade 2026 · Checkout Premium (Protótipo de Apresentação)

## Original Problem Statement
> "estou negociando com a OAB e preciso melhorar o checkout de pagamento deles.. Tirei print de algumas telas e preciso me me ideias e dicas de sites incriveis para tornar o checkout de pgto perfeito"

**Goal:** Build a high-fidelity, interactive prototype to be presented to the OAB-SP board, showcasing a redesign of the Anuidade 2026 payment checkout that elevates UX, trust signals, and conversion — fintech-grade quality.

## User Choices
- Delivery format: **High-fidelity interactive prototype**
- Payment methods: **PIX, Credit Card (with installments), Debit Card, Boleto, Débito em conta, Apple Pay / Google Pay**
- Visual style: **Keep OAB identity (institutional blue + red) but modernize with premium typography and micro-interactions**
- Flow: **BOTH single-page AND multi-step (toggleable)**
- Extra features: PIX 1-click copy + QR Code, installment simulator, dark mode, security badges, downloadable PDF receipt, success animations, pre-filled lawyer data

## Architecture & Stack
- **Frontend:** React 19 + react-router-dom v7, TailwindCSS 3.4, Framer Motion, lucide-react, shadcn/ui primitives
- **No backend used** — pure client-side prototype with mocked data
- **Libraries added:** `qrcode.react`, `jspdf`, `canvas-confetti`
- **Fonts:** Instrument Serif (headings) + Manrope (body) + JetBrains Mono (code), loaded via Google Fonts
- **Design system:** CSS variables in `index.css` with full light + dark themes (OAB Navy `#0A2540` primary, OAB Red `#C8102E` accent)

## File Structure
```
/app/frontend/src/
├── App.js                                # Router → CheckoutShowcase
├── index.css                             # Design tokens, OAB palette, grain, animations
├── pages/
│   └── CheckoutShowcase.jsx              # Top-level page composition
├── contexts/
│   └── CheckoutContext.jsx               # flowMode, step, paymentMethod, parcelas, completePurchase, reset
├── lib/
│   └── checkout-data.js                  # Mock lawyer/anuidade/PIX/Boleto data + formatters + maskers
└── components/checkout/
    ├── Header.jsx                        # sticky header + theme-toggle + nav
    ├── Hero.jsx                          # Hero with floating receipt card
    ├── ProblemSection.jsx                # 6 pain-point cards + "what we deliver" win card
    ├── CheckoutSection.jsx               # flow-toggle + MultiStepFlow + SinglePageFlow
    ├── Stepper.jsx                       # 3-step progress indicator
    ├── IdentificationStep.jsx            # pre-filled lawyer card + billing fields
    ├── PaymentStep.jsx                   # PIX / CardForm / Boleto / BankDebit / Wallet panels + installment slider
    ├── OrderSummary.jsx                  # sticky glass-card with discount toggle + trust signals
    ├── SuccessScreen.jsx                 # confetti + receipt card + jsPDF download
    ├── ComparisonSection.jsx             # Before vs After mock UIs
    └── Footer.jsx
```

## Personas
1. **Diretoria OAB-SP** — the buyer. Needs to see institutional polish + measurable improvements.
2. **Advogado(a) inscrito(a)** — end user. Needs a fast, trustworthy, mobile-friendly payment flow.

## Core Requirements (static)
- Keep OAB institutional identity (navy + red) — never compromise the brand.
- Always show: order summary, security badges, gateway certification.
- Support all 6 payment methods with their idiomatic UX (PIX = QR + copy; Card = installments; Boleto = barcode; etc.).
- Always pre-fill lawyer data (mocked) — never re-ask.
- Dark mode must be first-class.
- Receipt PDF must look institutional (OAB-branded, signed, with confirmation code).

## What's Been Implemented (2026-01)
- ✅ Hero with Instrument Serif headline + animated floating receipt card
- ✅ Diagnostic section with 6 pain-point cards from screenshots analysis
- ✅ Flow toggle: Multi-step (3 steps) ⇄ Single-page (one card)
- ✅ Identificação step with pre-filled lawyer card (Dr. Ricardo Almeida Souza · OAB/SP 123.456)
- ✅ Payment step with all 6 methods + interactive panels
  - PIX: QR Code (qrcode.react) + Copia-e-cola with copy buttons + 15-min countdown
  - Cartão de Crédito: live card preview + Radix slider 1-12× with juros calculation
  - Cartão de Débito: card form variant
  - Boleto: barcode mock + linha digitável copy + PDF download
  - Débito em conta: 6 bank selector (Itaú, BB, Bradesco, Santander, Caixa, Nubank)
  - Apple Pay / Google Pay: native-style wallet button
- ✅ Sticky Order Summary with live discount toggle (R$ 909,04 ↔ R$ 1.010,05) + trust signals
- ✅ Success screen: confetti burst + animated SVG checkmark + receipt card + jsPDF download + email/share buttons + restart
- ✅ Comparison section: Before (legacy .aspx mock) vs After (proposal mock)
- ✅ Dark mode toggle with deep-navy palette
- ✅ Full responsive (tested at 1920×800 and 390×844)
- ✅ Sonner toast notifications
- ✅ Premium typography (Instrument Serif + Manrope), subtle grain overlay, glass-morphism

## Testing
- Testing agent ran 18 frontend E2E tests via Playwright → **100% pass** (`/app/test_reports/iteration_1.json`)
- All payment flows, copy buttons, slider, theme toggle, PDF download, confetti, single ↔ multi flow toggle verified

## Backlog / Future Enhancements (P1/P2)
- **P1** — Wire real payment gateway (e.g., Pagar.me / Cielo / Stone) when OAB approves
- **P1** — Persist BankDebit / Wallet / Card selections in CheckoutContext so they appear in the success comprovante
- **P2** — Add WhatsApp share for the receipt + "Adicionar ao Apple/Google Wallet" for the confirmation pass
- **P2** — A/B test variant: "default discount applied" vs "default no-discount with celebration on toggle"
- **P2** — Replace mock OAB seal in PDF with the official institutional SVG once received
- **P2** — Add "Lembrar-me da próxima anuidade" opt-in for email automation

## Next Tasks
1. Awaiting OAB-SP feedback after presentation
2. Add real backend wiring once contract signed (FastAPI + payment gateway)
3. Implement an admin dashboard for OAB to monitor conversion / abandonment

## URLs
- Preview: https://oab-checkout.preview.emergentagent.com
