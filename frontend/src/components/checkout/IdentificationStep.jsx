import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LAWYER } from "@/lib/checkout-data";
import { useCheckout } from "@/contexts/CheckoutContext";

function Field({ label, id, value, onChange, placeholder, hint, type = "text", disabled }) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {label}
            </Label>
            <Input
                id={id}
                data-testid={`field-${id}`}
                type={type}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className="h-12 rounded-md border-border bg-card/60 px-4 text-base focus-visible:ring-1 focus-visible:ring-primary"
            />
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
    );
}

export default function IdentificationStep({ onContinue }) {
    const { billing, setBilling } = useCheckout();
    const update = (k) => (v) => setBilling((b) => ({ ...b, [k]: v }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="mb-8 flex items-start gap-4">
                <span className="accent-line mt-3" />
                <div>
                    <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                        Confirme sua identificação
                    </h2>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                        Pré-preenchemos seus dados a partir do cadastro
                        institucional OAB-SP. Confirme se está tudo certo antes
                        de seguir para o pagamento.
                    </p>
                </div>
            </div>

            {/* Lawyer card */}
            <div
                data-testid="lawyer-card"
                className="glass-card mb-8 flex items-center gap-5 rounded-xl p-5"
            >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                    <span className="font-serif text-xl">RA</span>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-serif text-lg">{LAWYER.name}</span>
                        <BadgeCheck className="h-4 w-4 text-accent" />
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="font-mono">{LAWYER.oabNumber}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span>{LAWYER.category}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span>Inscrição: {LAWYER.inscricaoAno}</span>
                    </div>
                </div>
                <div className="hidden flex-col items-end gap-1 sm:flex">
                    <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-success">
                        Adimplente
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                        CPF {LAWYER.cpf}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                    id="fullName"
                    label="Nome completo"
                    value={billing.fullName}
                    onChange={update("fullName")}
                    disabled
                />
                <Field
                    id="cpf"
                    label="CPF"
                    value={billing.cpf}
                    onChange={update("cpf")}
                    disabled
                />
                <Field
                    id="email"
                    label={<><Mail className="mr-1 inline h-3 w-3" /> E-mail</>}
                    value={billing.email}
                    onChange={update("email")}
                />
                <Field
                    id="phone"
                    label={<><Phone className="mr-1 inline h-3 w-3" /> Telefone</>}
                    value={billing.phone}
                    onChange={update("phone")}
                />
            </div>

            <div className="mt-6">
                <div className="overline mb-3 flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    Endereço de cobrança
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                        <Field
                            id="cep"
                            label="CEP"
                            value={billing.cep}
                            onChange={update("cep")}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <Field
                            id="street"
                            label="Logradouro"
                            value={billing.street}
                            onChange={update("street")}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <Field
                            id="number"
                            label="Nº"
                            value={billing.number}
                            onChange={update("number")}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <Field
                            id="city"
                            label="Cidade"
                            value={billing.city}
                            onChange={update("city")}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <Field
                            id="state"
                            label="UF"
                            value={billing.state}
                            onChange={update("state")}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Field
                            id="complement"
                            label="Complemento"
                            value={billing.complement}
                            onChange={update("complement")}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
                <p className="text-xs text-muted-foreground">
                    Seus dados são protegidos sob a LGPD · Lei nº 13.709/2018.
                </p>
                <button
                    onClick={onContinue}
                    data-testid="continue-to-payment"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                    Continuar para pagamento
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </motion.div>
    );
}
