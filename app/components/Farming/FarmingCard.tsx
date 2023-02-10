import type { Project } from "@prisma/client";
import Undeposited from "./Undeposited";
import { sample } from 'lodash';
import { useContext, useEffect, useState } from "react";
import { IPFS_GATEWAY } from "~/utils/links";
import { WalletContext } from "~/hooks/wallet-context";

export default function FarmingCard({ project }: { project: Project }) {
    // TODO: Replace with real data
    const [deposited, setDeposited] = useState(sample([false]));
    const { status } = useContext(WalletContext);

    useEffect(() => {
        if (status === "connected") {
            setDeposited(sample([true, false]));
        }
    }, [status])


    return (
        <div className={`relative bg-opacityLight-5 rounded-3xl p-6 border w-full mb-4 md:w-[48%] cursor-pointer ${!deposited && status === 'connected' ? "border-undepositedBorder" : "border-neutral-700"} hover:border-neutral-400`}>
            <div className={`hover:before:rounded-3xl hover:before:bg-brand-background hover:before:opacity-10 hover:before:bg-cover hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:right-0 hover:before:bottom-0 hover:before:content-['']`}>
                <div className="flex items-center justify-start w-full">
                    <div className="w-2/12">
                        <img src={IPFS_GATEWAY + project.imageIpfs} alt={`${project.slug} NFT card`} className="w-12 rounded-[8.8%] lg:w-16 xl:w-18" />
                    </div>
                    <div className="px-4 font-inter text-neutral-100 text-lg lg:text-2xl font-normal w-6/12">{project.name}</div>
                    <div className="w-4/12 flex justify-end">
                        {!deposited && status === 'connected' && <Undeposited />}
                    </div>
                </div>
                <div className="flex items-center justify-start w-full mt-8 font-inter uppercase">
                    <div className="w-5/12">
                        <div className="text-neutral-300 text-xs lg:text-base">Total removal</div>
                        <div className="text-neutral-100 font-bold lg:text-lg xl:text-xl">12.4T</div>
                    </div>
                    <div className="w-4/12">
                        <div className="text-neutral-300 text-xs lg:text-base">TLV</div>
                        <div className="text-neutral-100 font-bold lg:text-lg xl:text-xl">$182.5k</div>
                    </div>
                    <div className="w-3/12">
                        <div className="text-neutral-300 text-xs lg:text-base">APR</div>
                        <div className="text-neutral-100 font-bold lg:text-lg xl:text-xl">23.6%</div>
                    </div>
                </div>
                {status === 'connected' && <div className="w-full mx-auto py-1 px-4 font-inter flex bg-opacityLight-5 rounded-xl mt-8 mb-2 justify-center items-center border border-neutral-600 text-xs lg:text-sm">
                    <div className="">
                        <span className="italic text-neutral-300">My stake</span>
                        <span className="font-bold text-neutral-100 ml-3">$2500</span>
                    </div>
                    <div className="mx-4 lg:mx-6 text-neutral-300 text-xl font-thin pb-1">|</div>
                    <div className="">
                        <span className="italic text-neutral-300">Claim</span>
                        <span className="font-bold text-neutral-100 ml-3">$200.5</span>
                        <span className="font-bold text-neutral-100 ml-2">t0.06</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}
