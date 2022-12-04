import { useContract, useStarknetCall } from '@starknet-react/core';
import type { Abi } from 'starknet';

import ProjectAbi from '../abi/CarbonableProject_abi.json';

export function useProjectContract(contractAddress: string | undefined) {
  
  return useContract({
    abi: ProjectAbi as Abi,
    address: contractAddress,
  })
}

/**
 * Fetch Project total supply
 * 
 * @param { string } contractAddress
 * @returns { any } Project Total Supply
 */
 export function useProjectTotalSupply(contractAddress: string): any {
  const { contract: project } = useProjectContract(contractAddress);
  const { data, loading, error, refresh } = useStarknetCall({ contract: project, method: 'totalSupply', args: [] });
  const totalSupply = data ? data[0] : undefined;
  
  return { projectTotalSupply: totalSupply?.low.toString(), errorProjectTotalSupply: error, loadingProjectTotalSupply: loading, refreshProjectTotalSupply: refresh }; 
}
