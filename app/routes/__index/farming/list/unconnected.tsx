import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    if (!process.env.INDEXER_URL) return json([]);

    try {
        const url = new URL(request.url);
        const slug = url.searchParams.get("slug");

        const farms = await fetch(`${process.env.INDEXER_URL}/farming/list/unconnected/${slug}`, {});
        return json(await farms.json());
    } catch (e) {
        console.error(e)
        return json([]);
    }
};