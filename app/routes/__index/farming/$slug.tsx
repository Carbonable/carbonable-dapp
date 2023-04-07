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
import { IPFS_GATEWAY } from "~/utils/links";
import ConnectDialog from "~/components/Connection/ConnectDialog";
import { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { ipfsUrl, shortenNumber } from "~/utils/utils";
import AssetsManagementDialog, { AssetsManagementContext } from "~/components/Farming/AssetsManagement/Dialog";

export interface OverviewProps {
    total_removal: number;
    tvl: number;
    current_apr: number;
    total_yielded: number;
    total_offseted: number;
}

interface ClaimableProps {
    available: number;
    total: number;
}

interface CarbonCreditsProps {
    generated_credits: number;
    to_be_generated: number;
    offset: ClaimableProps;
    yield: ClaimableProps;
}

interface AssetsAllocationProps {
    yield: number;
    offseted: number;
    total: number;
    undeposited: number;
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
        const data = await fetch(`${process.env.INDEXER_URL}/projects/${slug}`, {});
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
    const [isAssetsManagementDialogOpen, setIsAssetsManagementDialogOpen] = useState(false);
    const [context, setContext] = useState<AssetsManagementContext>(AssetsManagementContext.CLAIM);
    const fetcherPortfolio = useFetcher();
    const [portfolio, setPortfolio] = useState([] as any);
    const [mustMigrate, setMustMigrate] = useState(false);

    useEffect(() => {
        if (address !== undefined && fetcherPortfolio.data === undefined && fetcherPortfolio.type === "init") {
            fetcherPortfolio.load(`/portfolio/load?wallet=${address}`);
        }

        if (fetcherPortfolio.data !== undefined && isConnected) {
            setPortfolio(fetcherPortfolio.data.projects);
        }
    }, [fetcherPortfolio, address, isConnected]);

    useEffect(() => {
        if (address !== undefined && isConnected) {
            fetcherPortfolio.load(`/portfolio/load?wallet=${address}`);
        }
    }, [address, isConnected]);

    useEffect(() => {
        if (isConnected === undefined || isConnected || isConnectDialogOpen) { return; }

        setIsConnectDialogOpen(true);
    }, [isConnected]);

    useEffect(() => {
        if (fetcher.data === undefined && fetcher.type === "init" && isConnected) {
            fetcher.load(`/farming/detail?wallet=${address}&slug=${slug}`);
        }

        if (fetcher.data !== undefined && fetcher.data !== null && isConnected) {
            const data = fetcher.data.data;
            setOverview(data.overview);
            setCarbonCredits(data.carbon_credits);
            setAssetsAllocation(data.assets_allocation);
        }
    }, [fetcher, address, isConnected, slug]);

    useEffect(() => {
        if (portfolio?.length > 0) {
            setMustMigrate(portfolio.find((asset: any) => asset.id === project.id) !== undefined);
        }
    }, [portfolio, project.id]);

    const handleClaimYield = async () => {
        console.log("Claim Yield");
    }

    const handleClaimOffset = async () => {
        setContext(AssetsManagementContext.CLAIM);
        setIsAssetsManagementDialogOpen(true);
    }

    const handleDeposit = async () => {
        setContext(AssetsManagementContext.DEPOSIT);
        setIsAssetsManagementDialogOpen(true);
    }

    const handleWithdraw = async () => {
        setContext(AssetsManagementContext.WITHDRAW);
        setIsAssetsManagementDialogOpen(true);
    }

    return (
        <>
             <div className="relative w-full">
                <div className="w-full bg-mint p-8 md:py-16">
                    <div className="max-w-6xl mx-auto pl-4 xl:pl-8">
                        <div className="w-full grid grid-cols-2 gap-4 items-center">
                            <div className="col-span-2 md:col-span-1">
                                <ProjectIdentification project={project} />
                            </div>
                            <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
                                <FarmingRepartition yieldAmount={overview?.total_yielded} offsetAmount={overview?.total_offseted} />
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-4 gap-4 mx-auto items-center mt-10 text-left md:mt-18 md:grid-cols-8 2xl:grid-cols-12 md:gap-12">
                            <div className="col-span-2 md:col-span-3 2xl:col-span-5">
                                <KPI title="Total Removal" value={shortenNumber(overview?.total_removal)} unit="t" large={true} />
                            </div>
                            <div className="col-span-2 md:col-span-3 2xl:col-span-5">
                                <KPI title="TVL" value={shortenNumber(overview?.tvl)} unit="$" large={true} />
                            </div>
                            <div className="col-span-2 md:col-span-2">
                                <KPI title="Current APR" value={`${shortenNumber(overview?.current_apr)}%`} large={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full px-4 py-10 md:py-16 max-w-6xl lg:px-8 mx-auto 2xl:px-0">
                    <div className="md:pl-4 xl:pl-8">
                        <div className="font-inter font-semibold uppercase text-neutral-100 text-lg md:text-xl">Carbon credits</div>
                        <div className="flex flex-wrap mt-4 items-start md:mt-8">
                            <div className="w-full grid grid-cols-2 gap-6 md:w-3/12 md:border-r md:border-neutral-300">
                                <div className="w-full md:col-span-2 md:mt-2">
                                    <KPI title="Generated to date" value={shortenNumber(carbonCredits?.generated_credits)} unit="CC" large={false} />
                                </div>
                                <div className="w-full md:col-span-2 md:mt-12">
                                    <KPI title="To be generated" value={shortenNumber(carbonCredits?.to_be_generated)} unit="CC" large={false} />
                                </div>
                            </div>
                            <div className="w-full md:w-9/12 md:pl-8">
                                <div className="mt-12 md:mt-0">
                                    <FarmDetail type={FarmType.YIELD} total={shortenNumber(carbonCredits?.yield.total)} available={shortenNumber(carbonCredits?.yield.available)} handleClaim={handleClaimYield} />
                                </div>
                                <div className="mt-12">
                                    <FarmDetail type={FarmType.OFFSET} total={shortenNumber(carbonCredits?.offset.total)} available={shortenNumber(carbonCredits?.offset.available)} handleClaim={handleClaimOffset} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <FarmingAllocation yieldAmount={assetsAllocation?.yield} offsetAmount={assetsAllocation?.offseted} undepositedAmount={assetsAllocation?.undeposited} total={assetsAllocation?.total} handleDeposit={handleDeposit} handleWithdraw={handleWithdraw} mustMigrate={mustMigrate} /> 
                    </div>
                    <div className="relative bg-farming-footer bg-no-repeat bg-center bg-cover px-8 py-12 mt-12 rounded-2xl overflow-hidden md:p-16">
                        <div className="font-inter font-bold text-white text-3xl md:text-4xl">
                            Learn more about<br/>
                            {project.name}
                        </div>
                        <NavLink to={`/launchpad/${slug}`} className="font-inter text-white font-light uppercase text-xs mt-4 inline-flex items-center border border-white rounded-full px-4 py-1 md:text-sm md:py-2 hover:bg-opacityLight-5">Go to project page &nbsp;&nbsp; <span className="text-base mt-[-3px]">&gt;</span></NavLink>
                        <img src={IPFS_GATEWAY + ipfsUrl(project.Uri.data.image)} alt={`${slug} NFT card`} className="absolute bottom-[-28px] right-2 w-28 rounded-[8.8%] md:w-[280px] md:bottom-[-80px] md:right-6 lg:w-[300px] lg:bottom-[-100px]" />
                    </div>
                </div>
            </div>
            <ConnectDialog isOpen={isConnectDialogOpen} setIsOpen={setIsConnectDialogOpen} />
            <AssetsManagementDialog isOpen={isAssetsManagementDialogOpen} setIsOpen={setIsAssetsManagementDialogOpen} context={context} />
        </>
    )
}