import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
    ArrowRight,
    ArrowLeft,
    Banknote,
    Building2,
    CheckCircle2,
    Copy,
    CreditCard,
    Download,
    Smartphone,
    Wallet,
    Lock,
    Loader2,
    QrCode,
    Apple,
    Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import {
    BANKS,
    BOLETO_LINE,
    PAYMENT_METHODS,
    PIX_KEY,
    PIX_PAYLOAD,
    formatBRL,
    maskCVC,
    maskCardNumber,
    maskExpiry,
} from "@/lib/checkout-data";
import { useCheckout } from "@/contexts/CheckoutContext";

const METHOD_ICON = {
    pix: Zap,
    credit: CreditCard,
    debit: CreditCard,
    boleto: Banknote,
    "bank-debit": Building2,
    wallet: Wallet,
};

function MethodCard({ method, active, onClick }) {
    const Icon = METHOD_ICON[method.id] ?? CreditCard;
    return (
        <button
            data-testid={`payment-method-${method.id}`}
            onClick={onClick}
            className={[
                "group relative flex w-full items-center gap-4 rounded-xl border bg-card/60 p-4 text-left transition-all lift-on-hover",
                active
                    ? "border-primary ring-1 ring-primary/40 shadow-[0_18px_36px_-16px_hsl(var(--primary)/0.3)]"
                    : "border-border",
            ].join(" ")}
        >
            <div
                className={[
                    "grid h-11 w-11 shrink-0 place-items-center rounded-lg transition-colors",
                    active
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground",
                ].join(" ")}
            >
                <Icon className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm tracking-tight">
                        {method.name}
                    </span>
                    {method.badge && (
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                            {method.badge}
                        </span>
                    )}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                    {method.tagline}
                </div>
                {method.savings && active && (
                    <div className="mt-1 text-[11px] font-semibold text-success">
                        {method.savings}
                    </div>
                )}
            </div>
            <div
                className={[
                    "grid h-5 w-5 place-items-center rounded-full border transition-all",
                    active
                        ? "border-primary bg-primary"
                        : "border-border bg-transparent",
                ].join(" ")}
            >
                {active && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-primary-foreground"
                    />
                )}
            </div>
        </button>
    );
}

function CopyButton({ text, label = "Copiar", testid }) {
    const [copied, setCopied] = useState(false);
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            /* noop */
        }
        setCopied(true);
        toast.success("Copiado para a área de transferência");
        setTimeout(() => setCopied(false), 1800);
    };
    return (
        <button
            data-testid={testid}
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-3.5 py-2 text-xs font-semibold transition-all hover:border-foreground/30"
        >
            <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                    <motion.span
                        key="ok"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1.5 text-success"
                    >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Copiado
                    </motion.span>
                ) : (
                    <motion.span
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1.5"
                    >
                        <Copy className="h-3.5 w-3.5" />
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}

function PixPanel() {
    const { totalDue } = useCheckout();
    return (
        <motion.div
            key="pix"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-5"
        >
            <div className="lg:col-span-2">
                <div className="overline mb-3 flex items-center gap-2">
                    <QrCode className="h-3 w-3" /> QR Code PIX
                </div>
                <div className="glass-card relative grid place-items-center rounded-2xl p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-xl bg-white p-4"
                    >
                        <QRCodeSVG
                            value={PIX_PAYLOAD}
                            size={196}
                            level="M"
                            bgColor="#FFFFFF"
                            fgColor="#0A2540"
                        />
                    </motion.div>
                    <div className="mt-4 text-center">
                        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            Expira em
                        </div>
                        <div className="num-display mt-1 text-2xl">14:59</div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-3">
                <div className="overline mb-3">PIX Copia e cola</div>
                <div className="rounded-xl border border-border bg-card/60 p-5">
                    <div className="font-mono text-[11px] leading-relaxed break-all text-muted-foreground">
                        {PIX_PAYLOAD}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <CopyButton
                            text={PIX_PAYLOAD}
                            label="Copiar código PIX"
                            testid="copy-pix-button"
                        />
                        <CopyButton
                            text={PIX_KEY}
                            label="Copiar chave"
                            testid="copy-pix-key"
                        />
                    </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <Li n={1}>Abra o app do seu banco</Li>
                    <Li n={2}>Escolha a opção PIX · Pagar com QR Code</Li>
                    <Li n={3}>Aponte para o QR ou cole o código</Li>
                    <Li n={4}>Confirme o pagamento de {formatBRL(totalDue)}</Li>
                </ul>
            </div>
        </motion.div>
    );
}

