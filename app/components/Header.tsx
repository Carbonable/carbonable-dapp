import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAccount, useConnectors, useStarknet } from "@starknet-react/core";
import { useEffect } from "react";
import { providers } from "~/utils/blockchain/providers";

import WalletButton from "./Buttons/ActionButton";
import Select from "./Select/Select";


export default function Header({toggleMenu, menuOpen, addressToDisplay, networksList, selectedNetwork}: any) {
    const { status } = useAccount();
    const { connect, available, disconnect } = useConnectors();
    const { library } = useStarknet();
    
    const asArray = Object.entries(providers);
    const filtered = asArray.filter(([key, value]) => key === selectedNetwork.id);

    // TODO: Remove as soon as possible
    useEffect(() => {
        if(library.provider) {
            library.provider.baseUrl = filtered[0][1].baseUrl;
            library.provider.feederGatewayUrl = filtered[0][1].feederGatewayUrl;
            library.provider.gatewayUrlseUrl = filtered[0][1].gatewayUrl;
            library.provider.chainId = filtered[0][1].chainId;
        } else {
            library.baseUrl = filtered[0][1].baseUrl;
            library.feederGatewayUrl = filtered[0][1].feederGatewayUrl;
            library.gatewayUrlseUrl = filtered[0][1].gatewayUrl;
            library.chainId = filtered[0][1].chainId;
        }
    }, [status]);
    return (
        <>
            <div className="flex items-center justify-center mx-auto w-11/12 lg:w-full lg:px-4">
                <div className="w-2/12 overflow-hidden; lg:hidden lg:w-0">
                    {!menuOpen && <Bars3Icon className="w-10 border border-neutral-500 text-neutral-200 p-2 rounded-full md:w-12" onClick={toggleMenu} /> }
                </div>
                <div className="w-7/12 text-left lg:hidden lg:w-0"><img className="w-8/12 md:w-5/12 md:py-2" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/> </div>
                <div className="w-3/12 lg:w-full flex justify-end items-center">
                    <div className="hidden lg:block mr-6">{networksList?.length > 0 && <Select values={networksList} selectedValue={selectedNetwork} action="/network/preference" />}</div>
                    {status === 'disconnected' && available.map((wallet) => (
                        <div className="lg:ml-2" key={wallet.id()}>
                            <img className="w-8 ml-4 cursor-pointer lg:hidden" key={wallet.id() + "_mobile"} src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} onClick={() => connect(wallet)} />
                            <WalletButton key={wallet.id() + "_desktop"} className="bg-beaige items-center justify-center hidden lg:flex" onClick={() => connect(wallet)}>Connect with {wallet.name()} <img className="w-4 ml-2 mr-1" src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} /></WalletButton>
                        </div>
                    ))}

                    {status === 'connected' && 
                        <>
                            <span className="mr-12 font-trash hidden lg:block">{addressToDisplay}</span>
                            <WalletButton className="" onClick={() => disconnect()}>Disconnect</WalletButton>
                        </>
                    }
                </div>
            </div>
        </>
    )
}