/**
 * OABLogo — usa o logo oficial OAB-SP baixado de oabsp.org.br/imgs/logo_iso_251030.png
 * O PNG é branco com fundo transparente. Para light mode, exibimos sobre um chip navy.
 */
export default function OABLogo({
    size = 32,
    variant = "chip", // "chip" (white on navy chip) | "mark" (raw) | "inverted" (navy on transparent for light bg)
    className = "",
    "data-testid": testId = "oab-logo",
}) {
    if (variant === "chip") {
        const padding = Math.max(6, Math.round(size * 0.18));
        return (
            <span
                className={[
                    "relative inline-flex items-center justify-center rounded-md bg-primary",
                    className,
                ].join(" ")}
                style={{ width: size, height: size, padding }}
                data-testid={testId}
            >
                <img
                    src="/brand/oab-logo.png"
                    alt="OAB São Paulo"
                    className="block h-full w-full object-contain select-none"
                    draggable={false}
                />
                <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-1/3 -translate-x-1/2 rounded-full bg-accent" />
            </span>
        );
    }

    // raw white logo (best on dark backgrounds)
    if (variant === "mark") {
        return (
            <img
                src="/brand/oab-logo.png"
                alt="OAB São Paulo"
                className={["block select-none", className].join(" ")}
                style={{ height: size }}
                data-testid={testId}
                draggable={false}
            />
        );
    }

    // inverted: applies CSS invert so the white PNG becomes navy on transparent
    return (
        <img
            src="/brand/oab-logo.png"
            alt="OAB São Paulo"
            className={["block select-none [filter:invert(11%)_sepia(53%)_saturate(2300%)_hue-rotate(195deg)_brightness(60%)_contrast(95%)]", className].join(" ")}
            style={{ height: size }}
            data-testid={testId}
            draggable={false}
        />
    );
}
