import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
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
        const projects = await fetch(`${process.env.INDEXER_URL}/launchpad/list`, {});
        const projectsJson = await projects.json();
        return json(projectsJson);
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
    const projects = useLoaderData().data as LaunchpadLoaderData[];
    return (
        <div className="mx-auto md:mt-12 lg:mt-6 max-w-7xl">
            <div className="relative w-11/12 mx-auto border border-neutral-700 bg-launchpad-header rounded-3xl p-4 flex items-center justify-center flex-wrap md:px-10">
                <div className="w-2/12">
                    <img src="/assets/images/common/logo-green.svg" alt="Carbonable logo green" className="w-full md:w-9/12" />
                </div>
                <h1 className="uppercase w-10/12 pl-8 md:w-6/12 md:pl-2 font-bold text-xl md:text-2xl lg:text-3xl xl:text-5xl">
                    <div className="text-neutral-100">
                        Fund
                        <span className="text-greenish-500"> provable</span>
                    </div>
                    <div className="">Nature restoration</div>
                </h1>
                <img src="/assets/images/backgrounds/launchpad.svg" alt="world map" className="w-10/12 mx-auto mt-4 md:w-4/12" />
            </div>
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
                    { (projects === undefined || projects.length === 0) &&
                        <div className="text-xl px-2 text-neutral-300">
                            No projects available right now
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}