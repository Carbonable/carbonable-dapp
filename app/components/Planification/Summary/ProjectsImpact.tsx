import { LinkSecondary } from "../../Buttons/LinkButton"

export default function ProjectsImpact({impacts}: {impacts: any}) {
    const cssBlock = "border border-neutral-500 rounded-xl px-6 py-4 bg-neutral-700"

    return (
        <div className="grid grid-rows-3 md:grid-rows-3 grid-cols-4 grid-flow-col gap-4">
            <div className={`col-span-4 md:row-span-3 md:col-span-1 ${cssBlock}`}>
                <ImpactTitle title="Impacted SDGs" value={`# ${impacts.sdg.total}`} />
                <div className="mt-8 grid grid-cols-5 gap-6 md:grid-cols-3">
                    {impacts.sdg.list.map((sdg: any, idx: number) => {
                        return (
                            <img key={`sdg_${idx}`} className="rounded-lg" alt={`sdg_${sdg}`} src={`/assets/images/sdg/${sdg}.png`} />
                        )
                    })
                    }
                </div>
            </div>
            <div className="grid col-span-4 md:grid-cols-3 md:col-span-3 gap-4">
                <div className={`col-span-1 ${cssBlock}`}>
                    <ImpactTitle title="Removed Tons" value={`t ${impacts.removed_tons.toLocaleString('en')}`} />
                </div>
                <div className={`col-span-1 ${cssBlock}`}>
                    <ImpactTitle title="Protected Forest (hectares)" value={`Ha ${impacts.protected_forest.toLocaleString('en')}`} />
                </div>
                <div className={`col-span-1 ${cssBlock}`}>
                    <ImpactTitle title="Protected Species" value={`# ${impacts.protected_species}`} />
                </div>
            </div>
            <div className={`col-span-4 md:row-span-2 md:col-span-3 ${cssBlock} bg-impact-report relative overflow-hidden`}>
                <img className="absolute bottom-[-55%] right-[-2%] w-[90%] h-full object-contain object-top rounded-2xl -rotate-6 md:object-cover md:bottom-[-50%] md:w-[54%] lg:bottom-[-33%] lg:w-[60%]" src="/assets/images/impact/bel.png" alt="impact-report" />
                <div className="lg:p-8">
                    <div className="text-neutral-50 font-bold text-2xl">See your <br/>full impact report</div>
                    <div className="mt-8 lg:mt-12">
                        <LinkSecondary href="#">Go to impact Report</LinkSecondary>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

function ImpactTitle({title, value}: {title: string, value: string}) {
    return (
        <>
            <div className="text-neutral-300 text-sm">{title}</div>
            <div className="text-neutral-50 text-xl font-bold mt-2">{value}</div>
        </>
    )
}