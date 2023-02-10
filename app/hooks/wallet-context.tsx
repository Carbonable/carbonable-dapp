import { createContext, useCallback, useEffect, useState } from "react";
import type { StarknetWindowObject, } from '@argent/get-starknet';

export type WalletProviderValue = {
    connection: any | null,
    connect: () => Promise<void>,
    disconnect: () => Promise<void>,
    status: WalletStatus,
};
export enum WalletStatus {
    Connected = "connected",
    Disconnected = "disconnected",
};

export const DEFAULT_WALLET_CTX_PROVIDER_VALUE = {
    connection: null,
    status: WalletStatus.Disconnected,
    connect: async () => { },
    disconnect: async () => { },
};

export const WalletContext = createContext<WalletProviderValue>(DEFAULT_WALLET_CTX_PROVIDER_VALUE);
export const STORAGE_KEY = 'customerhasConnectedWallet';

export function WalletProvider({ children }: React.PropsWithChildren) {
    const [connection, setConnection] = useState<StarknetWindowObject | null>(null);

    const handleAccountChangedCallback = async (e: any) => {
        let address = e[0];
        // @ts-ignore c is never null, has events can only be run when wallet is connected
        setConnection(c => ({
            ...c,
            account: {
                ...c?.account,
                address,
            }
        }));
    };
    const handleNetworkChangedCallback = async (e: any) => {
        // @ts-ignore c is never null, has events can only be run when wallet is connected
        setConnection(c => ({
            ...c,
            account: {
                ...c?.account,
                chainId: e,
            }
        }));
    };

    const connectWallet = useCallback(async () => {
        let { connect } = await import("@argent/get-starknet");
        try {
            let starknet = await connect();
            if (null !== starknet) {
                // @ts-ignore
                setConnection(starknet);

                starknet.on("accountsChanged", handleAccountChangedCallback);
                starknet.on("networkChanged", handleNetworkChangedCallback);
                window.localStorage.setItem(STORAGE_KEY, 'true');
            }
        } catch (_err) { }
    }, [connection, setConnection]);

    const disconnectWallet = useCallback(async () => {
        let { disconnect } = await import("@argent/get-starknet");
        try {
            connection?.off('accountsChanged', handleAccountChangedCallback);
            connection?.off('networkChanged', handleAccountChangedCallback);
            await disconnect({ clearLastWallet: true });
            setConnection(null);
            window.localStorage.removeItem(STORAGE_KEY);
        } catch (_err) { }
    }, [connection, setConnection]);

    useEffect(() => {
        async function getStarknetConnection() {
            let { connect } = await import("@argent/get-starknet");
            let starknetConnection: StarknetWindowObject | null = null;
            if (null === connection) {
                if (undefined !== window && undefined !== window.localStorage && null !== window.localStorage.getItem(STORAGE_KEY)) {

                    starknetConnection = await connect();
                    if (null !== starknetConnection) {
                        setConnection(() => starknetConnection);

                        starknetConnection.on("accountsChanged", handleAccountChangedCallback);
                        starknetConnection.on("networkChanged", handleNetworkChangedCallback);
                    }
                }
            }
        }

        if (undefined !== window && undefined !== self) {
            getStarknetConnection();
        }
    }, [connection]);


    return (
        <WalletContext.Provider value={{ connect: connectWallet, disconnect: disconnectWallet, connection, status: null === connection ? WalletStatus.Disconnected : WalletStatus.Connected }}>
            {children}
        </WalletContext.Provider>
    );
}
