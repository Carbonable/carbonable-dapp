import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import ConnectDialog from "~/components/Connection/ConnectDialog";
import CheckoutDialog from "../Checkout/CheckoutDialog";

export default function SaleAction() {
    const { isConnected } = useAccount();
    const [openConnect, setOpenConnect] = useState(false);
    const [openCheckout, setOpenCheckout] = useState(false);

    if (isConnected === false) {
        return (
            <div className="w-full flex items-center">
                <GreenButton onClick={() => setOpenConnect(true)} className="w-full">Connect Wallet</GreenButton>
                <ConnectDialog
                    isOpen={openConnect}
                    setIsOpen={setOpenConnect}
                />
            </div>
        )
    }

    return (
        <div className="w-full flex items-start md:justify-between gap-x-6 flex-wrap lg:flex-nowrap">
            <div className="lg:flex-grow w-full lg:w-fit">
                <SharesInput />
            </div>
            <div className="w-full lg:w-fit mt-2 lg:mt-0">
                <GreenButton onClick={() => setOpenCheckout(true)} className="whitespace-nowrap w-full lg:w-fit">Buy now</GreenButton>
                <CheckoutDialog
                    isOpen={openCheckout}
                    setIsOpen={setOpenCheckout}
                />
            </div>
        </div>
    )
}

function SharesInput() {
    return (
        <>
            <div className="w-full flex items-center border border-opacityLight-10 rounded-lg">
                <div className="flex-grow border-r border-opacityLight-10 flex items-center justify-between px-4 py-2">
                    <input type="number" className="bg-transparent flex-grow outline-none w-1/2" />
                    <div className="text-neutral-200 font-extralight text-sm ml-2 text-right">&cong; 1000 USDC</div>
                </div>
                <div className="px-4 py-2 bg-opacityLight-10 font-extralight uppercase text-right rounded-r-lg">
                    Shares
                </div>
            </div>
            <div className="uppercase text-xs flex items-center ml-1 mt-2 text-neutral-200">
                Add 400$ to unlock x5 boost
                <a href="https://carbonable.medium.com" target="_blank" rel="noreferrer">
                    <InformationCircleIcon className="w-4 ml-2 hover:text-neutral-100" />
                </a>
            </div>
        </>
        
    )
}