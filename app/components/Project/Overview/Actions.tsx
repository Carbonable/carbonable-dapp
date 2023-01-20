import type { Project } from "@prisma/client";
import { GreenLinkButton } from "~/components/Buttons/LinkButton";
import ComingSoon from "./ComingSoon";
import Mint from "./Mint";
import { SaleStatusType } from "./ProjectOverview";

export default function Actions({projectState, project, priceToDisplay, whitelist, refreshProjectTotalSupply, refreshProjectReservedSupplyForMint, network}: 
                                {projectState: SaleStatusType, project: Project, priceToDisplay: number, whitelist: any, refreshProjectTotalSupply: () => void, refreshProjectReservedSupplyForMint: () => void, network: string}) {
    if (projectState === SaleStatusType.Soldout) {
        return (
            <GreenLinkButton href="#impactreports" className="w-full">View Impact Reports</GreenLinkButton>
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