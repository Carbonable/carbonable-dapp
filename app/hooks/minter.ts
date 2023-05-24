import { useContractRead } from '@starknet-react/core';
import type { Abi } from 'starknet';
import { num } from "starknet";

import MinterAbiTestnet from '../abi/testnet/CarbonableMinter_abi.json';
import MinterAbiTestnet2 from '../abi/testnet2/CarbonableMinter_abi.json';
import MinterAbiMainnet from '../abi/mainnet/CarbonableMinter_abi.json';

export function useMinterContract(network: string) {
    let abi = MinterAbiMainnet;

    if (network === "testnet") { abi = MinterAbiTestnet }
    if (network === "testnet2") { abi = MinterAbiTestnet2 }

    return abi as Abi;
}

/**
 * Fetch if the public sale is open
 * 
 * @param { string } contractAddress
 * @returns { any } publicSaleOpen
 */
export function usePublicSaleOpen(contractAddress: string, network: string): any {
    const abi = useMinterContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'public_sale_open', args: [] });

    return { publicSaleOpen: data?.toString() === "1" ? true : false, errorPublicSaleOpen: error };
}

/**
 * Fetch if the whitelist sale is open
 * 
 * @param { string } contractAddress
 * @returns { any } whitelistedSaleOpen
 */
export function useWhitelistedSaleOpen(contractAddress: string, network: string): any {
    const abi = useMinterContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'whitelisted_sale_open', args: [] });

    return { whitelistedSaleOpen: data?.toString() === "1" ? true : false, errorWhitelistedSaleOpen: error };
}

/**
 * Fetch if the project is soldout
 * 
 * @param { string } contractAddress
 * @returns { any } is soldout
 */
export function useSoldout(contractAddress: string, network: string): any {
    const abi = useMinterContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'isSoldOut', args: [] });

    return { soldout: data?.toString() === "1" ? true : false, errorSoldout: error };
}

/**
 * Fetch if the project is soldout
 * 
 * @param { string } contractAddress
 * @returns { any } is soldout
 */
export function useReservedSupplyForMint(contractAddress: string, abi: Abi): any {
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'getReservedSupplyForMint', args: [] });
    const reservedSupply = data ? data[0] : undefined;
    return { projectReservedSupplyForMint: reservedSupply?.low.toString(), errorProjectReservedSupplyForMint: error };
}

/**
 * Fetch associated project contract address
 * 
 * @param { string } contractAddress
 * @returns { any } projectNftAddress
 */
export function useProjectNftAddress(contractAddress: string, network: string): any {
    const abi = useMinterContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'carbonable_project_address', args: [] });
    const addr = data ? num.toHex(data[0]) : undefined;
    return { projectNftAddress: addr, errorProjectNftAddress: error };
}

/**
 * Fetch max supply for mint
 * @param { string } contractAddress
 * @returns { any } maxSupplyForMint
 */
export function useMaxSupplyForMint(contractAddress: string, network: string): any {
    const abi = useMinterContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'max_supply_for_mint', args: [] });
    const maxSupply = data ? data[0] : undefined;
    return { maxSupplyForMint: maxSupply?.low.toString(), errorMaxSupplyForMint: error };
}

/**
 * Fetch max buy per transaction
 * @param { string } contractAddress
 * @returns { any } max NFT per transaction
 */
export function useMaxBuyPerTx(contractAddress: string, network: string): any {
    const abi = useMinterContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'max_buy_per_tx', args: [] });
    const maxBuy = data ? data[0] : undefined;
    return { maxBuyPerTx: maxBuy?.toString(), errorMaxBuyPerTx: error };
}

/**
 * Fetch unit price of 1 NFT
 * @param { string } contractAddress
 * @returns { any } maxSupplyForMint
 */
export function useUnitPrice(contractAddress: string, network: string): any {
    const abi = useMinterContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'unit_price', args: [] });
    const price = data ? data[0] : undefined;
    return { unitPrice: price?.low.toString(), errorUnitPrice: error };
}

/**
 * Fetch payment token contract address
 * 
 * @param { string } contractAddress
 * @returns { any } projectNftAddress
 */
export function usePaymentTokenAddress(contractAddress: string, network: string): any {
    const abi = useMinterContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'payment_token_address', args: [] });
    const addr = data ? num.toHex(data[0]) : undefined;
    return { paymentTokenAddress: addr, errorPaymentTokenAddress: error };
}
