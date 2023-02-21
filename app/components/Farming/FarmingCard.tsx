import { sample } from 'lodash';
import { useEffect, useState } from "react";
import { useAccount, useConnectors } from "@starknet-react/core";
import { IPFS_GATEWAY } from "~/utils/links";
import { FarmingButton } from "../Buttons/ActionButton";
import { NavLink, useFetcher } from "@remix-run/react";
import ConnectDialog from "../Connection/ConnectDialog";
import { ipfsUrl, shortenNumber } from "~/utils/utils";
import { Color, FarmStatus, getTraitValue, Traits } from '~/utils/blockchain/traits';

export default function FarmingCard({project}: {project: any}) {
    // TODO: Replace with real data
    const color = getTraitValue(project.Uri.data.attributes, Traits.COLOR);
    const farmStatus = getTraitValue(project.Uri.data.attributes, Traits.STATUS);
    const { status, address } = useAccount();
    const unconnectedFetcher = useFetcher();
    const connectedUserFetcher = useFetcher();
    const [apr, setApr] = useState('-');
    const [tvl, setTvl] = useState('-');
    const [totalRemoval, setTotalRemoval] = useState('-');
    const [myStake, setMyStake] = useState('-');
    const [yieldRewards, setYieldRewards] = useState('-');
    const [offsetRewards, setOffsetRewards] = useState('-');
    const [undepositedCount, setUndepositedCount] = useState(0);
    const [minAbsorbtionToClaim, setMinAbsorbtionToClaim] = useState(1);

    useEffect(() => {
        if (unconnectedFetcher.data === undefined && unconnectedFetcher.type === "init") {
            unconnectedFetcher.load(`/farming/list/unconnected?slug=${project.slug}`);
        }

        if (unconnectedFetcher.data !== undefined) {
            const data = unconnectedFetcher.data.data;
            isNaN(data?.apr) ? setApr(data?.apr) : setApr(shortenNumber(parseFloat(data?.apr)));
            setTvl(shortenNumber(parseFloat(data?.tvl)));
            setTotalRemoval(shortenNumber(parseFloat(data?.total_removal)));
        }
    }, [unconnectedFetcher, project.slug]);

    useEffect(() => {
        if (connectedUserFetcher.data === undefined && connectedUserFetcher.type === "init" && status === "connected") {
            connectedUserFetcher.load(`/farming/list/customer?wallet=${address}&slug=${project.slug}`);
        }

        if (connectedUserFetcher.data !== undefined && status === "connected") {
            if(connectedUserFetcher.data === 404 || connectedUserFetcher.data.length === 0) {
                setMyStake('0');
                setYieldRewards('0');
                setOffsetRewards('0');
                setUndepositedCount(0);
                setMinAbsorbtionToClaim(1);
                return;
            }
            
            const data = connectedUserFetcher.data.data;
            isNaN(data?.customer_stake) ? setMyStake('0') : setMyStake(shortenNumber(parseFloat(data?.customer_stake)));
            isNaN(data?.vesting_to_claim) ? setYieldRewards('0') : setYieldRewards(shortenNumber(parseFloat(data?.vesting_to_claim)));
            isNaN(data?.absorption_to_claim) ? setOffsetRewards('0') : setOffsetRewards(shortenNumber(parseFloat(data?.absorption_to_claim)));
            isNaN(data?.undeposited) ? setUndepositedCount(0) : setUndepositedCount(data?.undeposited);
            isNaN(data?.min_to_claim) ? setMinAbsorbtionToClaim(1) : setMinAbsorbtionToClaim(data?.min_to_claim);

        }
    }, [connectedUserFetcher, address, status, project.slug]);

    return (
        <div className={`relative rounded-3xl p-[1px] max-w-md min-w-[350px] ${color === Color.BLUE ? "bg-farming-border-blue" : ""} ${color === Color.GREEN ? "bg-farming-border-green" : ""} ${color === Color.BROWN ? "bg-farming-border-orange" : ""} hover:brightness-[108%]`}>
            <NavLink to={`/farming/${project.slug}`} className="w-full">
                <div className="w-full bg-neutral-800 rounded-t-3xl">
                    <div className={`relative rounded-t-3xl p-6 ${color === Color.BLUE ? "bg-farming-header-blue" : ""} ${color === Color.GREEN ? "bg-farming-header-green" : ""} ${color === Color.BROWN ? "bg-farming-header-orange" : ""}`}>
                        <div className="grid grid-cols-2">
                            <div className="text-left">
                                <div className="font-inter text-neutral-100">My stake</div>
                                <div className="font-inter text-neutral-300 mt-1"><span className='mr-[2px]'>$</span>{myStake}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-inter text-neutral-100">Farming APR</div>
                                <div className="font-inter text-neutral-300 mt-1">{apr}<span className='ml-[2px]'>%</span></div>
                            </div>
                        </div>
                    </div>
                    <div className={`w-full h-[1px] ${color === Color.BLUE ? "bg-farming-separator-blue" : ""} ${color === Color.GREEN ? "bg-farming-separator-green" : ""} ${color === Color.BROWN ? "bg-farming-separator-orange" : ""}`}></div>
                    <div className="relative text-center p-4 bg-farming-card-bg">
                        <img src={IPFS_GATEWAY + ipfsUrl(project.Uri.data.image)} alt={`${project.slug} NFT card`} className="w-[66px] rounded-full absolute top-[-33px] left-[calc(50%_-_33px)] border border-neutral-50" />
                        <div className="font-inter font-medium text-neutral-100 text-lg pt-8">
                            {project.name}
                        </div>
                        <div className="mt-4 flex items-center w-full justify-center">
                            <FarmStatusComponent status={farmStatus} />
                            <UndepositedComponent count={undepositedCount} />
                        </div>
                        <div className="grid grid-cols-2 mt-8 font-inter text-sm px-2">
                            <div className="text-left text-neutral-100">
                                <div>Total Value Locked</div>
                                <div>Total Removal</div>
                            </div>
                            <div className="text-right text-neutral-300">
                                <div><span className='mr-[2px]'>$</span>{tvl}</div>
                                <div><span className='mr-[2px]'>t</span>{totalRemoval}</div>
                            </div>
                            <div className="h-[1px] w-9/12 mx-auto my-4 bg-opacityLight-5 col-span-2"></div>
                            <div className="text-left text-neutral-100">
                                <div>Your Yield Rewards</div>
                                <div>Your Offset Rewards</div>
                            </div>
                            <div className="text-right">
                                <div><span className={`mr-[2px] ${yieldRewards === '0' ? "text-neutral-300" : "text-neutral-100"}`}>$</span>{yieldRewards}</div>
                                <div><span className={`mr-[2px] ${offsetRewards === '0' ? "text-neutral-300" : "text-neutral-100"}`}>t</span>{offsetRewards}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
            <div className="w-full bg-farming-card-bg rounded-b-3xl p-4">
                <ActionButtons minAbsorbtionToClaim={minAbsorbtionToClaim} offsetRewards={offsetRewards} />
            </div>
        </div>
    )
}

