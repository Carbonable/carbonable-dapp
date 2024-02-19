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
  useOutletContext,
  useFetcher,
} from "@remix-run/react";
import styles from "./styles/app.css";
import { useEffect, useState } from "react";
import type { ContextType } from "./types/notification";
import { StarknetProvider } from "./components/Starknet/StarknetProvider";

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async () => {
  try {
    const defaultNetwork = process.env.NETWORK
    const webWalletEnabled = process.env.WEB_WALLET_ENABLED === 'true';
    const rpcApiKey = process.env.RPC_API_KEY;
    const avnuUrl = process.env.AVNU_URL;

    return json({ defaultNetwork, webWalletEnabled, rpcApiKey, avnuUrl });
  } catch {
      return json([]);
  }
};

export default function App() {
  const { defaultNetwork, webWalletEnabled, rpcApiKey, avnuUrl } = useLoaderData();
  const [notifs, setNotifs] = useState<any[]>([]);
  const [mustReloadMigration, setMustReloadMigration] = useState(false);
  const [mustReloadFarmingPage, setMustReloadFarmingPage] = useState(false);
  const [lastIndexerBlock, setLastIndexerBlock] = useState<number|undefined>();
  const [displayPortfolioTootltip, setDisplayPortfolioTooltip] = useState(true);

  const lastBlockFetcher = useFetcher();

  useEffect(() => {
    async function getLastBlock() {
      lastBlockFetcher.load(`/indexer/block`);
    }

    const interval = setInterval(() => {
      getLastBlock();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lastBlockFetcher.data !== undefined) {
      const data = lastBlockFetcher.data;
      setLastIndexerBlock(data);
    }
  }, [lastBlockFetcher.data]);
  
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
        <StarknetProvider defaultNetwork={defaultNetwork} rpcApiKey={rpcApiKey} webWalletEnabled={webWalletEnabled} >
          <Outlet context={{ notifs,
                             setNotifs,
                             defaultNetwork: defaultNetwork,
                             mustReloadMigration,
                             setMustReloadMigration,
                             mustReloadFarmingPage,
                             setMustReloadFarmingPage,
                             lastIndexerBlock,
                             displayPortfolioTootltip,
                             setDisplayPortfolioTooltip,
                             avnuUrl
                          }} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </StarknetProvider>
      </body>
    </html>
  );
}

export function useNotifications() {
  return useOutletContext<ContextType>();
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
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
              <div className="text-9xl font-trash w-full text-center">{error.status}</div>
              <div className="text-7xl font-americana w-full text-center">{error.data.message}</div>
              <div className="text-center mt-4">
                <Link to={"/launchpad"} className="text-green text-center">Go to launchpad</Link>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

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
              <div className="text-6xl font-trash w-full text-center">Oops!</div>
              <div className="text-4xl font-americana w-full text-center">We are working on fixing this issue</div>
              <div className="text-center mt-4">
                <Link to={"/launchpad"} className="text-green text-center">Go to launchpad</Link>
              </div>
            </div>
          </div>
        </body>
    </html>
  );
}
