import { type Maybe } from "graphql/jsutils/Maybe";

export default function FormattedBoosts({ boosts }: { boosts: Maybe<string> | undefined }) {
    if (!boosts) {
        return null;
    }

    const boostArray = boosts.split(' // ');

    return (
        <>
            {boostArray.map((boost, index) => (
                <div key={index} className={index > 0 ? "pt-1" : ""}><BoostImage boost={boost} /></div>
            ))}
        </>
    )
}

function BoostImage({ boost }: { boost: string }) {
    const boostMultiplier = boost.substring(0, 4);
    const boostMapping = {
        'x6.0': '6',
        'x5.0': '5',
        'x4.0': '4',
        'x3.0': '3',
        'x2.0': '2',
        'x1.5': '1.5',
        'x1.2': '1.2',
        'x1.1': '1.1',
    };

    // @ts-ignore
    const finalValue = boostMapping[boostMultiplier];
    if (!finalValue) {
        return null;
    }

    return (
        <img src={`/assets/images/leaderboard/boost_${finalValue}.svg`} alt={boost} className="w-24" />
    )
}