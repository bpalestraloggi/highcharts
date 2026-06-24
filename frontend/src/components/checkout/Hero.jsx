import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, FileBadge2 } from "lucide-react";

const stat = [
    { value: "287K", label: "Advogados ativos OAB/SP" },
    { value: "R$ 1bi+", label: "em anuidades por ano" },
    { value: "< 90s", label: "para concluir o pagamento" },
];

export default function Hero({ onCta }) {
    return (
        <section id="top" className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:px-8 sm:pt-24 lg:px-12 lg:pt-32 lg:pb-32">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7"
                    >
                        <div className="pill-tag" data-testid="hero-tag">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            Proposta confidencial · OAB Seccional São Paulo
                        </div>

                        <h1 className="mt-8 font-serif text-[3.25rem] leading-[0.98] tracking-tight sm:text-6xl lg:text-[5.25rem]">
                            Um checkout
                            <br />
                            <span className="italic text-accent">à altura</span>{" "}
                            da advocacia
                            <br />
                            paulista.
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            Redesenho completo da experiência de pagamento da
                            Anuidade OAB-SP — clareza institucional, fluxo
                            unificado e padrão fintech de segurança. Pronto para
                            aprovação do Conselho.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <button
                                onClick={onCta}
                                data-testid="hero-cta-primary"
                                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                            >
                                Iniciar simulação
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                            <a
                                href="#comparison"
                                data-testid="hero-cta-secondary"
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-foreground/30"
                            >
                                Ver antes & depois
                            </a>
                        </div>

                        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border/70 pt-8">
                            {stat.map((s) => (
                                <div key={s.label}>
                                    <div className="font-serif text-3xl tracking-tight sm:text-4xl">
                                        {s.value}
                                    </div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual card */}
                    <motion.div
                        initial={{ opacity: 0, y: 32, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.15,
                        }}
                        className="relative lg:col-span-5"
                    >
                        <div className="relative">
                            {/* Floating background card (depth) */}
                            <div className="absolute -right-4 top-8 hidden h-72 w-64 rotate-3 rounded-3xl border border-border/70 bg-card/40 backdrop-blur lg:block" />
                            <div className="absolute -left-2 bottom-6 hidden h-60 w-52 -rotate-2 rounded-3xl border border-accent/30 bg-accent/5 backdrop-blur lg:block" />

                            <div className="glass-card relative rounded-3xl p-8">
                                <div className="flex items-center justify-between">
                                    <div className="overline">Anuidade 2026</div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-success">
                                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                        Quitada
                                    </span>
                                </div>

                                <div className="mt-8">
                                    <div className="text-sm text-muted-foreground">
                                        Total pago
                                    </div>
                                    <div className="num-display mt-2 text-6xl">
                                        R$ 909
                                        <span className="text-3xl text-muted-foreground">
                                            ,04
                                        </span>
                                    </div>
                                    <div className="mt-2 text-xs uppercase tracking-[0.18em] text-accent">
                                        — 10% antecipação
                                    </div>
                                </div>

                                <div className="my-7 divider-line" />

                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center gap-3">
                                        <Zap className="h-4 w-4 text-accent" />
                                        <span className="text-muted-foreground">
                                            PIX confirmado em 4s
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <ShieldCheck className="h-4 w-4 text-accent" />
                                        <span className="text-muted-foreground">
                                            Criptografia TLS 1.3 · PCI-DSS
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FileBadge2 className="h-4 w-4 text-accent" />
                                        <span className="text-muted-foreground">
                                            Comprovante institucional em PDF
                                        </span>
                                    </li>
                                </ul>

                                <div className="mt-8 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3">
                                    <div>
                                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                                            Inscrito
                                        </div>
                                        <div className="font-serif text-lg">
                                            Dr. R. A. Souza
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                                            OAB/SP
                                        </div>
                                        <div className="font-mono text-sm">
                                            123.456
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
