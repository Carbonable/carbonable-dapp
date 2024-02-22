import { type Token } from "~/types/tokens";

export default function PaymentDetails({ selectedToken, conversionRate, finalTokenAmount, priceInUsd }: { selectedToken: Token, conversionRate: string, finalTokenAmount: number | string, priceInUsd: string}) {
    const boost = 2;

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
                    <div className="text-sm text-left flex items-center">
                        Points
                        <img src={`/assets/images/leaderboard/boost_${boost}.svg`} alt="Boost" className="w-20 ml-2" />
                    </div>
                    <div className="text-sm text-right text-neutral-300 font-light">
                        1620
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