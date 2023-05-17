export default function InfiniteProgress() {
    return (
        <div className="bg-neutral-800 h-1 relative overflow-hidden">
            <div className="absolute inset-0 w-1/2 bg-greenish-500 infiniteProgress"></div>
        </div>
    )
}