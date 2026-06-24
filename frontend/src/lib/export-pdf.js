import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Capture the document body into a multi-page A4 PDF.
 * Optionally targets a specific element by id.
 */
export async function exportPageToPDF({
    elementId = null,
    filename = "oab-sp-checkout-proposta.pdf",
    onProgress = () => {},
} = {}) {
    const node = elementId
        ? document.getElementById(elementId)
        : document.querySelector("[data-pdf-root]") || document.body;

    if (!node) throw new Error("Element to export not found");

    onProgress({ stage: "capturing", progress: 0.1 });

    // Force light mode tokens during capture for clean print
    const wasDark = document.documentElement.classList.contains("dark");
    if (wasDark) document.documentElement.classList.remove("dark");

    // Hide overlays/badges during capture
    const badge = document.getElementById("emergent-badge");
    const controls = document.querySelector("[data-testid='presentation-controls']");
    const pdfHide = Array.from(document.querySelectorAll("[data-pdf-hide]"));
    const prev = { badge: null, controls: null, pdfHide: [] };
    if (badge) {
        prev.badge = badge.style.display;
        badge.style.display = "none";
    }
    if (controls) {
        prev.controls = controls.style.display;
        controls.style.display = "none";
    }
    pdfHide.forEach((el) => {
        prev.pdfHide.push(el.style.display);
        el.style.display = "none";
    });

    // Wait one frame for repaint
    await new Promise((r) => requestAnimationFrame(() => r()));

    try {
        const canvas = await html2canvas(node, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: "#F8FAFC",
            windowWidth: node.scrollWidth,
            windowHeight: node.scrollHeight,
            scrollX: 0,
            scrollY: -window.scrollY,
            ignoreElements: (el) =>
                el.tagName === "IFRAME" ||
                el.id === "emergent-badge" ||
                el.getAttribute?.("data-pdf-hide") === "true",
        });

        onProgress({ stage: "rendering", progress: 0.6 });

        const imgWidthPx = canvas.width;
        const imgHeightPx = canvas.height;

        const pdf = new jsPDF({
            unit: "pt",
            format: "a4",
            orientation: "portrait",
            compress: true,
        });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();

        const imgWidthPt = pageW;
        const ratio = imgWidthPt / imgWidthPx;
        const imgHeightPt = imgHeightPx * ratio;

        const sliceHeightPx = pageH / ratio;
        let yPx = 0;
        let pageIndex = 0;

        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = imgWidthPx;
        const ctx = sliceCanvas.getContext("2d");

        while (yPx < imgHeightPx) {
            const thisSliceHeight = Math.min(sliceHeightPx, imgHeightPx - yPx);
            sliceCanvas.height = thisSliceHeight;
            ctx.fillStyle = "#F8FAFC";
            ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
            ctx.drawImage(
                canvas,
                0,
                yPx,
                imgWidthPx,
                thisSliceHeight,
                0,
                0,
                imgWidthPx,
                thisSliceHeight
            );
            const dataUrl = sliceCanvas.toDataURL("image/jpeg", 0.92);
            if (pageIndex > 0) pdf.addPage();
            pdf.addImage(
                dataUrl,
                "JPEG",
                0,
                0,
                imgWidthPt,
                thisSliceHeight * ratio,
                undefined,
                "FAST"
            );
            yPx += thisSliceHeight;
            pageIndex++;
            onProgress({
                stage: "rendering",
                progress: 0.6 + 0.4 * (yPx / imgHeightPx),
            });
        }

        pdf.save(filename);
        onProgress({ stage: "done", progress: 1 });
    } finally {
        // Restore overlays
        if (wasDark) document.documentElement.classList.add("dark");
        if (badge) badge.style.display = prev.badge;
        if (controls) controls.style.display = prev.controls;
        pdfHide.forEach((el, i) => {
            el.style.display = prev.pdfHide[i];
        });
    }
}
