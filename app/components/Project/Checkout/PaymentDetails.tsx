import { type Token } from "~/types/tokens";
import { useProject } from "../ProjectWrapper";
import { useMemo } from "react";

export default function PaymentDetails({ selectedToken, conversionRate, finalTokenAmount, priceInUsd, avnuFees }: { selectedToken: Token, conversionRate: string, finalTokenAmount: number | string, priceInUsd: string, avnuFees: number | undefined}) {
    const { boost, project } = useProject();
    const quantityBoostValue = useMemo(() => {
        if (boost === undefined) return 0;
        return parseInt(boost.boost) / 100;
    }, [boost]);

    const milestoneBoostValue = useMemo(() => {
        if (project?.current_milestone?.boost === undefined) return 0;

        return parseFloat(project?.current_milestone.boost);
    }, [project]);

    return (
        <div className="border rounded-lg border-opacityLight-20">
            <div className="flex justify-between bg-opacityLight-5 py-2 px-3">
                <div className="uppercase text-sm flex-grow">Payment details</div>
            </div>
            <div className="py-4 px-6 border-t border-opacityLight-20">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-left">
                        Conversion rate
                    </div>
                    <div className="text-sm text-right text-neutral-300 font-light">
                        1 SHARE {selectedToken.symbol === 'USDC' ? <span>=</span> : <span>&cong;</span>} {conversionRate} {selectedToken.symbol}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-left">
                        Swap fees
                    </div>
                    <div className="text-sm text-right text-neutral-300 font-light">
                        {avnuFees === undefined ? 'None' : '$' + avnuFees.toFixed(2)}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-left flex items-center">
                        Points
                        {milestoneBoostValue && milestoneBoostValue !== 0 && 
                            <img src={`/assets/images/leaderboard/boost_${milestoneBoostValue}.svg`} alt="Boost" className="w-18 ml-2" />
                        }
                        {quantityBoostValue > 0 && 
                            <img src={`/assets/images/leaderboard/boost_${quantityBoostValue}.svg`} alt="Boost" className="w-18 ml-1" />
                        }
                    </div>
                    <div className="text-sm text-right text-neutral-300 font-light">
                        {(boost?.total_score ? parseFloat(boost.total_score) : 1) * (milestoneBoostValue > 0 ? milestoneBoostValue : 1)}
                    </div>
                </div>
            </div>
            <div className="flex justify-between py-3 px-6 border-t border-opacityLight-20">
                <div className="text-sm text-left">
                    Price 
                    {selectedToken.powered_by !== undefined && 
                        <span className="text-xs text-neutral-200"> (inc. fees)</span>
                    }
                </div>
                <div className="text-sm text-right text-neutral-300 font-light">
                    {typeof finalTokenAmount === 'number' ? finalTokenAmount.toFixed(2) : finalTokenAmount} {selectedToken.symbol} {finalTokenAmount !== 'n/a' && <span>(&cong; ${priceInUsd})</span>}
                </div>
            </div>
        </div>
    )
}