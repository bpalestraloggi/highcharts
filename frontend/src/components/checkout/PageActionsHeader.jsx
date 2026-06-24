import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Download,
    FileText,
    Loader2,
    Menu,
    Moon,
    Presentation,
    Sun,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { exportPageToPDF } from "@/lib/export-pdf";
import { usePresentation } from "@/contexts/PresentationContext";
import OABLogo from "./OABLogo";

export default function PageActionsHeader({ proposal = false }) {
    const [dark, setDark] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { active: presenting, toggle: togglePresent } = usePresentation();
    const location = useLocation();

    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [dark]);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

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

    const navLinks = proposal
        ? [
              { href: "#roi", label: "ROI" },
              { href: "#market", label: "Benchmark" },
              { href: "#timeline", label: "Cronograma" },
              { href: "#investment", label: "Investimento" },
          ]
        : [
              { href: "#problem", label: "Diagnóstico" },
              { href: "#checkout", label: "Checkout" },
              { href: "#comparison", label: "Antes & Depois" },
          ];

    return (
        <header
            data-testid="site-header"
            data-pdf-hide={presenting ? "true" : null}
            className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4 sm:gap-3 lg:px-12">
                <Link
                    to="/"
                    className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
                    data-testid="header-logo"
                >
                    <OABLogo size={40} />
                    <div className="flex flex-col leading-none min-w-0">
                        <span className="font-serif text-lg tracking-tight sm:text-xl">
                            Anuidade <span className="text-accent">2026</span>
                        </span>
                        <span className="overline mt-0.5 truncate">
                            {proposal ? "Proposta executiva" : "Checkout institucional"}
                        </span>
                    </div>
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {l.label}
                        </a>
                    ))}
                    {!proposal && (
                        <Link
                            to="/proposta"
                            data-testid="nav-proposal"
                            className="text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                        >
                            Proposta →
                        </Link>
                    )}
                </nav>

                <div className="flex items-center gap-1.5 sm:gap-2">
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
                        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:border-foreground/40 hover:bg-card sm:h-10 sm:w-10"
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
                            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:inline-flex"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            Protótipo
                        </Link>
                    ) : (
                        <Link
                            to="/proposta"
                            data-testid="header-cta-proposal"
                            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:inline-flex"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            Ver proposta
                        </Link>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        data-testid="mobile-menu-toggle"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:border-foreground/40 sm:hidden"
                    >
                        {mobileOpen ? (
                            <X className="h-4 w-4" />
                        ) : (
                            <Menu className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl sm:hidden"
                    data-testid="mobile-menu"
                >
                    <div className="space-y-1 px-4 py-4">
                        {navLinks.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                            >
                                {l.label}
                            </a>
                        ))}

                        <div className="my-3 h-px bg-border/60" />

                        {proposal ? (
                            <Link
                                to="/"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                            >
                                <FileText className="h-4 w-4" />
                                Voltar ao protótipo
                            </Link>
                        ) : (
                            <Link
                                to="/proposta"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                            >
                                <FileText className="h-4 w-4" />
                                Ver proposta executiva
                            </Link>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    handleExportPDF();
                                }}
                                disabled={exporting}
                                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/60 px-3 py-2.5 text-xs font-semibold disabled:opacity-60"
                            >
                                <Download className="h-3.5 w-3.5" />
                                Exportar PDF
                            </button>
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    togglePresent();
                                }}
                                className={[
                                    "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold",
                                    presenting
                                        ? "bg-accent text-accent-foreground"
                                        : "border border-border bg-card/60",
                                ].join(" ")}
                            >
                                <Presentation className="h-3.5 w-3.5" />
                                {presenting ? "Sair" : "Apresentar"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
}
