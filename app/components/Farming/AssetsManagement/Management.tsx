import { useCallback, useEffect, useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import { AssetsManagementContext, AssetsManagementTabs } from "./Dialog";
import type { AssetsAllocationProps, ContractsProps } from "~/routes/__index/farming/$slug";
import { useNotifications } from "~/root";
import { useContractWrite } from "@starknet-react/core";
import _ from "lodash";
import { NotificationSource } from "~/utils/notifications/sources";
import { TxStatus } from "~/utils/blockchain/status";
import { getStarkscanUrl } from "~/utils/utils";

export default function Management({context, tab, assetsAllocation, contracts, project, setIsOpen}: 
    {context: AssetsManagementContext, tab: AssetsManagementTabs, assetsAllocation: AssetsAllocationProps | undefined, contracts: ContractsProps | undefined, project: any, setIsOpen: (b: boolean) => void}) {

    const [shares, setShares] = useState(assetsAllocation !== undefined ? parseFloat(assetsAllocation.total.displayable_value) : 0);
    const [available, setAvailable] = useState(assetsAllocation !== undefined ? parseFloat(assetsAllocation.undeposited.displayable_value) : 0);
    const [value, setValue] = useState(assetsAllocation !== undefined ? parseFloat(assetsAllocation.total.displayable_value) : 0);
    const [amount, setAmount] = useState(1);
    const [disclaimer, setDisclaimer] = useState("");
    const [callData, setCallData] = useState<any>({});
    const [txHash, setTxHash] = useState<string | undefined>("");
    const { notifs, setNotifs, defautlNetwork } = useNotifications();
    const [starkscanUrl, setStarkscanUrl] = useState(getStarkscanUrl(defautlNetwork.id));

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

    const { write, data: dataExecute } = useContractWrite(callData);

    const handleAction = useCallback(() => {
        switch (context) {
            case AssetsManagementContext.DEPOSIT:
                setCallData((cd: any) => {
                    // loop to create the calls
                    return {
                        calls: {
                            contractAddress: tab === AssetsManagementTabs.YIELD ? contracts?.yielder : contracts?.offseter,
                            entrypoint: 'deposit',
                            calldata: ['token_id', 0, amount, 0]
                        },
                        metadata: {
                            method: 'Deposit',
                            message: `Deposit in ${tab} farm`
                        }
                    }
                });
        
                write();
                break;
            case AssetsManagementContext.WITHDRAW:
                setCallData((cd: any) => {
                    return {
                        calls: {
                            contractAddress: tab === AssetsManagementTabs.YIELD ? contracts?.yielder : contracts?.offseter,
                            entrypoint: 1 > 0 ? 'withdrawTo' : 'withdrawToToken',
                            calldata: 1 > 0 ? [amount, 0] : ['token_id', 0, amount, 0]
                        },
                        metadata: {
                            method: 'Withdraw',
                            message: `Withdraw from ${tab} farm`
                        }
                    }
                });
                write();
                break;
            case AssetsManagementContext.CLAIM:
                setCallData((cd: any) => {
                    return {
                        calls: {
                            contractAddress: tab === AssetsManagementTabs.YIELD ? contracts?.yielder : contracts?.offseter,
                            entrypoint: 'claim',
                            calldata: [amount, 0]
                        },
                        metadata: {
                            method: 'Claim',
                            message: `Claim from ${tab} farm`
                        }
                    }
                });
                write();
                break;
        }
    }, [amount, tab, context]);

    useEffect(() => {
        setTxHash(dataExecute ? dataExecute.transaction_hash : "");
    }, [dataExecute]);

    useEffect(() => {
        // When txHash is set, add toast notification
        if (txHash !== undefined && txHash !== "" && _.find(notifs, (notification: any) => notification.txHash === txHash) === undefined) {
            setNotifs([...notifs, {
                txHash: txHash,
                project: project.id,
                source: NotificationSource.FARMING,
                txStatus: TxStatus.NOT_RECEIVED,
                message: {
                    title: `${_.camelCase(context)} in ${project.name} ${tab} farm`, 
                    message: 'Your transaction is ' + TxStatus.NOT_RECEIVED, 
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);

            setIsOpen(false);
        }
    }, [txHash]);

    useEffect(() => {
        switch (context) {
            case AssetsManagementContext.DEPOSIT:
                if (tab === AssetsManagementTabs.YIELD) {
                    setDisclaimer("Deposit Yield Hint");
                }
                if (tab === AssetsManagementTabs.OFFSET) {
                    setDisclaimer("Deposit Offset Hint");
                }
                break;
            case AssetsManagementContext.WITHDRAW:
                if (tab === AssetsManagementTabs.YIELD) {
                    setDisclaimer("Withdraw Yield Hint");
                }
                if (tab === AssetsManagementTabs.OFFSET) {
                    setDisclaimer("Withdraw Offset Hint");
                }
                break;
            case AssetsManagementContext.CLAIM:
                if (tab === AssetsManagementTabs.YIELD) {
                    setDisclaimer("Claim Yield Hint");
                }
                if (tab === AssetsManagementTabs.OFFSET) {
                    setDisclaimer("Claim Offset Hint");
                }
                break;
        }
    }, [context]);


    return (
        <div className="relative w-full">
            <AllocationContainer tab={tab} shares={shares} value={value} />
            <div className="mt-8 flex items-center justify-between font-light">
                <div className="text-left text-neutral-200 uppercase">Select Amount</div>
                <div className="text-right text-neutral-200 uppercase">Available <span className="text-neutral-50 font-bold ml-1">{available.toLocaleString('en')} SHARES</span></div>
            </div>
            <div className="mt-1 w-full relative">
                <input className={`bg-neutral-800 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300`} type="number" value={amount} name="amount" aria-label="Amount" min="1" step="1" onChange={handleAmountChange} />
                <div className="absolute right-4 top-3 text-neutral-300 cursor-pointer font-bold font-sm" onClick={handleSetMax}>MAX</div>
            </div>
            <div className="mt-8 px-8 py-6 bg-neutral-800 rounded-xl border border-opacityLight-10 text-left text-sm">{disclaimer}</div>
            <div className="w-full text-right my-8">
                <GreenButton className={`w-fit`} onClick={handleAction}>{context}</GreenButton>
            </div>
        </div>
    )
}

function AllocationContainer({tab, shares, value}: {tab: string, shares: number, value: number}) {
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
            <div className="text-lg font-bold text-neutral-100 mt-4">{shares.toLocaleString('en')} SHARES</div>
            <div className="text-base font-bold text-neutral-300">≈ ${value.toLocaleString('en')}</div>
        </div>
    )
}
