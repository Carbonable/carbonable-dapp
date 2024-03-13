import { useQuery } from "@apollo/client";
import { type Maybe } from "graphql/jsutils/Maybe";
import { useEffect, useState } from "react";
import { type PointDetails } from "~/graphql/__generated__/graphql";
import { GET_MY_RANK } from "~/graphql/queries/leaderboard";

export default function History({ walletAddress }: { walletAddress: string }) {
    const [points, setPoints] = useState<PointDetails[] | undefined>(undefined);
    const { error, data } = useQuery(GET_MY_RANK, {
        variables: {
            wallet_address: walletAddress
        }
    });

    useEffect(() => {
        if (data) {
            setPoints(data.leaderboardForWallet.points);
        }
    }, [data]);

    if (error) {
        console.error('Error fetching my score', error);
    }

    return (
        <>
            <div className="flex items-center justify-between font-medium text-neutral-100">
                <div className="text-left">
                    Your leaderboard history
                </div>
            </div>
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll">
                <table className="table-auto text-left min-w-full border-separate rounded-xl border-spacing-0 leader-table">
                    <thead className="bg-neutral-800 text-neutral-100 whitespace-nowrap h-10">
                        <HistoryHeader />
                    </thead>
                    <tbody>
                        <HistoryResult points={points} />
                    </tbody>
                </table>
            </div>
        </>
    )
}

function HistoryHeader() {
    return (
        <tr className="table-style text-neutral-200">
            <th className="px-4 sticky left-0 z-10 bg-neutral-800 font-light border border-opacityLight-10 rounded-tl-xl">
                Date
            </th>
            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Project</th>
            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Action</th>
            <th className="px-4 font-light border-r border-b border-t border-opacityLight-10">Boosts</th>
            <th className="px-4 font-light border-b border-r border-t border-opacityLight-10 rounded-tr-xl">Total w/ Boost</th>
        </tr>
    )
}

function HistoryResult({points}: {points: PointDetails[] | undefined}) {
    if (!points) {
        return (
            <tr>
                <td colSpan={4} className="text-neutral-200 font-light text-center">
                    No data
                </td>
            </tr>
        )
    }
    
    return (
        <>
            {points.map((point, index) => (
                <tr key={index} className={`first:rounded-bl-xl last:rounded-br-xl`}>
                    <td className={`px-4 py-2 border-r border-b border-opacityLight-10 first:border-l sticky left-0 z-10 bg-neutral-800`}>
                        <FormattedDate timestamp={point.metadata?.date} />
                    </td>
                    <td className="px-4 py-2 border-r border-b border-opacityLight-10 first:border-l">{point.metadata?.project_name}</td>
                    <td className="px-4 py-2 border-r border-b border-opacityLight-10 first:border-l">{point.metadata?.event}</td>
                    <td className="px-4 py-2 border-r border-b border-opacityLight-10 first:border-l"><FormattedBoosts boosts={point.metadata?.boosts} /></td>
                    <td className="px-4 py-2 border-r border-b border-opacityLight-10 text-right first:border-l">{point.value ? (point.value / Math.pow(10, 6)).toLocaleString('en-US').replace(/,/g, ' ') : ''}</td>
                </tr>
            ))}
        </>
    )
}

function FormattedDate({ timestamp }: { timestamp: Maybe<string> | undefined }) {
    if (!timestamp) {
        return (
            <>
                No date
            </>
        )
    }
    const timestampInMilliseconds = parseInt(timestamp);
    const date = new Date(timestampInMilliseconds);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed, so we add 1
    const day = date.getDate();

    return (
        <>
            {`${day}-${month}-${year}`}
        </>
    )
}

function FormattedBoosts({ boosts }: { boosts: Maybe<string> | undefined }) {
    if (!boosts) {
        return null;
    }

    const boostArray = boosts.split(' // ');

    return (
        <>
            {boostArray.map((boost, index) => (
                <div key={index} className={index > 0 ? "pt-1" : ""}>{boost}</div>
            ))}
        </>
    )
}