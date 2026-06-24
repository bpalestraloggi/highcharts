import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Download,
    FileText,
    Loader2,
    Moon,
    Presentation,
    Scale,
    Sun,
} from "lucide-react";
import { toast } from "sonner";
import { exportPageToPDF } from "@/lib/export-pdf";
import { usePresentation } from "@/contexts/PresentationContext";

export default function PageActionsHeader({ proposal = false }) {
    const [dark, setDark] = useState(false);
    const [exporting, setExporting] = useState(false);
    const { active: presenting, toggle: togglePresent } = usePresentation();
    const location = useLocation();

    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [dark]);

    const handleExportPDF = async () => {
        if (exporting) return;
        setExporting(true);
        const tid = toast.loading("Gerando PDF da página…");
        try {
            await exportPageToPDF({
                filename: proposal
                    ? "oab-sp-proposta-executiva.pdf"
                    : "oab-sp-checkout-prototipo.pdf",
                onProgress: ({ progress }) => {
                    toast.loading(
                        `Gerando PDF · ${Math.round(progress * 100)}%`,
                        { id: tid }
                    );
                },
            });
            toast.success("PDF gerado com sucesso", { id: tid });
        } catch (e) {
            console.error(e);
            toast.error("Não foi possível gerar o PDF", { id: tid });
        } finally {
            setExporting(false);
        }
    };

    return (
        <header
            data-testid="site-header"
            data-pdf-hide={presenting ? "true" : null}
            className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4 sm:px-8 lg:px-12">
                <Link
                    to="/"
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
                        <span className="overline mt-0.5">
                            {proposal ? "Proposta executiva" : "Anuidade 2026"}
                        </span>
                    </div>
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {!proposal ? (
                        <>
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
                            <Link
                                to="/proposta"
                                data-testid="nav-proposal"
                                className="text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                            >
                                Proposta →
                            </Link>
                        </>
                    ) : (
                        <>
                            <a
                                href="#roi"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                ROI
                            </a>
                            <a
                                href="#market"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Benchmark
                            </a>
                            <a
                                href="#timeline"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Cronograma
                            </a>
                            <a
                                href="#investment"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Investimento
                            </a>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        data-testid="export-pdf"
                        onClick={handleExportPDF}
                        disabled={exporting}
                        className="hidden items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-foreground/30 disabled:opacity-60 sm:inline-flex"
                        title="Exportar página em PDF"
                    >
                        {exporting ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Download className="h-3.5 w-3.5" />
                        )}
                        PDF
                    </button>

                    <button
                        data-testid="present-toggle"
                        onClick={togglePresent}
                        className={[
                            "hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:inline-flex",
                            presenting
                                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                                : "border border-border bg-card/60 text-foreground hover:border-foreground/30",
                        ].join(" ")}
                        title="Modo apresentação"
                    >
                        <Presentation className="h-3.5 w-3.5" />
                        {presenting ? "Sair" : "Apresentar"}
                    </button>

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

                    {proposal ? (
                        <Link
                            to="/"
                            data-testid="header-back-to-prototype"
                            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:inline-flex"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            Protótipo
                        </Link>
                    ) : (
                        <Link
                            to="/proposta"
                            data-testid="header-cta-proposal"
                            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:inline-flex"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            Ver proposta
                        </Link>
                    )}
                </div>
            </div>
            {/* Hidden marker for current path - useful for dev */}
            <span hidden data-current-path={location.pathname} />
        </header>
    );
}
