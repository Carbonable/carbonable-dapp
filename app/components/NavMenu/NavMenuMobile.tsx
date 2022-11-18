import { XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "@remix-run/react";
import { slide as Menu } from 'react-burger-menu';
import { links } from "./links";

export default function NavMenu({menuOpen, handleStateChange, closeMenu, canClose, starknetId}: any) {

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
            <div className={canClose ? "outline-none border-none py-12" : "outline-none border-none py-12"}>
                <div className="w-full text-center"><img className="w-8/12 mx-auto" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/> </div>
                <div className="w-full text-center mt-4 px-4 overflow-x-hidden text-ellipsis font-trash">{starknetId}</div>
                <div className="mt-20 w-full">
                    {links.map((link) => (      
                        <NavLink key={link.label} className="uppercase font-inter text-xl" to={link.href} onClick={closeMenu}>
                            {({ isActive }) => (
                                <div  className="w-full flex justify-start items-center">
                                    <div className={isActive ? "w-[3px] h-[48px] bg-nav-selected" : "w-[3px] h-[48px] bg-transparent"}></div>
                                    <div className={isActive ? "py-4 pl-8 font-thin text-green" : "py-4 pl-8 font-bold text-beaige"}>{link.label}</div>
                                </div>
                            )}
                        </NavLink>
                    ))}
                </div>
                
            </div>
        </Menu>
    )
}