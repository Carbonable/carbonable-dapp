import { IPFS_GATEWAY } from "~/utils/links"
import { ipfsUrl } from "~/utils/utils"

export default function FundingAllocation({allocations}: {allocations: any[]}) {

    return (
        <div className="mt-4 w-full font-inter text-sm overflow-x-scroll">
            <table className="table-auto text-left min-w-full">
                <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap">
                    <tr className="table-style">
                        <th>Project Name</th>
                        <th>Allocation</th>
                        <th>%</th>
                        <th>Available (t/y)</th>
                        <th>Allocated (t/y)</th>
                        <th>End Date</th>
                        <th># Blocks</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allocations.map((allocation: any, idx: number) => {
                        return (
                            <tr key={`projection_${idx}`} className="border-b border-neutral-500 hover:bg-neutral-600 items-center text-neutral-200 whitespace-nowrap">
                                <td>
                                    <div className="flex items-center justify-start text-neutral-100 w-max">
                                        <img src={IPFS_GATEWAY + ipfsUrl(allocation.image)} alt={`${allocation.project_name}`} className="w-[40px] rounded-lg" />
                                        <div className="ml-2">{allocation.project_name}</div>
                                    </div>
                                </td>
                                <td><AllocationBar percentage={allocation.allocation} /></td>
                                <td>{allocation.allocation}</td>
                                <td>{allocation.available}</td>
                                <td>{allocation.allocated}</td>
                                <td>{allocation.end_date}</td>
                                <td>{allocation.blocks}</td>
                                <td className="text-right pr-4 cursor-pointer text-neutral-200">...</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

function AllocationBar({percentage}: {percentage: number}) {
    return (
        <div className="w-full h-2 bg-blue rounded-lg">
            <div className="h-full bg-greenish-500 rounded-lg" style={{width: `${percentage}%`}}></div>
        </div>
    )
}