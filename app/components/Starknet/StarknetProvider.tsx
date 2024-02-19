import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, argent, braavos, nethermindProvider } from "@starknet-react/core";
import { devnet, goerli, mainnet } from "@starknet-react/chains";
import { useMemo } from "react";

export function StarknetProvider({ children, defaultNetwork, rpcApiKey, webWalletEnabled }: { children: React.ReactNode, defaultNetwork: string, rpcApiKey: string, webWalletEnabled: boolean }) {
    const chains = useMemo(() => {
        if (defaultNetwork === 'mainnet') {
          return [mainnet];
        }
    
        if (defaultNetwork === 'testnet2') {
          return [devnet];
        }
        return [goerli]
      }, [defaultNetwork]);
    
      const provider = nethermindProvider({ apiKey: rpcApiKey });
      const connectors = useMemo(() => webWalletEnabled ? [
        braavos(),
        argent(),
        new WebWalletConnector({ url: "https://web.argent.xyz" }),
        new ArgentMobileConnector(),
      ] : 
      [
        braavos(),
        argent()
      ]
      , []);
  
    return (
      <StarknetConfig
        chains={chains}
        provider={provider}
        connectors={connectors}
        autoConnect={true}
      >
        {children}
      </StarknetConfig>
    );
  }