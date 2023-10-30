import { useState } from "react";

export default function NavLinkOutside({link}: any) {

    const [isShown, setIsShown] = useState(true);
    return (
        <>
            {link.isOpen && <a key={link.label} className="uppercase font-inter text-base" href={link.href} target="_blank" rel="noreferrer">
                <div className="w-full flex justify-start items-center hover:brightness-125">
                    <div className="w-[3px] h-[44px] bg-transparent"></div>
                    <div className="flex justify-start items-center py-2 pl-8 text-neutral-200">
                        <img src={`/assets/images/icons/menu/${link.icon}.svg`}  alt={`${link.icon}_active`} className="w-6 h-6 " />
                        <div className="py-3 pl-2">{link.label}</div>
                    </div>
                </div>
            </a> }
            {link.isOpen === false && <div key={link.label} className="uppercase font-inter text-base">
                <div className="w-full flex justify-start items-center">
                    <div className="w-[3px] h-[44px] bg-transparent"></div>
                    <div className="flex justify-start items-center py-2 pl-8 text-neutral-400 cursor-default" onMouseEnter={() => setIsShown(false)} onMouseLeave={() => setIsShown(true)}>
                        <img src={`/assets/images/icons/menu/${link.icon}.svg`}  alt={`${link.icon}_inactive`} className="w-6 h-6 " />
                        {isShown && <div className="py-3 pl-2">{link.label}</div> }
                        {!isShown && <div className="py-3 pl-2">COMING SOON</div> }
                    </div>
                </div>
            </div> }
        </>
    )
}