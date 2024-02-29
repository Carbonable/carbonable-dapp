import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { TransparentLinkButton } from "~/components/Buttons/LinkButton";
import ProjectStatus from "~/components/Common/ProjectStatus";
import LaunchpadCard from "~/components/Project/Overview/ProjectCard";

export interface ProjectProps {
    id: string,
    slug: string,
    name: string,
    address: string,
    uri: any,
    forecasted_apr: string,
    total_value: string,
    value_decimals: string,
    payment_token?: any
}

export interface LaunchpadProps {
    image: string | null,
    is_ready: boolean,
    is_sold_out: boolean,
    minter_contract: any,
    public_sale_open: boolean,
    sale_date: Date | string | null,
    whitelisted_sale_open: boolean,
}

export interface MintProps {
    min_value_per_tx: any,
    max_value_per_tx: any,
    max_value: any,
    total_value: any,
    remaining_value: any,
    reserved_value: any,
    payment_token_address: string
}

export interface LaunchpadLoaderData {
    project: ProjectProps,
    launchpad: LaunchpadProps,
    mint: MintProps
}


export const loader: LoaderFunction = async () => {
    try {
        const projectsData = await fetch(`${process.env.INDEXER_URL}/launchpad/list`, {});
        const projectsJson = await projectsData.json();

        const projects = projectsJson.data;
        return json({projects, displayHeader: process.env.DISPLAY_LAUNCHPAD_HEADER === "true"});
    } catch (e) {
        console.error(e)
        return json([]);
    }
};

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Carbonable - Provable Nature Restoration" },
        { name: "description", content:"Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { name: "image", content: "https://carbonable.github.io/socials/social.jpg"},
        { property: 'og:url', content:"https://app.carbonable.io"},
        { property: 'og:type', content: "website"},
        { property: 'og:title', content: "Carbonable - Provable Nature Restoration"},
        { property: 'og:description', content: "Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { property: 'og:image', content: "https://carbonable.github.io/socials/social.jpg"},
        { property: 'twitter:domain', content: "carbonable.io"},
        { property: 'twitter:url', content: "https://app.carbonable.io"},
        { property: 'twitter:title', content: "Carbonable - Provable Nature Restoration"},
        { property: 'twitter:description', content: "Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { property: 'twitter:card', content: "summary_large_image"},
        { property: 'twitter:image', content: "https://carbonable.github.io/socials/social.jpg"}
    ]
};

export default function Launchpad() {
    const { projects, displayHeader } = useLoaderData() as { projects: LaunchpadLoaderData[], displayHeader: boolean };

    return (
        <div className="mx-auto md:mt-12 lg:mt-4 max-w-7xl">
            <LaunchpadHeader displayHeader={displayHeader} />
            <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12 md:pl-6">
                <div className="uppercase font-inter text-bold text-lg text-center md:text-left md:pl-1 2xl:text-xl">Projects to finance</div>
                <div className="flex flex-wrap items-start justify-center mt-2 md:justify-start">
                    {projects && projects.map((project: LaunchpadLoaderData) => (     
                        <div key={project.project.slug} className="w-full my-2 mx-2 md:ml-0 md:mr-4 md:w-[31%] lg:w-[31%]">
                            { project.launchpad.is_ready && 
                                <NavLink to={`/launchpad/${project.project.slug}`}>
                                    <LaunchpadCard {...project} />
                                </NavLink>
                            }
                            { project.launchpad.is_ready === false && 
                                <LaunchpadCard {...project} />
                            }
                        </div>
                    ))}
                    { (projects === undefined || projects.length === 0) &&
                        <div className="text-xl px-2 text-neutral-300">
                            No projects available right now
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function LaunchpadHeader({ displayHeader }: { displayHeader: boolean }) {

    if (!displayHeader) return null;

    return (
        <div className="relative w-full md:w-11/12 mx-auto bg-karathuru rounded-lg md:px-10 bg-no-repeat bg-cover bg-center min-h-[360px] border-4 border-neutral-700">
            <div className="absolute bottom-6 md:bottom-12 left-0 w-full">
                <div className="flex justify-between w-full items-end px-8 flex-wrap">
                    <div className="text-left w-full md:w-1/2">
                        <div className="text-3xl font-bold">Karathuru Project</div>
                        <div className="text-sm font-medium flex items-center mt-1">
                            By 
                            <div className="text-neutral-200 font-normal ml-1">Worldview International Foundation</div>
                            <div className="ml-1">
                                <img src="/assets/images/common/verified-icon.svg" alt="Verified Icon" className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-sm font-medium ">
                            Pre-Register to access this exclusive funding opportunity
                        </div>
                        <div className="mt-8 flex justify-between">
                            <div className="text-left">
                                <TransparentLinkButton  href="https://register.carbonable.io">Pre-register</TransparentLinkButton>
                            </div>
                            <div className="text-right md:hidden">
                                <ProjectStatus />
                            </div>
                        </div>
                    </div>
                    <div className="text-right w-full md:w-1/2 mt-8 md:mt-0 hidden md:flex md:justify-end items-end">
                        <ProjectStatus />
                    </div>
                </div>
            </div>
        </div>
    )
}