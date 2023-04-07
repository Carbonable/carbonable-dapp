import { useEffect, useState } from "react";
import SecondaryButton, { FarmingButton } from "../Buttons/ActionButton";
import { useNavigate } from "@remix-run/react";

export default function FarmingAllocation({yieldAmount, offsetAmount, undepositedAmount, total, mustMigrate, handleDeposit, handleWithdraw}: {yieldAmount: number | undefined, offsetAmount: number | undefined, undepositedAmount: number| undefined, total: number | undefined, mustMigrate: boolean, handleDeposit: () => void, handleWithdraw: () => void}) {
    const [yieldPercentage, setYieldPercentage] = useState<string | undefined>(undefined);
    const [offsetPercentage, setOffsetPercentage] = useState<string | undefined>(undefined);
    const [undepositedPercentage, setUndepositedPercentage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (total === undefined || total === 0 || yieldAmount === undefined || offsetAmount === undefined || undepositedAmount === undefined) { return; }

        setYieldPercentage(`${((yieldAmount / total) * 100).toFixed(0)}%`);
        setOffsetPercentage(`${((offsetAmount / total) * 100).toFixed(0)}%`);
        setUndepositedPercentage(`${((undepositedAmount / total) * 100).toFixed(0)}%`);

    }, [yieldAmount, offsetAmount, undepositedAmount, total]);
    
    const FarmingAllocationValue = ({title, value, percentage}: {title: string, value: number | undefined, percentage?: string}) => (
        <div className="flex flex-col items-left">
            <div className={`font-inter font-light text-neutral-300 uppercase text-sm md:text-base"`}>{title}</div>
            <div className="mt-2">
                <span className={`font-trash font-extrabold ${value === 0 ? "text-neutral-200" : "text-neutral-100"} text-lg md:text-xl`}>
                    {value !== undefined ? value : '-'}
                    {percentage !== undefined && <span className={`font-americana font-thin text-neutral-300 uppercase ml-2 md:text-lg mr-2`}>({percentage})</span>}
                </span>
            </div>
        </div>
    )
    
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
                    <FarmingAllocationValue title="Offset" value={offsetAmount} percentage={offsetPercentage} />
                </div>
                <div className="w-full col-span-3 md:col-span-2">
                    <FarmingAllocationValue title="Undeposited" value={undepositedAmount} percentage={undepositedPercentage} />
                </div>
                <div className="w-full col-span-6 items-center mt-6 text-neutral-200 md:col-span-4 text-left md:text-right">
                    <ActionButtons total={total} mustMigrate={mustMigrate} handleDeposit={handleDeposit} handleWithdraw={handleWithdraw} />
                </div>
            </div>
        </div>
    )
}

function ActionButtons({total, mustMigrate, handleDeposit, handleWithdraw}: {total: number | undefined, mustMigrate: boolean, handleDeposit: () => void, handleWithdraw: () => void}) {
    const navigate = useNavigate();

    if (mustMigrate) {
        return (
            <SecondaryButton className="!bg-greenish-600 hover:!bg-greenish-500 text-white" onClick={() => {navigate("/portfolio")}}>Migrate assets</SecondaryButton>
        )
    }

    return (
        <>
            {total !== undefined && <SecondaryButton onClick={handleDeposit}>Deposit</SecondaryButton>}
            {total === undefined && <SecondaryButton className="cursor-not-allowed bg-transparent border border-neutral-600 hover:bg-transparent text-neutral-500">Deposit</SecondaryButton>}
            {total !== undefined && total > 0 && <SecondaryButton className="ml-2" onClick={handleWithdraw}>Withdraw</SecondaryButton>}
            {(total === undefined || total === 0) && <SecondaryButton className="ml-2 cursor-not-allowed bg-transparent border border-neutral-600 hover:bg-transparent text-neutral-500">Withdraw</SecondaryButton>}
        </>
    )
}