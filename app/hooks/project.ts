import { useContract, useStarknetCall } from '@starknet-react/core';
import type { Abi } from 'starknet';

import ProjectAbiTestnet from '../abi/testnet/CarbonableProject_abi.json';
import ProjectAbiTestnet2 from '../abi/testnet2/CarbonableProject_abi.json';
import ProjectAbiMainnet from '../abi/mainnet/CarbonableProject_abi.json';

export function useProjectContract(contractAddress: string | undefined, network: string) {
  let abi = ProjectAbiMainnet;
  
  if (network === "testnet") { abi = ProjectAbiTestnet }
  if (network === "testnet2") { abi = ProjectAbiTestnet2 }
  
  return useContract({
    abi: abi as Abi,
    address: contractAddress,
  })
}

/**
 * Fetch Project total supply
 * 
 * @param { string } contractAddress
 * @returns { any } Project Total Supply
 */
 export function useProjectTotalSupply(contractAddress: string, network: string): any {
  const { contract: project } = useProjectContract(contractAddress, network);
  const { data, loading, error, refresh } = useStarknetCall({ contract: project, method: 'totalSupply', args: [] });
  const totalSupply = data ? data[0] : undefined;
  
  return { projectTotalSupply: totalSupply?.low.toString(), errorProjectTotalSupply: error, loadingProjectTotalSupply: loading, refreshProjectTotalSupply: refresh }; 
}
