import type { Project } from "@prisma/client";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSoldout } from "~/hooks/minter";
import { useProjectTotalSupply } from "~/hooks/project";
import { TxStatus } from "~/utils/blockchain/status";
import { ComingSoonComponent, MintComponent, ReportComponent, SimularorComponent, SoldoutComponent } from "./ProjectOverviewComponents";
import { ProgressComponent } from "./TransactionComponents";

export default function ProjectOverview({project}: {project: Project}) {
    const { soldout } = useSoldout(project.minterContract, project.networkId);
    const { projectTotalSupply, refreshProjectTotalSupply } = useProjectTotalSupply(project.projectContract, project.networkId);
    const [saleIsOpen, setSaleIsOpen] = useState(false);
    const [supplyLeft, setSupplyLeft] = useState(0);
    const [priceToDisplay, setPriceToDisplay] = useState(0);

    const [progress, setProgress] = useState("NOT_RECEIVED");

    const updateProgress = (step: string) => {
        setProgress(step);
      };

    useEffect(() => {
        setSaleIsOpen((project.publicSaleOpen || project.whitelistedSaleOpen) ? true : false);
    }, [project.whitelistedSaleOpen, project.publicSaleOpen]);

    useEffect(() => {
        if (project.maxSupplyForMint === undefined || projectTotalSupply === undefined) { return; }

        setSupplyLeft(project.maxSupplyForMint - parseInt(projectTotalSupply));
    }, [project.maxSupplyForMint, projectTotalSupply]);

    useEffect(() => {
        if (project.paymentTokenDecimals === undefined || project.unitPrice === undefined) { return; }

        setPriceToDisplay(project.unitPrice / Math.pow(10, project.paymentTokenDecimals));
    }, [project.paymentTokenDecimals, project.unitPrice]);

    return (
        <div className="border border-neutral-800 bg-launchpad-header rounded-3xl flex flex-wrap p-6 md:p-8 mx-auto">
            <div className="w-full md:w-1/2 xl:w-5/12">
                <img src={`https://ipfs.io/ipfs/${project.imageIpfs}`} alt={`${project.slug}  NFT card`} className="w-full rounded-[8.8%] md:w-11/12 xl:w-full" />
            </div>
            <div className="w-full mt-6 p-2 md:w-1/2 md:-mt-0 flex flex-wrap justify-between items-center xl:w-7/12 xl:items-left xl:pl-12 2xl:w-7/12 2xl:pl-16 2xl:pr-0 select-none">
                <div className="w-full">
                    { (saleIsOpen || soldout) && 
                        <>
                            <div className="font-trash text-4xl text-white xl:text-5xl 2xl:text-6xl">{priceToDisplay.toFixed(2)} {project.paymentTokenSymbol} <span className="font-americana font-thin text-lg text-beaige xl:text-xl 2xl:text-2xl">/ NFT</span></div>
                            <div className="font-inter text-beaige text-xs xl:text-base">
                                { !soldout && <span>{supplyLeft} NFTs left</span>}
                                { soldout && <span>{project.maxSupplyForMint} NFTs</span>}
                            </div>
                        </>
                }
                    { moment(project.saleDate).isAfter(moment(new Date())) && !saleIsOpen && <div className="font-trash text-4xl text-white xl:text-5xl 2xl:text-6xl">{supplyLeft} NFTs</div>}
                </div>
                <div className="mt-8 w-full md:mt-5 xl:mt-4">
                    { saleIsOpen && !soldout && <MintComponent estimatedAPR={project.estimatedAPR}
                                                               price={priceToDisplay}
                                                               paymentTokenSymbol={project.paymentTokenSymbol}
                                                               minterContract={project.minterContract}
                                                               paymentTokenAddress={project.paymentContract}
                                                               publicSaleOpen={project.publicSaleOpen}
                                                               paymentTokenDecimals={project.paymentTokenDecimals}
                                                               refreshProjectTotalSupply={refreshProjectTotalSupply}
                                                               maxBuyPerTx={project.maxBuyPerTx}
                                                               updateProgress={updateProgress}
                                                 /> }
                    { soldout && <SoldoutComponent {...project} />}
                    { moment(project.saleDate).isAfter(moment(new Date())) && !saleIsOpen && <ComingSoonComponent {...project} /> }
                </div>
                <div className="mt-10 w-full md:mt-6 xl:mt-5">
                    { soldout && <ReportComponent />}
                    { !soldout && progress === TxStatus.NOT_RECEIVED && <SimularorComponent />}
                    { !soldout && progress !== TxStatus.NOT_RECEIVED && <ProgressComponent progress={progress} />}
                </div>
            </div>
        </div>
    )
}