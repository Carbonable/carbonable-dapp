import type { Projects } from "@prisma/client";
import { useAccount } from "@starknet-react/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMaxSupplyForMint, usePaymentTokenAddress, useProjectNftAddress, usePublicSaleOpen, useUnitPrice, useWhitelistedSaleOpen } from "~/utils/blockchain/minter";
import { usePaymentTokenDecimals, usePaymentTokenSymbol } from "~/utils/blockchain/paymentToken";
import { useProjectTotalSupply } from "~/utils/blockchain/project";
import { ComingSoonComponent, MintComponent, ReportComponent, SimularorComponent, SoldoutComponent } from "./ProjectOverviewComponents";



export default function ProjectOverview({project}: {project: Projects}) {
    const { whitelistedSaleOpen } = useWhitelistedSaleOpen(project.minterContract);
    const { publicSaleOpen } = usePublicSaleOpen(project.minterContract);
    const { projectNftAddress } = useProjectNftAddress(project.minterContract);
    const { paymentTokenAddress } = usePaymentTokenAddress(project.minterContract);
    const { maxSupplyForMint } = useMaxSupplyForMint(project.minterContract);
    const { unitPrice } = useUnitPrice(project.minterContract);
    const { projectTotalSupply } = useProjectTotalSupply(projectNftAddress);
    const { paymentTokenDecimals } = usePaymentTokenDecimals(paymentTokenAddress);
    const { paymentTokenSymbol } = usePaymentTokenSymbol(paymentTokenAddress);
    const [saleIsOpen, setSaleIsOpen] = useState(false);
    const [isSoldOut, setIsSoldOut] = useState(false);
    const [supplyLeft, setSupplyLeft] = useState(0);
    const [priceToDisplay, setPriceToDisplay] = useState(0);

    useEffect(() => {
        setSaleIsOpen((publicSaleOpen?.toString() === "1" || whitelistedSaleOpen?.toString() === "1") ? true : false);
    }, [whitelistedSaleOpen, publicSaleOpen]);

    useEffect(() => {
        if (maxSupplyForMint === undefined || projectTotalSupply === undefined) { return; }

        setIsSoldOut(parseInt(maxSupplyForMint.toString()) - parseInt(projectTotalSupply.toString()) === 0 ? true : false);
        setSupplyLeft(parseInt(maxSupplyForMint.toString()) - parseInt(projectTotalSupply.toString()));
    }, [maxSupplyForMint, projectTotalSupply]);

    useEffect(() => {
        // console.log(paymentTokenDecimals);
        if (paymentTokenDecimals === undefined || unitPrice === undefined) { return; }

        setPriceToDisplay(parseFloat(unitPrice.toString()) / Math.pow(10, parseInt(paymentTokenDecimals.toString())));
    }, [paymentTokenDecimals, unitPrice]);

    return (
        <div className="bg-black bg-navigation rounded-3xl flex flex-wrap p-6 md:p-8 2xl:max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 xl:w-5/12">
                <img src={`/assets/images/projects/${project.slug}/image.png`} alt={`${project.slug}  NFT card`} className="w-full md:w-11/12 xl:w-full" />
            </div>
            <div className="w-full mt-6 p-2 md:w-1/2 md:-mt-0 flex flex-wrap justify-between items-center xl:w-7/12 xl:items-left xl:pl-12 2xl:w-7/12 2xl:pl-16 2xl:pr-0">
            <div className="w-full">
                { (saleIsOpen || isSoldOut) && 
                    <>
                        <div className="font-trash text-4xl text-white xl:text-5xl 2xl:text-6xl">{priceToDisplay.toFixed(2)} {paymentTokenSymbol ? paymentTokenSymbol.toString() : ""} <span className="font-americana font-thin text-lg text-beaige xl:text-xl 2xl:text-2xl">/ NFT</span></div>
                        <div className="font-inter text-beaige text-xs xl:text-base">
                            { !isSoldOut && <span>{supplyLeft} NFTs left</span>}
                            { isSoldOut && <span>{projectTotalSupply} NFTs</span>}
                        </div>
                    </>
            }
                { moment(project.saleDate).isAfter(moment(new Date())) && !saleIsOpen && <div className="font-trash text-4xl text-white xl:text-5xl 2xl:text-6xl">{supplyLeft} NFTs</div>}
            </div>
            <div className="mt-8 w-full md:mt-5 xl:mt-4">
                { saleIsOpen && !isSoldOut && <MintComponent estimatedAPR={project.estimatedAPR} price={priceToDisplay} paymentTokenSymbol={paymentTokenSymbol} /> }
                { isSoldOut && <SoldoutComponent {...project} />}
                { moment(project.saleDate).isAfter(moment(new Date())) && !saleIsOpen && <ComingSoonComponent {...project} /> }
            </div>
            <div className="mt-10 w-full md:mt-6 xl:mt-5">
                { isSoldOut && <ReportComponent />}
                { (moment(project.saleDate).isAfter(moment(new Date()))  || saleIsOpen) && <SimularorComponent />}
            </div>
            </div>
        </div>
    )
}