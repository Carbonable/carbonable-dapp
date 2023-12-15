import SVGMetadata from "../Images/SVGMetadata";

export default function ProjectIdentification({id, name, imageSrc, slug, isRawSVG}: {id: string, name: string, imageSrc: string|undefined, slug: string, isRawSVG: boolean}) {
    if (imageSrc === undefined) {
        return (
            <div className="flex items-center justify-start w-full px-4 md:px-0">
            </div>
        )
    }    

    return (
        <div className="flex items-center justify-start w-full px-4 md:px-0">
            <div className="w-3/12">
                {isRawSVG === false && <img src={imageSrc.startsWith('https') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`${name} NFT card`} className="w-10/12 rounded-[8.8%] md:w-full" /> }
                {isRawSVG === true && <div className="w-full"><SVGMetadata svg={imageSrc} id={id} /></div>}
            </div>
            <div className="px-4 font-inter text-neutral-100 text-lg md:text-xl lg:text-2xl font-bold w-9/12 uppercase">{name}</div>
        </div>
    )
}