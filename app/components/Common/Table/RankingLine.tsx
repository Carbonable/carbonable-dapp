import { useAccount } from "@starknet-react/core";
import { type LeaderboardLineData } from "~/graphql/__generated__/graphql";
import { minifyAddressOrStarknetId } from "~/utils/utils";

export function RankingLine({ index, data, address }: { index: number, data: LeaderboardLineData, address: string }) {
    const { address: walletAddress } = useAccount();
    console.log(address, walletAddress)
    return (
        <tr className={`h-[36px] first:rounded-bl-xl last:rounded-br-xl ${address === walletAddress ? "bg-neutral-700" : ""}`}>
            <td className={`px-4 border-r border-b border-opacityLight-10 first:border-l sticky left-0 z-10 ${address === walletAddress ? "bg-neutral-700" : "bg-neutral-800"} w-[240px]`}>
                <div className="flex items-center">
                    <div className={`text-neutral-200 font-light ${index < 100 ? 'min-w-[14px]' : 'min-w-[22px]' }`}>{data.position}</div>
                    <div className="ml-1 mr-2 min-w-[28px]">
                        { index === 0 && <>🥇</> }
                        { index === 1 && <>🥈</> }
                        { index === 2 && <>🥉</> }
                    </div>
                    <div className="text-neutral-50">{minifyAddressOrStarknetId(address, undefined)}</div>
                </div>
            </td>
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{parseInt(data.categories.fund).toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{parseInt(data.categories.farming).toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{parseInt(data.categories.other).toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l w-[160px]">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-50 font-light">{parseInt(data.total_score).toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
        </tr>
    )
}