import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowUpRight,
    BadgeCheck,
    Banknote,
    CheckCircle2,
    Clock,
    Layers,
    LineChart,
    Lock,
    Mail,
    Sparkles,
    Target,
    TrendingUp,
    Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/checkout/Footer";
import PresentationControls from "@/components/checkout/PresentationControls";
import { PresentationProvider } from "@/contexts/PresentationContext";
import PageActionsHeader from "@/components/checkout/PageActionsHeader";

const SECTIONS = [
    { id: "proposta-hero", label: "Abertura" },
    { id: "roi", label: "ROI projetado" },
    { id: "market", label: "Benchmark" },
    { id: "timeline", label: "Cronograma" },
    { id: "investment", label: "Investimento" },
    { id: "cta", label: "Próximos passos" },
];

const ROI_METRICS = [
    {
        label: "Adimplência atual estimada",
        value: "62%",
        sub: "fonte: relatórios públicos seccional",
    },
    {
        label: "Adimplência projetada",
        value: "74%",
        sub: "ano 1 pós-implantação",
        accent: true,
    },
    {
        label: "Receita adicional recuperada",
        value: "R$ 34M",
        sub: "ano 1 · base 287K inscritos",
        accent: true,
    },
    {
        label: "Tempo médio de conclusão",
        value: "−68%",
        sub: "de 4m32s para 1m26s",
    },
    {
        label: "Tickets no SAC sobre pagamento",
        value: "−45%",
        sub: "redução prevista no 1º trimestre",
    },
    {
        label: "NPS do portal",
        value: "+38pts",
        sub: "benchmark fintechs brasileiras",
        accent: true,
    },
];

const BENCHMARKS = [
    {
        brand: "Stripe",
        takeaway: "Resumo do pedido sempre presente, fluxo single-page premium, foco brutal em clareza.",
        adopted: ["Order summary sticky", "Hierarquia tipográfica", "Confirmação visual"],
    },
    {
        brand: "Mercado Pago",
        takeaway: "PIX com QR animado + copy 1-clique. Padrão do mercado brasileiro.",
        adopted: ["QR animado", "Copia-e-cola", "Contagem regressiva"],
    },
    {
        brand: "Nubank",
        takeaway: "Sucesso celebrado com micro-animações. Aumenta percepção de qualidade.",
        adopted: ["Confetti institucional", "Comprovante baixável", "Compartilhar pagamento"],
    },
    {
        brand: "Apple Pay",
        takeaway: "One-tap pagamento. Reduz fricção a quase zero em mobile.",
        adopted: ["Apple Pay nativo", "Google Pay nativo"],
    },
];

const PHASES = [
    {
        n: "01",
        weeks: "Semana 1–2",
        title: "Descoberta & alinhamento",
        items: [
            "Imersão com TI da OAB-SP e gateway atual",
            "Levantamento de regras de negócio (descontos, parcelamento, categorias)",
            "Definição de stack de produção + ambiente sandbox",
        ],
    },
    {
        n: "02",
        weeks: "Semana 3–6",
        title: "Implementação do front-end",
        items: [
            "Migração do protótipo para ambiente OAB-SP",
            "Integração com SSO institucional (cadastro do advogado)",
            "Acessibilidade WCAG 2.1 AA + LGPD compliance review",
        ],
    },
    {
        n: "03",
        weeks: "Semana 7–9",
        title: "Integração de pagamentos",
        items: [
            "Conexão com gateway (Pagar.me / Cielo / Stone)",
            "PIX, cartão, boleto, débito em conta, wallets",
            "Webhook de baixa automática no cadastro institucional",
        ],
    },
    {
        n: "04",
        weeks: "Semana 10–12",
        title: "Lançamento & operação",
        items: [
            "Testes de carga (50K pagamentos/dia)",
            "Soft launch com 5% dos inscritos",
            "Rollout completo + dashboard analítico",
        ],
    },
];

function Pill({ children, icon: Icon }) {
    return (
        <div className="pill-tag">
            {Icon && <Icon className="h-3 w-3 text-accent" />}
            {children}
        </div>
    );
}

