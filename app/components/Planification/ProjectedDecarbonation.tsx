import { shortenNumber } from "~/utils/utils"
import Pagination from "../Common/Pagination"

export default function ProjectedDecarbonation({projections}: {projections: any[]}) {
    const handlePageClick = (data: any) => {

    }
    return (
        <>
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap">
                        <tr className="table-style">
                            <th>Time Period</th>
                            <th>Emission</th>
                            <th>Received CC</th>
                            <th>Purchased CC</th>
                            <th>Retired CC</th>
                            <th>Target</th>
                            <th>Delta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projections.map((projection: any, idx: number) => {
                            return (
                                <tr key={`projection_${idx}`} className={`border-b border-neutral-500 hover:bg-neutral-600 ${projection.time_period < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                                    <td>{projection.time_period}</td>
                                    <td>{shortenNumber(projection.emission)}t</td>
                                    <td>{shortenNumber(projection.received_cc)}t</td>
                                    <td>{shortenNumber(projection.purchased_cc)}t</td>
                                    <td>{shortenNumber(projection.retired_cc)}t</td>
                                    <td>{projection.target}%</td>
                                    <td className={getDeltaColor(projection.delta, projection.time_period)}>{projection.delta > 0 ? `+${projection.delta}` : projection.delta }%</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination pageCount={10} handlePageClick={handlePageClick} />
            </div>
        </>
    )
}

function getDeltaColor(delta: number, period: number): string {
    if (period > new Date().getFullYear()) {
        return 'text-neutral-200'
    }

    if (delta === 0) {
        return 'text-neutral-100'
    }

    return delta > 0 ? 'text-greenish-500' : 'text-darkRed'
}