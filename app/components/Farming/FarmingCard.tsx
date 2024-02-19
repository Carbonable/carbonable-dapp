import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { FarmingButton } from "../Buttons/ActionButton";
import { NavLink, useFetcher, useNavigate } from "@remix-run/react";
import ConnectDialog from "../Connection/ConnectDialog";
import { getImageUrlFromMetadata, getStarkscanUrl, shortenNumber, shortenNumberWithDigits } from "~/utils/utils";
import type { Color } from '~/utils/blockchain/traits';
import { FarmStatus, getTraitValue, Traits } from '~/utils/blockchain/traits';
import _ from "lodash";
import { GRAMS_PER_TON } from "~/utils/constant";
import type { Call} from "starknet";
import { TransactionStatus, num } from "starknet";
import type { ContractsProps } from "~/interfaces/farming";
import { useNotifications } from "~/root";
import { NotificationSource } from "~/utils/notifications/sources";
import SVGMetadata from "../Images/SVGMetadata";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const enum CardLocation {
    HEADER = "header",
    BORDER = "border",
    SEPARATOR = "separator",
}

export default function FarmingCard({project, portfolio}: {project: any, portfolio: any[]}) {
    const color = getTraitValue(project.uri?.data?.attributes, Traits.COLOR);
    const farmStatus = getTraitValue(project.uri?.data?.attributes, Traits.STATUS);
    const { isConnected, address } = useAccount();
    const unconnectedFetcher = useFetcher();
    const connectedUserFetcher = useFetcher();
    const [tvl, setTvl] = useState('-');
    const [totalRemoval, setTotalRemoval] = useState('-');
    const [myStake, setMyStake] = useState('-');
    const [resaleRewards, setResaleRewards] = useState('-');
    const [offsetRewards, setOffsetRewards] = useState('-');
    const [undepositedCount, setUndepositedCount] = useState(0);
    const [mustMigrate, setMustMigrate] = useState(false);
    const [canClaimResale, setCanClaimResale] = useState(false);
    const [canClaimOffset, setCanClaimOffset] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [calls, setCalls] = useState<Call[]>([]);
    const [contracts, setContracts] = useState<ContractsProps | undefined>(undefined);
    const [txHash, setTxHash] = useState<string | undefined>("");
    const { notifs, setNotifs, defaultNetwork: defaultNetwork, mustReloadFarmingPage, setMustReloadFarmingPage } = useNotifications();
    const [starkscanUrl] = useState(getStarkscanUrl(defaultNetwork));
    const [claimContext, setClaimContext] = useState<any>("Resale");
    const [isRawSVG, setIsRawSVG] = useState<boolean>(false);

    useEffect(() => {
        if (project.uri.uri) {
            getImageUrlFromMetadata(project.uri.uri).then((url) => {
                setImageSrc(url.imgUrl);
                setIsRawSVG(url.isSvg);
            });
        }
    }, [project]);

    useEffect(() => {
        if (unconnectedFetcher.data === undefined) {
            unconnectedFetcher.load(`/farming/list/unconnected?slug=${project.slug}`);
        }

        if (unconnectedFetcher.data !== undefined) {
            const data = unconnectedFetcher.data.data;
            
            if (data === undefined) { return; }

            setTvl(shortenNumber(parseFloat(data?.tvl.displayable_value)));
            setTotalRemoval(shortenNumber(parseFloat(data?.total_removal.displayable_value) / GRAMS_PER_TON));
        }
    }, [unconnectedFetcher.data]);

    useEffect(() => {
        if (isConnected) {
            connectedUserFetcher.load(`/farming/list/customer?wallet=${address}&slug=${project.slug}`);
        }
    }, [address, isConnected]);

    useEffect(() => {
        if (mustReloadFarmingPage === true) {
            setTimeout(() => {
                connectedUserFetcher.load(`/farming/list/customer?wallet=${address}&slug=${project.slug}`);
                setMustReloadFarmingPage(false);
            }, 4000);
        }
    }, [mustReloadFarmingPage]);

    useEffect(() => {
        if (isConnected && connectedUserFetcher.data !== undefined) {
            if(connectedUserFetcher.data.code === 404 || connectedUserFetcher.data.length === 0) {
                setMyStake('0');
                setResaleRewards('0');
                setOffsetRewards('0');
                setUndepositedCount(0);
                return;
            }

            const data = connectedUserFetcher.data.data;

            isNaN(data?.customer_investment.displayable_value) ? setMyStake('0') : setMyStake(shortenNumber(parseFloat(data?.customer_investment.displayable_value)));
            isNaN(data?.vesting_to_claim.displayable_value) ? setResaleRewards('0') : setResaleRewards(shortenNumberWithDigits(parseFloat(data?.vesting_to_claim.displayable_value), 6));
            isNaN(data?.absorption_to_claim.displayable_value) || parseFloat(num.hexToDecimalString(data.ton_equivalent)) === 0 ? setOffsetRewards('0') : setOffsetRewards(shortenNumberWithDigits(parseFloat(data?.absorption_to_claim.displayable_value) / parseFloat(num.hexToDecimalString(data.ton_equivalent)), 6));
            isNaN(data?.undeposited.displayable_value) ? setUndepositedCount(0) : setUndepositedCount(data?.undeposited.displayable_value);
            setCanClaimResale(parseFloat(data?.vesting_to_claim.displayable_value) > 0);
            setCanClaimOffset(parseFloat(data?.absorption_to_claim.displayable_value) > data?.min_to_claim.displayable_value);
            setContracts(data.contracts);
        }

        if (!isConnected) {
            setMyStake('-');
            setResaleRewards('-');
            setOffsetRewards('-');
            setUndepositedCount(0);
            return;
        }
    }, [connectedUserFetcher.data, isConnected]);

    useEffect(() => {
        if (portfolio?.length > 0) {
            const projectsToMigrate = _.filter(portfolio, project => project.tokens.some((token: any) => !token.hasOwnProperty("value")));
            setMustMigrate(projectsToMigrate.find(asset => asset.name === project.name) !== undefined);
        }
    }, [portfolio, project.name]);

    const { write, data: dataExecute } = useContractWrite({calls});

    useEffect(() => {
        setTxHash(dataExecute ? dataExecute.transaction_hash : "");
    }, [dataExecute]);

    useEffect(() => {
        // When txHash is set, add toast notification
        if (txHash !== undefined && txHash !== "" && _.find(notifs, (notification: any) => notification.txHash === txHash) === undefined) {
            setNotifs([...notifs, {
                txHash: txHash,
                project: project.id,
                source: NotificationSource.FARMING,
                txStatus: TransactionStatus.RECEIVED,
                walletAddress: address,
                message: {
                    title: claimContext === 'Resale' ? `Claiming $${resaleRewards} in ${project.name} resale farm` : `Claiming ${offsetRewards}t in ${project.name} offset farm`, 
                    message: 'Your transaction is ' + TransactionStatus.RECEIVED, 
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);
        }
    }, [txHash]);

    const handleClaimResale = async () => {
        setClaimContext("Resale");
        setCalls((cd: any) => {
            if (contracts === undefined) return ([]);

            return [
                {
                    contractAddress: contracts?.yielder,
                    entrypoint: 'claim',
                    calldata: []
                }
            ];
        });
    }

    const handleClaimOffset = async () => {
        setClaimContext("Offset");
        setCalls((cd: any) => {
            if (contracts === undefined) return ([]);

            return [
                {
                    contractAddress: contracts?.offseter,
                    entrypoint: 'claim_all',
                    calldata: []
                }
            ];
        });
    }

    useEffect(() => {
        if (calls === undefined) return;
          
        write();
    }, [calls]);

    return (
        <div className={`relative rounded-3xl p-[1px] max-w-md min-w-[350px] ${printFarmingColorClass(color, CardLocation.BORDER)} hover:brightness-[108%]`}>
            <NavLink to={`/farming/${project.slug}`} className="w-full">
                <div className="w-full bg-neutral-800 rounded-t-3xl">
                    <div className={`relative rounded-t-3xl p-6 ${printFarmingColorClass(color, CardLocation.HEADER)}`}>
                        <div className="grid grid-cols-2">
                            <div className="text-left">
                                <div className="font-inter text-neutral-100">My stake</div>
                                <div className="font-inter text-neutral-300 mt-1"><span className='mr-[2px]'>$</span>{myStake}</div>
                            </div>
                        </div>
                    </div>
                    <div className={`w-full h-[1px] ${printFarmingColorClass(color, CardLocation.SEPARATOR)}`}></div>
                    <div className="relative text-center p-4 bg-farming-card-bg">
                        {isRawSVG === false && <img src={imageSrc.startsWith('https') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`${project.slug} NFT card`} className="w-[66px] h-[66px] rounded-full absolute top-[-33px] left-[calc(50%_-_33px)] border border-neutral-50" /> }
                        {isRawSVG === true && <div className="w-[66px] h-[66px] rounded-full absolute top-[-33px] left-[calc(50%_-_33px)] border border-neutral-50 overflow-hidden"><SVGMetadata svg={imageSrc} id={project.id} /></div>}
                        <div className="font-inter font-medium text-neutral-100 text-lg pt-8">
                            {project.name}
                        </div>
                        {(unconnectedFetcher.state !== 'loading' && connectedUserFetcher.state !== 'loading') && 
                            <div className="mt-4 flex items-center w-full justify-center min-h-[36px]">
                                <FarmStatusComponent status={farmStatus} />
                                <UndepositedComponent count={undepositedCount} />
                            </div>
                        }
                        {(unconnectedFetcher.state === 'loading' || connectedUserFetcher.state === 'loading') && 
                            <div className="mt-4 flex items-center w-full justify-center min-h-[36px]">
                                <Tag text="Loading ..." color="text-neutral-400" animatedText={true} />
                            </div>
                        }
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
                                <div>Your Resale Rewards</div>
                                <div>Your Offset Rewards</div>
                            </div>
                            <div className="text-right">
                                <div className={`${resaleRewards === '0' ? "text-neutral-300" : "text-neutral-100"}`}><span className={`mr-[2px]`}>$</span>{resaleRewards}</div>
                                <div className={`${offsetRewards === '0' ? "text-neutral-300" : "text-neutral-100"}`}><span className={`mr-[2px]`}>t</span>{offsetRewards}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
            <div className="w-full bg-farming-card-bg rounded-b-3xl p-4">
                <ActionButtons 
                    canClaimResale={canClaimResale} 
                    canClaimOffset={canClaimOffset} 
                    mustMigrate={mustMigrate} 
                    handleClaimResale={handleClaimResale} 
                    handleClaimOffset={handleClaimOffset} 
                    undepositedCount={undepositedCount}
                    slug={project.slug}
                />
            </div>
        </div>
    )
}

function printFarmingColorClass(color: Color, location: CardLocation) {
    switch(location) {
        case CardLocation.HEADER:
            return `bg-farming-header-${color.toLowerCase()}`;
        case CardLocation.BORDER:
            return `bg-farming-border-${color.toLowerCase()}`;
        case CardLocation.SEPARATOR:
            return `bg-farming-separator-${color.toLowerCase()}`;
    }
}

function FarmStatusComponent({status}: {status: string}) {
    switch (status) {
        case FarmStatus.LIVE:
            return <Tag text="Live" color="text-neutral-200" />;
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
    if (count <= 0) { return null; }

    return (
        <Tag text="Undeposited" color="text-darkRed" count={count} />
    )
}

function Tag({text, color, count, animatedText}: {text: string, color: string, count?: number, animatedText?: boolean}) {
    return (
        <div className={`flex items-center justify-center rounded-3xl pl-4 min-h-[36px] ${(count !==  undefined && count > 0) ? "pr-1" : "pr-4"} py-1 ${color} font-inter font-light text-sm bg-opacityLight-5 ${count !== undefined ? "ml-2" : ""}`}>
            <div className={animatedText ? 'animatedLoading' : ''}>{text}</div>
            { (count !==  undefined && count > 0) && <div className="bg-opacityLight-10 rounded-full min-w-[28px] min-h-[24px] ml-2 flex justify-center items-center p-[4px]">{shortenNumber(count)}</div>}
        </div>
    )
}

function ActionButtons({canClaimResale, canClaimOffset, mustMigrate, handleClaimResale, handleClaimOffset, undepositedCount, slug}: 
    {canClaimResale: boolean, canClaimOffset: boolean, mustMigrate: boolean, handleClaimResale: () => void, handleClaimOffset: () => void, undepositedCount: number, slug: string}) {
    const { status } = useAccount();
    let [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (status === "connected") { return; }

        setIsOpen(true);
    }

    if (status === "connected") {
        if (mustMigrate) {
            return (
                <FarmingButton className="w-full rounded-xl !bg-greenish-600 hover:!bg-greenish-500" onClick={() => {navigate("/portfolio")}}>Migrate assets</FarmingButton>
            )
        }

        if (canClaimResale || canClaimOffset) {
            return (
                <div className="flex gap-x-2">
                    <FarmingButton className="w-1/2 rounded-xl" disabled={!canClaimResale} onClick={handleClaimResale}>Claim Resale</FarmingButton>
                    <FarmingButton className="w-1/2 rounded-xl" disabled={!canClaimOffset} onClick={handleClaimOffset}>Claim Offset</FarmingButton>
                </div>
            )
        }

        if (undepositedCount > 0) {
            return (
                <FarmingButton className="w-full rounded-xl flex items-center justify-center" onClick={() => {navigate("/farming/" + slug)}}>
                    Deposit assets
                    <ArrowRightIcon className="w-4 ml-2" />
                </FarmingButton>
            )
        }

        return (
            <div className="flex gap-x-2">
                <FarmingButton className="w-1/2 rounded-xl" disabled={true}>Claim Resale</FarmingButton>
                <FarmingButton className="w-1/2 rounded-xl" disabled={true}>Claim Offset</FarmingButton>
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
