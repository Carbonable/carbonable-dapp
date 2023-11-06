import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, argent, braavos, infuraProvider } from "@starknet-react/core";
import { devnet, goerli, mainnet } from "@starknet-react/chains";
import { useMemo } from "react";

export function StarknetProvider({ children, defautlNetwork, infuraApiKey, webWalletEnabled }: { children: React.ReactNode, defautlNetwork: string, infuraApiKey: string, webWalletEnabled: boolean }) {
    const chains = useMemo(() => {
        if (defautlNetwork === 'mainnet') {
          return [mainnet];
        }
    
        if (defautlNetwork === 'testnet2') {
          return [devnet];
        }
        return [goerli]
      }, [defautlNetwork]);
    
      const providers = [infuraProvider({ apiKey: infuraApiKey })];
      const connectors = useMemo(() => [
        braavos(),
        argent(),
        new WebWalletConnector({ url: "https://web.argent.xyz" }),
        new ArgentMobileConnector(),
      ], []);
  
    return (
      <StarknetConfig
        chains={chains}
        providers={providers}
        connectors={connectors}
        autoConnect={true}
      >
        {children}
      </StarknetConfig>
    );
  }