import { useAccount, useConnectors } from "@starknet-react/core";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from "react";
import { WalletIcon } from "@heroicons/react/24/outline";

export function ConnectDialog({ isOpen, setIsOpen }: {isOpen: boolean, setIsOpen: any}) {
    const { available, connect } = useConnectors();

    const handleClick = (wallet: any) => {
        connect(wallet);
        setIsOpen(false);
    }

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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border border-neutral-700 bg-launchpad-header p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="uppercase font-trash text-lg text-center"
                        >
                            Connect your wallet
                        </Dialog.Title>
                        <div className="mt-6 flex items-center justify-center">
                            { available.map((wallet) => (
                                <div key={wallet.id() + "_modal"} className="p-6 m-3 text-center cursor-pointer rounded-2xl hover:bg-opacityLight-5" onClick={() => handleClick(wallet)}>
                                    <img className="w-8 mx-auto" src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} />
                                    <div className="uppercase font-inter mt-2">{wallet.name()}</div>
                                </div>
                            ))}
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
      </Transition>
    )
}

export default function ConnectButton({displayIcon = false}: {displayIcon?: boolean}) {
    const { connect, available } = useConnectors();
    const { status } = useAccount();
    let [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (status === "connected") { return; }


        if (available.length === 1) {
            connect(available[0]);
            return;
        }

        setIsOpen(true);
    }
    return (
        <>
            {!displayIcon && <button className="font-inter uppercase rounded-full px-4 py-2 text-sm text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 md:px-6 md:py-3" onClick = {handleClick}>Connect Wallet</button>}
            {displayIcon && 
                <>
                    <button className="hidden font-inter uppercase rounded-full px-4 py-2 text-sm text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 md:px-6 md:py-3 md:block" onClick = {handleClick}>Connect Wallet</button>
                    <WalletIcon className="w-10 border border-neutral-500 text-neutral-100 p-2 rounded-full md:hidden" onClick={handleClick} />
                </>
            }
            <ConnectDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
