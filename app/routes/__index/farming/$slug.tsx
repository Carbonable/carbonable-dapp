import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useFetcher, useLoaderData } from "@remix-run/react";
import FarmingRepartition from "~/components/Farming/FarmingRepartition";
import ProjectIdentification from "~/components/Farming/ProjectIdentification";
import FarmingAllocation from "~/components/Farming/FarmingAllocation";
import KPI from "~/components/Farming/FarmKPI";
import FarmDetail, { FarmType } from "~/components/Farming/FarmDetail";
import ConnectDialog from "~/components/Connection/ConnectDialog";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { getImageUrlFromMetadata, getStarkscanUrl, shortenNumber, shortenNumberWithDigits } from "~/utils/utils";
import AssetsManagementDialog, { AssetsManagementContext, AssetsManagementTabs } from "~/components/Farming/AssetsManagement/Dialog";
import _ from "lodash";
import { GRAMS_PER_TON, UINT256_DECIMALS } from "~/utils/constant";
import { type Call, TransactionStatus, num } from "starknet";
import { useNotifications } from "~/root";
import { NotificationSource } from "~/utils/notifications/sources";
import InfiniteProgress from "~/components/Loaders/InfiniteProgress";
import type { AssetsAllocationProps, CarbonCreditsProps, ContractsProps, NumericValueProps, OverviewProps } from "~/interfaces/farming";
import SVGMetadata from "~/components/Images/SVGMetadata";
import type { FarmStatus} from "~/utils/blockchain/traits";
import { Traits, getTraitValue } from "~/utils/blockchain/traits";

export const loader: LoaderFunction = async ({
    params
  }) => {
    try {
        const selectedNetwork = process.env.NETWORK;
        const slug = params.slug;
        const data = await fetch(`${process.env.INDEXER_URL}/projects/${slug}`, {});
        const project = await data.json();

        return json({slug, selectedNetwork, project: project.data});
    } catch (e) {
        throw new Response("Not Found", {status: 404})
    }
};

