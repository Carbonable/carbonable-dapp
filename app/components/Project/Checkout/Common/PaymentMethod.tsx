import { CreditCardIcon, WalletIcon } from "@heroicons/react/24/outline";
import { PaymentMethodValues, STRIPE_FEES } from "~/utils/constant";

export default function PaymentMethod({ paymentMethod, setPaymentMethod }: { paymentMethod: PaymentMethodValues, setPaymentMethod: (paymentMethod: PaymentMethodValues) => void}) {
    return (
        <div className="border rounded-lg border-opacityLight-20">
            <div className="flex justify-between bg-opacityLight-5 py-2 px-3">
                <div className="uppercase text-sm flex-grow">Payment Method</div>
            </div>
            <div className="py-4 px-3 border-opacityLight-20">
                <div className="flex items-center">
                    <input 
                        type="radio" 
                        id="crypto" 
                        name="payment_method" 
                        value="crypto" 
                        checked={paymentMethod === "crypto"} 
                        onChange={() => setPaymentMethod(PaymentMethodValues.CRYPTO)}
                        className="w-0 h-0 opacity-0 absolute"
                    />
                    <label 
                        htmlFor="crypto" 
                        className={`flex w-full p-2 items-center justify-start cursor-pointer rounded-lg border border-neutral-600 uppercase text-sm ${paymentMethod === PaymentMethodValues.CRYPTO ? "bg-neutral-100 text-neutral-900" : "bg-opacityLight-5 text-neutral-100 hover:brightness-110"}`}
                    >
                        <WalletIcon className="w-6 mr-2" />
                        Crypto Wallet
                    </label>
                </div>
                <div className="flex items-center mt-2">
                    <input 
                        type="radio" 
                        id="credit_card" 
                        name="payment_method" 
                        value="credit_card" 
                        checked={paymentMethod === "credit_card"} 
                        onChange={() => setPaymentMethod(PaymentMethodValues.CREDIT_CARD)}
                        className="w-0 h-0 opacity-0 absolute"
                    />
                    <label 
                        htmlFor="credit_card" 
                        className={`flex w-full p-2 items-center justify-start cursor-pointer rounded-lg border border-neutral-600 uppercase text-sm ${paymentMethod === PaymentMethodValues.CREDIT_CARD ? "bg-neutral-100 text-neutral-900" : "bg-opacityLight-5 text-neutral-100 hover:brightness-110"}`}
                    >
                        <CreditCardIcon className="w-6 mr-2" />
                        Credit Card <span className="text-xs text-neutral-300 normal-case ml-1"> ({STRIPE_FEES}% fees)</span>
                    </label>
                </div>
            </div>
        </div>
    )
}