import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Network, Project } from "@prisma/client";
import moment from "moment";
import { useEffect, useState } from "react";
import { shortenNumber } from "~/utils/utils";
import { SaleStatusType } from "./ProjectOverview";

export function Tag({label, type}: {label: string, type:SaleStatusType}) {
    return (
        <div className={`font-inter text-xs uppercase px-2 py-1 rounded-full md:px-4
                        ${(type === SaleStatusType.Soldout || type === SaleStatusType.ComingSoon) ? "bg-opacityLight-5 text-neutral-100" : ""}
                        ${(type === SaleStatusType.Whitelist) ? "bg-blue/30 text-blue" : ""}
                        ${(type === SaleStatusType.Public) ? "bg-orange/30 text-orange" : ""}`
        }>
            {label}
        </div>
    )
}

function KPICard({title, value}: {title: string, value: string}) {
    return (
        <div className="flex flex-col items-start justify-between border border-neutral-200/20 rounded-xl font-inter text-neutral-100 py-2 px-3 min-w-[32%] min-h-[84px] xl:min-h-[66px]">
            <div className="font-light uppercase text-xs">{title}</div>
            <div className="font-normal text-base mt-2 md:text-lg">{value}</div>
        </div>
    )
}


function SaleStatusComponent({project, isSoldout, projectState}: {project: Project, isSoldout: boolean, projectState: SaleStatusType}) {
    if (isSoldout) {
        return (
            <Tag label="Soldout" type={projectState} />
        )
    }

    if (project.publicSaleOpen) {
        return (
            <Tag label="Sale Open" type={projectState} />
        )
    }

    if (project.whitelistedSaleOpen) {
        return (
            <Tag label="Whitelist Open" type={projectState} />
        )
    }

    if (!project.publicSaleOpen && !project) {
        return (
            <Tag label="Coming soon" type={projectState} />
        )
    }

    return null;
}

export default function ProjectInformation({project, priceToDisplay, projectTotalSupply, isSoldout, selectedNetwork, projectState, projectReservedSupplyForMint}: 
                                             {project: Project, priceToDisplay: number, projectTotalSupply: string, isSoldout: boolean, selectedNetwork: Network, projectState: SaleStatusType, projectReservedSupplyForMint: string}) {
    const [supplyLeft, setSupplyLeft] = useState(0);
    useEffect(() => {
        if (project.maxSupplyForMint === undefined || projectTotalSupply === undefined || projectReservedSupplyForMint === undefined) { return; }

        setSupplyLeft(isSoldout ? 0 : project.maxSupplyForMint - parseInt(projectReservedSupplyForMint) - parseInt(projectTotalSupply));
    }, [project.maxSupplyForMint, projectTotalSupply, isSoldout, projectReservedSupplyForMint]);

    return (
        <div className="relative rounded-3xl w-full bg-project-info-border p-[1px]">
            <div className="relative rounded-3xl bg-project-info p-4 w-full overflow-hidden">
                <div className="font-trash font-bold text-lg md:text-2xl lg:text-3xl">{priceToDisplay} {project.paymentTokenSymbol} <span className="font-americana font-normal text-base md:text-lg lg:text-2xl">/ NFT</span></div>
                <div className="absolute right-3 top-4 md:right-4 md:top-5 lg:top-6">
                    <SaleStatusComponent project={project} isSoldout={isSoldout} projectState={projectState} />
                </div>
                <div className="flex items-center justify-between mt-4 gap-x-2 2xl:mt-8">
                    <KPICard title="Number of NFT" value={project.maxSupplyForMint.toString()} />
                    <KPICard title="NFT Left" value={supplyLeft.toString()} />
                    <KPICard title="AVG APR (FCST)" value={project.estimatedAPR} />
                </div>
                <div className="flex flex-wrap items-center justify-start pl-1 py-3 bg-dark-40 mt-6 rounded-xl font-inter uppercase text-xs md:mt-3 md:px-2 2xl:justify-between">
                    <div className="text-neutral-100 px-2 w-full 2xl:w-fit">Estimate the gain for you and the planet</div>
                    <a href="https://carbonable.io#simulator" target="_blank" className="text-greenish-500 mt-1 inline-flex px-2 items-center 2xl:mt-0 hover:text-neutral-100" rel="noreferrer">
                        Yield Simulator <ChevronRightIcon className="w-4 ml-2" />
                    </a>
                </div>
                {selectedNetwork.id === "mainnet" && moment(project.saleDate).isBefore(moment(new Date('2022-12-31'))) && 
                <div className="mt-2 font-inter text-xs text-neutral-100 flex flex-wrap items-center w-fit mx-auto md:mx-1">
                    Have NFTs on JUNO? 
                    <a href="https://bridge.carbonable.io" target="_blank" rel="noreferrer" className="underline flex flex-nowrap hover:no-underline ml-2">
                        Bridge them to StarkNet <ArrowTopRightOnSquareIcon className="w-4 ml-1" />
                    </a>
                </div>}
                <div className="mt-8 2xl:mt10">
                    <div className="flex justify-between px-4 font-inter text-xs text-transparent">
                        <div className="bg-green-blue bg-clip-text">{isSoldout ? '100%' : ((1 - (supplyLeft / project.maxSupplyForMint)) * 100).toFixed(0) + '%'}</div>
                        <div className="bg-green-blue bg-clip-text">{shortenNumber(project.maxSupplyForMint * priceToDisplay)}$</div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[6px] bg-green-blue" style={{width: isSoldout ? '100%' : `${(1 - (supplyLeft / project.maxSupplyForMint)) * 100}%`}}></div>
                    <div className="w-[2px] bg-blue h-[12px] absolute bottom-0" style={{left: isSoldout ? '100%' : `${(1 - (supplyLeft / project.maxSupplyForMint)) * 100}%`}}></div>
                </div>
            </div>
        </div>
    )
}