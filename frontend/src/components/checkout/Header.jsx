import { useEffect, useState } from "react";
import { Moon, Sun, Scale, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({ onScrollToCheckout }) {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [dark]);

    return (
        <header
            data-testid="site-header"
            className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
                <a
                    href="#top"
                    className="flex items-center gap-3 group"
                    data-testid="header-logo"
                >
                    <span className="relative grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
                        <Scale className="h-5 w-5" strokeWidth={1.5} />
                        <span className="absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 w-5 bg-accent" />
                    </span>
                    <div className="flex flex-col leading-none">
                        <span className="font-serif text-xl tracking-tight">
                            OAB<span className="text-accent">·</span>SP
                        </span>
                        <span className="overline mt-0.5">Anuidade 2026</span>
                    </div>
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    <a
                        href="#problem"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Diagnóstico
                    </a>
                    <a
                        href="#checkout"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Checkout
                    </a>
                    <a
                        href="#comparison"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Antes & Depois
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        data-testid="theme-toggle"
                        onClick={() => setDark((d) => !d)}
                        aria-label="Alternar tema"
                        className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:border-foreground/40 hover:bg-card"
                    >
                        <motion.span
                            key={dark ? "moon" : "sun"}
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {dark ? (
                                <Sun className="h-4 w-4" strokeWidth={1.6} />
                            ) : (
                                <Moon className="h-4 w-4" strokeWidth={1.6} />
                            )}
                        </motion.span>
                    </button>
                    <button
                        data-testid="header-cta"
                        onClick={onScrollToCheckout}
                        className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:inline-flex"
                    >
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                        Ver protótipo
                    </button>
                </div>
            </div>
        </header>
    );
}
