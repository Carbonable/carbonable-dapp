export function CustomLegend({ payload }: any) {
    return (
        <ul className="flex justify-start items-center overflow-x-scroll">
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} className="flex items-center border border-neutral-500 text-neutral-300 text-xs py-1 px-3 rounded-full min-w-fit ml-0 mr-2">
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}</span>
                </li>
            ))}
        </ul>
    );
}