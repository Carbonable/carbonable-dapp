import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const wallet = url.searchParams.get("wallet");

        const userData = await fetch(`${process.env.INDEXER_URL}/farming/claim-all/${wallet}`, {});
        const result = await userData.json();

        return json(result);
    } catch (e) {
        console.error(e);
        return json(null);
    }
};