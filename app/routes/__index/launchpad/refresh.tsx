import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const slug = url.searchParams.get("slug");

        const project = await fetch(`${process.env.INDEXER_URL}/launchpad/details/${slug}`, {});

        return json(await project.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};