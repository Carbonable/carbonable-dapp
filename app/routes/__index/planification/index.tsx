import { Tab } from "@headlessui/react";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { LoaderFunction} from "react-router";
import Mapping from "~/components/Planification/Allocations/Allocations";
import Summary from "~/components/Planification/Summary/Summary";
import allocation from "~/demo/allocations.json";
import globalkpi from "~/demo/globalKPI.json";
import summary from "~/demo/summary.json";
import projectsList from "~/demo/projects.json";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const globalKPI = globalkpi;
        const blocks = allocation;
        const summaryKPI = summary;
        const projects = projectsList;
        return json({globalKPI, blocks, summaryKPI, projects});
    } catch (e) {
        return json({});
    }
};

export default function Planification() {
    const loaderData = useLoaderData();
    const globalKPI = loaderData.globalKPI;
    const summaryKPI = loaderData.summaryKPI;
    const projects = loaderData.projects;
    const [blocks, setBlocks] = useState(loaderData.blocks);
    const addExAnteFetcher = useFetcher();
    const addExPostFetcher = useFetcher();
    const tabs = ["Summary", "Allocation"];

    // An effect for appending data to items state
    useEffect(() => {
        if (!addExAnteFetcher.data || addExAnteFetcher.state === "loading") {
            return;
        }
        // If we have new data - append it
        if (addExAnteFetcher.data) {
            const newBlocks = addExAnteFetcher.data.newBlocks;
            setBlocks(newBlocks);
        }
    }, [addExAnteFetcher.data, addExAnteFetcher.state]);

    // An effect for appending data to items state
    useEffect(() => {
        if (!addExPostFetcher.data || addExPostFetcher.state === "loading") {
            return;
        }
        // If we have new data - append it
        if (addExPostFetcher.data) {
            const newBlocks = addExPostFetcher.data.newBlocks;
            setBlocks(newBlocks);
        }
    }, [addExPostFetcher.data, addExPostFetcher.state]);

    return (
        <div className="mx-auto md:mt-12 lg:mt-6 max-w-7xl p-2 pb-16">
            <Tab.Group>
                <Tab.List className="flex rounded-lg bg-transparent px-4">
                    {tabs.map((tab, idx) => (
                        <Tab key={tab} className={({ selected }) =>
                            `font-inter py-2 mr-2 text-sm md:text-base md:px-4 outline-none text-neutral-200
                            ${selected
                            ? 'text-neutral-100 bg-opacityLight-5 cursor-pointer rounded-lg px-4'
                            : 'px-2'}`
                        }>
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-4 p-2">
                    <Tab.Panel key={`tab_panel_overview}`}>
                        <Summary summaryKPI={summaryKPI} />
                    </Tab.Panel>
                    <Tab.Panel key={`tab_panel_maaping}`}>
                        <Mapping globalKPI={globalKPI} blocks={blocks} projects={projects} addExAnteFetcher={addExAnteFetcher} addExPostFetcher={addExPostFetcher} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}