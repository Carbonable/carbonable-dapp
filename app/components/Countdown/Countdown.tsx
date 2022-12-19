import type moment from "moment";

// Definition: interface CountdownItemInterface
interface CountdownItemInterface {
    textTop: string,
    textBottom: string
}

/**
 * 
 * @param textTop: string
 * @param textBottom: string
 * @returns JSX.Element
 */

function CountdownItem({textTop, textBottom}: CountdownItemInterface) {
    return (
        <div className="text-center min-w-[56px] lg:min-w-[62px]">
            <div className="font-trash text-3xl uppercase mt-4 text-transparent bg-clip-text bg-blue lg:text-4xl">
                {parseInt(textTop) < 10 ? "0" + textTop : textTop}
            </div>
            <div className="font-inter text-neutral-400">
                {textBottom}
            </div>
        </div>
    )
}
/**
 * 
 * @returns JSX.Element
 */
function CountdownSeparator() {
    return (
        <div className="text-center">
            <div className="font-trash text-3xl uppercase mt-4 text-transparent bg-clip-text bg-blue px-2 lg:text-4xl">
                :
            </div>
            <div className="font-inter text-neutral-400"></div>
        </div>
    )
}

/**
 * @param countdown: moment.Duration
 * @returns JSX.Element
 */

export default function Countdown({countdown}: {countdown: moment.Duration}) {
    return (
        <div className="flex">
            <CountdownItem textTop={countdown.days().toString()} textBottom="DD" />
            <CountdownSeparator />
            <CountdownItem textTop={countdown.hours().toString()} textBottom="HH" />
            <CountdownSeparator />
            <CountdownItem textTop={countdown.minutes().toString()} textBottom="MM" />
            <CountdownSeparator />
            <CountdownItem textTop={countdown.seconds().toString()} textBottom="SS" />
        </div>
    )
}