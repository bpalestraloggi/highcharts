import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const PresentationContext = createContext(null);

export function PresentationProvider({ sections, children }) {
    const [active, setActive] = useState(false);
    const [index, setIndex] = useState(0);

    const total = sections.length;

    const goTo = useCallback(
        (i) => {
            const clamped = Math.max(0, Math.min(total - 1, i));
            setIndex(clamped);
            const target = sections[clamped];
            if (target?.id) {
                const el = document.getElementById(target.id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } else if (target?.href) {
                window.location.href = target.href;
            }
        },
        [sections, total]
    );

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    const toggle = useCallback(() => {
        setActive((a) => {
            const willActivate = !a;
            if (willActivate) {
                setIndex(0);
                setTimeout(() => {
                    const first = sections[0];
                    if (first?.id) {
                        document
                            .getElementById(first.id)
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 50);
            }
            return willActivate;
        });
    }, [sections]);

    // Track scroll position to update current index
    useEffect(() => {
        if (!active) return;
        const onScroll = () => {
            const middle = window.scrollY + window.innerHeight / 3;
            let current = 0;
            sections.forEach((s, i) => {
                const el = s.id ? document.getElementById(s.id) : null;
                if (el && el.offsetTop <= middle) current = i;
            });
            setIndex(current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [active, sections]);

    // Keyboard navigation
    useEffect(() => {
        if (!active) return;
        const onKey = (e) => {
            const target = e.target;
            const tag = target?.tagName?.toLowerCase();
            if (tag === "input" || tag === "textarea" || target?.isContentEditable) return;
            if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
                e.preventDefault();
                next();
            } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
                e.preventDefault();
                prev();
            } else if (e.key === "Escape") {
                e.preventDefault();
                setActive(false);
            } else if (e.key === "Home") {
                e.preventDefault();
                goTo(0);
            } else if (e.key === "End") {
                e.preventDefault();
                goTo(total - 1);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active, next, prev, goTo, total]);

    const value = useMemo(
        () => ({ active, toggle, index, total, sections, next, prev, goTo }),
        [active, toggle, index, total, sections, next, prev, goTo]
    );

    return (
        <PresentationContext.Provider value={value}>
            {children}
        </PresentationContext.Provider>
    );
}

export function usePresentation() {
    const ctx = useContext(PresentationContext);
    if (!ctx) throw new Error("usePresentation must be inside PresentationProvider");
    return ctx;
}
