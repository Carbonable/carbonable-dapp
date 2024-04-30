import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import { useProject } from "../../ProjectWrapper";
import { EMAIL_REGEX, STRIPE_FEES } from "~/utils/constant";

async function createPaymentIntent(amount: number, quantity: number, project: string, email: string):Promise<any> {
    const paymentIntent = await fetch('/api/stripe/create-payment-intent',
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                amount: amount,
                quantity: quantity,
                project: project,
                email: email,
            }) 
        }
    );
    return paymentIntent;
}

export default function StripeForm({ email }: { email: string}) {
    const stripe = useStripe();
    const elements = useElements();
    const { quantity, project } = useProject();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [isProcessing, setIsProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const amount = quantity ? quantity * (1 + STRIPE_FEES / 100) : 0;

    const handlePaymentElementChange = (event: any) => {
        setDisabled(!event.complete);
        if (event.error) {
            setErrorMessage(event.error.message);
        } else {
            setErrorMessage(undefined);
        }
      };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            setIsProcessing(false);
            return;
        }

        await elements.submit();

        // Create a payment intent
        const res = await createPaymentIntent(amount, quantity ? quantity : 0, project.name, email);
        const { client_secret: clientSecret } = await res.json();
        console.log(clientSecret);
        const { error, paymentIntent } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret,
            confirmParams: {
                receipt_email: email,
                return_url: `${window.location.origin}`,
            },
            redirect: 'if_required',
        });
        console.log(paymentIntent, error);
       // Call server to validate the payment intent and airdrop the shares
       setIsProcessing(false);
    }

    return (
        <form className="w-full">
            {errorMessage && <div className="bg-red-500/10 border border-red-900 text-neutral-50 px-4 py-2 mt-2 mb-6 rounded-lg">{errorMessage}</div>}
            <PaymentElement onChange={handlePaymentElementChange} />
            <GreenButton 
                disabled={
                    !stripe ||
                    !elements ||
                    quantity === null ||
                    disabled ||
                    EMAIL_REGEX.test(email) === false
                }
                className={`w-full mt-6 ${isProcessing ? 'cursor-progress opacity-50 bg-greenish-700 hover:bg-greenish-700' : ''}`}
                onClick={handleSubmit}
            >
                Pay ${amount.toFixed(2)}
            </GreenButton>
        </form>
    )
}