import { XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "@remix-run/react";
import { slide as Menu } from 'react-burger-menu';
import { DISCORD_LINK, LINKEDIN_LINK, MEDIUM_LINK, TWITTER_LINK } from "~/utils/links";
import { LinkFooter } from "../Buttons/LinkButton";
import { links } from "./links";

export default function NavMenu({menuOpen, handleStateChange, closeMenu, canClose, addressToDisplay}: any) {

    return (
        <Menu 
            customBurgerIcon={ false }
            customCrossIcon={ canClose ? <XMarkIcon/> : false }
            pageWrapId={ "page-wrap" }
            outerContainerId={"outer-container"}
            isOpen={menuOpen}
            onStateChange={(state) => handleStateChange(state)}
            onClose={closeMenu}
            className="bg-black bg-navigation"
            >
            <div className="outline-none border-none py-12">
                <div className="w-full text-center"><img className="w-8/12 mx-auto" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/> </div>
                <div className="w-full text-center mt-4 px-4 overflow-x-hidden text-ellipsis font-trash">{addressToDisplay}</div>
                <div className="mt-8 w-full">
                    {links.map((link) => (      
                        <>
                            {link.isOpen && <NavLink key={link.label} className="uppercase font-inter text-base" to={link.href} onClick={closeMenu}>
                                {({ isActive }) => (
                                    <div  className="w-full flex justify-start items-center">
                                        <div className={isActive ? "w-[3px] h-[44px] bg-nav-selected" : "w-[3px] h-[44px] bg-transparent"}></div>
                                        <div className={isActive ? "py-2 pl-8 font-thin text-green" : "py-3 pl-8 font-bold text-beaige"}>{link.label}</div>
                                    </div>
                                )}
                            </NavLink> }
                            {link.isOpen === false && <NavLink key={link.label} className="uppercase font-inter text-base cursor-not-allowed" to={link.href} onClick={closeMenu}>
                                {({ isActive }) => (
                                    <div  className="w-full flex justify-start items-center">
                                        <div className="w-[3px] h-[44px] bg-transparent"></div>
                                        <div className="py-2 pl-8 text-beaige/30">{link.label}</div>
                                    </div>
                                )}
                            </NavLink> }
                        </>
                    ))}
                </div>
                <div className="absolute bottom-4 items-center justify-center w-full font-inter font-bold">
                    <div className="w-full flex flex-wrap items-center justify-center px-8">
                        <LinkFooter className="w-[50px] m-1" href={TWITTER_LINK}><img className="w-[30px] h-[30px]" src="/assets/images/icons/twitter-icon.svg" alt="twitter" /></LinkFooter>
                        <LinkFooter className="w-[50px] m-1" href={DISCORD_LINK}><img className="w-[30px] h-[30px]" src="/assets/images/icons/discord-icon.svg" alt="discord" /></LinkFooter>
                        <LinkFooter className="w-[50px] m-1" href={LINKEDIN_LINK}><img className="w-[30px] h-[30px]" src="/assets/images/icons/linkedin-icon.svg" alt="linkedin" /></LinkFooter>
                        <LinkFooter className="w-[50px] m-1" href={MEDIUM_LINK}><img className="w-[30px] h-[30px]" src="/assets/images/icons/medium-icon.svg" alt="medium" /></LinkFooter>
                    </div>
                    <div className="w-full flex items-center justify-center mt-4">Powered by <img className="w-[112px] ml-2" src="/assets/images/common/starknet.png" alt="Starknet logo" /></div>
                </div>
            </div>
        </Menu>
    )
}