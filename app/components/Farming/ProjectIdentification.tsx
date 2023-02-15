import type { Project } from "@prisma/client";
import { IPFS_GATEWAY } from "~/utils/links";
import Undeposited from "./Undeposited";

export default function ProjectIdentification({project, deposited, status, displayDeposited}: {project: Project, deposited: boolean | undefined, status: string, displayDeposited: boolean}) {
    if (displayDeposited) return (
        <div className="flex items-center justify-start w-full">
            <div className="w-2/12">
                <img src={IPFS_GATEWAY + project.imageIpfs} alt={`${project.slug} NFT card`} className="w-12 rounded-[8.8%] lg:w-16 xl:w-18" />
            </div>
            <div className="px-4 font-inter text-neutral-100 text-lg lg:text-2xl font-bold w-6/12 uppercase">{project.name}</div>
            <div className="w-4/12 flex justify-end">
                {deposited && status === 'connected' && <Undeposited /> }
            </div>
        </div>
    )
    return (
        <div className="flex items-center justify-start w-full px-4 md:px-0">
            <div className="w-3/12">
                <img src={IPFS_GATEWAY + project.imageIpfs} alt={`${project.slug} NFT card`} className="w-10/12 rounded-[8.8%] md:w-full" />
            </div>
            <div className="px-4 font-inter text-neutral-100 text-lg md:text-xl lg:text-2xl font-bold w-9/12 uppercase">{project.name}</div>
        </div>
    )
}