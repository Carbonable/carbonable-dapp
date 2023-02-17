import type { Project } from "@prisma/client";
import { sample } from 'lodash';
import { useEffect, useState } from "react";
import { useAccount, useConnectors } from "@starknet-react/core";
import { IPFS_GATEWAY } from "~/utils/links";
import { FarmingButton } from "../Buttons/ActionButton";
import { NavLink } from "@remix-run/react";
import ConnectDialog from "../Connection/ConnectDialog";

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
        <div className={`relative rounded-3xl p-[1px] max-w-md min-w-[350px] ${type === 'blue' ? "bg-farming-border-blue" : ""} ${type === 'green' ? "bg-farming-border-green" : ""} ${type === 'orange' ? "bg-farming-border-orange" : ""} hover:brightness-[108%]`}>
            <NavLink to={`/farming/${project.slug}`} className="w-full">
                <div className="w-full bg-neutral-800 rounded-t-3xl">
                    <div className={`relative rounded-t-3xl p-6 ${type === 'blue' ? "bg-farming-header-blue" : ""} ${type === 'green' ? "bg-farming-header-green" : ""} ${type === 'orange' ? "bg-farming-header-orange" : ""}`}>
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
                    <div className="relative text-center p-4 bg-farming-card-bg">
                        <img src={IPFS_GATEWAY + project.imageIpfs} alt={`${project.slug} NFT card`} className="w-[66px] rounded-full absolute top-[-33px] left-[calc(50%_-_33px)] border border-neutral-50" />
                        <div className="font-inter font-medium text-neutral-100 text-lg pt-8">
                            {project.name}
                        </div>
                        <div className="mt-4 flex items-center w-full justify-center">
                            <Tag text="Live" color="text-greenish-500" />
                            <Tag text="Undeposited" color="text-darkRed" count={5} />
                        </div>
                        <div className="grid grid-cols-2 mt-8 font-inter text-sm px-2">
                            <div className="text-left text-neutral-100">
                                <div>Total Value Locked</div>
                                <div>Total Removal</div>
                            </div>
                            <div className="text-right text-neutral-300">
                                <div>$0</div>
                                <div>t0</div>
                            </div>
                            <div className="h-[1px] w-9/12 mx-auto my-4 bg-opacityLight-5 col-span-2"></div>
                            <div className="text-left text-neutral-100">
                                <div>Your Yield Rewards</div>
                                <div>Your Offset Rewards</div>
                            </div>
                            <div className="text-right text-neutral-300">
                                <div>$0</div>
                                <div>t0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
            <div className="w-full bg-farming-card-bg rounded-b-3xl p-4">
                <ActionButtons />
            </div>
        </div>
    )
}

function Tag({text, color, count}: {text: string, color: string, count?: number}) {
    return (
        <div className={`flex items-center justify-center rounded-3xl pl-3 ${(count !==  undefined && count > 0) ? "pr-1" : "pr-3"} py-1 ${color}  font-inter font-light text-sm bg-opacityLight-5 ${count !== undefined ? "ml-2" : ""}`}>
            <div>{text}</div>
            { (count !==  undefined && count > 0) && <div className="bg-opacityLight-10 rounded-full min-w-[24px] min-h-[24px] ml-2 flex justify-center items-center">{count}</div>}
        </div>
    )
}

function ActionButtons(){
    const { connect, available } = useConnectors();
    const { status } = useAccount();
    let [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (status === "connected") { return; }


        if (available.length === 1) {
            connect(available[0]);
            return;
        }

        setIsOpen(true);
    }

    if (status === "connected") {
        return (
            <div className="flex gap-x-2">
                <FarmingButton className="w-1/2 rounded-xl">Claim Yield</FarmingButton>
                <FarmingButton className="w-1/2 rounded-xl">Claim Offset</FarmingButton>
            </div>
        )
    }

    return (
        <>
            <FarmingButton className="w-full rounded-xl" onClick={handleClick}>Connect Wallet</FarmingButton>
            <ConnectDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
