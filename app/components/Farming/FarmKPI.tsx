export default function KPI({title, value, unit, large}: {title: string, value: string | undefined, unit?: string, large?: boolean}) {
    return (
        <div className="flex flex-col items-left">
            <div className={`font-inter font-light text-neutral-300 uppercase text-sm ${large ? "md:text-lg" : "md:text-base"}`}>{title}</div>
            <div className="mt-2">
                {unit && <span className={`font-americana font-thin text-neutral-100 ${large ? "text-xl md:text-2xl mr-1" : "text-sm md:text-base mr-1"}`}>{unit}</span>}
                <span className={`font-trash font-extrabold text-neutral-100 ${large ? "text-2xl md:text-3xl" : "text-base md:text-xl"}`}>{value ? value : '-'}</span>
            </div>
        </div>
    )
}
