import { NavLink } from "@remix-run/react";
import { useState } from "react";

export default function NavLinkInside({link, closeMenu}: any) {
    const [isShown, setIsShown] = useState(true);

    return (
        <>
            {link.isOpen && <NavLink key={link.label} className="uppercase font-inter text-base" to={link.href} onClick={closeMenu} >
                {({ isActive }) => (
                    <div className={`w-full flex justify-start items-center ${isActive ? "" : "hover:brightness-125"}`}>
                        <div className={`w-[3px] h-[44px] ${isActive ? "bg-primary" : "bg-transparent"}`}></div>
                        <div className={`flex justify-start items-center py-2 pl-8 ${isActive ? "text-primary" : "text-neutral-200"}`}>
                            <img src={isActive ? `/assets/images/icons/menu/${link.icon}-active.svg` : `/assets/images/icons/menu/${link.icon}.svg`} alt={`${link.icon}_active`} className="w-6 h-6" />
                            <div className="py-3 pl-2">{link.label}</div>
                        </div>
                    </div>
                )}
            </NavLink> }
            {link.isOpen === false && <div key={link.label} className="uppercase font-inter text-base" onClick={closeMenu}>
                <div className="w-full flex justify-start items-center">
                    <div className="w-[3px] h-[44px] bg-transparent"></div>
                    <div className="flex justify-start items-center py-2 pl-8 text-neutral-400 cursor-default" onMouseEnter={() => setIsShown(false)} onMouseLeave={() => setIsShown(true)}>
                        <img src={`/assets/images/icons/menu/${link.icon}-inactive.svg`} alt={`${link.icon}_inactive`} className="w-6 h-6 " />
                        {isShown && <div className="py-3 pl-2">{link.label}</div> }
                        {!isShown && <div className="py-3 pl-2">COMING SOON</div> }
                    </div>
                </div>
            </div> }
        </>
    )
}