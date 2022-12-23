interface Props {
    action: Function,
    strong: string,
    text: string
}

export default function ErrorMessage({ action, strong, text }: Props) {
    return <div className="fixed top-0 left-0 bg-black w-screen h-screen z-20 bg-opacity-80">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-2 bg-black w-96 text-red-500 px-5 py-4 rounded" role="alert">
            <strong className="font-bold">{strong}</strong>
            <span className="ml-1 block text-white/80">{text}</span>
            <button onClick={() => action()} className="font-inter text-white uppercase rounded-full mt-2 px-6 py-2 font-bold text-sm bg-red-500">Close</button>
        </div>
    </div>
}