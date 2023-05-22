import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { userPrefs } from "~/cookie";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const wallet = url.searchParams.get("wallet");

        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        const indexerURL = cookie.selected_network === 'testnet' ? process.env.INDEXER_TESTNET_URL : process.env.INDEXER_URL;

        const global = await fetch(`${indexerURL}/farming/list/global/${wallet}`, {});
        return json(await global.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};