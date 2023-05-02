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
        console.log(indexerURL)
        const url = new URL(request.url);
        const wallet = url.searchParams.get("wallet");
        const portfolio = await fetch(`${indexerURL}/portfolio/${wallet}`, {});
        console.log(portfolio)
        return json(await portfolio.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};