import { links } from "./links";
import { networksList } from "./networks";
import { DISCORD_LINK, LINKEDIN_LINK, MEDIUM_LINK, TWITTER_LINK } from "~/utils/links";
import { LinkFooter } from "../Buttons/LinkButton";
import NavLinkInside from "./NavLinkInside";
import NavLinkOutside from "./NavLinkOutside";
import Select from "../Filters/Select";
import { useNotifications } from "~/root";

export default function NavMenu({addressToDisplay, closeMenu}: any) {
    const { defautlNetwork } = useNotifications();
    return (
        <div className="bg-neutral-900 h-screen text-left pt-[30px]">
            <div className="w-full text-left pl-[36px]">
                <img className="w-8/12" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/>
            </div>
            <div className="w-full mt-4 pl-[36px] overflow-x-hidden text-ellipsis font-trash lg:hidden">{addressToDisplay}</div>
            <div className="mt-12 w-full">
                {links.map((link) => (      
                    <div key={`${link.label}_mobile`} >
                        {link.outsideLink && <NavLinkOutside link={link} />}
                        {false === link.outsideLink && <NavLinkInside link={link} closeMenu={closeMenu} />}
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 items-center justify-center w-full font-inter font-bold">
                <div className="lg:hidden w-9/12 mx-auto mb-6">
                    <Select values={networksList} selectedValue={defautlNetwork} action="/network/preference" />
                </div>
                <div className="w-full flex flex-wrap items-center justify-center px-4">
                    <LinkFooter className="w-[50px] m-1" href={TWITTER_LINK}><img className="w-[30px] h-[30px]" src="/assets/images/icons/twitter-icon.svg" alt="twitter" /></LinkFooter>
                    <LinkFooter className="w-[50px] m-1" href={DISCORD_LINK}><img className="w-[30px] h-[30px]" src="/assets/images/icons/discord-icon.svg" alt="discord" /></LinkFooter>
                    <LinkFooter className="w-[50px] m-1" href={LINKEDIN_LINK}><img className="w-[30px] h-[30px]" src="/assets/images/icons/linkedin-icon.svg" alt="linkedin" /></LinkFooter>
                    <LinkFooter className="w-[50px] m-1" href={MEDIUM_LINK}><img className="w-[30px] h-[30px]" src="/assets/images/icons/medium-icon.svg" alt="medium" /></LinkFooter>
                </div>
                <div className="w-full flex items-center justify-center mt-4">Powered by <img className="w-[112px] ml-2" src="/assets/images/common/starknet.png" alt="Starknet logo" /></div>
            </div>
        </div>
    )
}