import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import type { ValueProps } from "~/types/select";
import { TrackingIndicator } from "./Tracking";
import SecondaryButton from "~/components/Buttons/ActionButton";

export default function TrackingModal({isOpen, setIsOpen, indicator}: 
    {isOpen: boolean, setIsOpen: (b: boolean) => void, indicator: ValueProps | undefined}) {
    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md xl:max-w-xl transform overflow-hidden rounded-2xl border border-neutral-500 bg-neutral-700 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="uppercase font-inter text-left text-neutral-300 font-bold text-sm flex items-center justify-between border-b border-neutral-500 px-6 py-4"
                        >
                            <div>Project Tracking</div>
                            <div className="text-right"><XMarkIcon className="w-4 cursor-pointer hover:text-neutral-100" onClick={() => setIsOpen(false)} /> </div>
                        </Dialog.Title>
                        <div className="px-6">
                            <div className="text-left w-full mx-auto mt-6 text-neutral-200 text-sm">
                                {indicator?.id === TrackingIndicator.NDVI && <LearnMore indicator={indicator} /> }
                                {indicator?.id === TrackingIndicator.RGB && <LearnMore indicator={indicator} />}
                            </div>
                        </div>
                        <div className="text-right mt-4 p-6">
                            <SecondaryButton onClick={() => setIsOpen(false)}>I understand</SecondaryButton>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
      </Transition>
    )
}

function LearnMore({indicator}: {indicator: ValueProps | undefined}) {
    return (
        <div>
            {indicator?.id === TrackingIndicator.NDVI && <NDIVText /> }
            {indicator?.id === TrackingIndicator.RGB && <RGBText />}
        </div>
    )
}
        


function RGBText() {
    return (
        <>
            The Red, Green, and Blue (RGB) indicator in the context of our digital Monitoring, Reporting, and Verification (dMRV) tool is a powerful and intuitive feature. Drawing on the primary color channels of satellite imagery, it offers users an immediate and realistic view of a landscape, much like a high-definition photo taken from space.
            <br/><br/>
            In the context of carbon removal and nature-based solutions, the RGB indicator becomes particularly useful. By capturing and rendering the landscape in these three primary colors, it enables you to visually track changes over time. This can provide insights into the health and growth of vegetation, potential shifts in land use, and progress of carbon sequestration initiatives. Essentially, it gives you the ability to observe the "pulse" of the landscape, and in doing so, better understand the impact and performance of carbon removal projects.
        </>
    )
}

function NDIVText() {
    return (
        <>
            The Normalized Difference Vegetation Index (NDVI) provides a quantifiable measure of vegetation health and density based on how plants reflect and absorb light across various wavelengths.
            <br/><br/>
            In the context of carbon removal, NDVI is incredibly powerful. Plants absorb visible light (especially in the red portion of the spectrum) for photosynthesis, and reflect near-infrared light. Healthy vegetation absorbs more visible light and reflects more near-infrared light.
            The NDVI metric calculates this difference, resulting in a score between -1 and 1, with higher values indicating more robust, healthy vegetation.
            <br/><br/>
            So, with NDVI in our dMRV arsenal, we are able to provide users with a clear, numeric gauge of the health of vegetation in our carbon removal projects. This makes tracking the progress and effectiveness of these projects more accurate and efficient. From observing seasonal growth cycles to detecting changes in plant health due to stressors or disease, NDVI provides a comprehensive understanding of the ecosystem dynamics at play in carbon sequestration initiatives.
            
        </>
    )
}