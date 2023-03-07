export default function BannerKPI({title, value}: {title: string, value: string}) {
    return (
        <div className="flex flex-col items-start justify-start text-neutral-100 font-trash">
            <h1 className="font-bold uppercase text-xs md:text-sm lg:text-lg">{title}</h1>
            <div className="text-2xl mt-3 lg:text-4xl">{value}</div>
        </div>
    )
}
