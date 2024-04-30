import { PaymentMethodValues } from "~/utils/constant";
import CryptoPayment from "./Crypto/CryptoPayment";
import CreditCardPayment from "./CreditCard/CreditCardPayment";

interface CheckoutDetailsProps {
    setIsOpen: (isOpen: boolean) => void,
    paymentMethod: PaymentMethodValues
}

export default function CheckoutDetails({ setIsOpen, paymentMethod }: CheckoutDetailsProps) {
    if (paymentMethod === PaymentMethodValues.CRYPTO) {
        return <CryptoPayment setIsOpen={setIsOpen} />;
    }

    return (
        <>
            <CreditCardPayment setIsOpen={setIsOpen} />
        </>
    )
}