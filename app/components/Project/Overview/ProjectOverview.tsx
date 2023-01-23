import type { Network, Project } from "@prisma/client";
import { useEffect, useState } from "react";
import { useReservedSupplyForMint, useSoldout } from "~/hooks/minter";
import { useProjectTotalSupply } from "~/hooks/project";
import { IPFS_GATEWAY } from "~/utils/links";
import Actions from "./Actions";
import ProjectInformation from "./ProjectInformation";

export enum SaleStatusType {
    Loading,
    ComingSoon,
    Whitelist,
    Public,
    Soldout
}

export default function ProjectOverview({project, whitelist, selectedNetwork, hasReports}: {project: Project, whitelist: any, selectedNetwork: Network, hasReports: boolean}) {
    const [priceToDisplay, setPriceToDisplay] = useState(0);
    const { projectTotalSupply, refreshProjectTotalSupply } = useProjectTotalSupply(project.projectContract, project.networkId);
    const { projectReservedSupplyForMint, refreshProjectReservedSupplyForMint } = useReservedSupplyForMint(project.minterContract, project.networkId);
    const { soldout } = useSoldout(project.minterContract, project.networkId);
    const [isSoldout, setIsSoldout] = useState(false);
    const [projectState, setProjectState] = useState(SaleStatusType.Loading);
    useEffect(() => {
        setIsSoldout(soldout || project.isSoldout);
    }, [soldout, project.isSoldout]);

    useEffect(() => {
        if (project.paymentTokenDecimals === undefined || project.unitPrice === undefined) { return; }
        const price = project.unitPrice / Math.pow(10, project.paymentTokenDecimals);

        setPriceToDisplay(Math.round(price) !== price ? parseFloat(price.toFixed(2)) : price);
    }, [project.paymentTokenDecimals, project.unitPrice]);

    useEffect(() => {
        if (isSoldout) {
            setProjectState(SaleStatusType.Soldout);
            return;
        }
    
        if (project.publicSaleOpen) {
            setProjectState(SaleStatusType.Public);
            return;
        }
    
        if (project.whitelistedSaleOpen) {
            setProjectState(SaleStatusType.Whitelist);
            return;
        }
    
        if (!project.publicSaleOpen && !project.whitelistedSaleOpen) {
            setProjectState(SaleStatusType.ComingSoon);
            return;
        }
    }, [project, isSoldout]);

    return (
        <div className="w-full bg-mint p-4">
            <div className="mx-auto px-2 xl:w-10/12 2xl:w-9/12 2xl:max-w-6xl">
                <div className="font-inter text-neutral-100 font-bold text-lg uppercase md:text-2xl">{project.name}</div>
                <div className="flex flex-wrap justify-start items-center mt-4 md:gap-6 md:items-start">
                    <div className="w-full mx-auto md:w-[41%] md:order-2">
                        <img src={IPFS_GATEWAY + project.imageIpfs} alt={`${project.name} NFT card`} className="w-full rounded-[8.8%]" />
                    </div>
                    <div className="flex flex-wrap mt-8 w-full mx-auto md:w-[55%] md:order-1 md:mt-0">
                        <ProjectInformation project={project} priceToDisplay={priceToDisplay} projectTotalSupply={projectTotalSupply} isSoldout={isSoldout} selectedNetwork={selectedNetwork} projectState={projectState} projectReservedSupplyForMint={projectReservedSupplyForMint} />
                        <div className="mt-4 w-full flex items-center justify-center">
                            <Actions projectState={projectState} 
                                     project={project} 
                                     priceToDisplay={priceToDisplay} 
                                     whitelist={whitelist} 
                                     refreshProjectTotalSupply={refreshProjectTotalSupply} 
                                     refreshProjectReservedSupplyForMint={refreshProjectReservedSupplyForMint} 
                                     network={selectedNetwork.id}
                                     hasReports={hasReports}
                             />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}