import { useConnectors } from "@starknet-react/core";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useCallback } from "react";
import { connect } from '@argent/get-starknet';

export default function ConnectDialog({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: any }) {
    const { available } = useConnectors();

    const handleClick = useCallback((wallet: any) => {
        connect(wallet);
        setIsOpen(false);
    }, [connect, setIsOpen]);

    const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border border-neutral-700 bg-launchpad-header p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="uppercase font-trash text-lg text-center"
                                >
                                    Connect your wallet
                                </Dialog.Title>
                                <div className="mt-6 flex items-center justify-center">
                                    {available.map((wallet) => (
                                        <div key={wallet.id() + "_modal"} className="p-6 m-3 text-center cursor-pointer rounded-2xl hover:bg-opacityLight-5" onClick={() => handleClick(wallet)}>
                                            <img className="w-8 mx-auto" src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} />
                                            <div className="uppercase font-inter mt-2">{wallet.name()}</div>
                                        </div>
                                    ))}
                                    <div
                                        // @ts-ignore
                                        onClick={connect} className="p-6 m-3 text-center cursor-pointer rounded-2xl hover:bg-opacityLight-5"
                                    >
                                        Connect wallet
                                    </div>
                                </div>
                                {available.length === 0 &&
                                    <div className="mt-6 flex items-center justify-center">
                                        <a className="p-6 m-3 text-center cursor-pointer rounded-2xl hover:bg-opacityLight-5" href="https://www.argent.xyz/argent-x/" rel="noreferrer" target="_blank">
                                            <img className="w-8 mx-auto" src={`/assets/images/common/argentX.svg`} alt="Connect with ArgentX" />
                                            <div className="uppercase font-inter mt-2">Argent X</div>
                                        </a>
                                        <a className="p-6 m-3 text-center cursor-pointer rounded-2xl hover:bg-opacityLight-5" href="https://braavos.app/" rel="noreferrer" target="_blank">
                                            <img className="w-8 mx-auto" src={`/assets/images/common/braavos.svg`} alt="Connect with Braavos" />
                                            <div className="uppercase font-inter mt-2">Braavos</div>
                                        </a>
                                    </div>
                                }

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
