import { useContract, useStarknetCall } from '@starknet-react/core';
import type { Abi } from 'starknet';
import { toHex } from "starknet/utils/number";

import MinterAbiTestnet from '../abi/testnet/CarbonableMinter_abi.json';
import MinterAbiTestnet2 from '../abi/testnet2/CarbonableMinter_abi.json';
import MinterAbiMainnet from '../abi/mainnet/CarbonableMinter_abi.json';

export function useMinterContract(contractAddress: string | undefined, network: string) {
    let abi = MinterAbiMainnet;
  
    if (network === "testnet") { abi = MinterAbiTestnet }
    if (network === "testnet2") { abi = MinterAbiTestnet2 }
    
    return useContract({
        abi: abi as Abi,
        address: contractAddress,
    })
}

/**
 * Fetch if the public sale is open
 * 
 * @param { string } contractAddress
 * @returns { any } publicSaleOpen
 */
export function usePublicSaleOpen(contractAddress: string, network: string): any {
    const { contract: minter } = useMinterContract(contractAddress, network);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'public_sale_open', args: [] });
     
    return { publicSaleOpen: data?.toString() === "1" ? true : false, errorPublicSaleOpen: error, loadingPublicSaleOpen: loading, refreshPublicSaleOpen: refresh }; 
}

/**
 * Fetch if the whitelist sale is open
 * 
 * @param { string } contractAddress
 * @returns { any } whitelistedSaleOpen
 */
export function useWhitelistedSaleOpen(contractAddress: string, network: string): any {
    const { contract: minter } = useMinterContract(contractAddress, network);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'whitelisted_sale_open', args: [] });
    
    return { whitelistedSaleOpen:  data?.toString() === "1" ? true : false, errorWhitelistedSaleOpen: error, loadingWhitelistedSaleOpen: loading, refreshWhitelistedSaleOpen: refresh }; 
}

/**
 * Fetch if the project is soldout
 * 
 * @param { string } contractAddress
 * @returns { any } is soldout
 */
 export function useSoldout(contractAddress: string, network: string): any {
    const { contract: minter } = useMinterContract(contractAddress, network);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: network === 'mainnet' ? 'isSoldOut' : 'sold_out', args: [] });
    
    return { soldout:  data?.toString() === "1" ? true : false, errorSoldout: error, loadingSoldout: loading, refreshSoldout: refresh }; 
}

/**
 * Fetch associated project contract address
 * 
 * @param { string } contractAddress
 * @returns { any } projectNftAddress
 */
export function useProjectNftAddress(contractAddress: string, network: string): any {
    const { contract: minter } = useMinterContract(contractAddress, network);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'carbonable_project_address', args: [] });
    const addr = data ? toHex(data[0]) : undefined;
    return { projectNftAddress: addr, errorProjectNftAddress: error, loadingProjectNftAddress: loading, refreshProjectNftAddress: refresh }; 
}

/**
 * Fetch max supply for mint
 * @param { string } contractAddress
 * @returns { any } maxSupplyForMint
 */
export function useMaxSupplyForMint(contractAddress: string, network: string): any {
    const { contract: minter } = useMinterContract(contractAddress, network);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'max_supply_for_mint', args: [] });
    const maxSupply = data ? data[0] : undefined;
    return { maxSupplyForMint: maxSupply?.low.toString(), errorMaxSupplyForMint: error, loadingMaxSupplyForMint: loading, refreshMaxSupplyForMint: refresh };  
}

/**
 * Fetch max buy per transaction
 * @param { string } contractAddress
 * @returns { any } max NFT per transaction
 */
 export function useMaxBuyPerTx(contractAddress: string, network: string): any {
    const { contract: minter } = useMinterContract(contractAddress, network);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'max_buy_per_tx', args: [] });
    const maxBuy = data ? data[0] : undefined;
    return { maxBuyPerTx: maxBuy?.toString(), errorMaxBuyPerTx: error, loadingMaxBuyPerTx: loading, refreshMaxBuyPerTx: refresh };  
}

/**
 * Fetch unit price of 1 NFT
 * @param { string } contractAddress
 * @returns { any } maxSupplyForMint
 */
export function useUnitPrice(contractAddress: string, network: string): any {
    const { contract: minter } = useMinterContract(contractAddress, network);
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
 export function usePaymentTokenAddress(contractAddress: string, network: string): any {
    const { contract: minter } = useMinterContract(contractAddress, network);
    const { data, loading, error, refresh } = useStarknetCall({ contract: minter, method: 'payment_token_address', args: [] });
    const addr = data ? toHex(data[0]) : undefined;
    return { paymentTokenAddress: addr, errorPaymentTokenAddress: error, loadingPaymentTokenAddress: loading, refreshPaymentTokenAddress: refresh }; 
}
