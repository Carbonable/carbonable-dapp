import { useStarknetCall } from "@starknet-react/core";
import { decodeShortString } from "starknet/dist/utils/shortString";
import { toHex } from "starknet/utils/number";
import { usePaymentTokenContract } from "~/hooks/paymentToken";


/**
 * Fetch Payment token decimals
 * 
 * @param { string } contractAddress
 * @returns { any } Payment token decimals or undefined
 */
export function usePaymentTokenDecimals(contractAddress: string): any {
    const { contract: paymentToken } = usePaymentTokenContract(contractAddress);
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
 export function usePaymentTokenSymbol(contractAddress: string): any {
    const { contract: paymentToken } = usePaymentTokenContract(contractAddress);
    const { data, loading, error, refresh } = useStarknetCall({ contract: paymentToken, method: 'symbol', args: [] });

    return { paymentTokenSymbol: data ? decodeShortString(toHex(data[0])) : undefined, errorPaymentTokenSymbol: error, loadingPaymentTokenSymbol: loading, refreshPaymentTokenSymbol: refresh }; 
}
