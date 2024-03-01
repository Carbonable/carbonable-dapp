import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useProject } from "../ProjectWrapper";
import { useQuery } from "@apollo/client";
import { GET_BOOST_FOR_WALLET } from "~/graphql/queries/boost";
import { useEffect, useMemo } from "react";
import { useAccount } from "@starknet-react/core";
import { NavLink } from "@remix-run/react";

export default function BoostAndPoints() {
    const { quantity, boost, setBoost, project, launchpad } = useProject();
    
    const quantityBoostValue = useMemo(() => {
        if (boost === undefined) return 0;
        return parseInt(boost.boost) / 100;
    }, [boost]);

    const milestoneBoostValue = useMemo(() => {
        if (project?.current_milestone?.boost === undefined) return 0;

        return parseFloat(project?.current_milestone.boost);
    }, [project]);

    const { address } = useAccount();
    const { error, data, refetch } = useQuery(GET_BOOST_FOR_WALLET, {
        variables: {
            wallet_address: address ? address : "",
            value_to_buy: quantity ? quantity : 0,
            address: "",
            slot: 1
        }
    });

    useEffect(() => {
        if (quantity === null || address === undefined) return;

        refetch({
            wallet_address: address,
            value_to_buy: quantity,
            address: "",
            slot: 1
        });
    }, [quantity, address]);

    useEffect(() => {
        if (data) {
            setBoost(data.boostForWallet);
        }
    }, [data]);

    if (error) {
        console.error(error);
    }

    if (launchpad.is_sold_out) return (
        <div className="w-full rounded-xl relative bg-mint-boost">
            <div className="absolute inset-0 bg-mint-boost-overlay rounded-xl"></div>
            <div className="pl-4 pr-2 py-2 text-neutral-100 relative z-10 flex items-center w-full flex-wrap lg:flex-nowrap">
                <div className="order-1 pr-3">
                    Check your points on the <NavLink className="text-greenish-500 underline" to="/leaderboard">leaderboard</NavLink>
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

    return (
        <div className="w-full rounded-xl relative bg-mint-boost">
            <div className="absolute inset-0 bg-mint-boost-overlay rounded-xl"></div>
            <div className="pl-4 pr-2 py-2 text-neutral-100 relative z-10 flex items-center w-full flex-wrap lg:flex-nowrap">
                <div className="order-1 pr-3 border-r border-opacityLight-10 flex items-center">
                    {milestoneBoostValue && milestoneBoostValue > 0 && 
                        <img src={`/assets/images/leaderboard/boost_${milestoneBoostValue}.svg`} alt="Boost" className="w-24" />
                    }
                    {quantityBoostValue > 0 && 
                        <img src={`/assets/images/leaderboard/boost_${quantityBoostValue}.svg`} alt="Boost" className="w-24 ml-2" />
                    }
                </div>
                <div className="pl-1 lg:pl-3 mt-1 lg:mt-0 font-light uppercase text-xs flex items-center order-3 lg:order-2 flex-grow">
                    <span>Earn </span>
                    <span className="ml-2 py-1 px-2 bg-opacityLight-10 rounded-md flex items-center text-sm">
                        <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 md:mr-1 mr-2" />
                        {(boost?.total_score ? parseFloat(boost.total_score) : 1) * (milestoneBoostValue > 0 ? milestoneBoostValue : 1)} points
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