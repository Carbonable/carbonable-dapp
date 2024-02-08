import { useAccount } from "@starknet-react/core";
import Share from "./Share";
import PersonalRankingLine from "../Common/Table/PersonalRankingLine";

export default function PersonalRanking() {
    const { isConnected } = useAccount();

    return (
        <>
            <div className="flex items-center justify-between font-medium text-neutral-100">
                <div className="text-left">
                    Your leaderboard position
                </div>
                <div className="text-right">
                    {isConnected && <Share />}
                </div>
            </div>
            <div className="bg-neutral-700 rounded-lg py-4 mt-4 overflow-x-scroll border border-opacityLight-10">
                <table className="table-auto text-left min-w-full whitespace-nowrap border-spacing-0">
                    <tbody className="text-left">
                        <PersonalRankingLine />
                    </tbody>
                </table>
            </div>
        </>
    )
}
