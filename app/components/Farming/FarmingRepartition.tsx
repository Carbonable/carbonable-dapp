export default function FarmingRepartition() {
    const percentage1 = 50;
    
    return (
        <div className="relative w-full">
            <div className="flex items-center justify-between px-4 text-xs uppercase lg:text-base">
                <div className="text-green font-inter">YIELD 70%</div>
                <div className="text-blue font-inter">OFFSET 30%</div>
            </div>
            <div className="rounded-full h-2 w-full mt-3" style={{background: `linear-gradient(to right, #0AF2AD, ${percentage1}%, #9EBAF0)`, backgroundImage: "rgba(0, 0, 0, 0.3);" }}></div>
        </div>
    )
}