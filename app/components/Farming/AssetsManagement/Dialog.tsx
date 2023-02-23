import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Tabs from "./Tabs";

export const enum AssetsManagementContext {
    DEPOSIT = "Deposit",
    WITHDRAW = "Withdraw",
    CLAIM = "Claim",
}


export default function AssetsManagementDialog({isOpen, setIsOpen, context}: {isOpen: boolean, setIsOpen: any, context: AssetsManagementContext}) {
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border border-neutral-500 bg-neutral-700 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="uppercase font-inter text-left text-neutral-300 font-bold text-sm flex items-center justify-between border-b border-neutral-500 px-6 py-4"
                        >
                            <div>{context} assets</div>
                            <div className="text-right"><XMarkIcon className="w-4 cursor-pointer hover:text-neutral-100" onClick={() => setIsOpen(false)} /> </div>
                        </Dialog.Title>
                        <div className="px-6">
                            <div className="text-center w-fit mx-auto mt-8">
                                <Tabs />
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