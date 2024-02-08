import { useQuery } from "@apollo/client";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import SecondaryButton from "~/components/Buttons/ActionButton";
import ConnectDialog from "~/components/Connection/ConnectDialog";
import { GET_MY_RANK } from "~/graphql/queries/leaderboard";
import { minifyAddressOrStarknetId } from "~/utils/utils";

export default function PersonalRankingLine() {
    const { isConnected } = useAccount();
    const [isOpen, setIsOpen] = useState(false);

    const handleConnect = () => {
        if (isConnected) { return; }

        setIsOpen(true);
    }

    if (isConnected === false) {
        return (
            <tr className="h-[36px]">
                <td className="w-full flex justify-between items-center px-4">
                    <div className="text-neutral-200 font-light">
                        Connect your wallet to see your points and leaderboard position
                    </div>
                    <SecondaryButton onClick={handleConnect}>Connect wallet</SecondaryButton>
                    <ConnectDialog isOpen={isOpen} setIsOpen={setIsOpen} />
                </td>
            </tr>
        )
    }

    return (
        <ConnectedPersonalRankingLine />
    )
}

// TODO: Replace with actual rank and category points
function ConnectedPersonalRankingLine() {
    const rank = 2;
    const [points, setPoints] = useState(0);
    const { address } = useAccount();

    const { error, data } = useQuery(GET_MY_RANK, {
        variables: {
            wallet_address: address
        }
    });

    useEffect(() => {
        if (data) {
            setPoints(data.leaderboardForWallet.total_score || 0);
        }
    }, [data]);

    if (error) {
        console.error('Error fetching my score', error);
    }

    return (
        <tr className="h-[36px]">
            <td className="px-4 sticky left-0 z-10 bg-neutral-700 w-[240px]">
                <div className="flex items-center">
                    <div className="text-neutral-200 font-light min-w-[14px]">{rank}</div>
                    <div className="ml-1 mr-2 min-w-[28px]">
                        { rank === 1 && <>🥇</> }
                        { rank === 2 && <>🥈</> }
                        { rank === 3 && <>🥉</> }
                    </div>
                    <div className="text-neutral-50">{minifyAddressOrStarknetId(address, undefined)}</div>
                </div>
            </td>
            <td className="px-4">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4 w-[160px]">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-50 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
        </tr>
    )
}