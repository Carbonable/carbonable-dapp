import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const wallet = url.searchParams.get("wallet");
        const slug = url.searchParams.get("slug");

        const userData = await fetch(`${process.env.INDEXER_URL}/farming/details/${wallet}/${slug}`, {});
        return json(await userData.json());
    } catch (e) {
        console.error(e);
        return null;
    }
};