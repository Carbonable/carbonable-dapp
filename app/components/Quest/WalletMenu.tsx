import WalletButton from "../Buttons/ActionButton";
import { useAccount, useConnectors } from "@starknet-react/core";
import { useEffect } from "react";

interface Props {
    action: Function
}

export default function WalletMenu({ action }: Props) {
    const { connect, available, refresh, disconnect } = useConnectors();
    const { status } = useAccount();

    useEffect(() => {
        if (status === 'connected') {
            if (action) action();
        }
    }, [status]);

    return status !== 'connected' ? <div className="fixed top-0 left-0 bg-black w-screen h-screen z-20 bg-opacity-80">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-2 bg-black w-full max-w-md px-5 py-4 rounded">
            <h2 className="text-lg font-semibold">Please {available.length > 0 ? "connect" : "install"} a wallet</h2>
            {available.length > 0 ? available.map((wallet) => (
                <div className="block mt-2" key={wallet.id()}>

                    <WalletButton key={wallet.id() + "_desktop"} className="bg-beaige items-center justify-center flex w-full" onClick={() => connect(wallet)}>Connect with {wallet.name()} <img className="w-4 ml-2 mr-1" src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} /></WalletButton>
                </div>
            )) : <div className="mt-3">
                    <a className="mt-2 block flex bg-beaige rounded-full px-6 py-2 justify-center font-bold hover:bg-gradient-to-r from-green to-lightblue" href="https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb" target="_blank" rel="noopener">
                        <p className="text-black/40 uppercase items-center justify-center hidden lg:flex text-sm">Install ArgentX on chrome<img className="w-4 ml-2" src={`/assets/images/common/argentx.svg`} alt={`Install ArgentX`} /> </p>
                    </a>
                    <a className="mt-2 block flex bg-beaige rounded-full px-6 py-2 justify-center font-bold hover:bg-gradient-to-r from-green to-lightblue" href="https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma" target="_blank" rel="noopener">
                        <p className="text-black/40 uppercase items-center justify-center hidden lg:flex text-sm">Install Braavos on chrome<img className="w-4 ml-2" src={`/assets/images/common/braavos.svg`} alt={`Install ArgentX`} /></p>
                    </a>
                </div>}
        </div>
    </div> : null
}

/*
<div className="fixed top-0 left-0 bg-black w-screen h-screen z-20 bg-opacity-80">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-2 bg-black w-96 text-red-500 px-5 py-4 rounded" role="alert">
            <strong className="font-bold">{strong}</strong>
            <span className="ml-1 block text-white/80">{text}</span>
            <button onClick={() => action()} className="font-inter text-white uppercase rounded-full mt-2 px-6 py-2 font-bold text-sm bg-red-500">Close</button>
        </div>
    </div>
    */