import { useContract, useStarknetCall } from '@starknet-react/core';
import type { Abi } from 'starknet';
import { decodeShortString } from "starknet/dist/utils/shortString";
import { toHex } from "starknet/utils/number";

import PaymentTokenAbiTestnet from '../abi/testnet2/eth_abi.json';
import PaymentTokenAbiTestnet2 from '../abi/testnet2/eth_abi.json';
import PaymentTokenAbiMainnet from '../abi/testnet2/eth_abi.json';

export function usePaymentTokenContract(contractAddress: string | undefined, network: string) {
  let abi = PaymentTokenAbiMainnet;
  
  if (network === "testnet") { abi = PaymentTokenAbiTestnet }
  if (network === "testnet2") { abi = PaymentTokenAbiTestnet2 }
  
  return useContract({
    abi: abi as Abi,
    address: contractAddress,
  })
}

/**
 * Fetch Payment token decimals
 * 
 * @param { string } contractAddress
 * @returns { any } Payment token decimals or undefined
 */
 export function usePaymentTokenDecimals(contractAddress: string, network: string): any {
  const { contract: paymentToken } = usePaymentTokenContract(contractAddress, network);
  const { data, loading, error, refresh } = useStarknetCall({ contract: paymentToken, method: 'decimals', args: [] });
  const decimals = data ? data[0] : undefined;

  return { paymentTokenDecimals: decimals?.toString(), errorPaymentTokenDecimals: error, loadingPaymentTokenDecimals: loading, refreshPaymentTokenDecimals: refresh }; 
}

/**
* Fetch Payment token symbol
* 
* @param { string } contractAddress
* @returns { any } Payment token symbol or undefined
*/
export function usePaymentTokenSymbol(contractAddress: string, network: string): any {
  const { contract: paymentToken } = usePaymentTokenContract(contractAddress, network);
  const { data, loading, error, refresh } = useStarknetCall({ contract: paymentToken, method: 'symbol', args: [] });

  return { paymentTokenSymbol: data ? decodeShortString(toHex(data[0])).toString() : "", errorPaymentTokenSymbol: error, loadingPaymentTokenSymbol: loading, refreshPaymentTokenSymbol: refresh }; 
}
