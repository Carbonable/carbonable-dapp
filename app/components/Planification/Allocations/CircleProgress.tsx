export default function CircleProgress({value, over, size, bgColor, progressColor}: {value: number, over: number, size: number, bgColor: string, progressColor: string}) {
    const progress = Math.round((value / over) * 100);
    return (
        <div className="relative w-[60px] h-[60px] rounded-full bg-neutral-500 ml-auto mr-3"
             style={{backgroundImage: `conic-gradient(${bgColor} ${progress}%, ${progressColor} 0)` }}>
            <div className={`flex items-center justify-center absolute top-2/4 left-2/4 bg-neutral-800 font-inter font-semibold text-neutral-50 translate-y-[-50%] translate-x-[-50%] rounded-full`} style={{width: `${size}px`, height: `${size}px`}}>{progress}</div>
        </div>

    )
}