import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useProject } from "../ProjectWrapper";
import ProjectStatusWithMilestone from "../Common/ProjectStatusWithMilestone";
import ProjectKPIs from "./ProjectKPI";
import BoostAndPoints from "./BoostAndPoints";

export default function ProjectInformation() {
    const { project } = useProject();

    // TODO: Replace with real KPIs
    return (
        <div className="relative rounded-lg w-full bg-project-info-border p-[1px]">
            <div className="relative rounded-lg bg-project-info py-4 px-6 w-full overflow-hidden">
                <div className="flex items-center justify-between">
                    <div className="uppercase text-2xl font-bold">{project.name}</div>
                    <div className="text-right">
                        <ProjectStatusWithMilestone />
                    </div>
                </div>
                <div className="mt-1">
                    <a href="https://rwatcher.com/collections/carbonable" 
                       target="_blank" 
                       rel="noreferrer" 
                       className="text-greenish-500 font-medium text-sm hover:text-neutral-100 flex items-center uppercase"
                    >
                        Similar projects performances
                        <ArrowTopRightOnSquareIcon className="w-4 ml-2" />
                    </a>
                </div>
                <div className="mt-4 grid grid-cols-4 items-center justify-start gap-2">
                    <ProjectKPIs />
                </div>
                <div className="w-full mt-4">
                    <BoostAndPoints />
                </div>
            </div>
        </div>
    )
}