import { useEffect, useState } from "react";
import SecondaryButton from "../Buttons/ActionButton";
import { useAccount } from "@starknet-react/core";
import ConnectDialog from "../Connection/ConnectDialog";
import EarnMoreDialog from "./EarnMoreDialog";
import { useQuery } from "@apollo/client";
import { GET_MY_RANK } from "~/graphql/queries/leaderboard";
import { LeaderboardSource } from "~/utils/constant";

export default function HeaderPersonal({ source, walletAddress }: { source: LeaderboardSource, walletAddress?: string }) {
    const { isConnected } = useAccount();
    const [isConnectOpen, setIsConnectOpen] = useState(false);

    const [isEarnMoreOpen, setIsEarnMoreOpen] = useState(false);

    const handleConnect = () => {
        if (isConnected) { return; }

        setIsConnectOpen(true);
    }

    const handleEarnMore = () => {
        setIsEarnMoreOpen(true);
    }

    return (
        <div className="block border rounded-lg border-neutral-500 bg-opacityLight-10 p-4">
            <div className="font-medium text-neutral-100">Your points</div>
            <div className="text-neutral-200 mt-2 text-sm">
                Points are proof of contributions to the Carbonable Ecosystem. Earn more points by realizing eligible actions below.
            </div>
            <div className="mt-6 flex items-center text-4xl">
                <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-6 w-6 mr-3" />
                <div className="text-neutral-50 font-light">
                    { !isConnected && source === LeaderboardSource.GLOBAL && <
                        span>0</span> 
                    }
                    { (isConnected || source === LeaderboardSource.PERSONAL) && 
                        <ConnectedHeader walletAddress={walletAddress} />
                    }
                </div>
            </div>
            <div className="mt-6">
                { !isConnected && <SecondaryButton onClick={handleConnect}>Connect wallet</SecondaryButton> }
                { isConnected && <SecondaryButton onClick={handleEarnMore}>Earn more points</SecondaryButton> }
            </div>
            <ConnectDialog isOpen={isConnectOpen} setIsOpen={setIsConnectOpen} />
            <EarnMoreDialog isOpen={isEarnMoreOpen} setIsOpen={setIsEarnMoreOpen} walletAddress={walletAddress} />
        </div>
    )
}

function ConnectedHeader({walletAddress}: {walletAddress?: string}) {
    const { address } = useAccount();
    const [points, setPoints] = useState(0);
    const addressToUse = walletAddress || address;

    const { error, data } = useQuery(GET_MY_RANK, {
        variables: {
            wallet_address: addressToUse
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
        <span>{points.toLocaleString('en-US').replace(/,/g, ' ')}</span>
    )
}