import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "@remix-run/react";
import { useAccount, useConnectors } from "@starknet-react/core";

import SecondaryButton from "./Buttons/ActionButton";
import ConnectButton from "./Buttons/ConnectButton";
import { useNotifications } from "~/root";
import Select from "./Filters/Select";
import { networksList } from "./NavMenu/networks";


export default function Header({toggleMenu, menuOpen, addressToDisplay}: any) {
    const { status, connector } = useAccount();
    const { disconnect } = useConnectors();
    const navigate = useNavigate();
    const resolvedPath = useLocation();
    const { defautlNetwork } = useNotifications();

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
                    { resolvedPath.pathname.split( '/' ).length > 2 && <div className="items-center hidden lg:block absolute left-[300px]"><span className="flex cursor-pointer text-neutral-200 hover:text-neutral-400" onClick={() => navigate(`/${resolvedPath.pathname.split( '/' )[1]}`)}><ArrowLeftIcon className="w-4 mr-2" />Back</span></div>}
                    <div className="hidden lg:flex justify-end">
                        <div className="mr-6 w-fit">{<Select values={networksList} selectedValue={defautlNetwork} action="/network/preference" />}</div>
                    </div>
                    {status === 'disconnected' && <ConnectButton displayIcon={true} /> }

                    {status === 'connected' && 
                        <>
                            <span className="mr-12 font-trash hidden lg:flex items-center justify-center">
                                {addressToDisplay}
                                {connector?.id() === 'argentWebWallet' && <a href={defautlNetwork.id === 'mainnet' ? "https://web.argent.xyz" : "https://web.hydrogen.argent47.net"} target="_blank" rel="noreferrer" className="ml-2"><ArrowTopRightOnSquareIcon className="w-4 h-4" /></a>}
                            </span>
                            <SecondaryButton onClick={() => disconnect()}>Disconnect</SecondaryButton>
                        </>
                    }
                </div>
            </div>
        </>
    )
}