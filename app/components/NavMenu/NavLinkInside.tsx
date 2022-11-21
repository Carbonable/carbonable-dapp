import { NavLink } from "@remix-run/react";

export default function NavLinkInside({link, closeMenu}: any) {

    return (
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
    )
}