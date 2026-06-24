import { Linkedin, Mail, Scale } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border/60 bg-background">
            <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                                <Scale className="h-4 w-4" strokeWidth={1.6} />
                            </span>
                            <div className="font-serif text-lg">
                                OAB·SP <span className="text-muted-foreground">— Checkout 2026</span>
                            </div>
                        </div>
                        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                            Protótipo confidencial elaborado para apresentação
                            à Diretoria da Seccional São Paulo. Dados
                            ilustrativos.
                        </p>
                    </div>

                    <div>
                        <div className="overline">Navegação</div>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li>
                                <a
                                    href="#problem"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Diagnóstico
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#checkout"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Protótipo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#comparison"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Antes & Depois
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="overline">Contato</div>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li>
                                <a
                                    href="mailto:proposta@oabsp.org.br"
                                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Mail className="h-3.5 w-3.5" /> proposta@oabsp.org.br
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Linkedin className="h-3.5 w-3.5" /> Proposta no LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
                    <span>
                        © {new Date().getFullYear()} OAB-SP · Documento de
                        apresentação · Uso restrito
                    </span>
                    <span className="font-mono">v1.0 · Protótipo</span>
                </div>
            </div>
        </footer>
    );
}
