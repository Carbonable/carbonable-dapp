import type { Project } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import FarmingRepartition from "~/components/Farming/FarmingRepartition";
import ProjectIdentification from "~/components/Farming/ProjectIdentification";
import { userPrefs } from "~/cookie";
import { db } from "~/utils/db.server";
import FarmingAllocation from "~/components/Farming/FarmingAllocation";
import KPI from "~/components/Farming/FarmKPI";
import FarmDetail, { FarmType } from "~/components/Farming/FarmDetail";
import { IPFS_GATEWAY } from "~/utils/links";

export const loader: LoaderFunction = async ({
    params, request
  }) => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        // If the user has selected a network, use that. Otherwise, use the default network.
        const selectedNetwork = await db.network.findFirst({
            where: {
                ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
        });

        // Find the project by slug and network.
        const project = await db.project.findFirst({
            where: {
            slug: params.slug,
            network: selectedNetwork || undefined, 
            },  
        });

        // If the project is not found, or is not display, throw a 404.
        if (project === null || project.isDisplay === false){
            throw new Response("Not Found", {status: 404})
        }

        return json({project, selectedNetwork});
    } catch (e) {
        throw new Response("Not Found", {status: 404})
    }
};

export default function FarmingPage() {
    const data = useLoaderData();
    const project: Project = data.project;
    // TODO: Replace with real data

    return (
        <div className="relative w-full">
            <div className="w-full bg-mint p-8 md:py-16">
                <div className="max-w-6xl mx-auto pl-4 xl:pl-8">
                    <div className="w-full grid grid-cols-2 gap-4 items-center">
                        <div className="col-span-2 md:col-span-1">
                            <ProjectIdentification project={project} />
                        </div>
                        <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
                            <FarmingRepartition />
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-4 mx-auto items-center mt-10 text-left md:mt-18 md:grid-cols-8 2xl:grid-cols-12 md:gap-12">
                        <div className="col-span-2 md:col-span-3 2xl:col-span-5">
                            <KPI title="Total Removal" value={"38.34"} unit="t" large={true} />
                        </div>
                        <div className="col-span-2 md:col-span-3 2xl:col-span-5">
                            <KPI title="TVL" value={"256.34K"} unit="$" large={true} />
                        </div>
                        <div className="col-span-2 md:col-span-2">
                            <KPI title="Current APR" value={"23.2%"} large={true} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative w-full px-4 py-10 md:py-16 max-w-6xl lg:px-8 mx-auto 2xl:px-0">
                <div className="md:pl-4 xl:pl-8">
                    <div className="font-inter font-semibold uppercase text-neutral-100 text-lg md:text-xl">Carbon credits</div>
                    <div className="flex flex-wrap mt-4 items-start md:mt-8">
                        <div className="w-full grid grid-cols-2 gap-6 md:w-3/12 md:border-r md:border-neutral-300">
                            <div className="w-full md:col-span-2 md:mt-2">
                                <KPI title="Generated to date" value={"2.34"} unit="CC" large={false} />
                            </div>
                            <div className="w-full md:col-span-2 md:mt-12">
                                <KPI title="To be generated" value={"38.34"} unit="CC" large={false} />
                            </div>
                        </div>
                        <div className="w-full md:w-9/12 md:pl-8">
                            <div className="mt-12 md:mt-0">
                                <FarmDetail type={FarmType.YIELD} total={"38.34"} available={"2.34"} handleClaim={() => {}} />
                            </div>
                            <div className="mt-12">
                                <FarmDetail type={FarmType.OFFSET} total={"38.34"} available={"2.34"} handleClaim={() => {}} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12">
                    <FarmingAllocation yieldAmount={20} offsetAmount={0} undepositedAmount={4} handleDeposit={() => {}} handleWithdraw={() => {}} /> 
                </div>
                <div className="relative bg-farming-footer bg-no-repeat bg-center bg-cover px-8 py-12 mt-12 rounded-2xl overflow-hidden md:p-16">
                    <div className="font-inter font-bold text-white text-3xl md:text-4xl">
                        Learn more about<br/>
                        {project.name}
                    </div>
                    <NavLink to={`/launchpad/${project.slug}`} className="font-inter text-white font-light uppercase text-xs mt-4 inline-flex items-center border border-white rounded-full px-4 py-1 md:text-sm md:py-2 hover:bg-opacityLight-5">Go to project page &nbsp;&nbsp; <span className="text-base mt-[-3px]">&gt;</span></NavLink>
                    <img src={IPFS_GATEWAY + project.imageIpfs} alt={`${project.slug} NFT card`} className="absolute bottom-[-28px] right-2 w-28 rounded-[8.8%] md:w-[280px] md:bottom-[-80px] md:right-5 lg:w-[300px] lg:bottom-[-100px]" />
                </div>
            </div>
        </div>
    )
}