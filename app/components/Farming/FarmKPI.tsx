export default function KPI({title, value, unit, large}: {title: string, value: string | undefined, unit?: string, large?: boolean}) {
    return (
        <div className="flex flex-col items-left">
            <div className={`font-light text-neutral-300 uppercase ${large ? "md:text-xl" : "md:text-base"}`}>{title}</div>
            <div className="mt-2">
                {unit && <span className={`font-light text-neutral-100 ${large ? "text-xl md:text-2xl mr-2" : "mr-2"}`}>{unit}</span>}
                <span className={`font-bold text-neutral-100 ${large ? "text-2xl md:text-3xl" : "text-base md:text-xl"}`}>{value ? value : '-'}</span>
            </div>
        </div>
    )
}
