import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import { StarknetConfig, InjectedConnector } from '@starknet-react/core';
import { Provider } from "starknet";
import { userPrefs } from "./cookie";
import styles from "./styles/app.css";
import { db } from "./utils/db.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Carbonable - Web3 powered end-to-end carbon offset platform",
  description: "The simplest and smartest way to reach carbon neutrality. Invest in the best nature-based solutions. Manage your assets and drive your strategy efficiently.",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}


export const loader: LoaderFunction = async ({
  request, 
}) => {
  try {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};

    const defautlNetwork = await db.network.findFirst({
      where: {
        ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
      }
    });
    return json(defautlNetwork);
  } catch {
      return json([]);
  }
  
};

export default function App() {
  const defautlNetwork = useLoaderData();
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' }}),
    new InjectedConnector({ options: { id: 'argentX' }}),
  ];

  const defaultProfider = new Provider({
    sequencer: {
      baseUrl: defautlNetwork.nodeUrl
    }
  })
  
  return (
    <html lang="en" className="bg-neutral-800 text-white">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <StarknetConfig defaultProvider={defaultProfider} connectors={connectors}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </StarknetConfig>
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html className="bg-neutral-800 text-white">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex w-screen h-screen items-center justify-center flex-wrap">
          <div>
            <div className="text-9xl font-trash w-full text-center">{caught.status}</div>
            <div className="text-7xl font-americana w-full text-center">{caught.statusText}</div>
            <div className="text-center mt-4">
              <Link to={"/launchpad"} className="text-green text-center">Go to launchpad</Link>
            </div>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
