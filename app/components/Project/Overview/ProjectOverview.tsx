import { useEffect, useState } from "react";
import Actions from "./Actions";
import ProjectInformation from "./ProjectInformation";
import type { LaunchpadProps, MintProps, ProjectProps } from "~/routes/__index/launchpad";
import { getImageUrlFromMetadata } from "~/utils/utils";
import SVGMetadata from "~/components/Images/SVGMetadata";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export enum SaleStatusType {
    Loading,
    ComingSoon,
    Whitelist,
    Public,
    Soldout
}

export default function ProjectOverview({project, launchpad, mint, whitelist}: {project: ProjectProps, launchpad: LaunchpadProps, mint: MintProps, whitelist: any}) {
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
            <div className="mx-auto px-4 xl:w-10/12 2xl:w-9/12 2xl:max-w-6xl">
                <Header projectName={project.name} />
                <div className="grid grid-cols-1 md:grid-cols-3 mt-4 md:gap-x-6 md:items-start">
                    <div className="w-full order-1 md:order-3">
                        {isRawSVG === false && <img src={imageSrc.startsWith('https') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`${project.name} NFT card`} className="w-full rounded-[8.8%]" /> }
                        {isRawSVG === true && <div className="w-full"><SVGMetadata svg={imageSrc} id={project.id} /></div>}
                    </div>
                    <div className="col-span-2 order-2 md:order-1">
                        <ProjectInformation 
                            project={project}
                            launchpad={launchpad}
                            mint={mint}
                            priceToDisplay={project.payment_token.displayable_value}
                            projectState={projectState}
                        />
                        <div className="mt-4">
                            <Actions 
                                projectState={projectState} 
                                project={project}
                                launchpad={launchpad}
                                mint={mint}
                                priceToDisplay={project.payment_token.displayable_value} 
                                whitelist={whitelist} 
                                SFTClaimed={1}
                                SFTToClaim={0}
                                STFAvailable={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Header({projectName}: {projectName: string}) {
    return (
        <div className="flex items-center justify-between mt-8">
            <div className="font-inter text-neutral-100 text-lg uppercase">{projectName}</div>
            <div>
                <a href="https://carbonable.io#simulator" target="_blank" className="text-greenish-500 mt-1 inline-flex px-2 items-center 2xl:mt-0 hover:text-neutral-100 uppercase text-sm" rel="noreferrer">
                    Yield Simulator <ArrowTopRightOnSquareIcon className="w-4 ml-2" />
                </a>
            </div>
        </div>
    )
}
