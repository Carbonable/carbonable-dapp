export default function TableLoading({resultsPerPage, numberOfColumns}: {resultsPerPage: number, numberOfColumns: number}) {
    const lines = Array.from(Array(resultsPerPage).keys());
    const colums = Array.from(Array(numberOfColumns).keys());
    return (
        <>
            {lines.map((line: number) => {
                return (
                    <tr className="h-[24px] first:rounded-bl-xl last:rounded-br-xl" key={`loader_${line}`}>
                        { colums.map((column: number) => {
                            return (
                                <td className="animate-pulse bg-neutral-700/25 px-4 border-r border-b border-opacityLight-10 first:border-l" key={`loader_${line}_${column}`}></td>
                            )
                        })}
                    </tr>
                )
            })}
        </>
    )
}