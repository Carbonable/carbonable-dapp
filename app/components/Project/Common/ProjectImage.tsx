import { useEffect, useState } from "react";
import { getImageUrlFromMetadata } from "~/utils/utils";
import SVGMetadata from "../../Images/SVGMetadata";
import { useProject } from "../ProjectWrapper";

export default function ProjectImage({ imageId }: { imageId: string }) {
    const [imageSrc, setImageSrc] = useState<string>("/assets/images/backgrounds/bg-farming-card.png");
    const [isRawSVG, setIsRawSVG] = useState<boolean>(false);
    const { project } = useProject();

    useEffect(() => {
        if (project.uri.uri) {
            getImageUrlFromMetadata(project.uri.uri).then((url) => {
                setImageSrc(url.imgUrl);
                setIsRawSVG(url.isSvg);
            });
        }
    }, [project.uri.uri]);

    return (
        <>
            {isRawSVG === false && 
                <img src={imageSrc.startsWith('https') || imageSrc.startsWith('/assets') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`NFT card`} className="w-full" />
            }
            {isRawSVG === true && 
                <div className="w-full">
                    <SVGMetadata 
                        svg={imageSrc} 
                        id={imageId}
                        area={project.current_milestone.ha ? project.current_milestone.ha + "ha" : undefined}
                        carbonUnits={project.current_milestone.ton ? project.current_milestone.ton + "t" : undefined}
                    />
                </div>
            }
        </>
    )
}