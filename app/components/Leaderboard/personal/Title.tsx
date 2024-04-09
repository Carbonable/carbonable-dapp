import { useQuery } from "@apollo/client";
import { useStarkProfile } from "@starknet-react/core";
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
    const { data: starknetId } = useStarkProfile({ address: walletAddress });
    const starkName = useMemo(() => {
        if (starknetId) {
            return minifyAddressOrStarknetId(walletAddress, starknetId.name);
        }

        return minifyAddressOrStarknetId(walletAddress, undefined);
    }, [starknetId, walletAddress]);

    const pfp = useMemo(() => {
        if (starknetId !== undefined && starknetId.profile?.startsWith('data:application/json;base64,')) {
            const profileData = starknetId.profile.split(",")[1].slice(0, -1);
            const profile = JSON.parse(window.atob(profileData));
            return profile.image;

        }

        if (starknetId !== undefined && starknetId.profilePicture !== undefined) {
            return starknetId.profilePicture;
        }

        return null;
    }, [starknetId]);

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
            <div className="uppercase text-2xl lg:text-3xl mt-2 text-neutral-300 flex items-center">
                {pfp && <img className="w-8 h-8 mr-3 rounded-full" src={pfp} alt="PFP" />}
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