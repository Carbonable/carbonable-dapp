import { links, linkSimulator } from "./links";
import { networksList } from "./networks";
import NavLinkInside from "./NavLinkInside";
import NavLinkOutside from "./NavLinkOutside";
import FormSelect from "../Filters/FormSelect";
import { useNotifications } from "~/root";
import Address from "../Connection/Address";

export default function NavMenu({ closeMenu }: any) {
    const { defaultNetwork: defaultNetwork } = useNotifications();
    return (
        <div className="bg-neutral-900 h-screen text-left pt-[24px]">
            <div className="w-full text-left pl-[24px] hidden lg:block">
                <img className="w-8/12" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/>
            </div>
            <div className="w-full mt-28 pl-[36px] overflow-x-hidden text-ellipsis font-trash lg:hidden"><Address /></div>
            <div className="mt-6 lg:mt-12 w-full">
                {links.map((link) => (      
                    <div key={`${link.label}_mobile`} >
                        {link.outsideLink && <NavLinkOutside link={link} />}
                        {false === link.outsideLink && <NavLinkInside link={link} closeMenu={closeMenu} />}
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 items-center justify-start w-full font-inter">
                <div className="w-full flex flex-wrap items-center justify-start">
                    <NavLinkOutside link={linkSimulator} />
                </div>
                <div className="lg:hidden w-9/12 mb-12 pl-8">
                    <FormSelect values={networksList} selectedValue={defaultNetwork} action="/network/preference" />
                </div>
                <div className="w-full flex items-center justify-start pl-9 lg:justify-center lg:pl-0 mt-4 text-xs">Powered by <img className="w-[92px] ml-2" src="/assets/images/common/starknet.svg" alt="Starknet logo" /></div>
            </div>
        </div>
    )
}