import { GreenButton } from "../Buttons/ActionButton";
import KPI from "./FarmKPI";
import * as Tooltip from '@radix-ui/react-tooltip';

export const enum FarmType {
    RESALE = "RESALE",
    OFFSET = "OFFSET"
}

export default function FarmDetail({type, total, available, canClaim, minClaim, handleClaim}: {type: FarmType, total: string, available: string, canClaim: boolean, minClaim?: string, handleClaim: () => void }) {
    return (
        <div className="w-full flex flex-wrap items-center">
            <div className="w-full md:w-3/12">
                <FarmTypeTitle type={type} />
            </div>
            <div className="w-full mt-4 md:mt-0 md:w-9/12">
                <FarmTypeDetail type={type} total={total} available={available} canClaim={canClaim} minClaim={minClaim} handleClaim={handleClaim} />
            </div>
        </div>
    )
}

function FarmTypeTitle({type}: {type: FarmType}) {
    return (
        <div className={`${type === FarmType.RESALE ? " text-green" : " text-blue"} py-4 pl-8 uppercase font-inter font-semibold`}>
            {type === FarmType.RESALE ? "RESALE" : "Offset"}
        </div>
    )
}

function FarmTypeDetail({type, total, available, canClaim, minClaim, handleClaim}: {type:FarmType, total: string, available: string, canClaim: boolean, minClaim?: string, handleClaim: () => void}) {
    return (
        <div className="w-full grid grid-cols-12 gap-1 rounded-2xl border border-neutral-500 bg-opacityLight-5 px-3 py-3 items-center lg:px-6">
            <div className="text-left col-span-4">
                <KPI title="Total" value={total} unit={type === FarmType.RESALE ? "$" : "CC"} large={false} />
            </div>
            <div className="text-left col-span-5">
                <KPI title="Available" value={available} unit={type === FarmType.RESALE ? "$" : "CC"} large={false} />
            </div>
            <div className="text-right col-span-3">
            <Tooltip.Provider delayDuration={0}>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <span tabIndex={0}>
                            <GreenButton disabled={canClaim === false} onClick={handleClaim} className="w-fit text-neutral-200 disabled:bg-transparent disabled:border disabled:border-neutral-600 disabled:hover:bg-transparent disabled:text-neutral-500 disabled:pointer-events-none">Claim</GreenButton>
                        </span>
                    </Tooltip.Trigger>
                    <Tooltip.Content className="px-2 py-1 bg-neutral-800 border border-neutral-600 rounded-lg text-sm text-neutral-200 font-light">
                        A {minClaim ? minClaim + ' CC' : '0.01$'} min. is required before claiming.
                    </Tooltip.Content>
                </Tooltip.Root>
            </Tooltip.Provider>
            </div>
        </div>
    )
}