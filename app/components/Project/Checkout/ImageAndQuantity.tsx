import ProjectImage from "../Common/ProjectImage";
import { useProject } from "../ProjectWrapper";

export default function ImageAndQuantity() {
    const { project, quantity } = useProject();

    return (
        <div className="border rounded-lg border-opacityLight-20">
            <div className="flex justify-between bg-opacityLight-5 py-2 px-3">
                <div className="uppercase text-sm flex-grow">Project</div>
            </div>
            <div className="py-4 px-4 border-opacityLight-20">
                <ProjectImage
                    imageId={project.id + "_checkout"}
                />
                <div className="mt-4 flex justify-between item-center w-11/12 mx-auto">
                    <div className="font-medium text-neutral-100 text-left">Shares:</div>
                    <div className="text-neutral-300 text-right">{quantity}</div>
                </div>
            </div>
        </div>
    )
}