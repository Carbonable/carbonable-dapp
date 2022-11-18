import { NavLink } from "@remix-run/react";
import { links } from "./links";

export default function NavMenu() {

    return (
        <div className="bg-black bg-navigation m-8 rounded-xl lg:!h-[calc(100vh_-_60px)]">
            <div className="outline-none border-none py-12">
                <div className="w-full text-center"><img className="w-8/12 mx-auto" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/> </div>
                <div className="mt-20 w-full">
                    {links.map((link) => (      
                        <NavLink key={link.label} className="uppercase font-inter text-xl" to={link.href}>
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
        </div>
    )
}