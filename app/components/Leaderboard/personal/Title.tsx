import { useQuery } from "@apollo/client";
import { useStarkName } from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";
import { GET_MY_RANK } from "~/graphql/queries/leaderboard";
import { minifyAddressOrStarknetId } from "~/utils/utils";

export default function Title({ walletAddress }: { walletAddress: string }) {
    const [rank, setRank] = useState<string|number>("🆕");
    const { error, data } = useQuery(GET_MY_RANK, {
        variables: {
            wallet_address: walletAddress
        }
    });

    const { data: starknetId } = useStarkName({address: walletAddress});
    const starkName = useMemo(() => {
        if (starknetId) {
            return minifyAddressOrStarknetId(walletAddress, starknetId);
        }

        return minifyAddressOrStarknetId(walletAddress, undefined);
    }, [starknetId, walletAddress]);

    useEffect(() => {
        if (data) {
            setRank(data.leaderboardForWallet.position || '🆕');
        }
    }, [data]);

    if (error) {
        console.error('Error fetching my score', error);
    }

    return (
        <div className="block text-center">
            <div className="text-neutral-100 font-semibold text-4xl">
                {rank === '🆕' ? '🆕' : <Rank rank={rank} />}
            </div>
            <div className="uppercase text-2xl lg:text-3xl mt-2 text-neutral-300">
                {starkName}
            </div>
        </div>
    )
}

function Rank({ rank }: { rank: number|string }) {
    const rankPosition = parseInt(rank.toString());
    return (
        <>
            { rankPosition === 1 && <>🥇</> }
            { rankPosition === 2 && <>🥈</> }
            { rankPosition === 3 && <>🥉</> }
            { rankPosition > 3 && <>#{rank}</> }
        </>
    )
}