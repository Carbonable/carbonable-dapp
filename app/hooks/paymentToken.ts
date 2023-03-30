import { useContractRead } from '@starknet-react/core';
import type { Abi } from 'starknet';
import { number, shortString } from "starknet";

import PaymentTokenAbiTestnet from '../abi/testnet/erc20_abi.json';
import PaymentTokenAbiTestnet2 from '../abi/testnet2/erc20_abi.json';
import PaymentTokenAbiMainnet from '../abi/mainnet/erc20_abi.json';

export function usePaymentTokenContract(network: string) {
    let abi = PaymentTokenAbiMainnet;

    if (network === "testnet") { abi = PaymentTokenAbiTestnet }
    if (network === "testnet2") { abi = PaymentTokenAbiTestnet2 }

    return abi as Abi;
}

/**
 * Fetch Payment token decimals
 * 
 * @param { string } contractAddress
 * @returns { any } Payment token decimals or undefined
 */
export function usePaymentTokenDecimals(contractAddress: string, network: string): any {
    const abi = usePaymentTokenContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'decimals', args: [] });
    const decimals = data ? data[0] : undefined;

    return { paymentTokenDecimals: decimals?.toString(), errorPaymentTokenDecimals: error };
}

/**
* Fetch Payment token symbol
* 
* @param { string } contractAddress
* @returns { any } Payment token symbol or undefined
*/
export function usePaymentTokenSymbol(contractAddress: string, network: string): any {
    const abi = usePaymentTokenContract(network);
    const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'symbol', args: [] });

    return { paymentTokenSymbol: data ? shortString.decodeShortString(number.toHex(data[0])).toString() : "", errorPaymentTokenSymbol: error };
}
