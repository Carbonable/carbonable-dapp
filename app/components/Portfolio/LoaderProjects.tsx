export default function LoaderProjects() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="flex justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-4 md:col-span-1 w-full h-[96vw] md:h-[200px] xl:h-[240px]">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-4 md:col-span-1 w-full h-[96vw] md:h-[200px] xl:h-[240px] md:flex">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-4 md:col-span-1 w-full h-[96vw] md:h-[200px] xl:h-[240px] md:flex">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
            <div className="hidden justify-start items-center border-2 border-neutral-500 p-2 bg-transparent rounded-2xl col-span-4 md:col-span-1 w-full h-[96vw] md:h-[200px] xl:h-[240px] xl:flex">
                <div className="w-full h-full bg-neutral-500 rounded-2xl animate-pulse"></div>
            </div>
        </div>
    )
}