import { Toaster } from "@/components/ui/sonner";
import { CheckoutProvider } from "@/contexts/CheckoutContext";
import { PresentationProvider } from "@/contexts/PresentationContext";
import PageActionsHeader from "@/components/checkout/PageActionsHeader";
import Hero from "@/components/checkout/Hero";
import ProblemSection from "@/components/checkout/ProblemSection";
import CheckoutSection from "@/components/checkout/CheckoutSection";
import ComparisonSection from "@/components/checkout/ComparisonSection";
import Footer from "@/components/checkout/Footer";
import PresentationControls from "@/components/checkout/PresentationControls";

const SECTIONS = [
    { id: "top", label: "Abertura" },
    { id: "problem", label: "Diagnóstico" },
    { id: "checkout", label: "Checkout" },
    { id: "comparison", label: "Antes & Depois" },
];

function ShowcaseContent() {
    const scrollToCheckout = () => {
        const el = document.getElementById("checkout");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="relative isolate min-h-screen" data-pdf-root>
            <PageActionsHeader />
            <main data-testid="showcase-main">
                <Hero onCta={scrollToCheckout} />
                <ProblemSection onJumpToCheckout={scrollToCheckout} />
                <CheckoutSection />
                <ComparisonSection onCta={scrollToCheckout} />
            </main>
            <Footer />
            <PresentationControls />
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: "hsl(var(--card))",
                        color: "hsl(var(--foreground))",
                        border: "1px solid hsl(var(--border))",
                        fontFamily: "Hanken Grotesk, sans-serif",
                    },
                }}
            />
        </div>
    );
}

export default function CheckoutShowcase() {
    return (
        <CheckoutProvider>
            <PresentationProvider sections={SECTIONS}>
                <ShowcaseContent />
            </PresentationProvider>
        </CheckoutProvider>
    );
}
