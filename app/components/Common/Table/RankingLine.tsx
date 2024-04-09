import { NavLink } from "@remix-run/react";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import { useMemo } from "react";
import { type LeaderboardLineData } from "~/graphql/__generated__/graphql";
import { minifyAddressOrStarknetId } from "~/utils/utils";

export function RankingLine({ index, data, address }: { index: number, data: LeaderboardLineData, address: string }) {
    const { address: walletAddress } = useAccount();
    const { data: starknetId } = useStarkProfile({address});
    const starkName = useMemo(() => {
        if (starknetId) {
            return minifyAddressOrStarknetId(address, starknetId.name);
        }

        return minifyAddressOrStarknetId(address, undefined);
    }, [starknetId, address]);

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

    return (
        <tr className={`h-[36px] group hover:bg-neutral-700 first:rounded-bl-xl last:rounded-br-xl ${address === walletAddress ? "bg-neutral-700 hover:bg-neutral-600" : ""}`}>
            <NavLink to={`/leaderboard/${address}`} className="contents">
                <td className={`px-4 py-2 border-r border-b border-opacityLight-10 first:border-l sticky left-0 z-10 group-hover:bg-neutral-700 ${address === walletAddress ? "bg-neutral-700 group-hover:bg-neutral-600" : "bg-neutral-800"} w-[250px]`}>
                    <div className="flex items-center">
                        <div className={`text-neutral-200 font-light ${index < 100 ? 'min-w-[14px]' : 'min-w-[22px]' }`}>{data.position}</div>
                        <div className="ml-1 mr-2 min-w-[28px]">
                            { data.position === 1 && <>🥇</> }
                            { data.position === 2 && <>🥈</> }
                            { data.position === 3 && <>🥉</> }
                        </div>
                        <div className="text-neutral-50 flex items-center">
                            {pfp && <img className="w-6 h-6 mr-2 rounded-full" src={pfp} alt="PFP" />}
                            {starkName}
                        </div>
                    </div>
                </td>
                <td className="px-4 py-2 border-r border-b border-opacityLight-10 first:border-l">
                    <div className="flex items-center">
                        <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                        <div className="text-neutral-200 font-light">{parseInt(data.categories.fund).toLocaleString('en-US').replace(/,/g, ' ')}</div>
                    </div>
                </td>
                <td className="px-4 py-2 border-r border-b border-opacityLight-10 first:border-l">
                    <div className="flex items-center">
                        <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                        <div className="text-neutral-200 font-light">{parseInt(data.categories.farming).toLocaleString('en-US').replace(/,/g, ' ')}</div>
                    </div>
                </td>
                <td className="px-4 py-2 border-r border-b border-opacityLight-10 first:border-l">
                    <div className="flex items-center">
                        <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                        <div className="text-neutral-200 font-light">{parseInt(data.categories.other).toLocaleString('en-US').replace(/,/g, ' ')}</div>
                    </div>
                </td>
                <td className="px-4 py-2 border-r border-b border-opacityLight-10 first:border-l w-[160px]">
                    <div className="flex items-center">
                        <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                        <div className="text-neutral-50 font-light">{parseInt(data.total_score).toLocaleString('en-US').replace(/,/g, ' ')}</div>
                    </div>
                </td>
            </NavLink>
        </tr>
    )
}