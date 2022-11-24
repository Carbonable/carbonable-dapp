import type { Projects } from "@prisma/client";
import moment from "moment";
import { PlusIconBlack } from "../Icons/PlusIcon";

export default function LaunchpadCard({name, slug, isSoldOut, saleIsOpen, saleDate}: Projects) {

    return (
        <div className="relative">
            <img src={`/assets/images/projects/${slug}/image.png`} alt={`${name}  NFT card`} className="w-full" />
            { (isSoldOut || saleIsOpen === false) && 
                <div className="absolute top-[2.3%] left-[2.3%] bg-beaige/50 w-[95.5%] h-[48.8%] rounded-[18px]"></div>
            }
            { isSoldOut && 
                <div className="absolute uppercase font-inter font-bold bg-beaige text-black top-3 left-3 py-1 px-2 text-[8px] md:text-xs md:top-4 md:left-4 lg:px-3 rounded-lg">Soldout</div>
            }
            { moment(saleDate).isAfter(moment(new Date()))  && 
                <div className="absolute flex items-center uppercase font-inter font-bold bg-green-blue text-black top-3 left-3 py-1 px-2 text-[8px] md:text-xs md:top-4 md:left-4 lg:px-3 rounded-lg">
                    <span>Coming soon</span>&nbsp;<PlusIconBlack className="w-2"></PlusIconBlack>&nbsp;<span>{moment(saleDate).format("MM.DD.YYYY").toString()}</span>
                </div>
            }
        </div>
    )
}
    