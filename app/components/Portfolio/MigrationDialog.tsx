import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";


export default function MigrationDialog({isOpen, setIsOpen}: 
    {isOpen: boolean, setIsOpen: (b: boolean) => void}) {
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
                        <Dialog.Panel className="w-full max-w-xl xl:max-w-2xl transform overflow-hidden rounded-2xl border border-neutral-600 bg-neutral-800 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title as="h3" className="flex items-start justify-between px-8 py-4">
                            <div className="font-inter text-left">
                                <div className="uppercase text-neutral-100 font-bold text-2xl">
                                    Kudos!
                                </div>
                                <div className="font-light text-neutral-300">
                                    Just two quick details
                                </div>
                            </div>
                            <div className="text-right">
                                <XMarkIcon className="w-5 cursor-pointer hover:text-neutral-100" onClick={() => setIsOpen(false)} />
                            </div>
                        </Dialog.Title>
                        <div className="px-8 py-8">
                            <div className="text-left w-full mx-auto text-lg">
                                <p>
                                   <span className="text-2xl mr-2">1️⃣</span> Make sure to <a className="text-greenish-500 underline hover:no-underline" href="https://forms.gle/K6QLfdhzsGSirGJk8" target="_blank" rel="noreferrer">fill out the  form</a> to claim your retroactive rewards
                                </p>
                                <p className="mt-4">
                                    <span className="text-2xl mr-2">2️⃣</span> Spread the word 💚 on Twitter! 
                                    <a href="https://twitter.com/intent/tweet?text=Just%20migrated%20my%20%23CarbonableNFTs%20to%20%23CarbonableSFTs%20in%20one%20click%20%F0%9F%9A%80%0AEffortless%20switch!%20%0A%0A%F0%9F%8E%81%20Retro%20rewards%20are%20calling!%20%0A%E2%9C%85%20Counting%20down%20the%20moments%20to%20the%20official%20%40carbonable_io%20farming%20launch!%20%F0%9F%8C%B1%E2%9C%A8%20%0A%0ADon%27t%20miss%20out!%20Check%20out%20the%20original%20thread%20%F0%9F%A7%B5&url=https%3A%2F%2Fcarbonable.github.io%2Fsocials%2Fmigration%2F&in_reply_to=1722603500297994550" 
                                        className="rounded-lg bg-greenish-500 px-4 py-2 hover:brightness-110 ml-9 flex items-center w-fit mt-4"
                                    >
                                        Share on <img src="/assets/images/common/logo-x.svg" alt="X logo" className="inline-block w-5 ml-2" />
                                    </a>
                                </p>
                            </div>
                            <div className="mt-8 text-neutral-200 text-sm">
                                Thanks a lot and thrilled to have you on this journey to restore nature!
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