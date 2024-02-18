import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useProject } from "../ProjectWrapper";
import ProjectStatusWithMilestone from "../Common/ProjectStatusWithMilestone";

export default function MilestoneInformation() {
    const { project } = useProject();

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
            </div>
        </div>
    )
}