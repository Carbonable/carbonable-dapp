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
import type { Connector } from '@starknet-react/core';
import { StarknetConfig, InjectedConnector } from '@starknet-react/core';
import { Provider } from "starknet";
import { userPrefs } from "./cookie";
import styles from "./styles/app.css";
import { db } from "./utils/db.server";
import { useEffect } from "react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
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
  const connectors:Connector<any>[] = [
    new InjectedConnector({ options: { id: 'braavos' }}),
    new InjectedConnector({ options: { id: 'argentX' }}),
  ];

  const defaultProfider = new Provider({
    sequencer: {
      baseUrl: defautlNetwork.nodeUrl
    }
  })

  useEffect(() => {

    import("@argent/starknet-react-webwallet-connector").then(({ WebWalletConnector }) => {
      connectors.push(new WebWalletConnector());
      connectors.push(new WebWalletConnector({ url: "https://web.hydrogen.argent47.net" }))
    });
    
  }, []);

  console.log(connectors)
  
  return (
    <html lang="en" className="bg-neutral-800 text-white">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap"></link>
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
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
