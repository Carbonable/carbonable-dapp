import { useContext } from "react";
import { WalletIcon } from "@heroicons/react/24/outline";
import { WalletContext } from "~/hooks/wallet-context";

export default function ConnectButton({ displayIcon = false }: { displayIcon?: boolean }) {
    let { connect } = useContext(WalletContext);

    return (
        <>
            {!displayIcon && <button className="font-inter uppercase rounded-full px-4 py-2 text-sm text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 md:px-6 md:py-3" onClick={connect}>Connect Wallet</button>}
            {displayIcon &&
                <>
                    <button className="hidden font-inter uppercase rounded-full px-4 py-2 text-sm text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 md:px-6 md:py-3 md:block" onClick={connect}>Connect Wallet</button>
                    <WalletIcon className="w-10 border border-neutral-500 text-neutral-100 p-2 rounded-full md:hidden" onClick={connect} />
                </>
            }
        </>
    )
}


