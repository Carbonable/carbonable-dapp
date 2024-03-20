import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect } from "react";
import { type Connector, useAccount, useConnect } from "@starknet-react/core";

export default function ConnectDialog({ isOpen, setIsOpen }: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) {
    const { connectors, connectAsync } = useConnect();
    const { isConnected } = useAccount();

    const handleClick = (connector: Connector) => {
        connectAsync({ connector });
        setIsOpen(false);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (isConnected) {
            setIsOpen(false);
        }
    }, [isConnected]);
    
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
                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl border border-neutral-700 bg-launchpad-header p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="uppercase text-xl text-center"
                            >
                                Connect your wallet
                            </Dialog.Title>
                            <div className="mt-6">
                                { connectors.map((connector) => (
                                    <div key={connector.id + "_modal"}>
                                        {connector.available() && <div className="p-4 my-2 flex items-center justify-start cursor-pointer rounded-2xl bg-opacityLight-5 hover:bg-opacityLight-10 w-full" onClick={() => handleClick(connector)}>
                                            {!connector.icon.dark?.startsWith("<svg") && <img className="w-8 h-8 mr-3" src={connector.icon.dark} alt={`Connect with ${connector.id}`} /> }
                                            {connector.icon.dark?.startsWith("<svg") && <div className='w-8 h-8 mr-3' dangerouslySetInnerHTML={{__html: connector.icon.dark }} />}
                                            <div className="uppercase font-inter">{connector.id === 'argentWebWallet' ? 'Argent Web Wallet' : connector.id}</div>
                                        </div>}
                                        {!connector.available() && <a className="p-4 my-2 flex items-center justify-start cursor-pointer rounded-2xl bg-opacityLight-5 hover:bg-opacityLight-10 w-full opacity-40 hover:opacity-100" href={connector.id === 'argentX' ? 'https://www.argent.xyz/argent-x/' : 'https://braavos.app/'} rel="noreferrer" target="_blank">
                                            <img className="w-5 h-5 mr-3" src={connector.id === 'argentWebWallet' ? '/assets/images/common/argentX.svg' : `/assets/images/common/${connector.id}.svg`} alt={`Connect with ${connector.id}`} />
                                            <div className="uppercase font-inter">{connector.id === 'argentWebWallet' ? 'Argent Web Wallet' : connector.id} <span className='text-neutral-300 text-sm ml-1'>(download)</span></div>
                                        </a>}
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