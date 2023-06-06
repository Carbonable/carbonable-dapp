import type { LoaderFunction } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Tracking from "~/components/Project/Content/Tracking";
import type { Dmrv } from "~/types/dmrv";

export const loader: LoaderFunction = async ({
    params
  }) => {
    try {
      const dmrv = await fetch(`${process.env.DMRV_API}/sea-starktest-kenya-testnet`, {});
      const dmrvJSON = await dmrv.json();
  
      return json({dmrvJSON, mapboxKey: process.env.MAPBOX});

    } catch (e) {
      throw new Response("Not Found", {status: 404})
    }
};

export default function DmrvPage() {
    const data = useLoaderData();
    const mapboxKey = data.mapboxKey;
    const dmrv: Dmrv = data.dmrvJSON;
    return (
        <div className="mt-20 w-11/12 mx-auto px-2 xl:w-10/12 2xl:w-9/12 2xl:max-w-6xl">
            <div className="mt-4 pt-8 border-t border-neutral-500">
                <Tracking mapboxKey={mapboxKey} dmrv={dmrv} />
            </div>
        </div>
        
    )
}