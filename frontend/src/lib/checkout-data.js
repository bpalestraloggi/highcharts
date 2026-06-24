// Mock data + helpers for the OAB-SP Anuidade 2026 checkout prototype.

export const LAWYER = {
    name: "Dr. Ricardo Almeida Souza",
    oabNumber: "OAB/SP 123.456",
    cpf: "***.456.789-**",
    email: "ricardo.souza@advocacia.com.br",
    phone: "(11) 9 8765-4321",
    category: "Advogado(a) Inscrito(a)",
    inscricaoAno: 2014,
    seccional: "São Paulo",
};

export const ANUIDADE = {
    year: 2026,
    baseValue: 1010.05,         // valor cheio
    discountValue: 909.04,      // até 23/01/2026
    discountPercent: 10,
    dueDateDiscount: "23/01/2026",
    dueDateFull: "31/03/2026",
};

export const PIX_KEY = "anuidade2026@oabsp.org.br";
export const PIX_PAYLOAD =
    "00020126580014BR.GOV.BCB.PIX0136anuidade2026@oabsp.org.br5204000053039865802BR5913OAB-SP6009SAO PAULO62070503***6304F4C8";

export const BOLETO_LINE =
    "23793.39001 60000.000016 12345.678907 1 99990000090904";

export function formatBRL(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(value);
}

export function formatBRLCompact(value) {
    return formatBRL(value).replace("R$", "R$ ");
}

// Credit card installment calculation (mock: progressive interest after 3x)
export function calcInstallment(value, parcelas) {
    if (parcelas <= 3) {
        const per = value / parcelas;
        return { per, total: value, interestPct: 0 };
    }
    // 1.99% a.m. compounded — simplified flat-equivalent for prototype clarity
    const monthRate = 0.0199;
    const total = value * Math.pow(1 + monthRate, parcelas - 3);
    const per = total / parcelas;
    return {
        per,
        total,
        interestPct: ((total / value - 1) * 100),
    };
}

export const BANKS = [
    { id: "itau", name: "Itaú Unibanco", short: "Itaú", color: "#EC7000" },
    { id: "bb", name: "Banco do Brasil", short: "BB", color: "#FFEF38" },
    { id: "bradesco", name: "Bradesco", short: "Bradesco", color: "#CC092F" },
    { id: "santander", name: "Santander", short: "Santander", color: "#EC0000" },
    { id: "caixa", name: "Caixa Econômica", short: "Caixa", color: "#1B5E9F" },
    { id: "nubank", name: "Nubank", short: "Nubank", color: "#820AD1" },
];

export const PAYMENT_METHODS = [
    {
        id: "pix",
        name: "PIX",
        tagline: "Confirmação instantânea",
        badge: "Recomendado",
        savings: "Economia de R$ 101,01",
    },
    {
        id: "credit",
        name: "Cartão de crédito",
        tagline: "Em até 12x · com simulador",
        badge: null,
    },
    {
        id: "debit",
        name: "Cartão de débito",
        tagline: "Débito à vista",
        badge: null,
    },
    {
        id: "boleto",
        name: "Boleto bancário",
        tagline: "Compensação em 1–2 dias úteis",
        badge: null,
    },
    {
        id: "bank-debit",
        name: "Débito em conta",
        tagline: "Vínculo direto com seu banco",
        badge: null,
    },
    {
        id: "wallet",
        name: "Apple Pay · Google Pay",
        tagline: "Pagamento em um toque",
        badge: "Novo",
    },
];

export const STEPS = [
    { id: "identification", label: "Identificação", short: "01" },
    { id: "payment", label: "Pagamento", short: "02" },
    { id: "confirmation", label: "Confirmação", short: "03" },
];

export function maskCardNumber(value) {
    const digits = value.replace(/\D/g, "").slice(0, 19);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function maskExpiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length < 3) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function maskCVC(value) {
    return value.replace(/\D/g, "").slice(0, 4);
}
