import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from "react";
import ImageAndQuantity from './ImageAndQuantity';
import CheckoutDetails from './CheckoutDetails';
import PaymentMethod from './PaymentMethod';
import { PaymentMethodValues } from '~/utils/constant';

export default function CheckoutDialog({ isOpen, setIsOpen }: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodValues>(PaymentMethodValues.CRYPTO);
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
                        <Dialog.Panel className="w-full max-w-2xl min-h-[684px] transform overflow-hidden rounded-lg border border-neutral-500 bg-neutral-700 p-4 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg text-neutral-100 mb-4 flex justify-between items-center flex-nowrap"
                            >
                                <div className="flex-grow text-center uppercase">checkout</div>
                                <div className="text-right">
                                    <XMarkIcon className="w-4 cursor-pointer text-right hover:text-neutral-100" onClick={() => setIsOpen(false)} />
                                </div>
                            </Dialog.Title>
                            <div className="grid grid-cols-1 md:grid-cols-7 items-start my-8 md:my-12">
                                <div className='w-full px-4 md:col-span-3'>
                                    <div>
                                        <ImageAndQuantity />
                                    </div>
                                    <div className='mt-4'>
                                        <PaymentMethod
                                            paymentMethod={paymentMethod}
                                            setPaymentMethod={setPaymentMethod}
                                        />
                                    </div>
                                </div>
                                <div className='w-full px-2 md:col-span-4 mt-8 md:mt-0'>
                                    <CheckoutDetails 
                                        setIsOpen={setIsOpen}
                                        paymentMethod={paymentMethod}
                                    />
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
