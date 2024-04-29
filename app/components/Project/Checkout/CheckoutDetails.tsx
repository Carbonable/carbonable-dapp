import { PaymentMethodValues } from "~/utils/constant";
import CryptoPayment from "./CryptoPayment";

export default function CheckoutDetails({ setIsOpen, paymentMethod }: {setIsOpen: (isOpen: boolean) => void, paymentMethod: PaymentMethodValues}) {
    if (paymentMethod === PaymentMethodValues.CRYPTO) {
        return <CryptoPayment setIsOpen={setIsOpen} />;
    }

    return (
        <></>
    )
}