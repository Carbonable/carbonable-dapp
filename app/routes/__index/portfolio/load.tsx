import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const wallet = url.searchParams.get("wallet");

        const portfolio = await fetch(`${process.env.INDEXER_URL}/portfolio/${wallet}`, {});

        return json(await portfolio.json());
    } catch (e) {
        console.error(e)
        return json([]);
    }
};