import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const slug = url.searchParams.get("slug");

        const indexerURL = process.env.NETWORK === 'testnet' ? process.env.INDEXER_TESTNET_URL : process.env.INDEXER_URL;

        const farms = await fetch(`${indexerURL}/farming/list/unconnected/${slug}`, {});
        return json(await farms.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};