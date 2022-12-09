import type { Project } from "@prisma/client";
import moment from "moment";
import { useEffect, useState } from "react";
import { usePublicSaleOpen, useSoldout, useWhitelistedSaleOpen } from "~/hooks/minter";
import { PlusIconBlack } from "../Icons/PlusIcon";

export default function LaunchpadCard({slug, saleDate, minterContract, networkId}: Project) {
    const { whitelistedSaleOpen } = useWhitelistedSaleOpen(minterContract, networkId);
    const { publicSaleOpen } = usePublicSaleOpen(minterContract, networkId);
    const { soldout } = useSoldout(minterContract, networkId);
    const [saleIsOpen, setSaleIsOpen] = useState(false);


    useEffect(() => {
        setSaleIsOpen((publicSaleOpen || whitelistedSaleOpen) ? true : false);
    }, [whitelistedSaleOpen, publicSaleOpen]);

    return (
        <div className="relative">
            <img src={`/assets/images/projects/${slug}/image.png`} alt={`${slug}  NFT card`} className="w-full" />
            { (soldout || saleIsOpen === false) && 
                <div className="absolute top-[2.3%] left-[2.3%] bg-beaige/50 w-[95.5%] h-[48.8%] rounded-[18px]"></div>
            }
            { soldout && 
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
    