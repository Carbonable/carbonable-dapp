import Loading from "./Loading"

interface Props {
    action: Function,
    strong: string,
    text: string,
    buttonText: string
}

export default function SuccessMessage({ action, strong, text, buttonText='Close' }: Props) {
    return <div className="fixed top-0 left-0 bg-black w-screen h-screen z-20 bg-opacity-80">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-2 bg-black w-96 text-green px-5 py-4 rounded" role="alert">
            <span className={`"relative inline-flex rounded-full h-3 w-3 bg-emerald-400`}></span>
            <strong className="font-bold ml-2">{strong}</strong>
            <span className="ml-1 block text-white/80">{text}</span>
            <button onClick={() => action && action()} className="font-inter text-white uppercase rounded-full mt-2 px-6 py-2 font-bold text-sm bg-green">{buttonText}</button>
        </div>
    </div>
}