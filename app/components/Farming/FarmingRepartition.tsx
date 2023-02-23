export default function FarmingRepartition({yieldAmount, offsetAmount}: {yieldAmount: number | undefined, offsetAmount: number | undefined}) {
    const total = yieldAmount && offsetAmount ? yieldAmount + offsetAmount : 0;
    const percentage1 = total > 0 && yieldAmount ? yieldAmount / total * 100 : 0;
    const percentage2 = total > 0 && offsetAmount ? offsetAmount / total * 100 : 0;
    
    return (
        <div className="relative w-full">
            <div className="flex items-center justify-between px-4 text-xs uppercase lg:text-base">
                <div className="text-green font-inter">YIELD {percentage1}%</div>
                <div className="text-blue font-inter">OFFSET {percentage2}%</div>
            </div>
            {total > 0 && <div className="rounded-full h-2 w-full mt-3" style={{background: `linear-gradient(to right, #0AF2AD, ${percentage1}%, #9EBAF0)`, backgroundImage: "rgba(0, 0, 0, 0.3)" }}></div>}
            {total === 0 && <div className="rounded-full h-2 w-full mt-3 bg-neutral-400"></div>}
        </div>
    )
}