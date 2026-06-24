import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Presentation } from "lucide-react";
import { usePresentation } from "@/contexts/PresentationContext";

export default function PresentationControls() {
    const { active, toggle, index, total, sections, next, prev, goTo } = usePresentation();

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed left-1/2 bottom-6 z-50 -translate-x-1/2"
                    data-testid="presentation-controls"
                >
                    <div className="glass-card flex items-center gap-2 rounded-full p-2 pl-4">
                        <div className="flex items-center gap-2 pr-2">
                            <Presentation className="h-3.5 w-3.5 text-accent" />
                            <span className="overline">Modo apresentação</span>
                        </div>

                        <div className="h-6 w-px bg-border" />

                        <button
                            data-testid="presentation-prev"
                            onClick={prev}
                            disabled={index === 0}
                            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground transition-all hover:border-foreground/40 active:scale-95 disabled:opacity-40"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-1.5 px-2">
                            {sections.map((s, i) => (
                                <button
                                    key={s.id ?? s.label ?? i}
                                    onClick={() => goTo(i)}
                                    data-testid={`presentation-dot-${i}`}
                                    aria-label={`Slide ${i + 1}`}
                                    className={[
                                        "h-1.5 rounded-full transition-all",
                                        i === index
                                            ? "w-7 bg-accent"
                                            : "w-1.5 bg-border hover:bg-foreground/40",
                                    ].join(" ")}
                                />
                            ))}
                        </div>

                        <div className="px-1 font-mono text-xs text-muted-foreground tabular-nums">
                            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </div>

                        <button
                            data-testid="presentation-next"
                            onClick={next}
                            disabled={index === total - 1}
                            className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40"
                            aria-label="Próximo"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>

                        <div className="h-6 w-px bg-border" />

                        <button
                            data-testid="presentation-exit"
                            onClick={toggle}
                            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-accent hover:text-accent active:scale-95"
                            aria-label="Sair do modo apresentação"
                            title="Esc"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="mt-2 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Use ← → · Espaço · Esc para sair
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
