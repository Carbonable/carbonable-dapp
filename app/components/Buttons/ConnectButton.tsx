import { useAccount, useConnectors } from "@starknet-react/core";
import { useState } from "react";
import { WalletIcon } from "@heroicons/react/24/outline";
import ConnectDialog from "../Connection/ConnectDialog";



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
