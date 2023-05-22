import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useFetcher, useLoaderData } from "@remix-run/react";
import FarmingRepartition from "~/components/Farming/FarmingRepartition";
import ProjectIdentification from "~/components/Farming/ProjectIdentification";
import { userPrefs } from "~/cookie";
import { db } from "~/utils/db.server";
import FarmingAllocation from "~/components/Farming/FarmingAllocation";
import KPI from "~/components/Farming/FarmKPI";
import FarmDetail, { FarmType } from "~/components/Farming/FarmDetail";
import ConnectDialog from "~/components/Connection/ConnectDialog";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { getImageUrl, getStarkscanUrl, shortenNumber, shortenNumberWithDigits } from "~/utils/utils";
import AssetsManagementDialog, { AssetsManagementContext, AssetsManagementTabs } from "~/components/Farming/AssetsManagement/Dialog";
import _, { isNumber } from "lodash";
import { GRAMS_PER_TON } from "~/utils/constant";
import type { Abi } from "starknet";
import { useNotifications } from "~/root";
import { NotificationSource } from "~/utils/notifications/sources";
import { TxStatus } from "~/utils/blockchain/status";
import InfiniteProgress from "~/components/Loaders/InfiniteProgress";

export interface OverviewProps {
    total_removal: NumericValueProps;
    tvl: NumericValueProps;
    apr: any;
    total_yielded: NumericValueProps;
    total_offseted: NumericValueProps;
}

interface NumericValueProps {
    displayable_value: string;
    type: string;
    value: any;
}

interface ClaimableProps {
    available: NumericValueProps;
    total: NumericValueProps;
}

export interface CarbonCreditsProps {
    generated_credits: NumericValueProps;
    to_be_generated: NumericValueProps;
    offset: ClaimableProps;
    yield: ClaimableProps;
    min_to_claim: NumericValueProps;
}

export interface AssetsAllocationProps {
    yield: NumericValueProps;
    offseted: NumericValueProps;
    total: NumericValueProps;
    undeposited: NumericValueProps;
    tokens: TokenProps[];
}

interface TokenProps {
    project_address: string;
    slot: string;
    token_id: string;
    value: any;
    wallet: string;
}

export interface ContractsProps {
    offseter: string;
    offseter_abi: Abi;
    yielder: string;
    yielder_abi: Abi;
    payment: string;
    payment_abi: Abi;
    project: string;
    project_abi: Abi;
}

export const loader: LoaderFunction = async ({
    params, request
  }) => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        // If the user has selected a network, use that. Otherwise, use the default network.
        const selectedNetwork = await db.network.findFirst({
            where: {
                ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
        });

        const slug = params.slug;
        const indexerURL = selectedNetwork?.id === 'testnet' ? process.env.INDEXER_TESTNET_URL : process.env.INDEXER_URL;
        const data = await fetch(`${indexerURL}/projects/${slug}`, {});
        const project = await data.json();

        return json({slug, selectedNetwork, project: project.data});
    } catch (e) {
        throw new Response("Not Found", {status: 404})
    }
};

