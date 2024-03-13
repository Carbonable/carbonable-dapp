import LeaderboardTable from "~/components/Leaderboard/LeaderboardTable";
import Title from "~/components/Leaderboard/Title";
import HeaderPersonal from "~/components/Leaderboard/HeaderPersonal";
import PersonalRanking from "~/components/Leaderboard/PersonalRanking";
import { type V2_MetaFunction } from "@remix-run/node";
import { LeaderboardSource } from "~/utils/constant";


export const meta: V2_MetaFunction = () => {
    return [
        { title: "Leaderboard - Carbonable - Provable Nature Restoration" },
        { name: "description", content:"Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { name: "image", content: "https://carbonable.github.io/socials/leaderboard.jpg"},
        { property: 'og:url', content:"https://app.carbonable.io/leaderboard"},
        { property: 'og:type', content: "website"},
        { property: 'og:title', content: "Leaderboard - Carbonable - Provable Nature Restoration"},
        { property: 'og:description', content: "Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { property: 'og:image', content: "https://carbonable.github.io/socials/leaderboard.jpg"},
        { property: 'twitter:domain', content: "carbonable.io"},
        { property: 'twitter:url', content: "https://app.carbonable.io/leaderboard"},
        { property: 'twitter:title', content: "Leaderboard - Carbonable - Provable Nature Restoration"},
        { property: 'twitter:description', content: "Nature-based Solutions Portfolio Management reinvented. Source, Fund, Drive, and Monitor Provable Ecological Restoration. Powered by Blockchain Technology."},
        { property: 'twitter:card', content: "summary_large_image"},
        { property: 'twitter:image', content: "https://carbonable.github.io/socials/leaderboard.jpg"}
    ]
};

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
                            <HeaderPersonal
                                source={LeaderboardSource.GLOBAL}
                            />
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