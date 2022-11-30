import { useContract } from '@starknet-react/core';
import type { Abi } from 'starknet';

import ProjectAbi from '../abi/CarbonableProject_abi.json';

export function useProjectContract(contractAddress: string | undefined) {
  
  return useContract({
    abi: ProjectAbi as Abi,
    address: contractAddress,
  })
}