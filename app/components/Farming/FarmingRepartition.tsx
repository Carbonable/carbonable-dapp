export default function FarmingRepartition({resaleAmount, offsetAmount}: {resaleAmount: number | undefined, offsetAmount: number | undefined}) {
    const total = resaleAmount !== undefined && offsetAmount !== undefined ? resaleAmount + offsetAmount : 0;
    const resalePercentage = total > 0 && resaleAmount ? resaleAmount / total * 100 : 0;
    const offsetPercentage = total > 0 && offsetAmount ? offsetAmount / total * 100 : 0;
    
    return (
        <div className="relative w-full">
            <div className="flex items-center justify-between px-4 text-xs uppercase lg:text-base">
                <div className="text-green font-inter">RESALE {resalePercentage.toFixed(1)}%</div>
                <div className="text-blue font-inter">OFFSET {offsetPercentage.toFixed(1)}%</div>
            </div>
            {total > 0 && <div className="rounded-full h-2 w-full mt-3" style={{background: `linear-gradient(to right, #0AF2AD, ${resalePercentage}%, #9EBAF0)` }}></div>}
            {total === 0 && <div className="rounded-full h-2 w-full mt-3 bg-neutral-400"></div>}
        </div>
    )
}