function FarmStatusComponent({status}: {status: string}) {
    switch (status) {
        case FarmStatus.ACTIVE:
            return <Tag text="Live" color="text-greenish-500" />;
        case FarmStatus.UPCOMING:
            return <Tag text="Upcoming" color="text-blue-light" />;
        case FarmStatus.PAUSED:
            return <Tag text="Paused" color="text-orange-light" />;
        case FarmStatus.STOPPED:
            return <Tag text="Stopped" color="text-darkRed" />;
        case FarmStatus.ENDED:
            return <Tag text="Ended" color="text-greenish-700" />;
    }
    return null;
}

function UndepositedComponent({count}: {count: number}) {
    if (count === 0) { return null; }

    return (
        <Tag text="Undeposited" color="text-darkRed" count={count} />
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

function ActionButtons({minAbsorbtionToClaim, offsetRewards}: {minAbsorbtionToClaim: number, offsetRewards: string}) {
    const { connect, available } = useConnectors();
    const { status } = useAccount();
    let [isOpen, setIsOpen] = useState(false);
    const canClaim = parseFloat(offsetRewards) >= minAbsorbtionToClaim;

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
                {canClaim && <FarmingButton className="w-1/2 rounded-xl">Claim Offset</FarmingButton>}
                {!canClaim && <FarmingButton className="w-1/2 rounded-xl cursor-not-allowed">Claim Offset</FarmingButton>}
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
