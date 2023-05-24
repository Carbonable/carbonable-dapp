import { GreenLinkButton } from "~/components/Buttons/LinkButton";
import ComingSoon from "./ComingSoon";
import Mint from "./Mint";
import { SaleStatusType } from "./ProjectOverview";
import type { LaunchpadProps, MintProps, ProjectProps } from "~/routes/__index/launchpad";

export default function Actions({projectState, project, launchpad, mint, priceToDisplay, whitelist, hasReports}: 
                                {projectState: SaleStatusType, project: ProjectProps, launchpad: LaunchpadProps, mint: MintProps, priceToDisplay: number, whitelist: any, hasReports: boolean}) {

    if (projectState === SaleStatusType.Soldout && hasReports) {
        return (
            <GreenLinkButton href="#impactreports" className="w-full">View Impact Reports</GreenLinkButton>
        );
    }

    if (projectState === SaleStatusType.Soldout && !hasReports) {
        return (
            <GreenLinkButton href="#" className="w-full cursor-not-allowed text-neutral-300 bg-greenish-800 hover:text-neutral-300 hover:bg-greenish-800">Impact Reports coming soon</GreenLinkButton>
        );
    }

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
    return null;
}