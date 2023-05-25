import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const wallet = url.searchParams.get("wallet");
        const slug = url.searchParams.get("slug");
        
        const customer = await fetch(`${process.env.INDEXER_URL}/farming/list/${wallet}/${slug}`, {});
        return json(await customer.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};