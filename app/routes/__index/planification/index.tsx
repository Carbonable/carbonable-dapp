import { Tab } from "@headlessui/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction} from "react-router";
import Mapping from "~/components/Allocation/Mapping";
import Overview from "~/components/Allocation/Overview";
import allocation from "~/demo/allocations.json";
import globalkpi from "~/demo/globalKPI.json";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const globalKPI = globalkpi;
        const blocks = allocation;
        return json({globalKPI, blocks});
    } catch (e) {
        return json({});
    }
};

export default function Planification() {
    const { globalKPI, blocks } = useLoaderData();
    const tabs = ["Summary", "Allocation"];
    return (
        <div className="mx-auto md:mt-12 lg:mt-6 max-w-7xl p-2">
            <Tab.Group>
                <Tab.List className="flex rounded-lg bg-transparent">
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
                        <Overview />
                    </Tab.Panel>
                    <Tab.Panel key={`tab_panel_maaping}`}>
                        <Mapping globalKPI={globalKPI} blocks={blocks} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}