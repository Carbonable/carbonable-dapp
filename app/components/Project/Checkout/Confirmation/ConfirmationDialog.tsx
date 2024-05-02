import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from "react";
import { GreenLinkButton } from '~/components/Buttons/LinkButton';

interface CheckoutDialogProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    setParentIsOpen: (isOpen: boolean) => void,
    projectData: {
        name: string,
        quantity: number,
        amount: number
    }
}

export default function ConfimationDialog({ isOpen, setIsOpen, setParentIsOpen, projectData }: CheckoutDialogProps) {
    const handleClose = () => {
        setParentIsOpen(false);
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
                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg border border-neutral-500 bg-neutral-700 p-8 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg text-neutral-100 mb-4 flex justify-between items-center flex-nowrap"
                            >
                                <div className="flex-grow text-center uppercase">Congratulations</div>
                                <div className="text-right">
                                    <XMarkIcon className="w-4 cursor-pointer text-right hover:text-neutral-100" onClick={() => setIsOpen(false)} />
                                </div>
                            </Dialog.Title>
                            <div className='mt-4 text-center'>
                                <div>
                                    Your {projectData.quantity} shares of {projectData.name} are now availbale in your portfolio. 
                                </div>
                                <div className='w-full mt-6'>
                                    <GreenLinkButton
                                        href='/portfolio'
                                    >
                                        Go to portfolio
                                    </GreenLinkButton>
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
