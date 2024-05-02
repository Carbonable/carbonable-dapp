import type { StripeElementsOptions} from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { useNotifications } from "~/root";
import { useProject } from "../../ProjectWrapper";
import StripeForm from "./StripeForm";

export default function StripeElements({ email, setIsOpen }: { email: string, setIsOpen: (isOpen: boolean) => void }) {
    const { stripePublicKey } = useNotifications();
    const { quantity } = useProject();
    const stripePromise = loadStripe(stripePublicKey);

    const options: StripeElementsOptions = {
        mode: "payment",
        amount: quantity ? quantity * 100 : 0,
        currency: 'usd',
        captureMethod: 'manual',
        appearance: {
            theme: 'night',
            variables: {
                colorText: '#878A94',
                colorBackground: '#1F2128',
            }, 
        },
    };
    return (
        <>
            <div className="border rounded-lg border-opacityLight-20">
                <div className="flex justify-between bg-opacityLight-5 py-2 px-3">
                    <div className="uppercase text-sm flex-grow">Payment details</div>
                </div>
                <div className="flex items-center pt-8 pb-4 px-3 gap-x-3 border-t border-opacityLight-20">
                    <Elements stripe={stripePromise} options={options}>
                        <StripeForm email={email} setIsOpen={setIsOpen} />
                    </Elements>
                </div>
            </div>
        </>
    )
}