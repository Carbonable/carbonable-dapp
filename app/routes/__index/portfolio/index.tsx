import type { AccountStatus} from "@starknet-react/core";
import { useContractWrite, useWaitForTransaction } from "@starknet-react/core";
import { useAccount } from "@starknet-react/core";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { userPrefs } from "~/cookie";
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import Disconnected from "~/components/Portfolio/Disconnected";
import type { Network } from "@prisma/client";
import { useEffect, useState } from "react";
import _ from "lodash";
import { ASPECT_LINK, IPFS_GATEWAY, MINTSQUARE_LINK } from "~/utils/links";
import { getImageUrlFromMetadata, ipfsUrl, shortenNumber } from "~/utils/utils";
import { GreenButton } from "~/components/Buttons/ActionButton";
import NewsletterDialog from "~/components/Newsletter/Newsletter";
import { num } from "starknet";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        const selectedNetwork = await db.network.findFirst({
            where: {
              ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
        });
        return json(selectedNetwork);
    } catch (e) {
        console.log(e)
        return json([]);
    }
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Portfolio - Carbonable - Web3 powered end-to-end carbon removal platform",
    description: "Manage your assets and badges from your Carbonable portfolio.",
    image: "https://carbonable.io/assets/images/social/social.jpg",
    viewport: "width=device-width,initial-scale=1",
    'og:url': "https://app.carbonable.io/portfolio",
    'og:type': "website",
    'og:title': "Portfolio - Carbonable - Web3 powered end-to-end carbon removal platform",
    'og:description': "Manage your assets and badges from your Carbonable portfolio.",
    'og:image': "https://carbonable.io/assets/images/social/social.jpg",
    'twitter:domain': "carbonable.io",
    'twitter:url': "https://app.carbonable.io/portfolio",
    'twitter:title': "Portfolio - Carbonable - Web3 powered end-to-end carbon removal platform",
    'twitter:description': "Manage your assets and badges from your Carbonable portfolio.",
    'twitter:card': "summary_large_image",
    'twitter:image': "https://carbonable.io/assets/images/social/social.jpg",
});

function LoaderProjects() {
    return (
        <div className="grid grid-cols-4 gap-4 mt-2 md:grid-cols-3 xl:grid-cols-4">
            <div className="flex justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-4 md:col-span-1 w-full h-[96vw] md:h-[200px] xl:h-[240px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-4 md:col-span-1 w-full h-[96vw] md:h-[200px] xl:h-[240px] md:flex">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-4 md:col-span-1 w-full h-[96vw] md:h-[200px] xl:h-[240px] md:flex">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-4 md:col-span-1 w-full h-[96vw] md:h-[200px] xl:h-[240px] xl:flex">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
        </div>
    )
}

function LoaderBadges() {
    return (
        <div className="grid grid-cols-6 gap-3 mt-2">
            <div className="flex justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] md:flex xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] md:flex xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] md:flex xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
        </div>
    )
}

