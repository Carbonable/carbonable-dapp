import SecondaryButton from "../Buttons/ActionButton";

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
                <SecondaryButton>Find out more</SecondaryButton>
            </div>
        </div>
    )
}