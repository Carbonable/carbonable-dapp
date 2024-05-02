import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({
    request, 
  }) => {
    try {
        const { paymentIntentId, contractAddress, slot, walletAddress, shares } = await request.json();
        const url = process.env.PAYMENT_GATEWAY_URL;

        if (paymentIntentId === undefined || contractAddress === undefined || slot === undefined || walletAddress === undefined || shares === undefined || url === undefined) {
            throw new Error("Missing parameters");
        }

        const intent = await fetch(url, {
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

        if (!intent.ok) {
            throw new Error("Failed to validate payment intent");
        }

        return {intent: await intent.json()};
    } catch (e) {
        console.error(e)
        throw new Error("Failed to validate payment intent");
    }
};