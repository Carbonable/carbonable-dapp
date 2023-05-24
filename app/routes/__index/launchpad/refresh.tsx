import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { userPrefs } from "~/cookie";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        const indexerURL = cookie.selected_network === 'testnet' ? process.env.INDEXER_TESTNET_URL : process.env.INDEXER_URL;

        const url = new URL(request.url);
        const slug = url.searchParams.get("slug");
        const project = await fetch(`${indexerURL}/launchpad/details/${slug}`, {});

        return json(await project.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};