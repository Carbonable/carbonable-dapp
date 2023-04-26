import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { Connector } from '@starknet-react/core';
import { StarknetConfig, InjectedConnector } from '@starknet-react/core';
import { Provider } from "starknet";
import { userPrefs } from "./cookie";
import styles from "./styles/app.css";
import { db } from "./utils/db.server";
import { useEffect, useMemo, useState } from "react";

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

  const [webwallet, setWebwallet] = useState<any>(null);
  const [webwalletTestnet2, setWebwalletTestnet2] = useState<any>(null);

  const connectors:Connector<any>[] = useMemo(() => [
    new InjectedConnector({ options: { id: 'braavos' }}),
    new InjectedConnector({ options: { id: 'argentX' }}),
  ], []);

  const defaultProfider = new Provider({
    sequencer: {
      baseUrl: defautlNetwork.nodeUrl
    }
  })

  useEffect(() => {

    import("@argent/starknet-react-webwallet-connector").then(({ WebWalletConnector }) => {
      if (defautlNetwork.id === 'mainnet') { 
        setWebwallet(new WebWalletConnector());
      }

      if (defautlNetwork.id === 'testnet2') { 
        setWebwalletTestnet2(new WebWalletConnector({ url: "https://web.hydrogen.argent47.net" }));
      }
    });
    
  }, [defautlNetwork]);

  useEffect(() => {
    if (connectors.length > 2) { return; }

    if (webwallet) {
      connectors.push(webwallet);
    }

    if (webwalletTestnet2) {
      connectors.push(webwalletTestnet2);
    }
  }, [webwallet, webwalletTestnet2, connectors]);
  
  return (
    <html lang="en" className="bg-neutral-800 text-white">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
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

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex w-screen h-screen items-center justify-center flex-wrap">
        <div>
          <div className="text-9xl font-trash w-full text-center">{error.status}</div>
          <div className="text-7xl font-americana w-full text-center">{error.data.message}</div>
          <div className="text-center mt-4">
            <Link to={"/launchpad"} className="text-green text-center">Go to launchpad</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-wrap">
      <div>
        <div className="text-6xl font-trash w-full text-center">Oops!</div>
        <div className="text-4xl font-americana w-full text-center">We are working on fixing this issue</div>
        <div className="text-center mt-4">
          <Link to={"/launchpad"} className="text-green text-center">Go to launchpad</Link>
        </div>
      </div>
    </div>
  );
}
