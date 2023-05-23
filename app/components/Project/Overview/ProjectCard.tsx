import moment from "moment";
import { useEffect, useState } from "react";
import { PlusIconBlack } from "~/components/Icons/PlusIcon";
import type { LaunchpadLoaderData } from "~/routes/__index/launchpad";
import { getImageUrlFromMetadata } from "~/utils/utils";

export default function LaunchpadCard(project: LaunchpadLoaderData) {
    const [saleIsOpen, setSaleIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>("/assets/images/backgrounds/bg-farming-card.png");

    useEffect(() => {
        if (project.project.uri.uri) {
            getImageUrlFromMetadata(project.project.uri.uri).then((url) => {
                setImageSrc(url);
            });
        }
    }, [project.project.uri.uri]);

    useEffect(() => {
        setSaleIsOpen((project.launchpad.public_sale_open || project.launchpad.whitelisted_sale_open) ? true : false);
    }, [project.launchpad.public_sale_open, project.launchpad.whitelisted_sale_open]);

    return (
        <div className="relative  min-h-[320px]">
            <img src={imageSrc} alt={`${project.project.slug} NFT card`} className="w-full rounded-[8.8%]" />
            { (project.launchpad.is_sold_out || saleIsOpen === false) && 
                <div className="absolute top-0 left-0 bg-white/40 w-full h-[100%] rounded-[10%]"></div>
            }
            { project.launchpad.is_sold_out && 
                <div className="absolute uppercase font-inter font-bold bg-beaige text-black top-[6%] left-[6%] py-1 px-2 text-[8px] md:text-xs lg:px-3 rounded-lg">Soldout</div>
            }
            { saleIsOpen === false && project.launchpad.sale_date === null && project.launchpad.is_sold_out === false &&
                <div className="absolute flex items-center uppercase font-inter font-bold bg-green-blue text-black top-[6%] left-[6%] py-1 px-2 text-[8px] md:text-xs lg:px-3 rounded-lg">
                    <span>Coming soon</span>
                </div>
            }
            { saleIsOpen === false && moment(project.launchpad.sale_date).isAfter(moment(new Date())) && project.launchpad.is_sold_out === false &&
                <div className="absolute flex items-center uppercase font-inter font-bold bg-green-blue text-black top-[6%] left-[6%] py-1 px-2 text-[8px] md:text-xs lg:px-3 rounded-lg">
                    <span>Coming soon</span>&nbsp;<PlusIconBlack className="w-2"></PlusIconBlack>&nbsp;<span>{moment(project.launchpad.sale_date).format("MM.DD.YYYY").toString()}</span>
                </div>
            }
        </div>
    )
}
    