import { useRef } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CheckoutProvider } from "@/contexts/CheckoutContext";
import Header from "@/components/checkout/Header";
import Hero from "@/components/checkout/Hero";
import ProblemSection from "@/components/checkout/ProblemSection";
import CheckoutSection from "@/components/checkout/CheckoutSection";
import ComparisonSection from "@/components/checkout/ComparisonSection";
import Footer from "@/components/checkout/Footer";

export default function CheckoutShowcase() {
    const checkoutRef = useRef(null);
    const scrollToCheckout = () => {
        const el = document.getElementById("checkout");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <CheckoutProvider>
            <div className="relative isolate min-h-screen">
                <Header onScrollToCheckout={scrollToCheckout} />
                <main ref={checkoutRef} data-testid="showcase-main">
                    <Hero onCta={scrollToCheckout} />
                    <ProblemSection onJumpToCheckout={scrollToCheckout} />
                    <CheckoutSection />
                    <ComparisonSection onCta={scrollToCheckout} />
                </main>
                <Footer />
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        style: {
                            background: "hsl(var(--card))",
                            color: "hsl(var(--foreground))",
                            border: "1px solid hsl(var(--border))",
                            fontFamily: "Manrope, sans-serif",
                        },
                    }}
                />
            </div>
        </CheckoutProvider>
    );
}
