import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import ConnectDialog from "~/components/Connection/ConnectDialog";
import CheckoutDialog from "../Checkout/CheckoutDialog";
import { useProject } from "../ProjectWrapper";
import { GreenLinkButton } from "~/components/Buttons/LinkButton";

export default function SaleAction() {
    const { isConnected } = useAccount();
    const [openConnect, setOpenConnect] = useState(false);
    const [openCheckout, setOpenCheckout] = useState(false);
    const { quantity, mint, launchpad } = useProject();
    const [canBuy, setCanBuy] = useState(false);
    const minValue = parseFloat(mint.min_value_per_tx.displayable_value);
    const maxValue = parseFloat(mint.max_value_per_tx.displayable_value);

    useEffect(() => {
        setCanBuy(quantity !== null && 
                  quantity >= minValue &&
                  isConnected === true && 
                  launchpad.public_sale_open === true &&
                  launchpad.is_sold_out === false
        );
    }, [quantity, minValue, maxValue, isConnected, launchpad.public_sale_open, launchpad.is_sold_out]);

    if (isConnected === false) {
        return (
            <div className="w-full">
                <GreenButton onClick={() => setOpenConnect(true)} className="w-full">Connect Wallet</GreenButton>
                <ConnectDialog
                    isOpen={openConnect}
                    setIsOpen={setOpenConnect}
                />
            </div>
        )
    }

    if (launchpad.is_sold_out === true) {
        return (
            <div className="w-full flex items-center justify-center">
                <GreenLinkButton className="w-full text-center" href="/farming">Go to farming</GreenLinkButton>
            </div>
        )
    }

    return (
        <div className="w-full flex items-start md:justify-between gap-x-6 flex-wrap lg:flex-nowrap">
            <div className="lg:flex-grow w-full lg:w-fit">
                <SharesInput canBuy={canBuy} />
            </div>
            <div className="w-full lg:w-fit mt-2 lg:mt-0">
                <GreenButton disabled={canBuy === false} onClick={() => setOpenCheckout(true)} className="whitespace-nowrap w-full lg:w-fit">Buy now</GreenButton>
                <CheckoutDialog
                    isOpen={openCheckout}
                    setIsOpen={setOpenCheckout}
                />
            </div>
        </div>
    )
}

function SharesInput({ canBuy }: { canBuy: boolean }) {
    const { quantity, setQuantity, mint } = useProject();
    const minValue = parseFloat(mint.min_value_per_tx.displayable_value);

    const handleQuantityChange = (e: any) => {
        if (e.target.value === "") {
            setQuantity(null);
            return;
        }

        if (isNaN(e.target.value) || e.target.value < 0) {
            setQuantity(1);
            return;
        }

        if (e.target.value < minValue) {
            setQuantity(minValue);
            return;
        }
        setQuantity(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value));
    }

    return (
        <>
            <div className="w-full flex items-center border border-opacityLight-10 rounded-lg">
                <div className="flex-grow border-r border-opacityLight-10 flex items-center justify-between px-4 py-2">
                    <input type="number"
                           className="bg-transparent flex-grow outline-none w-1/2" 
                           value={quantity === null  ? '' : quantity} 
                           onChange={handleQuantityChange}
                    />
                    <div className="text-neutral-200 font-extralight text-sm ml-2 text-right">&cong; {quantity} USDC</div>
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