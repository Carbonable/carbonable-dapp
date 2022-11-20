import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";
import { useEffect, useState } from "react";
import NavMenuMobile from "~/components/NavMenu/NavMenuMobile";
import NavMenu from "~/components/NavMenu/NavMenu";
import { fetchStarnetId } from "~/utils/starknetId";
import { useAccount } from "@starknet-react/core";


export default function Index() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [starknetId, setStarknetId] = useState("");
    const { status, address } = useAccount();

    async function getStarnetId() {
        const starknetId = await fetchStarnetId(address);
        setStarknetId(starknetId);
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
                <NavMenuMobile handleStateChange={handleStateChange} closeMenu={closeMenu} menuOpen={menuOpen} canClose={true} starknetId={starknetId} />
            </div>
            <header className="min-h-[72px] fixed top-0 w-full"><Header toggleMenu={toggleMenu} menuOpen={menuOpen} starknetId={starknetId} /></header>
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