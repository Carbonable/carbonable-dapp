import { useStarknetCall } from "@starknet-react/core";
import { useProjectContract } from "~/hooks/project";

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
    
    return { projectTotalSupply: totalSupply?.low, errorProjectTotalSupply: error, loadingProjectTotalSupply: loading, refreshProjectTotalSupply: refresh }; 
}
