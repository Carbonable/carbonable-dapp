import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

/**
 * Mint the selected number of NFTs
 * 
 * @param { ActionArgs } request
 * @returns { json } Returns a json containing either the error message or the success message
 */
export async function action({ request }: ActionArgs) {
    const data = await request.formData();
    const amount = data.get("amount");

    try {
        console.log(amount)
        return json({ message: "Minting successful" });
    } catch (error) {
        return json({ error: "Error when minting" });
    }
  }