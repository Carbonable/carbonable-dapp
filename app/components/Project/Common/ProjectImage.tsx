import { useEffect, useState } from "react";
import { getImageUrlFromMetadata } from "~/utils/utils";
import SVGMetadata from "../../Images/SVGMetadata";

export default function ProjectImage({ imageUri, projectId }: { imageUri: string | undefined, projectId: string}) {
    const [imageSrc, setImageSrc] = useState<string>("/assets/images/backgrounds/bg-farming-card.png");
    const [isRawSVG, setIsRawSVG] = useState<boolean>(false);

    useEffect(() => {
        if (imageUri) {
            getImageUrlFromMetadata(imageUri).then((url) => {
                setImageSrc(url.imgUrl);
                setIsRawSVG(url.isSvg);
            });
        }
    }, [imageUri]);

    return (
        <>
            {isRawSVG === false && 
                <img src={imageSrc.startsWith('https') || imageSrc.startsWith('/assets') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`NFT card`} className="w-full" />
            }
            {isRawSVG === true && 
                <div className="w-full">
                    <SVGMetadata svg={imageSrc} id={projectId} />
                </div>
            }
        </>
    )
}