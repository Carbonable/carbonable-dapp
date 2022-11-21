export default function NavLinkOutside({link}: any) {

    return (
        <>
            {link.isOpen && <a key={link.label} className="uppercase font-inter text-base" href={link.href} target="_blank" rel="noreferrer">
                    <div  className="w-full flex justify-start items-center">
                        <div className="w-[3px] h-[44px] bg-transparent"></div>
                        <div className="py-3 pl-8 font-bold text-beaige">{link.label}</div>
                    </div>
            </a> }
            {link.isOpen === false && <a key={link.label} className="uppercase font-inter text-base cursor-not-allowed" href={link.href} target="_blank" rel="noreferrer">
                    <div  className="w-full flex justify-start items-center">
                        <div className="w-[3px] h-[44px] bg-transparent"></div>
                        <div className="py-2 pl-8 text-beaige/30">{link.label}</div>
                    </div>
            </a> }
    </>
    )
}