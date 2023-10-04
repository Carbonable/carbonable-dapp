import { useAccount, useStarkName } from "@starknet-react/core";
import { useMemo } from "react";
import { minifyAddressOrStarknetId } from "~/utils/utils";

export default function Address() {
    const { address } = useAccount();
    const { data } = useStarkName({ address });

    const starknetId = useMemo(() => {
        if (data !== undefined) {
            return data;
        }

        return address;
    }, [address, data]);

    return <>{minifyAddressOrStarknetId(address, starknetId)}</>
}