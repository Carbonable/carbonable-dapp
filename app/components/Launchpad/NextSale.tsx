import { NavLink } from "@remix-run/react";
import { TransparentInsideLinkButton } from "../Buttons/LinkButton";
import ProjectStatus from "../Common/ProjectStatus";

export default function NextSale({ displayHeader }: { displayHeader: boolean }) {
    if (!displayHeader) return null;

    return (
        <NavLink to='/launchpad/mangroves-regeneration-karathuru-myanmar'>
            <div className="relative w-full md:w-11/12 mx-auto bg-karathuru rounded-lg md:px-10 bg-no-repeat bg-cover bg-center min-h-[360px] border-4 border-neutral-700">
                <div className="absolute bottom-6 md:bottom-12 left-0 w-full">
                    <div className="flex w-full items-end px-8 flex-wrap">
                        <div className="text-left w-full">
                            <div className="text-3xl font-bold">Karathuru Project</div>
                            <div className="text-sm font-medium flex items-center mt-1">
                                By 
                                <div className="text-neutral-200 font-normal ml-1">Worldview International Foundation</div>
                                <div className="ml-1">
                                    <img src="/assets/images/common/verified-icon.svg" alt="Verified Icon" className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="text-sm font-medium ">
                                Pre-Register to access this exclusive funding opportunity
                            </div>
                            <div className="mt-4 flex justify-between flex-wrap items-center">
                                <div className="text-left w-full md:w-fit">
                                    <ProjectStatus />
                                </div>
                                <div className="w-full mt-8 text-left md:w-fit md:flex-grow md:mt-0 md:text-right">
                                    <TransparentInsideLinkButton href="/launchpad/mangroves-regeneration-karathuru-myanmar">View Project &gt;</TransparentInsideLinkButton>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </NavLink>
    )
}