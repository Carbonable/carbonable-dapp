import { useContract } from '@starknet-react/core';
import type { Abi } from 'starknet';

import MinterAbi from '../abi/CarbonableMinter_abi.json';

export function useMinterContract(contractAddress: string) {
  
  return useContract({
    abi: MinterAbi as Abi,
    address: contractAddress,
  })
}