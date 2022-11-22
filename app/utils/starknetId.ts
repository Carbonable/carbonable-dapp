import BN from "bn.js";
import { STARKNET_ID_INDEXER } from "./links";

/**
 * Fetch starknet ID from wallet address
 * 
 * @param { string } address
 * @returns { Promise<UserAdresses> } User addresses
 */
export async function getStarknetId(address: string | undefined): Promise<string | undefined> {
    // If no wallet is connected
    if (address === undefined) {
        return undefined;
    }

    // Transform address to felt
    const feltAddr = new BN(address.slice(2), 16).toString(10);

    // Call indexer
    const res = await fetch(STARKNET_ID_INDEXER + "/addr_to_domains?addr=" + feltAddr);

    // Format the answer
    const domain = await res.json();

    return domain.domains ? domain.domains[0] : "";
}