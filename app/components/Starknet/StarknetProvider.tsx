import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, argent, braavos, nethermindProvider } from "@starknet-react/core";
import { devnet, goerli, mainnet } from "@starknet-react/chains";
import { useMemo } from "react";

export function StarknetProvider({ children, defautlNetwork, rpcApiKey, webWalletEnabled }: { children: React.ReactNode, defautlNetwork: string, rpcApiKey: string, webWalletEnabled: boolean }) {
    const chains = useMemo(() => {
        if (defautlNetwork === 'mainnet') {
          return [mainnet];
        }
    
        if (defautlNetwork === 'testnet2') {
          return [devnet];
        }
        return [goerli]
      }, [defautlNetwork]);
    
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