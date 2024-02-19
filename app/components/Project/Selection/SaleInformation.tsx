import ProjectInformation from "./ProjectInformation";
import SaleAction from "./SaleAction";

export default function SaleInformation() {
    return (
        <>
            <div className="w-full">
                <ProjectInformation />
            </div>
            <div className="w-[96%] mx-auto mt-6">
                <SaleAction />
            </div>
        </>
    )
}