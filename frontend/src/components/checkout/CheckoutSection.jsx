import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, ListOrdered } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";
import Stepper from "./Stepper";
import IdentificationStep from "./IdentificationStep";
import PaymentStep from "./PaymentStep";
import SuccessScreen from "./SuccessScreen";
import OrderSummary from "./OrderSummary";

function FlowToggle() {
    const { flowMode, setFlowMode, reset } = useCheckout();
    return (
        <div
            data-testid="flow-toggle"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur"
        >
            {[
                { id: "multi", label: "Multi-step", Icon: ListOrdered },
                { id: "single", label: "Single-page", Icon: LayoutGrid },
            ].map(({ id, label, Icon }) => {
                const active = flowMode === id;
                return (
                    <button
                        key={id}
                        data-testid={`flow-toggle-${id}`}
                        onClick={() => {
                            setFlowMode(id);
                            reset();
                        }}
                        className={[
                            "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                            active
                                ? "text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground",
                        ].join(" ")}
                    >
                        {active && (
                            <motion.span
                                layoutId="flow-toggle-pill"
                                className="absolute inset-0 rounded-full bg-primary"
                                transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 32,
                                }}
                            />
                        )}
                        <span className="relative inline-flex items-center gap-1.5">
                            <Icon className="h-3.5 w-3.5" />
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

function MultiStepFlow() {
    const { step, goNext, goBack, completePurchase, completed } = useCheckout();
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
                <Stepper />
                <div className="glass-card rounded-2xl p-5 sm:p-7 lg:p-10">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <IdentificationStep
                                key="id"
                                onContinue={goNext}
                            />
                        )}
                        {step === 1 && !completed && (
                            <PaymentStep
                                key="pay"
                                onBack={goBack}
                                onConfirm={completePurchase}
                            />
                        )}
                        {step === 2 && <SuccessScreen key="ok" />}
                    </AnimatePresence>
                </div>
            </div>
            <div className="lg:col-span-4">
                <OrderSummary />
            </div>
        </div>
    );
}

function SinglePageFlow() {
    const { completePurchase, completed } = useCheckout();
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8 space-y-10">
                <div className="glass-card rounded-2xl p-5 sm:p-7 lg:p-10">
                    <AnimatePresence mode="wait">
                        {!completed ? (
                            <motion.div
                                key="full"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <IdentificationStep onContinue={() => {}} />
                                <div className="my-12 divider-line" />
                                <PaymentStep onConfirm={completePurchase} />
                            </motion.div>
                        ) : (
                            <SuccessScreen key="ok" />
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="lg:col-span-4">
                <OrderSummary />
            </div>
        </div>
    );
}

export default function CheckoutSection() {
    const { flowMode } = useCheckout();

    return (
        <section
            id="checkout"
            className="relative border-t border-border/60 bg-background"
        >
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <div className="pill-tag">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            Protótipo interativo
                        </div>
                        <h2 className="mt-5 font-serif text-3xl tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
                            Experimente os dois fluxos
                        </h2>
                        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
                            Alterne entre o fluxo multi-etapas (recomendado
                            para mobile) e o fluxo single-page (recomendado
                            para desktop). Todos os dados são mocados.
                        </p>
                    </div>
                    <FlowToggle />
                </div>

                <div className="mt-10 sm:mt-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={flowMode}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45 }}
                        >
                            {flowMode === "multi" ? (
                                <MultiStepFlow />
                            ) : (
                                <SinglePageFlow />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