function Li({ n, children }) {
    return (
        <li className="flex items-start gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-semibold text-foreground">
                {n}
            </span>
            <span>{children}</span>
        </li>
    );
}

function CardForm({ debit = false }) {
    const { parcelas, setParcelas, totalDue, installment } = useCheckout();
    const [number, setNumber] = useState("4242 4242 4242 4242");
    const [name, setName] = useState("RICARDO A SOUZA");
    const [expiry, setExpiry] = useState("12/29");
    const [cvc, setCvc] = useState("123");

    const last4 = useMemo(
        () => number.replace(/\s/g, "").slice(-4) || "••••",
        [number]
    );
    const brand = useMemo(() => {
        const d = number.replace(/\s/g, "");
        if (d.startsWith("4")) return "VISA";
        if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return "MASTERCARD";
        if (/^3[47]/.test(d)) return "AMEX";
        return "CARD";
    }, [number]);

    return (
        <motion.div
            key={debit ? "debit" : "credit"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-5"
        >
            {/* Card visual */}
            <div className="lg:col-span-2">
                <div className="overline mb-3">Pré-visualização</div>
                <div
                    className="relative aspect-[1.586/1] w-full overflow-hidden rounded-2xl p-6 text-white shadow-[0_24px_48px_-20px_hsl(var(--primary)/0.5)]"
                    style={{
                        background:
                            "linear-gradient(135deg,#0A2540 0%, #14365C 50%, #0A2540 100%)",
                    }}
                >
                    <div className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage:
                                "radial-gradient(ellipse 400px 200px at 80% 0%, rgba(200,16,46,0.5), transparent)",
                        }}
                    />
                    <div className="relative flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="font-serif text-xl tracking-tight">
                                OAB·SP
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.22em] opacity-80">
                                {debit ? "Débito" : "Crédito"}
                            </span>
                        </div>
                        <div>
                            <div className="font-mono text-xl tracking-[0.18em]">
                                •••• •••• •••• {last4}
                            </div>
                            <div className="mt-4 flex items-end justify-between text-[11px] uppercase tracking-wider opacity-90">
                                <div>
                                    <div className="opacity-60">Titular</div>
                                    <div className="mt-1 text-sm normal-case tracking-normal">
                                        {name || "—"}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="opacity-60">Validade</div>
                                    <div className="mt-1 text-sm">{expiry || "—"}</div>
                                </div>
                                <div className="font-serif text-base italic">
                                    {brand}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 space-y-4">
                <Row>
                    <FormField
                        label="Número do cartão"
                        id="card-number"
                        value={number}
                        onChange={(v) => setNumber(maskCardNumber(v))}
                        mono
                    />
                </Row>
                <Row>
                    <FormField
                        label="Nome impresso no cartão"
                        id="card-name"
                        value={name}
                        onChange={(v) => setName(v.toUpperCase())}
                    />
                </Row>
                <Row cols={2}>
                    <FormField
                        label="Validade"
                        id="card-exp"
                        value={expiry}
                        onChange={(v) => setExpiry(maskExpiry(v))}
                        mono
                    />
                    <FormField
                        label="CVC"
                        id="card-cvc"
                        value={cvc}
                        onChange={(v) => setCvc(maskCVC(v))}
                        mono
                    />
                </Row>

                {!debit && (
                    <div className="mt-6 rounded-xl border border-border bg-secondary/50 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="overline">Simulador de parcelas</div>
                                <div className="mt-1 font-serif text-2xl tracking-tight">
                                    {parcelas}× de{" "}
                                    <span className="text-accent">
                                        {formatBRL(installment.per)}
                                    </span>
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    {parcelas <= 3
                                        ? "Sem juros até 3×"
                                        : `Juros embutidos · total ${formatBRL(installment.total)}`}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="overline">À vista</div>
                                <div className="mt-1 font-mono text-sm">
                                    {formatBRL(totalDue)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <Slider
                                data-testid="installment-slider"
                                min={1}
                                max={12}
                                step={1}
                                value={[parcelas]}
                                onValueChange={(v) => setParcelas(v[0])}
                            />
                            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                                {[1, 3, 6, 9, 12].map((n) => (
                                    <span key={n}>{n}×</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function Row({ children, cols = 1 }) {
    return (
        <div
            className={[
                "grid gap-4",
                cols === 2 ? "grid-cols-2" : "grid-cols-1",
            ].join(" ")}
        >
            {children}
        </div>
    );
}

function FormField({ label, id, value, onChange, mono }) {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
                {label}
            </label>
            <input
                id={id}
                data-testid={`field-${id}`}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className={[
                    "h-12 w-full rounded-md border border-border bg-card/60 px-4 text-base outline-none ring-0 transition-all focus:border-primary focus:ring-1 focus:ring-primary",
                    mono && "font-mono tracking-wider",
                ].join(" ")}
            />
        </div>
    );
}

function BoletoPanel() {
    const { totalDue } = useCheckout();
    return (
        <motion.div
            key="boleto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
        >
            <div className="glass-card rounded-2xl p-7">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="overline">Boleto bancário</div>
                        <div className="mt-2 font-serif text-2xl tracking-tight">
                            {formatBRL(totalDue)}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                            Vencimento: 23/01/2026 · Compensação em 1–2 dias
                            úteis
                        </div>
                    </div>
                    <div className="rounded-md bg-secondary p-3">
                        {/* Faux barcode */}
                        <div className="flex h-12 items-center gap-[2px]">
                            {Array.from({ length: 48 }).map((_, i) => (
                                <span
                                    key={i}
                                    className="block bg-foreground"
                                    style={{
                                        width: (i * 13) % 5 === 0 ? 3 : 1,
                                        height: "100%",
                                        opacity: (i * 7) % 3 === 0 ? 1 : 0.7,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-md bg-secondary/70 px-4 py-3 font-mono text-sm tracking-wider">
                    {BOLETO_LINE}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                    <CopyButton
                        text={BOLETO_LINE}
                        label="Copiar linha digitável"
                        testid="copy-boleto-line"
                    />
                    <button
                        data-testid="download-boleto"
                        onClick={() => toast.success("Boleto PDF gerado")}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                    >
                        <Download className="h-3.5 w-3.5" /> Baixar boleto em PDF
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function BankDebitPanel() {
    const [selected, setSelected] = useState("itau");
    return (
        <motion.div
            key="bank-debit"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
        >
            <div className="overline mb-3">Selecione seu banco</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {BANKS.map((b) => {
                    const active = selected === b.id;
                    return (
                        <button
                            key={b.id}
                            data-testid={`bank-${b.id}`}
                            onClick={() => setSelected(b.id)}
                            className={[
                                "flex items-center gap-3 rounded-xl border bg-card/60 p-4 text-left transition-all lift-on-hover",
                                active
                                    ? "border-primary ring-1 ring-primary/40"
                                    : "border-border",
                            ].join(" ")}
                        >
                            <span
                                className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-xs font-bold text-white"
                                style={{ background: b.color }}
                            >
                                {b.short.slice(0, 2).toUpperCase()}
                            </span>
                            <span className="text-sm font-semibold">
                                {b.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
                Ao confirmar, você será redirecionado para o ambiente
                autenticado do seu banco para autorizar o débito em conta.
            </div>
        </motion.div>
    );
}

function WalletPanel() {
    const { totalDue } = useCheckout();
    const [wallet, setWallet] = useState("apple");
    return (
        <motion.div
            key="wallet"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                    { id: "apple", label: "Apple Pay", Icon: Apple },
                    { id: "google", label: "Google Pay", Icon: Smartphone },
                ].map(({ id, label, Icon }) => {
                    const active = wallet === id;
                    return (
                        <button
                            key={id}
                            data-testid={`wallet-${id}`}
                            onClick={() => setWallet(id)}
                            className={[
                                "flex items-center gap-3 rounded-xl border bg-card/60 p-4 transition-all lift-on-hover",
                                active
                                    ? "border-primary ring-1 ring-primary/40"
                                    : "border-border",
                            ].join(" ")}
                        >
                            <span className="grid h-10 w-10 place-items-center rounded-md bg-foreground text-background">
                                <Icon className="h-5 w-5" />
                            </span>
                            <div className="text-left">
                                <div className="font-semibold text-sm">
                                    {label}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Pagamento em um toque
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <button
                data-testid="wallet-confirm"
                onClick={() =>
                    toast.success(
                        `Autenticando ${wallet === "apple" ? "Apple Pay" : "Google Pay"}…`
                    )
                }
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground py-4 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-[0.99]"
            >
                {wallet === "apple" ? (
                    <Apple className="h-4 w-4" />
                ) : (
                    <Smartphone className="h-4 w-4" />
                )}
                Pagar com {wallet === "apple" ? "Apple Pay" : "Google Pay"} ·{" "}
                {formatBRL(totalDue)}
            </button>
        </motion.div>
    );
}

export default function PaymentStep({ onBack, onConfirm }) {
    const { paymentMethod, setPaymentMethod, totalDue, parcelas, installment } =
        useCheckout();
    const [processing, setProcessing] = useState(false);

    const handleConfirm = async () => {
        setProcessing(true);
        await new Promise((r) => setTimeout(r, 1400));
        setProcessing(false);
        onConfirm?.();
    };

    const ctaLabel =
        paymentMethod === "pix"
            ? "Já paguei via PIX"
            : paymentMethod === "boleto"
                ? "Concluir e baixar boleto"
                : paymentMethod === "credit" && parcelas > 1
                    ? `Pagar ${parcelas}× de ${formatBRL(installment.per)}`
                    : `Pagar ${formatBRL(totalDue)}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="mb-8 flex items-start gap-4">
                <span className="accent-line mt-3" />
                <div>
                    <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                        Escolha a forma de pagamento
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Métodos certificados pelos principais adquirentes do
                        mercado. PIX é instantâneo e o método mais recomendado.
                    </p>
                </div>
            </div>

            {/* Method grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PAYMENT_METHODS.map((m) => (
                    <MethodCard
                        key={m.id}
                        method={m}
                        active={paymentMethod === m.id}
                        onClick={() => setPaymentMethod(m.id)}
                    />
                ))}
            </div>

            {/* Panel */}
            <div className="mt-10">
                <AnimatePresence mode="wait">
                    {paymentMethod === "pix" && <PixPanel />}
                    {paymentMethod === "credit" && <CardForm />}
                    {paymentMethod === "debit" && <CardForm debit />}
                    {paymentMethod === "boleto" && <BoletoPanel />}
                    {paymentMethod === "bank-debit" && <BankDebitPanel />}
                    {paymentMethod === "wallet" && <WalletPanel />}
                </AnimatePresence>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
                {onBack ? (
                    <button
                        onClick={onBack}
                        data-testid="back-to-identification"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" /> Voltar
                    </button>
                ) : (
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        Conexão segura · pagamento processado por gateway
                        certificado
                    </span>
                )}
                <button
                    data-testid="confirm-payment-button"
                    disabled={processing}
                    onClick={handleConfirm}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.98] disabled:opacity-70"
                >
                    {processing ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processando…
                        </>
                    ) : (
                        <>
                            {ctaLabel}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
