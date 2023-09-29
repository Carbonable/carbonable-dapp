import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
    try {
        const block = await fetch(`${process.env.INDEXER_URL}/latest/block`, {});
        const value = await block.json();

        return json(value);
    } catch (e) {
        console.error(e)
        return json(undefined);
    }
};