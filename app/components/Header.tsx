import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAccount, useConnectors } from "@starknet-react/core";
import { useEffect } from "react";
import WalletButton from "./Buttons/ActionButton";


export default function Header({toggleMenu, menuOpen, starknetId}: any) {
    const  { address, status }  = useAccount();
    const { connect, available, refresh, disconnect } = useConnectors();


    
    function minifyAddressOrDomain(address?: string): string | undefined {
        if (!address) return;
    
        if (address.length > 24) {
          const firstPart =
            address.charAt(0) + address.charAt(1) + address.charAt(2);
          const secondPart =
            address.charAt(address.length - 3) +
            address.charAt(address.length - 2) +
            address.charAt(address.length - 1);
          return firstPart + "..." + secondPart;
        } else {
          return address;
        }
      }
    

    useEffect(() => {
        const interval = setInterval(refresh, 5000)
        return () => clearInterval(interval)
      }, [refresh]);


    return (
        <>
            <div className="py-4 px-6 flex items-center justify-center lg:py-4 lg:px-12 w-full">
                <div className="w-3/12 overflow-hidden; lg:hidden lg:w-0">
                    {!menuOpen && <Bars3Icon className="w-10 bg-green-blue text-black/50 p-2 rounded-full" onClick={toggleMenu} /> }
                    {menuOpen && <XMarkIcon className="w-10 bg-green-blue text-black/50 p-2 rounded-full" onClick={toggleMenu} /> }
                </div>
                <div className="w-6/12 text-center lg:hidden lg:w-0"><img className="w-8/12 mx-auto" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/> </div>
                <div className="w-3/12 lg:w-full flex justify-end items-center">
                    {status === 'disconnected' && available.map((wallet) => (
                        <div key={wallet.id()}>
                            <img className="w-8 ml-4 cursor-pointer lg:hidden" key={wallet.id() + "_mobile"} src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} onClick={() => connect(wallet)} />
                            <WalletButton key={wallet.id() + "_desktop"} className="bg-beaige items-center justify-center hidden lg:flex" onClick={() => connect(wallet)}>Connect with {wallet.name()} <img className="w-4 ml-2 mr-1" src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} /></WalletButton>
                        </div>
                    ))}

                    {status === 'connected' && 
                        <>
                            <span className="mr-12 font-trash hidden lg:block">{ starknetId !== '' ? starknetId : minifyAddressOrDomain(address)} </span>
                            <ArrowLeftOnRectangleIcon onClick={() => disconnect()} className="w-7 ml-auto cursor-pointer hover:text-green lg:hidden" />
                            <WalletButton className="bg-beaige hidden lg:block" onClick={() => disconnect()}>Disconnect</WalletButton>
                        </>
                    }
                </div>
            </div>
        </>
        
    )
}