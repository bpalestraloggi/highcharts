import { motion } from "framer-motion";
import {
    BadgeCheck,
    Lock,
    ShieldCheck,
    Sparkles,
    TrendingDown,
} from "lucide-react";
import { ANUIDADE, formatBRL } from "@/lib/checkout-data";
import { useCheckout } from "@/contexts/CheckoutContext";

export default function OrderSummary({ sticky = true }) {
    const { totalDue, useDiscount, setUseDiscount, parcelas, paymentMethod, installment } =
        useCheckout();

    const showInstallment = paymentMethod === "credit" && parcelas > 1;
    const savings = ANUIDADE.baseValue - ANUIDADE.discountValue;

    return (
        <aside
            data-testid="order-summary"
            className={[
                sticky ? "lg:sticky lg:top-28" : "",
                "h-fit w-full",
            ].join(" ")}
        >
            <div className="glass-card rounded-2xl p-7">
                <div className="flex items-center justify-between">
                    <div className="overline">Resumo do pedido</div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                        #ANU-2026
                    </span>
                </div>

                <div className="mt-6">
                    <div className="font-serif text-2xl tracking-tight">
                        Anuidade {ANUIDADE.year}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                        OAB Seccional São Paulo · Advogado(a) Inscrito(a)
                    </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Valor da anuidade
                        </span>
                        <span
                            className={[
                                "font-mono",
                                useDiscount && "line-through text-muted-foreground/60",
                            ].join(" ")}
                        >
                            {formatBRL(ANUIDADE.baseValue)}
                        </span>
                    </div>
                    {useDiscount && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between text-accent"
                        >
                            <span className="inline-flex items-center gap-1.5">
                                <TrendingDown className="h-3.5 w-3.5" />
                                Desconto antecipação ({ANUIDADE.discountPercent}%)
                            </span>
                            <span className="font-mono">
                                − {formatBRL(savings)}
                            </span>
                        </motion.div>
                    )}
                </div>

                <div className="my-6 divider-line" />

                <div className="flex items-baseline justify-between">
                    <span className="overline">Total</span>
                    <motion.div
                        key={totalDue}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="num-display text-right text-4xl"
                    >
                        {formatBRL(totalDue).replace("R$", "R$ ")}
                    </motion.div>
                </div>

                {showInstallment && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 rounded-md bg-secondary/70 px-4 py-3 text-sm"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                {parcelas}× no cartão
                            </span>
                            <span className="font-mono font-semibold">
                                {formatBRL(installment.per)}
                            </span>
                        </div>
                        {installment.interestPct > 0 && (
                            <div className="mt-1 text-[11px] text-muted-foreground">
                                Juros: {installment.interestPct.toFixed(2)}% no
                                total · {formatBRL(installment.total)}
                            </div>
                        )}
                    </motion.div>
                )}

                <button
                    data-testid="toggle-discount"
                    onClick={() => setUseDiscount((d) => !d)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border bg-transparent px-4 py-2.5 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    {useDiscount
                        ? "Pagar até " + ANUIDADE.dueDateFull + " (sem desconto)"
                        : "Aplicar desconto até " + ANUIDADE.dueDateDiscount}
                </button>

                <div className="mt-7 space-y-2.5 border-t border-border/70 pt-5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-success" />
                        Pagamento processado por gateway certificado
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-success" />
                        Conexão TLS 1.3 · dados criptografados
                    </div>
                    <div className="flex items-center gap-2">
                        <BadgeCheck className="h-3.5 w-3.5 text-success" />
                        Selo institucional OAB-SP · LGPD
                    </div>
                </div>
            </div>
        </aside>
    );
}