function ProposalContent() {
    return (
        <div className="relative isolate min-h-screen" data-pdf-root>
            <PageActionsHeader proposal />

            {/* Hero */}
            <section
                id="proposta-hero"
                className="relative isolate min-h-[80vh] overflow-hidden border-b border-border/60"
            >
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-12 sm:gap-12 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-12 lg:px-12 lg:pt-36">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7"
                    >
                        <Pill icon={Sparkles}>Proposta executiva · Documento confidencial</Pill>
                        <h1 className="mt-6 font-serif text-[2.25rem] leading-[1.05] tracking-tight sm:mt-8 sm:text-6xl lg:text-[5rem]">
                            Da fila do boleto
                            <br />
                            à <span className="italic text-accent">primeira</span> instituição
                            <br />
                            fintech do Brasil.
                        </h1>
                        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            Um projeto de 12 semanas que reposiciona a OAB-SP como
                            referência nacional em experiência institucional digital —
                            com retorno mensurável já no primeiro trimestre.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link
                                to="/"
                                data-testid="back-to-prototype"
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold transition-all hover:border-foreground/30"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Voltar ao protótipo
                            </Link>
                            <a
                                href="#cta"
                                data-testid="proposal-hero-cta"
                                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                            >
                                Ver próximos passos
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="lg:col-span-5"
                    >
                        <div className="glass-card rounded-3xl p-7">
                            <div className="overline">Resumo executivo</div>
                            <dl className="mt-5 space-y-4">
                                <Row k="Investimento total" v="R$ 480.000" />
                                <Row k="Prazo de entrega" v="12 semanas" />
                                <Row k="Retorno estimado · ano 1" v="R$ 34M" accent />
                                <Row k="ROI projetado" v="70× em 12 meses" accent />
                                <Row k="Equipe alocada" v="6 profissionais sênior" />
                                <Row k="Garantia" v="3 meses pós-lançamento" />
                            </dl>
                        </div>

                        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-5 text-sm">
                            <BadgeCheck className="h-5 w-5 shrink-0 text-success" />
                            <span>
                                Proposta válida por 30 dias. Sujeita a kickoff em até
                                15 dias após assinatura.
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ROI */}
            <section id="roi" className="border-b border-border/60">
                <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
                    <div className="max-w-2xl">
                        <Pill icon={LineChart}>Retorno projetado</Pill>
                        <h2 className="mt-5 font-serif text-3xl tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
                            R$ 34M recuperados
                            <br />
                            <span className="italic">só no primeiro ano.</span>
                        </h2>
                        <p className="mt-5 text-base text-muted-foreground">
                            Estimativas conservadoras baseadas em benchmarks de
                            checkout fintech e dados públicos da Seccional. Modelagem
                            completa disponível sob NDA.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {ROI_METRICS.map((m, i) => (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, delay: i * 0.06 }}
                                className={[
                                    "rounded-2xl border p-7 lift-on-hover",
                                    m.accent
                                        ? "border-accent/40 bg-accent/5"
                                        : "border-border bg-card/60",
                                ].join(" ")}
                            >
                                <div className="overline">{m.label}</div>
                                <div className="num-display mt-3 text-4xl sm:mt-4 sm:text-5xl">{m.value}</div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    {m.sub}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <Insight icon={Users} title="287K inscritos">
                            Base ativa de advogados e estagiários da Seccional, com
                            anuidade média de R$ 909.
                        </Insight>
                        <Insight icon={TrendingUp} title="+12pp adimplência">
                            Apenas 12 pontos percentuais a mais convertem em mais de
                            R$ 30M anuais.
                        </Insight>
                        <Insight icon={Clock} title="−3min por pagamento">
                            Redução do tempo médio libera capacidade do SAC para
                            atendimento jurídico.
                        </Insight>
                    </div>
                </div>
            </section>

            {/* Market benchmark */}
            <section id="market" className="border-b border-border/60">
                <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
                    <div className="max-w-2xl">
                        <Pill icon={Target}>Benchmark</Pill>
                        <h2 className="mt-5 font-serif text-3xl tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
                            O melhor de cada
                            <br />
                            referência <span className="italic">global</span>.
                        </h2>
                        <p className="mt-5 text-base text-muted-foreground">
                            Estudamos os checkouts mais sofisticados do mundo e
                            adaptamos cada técnica ao tom institucional da OAB-SP.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {BENCHMARKS.map((b, i) => (
                            <motion.div
                                key={b.brand}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="rounded-2xl border border-border bg-card/60 p-7 lift-on-hover"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="font-serif text-2xl tracking-tight">
                                        {b.brand}
                                    </div>
                                    <span className="font-mono text-xs text-muted-foreground">
                                        REF · 0{i + 1}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    {b.takeaway}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {b.adopted.map((t) => (
                                        <span
                                            key={t}
                                            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-foreground"
                                        >
                                            <CheckCircle2 className="h-3 w-3 text-success" />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section id="timeline" className="border-b border-border/60">
                <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
                    <div className="max-w-2xl">
                        <Pill icon={Layers}>Cronograma</Pill>
                        <h2 className="mt-5 font-serif text-3xl tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
                            12 semanas
                            <br />
                            do <span className="italic">kickoff ao rollout</span>.
                        </h2>
                    </div>

                    <ol className="mt-14 relative space-y-12 border-l border-border/60 pl-8">
                        {PHASES.map((p, i) => (
                            <motion.li
                                key={p.n}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.45, delay: i * 0.08 }}
                                className="relative"
                            >
                                <span className="absolute -left-[41px] grid h-6 w-6 place-items-center rounded-full border border-border bg-background">
                                    <span className="h-2 w-2 rounded-full bg-accent" />
                                </span>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                    <div className="lg:col-span-3">
                                        <div className="overline">Fase {p.n}</div>
                                        <div className="mt-2 font-mono text-sm">
                                            {p.weeks}
                                        </div>
                                    </div>
                                    <div className="lg:col-span-9">
                                        <h3 className="font-serif text-2xl tracking-tight">
                                            {p.title}
                                        </h3>
                                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                            {p.items.map((it) => (
                                                <li
                                                    key={it}
                                                    className="flex items-start gap-2"
                                                >
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                                                    {it}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Investment */}
            <section id="investment" className="border-b border-border/60">
                <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <Pill icon={Banknote}>Investimento</Pill>
                            <h2 className="mt-5 font-serif text-3xl tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
                                R$ 480.000
                                <br />
                                <span className="italic text-muted-foreground text-3xl">
                                    pagos em marcos
                                </span>
                            </h2>
                            <p className="mt-5 text-base text-muted-foreground">
                                Investimento total se paga em menos de 6 dias de
                                anuidade recuperada. Pagamento atrelado a entregas
                                verificáveis.
                            </p>

                            <div className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-3 text-xs text-muted-foreground">
                                <Lock className="h-3.5 w-3.5" />
                                Todos os valores ex-impostos · NF emitida por marco.
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="glass-card overflow-hidden rounded-2xl">
                                {[
                                    {
                                        marco: "Kickoff & alinhamento",
                                        pct: "20%",
                                        val: "R$ 96.000",
                                    },
                                    {
                                        marco: "Front-end aprovado em homologação",
                                        pct: "30%",
                                        val: "R$ 144.000",
                                    },
                                    {
                                        marco: "Integração de pagamentos em sandbox",
                                        pct: "25%",
                                        val: "R$ 120.000",
                                    },
                                    {
                                        marco: "Rollout completo + 30 dias estáveis",
                                        pct: "25%",
                                        val: "R$ 120.000",
                                    },
                                ].map((row, i) => (
                                    <div
                                        key={row.marco}
                                        className={[
                                            "grid grid-cols-12 items-center gap-4 px-7 py-5",
                                            i > 0 && "border-t border-border/60",
                                        ].join(" ")}
                                    >
                                        <div className="col-span-1 font-mono text-xs text-muted-foreground">
                                            0{i + 1}
                                        </div>
                                        <div className="col-span-7 text-sm">
                                            {row.marco}
                                        </div>
                                        <div className="col-span-2 text-right font-mono text-xs text-muted-foreground">
                                            {row.pct}
                                        </div>
                                        <div className="col-span-2 text-right font-mono text-sm">
                                            {row.val}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="cta" className="border-b border-border/60">
                <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-24 lg:px-12 lg:py-32">
                    <Pill icon={Sparkles}>Próximos passos</Pill>
                    <h2 className="mt-5 font-serif text-4xl tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl">
                        Pronto para
                        <br />
                        <span className="italic text-accent">começar.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
                        Kickoff em até 15 dias. Reunião técnica com seu time de TI já
                        na primeira semana. Sem burocracia.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="mailto:proposta@oabsp.org.br?subject=Proposta%20Checkout%20Anuidade%202026"
                            data-testid="cta-email"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                        >
                            <Mail className="h-4 w-4" />
                            Aprovar proposta · responder por e-mail
                        </a>
                        <Link
                            to="/"
                            data-testid="cta-back-to-prototype"
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold transition-all hover:border-foreground/30"
                        >
                            Revisitar protótipo
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
            <PresentationControls />
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: "hsl(var(--card))",
                        color: "hsl(var(--foreground))",
                        border: "1px solid hsl(var(--border))",
                        fontFamily: "Hanken Grotesk, sans-serif",
                    },
                }}
            />
        </div>
    );
}

function Row({ k, v, accent }) {
    return (
        <div className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3 last:border-0 last:pb-0">
            <dt className="text-sm text-muted-foreground">{k}</dt>
            <dd
                className={[
                    "num-display text-right",
                    accent ? "text-accent text-2xl" : "text-xl",
                ].join(" ")}
            >
                {v}
            </dd>
        </div>
    );
}

function Insight({ icon: Icon, title, children }) {
    return (
        <div className="rounded-xl border border-border bg-card/40 p-5">
            <div className="flex items-center gap-2 text-accent">
                <Icon className="h-4 w-4" />
                <div className="overline text-accent">{title}</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {children}
            </p>
        </div>
    );
}

export default function ProposalPage() {
    return (
        <PresentationProvider sections={SECTIONS}>
            <ProposalContent />
        </PresentationProvider>
    );
}
