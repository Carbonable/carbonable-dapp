import { ArrowLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "@remix-run/react";
import { useAccount, useConnectors, useStarknet } from "@starknet-react/core";
import { useEffect } from "react";
import { providers } from "~/utils/blockchain/providers";

import SecondaryButton from "./Buttons/ActionButton";
import ConnectButton from "./Buttons/ConnectButton";
import Select from "./Filters/Select";


export default function Header({toggleMenu, menuOpen, addressToDisplay, networksList, selectedNetwork}: any) {
    const { status } = useAccount();
    const { disconnect } = useConnectors();
    const { library } = useStarknet();
    const navigate = useNavigate();
    const resolvedPath = useLocation();

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
                <div className="w-7/12 text-left lg:hidden lg:w-0">
                    <img className="w-8/12 md:w-5/12 md:py-2" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/>
                </div>
                <div className="w-3/12 lg:w-full flex justify-end items-center">
                    { resolvedPath.pathname.split( '/' ).length > 2 && <div className="items-center hidden lg:block"><span className="flex cursor-pointer text-neutral-200 hover:text-neutral-400" onClick={() => navigate(`/${resolvedPath.pathname.split( '/' )[1]}`)}><ArrowLeftIcon className="w-4 mr-2" />Back</span></div>}
                    <div className="hidden lg:flex justify-end header-width">
                        <div className="mr-6 w-fit">{networksList?.length > 0 && <Select values={networksList} selectedValue={selectedNetwork} action="/network/preference" />}</div>
                    </div>
                    {status === 'disconnected' && <ConnectButton displayIcon={true} /> }

                    {status === 'connected' && 
                        <>
                            <span className="mr-12 font-trash hidden lg:block">{addressToDisplay}</span>
                            <SecondaryButton onClick={() => disconnect()}>Disconnect</SecondaryButton>
                        </>
                    }
                </div>
            </div>
        </>
    )
}