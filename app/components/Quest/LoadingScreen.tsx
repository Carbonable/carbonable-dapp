import Loading from "./Loading"

export default function LoadingScreen({ color="green" }) {
    return <div className="fixed top-0 left-0 bg-black w-screen h-screen z-20 bg-opacity-80">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded" role="alert">
            <Loading color={color} />
        </div>
    </div>
}