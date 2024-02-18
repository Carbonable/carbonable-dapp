import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function BoostAndPoints() {
    const boost =  4;
    const points = 1670;

    return (
        <div className="w-full rounded-xl relative bg-mint-boost">
            <div className="absolute inset-0 bg-mint-boost-overlay rounded-xl"></div>
            <div className="pl-4 pr-2 py-2 text-neutral-100 relative z-10 flex items-center w-full flex-wrap lg:flex-nowrap">
                <div className="order-1 pr-3 border-r border-opacityLight-10">
                    <img src={`/assets/images/leaderboard/boost_${boost}.svg`} alt="Boost" className="w-24" />
                </div>
                <div className="pl-1 mt-1 lg:mt-0 lg:pl-3 font-light uppercase text-xs flex items-center order-3 lg:order-2 flex-grow">
                    You would earn a total of 
                    <span className="ml-2 py-1 px-2 bg-opacityLight-10 rounded-md flex items-center text-sm">
                        <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 mr-1" />
                        {points} points
                    </span> 
                </div>
                <div className="order-2 lg:order-3 w-max pl-3 lg:pl-0 pr-2">
                    <a href="https://carbonable.medium.com" target="_blank" rel="noreferrer" className="text-neutral-200 font-light uppercase hover:text-neutral-100 w-fit">
                        <span className="flex xl:hidden lg:justify-end"><QuestionMarkCircleIcon className="w-6" /></span>
                        <span className="hidden xl:flex items-center text-sm justify-end">Learn more <ChevronRightIcon className="ml-1 w-4" /></span>
                    </a>
                </div>
            </div>
        </div>
    )
}