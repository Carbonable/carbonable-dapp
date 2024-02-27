import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useProject } from "../ProjectWrapper";
import { useQuery } from "@apollo/client";
import { GET_BOOST_FOR_WALLET } from "~/graphql/queries/boost";
import { useEffect } from "react";
import { useAccount } from "@starknet-react/core";

export default function BoostAndPoints() {
    const { launchpad, quantity, boost, setBoost } = useProject();
    const { address } = useAccount();
    const { error, data, refetch } = useQuery(GET_BOOST_FOR_WALLET, {
        variables: {
            wallet_address: address,
            value_to_buy: quantity,
            address: "",
            slot: 1
        }
    });

    useEffect(() => {
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

    return (
        <div className="w-full rounded-xl relative bg-mint-boost">
            <div className="absolute inset-0 bg-mint-boost-overlay rounded-xl"></div>
            <div className="pl-4 pr-2 py-2 text-neutral-100 relative z-10 flex items-center w-full flex-wrap lg:flex-nowrap">
                <div className="order-1 pr-3 border-r border-opacityLight-10">
                    {boost === undefined && <img src={`/assets/images/leaderboard/boost_1.1.svg`} alt="Boost" className="w-24" />}
                    {boost && <img src={`/assets/images/leaderboard/boost_${boost.boost}.svg`} alt="Boost" className="w-24" />}
                </div>
                <div className="pl-1 mt-1 lg:mt-0 lg:pl-3 font-light uppercase text-xs flex items-center order-3 lg:order-2 flex-grow">
                    { launchpad.is_sold_out && <span>You would have earned a total of </span> }
                    { !launchpad.is_sold_out && <span>You would earn a total of </span> }
                    <span className="ml-2 py-1 px-2 bg-opacityLight-10 rounded-md flex items-center text-sm">
                        <img src="/assets/images/leaderboard/points.svg" alt="points" className="h-3 w-3 md:mr-1 mr-2" />
                        {boost?.total_score} points
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