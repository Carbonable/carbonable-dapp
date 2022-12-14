import type { Project } from "@prisma/client";
import moment from "moment";
import { useEffect, useState } from "react";
import { PlusIconBlack } from "~/components/Icons/PlusIcon";
import { useSoldout } from "~/hooks/minter";
import { IPFS_GATEWAY } from "~/utils/links";

export default function LaunchpadCard({slug, saleDate, minterContract, networkId, imageIpfs, whitelistedSaleOpen, publicSaleOpen, isSoldout}: Project) {
    const { soldout } = useSoldout(minterContract, networkId);
    const [saleIsOpen, setSaleIsOpen] = useState(false);
    const [projectIsSoldout, setProjectIsSoldout] = useState(false);

    useEffect(() => {
        setProjectIsSoldout(soldout || isSoldout);
    }, [soldout, isSoldout]);

    useEffect(() => {
        setSaleIsOpen((publicSaleOpen || whitelistedSaleOpen) ? true : false);
    }, [whitelistedSaleOpen, publicSaleOpen]);

    return (
        <div className="relative">
            <img src={IPFS_GATEWAY + imageIpfs} alt={`${slug}  NFT card`} className="w-full rounded-[8.8%]" />
            { (projectIsSoldout || saleIsOpen === false) && 
                <div className="absolute top-0 left-0 bg-white/40 w-full h-[100%] rounded-[10%]"></div>
            }
            { projectIsSoldout && 
                <div className="absolute uppercase font-inter font-bold bg-beaige text-black top-[6%] left-[6%] py-1 px-2 text-[8px] md:text-xs lg:px-3 rounded-lg">Soldout</div>
            }
            { saleIsOpen === false && moment(saleDate).isAfter(moment(new Date()))  && 
                <div className="absolute flex items-center uppercase font-inter font-bold bg-green-blue text-black top-[6%] left-[6%] py-1 px-2 text-[8px] md:text-xs lg:px-3 rounded-lg">
                    <span>Coming soon</span>&nbsp;<PlusIconBlack className="w-2"></PlusIconBlack>&nbsp;<span>{moment(saleDate).format("MM.DD.YYYY").toString()}</span>
                </div>
            }
        </div>
    )
}
    