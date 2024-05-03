import type { TransactionStatus } from "starknet";

export type Notification = {
    txHash: string,
    txStatus: TransactionStatus
    project: string,
    source: string,
    walletAddress: string | undefined,
    message: {title: string, message: string, link: string}
};

export type ContextType = { 
    notifs: Notification[], 
    setNotifs: (n: Notification[]) => void,
    defaultNetwork: any, 
    mustReloadMigration: boolean, 
    setMustReloadMigration: (b: boolean) => void,
    mustReloadFarmingPage: boolean,
    setMustReloadFarmingPage: (b: boolean) => void,
    lastIndexerBlock: number,
    displayPortfolioTootltip: boolean,
    setDisplayPortfolioTooltip: (b: boolean) => void,
    avnuUrl: string,
    stripePublicKey: string,
    activateStripePayment: boolean
};
  