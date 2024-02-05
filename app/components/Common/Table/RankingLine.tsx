export function RankingLine({ index, points }: { index: number, points: number }) {
    return (
        <tr className="h-[36px] first:rounded-bl-xl last:rounded-br-xl">
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l sticky left-0 z-10 bg-neutral-800 w-[220px]">
                <div className="flex items-center">
                    <div className={`text-neutral-200 font-light ${index < 100 ? 'min-w-[14px]' : 'min-w-[22px]' }`}>{index + 1}</div>
                    <div className="ml-1 mr-2 min-w-[28px]">
                        { index === 0 && <>🥇</> }
                        { index === 1 && <>🥈</> }
                        { index === 2 && <>🥉</> }
                    </div>
                    <div className="text-neutral-50">wallet address</div>
                </div>
            </td>
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4 border-r border-b border-opacityLight-10 first:border-l w-[160px]">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-50 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
        </tr>
    )
}

export function PersonalRankingLine({ index, points }: { index: number, points: number }) {
    return (
        <tr className="h-[36px]">
            <td className="px-4 sticky left-0 z-10 bg-neutral-700 w-[220px]">
                <div className="flex items-center">
                    <div className="text-neutral-200 font-light min-w-[14px]">{index + 1}</div>
                    <div className="ml-1 mr-2 min-w-[28px]">
                        { index === 0 && <>🥇</> }
                        { index === 1 && <>🥈</> }
                        { index === 2 && <>🥉</> }
                    </div>
                    <div className="text-neutral-50">wallet address</div>
                </div>
            </td>
            <td className="px-4">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-200 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
            <td className="px-4 w-[160px]">
                <div className="flex items-center">
                    <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-2" />
                    <div className="text-neutral-50 font-light">{points.toLocaleString('en-US').replace(/,/g, ' ')}</div>
                </div>
            </td>
        </tr>
    )
}