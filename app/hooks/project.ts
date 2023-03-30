import { useContractRead } from '@starknet-react/core';
import type { Abi } from 'starknet';

import ProjectAbiTestnet from '../abi/testnet/CarbonableProject_abi.json';
import ProjectAbiTestnet2 from '../abi/testnet2/CarbonableProject_abi.json';
import ProjectAbiMainnet from '../abi/mainnet/CarbonableProject_abi.json';

export function useProjectContract(network: string) {
  let abi = ProjectAbiMainnet;
  
  if (network === "testnet") { abi = ProjectAbiTestnet }
  if (network === "testnet2") { abi = ProjectAbiTestnet2 }
  
  return abi as Abi;
}

/**
 * Fetch Project total supply
 * 
 * @param { string } contractAddress
 * @returns { any } Project Total Supply
 */
 export function useProjectTotalSupply(contractAddress: string, network: string): any {
  const abi = useProjectContract(network);
  const { data, error } = useContractRead({ abi, address: contractAddress, functionName: 'totalSupply', args: [] });
  const totalSupply = data ? data[0] : undefined;
  
  return { projectTotalSupply: totalSupply?.low.toString(), errorProjectTotalSupply: error }; 
}
