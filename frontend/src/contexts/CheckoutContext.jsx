import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
    ANUIDADE,
    LAWYER,
    calcInstallment,
} from "@/lib/checkout-data";

const CheckoutContext = createContext(null);

const initialBilling = {
    fullName: LAWYER.name,
    email: LAWYER.email,
    phone: LAWYER.phone,
    cpf: LAWYER.cpf,
    cep: "01310-100",
    street: "Av. Paulista",
    number: "1100",
    complement: "12º andar",
    city: "São Paulo",
    state: "SP",
};

export function CheckoutProvider({ children }) {
    const [flowMode, setFlowMode] = useState("multi"); // 'multi' | 'single'
    const [step, setStep] = useState(0); // 0-2
    const [paymentMethod, setPaymentMethod] = useState("pix");
    const [parcelas, setParcelas] = useState(1);
    const [billing, setBilling] = useState(initialBilling);
    const [acceptedTerms, setAcceptedTerms] = useState(true);
    const [useDiscount, setUseDiscount] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState(null);

    const totalDue = useDiscount ? ANUIDADE.discountValue : ANUIDADE.baseValue;
    const installment = useMemo(
        () => calcInstallment(totalDue, parcelas),
        [totalDue, parcelas]
    );

    const goNext = useCallback(() => setStep((s) => Math.min(s + 1, 2)), []);
    const goBack = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

    const completePurchase = useCallback(() => {
        const code = `OAB-${Math.floor(100000 + Math.random() * 900000)}-${ANUIDADE.year}`;
        setConfirmationCode(code);
        setCompleted(true);
        setStep(2);
    }, []);

    const reset = useCallback(() => {
        setStep(0);
        setCompleted(false);
        setConfirmationCode(null);
        setPaymentMethod("pix");
        setParcelas(1);
    }, []);

    const value = {
        flowMode,
        setFlowMode,
        step,
        setStep,
        goNext,
        goBack,
        paymentMethod,
        setPaymentMethod,
        parcelas,
        setParcelas,
        billing,
        setBilling,
        acceptedTerms,
        setAcceptedTerms,
        useDiscount,
        setUseDiscount,
        totalDue,
        installment,
        completed,
        confirmationCode,
        completePurchase,
        reset,
    };

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const ctx = useContext(CheckoutContext);
    if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
    return ctx;
}
