import { useEffect, useState } from "react";
import SVGMetadata from "~/components/Images/SVGMetadata";
import { type LaunchpadLoaderData } from "~/types/project";
import { getImageUrlFromMetadata } from "~/utils/utils";

export default function LaunchpadCard(project: LaunchpadLoaderData) {
    const [imageSrc, setImageSrc] = useState<string>("/assets/images/backgrounds/bg-farming-card.png");
    const [isRawSVG, setIsRawSVG] = useState<boolean>(false);

    useEffect(() => {
        if (project.project.uri.uri) {
            getImageUrlFromMetadata(project.project.uri.uri).then((url) => {
                setImageSrc(url.imgUrl);
                setIsRawSVG(url.isSvg);
            });
        }
    }, [project.project.uri.uri]);

    return (
        <div className="relative">
            {isRawSVG === false && <img src={imageSrc.startsWith('https') || imageSrc.startsWith('/assets') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`${project.project.slug} NFT card`} className="w-full rounded-[8.8%]" /> }
            {isRawSVG === true && <div className="w-full"><SVGMetadata svg={imageSrc} id={project.project.id}/></div>}
        </div>
    )
}
    