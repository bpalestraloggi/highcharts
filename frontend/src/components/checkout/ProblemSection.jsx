import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const PAINS = [
    {
        title: "Sem fluxo unificado",
        body: "O usuário precisa atravessar diversas páginas .aspx para entender o que pagar, quanto pagar e como pagar.",
    },
    {
        title: "Sem hierarquia visual",
        body: "Botões, alertas e textos competem entre si. O olhar não tem para onde ir primeiro.",
    },
    {
        title: "Identidade desatualizada",
        body: "Tipografia padrão de sistema, contraste baixo e zero micro-interações — destoa de uma instituição de elite.",
    },
    {
        title: "Sem confiança visível",
        body: "Faltam selos de segurança, gateway certificado, badges LGPD e tipografia institucional consistente.",
    },
    {
        title: "Sem resumo do pedido",
        body: "O advogado paga sem ver claramente o que está sendo cobrado, descontos aplicados e prazos.",
    },
    {
        title: "Sem feedback de sucesso",
        body: "Após o pagamento, não há tela de confirmação memorável, nem comprovante institucional baixável.",
    },
];

const WINS = [
    "Fluxo unificado em 3 etapas",
    "Tipografia premium institucional",
    "Selos de segurança e LGPD visíveis",
    "Resumo do pedido sempre presente",
    "PIX com QR, copy e contagem regressiva",
    "Comprovante PDF institucional",
];

export default function ProblemSection({ onJumpToCheckout }) {
    return (
        <section
            id="problem"
            className="relative border-t border-border/60 bg-background"
        >
            <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <div className="pill-tag">
                            <AlertTriangle className="h-3 w-3 text-accent" />
                            Diagnóstico do checkout atual
                        </div>
                        <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
                            O que está
                            <br />
                            <span className="italic text-accent">freando</span>{" "}
                            os pagamentos
                            <br />
                            da OAB-SP hoje.
                        </h2>
                        <p className="mt-6 max-w-md text-base text-muted-foreground">
                            A partir das telas atuais do portal de Anuidade,
                            identificamos seis lacunas críticas de UX e
                            confiança que afetam diretamente a taxa de
                            conversão e o índice de adimplência.
                        </p>

                        <div className="mt-10 rounded-xl border border-success/30 bg-success/5 p-6">
                            <div className="overline text-success">
                                O que entregamos
                            </div>
                            <ul className="mt-4 space-y-2.5 text-sm">
                                {WINS.map((w) => (
                                    <li
                                        key={w}
                                        className="flex items-center gap-2"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-success" />
                                        {w}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={onJumpToCheckout}
                                data-testid="problem-cta"
                                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                            >
                                Ver checkout em ação
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {PAINS.map((p, i) => (
                                <motion.div
                                    key={p.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{
                                        duration: 0.45,
                                        delay: i * 0.06,
                                    }}
                                    className="rounded-xl border border-border bg-card/60 p-6 lift-on-hover"
                                >
                                    <div className="font-mono text-xs text-accent">
                                        0{i + 1}
                                    </div>
                                    <div className="mt-3 font-serif text-xl tracking-tight">
                                        {p.title}
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {p.body}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
