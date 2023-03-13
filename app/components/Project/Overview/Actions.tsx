import type { Project } from "@prisma/client";
import GreenLinkButton from "~/components/Buttons/LinkButton";
import ComingSoon from "./ComingSoon";
import Mint from "./Mint";
import { SaleStatusType } from "./ProjectOverview";

export default function Actions({projectState, project, priceToDisplay, whitelist, refreshProjectTotalSupply, refreshProjectReservedSupplyForMint, network, hasReports}: 
                                {projectState: SaleStatusType, project: Project, priceToDisplay: number, whitelist: any, refreshProjectTotalSupply: () => void, refreshProjectReservedSupplyForMint: () => void, network: string, hasReports: boolean}) {
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
            <Mint project={project} priceToDisplay={priceToDisplay} whitelist={whitelist} refreshProjectTotalSupply={refreshProjectTotalSupply} refreshProjectReservedSupplyForMint={refreshProjectReservedSupplyForMint} network={network} />
        );
    }
    return null;
}