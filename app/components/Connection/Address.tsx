import { useAccount, useStarkProfile } from "@starknet-react/core";
import { useMemo } from "react";
import { minifyAddressOrStarknetId } from "~/utils/utils";

export default function Address() {
    const { address } = useAccount();
    const { data } = useStarkProfile({ address });

    const starknetId = useMemo(() => {
        if (data !== undefined) {
            return data.name;
        }

        return address;
    }, [address, data]);

    const pfp = useMemo(() => {
        if (data !== undefined) {
            return data.profilePicture;
        }

        return null;
    }, [data]);

    return (
        <>
            {pfp && <img className="w-8 h-8 mr-3 rounded-full" src={pfp} alt="PFP" />}
            {minifyAddressOrStarknetId(address, starknetId)}
        </>
    )
}