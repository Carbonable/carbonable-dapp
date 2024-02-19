export default function SaleProgress() {
    return (
        <>
            <div className="flex items-center w-full flex-nowrap justify-between px-6">
                <div className="w-fit">
                    <PhaseAndBoost phase={1} boost={4} />
                </div>
                <div className="flex-grow px-6 hidden lg:block">
                    <img src="/assets/images/leaderboard/separator.svg" alt="Progress" className="w-full" />
                </div>
                <div className="w-fit text-right">
                    <PhaseAndBoost phase={2} boost={3} align="right" />
                </div>
            </div>
            <div className="mt-2 w-full">
                <ProgressBar />
            </div>
        </>
        
    )
}

function PhaseAndBoost({ phase, boost, align }: { phase: number, boost: number, align?: string}) {
    return (
        <div className={`flex items-center justify-between flex-nowrap w-fit ${align === "right" ? "justify-end" : ""}`}>
            <span className="text-xs font-light text-neutral-100 whitespace-nowrap">Phase {phase}</span>
            <img src={`/assets/images/leaderboard/boost_${boost}.svg`} alt="Boost" className="w-[72px] ml-2" />
        </div>
    )
}

function ProgressBar() {
    return (
        <div className="w-full mt-1 bg-opacityLight-10 h-1 rounded-full">
            <div className="h-full bg-green-blue w-1/2 rounded-full"></div>
        </div>
    )
}