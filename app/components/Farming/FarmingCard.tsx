import type { Project } from "@prisma/client";
import { sample } from 'lodash';
import { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";

export default function FarmingCard({project}: {project: Project}) {
    // TODO: Replace with real data
    const [deposited, setDeposited] = useState(sample([false]));
    const [type, setType] = useState(sample(['blue', 'green', 'orange']));
    const { status } = useAccount();
    
    useEffect(() => {
        if (status === "connected") {
            setDeposited(sample([true, false]));
        }
    }, [status])
    

    return (
        <div className={`relative rounded-3xl p-[1px] ${type === 'blue' ? "bg-farming-border-blue" : ""} ${type === 'green' ? "bg-farming-border-green" : ""} ${type === 'orange' ? "bg-farming-border-orange" : ""}`}>
            <div className="w-full bg-neutral-800 rounded-3xl">
                <div className={`relative rounded-3xl p-6 ${type === 'blue' ? "bg-farming-header-blue" : ""} ${type === 'green' ? "bg-farming-header-green" : ""} ${type === 'orange' ? "bg-farming-header-orange" : ""}`}>
                    <div className="grid grid-cols-2">
                        <div className="text-left">
                            <div className="font-inter text-neutral-100">My stake</div>
                            <div className="font-inter text-neutral-300 mt-1">$0</div>
                        </div>
                        <div className="text-right">
                            <div className="font-inter text-neutral-100">Farming APR</div>
                            <div className="font-inter text-neutral-300 mt-1">23.6%</div>
                        </div>
                    </div>
                </div>
                <div className={`w-full h-[1px] ${type === 'blue' ? "bg-farming-separator-blue" : ""} ${type === 'green' ? "bg-farming-separator-green" : ""} ${type === 'orange' ? "bg-farming-separator-orange" : ""}`}></div>
            </div>
        </div>
    )
}
