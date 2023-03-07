import { Tab } from "@headlessui/react";
import Tabs from "~/components/Common/Tabs";
import type { AssetsManagementContext } from "./Dialog";
import Management from "./Management";

export default function FarmingContext({context}: {context: AssetsManagementContext}) {
    const tabs = ["Yield", "Offset"];

    return (
        <Tab.Group>
            <Tab.List className="flex rounded-lg bg-transparent border border-neutral-500  w-fit mx-auto">
                <Tabs tabs={tabs} />
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