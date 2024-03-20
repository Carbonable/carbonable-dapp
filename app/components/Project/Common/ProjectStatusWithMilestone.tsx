import { useEffect, useState } from "react";
import { useProject } from "../ProjectWrapper";
import { SaleStatusType } from "~/types/project";

export default function ProjectStatusWithMilestone() {
    const { launchpad, project, canAccessPresale } = useProject();
    const [saleState, setSaleState] = useState<SaleStatusType>(SaleStatusType.ComingSoon);

    useEffect(() => {
        if (launchpad.is_sold_out === true) {
            setSaleState(SaleStatusType.Soldout);
        } else if (launchpad.public_sale_open === true) {
            setSaleState(SaleStatusType.Public);
        } else if (launchpad.whitelisted_sale_open === true) {
            setSaleState(SaleStatusType.Whitelist);
        }
    }, [launchpad]);

    if (saleState === SaleStatusType.Soldout) {
        return (
            <div className="w-fit rounded-md bg-blue/30 flex items-center py-[2px] px-2 font-light uppercase text-xs">
                <div className="text-blue">Soldout</div>
            </div>
        )
    }

    if (canAccessPresale) {
        return (
            <div className="w-fit rounded-md bg-blue/30 flex items-center py-[2px] px-2 font-light uppercase text-xs">
                <div className="text-greenish-400">Presale</div>
                <div className="ml-2 border border-opacityLight-30 bg-opacityLight-20 py-[1px] px-2 rounded-md">
                    Phase {project.current_milestone.id + 1}
                </div>
            </div>
        )
    }

    if (saleState === SaleStatusType.ComingSoon) {
        return (
            <div className="w-fit rounded-md bg-blue/30 flex items-center py-[2px] px-2 font-light uppercase text-xs">
                <div className="text-blue">Upcoming</div>
            </div>
        )
    }

    if (saleState === SaleStatusType.Whitelist) {
        return (
            <div className="w-fit rounded-md bg-orange/30 flex items-center py-[2px] px-2 font-light uppercase text-xs">
                <div className="text-orange">Whitelist Open</div>
            </div>
        )
    }


    return (
        <div className="w-fit rounded-lg bg-greenish-700/50 flex items-center py-[2px] pl-2 pr-[2px] font-light uppercase text-xs">
            <div className="text-greenish-400">Live</div>
            <div className="ml-2 border border-opacityLight-30 bg-opacityLight-20 py-[1px] px-2 rounded-md">
                Phase {project.current_milestone.id + 1}
            </div>
        </div>
    )
}