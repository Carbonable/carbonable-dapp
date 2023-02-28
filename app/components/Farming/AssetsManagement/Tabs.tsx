import { Tab } from "@headlessui/react";
import type { AssetsManagementContext } from "./Dialog";
import Management from "./Management";

export default function Tabs({context}: {context: AssetsManagementContext}) {
    const tabs = ["Yield", "Offset"];

    return (
        <Tab.Group>
            <Tab.List className="flex rounded-lg bg-transparent border border-neutral-500  w-fit mx-auto">
                {tabs.map((tab, idx) => (
                    <Tab key={tab} className={({ selected }) =>
                        `py-2 px-4 text-sm 
                        ${idx === 0 ? 'rounded-l-lg' : ''} 
                        ${idx === tabs.length - 1 ? 'rounded-r-lg' : ''} 
                        ${idx !== tabs.length - 1 ? 'border-r border-neutral-500' : ''} 
                        ${selected
                        ? 'bg-neutral-800 text-neutral-100'
                        : 'bg-transparent text-neutral-400'}`
                    }>
                        {tab}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                {tabs.map((tab, idx) => (
                    <Tab.Panel key={`tab_panel_${idx}`}>
                        <div className="mt-8 w-full">
                            <Management context={context} tab={tab} />
                        </div>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}