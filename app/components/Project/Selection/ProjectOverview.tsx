import ProjectImage from "../Common/ProjectImage";
import { useProject } from "../ProjectWrapper";
import SaleInformation from "./SaleInformation";

export default function ProjectOverview() {
    const { project } = useProject();
    return (
        <div className="w-full bg-mint p-4">
            <div className="mx-auto px-2 md:w-11/12 xl:w-10/12 2xl:w-9/12 2xl:max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 w-full">
                    <div className="order-1 md:order-2">
                        <ProjectImage 
                            imageUri={project.uri.uri} 
                            projectId={project.id} 
                        />
                    </div>
                    <div className="order-2 md:order-1 md:col-span-2 mt-4 md:mt-0">
                        <SaleInformation />
                    </div>
                </div>
            </div>
        </div>
    )
}