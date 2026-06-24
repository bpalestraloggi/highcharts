import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STEPS } from "@/lib/checkout-data";
import { useCheckout } from "@/contexts/CheckoutContext";

export default function Stepper() {
    const { step } = useCheckout();

    return (
        <div data-testid="checkout-stepper" className="mb-8">
            <div className="flex items-center gap-2 sm:gap-4">
                {STEPS.map((s, i) => {
                    const active = i === step;
                    const done = i < step;
                    return (
                        <div
                            key={s.id}
                            className="flex flex-1 items-center gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <motion.div
                                    layout
                                    className={[
                                        "step-dot border",
                                        done
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : active
                                                ? "border-accent bg-accent text-accent-foreground"
                                                : "border-border bg-card text-muted-foreground",
                                    ].join(" ")}
                                    data-testid={`step-dot-${s.id}`}
                                >
                                    {done ? (
                                        <Check className="h-4 w-4" strokeWidth={2.5} />
                                    ) : (
                                        <span className="font-mono text-xs">
                                            {s.short}
                                        </span>
                                    )}
                                </motion.div>
                                <div className="hidden sm:block">
                                    <div className="overline">
                                        Passo {i + 1}
                                    </div>
                                    <div
                                        className={[
                                            "text-sm font-semibold tracking-tight",
                                            active || done
                                                ? "text-foreground"
                                                : "text-muted-foreground",
                                        ].join(" ")}
                                    >
                                        {s.label}
                                    </div>
                                </div>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className="relative h-px flex-1 bg-border">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: done
                                                ? "100%"
                                                : active
                                                    ? "50%"
                                                    : 0,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeOut",
                                        }}
                                        className="absolute inset-y-0 left-0 bg-accent"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
