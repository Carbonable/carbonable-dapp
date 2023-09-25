import { useAccount, useNetwork, useProvider } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { minifyAddressOrStarknetId } from "~/utils/utils";
import { StarknetIdNavigator } from 'starknetid.js';
import { constants } from "starknet";

export default function Address() {
    const [starknetId, setStarknetId] = useState<string | undefined>(undefined);
    const { address } = useAccount();
    const { chain } = useNetwork();
    const { provider } = useProvider();

    useEffect(() => {
        async function getAddress() {
            if (chain && address) {
                const starknetIdNavigator = new StarknetIdNavigator(provider, chain.id as constants.StarknetChainId);
                const starkName = await starknetIdNavigator.getStarkName(address);
                setStarknetId(starkName);
            }
        }
        getAddress();
    }, [address]);

    return <>{minifyAddressOrStarknetId(address, starknetId)}</>
}