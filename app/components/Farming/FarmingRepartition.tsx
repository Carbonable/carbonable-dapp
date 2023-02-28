export default function FarmingRepartition({yieldAmount, offsetAmount}: {yieldAmount: number | undefined, offsetAmount: number | undefined}) {
    const total = yieldAmount && offsetAmount ? yieldAmount + offsetAmount : 0;
    const yieldPercentage = total > 0 && yieldAmount ? yieldAmount / total * 100 : 0;
    const offsetPercentage = total > 0 && offsetAmount ? offsetAmount / total * 100 : 0;
    
    return (
        <div className="relative w-full">
            <div className="flex items-center justify-between px-4 text-xs uppercase lg:text-base">
                <div className="text-green font-inter">YIELD {yieldPercentage}%</div>
                <div className="text-blue font-inter">OFFSET {offsetPercentage}%</div>
            </div>
            {total > 0 && <div className="rounded-full h-2 w-full mt-3" style={{background: `linear-gradient(to right, #0AF2AD, ${yieldPercentage}%, #9EBAF0)`, backgroundImage: "rgba(0, 0, 0, 0.3)" }}></div>}
            {total === 0 && <div className="rounded-full h-2 w-full mt-3 bg-neutral-400"></div>}
        </div>
    )
}