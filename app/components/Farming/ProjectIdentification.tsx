import { IPFS_GATEWAY } from "~/utils/links";
import { ipfsUrl } from "~/utils/utils";

export default function ProjectIdentification({name, imageSrc, slug}: {name: string, imageSrc: string, slug: string}) {
    return (
        <div className="flex items-center justify-start w-full px-4 md:px-0">
            <div className="w-3/12">
                <img src={imageSrc} alt={`${slug} NFT card`} className="w-10/12 rounded-[8.8%] md:w-full" />
            </div>
            <div className="px-4 font-inter text-neutral-100 text-lg md:text-xl lg:text-2xl font-bold w-9/12 uppercase">{name}</div>
        </div>
    )
}