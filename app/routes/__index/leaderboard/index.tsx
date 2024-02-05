import LeaderboardTable from "~/components/Leaderboard/LeaderboardTable";
import Title from "~/components/Leaderboard/Title";
import HeaderPersonal from "~/components/Leaderboard/HeaderPersonal";
import PersonalRanking from "~/components/Leaderboard/PersonalRanking";

export default function Leaderboard() {
    return (
        <>
            <div className="w-full bg-leaderboard py-12">
                <div className="mx-auto px-4 md:w-10/12 2xl:w-9/12 2xl:max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="flex items-center">
                            <Title />
                        </div>
                        <div className="flex items-center mt-12 md:mt-0 md:justify-end">
                            <HeaderPersonal />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-4 md:w-10/12 2xl:w-9/12 2xl:max-w-6xl my-12">
                <div>
                    <PersonalRanking />
                </div>
                <div className="mt-8">
                    <LeaderboardTable />
                </div>
            </div>
        </>
    )
}