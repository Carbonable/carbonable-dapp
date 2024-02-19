export default function ProjectKPIs() {
    return (
        <>
            <ProjectKPI className="col-span-2 md:col-span-1" label="Shares" value="100,000" />
            <ProjectKPI className="col-span-2 md:col-span-1" label="Remaining" value="10,000" />
            <ProjectKPI className="col-span-2 md:col-span-1" label="$ per t/CO2" value="11.5" />
            <ProjectKPI className="col-span-2 md:col-span-1" label="Rating" value="AA" />
        </>
    )
}

function ProjectKPI({ label, value, className }: { label: string, value: string, className?: string}) {
    return (
        <div className={`px-4 py-2 border border-opacityLight-10 rounded-lg ${className}`}>
            <div className="font-light text-xs uppercase text-neutral-200 whitespace-nowrap overflow-hidden text-ellipsis">{label}</div>
            <div className="font-medium mt-1 text-neutral-100">{value}</div>
        </div>
    )
}