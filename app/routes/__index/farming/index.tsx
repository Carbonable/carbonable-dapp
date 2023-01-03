import type { Project, Snapshot } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useAccount } from "@starknet-react/core";
import moment from "moment";
import { useState } from "react";
import ConnectButton from "~/components/Buttons/ConnectButton";
import Countdown from "~/components/Countdown/Countdown";
import FarmingCard from "~/components/Farming/FarmingCard";
import FilterButton from "~/components/Filters/FilterButton";
import { userPrefs } from "~/cookie";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const nextSnapshot = await db.snapshot.findMany({
            where: {
                snapshotDate: {
                    gte: new Date()
                  }
            },
            orderBy: {
                snapshotDate: 'asc'
            }
        });

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
        return json([nextSnapshot[0], allProjects]);
    } catch (e) {
        
        return json({});
    }
};

export default function FarmingIndex() {
    const loaderData = useLoaderData();
    const snapshot: Snapshot = loaderData[0];
    const projects: Project[] = loaderData[1];

    const { status } = useAccount();
    let now = moment();
    

    const snapshotDate = moment(snapshot.snapshotDate);
   
    const[countdown, setCountdown] = useState(moment.duration(snapshotDate.diff(now)));

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

    setInterval(() => {
        now = moment();
        setCountdown(moment.duration(snapshotDate.diff(now)));
    }, 1000)

    const handleclick = (filter: string) => {
        console.log(filter);
    }

    return (
        <div className="mx-auto md:mt-12 lg:mt-6 max-w-7xl">
            <div className="relative w-11/12 mx-auto border border-neutral-700 bg-launchpad-header rounded-3xl p-8 flex items-start justify-start flex-wrap md:px-10">
                <div className="flex items-start justify-center flex-wrap w-full md:w-5/12 md:justify-start">
                    <div className="font-trash text-lg uppercase w-full lg:text-xl text-center md:text-left">My farming assets</div>
                    {status === 'connected' && <div className="font-trash text-4xl uppercase mt-4 text-neutral-300">$2500</div>}
                    {status === 'disconnected' && <div className="font-trash text-xl uppercase mt-4">
                        <ConnectButton />
                        </div>}
                </div>
                <div className="flex items-start justify-center flex-wrap w-full mt-8 md:w-5/12 md:mt-0 md:justify-start">
                    <div className="font-trash text-lg uppercase w-full lg:text-xl text-center md:text-left">End of current cycle</div>
                    <Countdown countdown={countdown} />
                </div>
                <img src="/assets/images/common/logo-grey.svg" alt="Carbonable logo grey" className="absolute bottom-0 right-12 w-[100px] xl:right-20 lg:w-[110px]" />
            </div>
            <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12 md:pl-6">
                <div className="uppercase font-trash text-lg text-center md:text-left md:pl-1 lg:text-xl">Farming Projects</div>
                <div className="hidden items-center justify-start mt-4">
                    {
                        filterButtons.map((button, index) => {
                            return <FilterButton onClick={() => {handleclick(button.filter)}} active={button.active} key={index} disabled={button.isDisabled}>{button.filter}</FilterButton>
                        })
                    }
                </div>
                <div className="flex flex-wrap items-center justify-start mt-4 md:justify-between">
                {
                    projects.map((project, index) => {
                        return <FarmingCard key={index} project={project} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}