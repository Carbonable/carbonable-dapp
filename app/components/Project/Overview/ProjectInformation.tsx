import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useState } from "react";
import { shortenNumber } from "~/utils/utils";
import { SaleStatusType } from "./ProjectOverview";
import type { LaunchpadProps, MintProps, ProjectProps } from "~/routes/__index/launchpad";
import { useNotifications } from "~/root";

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

function KPICard({title, value, legend}: {title: string, value: string, legend?: string}) {
    return (
        <div className="flex flex-col items-start justify-between border border-neutral-200/20 rounded-xl font-inter text-neutral-100 p-3 min-w-[32%] min-h-[84px] xl:min-h-[66px]">
            <div className="font-light uppercase text-xs">{title}</div>
            <div className="font-normal text-base mt-1 md:text-lg">
                {value}
                <span className="font-light text-xs ml-1 text-neutral-300">{legend}</span>
            </div>
        </div>
    )
}


function SaleStatusComponent({launchpad, projectState}: {launchpad: LaunchpadProps, projectState: SaleStatusType}) {
    if (launchpad.is_sold_out) {
        return (
            <Tag label="Soldout" type={projectState} />
        )
    }

    if (launchpad.public_sale_open) {
        return (
            <Tag label="Sale Open" type={projectState} />
        )
    }

    if (launchpad.whitelisted_sale_open) {
        return (
            <Tag label="Whitelist Open" type={projectState} />
        )
    }

    if (!launchpad.public_sale_open && !launchpad.whitelisted_sale_open) {
        return (
            <Tag label="Coming soon" type={projectState} />
        )
    }

    return null;
}

function InvestedAmount({ amount }: { amount: string }) {
    return (
        <div className="py-1 px-2 bg-opacityLight-20 rounded-md">{amount}</div>
    )
}

function Separator() {
    return (
        <div className="flex items-center">
            <div className="w-[60px] h-[1px] bg-opacityLight-10"></div>
            <div className="w-[6px] h-[6px] bg-opacityLight-10 rounded-full"></div>
        </div>
    )
}

function Points({ points }: { points: string }) {
    return (
        <div className="flex items-center">
            <div className="relative w-[30px] h-[32px]">
                <img src="/assets/images/gamification/points.svg" alt="points" className="w-full h-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center uppercase font-light">{points}</div>
            </div>
            <div className="font-light uppercase ml-1">points</div>
        </div>
    )
}

export default function ProjectInformation({project, launchpad, mint, priceToDisplay, projectState}: 
                                             {project: ProjectProps, launchpad: LaunchpadProps, mint: MintProps, priceToDisplay: number, projectState: SaleStatusType}) {
    const [maxSupplyForMint] = useState(parseInt(mint.total_value.displayable_value));
    const [supplyLeft] = useState(parseInt(mint.remaining_value.displayable_value));

    const { defautlNetwork } = useNotifications();

    return (
        <div className="relative rounded-xl w-full bg-project-info-border p-[1px]">
            <div className="relative rounded-xl bg-project-info p-4 w-full overflow-hidden">
                <div className="font-bold text-lg md:text-2xl lg:text-3xl uppercase">{maxSupplyForMint.toString()} Shares</div>
                <div className="absolute right-3 top-4 md:right-4 md:top-5 lg:top-6">
                    <SaleStatusComponent launchpad={launchpad} projectState={projectState} />
                </div>
                <div className="flex items-center justify-between mt-4 gap-x-2 2xl:mt-8">
                    <KPICard title="Shares left" value={supplyLeft.toString()} legend="(1$/SHARE)" />
                    <KPICard title="$ PER Ton/CO2" value="11.5" />
                    <KPICard title="AVG APR (FCST)" value={project.forecasted_apr} />
                </div>
                <div className="flex flex-wrap items-center pl-1 py-3 bg-dark-40 mt-6 rounded-xl font-inter uppercase text-xs md:mt-3 md:px-2 justify-between">
                    <div className="flex items-center flex-wrap w-full md:w-fit">
                        <div className="text-neutral-100 px-2 font-light w-full md:w-fit">Your invested amount</div>
                        <div className="flex items-center mt-2 md:mt-0 ml-2 md:ml-0">
                            <div className="ml-1">
                                <InvestedAmount
                                    amount="318$"
                                />
                            </div>
                            <div className="ml-4">
                                <Separator />
                            </div>
                            <div className="ml-4">
                                <Points points="10" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-fit mt-3 lg:mt-0 ml-2 lg:ml-0">
                        <a className="flex items-center uppercase font-light hover:underline" href="https://">
                            Learn more
                            <ChevronRightIcon className="w-4 ml-1 text-neutral-100" />
                        </a>
                    </div>
                </div>
                {defautlNetwork === "mainnet" && moment(launchpad.sale_date).isBefore(moment(new Date('2022-12-31'))) && 
                <div className="mt-2 font-inter text-xs text-neutral-100 flex flex-wrap items-center w-fit mx-auto md:mx-1">
                    Have NFTs on JUNO? 
                    <a href="https://bridge.carbonable.io" target="_blank" rel="noreferrer" className="underline flex flex-nowrap hover:no-underline ml-2">
                        Bridge them to StarkNet <ArrowTopRightOnSquareIcon className="w-4 ml-1" />
                    </a>
                </div>}
                <div className="mt-8 2xl:mt10">
                    <div className="flex justify-between px-4 font-inter text-xs text-transparent">
                        <div className="bg-green-blue bg-clip-text uppercase">{launchpad.is_sold_out ? 'Completion 100%' : 'Completion ' +((1 - (supplyLeft / maxSupplyForMint)) * 100).toFixed(0) + '%'}</div>
                        <div className="bg-green-blue bg-clip-text">{shortenNumber(maxSupplyForMint * priceToDisplay)}$</div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[6px] bg-green-blue" style={{width: launchpad.is_sold_out ? '100%' : `${(1 - (supplyLeft / maxSupplyForMint)) * 100}%`}}></div>
                    <div className="w-[2px] bg-blue h-[12px] absolute bottom-0" style={{left: launchpad.is_sold_out ? '100%' : `${(1 - (supplyLeft / maxSupplyForMint)) * 100}%`}}></div>
                </div>
            </div>
        </div>
    )
}