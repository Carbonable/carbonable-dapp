import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import Stripe from "stripe";

export const action: ActionFunction = async ({
    request, 
  }) => {
    try {
        const secret = process.env.STRIPE_SECRET_KEY;

        if (secret === undefined) {
            console.error("No secret provided");
            return null;
        }

        const stripe = new Stripe(secret, {
            apiVersion: '2024-04-10',
            typescript: true,
        });

        const { amount, quantity, project, email } = await request.json();

        if (!amount) {
            return null;
        }

        const intent = await stripe.paymentIntents.create({
            amount: parseFloat(amount) * 100,
            currency: 'usd',
            capture_method: 'manual',
            description: `Buying ${quantity} shares of ${project} for $${parseFloat(amount).toFixed(2)}`,
            receipt_email: email ? email : undefined,
            automatic_payment_methods: {
                enabled: true
            }
        })

        return intent;
    } catch (e) {
        console.error(e)
        return json([]);
    }
};