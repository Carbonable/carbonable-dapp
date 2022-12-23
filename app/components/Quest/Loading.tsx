export default function Loading({ color="sky" }) {
    return <span className="flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`}></span>
        <span className={`"relative inline-flex rounded-full h-3 w-3 bg-${color}-500`}></span>
    </span>
}