import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import FarmingCard from "~/components/Farming/FarmingCard";
import FilterButton from "~/components/Filters/FilterButton";
import { GRAMS_PER_TON } from "~/utils/constant";
import { shortenNumber, shortenNumberWithDigits } from "~/utils/utils";

export const loader: LoaderFunction = async () => {
    try {
        const allFarms = await fetch(`${process.env.INDEXER_URL}/farming/list`, {});
        const allFarmsJson = await allFarms.json();

        return json([allFarmsJson]);
    } catch (e) {
        console.error(e);
        return json({});
    }
};

export default function FarmingIndex() {
    const loaderData = useLoaderData();
    const projects: any[] = loaderData[0].data;
    const connectedGlobalFetcher = useFetcher();
    const { address, isConnected } = useAccount();
    const [myFarmingAssets, setMyFarmingAssets] = useState('-');
    const [claimableAssets, setClaimableAssets] = useState('-');
    const [releasableAssets, setReleasableAssets] = useState('-');
    const fetcher = useFetcher();
    const [portfolio, setPortfolio] = useState([] as any);
    
    useEffect(() => {
        if (isConnected) {
            fetcher.load(`/portfolio/load?wallet=${address}`);
            connectedGlobalFetcher.load(`/farming/list/global?wallet=${address}`);
        }
    }, [address, isConnected]);

    // Set portfolio data when data is loaded
    useEffect(() => {
        if (isConnected && fetcher.data !== undefined) {
            setPortfolio(fetcher.data.data.projects);
        }
    }, [fetcher, isConnected]);

    useEffect(() => {
        if (isConnected && connectedGlobalFetcher.data !== undefined) {
            if(connectedGlobalFetcher.data === 404 || connectedGlobalFetcher.data.length === 0) {
                setMyFarmingAssets('0');
                setClaimableAssets('0');
                setReleasableAssets('0');
                return;
            }
            const data = connectedGlobalFetcher.data.data;
            isNaN(data?.total_investment.displayable_value) ? setMyFarmingAssets('0') : setMyFarmingAssets(shortenNumber(parseFloat(data?.total_investment.displayable_value)));
            isNaN(data?.total_yielder_claimable.displayable_value) ? setClaimableAssets('0') : setClaimableAssets(shortenNumberWithDigits(parseFloat(data?.total_yielder_claimable.displayable_value), 6));
            isNaN(data?.total_offseter_claimable.displayable_value) ? setReleasableAssets('0') : setReleasableAssets(shortenNumberWithDigits(parseFloat(data?.total_offseter_claimable.displayable_value) / GRAMS_PER_TON, 6));
        }
    }, [connectedGlobalFetcher, isConnected]);

    const filterButtons = [
        {
            filter: 'All',
            active: true,
            isDisabled: false
        },
        {
            filter: 'My projects',
            active: false,
            isDisabled: true
        },
        {
            filter: 'Undeposited',
            active: false,
            isDisabled: true
        },
        {
            filter: 'Claimable',
            active: false,
            isDisabled: true
        }
    ];

    const handleclick = (filter: string) => {
        console.log(filter);
    }

    return (
        <div className="mx-auto md:mt-12 lg:mt-6 max-w-7xl">
            <div className="relative w-11/12 mx-auto border border-neutral-700 bg-farming bg-cover bg-[50%_22%] rounded-3xl p-8 flex items-start justify-start flex-wrap md:p-10 lg:p-12">
                <div className="flex items-start justify-center flex-wrap w-full md:w-5/12 md:justify-start">
                    <div className="font-trash uppercase w-full lg:text-lg text-center md:text-left">My farming assets</div>
                    <div className="font-americana text-4xl mt-4 text-neutral-200 font-extrabold"><span className='mr-2 text-3xl'>$</span>{myFarmingAssets}</div>
                </div>
                <div className="flex items-start justify-center flex-wrap w-full mt-8 md:w-5/12 md:mt-0 md:justify-start">
                    <div className="font-trash uppercase w-full lg:text-lg text-center md:text-left">Claimable assets</div>
                    <div className="font-americana text-4xl mt-4 text-neutral-200 font-extrabold flex items-center"><span className='mr-2 text-3xl'>$</span>{claimableAssets}<span className="font-inter font-extralight text-lg px-4">|</span><span className='mr-2 text-3xl'>t</span>{releasableAssets}</div>
                </div>
                <img src="/assets/images/common/logo-grey.svg" alt="Carbonable logo grey" className="absolute bottom-0 right-12 w-[100px] xl:right-20 lg:w-[110px]" />
            </div>
            <div className="relative w-11/12 mx-auto mt-12 lg:mt-12 xl:mt-16 mb-12 md:pl-6">
                <div className="uppercase font-trash text-lg text-center md:text-left md:pl-1 lg:text-xl">Farming Projects</div>
                <div className="items-center justify-start mt-4">
                    {
                        filterButtons.map((button, index) => {
                            return <FilterButton onClick={() => {handleclick(button.filter)}} active={button.active} key={index} disabled={button.isDisabled}>{button.filter}</FilterButton>
                        })
                    }
                </div>
                <div className="flex flex-wrap justify-start mt-8 gap-8 w-full">
                    {
                        projects.map((project, index) => {
                            return (
                                <FarmingCard project={project} key={index} portfolio={portfolio} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}