import { IPFS_GATEWAY } from "~/utils/links";
import { ipfsUrl } from "~/utils/utils";

export default function BadgesList({badges}: {badges: any[]}) {
    if (badges.length === 0) {
        return (
            <div className="ml-2 mt-2">
                You don't have any badges yet. Go to <a href="/odyssey" className="text-greenish-500 mt-1 hover:text-neutral-100">Odyssey</a> and try to claim one.
            </div>
        )
    }
    return (
        <div className="grid grid-cols-6 gap-3 mt-2 select-none">
            {badges.map((badge) => (
                <div key={badge.id} className="flex justify-start items-center flex-wrap col-span-2 md:col-span-1">
                    <div className="relative">
                        <img src={IPFS_GATEWAY + ipfsUrl(badge.tokens[0].image)} alt={`${badge.tokens[0].name} card`} className="rounded-lg w-full" />
                        <div className="text-center font-inter uppercase mt-1 text-xs lg:text-sm">{badge.tokens[0].name}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function LoaderBadges() {
    return (
        <div className="grid grid-cols-6 gap-3 mt-2">
            <div className="flex justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] md:flex xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] md:flex xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-2 md:col-span-1 w-full h-[30vw] md:h-[100px] md:flex xl:h-[180px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
        </div>
    )
}