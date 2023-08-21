import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from "react";
import SecondaryButton from '~/components/Buttons/ActionButton';

export default function PaidDialog({ isPaidOpen, setIsPaidOpen }: {isPaidOpen: boolean, setIsPaidOpen: (isOpen: boolean) => void}) {


    const handleClose = () => {
        setIsPaidOpen(false);
    }
    
    return (
        <Transition appear show={isPaidOpen} as={Fragment}>
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
                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="uppercase font-inter text-lg text-center font-bold"
                            >
                                Purchased confirmed
                            </Dialog.Title>
                            <div className="mt-8 font-inter text-neutral-200 text-center text-sm">
                                Your transaction has been registered, congratulations!
                                <br />
                                <br />
                                Pssst... The sale's still open, so feel free to top up your investment before the curtain falls.
                            </div>
                            <div className="rounded-lg bg-neutral-700 px-6 py-4 border border-neutral-500 mt-6 text-center text-sm">
                                Please be aware that you will only be able to claim your SFT at the end of the sale 
                            </div>
                            <div className='mt-8 w-full'>
                                <SecondaryButton className='rounded-lg w-full outline-none' onClick={() => handleClose()}>I understand</SecondaryButton>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
      </Transition>
    )
}