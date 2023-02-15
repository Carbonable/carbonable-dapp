import SecondaryButton from "../Buttons/ActionButton"
import KPI from "./FarmKPI"

export const enum FarmType {
    YIELD = "YIELD",
    OFFSET = "OFFSET"
}

export default function FarmDetail({type, total, available, handleClaim}: {type: FarmType, total: string, available: string, handleClaim: () => void }) {
    return (
        <div className="w-full flex flex-wrap items-center">
            <div className="w-full md:w-3/12">
                <FarmTypeTitle type={type} />
            </div>
            <div className="w-full mt-4 md:mt-0 md:w-9/12">
                <FarmTypeDetail type={type} total={total} available={available} handleClaim={handleClaim} />
            </div>
        </div>
    )
}

function FarmTypeTitle({type}: {type: FarmType}) {
    return (
        <div className={`${type === FarmType.YIELD ? "border-l-yieldBorder text-green" : "border-l-offsetBorder text-blue"} border-l rounded-full py-4 pl-8 uppercase font-inter font-semibold`}>
            {type === FarmType.YIELD ? "Yield" : "Offset"}
        </div>
    )
}

function FarmTypeDetail({type, total, available, handleClaim}: {type:FarmType, total: string, available: string, handleClaim: () => void}) {
    return (
        <div className="w-full grid grid-cols-12 gap-1 rounded-2xl border border-neutral-500 bg-opacityLight-5 p-3 items-center">
            <div className="text-left col-span-5">
                <KPI title="Total" value={total} unit={type === FarmType.YIELD ? "$" : "CC"} large={false} />
            </div>
            <div className="text-left col-span-4">
                <KPI title="Available" value={available} unit={type === FarmType.YIELD ? "$" : "CC"} large={false} />
            </div>
            <div className="text-right col-span-3">
                <SecondaryButton onClick={handleClaim} className="w-fit text-neutral-200">Claim</SecondaryButton>
            </div>
        </div>
    )
}