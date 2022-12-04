import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAccount, useConnectors, useStarknet } from "@starknet-react/core";
import { useEffect } from "react";
import { providers } from "~/utils/blockchain/providers";
import WalletButton from "./Buttons/ActionButton";

export default function Header({toggleMenu, menuOpen, addressToDisplay}: any) {
    const { status } = useAccount();
    const { connect, available, disconnect } = useConnectors();
    const { library } = useStarknet();

    /**
     * Hack to force testnet-2 use
     * TODO: Remove and add network management in front
     */
    useEffect(() => {
        if (library.provider) {
            library.provider.baseUrl = providers.testnet2.baseUrl;
            library.provider.feederGatewayUrl = providers.testnet2.feederGatewayUrl;
            library.provider.gatewayUrlseUrl = providers.testnet2.gatewayUrl;
            library.provider.chainId = providers.testnet2.chainId;

            return;
        }

        library.baseUrl = providers.testnet2.baseUrl;
        library.feederGatewayUrl = providers.testnet2.feederGatewayUrl;
        library.gatewayUrlseUrl = providers.testnet2.gatewayUrl;
        library.chainId = providers.testnet2.chainId;
        
    }, [library, status]);

    return (
        <>
            <div className="py-2 px-3 flex items-center justify-center bg-navigation rounded-full mt-4 w-11/12 mx-auto md:px-8 md:py-4 lg:bg-none lg:mt-0 lg:py-4 lg:px-12 lg:w-full">
                <div className="w-2/12 overflow-hidden; lg:hidden lg:w-0">
                    {!menuOpen && <Bars3Icon className="w-10 bg-green-blue text-black/50 p-2 rounded-full md:w-12" onClick={toggleMenu} /> }
                    {menuOpen && <XMarkIcon className="w-10 bg-green-blue text-black/50 p-2 rounded-full md:w-12" onClick={toggleMenu} /> }
                </div>
                <div className="w-7/12 text-left lg:hidden lg:w-0"><img className="w-8/12 md:w-6/12" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/> </div>
                <div className="w-3/12 lg:w-full flex justify-end items-center">
                    {status === 'disconnected' && available.map((wallet) => (
                        <div className="ml-2" key={wallet.id()}>
                            <img className="w-8 ml-4 cursor-pointer md:w-10 lg:hidden" key={wallet.id() + "_mobile"} src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} onClick={() => connect(wallet)} />
                            <WalletButton key={wallet.id() + "_desktop"} className="bg-beaige items-center justify-center hidden lg:flex" onClick={() => connect(wallet)}>Connect with {wallet.name()} <img className="w-4 ml-2 mr-1" src={`/assets/images/common/${wallet.id()}.svg`} alt={`Connect with ${wallet.name()}`} /></WalletButton>
                        </div>
                    ))}

                    {status === 'connected' && 
                        <>
                            <span className="mr-12 font-trash hidden lg:block">{addressToDisplay}</span>
                            <ArrowLeftOnRectangleIcon onClick={() => disconnect()} className="w-7 ml-auto cursor-pointer hover:text-green lg:hidden" />
                            <WalletButton className="bg-beaige hidden lg:block" onClick={() => disconnect()}>Disconnect</WalletButton>
                        </>
                    }
                </div>
            </div>
        </>
        
    )
}