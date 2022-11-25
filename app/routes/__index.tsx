import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";
import { useEffect, useState } from "react";
import NavMenuMobile from "~/components/NavMenu/NavMenuMobile";
import NavMenu from "~/components/NavMenu/NavMenu";
import { getStarknetId } from "~/utils/starknetId";
import { useAccount } from "@starknet-react/core";

function minifyAddressOrStarknetId(address: string | undefined, starknetId: string |undefined) {
    const input = starknetId !== undefined ? starknetId : address;
    if (input === undefined) { return ""; }

    return input.length > 24 ? `${input.substring(0, 5)} ... ${input.substring(input.length - 5, input.length)}` : input;
}


export default function Index() {

    const [menuOpen, setMenuOpen] = useState(false);
    const { status, address, account } = useAccount();
    const [addressToDisplay, setAddressToDisplay] = useState("");

    async function getStarnetId() {
        const id = await getStarknetId(address);
        setAddressToDisplay(minifyAddressOrStarknetId(address, id));
    }

    useEffect(() => {
        getStarnetId();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, address, status]);

    function handleStateChange(state: any) {
        setMenuOpen(state.isOpen);
      }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function closeMenu () {
        setMenuOpen(false);
    }

    return (
        <div className="mx-auto flex" id="outer-container">
            <div className="fixed z-50 top-0 left-0 lg:hidden">
                <NavMenuMobile handleStateChange={handleStateChange} closeMenu={closeMenu} menuOpen={menuOpen} canClose={true} addressToDisplay={addressToDisplay} />
            </div>
            <header className="min-h-[90px] md:min-h-[120px] md:pb-12 lg:min-h-[80px] lg:pb-4 fixed top-0 w-full z-10 bg-header"><Header toggleMenu={toggleMenu} menuOpen={menuOpen} addressToDisplay={addressToDisplay} /></header>
            <nav className='hidden lg:block lg:w-[360px] z-20'>
                <div className="sticky top-6 left-0">
                    <NavMenu />
                </div>
            </nav>
            <main className='w-full lg:w-[calc(100vw_-_360px)] mt-[80px] pb-16 px-2 pt-8 md:mt-[120px] md:px-8 lg:mt-[60px]' id="page-wrap">
                <Outlet />
            </main>
        </div>
    )
}