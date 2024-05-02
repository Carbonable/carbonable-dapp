import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import { useProject } from "../../ProjectWrapper";
import { EMAIL_REGEX, STRIPE_FEES, USDC_DECIMALS } from "~/utils/constant";
import { useAccount } from "@starknet-react/core";
import ConfimationDialog from "../Confirmation/ConfirmationDialog";

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

async function validatePaymentIntent(paymentIntentId: string, contractAddress: string, slot: number, walletAddress: string, shares: number): Promise<any> {
    try {
        const res = await fetch('/api/stripe/validate-payment-intent',
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                paymentIntentId,
                contractAddress,
                slot,
                walletAddress,
                shares,
            }) 
        });
        return res;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to validate payment intent");
    }
}

export default function StripeForm({ email, setIsOpen }: { email: string, setIsOpen: (isOpen: boolean) => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const { quantity, project } = useProject();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const amount = quantity ? quantity * (1 + STRIPE_FEES / 100) : 0;
    const { address } = useAccount();

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
        setErrorMessage(undefined);
        setIsProcessing(true);

        if (!stripe || !elements) {
            setIsProcessing(false);
            return;
        }

        await elements.submit();

        // Create a payment intent
        const res = await createPaymentIntent(amount, quantity ? quantity : 0, project.name, email);
        const { client_secret: clientSecret } = await res.json();

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

        if (error || address === undefined) {
            setErrorMessage(error?.message || "No wallet address found");
            setIsProcessing(false);
            return;
        }
        // Call server to validate the payment intent and airdrop the shares
        const resPayment = await validatePaymentIntent(paymentIntent.id, project.address, parseInt(project.slot, 16), address, quantity ? quantity * USDC_DECIMALS : 0);
       
        if (!resPayment.ok) {
                setErrorMessage("Failed to validate payment. Please try again later.");
                setIsProcessing(false);
                return;
        }
        setIsProcessing(false);
        setIsConfirmationOpen(true);
    }

    return (
        <>
            <form className="w-full">
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
                {errorMessage && <div className="bg-red-500/10 border border-red-900 text-neutral-50 px-4 py-2 mt-2 rounded-lg text-sm">{errorMessage}</div>}
            </form>
            <ConfimationDialog
                isOpen={isConfirmationOpen}
                setIsOpen={setIsConfirmationOpen}
                setParentIsOpen={setIsOpen}
                projectData={
                    {
                        quantity: quantity ? quantity : 0,
                        amount: amount,
                        name: project.name,
                    }
                }         
            />
        </>
    )
}