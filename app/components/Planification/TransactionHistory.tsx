import { ChevronDownIcon } from "@heroicons/react/24/outline"

export default function TransactionHistory({transactions}: {transactions: any[]}) {
    return (
        <div className="mt-4 w-full font-inter text-neutral-100 text-sm">
            <div className="grid grid-cols-4 bg-neutral-500 gap-2 p-2">
                <div>Date</div>
                <div>Source</div>
                <div>Quantity</div>
                <div>Type</div>
            </div>
            {transactions.map((transaction: any, idx: number) => {
                return (
                    <div key={`transaction_${idx}`} className="grid grid-cols-4 gap-2 p-2 border-b border-neutral-500">
                        <div>{transaction.date}</div>
                        <div className="text-neutral-50">{transaction.source}</div>
                        <div>{parseInt(transaction.quantity).toLocaleString('en')}</div>
                        <div>{transaction.type}</div>
                    </div>
                )
            })}
            <div className="mt-8 flex items-center justify-center text-neutral-300 font-bolder cursor-pointer hover:text-neutral-200">
                Show more <ChevronDownIcon className=" ml-3 w-4" />
            </div>
        </div>
    )
}