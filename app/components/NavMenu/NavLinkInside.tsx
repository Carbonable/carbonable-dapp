import { NavLink } from "@remix-run/react";
import { useState } from "react";

export default function NavLinkInside({link, closeMenu}: any) {
    const [isShown, setIsShown] = useState(true);

    return (
        <>
            {link.isOpen && <NavLink key={link.label} className="uppercase font-inter text-base" to={link.href} onClick={closeMenu} >
                {({ isActive }) => (
                    <div  className="w-full flex justify-start items-center">
                        <div className={isActive ? "w-[3px] h-[44px] bg-primary" : "w-[3px] h-[44px] bg-transparent"}></div>
                        <div className={isActive ? "py-2 pl-8 font-bold text-primary" : "py-3 pl-8 font-normal text-neutral-200 hover:text-neutral-400"}>{link.label}</div>
                    </div>
                )}
            </NavLink> }
            {link.isOpen === false && <div key={link.label} className="uppercase font-inter text-base" onClick={closeMenu}>
                <div  className="w-full flex justify-start items-center">
                    <div className="w-[3px] h-[44px] bg-transparent"></div>
                    <div className="py-2 pl-8 text-neutral-500 cursor-default" onMouseEnter={() => setIsShown(false)} onMouseLeave={() => setIsShown(true)}>
                        {isShown && <span>{link.label}</span> }
                        {!isShown && <span>COMING SOON</span> }
                    </div>
                </div>
            </div> }
    </>
    )
}