import { ArrowRight, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";

const BEFORE = [
    "8+ páginas .aspx desconectadas",
    "Sem resumo de pedido",
    "Sem indicadores de segurança",
    "Tipografia padrão de sistema",
    "Sem versão dark mode",
    "Sem comprovante institucional",
];

const AFTER = [
    "Fluxo unificado em 3 passos",
    "Resumo sempre visível",
    "Selos · TLS · LGPD · gateway",
    "Newsreader + Hanken Grotesk",
    "Dark mode institucional",
    "Comprovante PDF assinado",
];

export default function ComparisonSection({ onCta }) {
    return (
        <section
            id="comparison"
            className="relative border-t border-border/60 bg-background"
        >
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
                <div className="max-w-2xl">
                    <div className="pill-tag">
                        <MousePointerClick className="h-3 w-3 text-accent" />
                        Antes & Depois
                    </div>
                    <h2 className="mt-5 font-serif text-3xl tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
                        Mesma instituição.
                        <br />
                        <span className="italic">Outra experiência.</span>
                    </h2>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* BEFORE */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.55 }}
                        className="rounded-2xl border border-border bg-card/40 p-7"
                    >
                        <div className="flex items-center justify-between">
                            <span className="overline text-muted-foreground">
                                Hoje
                            </span>
                            <span className="rounded-full bg-warning/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-warning">
                                Legado .aspx
                            </span>
                        </div>

                        {/* Mock of old screen */}
                        <div className="mt-5 overflow-hidden rounded-xl border border-border bg-white">
                            <div className="flex items-center justify-between bg-[#0A2540] px-4 py-2 text-white">
                                <span className="text-xs font-bold">OAB SÃO PAULO</span>
                                <span className="text-[10px] opacity-70">
                                    PagamentoAnuidade.aspx
                                </span>
                            </div>
                            <div className="px-5 py-6 text-[#0A2540]">
                                <div className="rounded-sm bg-pink-100 px-3 py-2 text-xs font-bold text-red-700">
                                    Leia atentamente as informações abaixo
                                </div>
                                <p className="mt-4 text-[10px] leading-relaxed text-gray-600">
                                    A Diretoria da OAB-SP aprovou os valores da
                                    anuidade 2026 conforme tabela abaixo.
                                </p>
                                <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-gray-300 text-[10px]">
                                    <div className="bg-gray-100 px-2 py-1 font-bold">
                                        Categoria
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 font-bold">
                                        Valor
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 font-bold">
                                        Desconto
                                    </div>
                                    <div className="bg-white px-2 py-1">Estagiário</div>
                                    <div className="bg-white px-2 py-1">R$ 252,52</div>
                                    <div className="bg-white px-2 py-1">R$ 227,27</div>
                                    <div className="bg-white px-2 py-1">Advogado</div>
                                    <div className="bg-white px-2 py-1">R$ 1.010,05</div>
                                    <div className="bg-white px-2 py-1">R$ 909,04</div>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    {[
                                        "Cartão",
                                        "PIX",
                                        "Boleto",
                                        "Débito",
                                        "Parcelas",
                                        "Conta",
                                    ].map((l) => (
                                        <div
                                            key={l}
                                            className="rounded-sm border border-gray-300 px-2 py-3 text-center text-[10px]"
                                        >
                                            {l}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                            {BEFORE.map((b) => (
                                <li key={b} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warning" />
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* AFTER */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-7"
                    >
                        <div
                            className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
                            style={{ background: "hsl(var(--accent))" }}
                        />
                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <span className="overline">Proposta</span>
                                <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-success">
                                    Padrão fintech
                                </span>
                            </div>

                            {/* Mock of new */}
                            <div className="mt-5 overflow-hidden rounded-xl border border-border bg-background">
                                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                                    <span className="font-serif text-sm">
                                        OAB·SP
                                    </span>
                                    <span className="font-mono text-[10px] text-muted-foreground">
                                        anuidade.oabsp.org.br
                                    </span>
                                </div>
                                <div className="grid grid-cols-5 gap-4 p-5">
                                    <div className="col-span-3 space-y-3">
                                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                            01 · Identificação ›{" "}
                                            <span className="text-accent">
                                                02 · Pagamento
                                            </span>{" "}
                                            › 03
                                        </div>
                                        <div className="font-serif text-lg">
                                            Como deseja pagar?
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                "PIX",
                                                "Crédito",
                                                "Débito",
                                                "Boleto",
                                            ].map((l, i) => (
                                                <div
                                                    key={l}
                                                    className={[
                                                        "rounded-md border p-2 text-[10px]",
                                                        i === 0
                                                            ? "border-primary bg-primary/5 text-primary"
                                                            : "border-border",
                                                    ].join(" ")}
                                                >
                                                    {l}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-2 rounded-lg bg-secondary p-3">
                                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                                            Total
                                        </div>
                                        <div className="font-serif text-xl">
                                            R$ 909,04
                                        </div>
                                        <div className="mt-1 text-[9px] text-success">
                                            − 10% antecipação
                                        </div>
                                        <div className="mt-3 h-1.5 w-full rounded-full bg-background">
                                            <div className="h-1.5 w-2/3 rounded-full bg-accent" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ul className="mt-6 space-y-2 text-sm">
                                {AFTER.map((b) => (
                                    <li
                                        key={b}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={onCta}
                                data-testid="comparison-cta"
                                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                            >
                                Testar checkout agora
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
