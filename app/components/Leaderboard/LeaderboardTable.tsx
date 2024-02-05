import { UserGroupIcon } from "@heroicons/react/24/outline";
import Pagination from "../Common/Pagination";
import { RankingLine } from "../Common/Table/RankingLine";

export default function LeaderboardTable() {
    const currentPage = 1;
    const pagination = {
        total_page: 1000
    }
    const handlePageClick = (page: number) => {
        console.log(page);
    }

    return (
        <>
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll">
                <table className="table-auto text-left min-w-full border-separate rounded-xl border-spacing-0 leader-table">
                    <thead className="bg-neutral-800 text-neutral-100 whitespace-nowrap h-10">
                        <tr className="table-style text-neutral-200 ">
                            <th className="px-4 sticky left-0 z-10 bg-neutral-800 font-light border border-opacityLight-10 rounded-tl-xl">
                                <div className="flex items-center">
                                    <UserGroupIcon className="h-5 w-5 mr-2" />
                                    567654 users
                                </div>
                            </th>
                            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Funding</th>
                            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Farming</th>
                            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Other</th>
                            <th className="px-4 font-light border-b border-r border-t border-opacityLight-10 rounded-tr-xl">Total w/ Boost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableResult resultsPerPage={10} />
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination 
                    currentPage={currentPage}
                    pageCount={pagination?.total_page} 
                    handlePageClick={handlePageClick}
                />
            </div>
        </>
    )
}

function TableResult({resultsPerPage}: {resultsPerPage: number}) {
    const lines = Array.from(Array(resultsPerPage).keys());
    const points = 1244;
    return (
        <>
            {lines.map((line: number, index: number) => {
                return (
                    <RankingLine index={index} points={points} key={`ranking_${line}`} />
                )
            })}
        </>
    )
}