export default function FarmingPage() {
    const { project, slug } = useLoaderData();
    const { address, isConnected } = useAccount();
    const farmStatus = getTraitValue(project.uri?.data?.attributes, Traits.STATUS) as FarmStatus;

    const fetcher = useFetcher();
    const fetcherPortfolio = useFetcher();

    const [portfolioData, setPortfolioData] = useState<any>();
    const [farmingData, setFarmingData] = useState<any>();

    const [portfolio, setPortfolio] = useState([] as any);
    const [overview, setOverview] = useState<OverviewProps | undefined>(undefined);
    const [carbonCredits, setCarbonCredits] = useState<CarbonCreditsProps | undefined>(undefined);
    const [assetsAllocation, setAssetsAllocation] = useState<AssetsAllocationProps | undefined>(undefined);
    const [contracts, setContracts] = useState<ContractsProps | undefined>(undefined);
    const [unitPrice, setUnitPrice] = useState<NumericValueProps | undefined>(undefined);
    const [tonEquivalent, setTonEquivalent] = useState<string>('0');

    const [isAssetsManagementDialogOpen, setIsAssetsManagementDialogOpen] = useState(false);
    const [context, setContext] = useState<AssetsManagementContext>(AssetsManagementContext.CLAIM);
    const [tab, setTab] = useState<AssetsManagementTabs>(AssetsManagementTabs.RESALE);
    const [mustMigrate, setMustMigrate] = useState(false);
    const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
   
    const [calls, setCalls] = useState<Call[]>([]);
    const [txHash, setTxHash] = useState<string | undefined>("");
    const { notifs, setNotifs, defaultNetwork, lastIndexerBlock } = useNotifications();
    const [starkscanUrl] = useState(getStarkscanUrl(defaultNetwork));
    
    const [imageSrc, setImageSrc] = useState<string|undefined>(undefined);
    const [isRawSVG, setIsRawSVG] = useState<boolean>(false);

    useEffect(() => {
        if (!isConnected || address === undefined) { return; }

        const lastSavedBlock = localStorage.getItem(address);

        if (lastSavedBlock === null || lastSavedBlock === undefined || parseInt(lastSavedBlock) <= lastIndexerBlock) {
            localStorage.removeItem(address);
            fetcherPortfolio.load(`/portfolio/load?wallet=${address}`);
        }

        
        
    }, [isConnected, address]);


    // Set portfolio data when data is loaded
    useEffect(() => {
        if (isConnected && fetcherPortfolio.data !== undefined && fetcherPortfolio.data.data !== undefined ) {
            setPortfolioData(fetcherPortfolio.data.data);
        }
    }, [fetcherPortfolio, isConnected]);

    // Set portfolio when portfolio data changes
    useEffect(() => {
        if (portfolioData === undefined) { return; }

        setPortfolio(portfolioData.projects);
    }, [portfolioData]);

    useEffect(() => {
        if (!isConnected || address === undefined) { return; }

        const lastSavedBlock = localStorage.getItem(address);

        if (lastSavedBlock === null || lastSavedBlock === undefined || parseInt(lastSavedBlock) <= lastIndexerBlock) {
            localStorage.removeItem(address);
            fetcher.load(`/farming/detail?wallet=${address}&slug=${slug}`);
        }

    }, [isConnected, address]);

    // Set farming data when data is loaded
    useEffect(() => {
        if (isConnected && fetcher.data !== undefined && fetcher.data !== null) {
            setFarmingData(fetcher.data.data);
        }
    }, [fetcher, isConnected]);

    // Set farming data when farming data changes
    useEffect(() => {
        if (farmingData === undefined) { return; }

        setOverview(farmingData.overview);
        setCarbonCredits(farmingData.carbon_credits);
        setAssetsAllocation(farmingData.allocation);
        setContracts(farmingData.contracts);
        setUnitPrice(farmingData.unit_price);
        setTonEquivalent(farmingData.ton_equivalent);
    }, [farmingData]);

    // Check if data from localstorage is outdated
    useEffect(() => {
        if (lastIndexerBlock === undefined || address === undefined) { return; }

        const lastSavedBlock = localStorage.getItem(address);

        if (lastSavedBlock === null) { return; }

        if (parseInt(lastSavedBlock) <= lastIndexerBlock) {
            localStorage.removeItem(address);
            fetcherPortfolio.load(`/portfolio/load?wallet=${address}`);
            fetcher.load(`/farming/detail?wallet=${address}&slug=${slug}`);
        }
    }, [lastIndexerBlock, address]);

    useEffect(() => {
        if (isConnected === undefined || isConnected || isConnectDialogOpen) { return; }

        setIsConnectDialogOpen(true);
    }, [isConnected]);

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
        if (txHash !== undefined && txHash !== "" && _.find(notifs, (notification: any) => notification.txHash === txHash) === undefined) {
            // Update farming data
            const oldTotal = parseFloat(farmingData.carbon_credits.yield.total.displayable_value);
            const oldAvailable = parseFloat(farmingData.carbon_credits.yield.available.displayable_value);
            farmingData.carbon_credits.yield.total.displayable_value = oldTotal + oldAvailable;
            farmingData.carbon_credits.yield.available.displayable_value = "0";

            // Add toast notification
            setNotifs([...notifs, {
                txHash: txHash,
                project: project.id,
                source: NotificationSource.FARMING,
                txStatus: TransactionStatus.RECEIVED,
                walletAddress: address,
                message: {
                    title: `Claiming $${parseFloat(num.hexToDecimalString(carbonCredits?.yield.available.value.value)) / UINT256_DECIMALS} in ${project.name} resale farm`, 
                    message: 'Your transaction is ' + TransactionStatus.RECEIVED, 
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);
        }
    }, [txHash]);

    const handleClaimResale = async () => {
        setCalls((cd: any) => {

            if (contracts?.yielder === undefined) { return []; }

            return [
                {
                    contractAddress: contracts?.yielder,
                    entrypoint: 'claim',
                    calldata: []
                }
            ]
        });
    }

    useEffect(() => {
        if (calls === undefined) return;
        
        write();
    }, [calls]);

    const handleClaimOffset = async () => {
        setContext(AssetsManagementContext.CLAIM);
        setTab(AssetsManagementTabs.OFFSET);
        setIsAssetsManagementDialogOpen(true);
    }

    const handleDeposit = async () => {
        setContext(AssetsManagementContext.DEPOSIT);
        setTab(AssetsManagementTabs.RESALE);
        setIsAssetsManagementDialogOpen(true);
    }

    const handleWithdraw = async () => {
        setContext(AssetsManagementContext.WITHDRAW);
        setTab(AssetsManagementTabs.RESALE);
        setIsAssetsManagementDialogOpen(true);
    }

    useEffect(() => {
        if (project.uri?.data.image) {
            getImageUrlFromMetadata(project.uri.data.image).then((url) => {
                setImageSrc(url.imgUrl);
                setIsRawSVG(url.isSvg);
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
                                <ProjectIdentification id={project.id} name={project.name} imageSrc={imageSrc} slug={project.slug} isRawSVG={isRawSVG} />
                            </div>
                            <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
                                <FarmingRepartition 
                                    resaleAmount={overview?.total_yielded.displayable_value ? parseFloat(overview?.total_yielded.displayable_value) : 0} 
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
                            <div className="w-full md:w-9/12 md:pl-12">
                                <div className="mt-12 md:mt-0">
                                    <FarmDetail 
                                        type={FarmType.RESALE} 
                                        total={carbonCredits?.yield.total.displayable_value ? shortenNumber(parseFloat(carbonCredits?.yield.total.displayable_value)) : "-"} 
                                        available={carbonCredits?.yield.available.displayable_value ? shortenNumberWithDigits(parseFloat(carbonCredits?.yield.available.displayable_value), 6) : "-"} 
                                        canClaim={carbonCredits ? parseFloat(carbonCredits?.yield.available.displayable_value) > 0 : false}
                                        handleClaim={handleClaimResale} 
                                    />
                                </div>
                                <div className="mt-12">
                                    <FarmDetail 
                                        type={FarmType.OFFSET} 
                                        total={carbonCredits?.offset.total.displayable_value && tonEquivalent !== '0' ? shortenNumber(parseFloat(carbonCredits?.offset.total.displayable_value) / parseInt(tonEquivalent)) : "-"} 
                                        available={carbonCredits?.offset.available.displayable_value && tonEquivalent !== '0' ? shortenNumberWithDigits(parseFloat(carbonCredits?.offset.available.displayable_value) / parseInt(tonEquivalent), 6) : "-"}
                                        canClaim={carbonCredits ? parseFloat(carbonCredits?.offset.available.displayable_value) > parseFloat(carbonCredits?.min_to_claim.displayable_value): false}
                                        minClaim={carbonCredits ? (parseInt(carbonCredits?.min_to_claim.displayable_value) / parseInt(tonEquivalent)).toString() : undefined}
                                        handleClaim={handleClaimOffset} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <FarmingAllocation 
                            resaleAmount={assetsAllocation?.yield.displayable_value ? parseFloat(assetsAllocation?.yield.displayable_value) : 0} 
                            offsetAmount={assetsAllocation?.offseted.displayable_value ? parseFloat(assetsAllocation?.offseted.displayable_value) : 0} 
                            undepositedAmount={assetsAllocation?.undeposited.displayable_value ? parseFloat(assetsAllocation?.undeposited.displayable_value) : 0} 
                            total={assetsAllocation?.total.displayable_value ? parseFloat(assetsAllocation?.total.displayable_value) : 0} 
                            handleDeposit={handleDeposit} 
                            handleWithdraw={handleWithdraw} 
                            mustMigrate={mustMigrate}
                            farmingStatus={farmStatus}
                        />
                    </div>
                    <div className="relative bg-farming-footer bg-no-repeat bg-center bg-cover px-8 py-12 mt-12 rounded-2xl overflow-hidden md:p-16">
                        <div className="font-inter font-bold text-white text-3xl md:text-4xl">
                            Learn more about<br/>
                            {project.name}
                        </div>
                        <NavLink to={`/launchpad/${slug}`} className="font-inter text-white font-light uppercase text-xs mt-4 inline-flex items-center border border-white rounded-full px-4 py-1 md:text-sm md:py-2 hover:bg-opacityLight-5">Go to project page &nbsp;&nbsp; <span className="text-base mt-[-3px]">&gt;</span></NavLink>
                        <div className="absolute bottom-[-28px] right-2 w-28 rounded-[8.8%] md:w-[280px] md:bottom-[-80px] md:right-6 lg:w-[300px] lg:bottom-[-100px]">
                            <div className="relative">
                                {imageSrc && isRawSVG === false && <img src={imageSrc.startsWith('https') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`${project.name} NFT card`} className="w-full rounded-[8.8%]" /> }
                                {isRawSVG === true && <div className="w-full"><SVGMetadata svg={imageSrc} id={`${project.id}_2`} /></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConnectDialog 
                isOpen={isConnectDialogOpen} 
                setIsOpen={setIsConnectDialogOpen} 
            />
            <AssetsManagementDialog 
                isOpen={isAssetsManagementDialogOpen} 
                setIsOpen={setIsAssetsManagementDialogOpen} 
                context={context} 
                tab={tab} 
                assetsAllocation={assetsAllocation} 
                contracts={contracts} 
                project={project} 
                carbonCredits={carbonCredits} 
                tonEquivalent={tonEquivalent} 
                unitPrice={unitPrice} 
                farmingData={farmingData}
            />
        </>
    )
}