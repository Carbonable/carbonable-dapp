import { useProject } from "../ProjectWrapper";

export default function ProjectKPIs() {
    const { project } = useProject();
    return (
        <>
            <ProjectKPI className="col-span-2 md:col-span-1" label="Shares" value={(project.current_milestone.milestone_ceil * Math.pow(10, -6)).toFixed(0)} />
            <ProjectKPI className="col-span-2 md:col-span-1" label="Remaining" value={parseFloat(project.current_milestone.remaining.displayable_value).toFixed(0)} />
            <ProjectKPI className="col-span-2 md:col-span-1" label="$ per t/CO2" value={project.metadata.ton_price} />
            <ProjectKPI className="col-span-2 md:col-span-1" label="Rating" value={project.metadata.rating} />
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