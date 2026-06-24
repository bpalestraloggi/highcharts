import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { jsPDF } from "jspdf";
import {
    CheckCircle2,
    Download,
    Mail,
    Receipt,
    RotateCcw,
    Share2,
} from "lucide-react";
import { toast } from "sonner";
import { ANUIDADE, LAWYER, formatBRL } from "@/lib/checkout-data";
import { useCheckout } from "@/contexts/CheckoutContext";

export default function SuccessScreen() {
    const { confirmationCode, totalDue, paymentMethod, parcelas, installment, reset } =
        useCheckout();
    const launched = useRef(false);

    useEffect(() => {
        if (launched.current) return;
        launched.current = true;
        const c = (opts) =>
            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.4 },
                colors: ["#0A2540", "#C8102E", "#F8FAFC", "#94A3B8"],
                ...opts,
            });
        c();
        setTimeout(() => c({ angle: 60, origin: { x: 0, y: 0.5 } }), 200);
        setTimeout(() => c({ angle: 120, origin: { x: 1, y: 0.5 } }), 400);
    }, []);

    const methodLabel =
        paymentMethod === "pix"
            ? "PIX"
            : paymentMethod === "credit"
                ? `Cartão de Crédito · ${parcelas}× ${parcelas > 1 ? `de ${formatBRL(installment.per)}` : ""}`
                : paymentMethod === "debit"
                    ? "Cartão de Débito"
                    : paymentMethod === "boleto"
                        ? "Boleto Bancário"
                        : paymentMethod === "bank-debit"
                            ? "Débito em Conta"
                            : "Apple Pay / Google Pay";

    const handleDownloadPDF = () => {
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const W = doc.internal.pageSize.getWidth();

        // Header
        doc.setFillColor(10, 37, 64);
        doc.rect(0, 0, W, 90, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("OAB · SP", 40, 50);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Ordem dos Advogados do Brasil — Seccional São Paulo", 40, 68);
        doc.setFontSize(9);
        doc.text("COMPROVANTE OFICIAL DE PAGAMENTO", W - 40, 50, { align: "right" });
        doc.setTextColor(200, 16, 46);
        doc.text("Anuidade 2026", W - 40, 68, { align: "right" });

        // Body
        doc.setTextColor(10, 37, 64);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Pagamento confirmado", 40, 140);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 90, 110);
        doc.text(
            "Este documento comprova o pagamento integral da anuidade 2026 junto à OAB-SP.",
            40,
            162
        );

        let y = 210;
        const row = (k, v) => {
            doc.setFont("helvetica", "bold");
            doc.setTextColor(80, 90, 110);
            doc.setFontSize(9);
            doc.text(k.toUpperCase(), 40, y);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(10, 37, 64);
            doc.setFontSize(12);
            doc.text(v, 40, y + 16);
            y += 44;
        };
        row("Inscrito", LAWYER.name);
        row("OAB/SP", LAWYER.oabNumber);
        row("Forma de pagamento", methodLabel);
        row("Total pago", formatBRL(totalDue));
        row("Código de confirmação", confirmationCode || "—");
        row("Data/Hora", new Date().toLocaleString("pt-BR"));

        // Footer
        doc.setDrawColor(200, 200, 210);
        doc.line(40, 720, W - 40, 720);
        doc.setFontSize(9);
        doc.setTextColor(120, 130, 150);
        doc.text(
            "Documento gerado eletronicamente. Verificável em oabsp.org.br/comprovante",
            40,
            740
        );
        doc.text(`Código: ${confirmationCode}`, W - 40, 740, { align: "right" });

        doc.save(`comprovante-anuidade-${ANUIDADE.year}.pdf`);
        toast.success("Comprovante PDF gerado");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            {/* Animated check */}
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-success/10">
                <motion.svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="draw-check"
                >
                    <circle
                        cx="28"
                        cy="28"
                        r="26"
                        stroke="hsl(var(--success))"
                        strokeWidth="2"
                        opacity="0.5"
                    />
                    <path
                        d="M16 28.5L25 37.5L41 19.5"
                        stroke="hsl(var(--success))"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </motion.svg>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-success">
                <CheckCircle2 className="h-3 w-3" />
                Pagamento confirmado
            </div>

            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
                Anuidade 2026 quitada
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Tudo certo, Dr. Ricardo. Sua adimplência foi atualizada no
                cadastro institucional da OAB-SP.
            </p>

            {/* Receipt card */}
            <div className="mx-auto mt-10 max-w-xl">
                <div className="glass-card rounded-2xl p-7 text-left">
                    <div className="flex items-center justify-between">
                        <div className="overline">Comprovante</div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                            {confirmationCode}
                        </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-5 text-sm">
                        <div>
                            <div className="overline">Inscrito</div>
                            <div className="mt-1">{LAWYER.name}</div>
                            <div className="font-mono text-xs text-muted-foreground">
                                {LAWYER.oabNumber}
                            </div>
                        </div>
                        <div>
                            <div className="overline">Forma de pagamento</div>
                            <div className="mt-1">{methodLabel}</div>
                        </div>
                        <div>
                            <div className="overline">Data</div>
                            <div className="mt-1">
                                {new Date().toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="overline">Total pago</div>
                            <div className="num-display mt-1 text-3xl">
                                {formatBRL(totalDue).replace("R$", "R$ ")}
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <button
                            data-testid="download-receipt-button"
                            onClick={handleDownloadPDF}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                        >
                            <Download className="h-4 w-4" /> Baixar PDF
                        </button>
                        <button
                            data-testid="email-receipt-button"
                            onClick={() => toast.success("Comprovante enviado por e-mail")}
                            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-all hover:border-foreground/30"
                        >
                            <Mail className="h-4 w-4" /> Enviar por e-mail
                        </button>
                        <button
                            data-testid="share-receipt-button"
                            onClick={() => toast.success("Link copiado")}
                            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-all hover:border-foreground/30"
                        >
                            <Share2 className="h-4 w-4" /> Compartilhar
                        </button>
                    </div>
                </div>

                <button
                    data-testid="restart-flow"
                    onClick={reset}
                    className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                    <RotateCcw className="h-3 w-3" /> Reiniciar simulação
                </button>
            </div>
        </motion.div>
    );
}
