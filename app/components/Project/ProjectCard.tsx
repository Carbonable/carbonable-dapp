import type { Projects } from "@prisma/client";
import { useAccount } from "@starknet-react/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMaxSupplyForMint, useProjectNftAddress, usePublicSaleOpen, useWhitelistedSaleOpen } from "~/utils/blockchain/minter";
import { useProjectTotalSupply } from "~/utils/blockchain/project";
import { PlusIconBlack } from "../Icons/PlusIcon";

export default function LaunchpadCard({slug, saleDate, minterContract}: Projects) {
    const { account } = useAccount();
    const { whitelistedSaleOpen, loadingWhitelistedSaleOpen, errorWhitelistedSaleOpen, refreshWhitelistedSaleOpen } = useWhitelistedSaleOpen(minterContract);
    const { publicSaleOpen, loadingPublicSaleOpen, errorPublicSaleOpen, refreshPublicSaleOpen } = usePublicSaleOpen(minterContract);
    const { projectNftAddress, loadingProjectNftAddress, errorProjectNftAddress, refreshProjectNftAddress } = useProjectNftAddress(minterContract);
    const { maxSupplyForMint, loadingMaxSupplyForMint, errorMaxSupplyForMint, refreshMaxSupplyForMint } = useMaxSupplyForMint(minterContract);
    const { projectTotalSupply, loadingProjectTotalSupply, errorProjectTotalSupply, refreshProjectTotalSupply } = useProjectTotalSupply(projectNftAddress);
    const [saleIsOpen, setSaleIsOpen] = useState(false);
    const [isSoldOut, setIsSoldOut] = useState(false);

    useEffect(() => {
        refreshWhitelistedSaleOpen()
    }, [account, loadingWhitelistedSaleOpen, errorWhitelistedSaleOpen, refreshWhitelistedSaleOpen]);

    useEffect(() => {
        refreshPublicSaleOpen()
    }, [account, loadingProjectNftAddress, errorPublicSaleOpen, refreshPublicSaleOpen]);

    useEffect(() => {
        refreshProjectNftAddress()
    }, [account, loadingPublicSaleOpen, errorProjectNftAddress, refreshProjectNftAddress]);

    useEffect(() => {
        refreshMaxSupplyForMint()
    }, [account, loadingMaxSupplyForMint, errorMaxSupplyForMint, refreshMaxSupplyForMint]);

    useEffect(() => {
        if (projectNftAddress === undefined) { return; }

        refreshProjectTotalSupply()
    }, [account, loadingProjectTotalSupply, errorProjectTotalSupply, refreshProjectTotalSupply, projectNftAddress]);


    useEffect(() => {
        setSaleIsOpen((publicSaleOpen?.toString() === "1" || whitelistedSaleOpen?.toString() === "1") ? true : false);
    }, [whitelistedSaleOpen, publicSaleOpen]);

    useEffect(() => {
        if (maxSupplyForMint === undefined || projectTotalSupply === undefined) { return; }

        setIsSoldOut(parseInt(maxSupplyForMint.toString()) - parseInt(projectTotalSupply.toString()) === 0 ? true : false)
    }, [maxSupplyForMint, projectTotalSupply]);

    return (
        <div className="relative">
            <img src={`/assets/images/projects/${slug}/image.png`} alt={`${slug}  NFT card`} className="w-full" />
            { (isSoldOut || saleIsOpen === false) && 
                <div className="absolute top-[2.3%] left-[2.3%] bg-beaige/50 w-[95.5%] h-[48.8%] rounded-[18px]"></div>
            }
            { isSoldOut && 
                <div className="absolute uppercase font-inter font-bold bg-beaige text-black top-3 left-3 py-1 px-2 text-[8px] md:text-xs md:top-4 md:left-4 lg:px-3 rounded-lg">Soldout</div>
            }
            { saleIsOpen === false && moment(saleDate).isAfter(moment(new Date()))  && 
                <div className="absolute flex items-center uppercase font-inter font-bold bg-green-blue text-black top-3 left-3 py-1 px-2 text-[8px] md:text-xs md:top-4 md:left-4 lg:px-3 rounded-lg">
                    <span>Coming soon</span>&nbsp;<PlusIconBlack className="w-2"></PlusIconBlack>&nbsp;<span>{moment(saleDate).format("MM.DD.YYYY").toString()}</span>
                </div>
            }
        </div>
    )
}
    