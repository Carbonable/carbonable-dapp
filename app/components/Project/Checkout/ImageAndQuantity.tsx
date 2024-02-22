import ProjectImage from "../Common/ProjectImage";
import { useProject } from "../ProjectWrapper";

export default function ImageAndQuantity() {
    const { project, quantity } = useProject();

    return (
        <>
            <ProjectImage
                imageUri={project.uri.uri} 
                projectId={project.id + "_checkout"} 
            />
            <div className="mt-4 flex justify-between item-center w-11/12 mx-auto">
                <div className="font-medium text-neutral-100 text-left">Quantity:</div>
                <div className="text-neutral-300 text-right">{quantity}</div>
            </div>
        </>
    )
}