import SecondaryButton from "../Buttons/ActionButton";

export default function FarmingAllocation({yieldAmount, offsetAmount, undepositedAmount, handleDeposit, handleWithdraw}: {yieldAmount: number, offsetAmount: number, undepositedAmount: number, handleDeposit: () => void, handleWithdraw: () => void}) {
    const FarmingAllocationValue = ({title, value, percentage}: {title: string, value: number, percentage?: string}) => (
        <div className="flex flex-col items-left">
            <div className={`font-inter font-light text-neutral-300 uppercase text-sm md:text-base"`}>{title}</div>
            <div className="mt-2">
                <span className={`font-trash font-extrabold ${value === 0 ? "text-neutral-200" : "text-neutral-100"} text-lg md:text-xl`}>
                    {value}
                    {percentage && <span className={`font-americana font-thin text-neutral-300 uppercase ml-2 md:text-lg mr-2`}>({percentage})</span>}
                </span>
            </div>
        </div>
    )

    const total = yieldAmount + offsetAmount + undepositedAmount;
    const yieldPercentage = `${((yieldAmount / total) * 100).toFixed(0)}%`;
    const OffsetPercentage = `${((offsetAmount / total) * 100).toFixed(0)}%`;
    const undepositedPercentage = `${((undepositedAmount / total) * 100).toFixed(0)}%`;
    
    return (
        <div className="w-full rounded-2xl border border-neutral-500 bg-opacityLight-5 p-4 xl:p-8">
            <div className="font-inter font-semibold uppercase text-neutral-100 text-lg md:text-xl">Assets allocation</div>
            <div className="grid grid-cols-6 items-center mt-4 gap-y-4 md:grid-cols-12">
                <div className="w-full col-span-3 md:col-span-2">
                    <FarmingAllocationValue title="Total" value={total} />
                </div>
                <div className="w-full col-span-3 md:col-span-2">
                    <FarmingAllocationValue title="Yield" value={yieldAmount} percentage={yieldPercentage} />
                </div>
                <div className="w-full col-span-3 md:col-span-2">
                    <FarmingAllocationValue title="Offset" value={offsetAmount} percentage={OffsetPercentage} />
                </div>
                <div className="w-full col-span-3 md:col-span-2">
                    <FarmingAllocationValue title="Undeposited" value={undepositedAmount} percentage={undepositedPercentage} />
                </div>
                <div className="w-full col-span-6 items-center mt-6 text-neutral-200 md:col-span-4 text-right">
                    <SecondaryButton onClick={handleDeposit}>Deposit</SecondaryButton>
                    <SecondaryButton className="ml-2" onClick={handleWithdraw}>Withdraw</SecondaryButton>
                </div>
            </div>
        </div>
    )
}