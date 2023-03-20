import { useEffect, useState } from "react";
import { shortenNumber } from "~/utils/utils";
import BannerKPI from "../../Common/BannerKPI";
import SecondaryButton from "../../Buttons/ActionButton";
import AllocationDetailDialog from "./AllocationDetail";
import AllocationKPI from "./AllocationKPI";
import CircleProgress from "./CircleProgress";

export default function Mapping({globalKPI, blocks, projects, addExAnteFetcher, addExPostFetcher}: {globalKPI: any, blocks: any[], projects: any[], addExAnteFetcher: any, addExPostFetcher: any}) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentBlock, setCurrentBlock] = useState<any>(null);

    const handleAddBlock = () => {
        console.log('add block');
    }

    const handleOpenDetail = (block: any) => {
        setCurrentBlock(block);
        setIsOpen(true);
    }

    useEffect(() => {
        if (!isOpen || !currentBlock) {
            return;
        }

        const newBlock = blocks.find((block: any) => block.id === currentBlock.id);
        setCurrentBlock(newBlock);

    }, [blocks]);


    return (
        <>
            <div className="relative w-full">
                <div className="relative w-full border border-neutral-700 bg-planification bg-cover bg-bottom rounded-3xl px-4 py-6 flex items-start justify-start flex-wrap md:p-10 lg:p-12">
                    <div className="grid grid-cols-3 gap-3 md:grid-cols-none md:grid-flow-col md:auto-cols-max md:gap-6 xl:gap-16">
                        <BannerKPI title="MY Net-zero objective" value={`${globalKPI.net_zero_objective}%`} />
                        <BannerKPI title="Missing contributions" value={`t ${globalKPI.missing_contributions}`} />
                    </div>
                    <img src="/assets/images/common/logo-transparent.svg" alt="Carbonable logo transparent" className="absolute bottom-0 right-12 w-[100px] xl:right-20 lg:w-[110px]" />
                </div>
                <div className="w-full mt-12">
                    <div className="flex justify-between items-center flex-wrap">
                        <div className="font-trash font-extrabold text-neutral-100 text-lg uppercase w-full md:w-fit">
                            decarbonisation map
                        </div>
                        <div className="text-right w-full mt-4 md:w-fit">
                            <SecondaryButton onClick={handleAddBlock}>Add block</SecondaryButton>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                        {blocks.map((block: any, idx: number) => (
                            <Block block={block} key={`block_${idx}`} handleOpenDetail={handleOpenDetail} />
                        ))}
                    </div>
                </div>
            </div>
            {currentBlock && <AllocationDetailDialog isOpen={isOpen} setIsOpen={setIsOpen} block={currentBlock} projects={projects} addExAnteFetcher={addExAnteFetcher} addExPostFetcher={addExPostFetcher} /> }
        </>
    )
}

function Block({block, handleOpenDetail}: {block: any, handleOpenDetail: any}) {
    return (
        <div className="border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover w-full p-4 xl:p-8 rounded-3xl cursor-pointer hover:brightness-[120%]" onClick={() => handleOpenDetail(block)}>
            <div className="flex justify-start items-end">
                <span className="text-2xl" role="img" aria-label="block icon">{block.icon}</span>
                <div className="ml-2 text-neutral-50 text-xl">{block.name}</div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-x-4 lg:gap-x-8">
                <AllocationKPI title="Yearly Emission" value={`${shortenNumber(block.yearly_emissions)} t`} />
                <AllocationKPI title="yearly contribution" value={`$${shortenNumber(block.yearly_contribution)}`} />
                <div className="w-full">
                    <CircleProgress value={block.total_consumption} over={block.yearly_emissions} size={52} bgColor="#29A46F" progressColor="#363840" />
                </div>
            </div>
            <div className="mt-8 w-full bg-neutral-600 rounded-full h-4 p-[4px] flex items-center justify-start">
                <Repartition block={block} />
            </div>
        </div>
    )
}

function Repartition({block}: {block: any}) {
    const allocationsList = block.allocations.concat(block.carbon_credit_purchased);
    const totalConsumption = allocationsList.map((totalAllocation: any) => totalAllocation.carbon_credit_allocated).reduce((acc: any, amount: any) => acc + amount);

    const AllocationPercentage = ({allocation, idx}: {allocation: any, idx: number}) => {
        const percentage = Math.round((allocation.carbon_credit_allocated / totalConsumption) * 100);
        return (
            <div 
                className={`${idx === 0 ? "rounded-l-full" : ""}
                            ${idx === allocationsList.length - 1 ? "rounded-r-full" : ""}
                            h-[10px]
                            `}
                style={{width: `${percentage}%`, backgroundColor: `${allocation.color}`}}
            >
            </div>
        )
    }

    return (
        <>
            {allocationsList.map((allocation: any, idx: number) => (
                <AllocationPercentage allocation={allocation} idx={idx} key={`allocation_${idx}`}  />
            ))}
        </>
    )
}