import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, argent, braavos, nethermindProvider } from "@starknet-react/core";
import { sepolia, mainnet } from "@starknet-react/chains";
import { useMemo } from "react";

export function StarknetProvider({ children, defaultNetwork, rpcApiKey, webWalletEnabled }: { children: React.ReactNode, defaultNetwork: string, rpcApiKey: string, webWalletEnabled: boolean }) {
    const chains = useMemo(() => {
        if (defaultNetwork === 'mainnet') {
          return [mainnet];
        }
    
        return [sepolia]
      }, [defaultNetwork]);
    
      const provider = nethermindProvider({ apiKey: rpcApiKey });
      const connectors = useMemo(() => webWalletEnabled ? [
        braavos(),
        argent(),
        new ArgentMobileConnector({
          dappName: "Carbonable",
        }),
        new WebWalletConnector({ url: "https://web.argent.xyz" }),
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