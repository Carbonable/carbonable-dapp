import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import PlusIconWhite from "~/components/Icons/PlusIcon";
import type { Project } from "@prisma/client";
import LaunchpadCard from "~/components/Project/ProjectCard";


export async function loader() {
    try {
        const allProjects = await db.project.findMany({
            orderBy: [
              {
                saleDate: 'desc',
              }
            ]});
      
        return json(allProjects);
    } catch {
        return json([]);
    }
    
};

export default function Launchpad() {
    const projects = useLoaderData();

    return (
        <div className="mx-auto mt-4 md:mt-12 lg:mt-6">
            <div className="relative w-full">
                <img src="/assets/images/backgrounds/launchpad.png" alt="Launchpad background" className="w-10/12 mx-auto 2xl:w-7/12" />
                <div className="absolute top-6 left-8 uppercase text-left leading-none md:top-14 md:left-16 lg:top:6 lg:left-10 xl:top-16 xl:left-16 2xl:top-14 2xl:left-64">
                    <div className="font-trash font-bold text-[4.4vw] lg:text-[3vw] 2xl:text-[2.8vw]">Long-term yield</div>
                    <div className="font-americana font-thin text-[3.8vw] lg:text-[2.6vw] 2xl:text-[2.2vw]">for your wallet</div>
                    <div className="font-trash font-bold text-green text-[4.4vw] mt-1 md:mt-2 lg:text-[3vw] 2xl:text-[2.8vw]">and the planet</div>
                    <img src="/assets/images/backgrounds/launchpad-pastille.png" alt="NFT projects pastille" className="mt-2 w-1/5 md:mt-4 lg:mt-2 xl:mt-4" />
                </div>
            </div>
            <div className="relative w-full mt-12 lg:mt-12 xl:mt-16">
                <div className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto flex items-center justify-center">
                    <PlusIconWhite className="w-8 md:w-12"></PlusIconWhite>
                    <h1 className="w-10/12 items-center uppercase font-trash text-bold text-lg md:text-xl lg:text-2xl xl:text-3xl text-center">Projects to finance</h1>
                    <PlusIconWhite className="w-8 md:w-12"></PlusIconWhite>
                </div>
                <div className="w-11/12 mx-auto flex flex-wrap items-start justify-center mt-10">
                    {projects.map((project: Project) => (     
                        <div key={project.slug} className="w-5/12 m-2 xl:w-[30%] 2xl:w-[22%]">
                            { project.contentReady && 
                                <NavLink to={`/projects/${project.slug}`}>
                                    <LaunchpadCard {...project} />
                                </NavLink>
                            }
                            { project.contentReady === false && 
                                <LaunchpadCard {...project} />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}