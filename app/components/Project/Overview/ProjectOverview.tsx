import type { Network, Project, ProjectWhitelist } from "@prisma/client";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSoldout } from "~/hooks/minter";
import { useProjectTotalSupply } from "~/hooks/project";
import { TxStatus } from "~/utils/blockchain/status";
import { IPFS_GATEWAY } from "~/utils/links";
import { ComingSoonComponent, MintComponent, ReportComponent, SimularorComponent, SoldoutComponent } from "./ProjectOverviewComponents";
import { ProgressComponent } from "./TransactionComponents";

export default function ProjectOverview({project, whitelist, selectedNetwork}: {project: Project, whitelist: ProjectWhitelist, selectedNetwork: Network}) {
    const { soldout } = useSoldout(project.minterContract, project.networkId);
    const { projectTotalSupply, refreshProjectTotalSupply } = useProjectTotalSupply(project.projectContract, project.networkId);
    const [saleIsOpen, setSaleIsOpen] = useState(false);
    const [supplyLeft, setSupplyLeft] = useState(0);
    const [priceToDisplay, setPriceToDisplay] = useState(0);
    const [isSoldout, setIsSoldout] = useState(false);

    const [progress, setProgress] = useState("NOT_RECEIVED");

    const updateProgress = (step: string) => {
        setProgress(step);
    };

    useEffect(() => {
        setIsSoldout(soldout || project.isSoldout);
    }, [soldout, project.isSoldout]);

    useEffect(() => {
        setSaleIsOpen((project.publicSaleOpen || project.whitelistedSaleOpen) ? true : false);
    }, [project.whitelistedSaleOpen, project.publicSaleOpen]);

    useEffect(() => {
        if (project.maxSupplyForMint === undefined || projectTotalSupply === undefined) { return; }

        setSupplyLeft(project.maxSupplyForMint - parseInt(projectTotalSupply));
    }, [project.maxSupplyForMint, projectTotalSupply]);

    useEffect(() => {
        if (project.paymentTokenDecimals === undefined || project.unitPrice === undefined) { return; }
        const price = project.unitPrice / Math.pow(10, project.paymentTokenDecimals);

        setPriceToDisplay(Math.round(price) !== price ? parseFloat(price.toFixed(2)) : price);
    }, [project.paymentTokenDecimals, project.unitPrice]);

    return (
        <div className="border border-neutral-800 bg-launchpad-header rounded-3xl flex flex-wrap p-6 md:p-8 mx-auto">
            <div className="w-full md:w-1/2 xl:w-5/12">
                <img src={IPFS_GATEWAY + project.imageIpfs} alt={`${project.slug}  NFT card`} className="w-full rounded-[8.8%] md:w-11/12 xl:w-full" />
            </div>
            <div className="w-full mt-6 p-2 md:w-1/2 md:-mt-0 flex flex-wrap justify-between items-center xl:w-7/12 xl:items-left xl:pl-12 2xl:w-7/12 2xl:pl-16 2xl:pr-0 select-none">
                <div className="w-full">
                    { (saleIsOpen || isSoldout) && 
                        <>
                            <div className="font-trash text-4xl text-white xl:text-5xl 2xl:text-6xl">{priceToDisplay} {project.paymentTokenSymbol} <span className="font-americana font-thin text-lg text-beaige xl:text-xl 2xl:text-2xl">/ NFT</span></div>
                            <div className="font-inter text-beaige text-xs xl:text-base">
                                { !isSoldout && <span>{supplyLeft} NFTs left</span>}
                                { isSoldout && <span>{project.maxSupplyForMint} NFTs</span>}
                            </div>
                        </>
                }
                    { moment(project.saleDate).isAfter(moment(new Date())) && !saleIsOpen && <div className="font-trash text-4xl text-white xl:text-5xl 2xl:text-6xl">{supplyLeft} NFTs</div>}
                </div>
                <div className="mt-8 w-full md:mt-5 xl:mt-4">
                    { saleIsOpen && !isSoldout && <MintComponent estimatedAPR={project.estimatedAPR}
                                                               price={priceToDisplay}
                                                               paymentTokenSymbol={project.paymentTokenSymbol}
                                                               minterContract={project.minterContract}
                                                               paymentTokenAddress={project.paymentContract}
                                                               publicSaleOpen={project.publicSaleOpen}
                                                               paymentTokenDecimals={project.paymentTokenDecimals}
                                                               refreshProjectTotalSupply={refreshProjectTotalSupply}
                                                               maxBuyPerTx={project.maxBuyPerTx}
                                                               updateProgress={updateProgress}
                                                               whitelist={whitelist}
                                                 /> }
                    { isSoldout && <SoldoutComponent project={project} selectedNetwork={selectedNetwork} />}
                    { moment(project.saleDate).isAfter(moment(new Date())) && !saleIsOpen && <ComingSoonComponent {...project} /> }
                </div>
                <div className="mt-10 w-full md:mt-6 xl:mt-5">
                    { isSoldout && <ReportComponent />}
                    { !isSoldout && progress === TxStatus.NOT_RECEIVED && <SimularorComponent />}
                    { !isSoldout && progress !== TxStatus.NOT_RECEIVED && <ProgressComponent progress={progress} />}
                </div>
            </div>
        </div>
    )
}