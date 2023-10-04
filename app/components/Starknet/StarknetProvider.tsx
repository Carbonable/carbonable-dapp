import { StarknetConfig, argent, braavos, infuraProvider } from "@starknet-react/core";
import { devnet, goerli, mainnet } from "@starknet-react/chains";
import { useEffect, useMemo, useState } from "react";

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
      const connectors = useMemo(() => [braavos(), argent()], []);
      const [webwallet, setWebwallet] = useState<any>(null);
      const [webwalletTestnet2, setWebwalletTestnet2] = useState<any>(null);

      useEffect(() => {
        if (!webWalletEnabled) { return; }
    
        import("@argent/starknet-react-webwallet-connector").then(({ WebWalletConnector }) => {
    
          if (defautlNetwork === 'mainnet') { 
            setWebwallet(new WebWalletConnector());
          }
    
          if (defautlNetwork === 'testnet2') { 
            setWebwalletTestnet2(new WebWalletConnector({ url: "https://web.dev.argent47.net" }));
          }
        });
        
      }, [defautlNetwork, webWalletEnabled]);
    
      useEffect(() => {
        if (connectors.length > 2) { return; }
    
        if (webwallet) {
          connectors.unshift(webwallet);
        }
    
        if (webwalletTestnet2) {
          connectors.unshift(webwalletTestnet2);
        }
      }, [webwallet, webwalletTestnet2, connectors]);
  
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