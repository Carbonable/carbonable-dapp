import { useStarknetCall } from "@starknet-react/core";
import { toHex } from "starknet/utils/number";
import { useMinterContract } from "~/hooks/minter";

/**
 * Fetch if the public sale is open
 * 
 * @param { string } contractAddress
 * @returns { any } publicSaleOpen
 */
export function usePublicSaleOpen(contractAddress: string): any {
    const { contract: minter } = useMinterContract(contractAddress);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'public_sale_open', args: [] });
    
    return { publicSaleOpen: data, errorPublicSaleOpen: error, loadingPublicSaleOpen: loading, refreshPublicSaleOpen: refresh }; 
}

/**
 * Fetch if the whitelist sale is open
 * 
 * @param { string } contractAddress
 * @returns { any } whitelistedSaleOpen
 */
export function useWhitelistedSaleOpen(contractAddress: string): any {
    const { contract: minter } = useMinterContract(contractAddress);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'whitelisted_sale_open', args: [] });
    
    return { whitelistedSaleOpen: data, errorWhitelistedSaleOpen: error, loadingWhitelistedSaleOpen: loading, refreshWhitelistedSaleOpen: refresh }; 
}

/**
 * Fetch associated project contract address
 * 
 * @param { string } contractAddress
 * @returns { any } projectNftAddress
 */
export function useProjectNftAddress(contractAddress: string): any {
    const { contract: minter } = useMinterContract(contractAddress);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'carbonable_project_address', args: [] });
    const addr = data ? toHex(data[0]) : undefined;
    return { projectNftAddress: addr, errorProjectNftAddress: error, loadingProjectNftAddress: loading, refreshProjectNftAddress: refresh }; 
}

/**
 * Fetch max supply for mint
 * @param { string } contractAddress
 * @returns { any } maxSupplyForMint
 */
export function useMaxSupplyForMint(contractAddress: string): any {
    const { contract: minter } = useMinterContract(contractAddress);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'max_supply_for_mint', args: [] });
    const maxSupply = data ? data[0] : undefined;
    return { maxSupplyForMint: maxSupply?.low, errorMaxSupplyForMint: error, loadingMaxSupplyForMint: loading, refreshMaxSupplyForMint: refresh };  
}

/**
 * Fetch unit price of 1 NFT
 * @param { string } contractAddress
 * @returns { any } maxSupplyForMint
 */
export function useUnitPrice(contractAddress: string): any {
    const { contract: minter } = useMinterContract(contractAddress);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'unit_price', args: [] });
    const price = data ? data[0] : undefined;
    return { unitPrice: price?.low.toString(), errorUnitPrice: error, loadingUnitPrice: loading, refreshUnitPrice: refresh }; 
}

/**
 * Fetch payment token contract address
 * 
 * @param { string } contractAddress
 * @returns { any } projectNftAddress
 */
 export function usePaymentTokenAddress(contractAddress: string): any {
    const { contract: minter } = useMinterContract(contractAddress);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'payment_token_address', args: [] });
    const addr = data ? toHex(data[0]) : undefined;
    return { paymentTokenAddress: addr, errorPaymentTokenAddress: error, loadingPaymentTokenAddress: loading, refreshPaymentTokenAddress: refresh }; 
}