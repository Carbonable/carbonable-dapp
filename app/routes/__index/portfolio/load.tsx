import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { userPrefs } from "~/cookie";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        const selectedNetwork = await db.network.findFirst({
            where: {
              ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
        });

        const indexerURL = selectedNetwork?.id === 'testnet' ? process.env.INDEXER_TESTNET_URL : process.env.INDEXER_URL;

        const url = new URL(request.url);
        const wallet = url.searchParams.get("wallet");
        const portfolio = await fetch(`${indexerURL}/portfolio/${wallet}`, {});
        return json(await portfolio.json());
    } catch (e) {
        console.log(e)
        return json([]);
    }
};