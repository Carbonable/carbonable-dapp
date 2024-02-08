import { LEADERBOARD_MEDIUM } from "~/utils/constant";
import { LinkSecondary } from "../Buttons/LinkButton";

export default function Title() {
    return (
        <div className="block">
            <div className="text-neutral-100 font-semibold text-4xl">
                Leaderboard
            </div>
            <div className="text-neutral-200 text-sm mt-3">
                <p>Exclusive challenge for Carbonablers.</p>
                <p>Mint, Farm, Earn points, and win unique rewards.</p>
            </div>
            <div className="mt-6">
                <LinkSecondary href={LEADERBOARD_MEDIUM}>Find out more</LinkSecondary>
            </div>
        </div>
    )
}