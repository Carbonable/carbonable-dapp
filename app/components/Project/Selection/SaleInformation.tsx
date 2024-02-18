import MilestoneInformation from "./MilestoneInformation";
import SaleAction from "./SaleAction";

export default function SaleInformation() {
    return (
        <>
            <div className="w-full">
                <MilestoneInformation />
            </div>
            <div className="w-11/12">
                <SaleAction />
            </div>
        </>
    )
}