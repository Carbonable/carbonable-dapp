import { useAccount } from "@starknet-react/core";
import type { V2_MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import _ from "lodash";
import { shortenNumber } from "~/utils/utils";
import { useNotifications } from "~/root";
import PortfolioState from "~/components/Portfolio/PortfolioState";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Portfolio - Carbonable - Provable Nature Restoration" },
        { name: "description", content:"Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { name: "image", content: "https://carbonable.github.io/socials/social.jpg"},
        { property: 'og:url', content:"https://app.carbonable.io"},
        { property: 'og:type', content: "website"},
        { property: 'og:title', content: "Carbonable - Provable Nature Restoration"},
        { property: 'og:description', content: "Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { property: 'og:image', content: "https://carbonable.github.io/socials/social.jpg"},
        { property: 'twitter:domain', content: "carbonable.io"},
        { property: 'twitter:url', content: "https://app.carbonable.io"},
        { property: 'twitter:title', content: "Carbonable - Provable Nature Restoration"},
        { property: 'twitter:description', content: "Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { property: 'twitter:card', content: "summary_large_image"},
        { property: 'twitter:image', content: "https://carbonable.github.io/socials/social.jpg"}
    ]
};

function KPI({title, value}: {title: string, value: string}) {
    return (
        <div className="flex flex-col items-start justify-start text-neutral-100 font-bold">
            <h1 className="uppercase text-xs md:text-sm lg:text-lg">{title}</h1>
            <div className="text-xl mt-3 md:text-2xl lg:text-4xl">{value}</div>
        </div>
    )
}

export default function Portfolio() {
    const { isConnected, address } = useAccount();
    const [investedAmount, setInvestedAmount] = useState("-");
    const [investedProjects, setInvestedProjects] = useState([] as any);
    const [collectedBadges, setCollectedBadges] = useState([] as any);
    const [numberOfProjects, setNumberOfProjects] = useState(0);
    const fetcher = useFetcher();
    const [reloadData, setReloadData] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const { setMustReloadMigration, displayPortfolioTootltip, setDisplayPortfolioTooltip } = useNotifications();

    useEffect(() => {
        // Load portfolio data when user connects wallet or changes account
        if (isConnected) {
            fetcher.load(`/portfolio/load?wallet=${address}`);
            setMustReloadMigration(false);
            setRefreshData(false);
        }

        // Reset portfolio data when user disconnects wallet
        if (!isConnected) {
            setInvestedAmount("0");
            setInvestedProjects([]);
            setCollectedBadges([]);
            setNumberOfProjects(0);
        }
    }, [address, isConnected]);

    useEffect(() => {
        // Load portfolio data when user connects wallet or changes account
        if (refreshData) {
            setTimeout(() => {
                fetcher.load(`/portfolio/load?wallet=${address}`);
                setMustReloadMigration(false);
                setRefreshData(false);
            }, 4000);
        }
    }, [refreshData]);

    // Set portfolio data when data is loaded
    useEffect(() => {
        if (isConnected && fetcher.data !== undefined) {
            const data = fetcher.data.data;
            
            if (data === undefined) {
                setReloadData(true);
                return;
            }

            const projects = data.projects;
            const badges = data.badges;
            setInvestedAmount(shortenNumber(data.global.total));
            setInvestedProjects(projects);
            setCollectedBadges(badges);
            setNumberOfProjects((_.filter(projects, (project) => project.tokens.length > 0)).length)
        }
    }, [fetcher, isConnected]);

    return (
        <div className="relative mx-auto md:mt-12 lg:mt-6 max-w-7xl">
            <div className="relative w-11/12 mx-auto border border-neutral-700 bg-portfolio bg-cover bg-bottom rounded-3xl px-4 py-6 flex items-start justify-start flex-wrap md:p-10 lg:p-12">
                <div className="grid grid-cols-3 gap-3 md:grid-cols-none md:grid-flow-col md:auto-cols-max md:gap-6 xl:gap-16">
                    <KPI title="Funded Amount" value={`$${investedAmount}`} />
                    <KPI title="Number of projects" value={`# ${numberOfProjects}`} />
                </div>
                <img src="/assets/images/common/logo-transparent.svg" alt="Carbonable logo transparent" className="absolute bottom-0 right-12 w-[100px] xl:right-20 lg:w-[110px]" />
            </div>
            <PortfolioState 
                isConnected={isConnected} 
                state={fetcher.state} 
                projects={investedProjects} 
                badges={collectedBadges} 
                reloadData={reloadData} 
                setReloadData={setReloadData} 
                setRefreshData={setRefreshData}
             />
             {displayPortfolioTootltip && <div className="fixed flex justify-center left-0 right-0 items-center bottom-8">
                <div className="px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-sm text-neutral-200 font-light flex items-center">
                    A detailled portfolio view is under construction
                    <XMarkIcon className="w-4 h-4 ml-2 cursor-pointer hover:text-neutral-50" onClick={() => setDisplayPortfolioTooltip(false)} />
                </div>
             </div>
            }
        </div>
    )
}