function ProjectsList({projects, handleMigrate}: {projects: any[], handleMigrate: any}) {
    const migratedProjects = _.filter(projects, project => project.tokens.some((token: any) => token.hasOwnProperty("value")));
    const projectsToMigrate = _.filter(projects, project => project.tokens.some((token: any) => !token.hasOwnProperty("value")));
    const [isOpen, setIsOpen] = useState(false);

    if (projects.length === 0) {
        return (
            <div className="ml-2 mt-2">
                You don't have any assets yet. Go to <a href="/launchpad" className="text-greenish-500 mt-1 hover:text-neutral-100">Launchpad</a> to invest during open sales.
                <br />
                <GreenButton className="w-fit mt-2" onClick={() => setIsOpen(true)}>Be alerted when a sale opens</GreenButton>
                <NewsletterDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        )
    }
    return (
        <>
            { projectsToMigrate.length > 0 && 
                <>
                    <div className="uppercase font-trash text-bold text-sm text-left md:pl-1 2xl:text-base mt-2">Assets to migrate</div>
                    <div className="grid grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 select-none">
                        {projectsToMigrate.map((project) => (
                            <ProjectCard key={project.id} project={project} toMigrate={true} handleMigrate={handleMigrate} />
                        ))}
                    </div>
                </>
            }
            { migratedProjects.length > 0 && 
                <>
                    {projectsToMigrate.length > 0 && <div className="uppercase font-trash text-bold text-sm text-left md:pl-1 2xl:text-base mt-8">Migrated assets</div> }
                    <div className="grid grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 select-none">
                        {migratedProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </>
            }
        </>
        
    )
}

function ProjectCard({project, toMigrate, handleMigrate}: {project: any, toMigrate?: boolean, handleMigrate?: any}) {
    const shares = project.tokens.reduce((acc: any, token: any) => acc + parseFloat(token?.value?.displayable_value), 0);
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        if (project.tokens[0].image) {
            getImageUrlFromMetadata(project.tokens[0].image).then((url) => {
                setImageSrc(url);
            });
        }
    }, [project.tokens]);

    return (
        <div className="w-full flex flex-wrap" >
            <div className="flex justify-start items-center flex-wrap col-span-4 md:col-span-1">
                <div className="relative group">
                    <img src={imageSrc} alt={`${project.name} NFT card`} className="w-full rounded-[8.8%]" />
                    <div className="absolute invisible top-0 left-0 bg-transparent group-hover:bg-dark-40 group-hover:visible w-full h-[100%] rounded-[8.8%]">
                        <div className="relative w-full h-100%">
                            <a href={`${ASPECT_LINK}/asset/${project.address}/${num.hexToDecimalString(project.tokens[0].token_id)}`} rel="noreferrer" target="_blank" className="absolute top-6 right-16 md:top-4 w-10 h-10 rounded-full p-2 flex items-center justify-center bg-black/20 backdrop-blur-md cursor-pointer border border-neutral-300 hover:bg-black/5 hover:backdrop-blur-lg">
                                <img src='/assets/images/icons/aspect-icon.png' alt="Go to Aspect" className="w-full" />
                            </a>
                            <a href={`${MINTSQUARE_LINK}/asset/starknet/${project.address}/${num.hexToDecimalString(project.tokens[0].token_id)}`} rel="noreferrer" target="_blank" className="absolute top-6 right-5 md:top-4 w-10 h-10 rounded-full p-2 flex items-center justify-center bg-black/20 backdrop-blur-md cursor-pointer border border-neutral-300 hover:bg-black/5 hover:backdrop-blur-lg">
                                <img src='/assets/images/icons/mintsquare-icon.svg' alt="Go to Mint Square" className="w-full" />
                            </a>
                        </div>
                    </div>
                    {toMigrate && project.tokens.length > 1 && <div className="font-inter absolute top-6 left-6 md:top-4 md:left-4 xl:top-4 xl:left-4 bg-white rounded-lg text-neutral-900 text-center px-2 py-1 font-bold text-xs>">x{project.tokens.length}</div>}
                    {!toMigrate && <div className="font-inter absolute top-4 left-6 md:top-4 md:left-4 xl:top-4 xl:left-4 bg-white rounded-lg text-neutral-900 text-center px-2 py-1 font-bold text-xs>">{shortenNumber(shares)} {shares > 1 ? 'shares' : 'share'}</div>}
                </div>
            </div>
            {toMigrate && <GreenButton className="w-full mt-2" onClick={() => handleMigrate(project)}>Migrate assets</GreenButton> }
        </div>
        
    )
}

