import { useContext } from "react";
import { WalletContext } from "~/hooks/wallet-context";

export default function Testnet() {
    const { connection } = useContext(WalletContext);
    const address = connection?.account.address;

    return (
        <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12">
            <div className="uppercase font-trash text-bold text-lg text-left 2xl:text-xl">My Assets</div>
            <div>Our portfolio is currently not available on the Testnet.</div>
            <div>Check your assets on:</div>
            <div className="flex items-center mt-4">
                <a href={`https://mintsquare.io/starknet-testnet/${address}`} target="_blank" rel="noreferrer" className="flex items-center text-white border border-neutral-500 tracking-wide hover:bg-opacityLight-5 rounded-full w-fit px-4 py-2 cursor-pointer">
                    <img src="/assets/images/icons/mintsquare-icon.svg" className="w-6" alt="Mintsquare icon" />
                    <div className="ml-2 font-montserrat font-bold">Mint Square</div>
                </a>
                <a href={`https://testnet.aspect.co//${address}`} target="_blank" rel="noreferrer" className="flex items-center text-neutral-100 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 rounded-full w-fit px-6 py-2 cursor-pointer ml-4">
                    <img src="/assets/images/icons/aspect-logo.png" className="w-20" alt="Aspect logo" />
                </a>
            </div>

        </div>
    )
}
