import { useState } from "react";
import SecondaryButton from "../Buttons/ActionButton";
import { useAccount } from "@starknet-react/core";
import ConnectDialog from "../Connection/ConnectDialog";

export default function HeaderPersonal() {
    const { isConnected } = useAccount();
    const [isOpen, setIsOpen] = useState(false);
    const points = 0;

    const handleConnect = () => {
        if (isConnected) { return; }

        setIsOpen(true);
    }

    return (
        <div className="block border rounded-lg border-neutral-500 bg-opacityLight-10 p-4">
            <div className="font-medium text-neutral-100">Your points</div>
            <div className="text-neutral-200 mt-2 text-sm">
                Points are proof of contributions to the Carbonable Ecosystem. Earn more points by realizing eligible actions below.
            </div>
            <div className="mt-6 flex items-center text-4xl">
                <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-6 w-6 mr-3" />
                <div className="text-neutral-50 font-light">{isConnected ? points.toLocaleString('en-US').replace(/,/g, ' ') : '0'}</div>
            </div>
            <div className="mt-6">
                {isConnected  && <SecondaryButton>Earn more points</SecondaryButton>}
                {!isConnected  && <SecondaryButton onClick={handleConnect}>Connect wallet</SecondaryButton>}
            </div>
            <ConnectDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}