import { GreenButton } from "../Buttons/ActionButton"
import Disconnected from "./Disconnected"
import LoaderProjects from "./LoaderProjects"
import ProjectsList from "./ProjectsList"

export default function PortfolioState({isConnected, state, projects, badges, reloadData, setReloadData, setRefreshData}:
    {isConnected: boolean | undefined, state: string, projects: any[], badges: any[], reloadData: boolean, setReloadData: any, setRefreshData: (b: boolean) => void}) {

    if (!isConnected) {
        return <Disconnected />
    }

    if (reloadData) {
        return (
            <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12">
                <div className="uppercase font-trash text-bold text-lg text-left md:pl-1 2xl:text-xl">My Assets</div>
                <GreenButton className="w-fit mt-2" onClick={() => setReloadData(false)}>Reload data</GreenButton>
            </div>
        )
    }

    return (
        <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12">
            <div className="uppercase font-trash text-bold text-lg text-left md:pl-1 2xl:text-xl">My Assets</div>
            {state === 'loading' && <LoaderProjects /> }
            {state !== 'loading' && <ProjectsList projects={projects} setRefreshData={setRefreshData} />}
        </div>
    )
}