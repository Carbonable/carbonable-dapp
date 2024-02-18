import ProjectInformation from "./ProjectInformation";
import SaleAction from "./SaleAction";

export default function SaleInformation() {
    return (
        <>
            <div className="w-full">
                <ProjectInformation />
            </div>
            <div className="w-11/12">
                <SaleAction />
            </div>
        </>
    )
}