export default function FarmingPage() {
    const { project, slug } = useLoaderData();
    const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
    const { address, isConnected } = useAccount();
    const fetcher = useFetcher();
    const [overview, setOverview] = useState<OverviewProps | undefined>(undefined);
    const [carbonCredits, setCarbonCredits] = useState<CarbonCreditsProps | undefined>(undefined);
    const [assetsAllocation, setAssetsAllocation] = useState<AssetsAllocationProps | undefined>(undefined);
    const [contracts, setContracts] = useState<ContractsProps | undefined>(undefined);
    const [tonEquivalent, setTonEquivalent] = useState<string>('0');
    const [isAssetsManagementDialogOpen, setIsAssetsManagementDialogOpen] = useState(false);
    const [context, setContext] = useState<AssetsManagementContext>(AssetsManagementContext.CLAIM);
    const [tab, setTab] = useState<AssetsManagementTabs>(AssetsManagementTabs.YIELD);
    const fetcherPortfolio = useFetcher();
    const [portfolio, setPortfolio] = useState([] as any);
    const [mustMigrate, setMustMigrate] = useState(false);
    const [callData, setCallData] = useState<any>({});
    const [txHash, setTxHash] = useState<string | undefined>("");
    const { notifs, setNotifs, defautlNetwork, mustReloadFarmingPage, setMustReloadFarmingPage } = useNotifications();
    const [starkscanUrl, setStarkscanUrl] = useState(getStarkscanUrl(defautlNetwork.id));
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        if (isConnected) {
            fetcherPortfolio.load(`/portfolio/load?wallet=${address}`);
            fetcher.load(`/farming/detail?wallet=${address}&slug=${slug}`);
            setMustReloadFarmingPage(false);
        }
    }, [address, isConnected]);

    // Set portfolio data when data is loaded
    useEffect(() => {
        if (isConnected && fetcherPortfolio.data !== undefined) {
            setPortfolio(fetcherPortfolio.data.data.projects);
        }
    }, [fetcherPortfolio, isConnected]);

    useEffect(() => {
        if (isConnected === undefined || isConnected || isConnectDialogOpen) { return; }

        setIsConnectDialogOpen(true);
    }, [isConnected]);

    useEffect(() => {
        if (isConnected && fetcher.data !== undefined && fetcher.data !== null) {
            const data = fetcher.data.data;
            setOverview(data.overview);
            setCarbonCredits(data.carbon_credits);
            setAssetsAllocation(data.allocation);
            setContracts(data.contracts);
            setTonEquivalent(data.ton_equivalent);
        }
    }, [fetcher, isConnected,]);

    useEffect(() => {
        if (portfolio?.length > 0) {
            const projectsToMigrate = _.filter(portfolio, project => project.tokens.some((token: any) => !token.hasOwnProperty("value"))); 
            setMustMigrate(projectsToMigrate.find(asset => asset.name === project.name) !== undefined);
        }
    }, [portfolio, project.name]);

    useEffect(() => {
        if (mustReloadFarmingPage === true) {
            setTimeout(() => {
                fetcher.load(`/farming/detail?wallet=${address}&slug=${slug}`);
                setMustReloadFarmingPage(false);
            }, 4000);
        }
    }, [mustReloadFarmingPage]);

    const { write, data: dataExecute } = useContractWrite(callData);

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
                txStatus: TxStatus.NOT_RECEIVED,
                message: {
                    title: `Claiming $${carbonCredits?.yield.available.value.value} in ${project.name} yield farm`, 
                    message: 'Your transaction is ' + TxStatus.NOT_RECEIVED, 
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);
        }
    }, [txHash]);

    const handleClaimYield = async () => {
        setCallData((cd: any) => {

            return {
                calls: {
                    contractAddress: contracts?.yielder,
                    entrypoint: 'claim',
                    calldata: []
                },
                metadata: {
                    method: 'Claim',
                    message: `Claim from yield farm`
                }
            }
        });
        write();
    }

    const handleClaimOffset = async () => {
        setContext(AssetsManagementContext.CLAIM);
        setTab(AssetsManagementTabs.OFFSET);
        setIsAssetsManagementDialogOpen(true);
    }

    const handleDeposit = async () => {
        setContext(AssetsManagementContext.DEPOSIT);
        setTab(AssetsManagementTabs.YIELD);
        setIsAssetsManagementDialogOpen(true);
    }

    const handleWithdraw = async () => {
        setContext(AssetsManagementContext.WITHDRAW);
        setTab(AssetsManagementTabs.YIELD);
        setIsAssetsManagementDialogOpen(true);
    }

    useEffect(() => {
        if (project.uri?.data.image) {
            getImageUrl(project.uri.data.image).then((url) => {
                setImageSrc(url);
            });
        }
    }, [project]);

    return (
        <>
             <div className="relative w-full">
                <div className="w-full bg-mint p-8 md:py-16">
                    <div className="max-w-6xl mx-auto pl-4 xl:pl-8">
                        <div className="w-full grid grid-cols-2 gap-4 items-center">
                            <div className="col-span-2 md:col-span-1">
                                <ProjectIdentification name={project.name} imageSrc={imageSrc} slug={project.slug} />
                            </div>
                            <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
                                <FarmingRepartition 
                                    yieldAmount={overview?.total_yielded.displayable_value ? parseFloat(overview?.total_yielded.displayable_value) : 0} 
                                    offsetAmount={overview?.total_offseted.displayable_value ? parseFloat(overview?.total_offseted.displayable_value) : 0} 
                                />
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-4 gap-4 mx-auto items-center mt-10 text-left md:mt-18 md:grid-cols-8 2xl:grid-cols-12 md:gap-12">
                            <div className="col-span-2 md:col-span-3 2xl:col-span-5">
                                <KPI 
                                    title="Total Removal" 
                                    value={overview?.total_removal.displayable_value ? shortenNumber(parseFloat(overview?.total_removal.displayable_value) / GRAMS_PER_TON) : "-"} 
                                    unit="t" 
                                    large={true} 
                                />
                            </div>
                            <div className="col-span-2 md:col-span-3 2xl:col-span-5">
                                <KPI 
                                    title="TVL" 
                                    value={overview?.tvl.displayable_value ? shortenNumber(parseFloat(overview?.tvl.displayable_value)) : "-"} 
                                    unit="$" 
                                    large={true} 
                                />
                            </div>
                            <div className="col-span-2 md:col-span-2">
                                <KPI 
                                    title="Current APR" 
                                    value={overview?.apr === 'n/a' ? '- %' : `${shortenNumber(overview?.apr)}%`} 
                                    large={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                { (fetcher.state === "loading" || fetcherPortfolio.state === "loading" ) && <InfiniteProgress />}
                <div className="relative w-full px-4 py-10 md:py-16 max-w-6xl lg:px-8 mx-auto 2xl:px-0">
                    <div className="md:pl-4 xl:pl-8">
                        <div className="font-inter font-semibold uppercase text-neutral-100 text-lg md:text-xl">Carbon credits</div>
                        <div className="flex flex-wrap mt-4 items-start md:mt-8">
                            <div className="w-full grid grid-cols-2 gap-6 md:w-3/12 md:border-r md:border-neutral-300">
                                <div className="w-full md:col-span-2 md:mt-2">
                                    <KPI 
                                        title="Generated to date" 
                                        value={carbonCredits?.generated_credits.displayable_value && tonEquivalent !== '0' ? shortenNumberWithDigits(parseFloat(carbonCredits?.generated_credits.displayable_value) / parseInt(tonEquivalent), 2) : "-"} 
                                        unit="CC" 
                                        large={false} 
                                    />
                                </div>
                                <div className="w-full md:col-span-2 md:mt-12">
                                    <KPI 
                                        title="To be generated" 
                                        value={carbonCredits?.to_be_generated.displayable_value && tonEquivalent !== '0' ? shortenNumberWithDigits(parseFloat(carbonCredits?.to_be_generated.displayable_value) / parseInt(tonEquivalent), 2) : "-"} 
                                        unit="CC" 
                                        large={false} 
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-9/12 md:pl-8">
                                <div className="mt-12 md:mt-0">
                                    <FarmDetail 
                                        type={FarmType.YIELD} 
                                        total={carbonCredits?.yield.total.displayable_value ? shortenNumber(parseFloat(carbonCredits?.yield.total.displayable_value)) : "-"} 
                                        available={carbonCredits?.yield.available.displayable_value ? shortenNumberWithDigits(parseFloat(carbonCredits?.yield.available.displayable_value), 6) : "-"} 
                                        canClaim={carbonCredits ? parseFloat(carbonCredits?.yield.available.displayable_value) > 0 : false}
                                        handleClaim={handleClaimYield} 
                                    />
                                </div>
                                <div className="mt-12">
                                    <FarmDetail 
                                        type={FarmType.OFFSET} 
                                        total={carbonCredits?.offset.total.displayable_value && tonEquivalent !== '0' ? shortenNumber(parseFloat(carbonCredits?.offset.total.displayable_value) / parseInt(tonEquivalent)) : "-"} 
                                        available={carbonCredits?.offset.available.displayable_value && tonEquivalent !== '0' ? shortenNumberWithDigits(parseFloat(carbonCredits?.offset.available.displayable_value) / parseInt(tonEquivalent), 6) : "-"}
                                        canClaim={carbonCredits ? parseFloat(carbonCredits?.offset.available.displayable_value) > parseFloat(carbonCredits?.min_to_claim.displayable_value): false}
                                        handleClaim={handleClaimOffset} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <FarmingAllocation 
                            yieldAmount={assetsAllocation?.yield.displayable_value ? parseFloat(assetsAllocation?.yield.displayable_value) : 0} 
                            offsetAmount={assetsAllocation?.offseted.displayable_value ? parseFloat(assetsAllocation?.offseted.displayable_value) : 0} 
                            undepositedAmount={assetsAllocation?.undeposited.displayable_value ? parseFloat(assetsAllocation?.undeposited.displayable_value) : 0} 
                            total={assetsAllocation?.total.displayable_value ? parseFloat(assetsAllocation?.total.displayable_value) : 0} 
                            handleDeposit={handleDeposit} 
                            handleWithdraw={handleWithdraw} 
                            mustMigrate={mustMigrate} 
                        />
                    </div>
                    <div className="relative bg-farming-footer bg-no-repeat bg-center bg-cover px-8 py-12 mt-12 rounded-2xl overflow-hidden md:p-16">
                        <div className="font-inter font-bold text-white text-3xl md:text-4xl">
                            Learn more about<br/>
                            {project.name}
                        </div>
                        <NavLink to={`/launchpad/${slug}`} className="font-inter text-white font-light uppercase text-xs mt-4 inline-flex items-center border border-white rounded-full px-4 py-1 md:text-sm md:py-2 hover:bg-opacityLight-5">Go to project page &nbsp;&nbsp; <span className="text-base mt-[-3px]">&gt;</span></NavLink>
                        <img src={imageSrc} alt={`${slug} NFT card`} className="absolute bottom-[-28px] right-2 w-28 rounded-[8.8%] md:w-[280px] md:bottom-[-80px] md:right-6 lg:w-[300px] lg:bottom-[-100px]" />
                    </div>
                </div>
            </div>
            <ConnectDialog isOpen={isConnectDialogOpen} setIsOpen={setIsConnectDialogOpen} />
            <AssetsManagementDialog isOpen={isAssetsManagementDialogOpen} setIsOpen={setIsAssetsManagementDialogOpen} context={context} tab={tab} assetsAllocation={assetsAllocation} contracts={contracts} project={project} carbonCredits={carbonCredits} tonEquivalent={tonEquivalent} />
        </>
    )
}