import { Outlet } from "@remix-run/react";
import Header from "~/components/Common/Header";
import { useState } from "react";
import NavMenuMobile from "~/components/NavMenu/NavMenuMobile";
import NavMenu from "~/components/NavMenu/NavMenu";
import { useNotifications } from "~/root";
import Notification from "~/components/Common/Notification";

export default function Index() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { notifs, setNotifs, mustReloadMigration, setMustReloadMigration, defautlNetwork, mustReloadFarmingPage, setMustReloadFarmingPage, lastIndexerBlock, displayPortfolioTootltip, setDisplayPortfolioTooltip } = useNotifications();

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
                <NavMenuMobile handleStateChange={handleStateChange} closeMenu={closeMenu} menuOpen={menuOpen} canClose={true} />
            </div>
            <header className="pb-2 fixed top-0 w-full bg-neutral-800 z-50">
                { defautlNetwork === 'testnet' && 
                    <div className="w-full lg:w-[calc(100%_-_222px)] text-center bg-greenish-700 text-neutral-50 py-1 mb-2 text-sm lg:ml-[222px]">
                        You are currently on the testnet. You can switch to the mainnet here: <a href="https://app.carbonable.io" className="underline">https://app.carbonable.io</a>
                    </div>
                }
                <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
            </header>
            <nav className='hidden lg:block z-50'>
                <div className="fixed top-0 left-0 lg:w-[222px]">
                    <NavMenu closeMenu={closeMenu} />
                </div>
            </nav>
            <main className='w-[calc(100%_-_222px)] ml-[222px] mt-[110px]' id="page-wrap">
                <Outlet context={{ notifs, setNotifs, mustReloadMigration, setMustReloadMigration, defautlNetwork, mustReloadFarmingPage, setMustReloadFarmingPage, lastIndexerBlock, displayPortfolioTootltip, setDisplayPortfolioTooltip }} />
                { notifs.map((notif) => (
                    <Notification key={notif.txHash} notif={notif} />
                ))}
            </main>
        </div>
    )
}
