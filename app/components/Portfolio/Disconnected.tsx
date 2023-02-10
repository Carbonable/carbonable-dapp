import ConnectButton from "../Connect/ConnectButton";

export default function Disconnected() {
    return (
        <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12">
            <div className="uppercase font-trash text-bold text-lg text-left 2xl:text-xl">My Assets</div>
            <div className="flex items-center justify-start flex-wrap">
                <div className="w-full md:w-fit">Connect your wallet to see your assets</div>
                <div className="mt-2 md:ml-4 md:mt-0"><ConnectButton /></div>
            </div>
        </div>
    )
}