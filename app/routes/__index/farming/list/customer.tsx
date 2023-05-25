import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const wallet = url.searchParams.get("wallet");
        const slug = url.searchParams.get("slug");

        const indexerURL = process.env.NETWORK === 'testnet' ? process.env.INDEXER_TESTNET_URL : process.env.INDEXER_URL;

        const customer = await fetch(`${indexerURL}/farming/list/${wallet}/${slug}`, {});
        return json(await customer.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};