import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const selectedNetwork = process.env.NETWORK;
        const indexerURL = selectedNetwork === 'testnet' ? process.env.INDEXER_TESTNET_URL : process.env.INDEXER_URL;
        const url = new URL(request.url);
        const slug = url.searchParams.get("slug");
        
        const project = await fetch(`${indexerURL}/launchpad/details/${slug}`, {});

        return json(await project.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};