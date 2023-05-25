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
        { title: "Carbonable - Web3 powered end-to-end carbon removal platform" },
        { name: "description", content:"The simplest and smartest way to reach Net Zero. Invest in the best nature-based solutions. Manage your assets and drive your strategy efficiently."},
        { name: "image", content: "https://carbonable.io/assets/images/social/social.jpg"},
        { property: 'og:url', content:"https://app.carbonable.io"},
        { property: 'og:type', content: "website"},
        { property: 'og:title', content: "Carbonable - Web3 powered end-to-end carbon removal platform"},
        { property: 'og:description', content: "The simplest and smartest way to reach Net Zero. Invest in the best nature-based solutions. Manage your assets and drive your strategy efficiently."},
        { property: 'og:image', content: "https://carbonable.io/assets/images/social/social.jpg"},
        { property: 'twitter:domain', content: "carbonable.io"},
        { property: 'twitter:url', content: "https://app.carbonable.io"},
        { property: 'twitter:title', content: "Carbonable - Web3 powered end-to-end carbon removal platform"},
        { property: 'twitter:description', content: "The simplest and smartest way to reach Net Zero. Invest in the best nature-based solutions. Manage your assets and drive your strategy efficiently."},
        { property: 'twitter:card', content: "summary_large_image"},
        { property: 'twitter:image', content: "https://carbonable.io/assets/images/social/social.jpg"}
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
                <h1 className="uppercase w-10/12 pl-8 md:w-6/12 md:pl-2">
                    <div className="font-trash text-lg text-neutral-100 md:text-2xl xl:text-3xl">Long-term yield</div>
                    <div className="font-americana font-thin text-neutral-100 md:text-xl xl:text-2xl">for your wallet</div>
                    <div className="font-trash text-xl bg-primary bg-clip-text text-transparent md:text-3xl xl:text-4xl">and the planet</div>
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