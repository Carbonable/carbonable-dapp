import { useEffect, useState } from "react";
import Actions from "./Actions";
import ProjectInformation from "./ProjectInformation";
import { getImageUrlFromMetadata } from "~/utils/utils";
import SVGMetadata from "~/components/Images/SVGMetadata";
import type { LaunchpadProps, MintProps, ProjectProps } from "~/types/project";

export enum SaleStatusType {
    Loading,
    ComingSoon,
    Whitelist,
    Public,
    Soldout
}

export default function ProjectOverview({project, launchpad, mint, whitelist, hasReports}: {project: ProjectProps, launchpad: LaunchpadProps, mint: MintProps, whitelist: any, hasReports: boolean}) {
    const [projectState, setProjectState] = useState(SaleStatusType.Loading);
    const [imageSrc, setImageSrc] = useState<string>("/assets/images/backgrounds/bg-farming-card.png");
    const [isRawSVG, setIsRawSVG] = useState<boolean>(false);

    useEffect(() => {
        if (project.uri.uri) {
            getImageUrlFromMetadata(project.uri.uri).then((url) => {
                setImageSrc(url.imgUrl);
                setIsRawSVG(url.isSvg);
            });
        }
    }, [project.uri.uri]);
    
    useEffect(() => {
        if (launchpad.is_sold_out) {
            setProjectState(SaleStatusType.Soldout);
            return;
        }
    
        if (launchpad.public_sale_open) {
            setProjectState(SaleStatusType.Public);
            return;
        }
    
        if (launchpad.whitelisted_sale_open) {
            setProjectState(SaleStatusType.Whitelist);
            return;
        }
    
        if (!launchpad.public_sale_open && !launchpad.whitelisted_sale_open) {
            setProjectState(SaleStatusType.ComingSoon);
            return;
        }
    }, [launchpad]);

    return (
        <div className="w-full bg-mint p-4">
            <div className="mx-auto px-2 xl:w-10/12 2xl:w-9/12 2xl:max-w-6xl">
                <div className="font-inter text-neutral-100 font-bold text-lg uppercase md:text-2xl">{project.name}</div>
                <div className="flex flex-wrap justify-start items-center mt-4 md:gap-6 md:items-start">
                    <div className="w-full mx-auto md:w-[41%] md:order-2">
                        {isRawSVG === false && <img src={imageSrc.startsWith('https') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`${project.name} NFT card`} className="w-full rounded-[8.8%]" /> }
                        {isRawSVG === true && <div className="w-full"><SVGMetadata svg={imageSrc} id={project.id} /></div>}
                    </div>
                    <div className="flex flex-wrap mt-8 w-full mx-auto md:w-[55%] md:order-1 md:mt-0">
                        <ProjectInformation project={project} launchpad={launchpad} mint={mint} priceToDisplay={project.payment_token.displayable_value} projectState={projectState} />
                        <div className="mt-4 w-full flex items-center justify-center">
                            <Actions 
                                projectState={projectState} 
                                project={project}
                                launchpad={launchpad}
                                mint={mint}
                                priceToDisplay={project.payment_token.displayable_value} 
                                whitelist={whitelist} 
                                hasReports={hasReports}
                             />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}