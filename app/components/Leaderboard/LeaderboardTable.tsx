import { UserGroupIcon } from "@heroicons/react/24/outline";
import Pagination from "../Common/Pagination";
import { RankingLine } from "../Common/Table/RankingLine";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LEADERBOARD } from "~/graphql/queries/leaderboard";
import { RESULT_PER_PAGE } from "~/utils/constant";
import type { LeaderboardLineData, PageInfo } from "~/graphql/__generated__/graphql";

export default function LeaderboardTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<PageInfo | undefined>(undefined);
    const [leaderboard, setLeaderboard] = useState<LeaderboardLineData[] | undefined>(undefined);
    const { loading, error, data, refetch } = useQuery(GET_LEADERBOARD, {
        variables: {
            pagination: {
                page: currentPage,
                limit: RESULT_PER_PAGE
            }
        }
    });

    useEffect(() => {
        refetch({
            pagination: {
                page: currentPage,
                limit: RESULT_PER_PAGE
            }
        });
    }, [currentPage]);

    useEffect(() => {
        if (data) {
            setLeaderboard(data.leaderboard.data);
            setPagination(data.leaderboard.page_info);
        }
    }, [data]);

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected + 1);
    }

    if (error)  {
        console.error(error);
    }

    return (
        <>
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll">
                <table className="table-auto text-left min-w-full border-separate rounded-xl border-spacing-0 leader-table">
                    <thead className="bg-neutral-800 text-neutral-100 whitespace-nowrap h-10">
                        <TableHeader userCount={pagination?.count} />
                    </thead>
                    <tbody>
                        <TableResult leaderboard={leaderboard} />
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination 
                    currentPage={currentPage}
                    pageCount={loading ? 1 :pagination?.max_page} 
                    handlePageClick={handlePageClick}
                />
            </div>
        </>
    )
}

function TableHeader({userCount}: {userCount: number | undefined}) {
    return (
        <tr className="table-style text-neutral-200 ">
            <th className="px-4 sticky left-0 z-10 bg-neutral-800 font-light border border-opacityLight-10 rounded-tl-xl">
                <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    {userCount} users
                </div>
            </th>
            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Funding</th>
            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Farming</th>
            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Other</th>
            <th className="px-4 font-light border-b border-r border-t border-opacityLight-10 rounded-tr-xl">Total w/ Boost</th>
        </tr>
    )
}

function TableResult({leaderboard}: {leaderboard: LeaderboardLineData[] | undefined}) {
    if (!leaderboard) {
        return (
            <tr>
                <td colSpan={5} className="text-neutral-200 font-light text-center">
                    No data
                </td>
            </tr>
        )
    }
    
    return (
        <>
            {leaderboard.map((line: LeaderboardLineData, index: number) => {
                return (
                    <RankingLine 
                        key={`ranking_${line.id}`} 
                        index={index}
                        data={line}
                        address={line.wallet_address}
                    />
                )
            })}
        </>
    )
}