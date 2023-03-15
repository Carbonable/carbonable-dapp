import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef, useState } from "react";
import { IPFS_GATEWAY } from "~/utils/links";
import { ipfsUrl } from "~/utils/utils";
import { Tab } from "@headlessui/react";
import Tabs from "../Common/Tabs";
import AllocationGraph from "./Graph";
import TransactionHistory from "./TransactionHistory";

export default function AllocationDetailDialog({isOpen, setIsOpen, block}: {isOpen: boolean, setIsOpen: any, block: any}) {
    const graphTabs = ["Year", "3Y", "5Y"];
    const [graphYears, setGraphYears] = useState(1);
    const allocationsList = block.allocations.concat(block.carbon_credit_purchased);
    const totalConsumption = allocationsList.map((totalAllocation: any) => totalAllocation.carbon_credit_allocated).reduce((acc: any, amount: any) => acc + amount);

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleGraphChange = (index: number) => {
        switch (index) {
            case 0:
                setGraphYears(1);
                break;
            case 1:
                setGraphYears(3);
                break;
            case 2:
                setGraphYears(5);
                break;
        }
    }

    let initialFocusElement = useRef(null)

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose} initialFocus={initialFocusElement}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-light-80" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-end text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 w-0"
                        enterTo="opacity-100 w-full"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 w-full"
                        leaveTo="opacity-0 w-0"
                    >
                        <Dialog.Panel className="w-full md:max-w-xl transform overflow-y-scroll bg-neutral-700 text-left shadow-xl transition-all p-8 min-h-screen">
                            <Dialog.Title
                                as="h3"
                                className="font-inter text-left text-neutral-300 flex items-center justify-between"
                                ref={initialFocusElement}
                            >   
                                <div className="flex flex-col">
                                    <div className="flex justify-start items-end flex-wrap">
                                        <span className="text-2xl" role="img" aria-label="block icon">{block.icon}</span>
                                        <div className="ml-2">
                                            <div className="text-neutral-50 text-2xl font-semibold">{block.name}</div>
                                        </div>
                                    </div>
                                        <div className="w-full text-neutral-100 text-sm mt-1">{block.description}</div>
                                    </div>
                                <div className="text-right"><XMarkIcon className="w-6 cursor-pointer hover:text-neutral-100" onClick={() => setIsOpen(false)} /> </div>
                            </Dialog.Title>
                            <div className="relative mt-12">
                                <div>
                                    <div className="text-neutral-300 text-lg font-normal font-inter">About</div>
                                    <div className="mt-1 text-neutral-100">{block.about}</div>
                                </div>
                                <div className="mt-8 pr-6 pb-12 border-b border-neutral-600">
                                    <BlockKPI title="Emission" value={`${parseFloat(block.emission).toLocaleString('en')} Tons / year`} />
                                    <BlockKPI title="Debt" value={`${parseFloat(block.debt).toLocaleString('en')} Tons`} />
                                    <BlockKPI title="Total consumption (YtD)" value={`${parseFloat(block.total_consumption).toLocaleString('en')} Tons`} />
                                    <BlockKPI title="Current compensation" value={`${Math.round((block.total_consumption / block.yearly_emissions) * 100)} %`} />
                                </div>
                                <div className="mt-12">
                                    <div className="flex justify-between items-center">
                                        <div className="text-neutral-300 text-lg font-normal font-inter mb-4 text-left">Projected decarbonation</div>
                                        <div className="text-right">
                                            <Tab.Group
                                                onChange={(index) => {
                                                    handleGraphChange(index);
                                                }}
                                            >
                                                <Tab.List className="flex rounded-lg bg-transparent border border-neutral-500  w-fit mx-auto">
                                                    <Tabs tabs={graphTabs} />
                                                </Tab.List>
                                            </Tab.Group>
                                        </div>
                                    </div>
                                    <div>
                                        <AllocationGraph yearStep={graphYears} data={block.graph_data} isFullScreen={false} />
                                    </div>
                                </div>
                                <div className="mt-12">
                                    <div className="text-neutral-300 text-lg font-normal font-inter mb-4">Project Funding Allocation</div>
                                    {block.allocations.map((allocation: any, idx: number) => {
                                        return (
                                            <AllocationProject key={`allocation_project_${idx}`} project={allocation} totalConsumption={totalConsumption} />
                                        )
                                    })}
                                </div>
                                <div className="mt-12">
                                    <div className="text-neutral-300 text-lg font-normal font-inter mb-4">Carbon Credit Purchase Allocation</div>
                                    {block.carbon_credit_purchased.map((purchase: any, idx: number) => {
                                        return (
                                            <AllocationProject key={`purchase_cc_${idx}`} project={purchase} totalConsumption={totalConsumption} />
                                        )
                                    })}
                                </div>
                                <div className="mt-12">
                                    <div className="text-neutral-300 text-lg font-normal font-inter mb-4">Transaction History</div>
                                    <TransactionHistory transactions={block.transactions} />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
      </Transition>
    )
}

function BlockKPI({title, value}: {title: string, value: string}) {
    return (
        <div className="flex items-start justify-between w-full mt-4">
            <div className="text-neutral-300 font-inter text-left w-1/2">{title}</div>
            <div className="text-neutral-100 w-1/2 text-right">{value}</div>
        </div>
    )
}

function AllocationProject({project, totalConsumption}: {project: any, totalConsumption: number}) {
    const percentage = Math.round((project.carbon_credit_allocated / totalConsumption) * 100);
    return (
        <div className="flex items-start justify-start w-full border-t border-neutral-600 py-4">
            <div className="w-fit">
                <img src={IPFS_GATEWAY + ipfsUrl(project.image)} alt={`${project.project_name}`} className="w-[60px]" />
            </div>
            <div className="w-fit font-inter ml-4">
                <div className="font-semibold text-lg" style={{color: `${project.color}`}}>{project.project_name}</div>
                <div className="font-light flex justify-start items-center mt-1">
                    <div className="text-neutral-100">{project.carbon_credit_allocated} CC</div>
                    <div className="px-3 text-neutral-300">&bull;</div>
                    <div className="text-neutral-200 italic">{percentage}% of the offset block</div>
                </div>
            </div>
        </div>
    )
}