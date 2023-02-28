import { useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import { AssetsManagementContext } from "./Dialog";

export default function Management({context, tab}: {context: AssetsManagementContext, tab: string}) {
    const units = 1400;
    const available = 1400;
    const value = 2500;
    const [amount, setAmount] = useState(1);

    const handleAmountChange = (e: any) => {

        if (isNaN(e.target.value) || e.target.value < 0) {
            setAmount(1);
            return;
        }

        setAmount(e.target.value > available ? available : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value));
    }

    const handleSetMax = () => {
        setAmount(available);
    }

    const handleAction = () => {
        switch (context) {
            case AssetsManagementContext.DEPOSIT:
                console.log("Deposit");
                break;
            case AssetsManagementContext.WITHDRAW:
                console.log("Withdraw");
                break;
            case AssetsManagementContext.CLAIM:
                console.log("Claim");
                break;
        }
    }

    return (
        <div className="relative w-full">
            <AllocationContainer tab={tab} units={units} value={value} />
            <div className="mt-8 flex items-center justify-between font-light">
                <div className="text-left text-neutral-200 uppercase">Select Amount</div>
                <div className="text-right text-neutral-200 uppercase">Available <span className="text-neutral-50 font-bold ml-1">{available.toLocaleString('en')} UNITS</span></div>
            </div>
            <div className="mt-1 w-full relative">
                <input className={`bg-neutral-800 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300`} type="number" value={amount} name="amount" aria-label="Amount" min="1" step="1" onChange={handleAmountChange} />
                <div className="absolute right-4 top-3 text-neutral-300 cursor-pointer font-bold font-sm" onClick={handleSetMax}>MAX</div>
            </div>
            <div className="mt-8 px-8 py-6 bg-neutral-800 rounded-xl border border-opacityLight-10 text-left text-sm">Lorem Ipsum</div>
            <div className="w-full text-right my-8">
                <GreenButton className={`w-fit`} onClick={handleAction}>{context}</GreenButton>
            </div>
        </div>
    )
}

function AllocationContainer({tab, units, value}: {tab: string, units: number, value: number}) {
    const getTitle = () => {
        switch (tab) {
            case "Yield":
                return "Your Yield Allocation";
            case "Offset":
                return "Your Offset Allocation";
            default:
                return "Your CLAIMABLE offset";
        }
    }

    return (
        <div className={`relative w-full rounded-2xl py-4 px-6 text-left font-inter border border-opacityLight-10 ${tab === 'Yield' ? "bg-allocation-yield" : "bg-allocation-offset"}`}>
            <div className="text-sm uppercase text-neutral-300">{getTitle()}</div>
            <div className="text-lg font-bold text-neutral-100 mt-4">{units.toLocaleString('en')} UNITS</div>
            <div className="text-base font-bold text-neutral-300">≈ ${value.toLocaleString('en')}</div>
        </div>
    )
}