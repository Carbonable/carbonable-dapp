import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";
import { useEffect, useState } from "react";
import NavMenuMobile from "~/components/NavMenu/NavMenuMobile";
import NavMenu from "~/components/NavMenu/NavMenu";
import { getStarknetId } from "~/utils/starknetId";
import { useAccount } from "@starknet-react/core";

function minifyAddressOrStarknetId(address: string | undefined, starknetId: string) {
    const input = starknetId !== "" ? starknetId : address || "";
    return input.length > 24 ? `${input.substring(0, 4)}...${input.substring(input.length - 5, input.length - 1)}` : input;
}


export default function Index() {

    const [menuOpen, setMenuOpen] = useState(false);
    const { status, address } = useAccount();
    const [addressToDisplay, setAddressToDisplay] = useState("");

    async function getStarnetId() {
        const id = await getStarknetId(address);
        setAddressToDisplay(minifyAddressOrStarknetId(address, id));
    }

    useEffect(() => {
        getStarnetId();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

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
            <header className="min-h-[72px] fixed top-0 w-full"><Header toggleMenu={toggleMenu} menuOpen={menuOpen} addressToDisplay={addressToDisplay} /></header>
            <nav className='hidden lg:block lg:w-[400px]'>
                <div className="sticky top-0 left-0">
                    <NavMenu />
                </div>
            </nav>
            <main className='w-full lg:w-[calc(100vw_-_400px)] mt-[72px]' id="page-wrap">
                <Outlet />
            </main>
        </div>
    )
}