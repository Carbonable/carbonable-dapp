import { type Token } from "~/types/tokens";

export default function PaymentDetails({ selectedToken }: { selectedToken: Token }) {
    const boost = 2;
    return (
        <div className="border rounded-lg border-opacityLight-20">
            <div className="flex justify-between bg-opacityLight-5 py-2 px-4">
                <div className="uppercase text-sm flex-grow">Payment details</div>
            </div>
            <div className="py-4 px-6 border-t border-opacityLight-20">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-left">
                        Conversion rate
                    </div>
                    <div className="text-sm text-right text-neutral-300 font-light">
                        1 USDC = 1 SHARE
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
                <div className="text-sm text-left">Price</div>
                <div className="text-sm text-right text-neutral-300 font-light">
                    $1620
                </div>
            </div>
        </div>
    )
}