function BadgesList({badges}: {badges: any[]}) {
    if (badges.length === 0) {
        return (
            <div className="ml-2 mt-2">
                You don't have any badges yet. Go to <a href="/odyssey" className="text-greenish-500 mt-1 hover:text-neutral-100">Odyssey</a> and try to claim one.
            </div>
        )
    }
    return (
        <div className="grid grid-cols-6 gap-3 mt-2 select-none">
            {badges.map((badge) => (
                <div key={badge.id} className="flex justify-start items-center flex-wrap col-span-2 md:col-span-1">
                    <div className="relative">
                        <img src={IPFS_GATEWAY + ipfsUrl(badge.tokens[0].image)} alt={`${badge.tokens[0].name} card`} className="rounded-lg w-full" />
                        <div className="text-center font-inter uppercase mt-1 text-xs lg:text-sm">{badge.tokens[0].name}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function PortfolioState({status, selectedNetwork, state, projects, badges, reloadData, setReloadData, handleMigrate}: {status: AccountStatus, selectedNetwork: Network, state: string, projects: any[], badges: any[], reloadData: boolean, setReloadData: any, handleMigrate: any}) {

    if (status === 'disconnected') {
        return <Disconnected />
    }

    if (reloadData) {
        return (
            <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12">
                <div className="uppercase font-trash text-bold text-lg text-left md:pl-1 2xl:text-xl">My Assets</div>
                <GreenButton className="w-fit mt-2" onClick={() => setReloadData(false)}>Reload data</GreenButton>
                <div className="uppercase font-trash text-bold text-lg text-left md:pl-1 2xl:text-xl mt-16">My badges</div>
                <GreenButton className="w-fit mt-2" onClick={() => setReloadData(false)}>Reload data</GreenButton>
            </div>
        )
    }

    return (
        <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12">
            <div className="uppercase font-trash text-bold text-lg text-left md:pl-1 2xl:text-xl">My Assets</div>
            {state === 'loading' && <LoaderProjects /> }
            {state !== 'loading' && <ProjectsList projects={projects} handleMigrate={handleMigrate} />}
            <div className="uppercase font-trash text-bold text-lg text-left md:pl-1 2xl:text-xl mt-16">My badges</div>
            {state === 'loading' && <LoaderBadges /> }
            {state !== 'loading' && <BadgesList badges={badges} />}
        </div>
    )
}

function KPI({title, value}: {title: string, value: string}) {
    return (
        <div className="flex flex-col items-start justify-start text-neutral-100 font-trash">
            <h1 className="font-bold uppercase text-xs md:text-sm lg:text-lg">{title}</h1>
            <div className="text-2xl mt-3 lg:text-4xl">{value}</div>
        </div>
    )
}


export default function Portfolio() {
    const { status, address } = useAccount();
    const selectedNetwork = useLoaderData();
    const [investedAmount, setInvestedAmount] = useState("-");
    const [investedProjects, setInvestedProjects] = useState([] as any);
    const [collectedBadges, setCollectedBadges] = useState([] as any);
    const [numberOfProjects, setNumberOfProjects] = useState(0);
    const [numberOfNFT, setNumberOfNFT] = useState(0);
    const [projects, setProjects] = useState([] as any);
    const [badges, setBadges] = useState([] as any);
    const fetcher = useFetcher();
    const [txHash, setTxHash] = useState("");
    const [reloadData, setReloadData] = useState(false);
    const { data: dataTx } = useWaitForTransaction({ hash: txHash, watch: true });
    const calls: any = [];
    
    useEffect(() => {
        if (address !== undefined && fetcher.data === undefined && fetcher.type === "init") {
            fetcher.load(`/portfolio/load?wallet=${address}`);
        }

        if (fetcher.data !== undefined && status === 'connected') {
            const data = fetcher.data.data;
            if (data === undefined) {
                setReloadData(true);
                return; 
            }
            setProjects(data.projects);
            setBadges(data.badges);
            setInvestedAmount(shortenNumber(data.global.total));
            setInvestedProjects(projects);
            setCollectedBadges(badges);
            setNumberOfProjects((_.filter(projects, (project) => project.tokens.length > 0)).length)
            setNumberOfNFT(_(projects).flatMap('tokens').value().length);
        }
    }, [fetcher, address, status, reloadData]);

    useEffect(() => {
        if (address !== undefined && status === 'connected') {
            fetcher.load(`/portfolio/load?wallet=${address}`);
        }

        if (status === 'disconnected') {
            setInvestedAmount("0");
            setInvestedProjects([]);
            setCollectedBadges([]);
            setNumberOfProjects(0);
            setNumberOfNFT(0);
        }
    }, [address, status]);

    const { write, data: dataExecute } = useContractWrite({
        calls,
        metadata: {
            method: 'Approve migration, migrate tokens then revoke approval',
            message: 'Migrate ERC-721 tokens to ERC-3525 tokens',
        }
    });

    const handleMigrate = (project: any) => {
        calls.push( {
            contractAddress: project.address,
            entrypoint: 'setApprovalForAll',
            calldata: [project.minter_address, 1]
        });

        project.tokens.forEach((token: any) => {
            calls.push( {
                contractAddress: project.minter_address,
                entrypoint: 'migrate',
                calldata: [parseInt(num.hexToDecimalString(token.token_id)), 0]
            }
        )});
        calls.push( {
            contractAddress: project.address,
            entrypoint: 'setApprovalForAll',
            calldata: [project.minter_address, 0]
        });
        write();
        return;
    }

    useEffect(() => {
        setTxHash(dataExecute ? dataExecute.transaction_hash : "");
    }, [dataExecute])

    return (
        <div className="mx-auto md:mt-12 lg:mt-6 max-w-7xl">
            <div className="relative w-11/12 mx-auto border border-neutral-700 bg-portfolio bg-cover bg-bottom rounded-3xl px-4 py-6 flex items-start justify-start flex-wrap md:p-10 lg:p-12">
                <div className="grid grid-cols-3 gap-3 md:grid-cols-none md:grid-flow-col md:auto-cols-max md:gap-6 xl:gap-16">
                    <KPI title="Invested Amount" value={`$${investedAmount}`} />
                    <KPI title="Number of projects" value={`# ${numberOfProjects}`} />
                    <KPI title="Number of NFT" value={`# ${numberOfNFT}`} />
                </div>
                <img src="/assets/images/common/logo-transparent.svg" alt="Carbonable logo transparent" className="absolute bottom-0 right-12 w-[100px] xl:right-20 lg:w-[110px]" />
            </div>
            <PortfolioState status={status} selectedNetwork={selectedNetwork} state={fetcher.state} projects={investedProjects} badges={collectedBadges} reloadData={reloadData} setReloadData={setReloadData} handleMigrate={handleMigrate} />
        </div>
    )
    
}
