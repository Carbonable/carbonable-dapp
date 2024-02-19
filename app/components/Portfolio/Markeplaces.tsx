import { num } from "starknet";
import { useNotifications } from "~/root";
import { ASPECT_LINK, ASPECT_TESTNET_LINK, MINTSQUARE_LINK } from "~/utils/links";

export default function Marketplaces({ project }: { project: any }) {
    const { defaultNetwork: defaultNetwork } = useNotifications();

    return (
        <div className="absolute invisible top-0 left-0 bg-transparent group-hover:bg-dark-40 group-hover:visible w-full h-[100%] rounded-[8.8%]">
            <div className="relative w-full h-100%">
                <a href={`${defaultNetwork === 'testnet' ? ASPECT_TESTNET_LINK : ASPECT_LINK}/asset/${project.address}/${num.hexToDecimalString(project.tokens[0].token_id)}`} rel="noreferrer" target="_blank" className="absolute top-6 right-16 md:top-4 w-10 h-10 rounded-full p-2 flex items-center justify-center bg-black/20 backdrop-blur-md cursor-pointer border border-neutral-300 hover:bg-black/5 hover:backdrop-blur-lg">
                    <img src='/assets/images/icons/aspect-icon.png' alt="Go to Aspect" className="w-full" />
                </a>
                <a href={`${MINTSQUARE_LINK}/asset/starknet${defaultNetwork === 'testnet' ? '-testnet' : ''}/${project.address}/${num.hexToDecimalString(project.tokens[0].token_id)}`} rel="noreferrer" target="_blank" className="absolute top-6 right-5 md:top-4 w-10 h-10 rounded-full p-2 flex items-center justify-center bg-black/20 backdrop-blur-md cursor-pointer border border-neutral-300 hover:bg-black/5 hover:backdrop-blur-lg">
                    <img src='/assets/images/icons/mintsquare-icon.svg' alt="Go to Mint Square" className="w-full" />
                </a>
            </div>
        </div>
    )
}