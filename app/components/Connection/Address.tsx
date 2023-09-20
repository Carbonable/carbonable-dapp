import { useAccount, useStarkName } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { minifyAddressOrStarknetId } from "~/utils/utils";

export default function Address() {
    const [userAddress, setUserAddress] = useState<string>("");
    const { address } = useAccount();
    const { data, isLoading, isError } = useStarkName({ address: userAddress });

    useEffect(() => {
        if (address) {
            setUserAddress(address);
        }
    }, [address]);

    if (isLoading || isError) return <>{minifyAddressOrStarknetId(address, data)}</>

    return <>{minifyAddressOrStarknetId(address, data)}</>
}