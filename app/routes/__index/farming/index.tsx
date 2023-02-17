import type { Project } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import FarmingCard from "~/components/Farming/FarmingCard";
import FilterButton from "~/components/Filters/FilterButton";
import { userPrefs } from "~/cookie";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        const selectedNetwork = await db.network.findFirst({
            where: {
              ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
        });

        const allProjects = await db.project.findMany({
            where: {
                isDisplay: true,
                network: selectedNetwork || undefined, 
            },  
            orderBy: [
              {
                saleDate: 'desc',
              }
            ]});
        return json([allProjects]);
    } catch (e) {
        
        return json({});
    }
};

export default function FarmingIndex() {
    const loaderData = useLoaderData();
    const projects: Project[] = loaderData[0];

    const filterButtons = [
        {
            filter: 'All',
            active: true,
            isDisabled: false
        },
        {
            filter: 'My projects',
            active: false,
            isDisabled: true
        },
        {
            filter: 'Undeposited',
            active: false,
            isDisabled: true
        },
        {
            filter: 'Claimable',
            active: false,
            isDisabled: true
        }
    ];

    const handleclick = (filter: string) => {
        console.log(filter);
    }

    return (
        <div className="mx-auto md:mt-12 lg:mt-6 max-w-7xl">
            <div className="relative w-11/12 mx-auto border border-neutral-700 bg-farming bg-cover bg-[50%_22%] rounded-3xl p-8 flex items-start justify-start flex-wrap md:p-10 lg:p-12">
                <div className="flex items-start justify-center flex-wrap w-full md:w-5/12 md:justify-start">
                    <div className="font-trash uppercase w-full lg:text-lg text-center md:text-left">My farming assets</div>
                    <div className="font-americana text-4xl mt-4 text-neutral-200 font-extrabold">$0</div>
                </div>
                <div className="flex items-start justify-center flex-wrap w-full mt-8 md:w-5/12 md:mt-0 md:justify-start">
                    <div className="font-trash uppercase w-full lg:text-lg text-center md:text-left">Claimable assets</div>
                    <div className="font-americana text-4xl mt-4 text-neutral-200 font-extrabold flex items-center">$0<span className="font-inter font-extralight text-lg px-4">|</span>t0</div>
                </div>
                <img src="/assets/images/common/logo-grey.svg" alt="Carbonable logo grey" className="absolute bottom-0 right-12 w-[100px] xl:right-20 lg:w-[110px]" />
            </div>
            <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12 md:pl-6">
                <div className="uppercase font-trash text-lg text-center md:text-left md:pl-1 lg:text-xl">Farming Projects</div>
                <div className="items-center justify-start mt-4">
                    {
                        filterButtons.map((button, index) => {
                            return <FilterButton onClick={() => {handleclick(button.filter)}} active={button.active} key={index} disabled={button.isDisabled}>{button.filter}</FilterButton>
                        })
                    }
                </div>
                <div className="flex flex-wrap justify-start mt-8 gap-8 w-full">
                {
                    projects.map((project, index) => {
                        return (
                            <FarmingCard project={project} key={index} />
                        )})
                    }
                </div>
            </div>
        </div>
    )
}