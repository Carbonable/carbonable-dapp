import { Tab } from "@headlessui/react";

export default function Tabs() {
    const tabs = ["Yield", "Offset"];
    return (
        <Tab.Group>
            <Tab.List className="flex rounded-lg bg-transparent border border-neutral-500">
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
                <Tab.Panel>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    )
}