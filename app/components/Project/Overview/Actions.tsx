import { GreenLinkButton } from "~/components/Buttons/LinkButton";
import ComingSoon from "./ComingSoon";
import Mint from "./Mint";
import { SaleStatusType } from "./ProjectOverview";
import type { LaunchpadProps, MintProps, ProjectProps } from "~/routes/__index/launchpad";

export default function Actions({projectState, project, launchpad, mint, priceToDisplay, whitelist, STFAvailable, SFTToClaim, SFTClaimed}: 
    {projectState: SaleStatusType, project: ProjectProps, launchpad: LaunchpadProps, mint: MintProps, priceToDisplay: number, whitelist: any, STFAvailable: boolean, SFTToClaim: number, SFTClaimed: number}) {

    if (projectState === SaleStatusType.ComingSoon) {
        return (
            <ComingSoon />
        );
    }

    if (projectState === SaleStatusType.Public || projectState === SaleStatusType.Whitelist) {
        return (
            <Mint project={project} launchpad={launchpad} mint={mint} priceToDisplay={priceToDisplay} whitelist={whitelist} />
        );
    }

    if (projectState === SaleStatusType.Soldout && !STFAvailable) {
        return (
            <GreenLinkButton href="#" className="w-full bg-neutral-300 cursor-not-allowed rounded-xl hover:bg-neutral-300">SFT Claim is coming soon</GreenLinkButton>
        );
    }

    if (projectState === SaleStatusType.Soldout && STFAvailable && SFTToClaim > 0) {
        return (
            <GreenLinkButton href="#" className="w-full rounded-xl">Claim your SFT</GreenLinkButton>
        );
    }

    if (projectState === SaleStatusType.Soldout && STFAvailable && SFTToClaim === 0 && SFTClaimed > 0) {
        return (
            <div className="w-full relative text-center">
                <div className="w-full">
                    <GreenLinkButton href={`/farming/${project.slug}`} className="w-full rounded-xl block">Go to Farming</GreenLinkButton>
                </div>
                <div className="font-inter font-normal uppercase text-xs mt-2 text-neutral-200">your SFT is claimed, be sure to make it farm.</div>
            </div>
        );
    }

    if (projectState === SaleStatusType.Soldout && STFAvailable && SFTToClaim === 0 && SFTClaimed === 0) {
        return (
            <ComingSoon />
        );
    }

    return null;
}