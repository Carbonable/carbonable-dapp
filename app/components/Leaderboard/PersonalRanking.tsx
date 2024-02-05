import { SparklesIcon } from "@heroicons/react/24/solid";
import { PersonalRankingLine } from "../Common/Table/RankingLine";

export default function PersonalRanking() {
    return (
        <>
            <div className="flex items-center justify-between font-medium text-neutral-100">
                <div className="text-left">
                    Your leaderboard position
                </div>
                <div className="text-right">
                    <a href="https://twitter.com/intent/tweet?text=Just%20migrated%20my%20%23CarbonableNFTs%20to%20%23CarbonableSFTs%20in%20one%20click%20%F0%9F%9A%80%0AEffortless%20switch!%20%0A%0A%F0%9F%8E%81%20Retro%20rewards%20are%20calling!%20%0A%E2%9C%85%20Counting%20down%20the%20moments%20to%20the%20official%20%40carbonable_io%20farming%20launch!%20%F0%9F%8C%B1%E2%9C%A8%20%0A%0ADon%27t%20miss%20out!%20Check%20out%20the%20original%20thread%20%F0%9F%A7%B5&url=https%3A%2F%2Fcarbonable.github.io%2Fsocials%2Fmigration%2F" 
                        className="hover:brightness-110 flex items-center"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Share your score
                        <SparklesIcon className="h-4 w-4 ml-1" />
                    </a>
                </div>
            </div>
            <div className="bg-neutral-700 rounded-lg py-4 mt-4 overflow-x-scroll border border-opacityLight-10">
                <table className="table-auto text-left min-w-full whitespace-nowrap border-spacing-0">
                    <tbody className="text-left">
                        <PersonalRankingLine index={0} points={1244} />
                    </tbody>
                </table>
            </div>
        </>
    )
}