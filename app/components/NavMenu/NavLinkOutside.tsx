import { useState } from "react";

export default function NavLinkOutside({link}: any) {

    const [isShown, setIsShown] = useState(true);
    return (
        <>
            {link.isOpen && <a key={link.label} className="uppercase font-inter text-base" href={link.href} target="_blank" rel="noreferrer">
                    <div  className="w-full flex justify-start items-center">
                        <div className="w-[3px] h-[44px] bg-transparent"></div>
                        <div className="py-3 pl-8 font-normal text-neutral-200 hover:text-neutral-400">{link.label}</div>
                    </div>
            </a> }
            {link.isOpen === false && <div key={link.label} className="uppercase font-inter text-base">
                <div className="w-full flex justify-start items-center">
                    <div className="w-[3px] h-[44px] bg-transparent"></div>
                    <div className="py-2 pl-8 text-neutral-500 cursor-default" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                        {isShown && <span>{link.label}</span> }
                        {!isShown && <span>COMING SOON</span> }
                    </div>
                </div>
            </div> }
    </>
    )
}