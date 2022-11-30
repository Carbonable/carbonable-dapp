import { useContract } from '@starknet-react/core';
import type { Abi } from 'starknet';

import PaymentTokenAbi from '../abi/eth_abi.json';

export function usePaymentTokenContract(contractAddress: string | undefined) {
  
  return useContract({
    abi: PaymentTokenAbi as Abi,
    address: contractAddress,
  })
}