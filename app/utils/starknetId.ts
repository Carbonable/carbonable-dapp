import BN from "bn.js";
import { STARKNET_ID_INDEXER_MAINNET, STARKNET_ID_INDEXER_TESTNET } from "./links";

/**
 * Fetch starknet ID from wallet address
 * 
 * @param { string } address
 * @returns { Promise<UserAdresses> } User addresses
 */
export async function getStarknetId(address: string | undefined, network: any): Promise<string | undefined> {
    // If no wallet is connected
    if (address === undefined) {
        return undefined;
    }

    // Transform address to BN
    const feltAddr = new BN(address.slice(2), 16).toString(10);

    // Select indexer
    const indexer = network.id === "mainnet" ? STARKNET_ID_INDEXER_MAINNET : STARKNET_ID_INDEXER_TESTNET;  
   
    // Call inddexer and check if there is a prefered domain
    const domain = await fetch(indexer + "/addr_to_domain?addr=" + feltAddr);
    const domainJSON = await domain.json();

    if (domainJSON.domain) {
        return domainJSON.domain;
    }

    // If no prefered domain, check if there are non prefered domains
    const domains = await fetch(indexer + "/addr_to_full_ids?addr=" + feltAddr);
    const domainsJSON = await domains.json();

    return domainsJSON.full_ids.length === 0 ? undefined : domainsJSON.full_ids[0];
}