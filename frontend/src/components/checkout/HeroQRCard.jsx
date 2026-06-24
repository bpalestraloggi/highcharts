import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, QrCode, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function HeroQRCard() {
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(window.location.origin + "/");
        }
    }, []);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copiado");
        } catch {
            toast.error("Não foi possível copiar");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 inline-flex items-center gap-5 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
            data-testid="hero-qr-card"
        >
            <div className="rounded-md bg-white p-2 shadow-sm">
                <QRCodeSVG
                    value={url || "https://oab-checkout.preview.emergentagent.com"}
                    size={88}
                    level="M"
                    bgColor="#FFFFFF"
                    fgColor="#0A2540"
                />
            </div>
            <div>
                <div className="overline flex items-center gap-1.5">
                    <Smartphone className="h-3 w-3 text-accent" />
                    Escaneie e navegue no celular
                </div>
                <p className="mt-2 max-w-[220px] text-sm leading-snug text-muted-foreground">
                    Aponte a câmera durante a reunião — abre o protótipo no
                    dispositivo da diretoria.
                </p>
                <button
                    data-testid="hero-qr-copy"
                    onClick={onCopy}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors hover:text-accent"
                >
                    <Copy className="h-3 w-3" /> Copiar link
                </button>
            </div>
        </motion.div>
    );
}
