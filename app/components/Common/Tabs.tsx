import { Tab } from "@headlessui/react";

export default function Tabs({tabs}: {tabs: string[]}) {
    return (
        <>
            {tabs.map((tab, idx) => (
                <Tab key={tab} className={({ selected }) =>
                    `py-2 px-4 text-sm 
                    ${idx === 0 ? 'rounded-l-lg' : ''} 
                    ${idx === tabs.length - 1 ? 'rounded-r-lg' : ''} 
                    ${idx !== tabs.length - 1 ? 'border-r border-neutral-500' : ''} 
                    ${selected
                    ? 'bg-neutral-500 text-neutral-100'
                    : 'bg-transparent text-neutral-400'}`
                }>
                    {tab}
                </Tab>
            ))}
        </>
    )
}