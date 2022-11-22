import { links } from "./links";
import { DISCORD_LINK, LINKEDIN_LINK, MEDIUM_LINK, TWITTER_LINK } from "~/utils/links";
import { LinkFooter } from "../Buttons/LinkButton";
import NavLinkInside from "./NavLinkInside";
import NavLinkOutside from "./NavLinkInsideOutside";

export default function NavMenu() {

    return (
        <div className="bg-black bg-navigation m-8 rounded-xl lg:!h-[calc(100vh_-_60px)]">
            <div className="outline-none border-none py-12">
                <div className="w-full text-center"><img className="w-8/12 mx-auto" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/> </div>
                <div className="mt-12 w-full">
                    {links.map((link) => (      
                        <div key={link.label} >
                            {link.outsideLink && <NavLinkOutside link={link} />}
                            {false === link.outsideLink && <NavLinkInside link={link} />}
                        </div>
                        ))}
                </div>
            </div>
            <div className="absolute bottom-4 items-center justify-center w-[290px] font-inter font-bold">
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