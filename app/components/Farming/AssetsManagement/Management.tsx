import { useCallback, useEffect, useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import { AssetsManagementContext, AssetsManagementTabs } from "./Dialog";
import type { AssetsAllocationProps, CarbonCreditsProps, ContractsProps, NumericValueProps } from "~/interfaces/farming";
import { useNotifications } from "~/root";
import { useAccount, useContractWrite } from "@starknet-react/core";
import _ from "lodash";
import { NotificationSource } from "~/utils/notifications/sources";
import { getStarkscanUrl, shortenNumberWithDigits } from "~/utils/utils";
import { type Call, TransactionStatus, num } from "starknet";
import { UINT256_DECIMALS } from "~/utils/constant";

export default function Management({context, tab, assetsAllocation, contracts, project, setIsOpen, carbonCredits, tonEquivalent, unitPrice, farmingData, setFarmingData}: 
    {context: AssetsManagementContext, tab: AssetsManagementTabs, assetsAllocation: AssetsAllocationProps | undefined, contracts: ContractsProps | undefined, project: any, setIsOpen: (b: boolean) => void, carbonCredits: CarbonCreditsProps | undefined, tonEquivalent: string, unitPrice: NumericValueProps | undefined, farmingData: any, setFarmingData: (d: any) => void }) {

    const [available, setAvailable] = useState(0);
    const [amount, setAmount] = useState<number | null>(1);
    const [disclaimer, setDisclaimer] = useState("");
    const [calls, setCalls] = useState<Call[] | undefined>(undefined);
    const [txHash, setTxHash] = useState<string | undefined>("");
    const { notifs, setNotifs, defautlNetwork } = useNotifications();
    const [starkscanUrl] = useState(getStarkscanUrl(defautlNetwork));
    const [hasErrror, setHasError] = useState(false);
    const { address } = useAccount();
    
    useEffect(() => {
        if (assetsAllocation !== undefined && carbonCredits !== undefined) {
            switch (context) {
                case AssetsManagementContext.DEPOSIT:
                    setAvailable(parseFloat(assetsAllocation.undeposited.displayable_value));
                    break;
                case AssetsManagementContext.WITHDRAW:
                    setAvailable(tab === AssetsManagementTabs.YIELD ? parseFloat(assetsAllocation.yield.displayable_value) : parseFloat(assetsAllocation.offseted.displayable_value));
                    break;
                case AssetsManagementContext.CLAIM:
                    if (tonEquivalent !== '0') {
                        setAvailable(parseFloat(carbonCredits.offset.available.displayable_value) / parseInt(tonEquivalent));
                    }
                    break;
            }
        }
    }, [assetsAllocation, tab, carbonCredits, context]);
    
    const handleAmountChange = (e: any) => {
        const value = e.target.value;

        if (value === "" || isNaN(value) || value <= 0) {
            setAmount(null);
            setHasError(true);
            return;
        }
        setAmount(value > available ? available : value.replace(/^0+/, ''));
        setHasError(false);
    }

    const handleSetMax = () => {
        setAmount(available);
    }

    const { write, data: dataExecute, error, status, variables } = useContractWrite({ calls });
    console.log(calls, error, status, variables);

    const handleAction = useCallback(() => {

        if (amount === null || amount <= 0) {
            return;
        }

        switch (context) {
            case AssetsManagementContext.DEPOSIT:
                setCalls((cd: any) => {
                    console.log(cd)
                    const callsData: Call[] = [];
                    const tokens = _.sortBy(assetsAllocation?.tokens, (token: any) => parseInt(num.hexToDecimalString(token.value.value)) * Math.pow(10, -token.value.value_decimals));
                    const filteredTokens = tokens.filter((token: any) => parseInt(num.hexToDecimalString(token.value.value)) * Math.pow(10, -token.value.value_decimals) > 0);
                    let amountDeposited = 0;

                    if (contracts?.project === undefined || contracts?.yielder === undefined || contracts?.offseter === undefined) {
                        return undefined;
                    }

                    // We deposit the value of the tokens from the smallest to the biggest until we reach the amount the user wants to deposit
                    for (const token of filteredTokens) {
                        if (amountDeposited >= amount) { break; }

                        const tokenValue = parseInt(num.hexToDecimalString(token.value.value)) * Math.pow(10, -token.value.value_decimals);
                        const amountToDepositByToken = tokenValue <= (amount - amountDeposited) ? tokenValue : amount - amountDeposited;
                        amountDeposited += amountToDepositByToken;

                        // Allow deposit on yielder or offseter contract
                        callsData.push({
                            contractAddress:contracts?.project,
                            entrypoint: 'approve_value',
                            calldata: [parseInt(num.hexToDecimalString(token.token_id)), 0, tab === AssetsManagementTabs.YIELD ? contracts?.yielder : contracts?.offseter, Math.round(amountToDepositByToken * Math.pow(10, token.value.value_decimals)), 0]
                        });

                        callsData.push({
                            contractAddress: tab === AssetsManagementTabs.YIELD ? contracts?.yielder : contracts?.offseter,
                            entrypoint: 'deposit',
                            calldata: [parseInt(num.hexToDecimalString(token.token_id)), 0, Math.round(amountToDepositByToken * Math.pow(10, token.value.value_decimals)), 0]
                        });
                    }

                    return callsData;
                });
                break;
            case AssetsManagementContext.WITHDRAW:
                setCalls((cd: any) => {
                    const tokens = _.sortBy(assetsAllocation?.tokens, (token: any) => parseInt(num.hexToDecimalString(token.value.value)) * Math.pow(10, -token.value.value_decimals));

                    if (contracts?.project === undefined || contracts?.yielder === undefined || contracts?.offseter === undefined) {
                        return undefined;
                    }

                    return [{
                        contractAddress: tab === AssetsManagementTabs.YIELD ? contracts?.yielder : contracts?.offseter,
                        entrypoint: tokens.length === 0 ? 'withdraw_to' : 'withdraw_to_token',
                        calldata: tokens.length === 0 ? [amount * UINT256_DECIMALS, 0] : [parseInt(num.hexToDecimalString(tokens[tokens.length - 1].token_id)), 0, amount * UINT256_DECIMALS, 0]
                    }];

                });
                break;
            case AssetsManagementContext.CLAIM:
                setCalls((cd: any) => {

                    if (contracts?.project === undefined || contracts?.offseter === undefined) {
                        return undefined;
                    }

                    return [{
                        contractAddress: contracts?.offseter,
                        entrypoint: 'claim',
                        calldata: [amount * parseInt(tonEquivalent), 0]
                    }];
                });
                break;
        }
    }, [amount, tab, context, write, contracts, assetsAllocation, tonEquivalent]);

    useEffect(() => {
        if (calls === undefined) return;
        
        write();
    }, [calls]);

    useEffect(() => {
        setTxHash(dataExecute ? dataExecute.transaction_hash : "");
    }, [dataExecute]);

    useEffect(() => {
        let title = "";
        // When txHash is set, add toast notification
        if (txHash !== undefined && txHash !== "" && _.find(notifs, (notification: any) => notification.txHash === txHash) === undefined) {
            switch (context) {
                case AssetsManagementContext.DEPOSIT:
                    title = `${_.capitalize(context)} ${amount} shares in ${project.name} ${tab} farm`;

                    if (tab === AssetsManagementTabs.OFFSET && amount) {
                        const oldOffset = parseFloat(farmingData.allocation.offseted.displayable_value);
                        const oldUndeposited = parseFloat(farmingData.allocation.undeposited.displayable_value);
                        farmingData.allocation.offseted.displayable_value = oldOffset + amount;
                        farmingData.allocation.undeposited.displayable_value = oldUndeposited - amount;
                    }

                    if (tab === AssetsManagementTabs.YIELD && amount) {
                        const oldYield = parseFloat(farmingData.allocation.yield.displayable_value);
                        const oldUndeposited = parseFloat(farmingData.allocation.undeposited.displayable_value);
                        farmingData.allocation.yield.displayable_value = oldYield + amount;
                        farmingData.allocation.undeposited.displayable_value = oldUndeposited - amount;
                    }

                    break;
                case AssetsManagementContext.WITHDRAW:
                    title = `${_.capitalize(context)} ${amount} shares from ${project.name} ${tab} farm`;

                    if (tab === AssetsManagementTabs.OFFSET && amount) {
                        const oldOffset = parseFloat(farmingData.allocation.offseted.displayable_value);
                        const oldUndeposited = parseFloat(farmingData.allocation.undeposited.displayable_value);
                        farmingData.allocation.offseted.displayable_value = oldOffset - amount;
                        farmingData.allocation.undeposited.displayable_value = oldUndeposited + amount;
                    }

                    if (tab === AssetsManagementTabs.YIELD && amount) {
                        const oldYield = parseFloat(farmingData.allocation.yield.displayable_value);
                        const oldUndeposited = parseFloat(farmingData.allocation.undeposited.displayable_value);
                        farmingData.allocation.yield.displayable_value = oldYield - amount;
                        farmingData.allocation.undeposited.displayable_value = oldUndeposited + amount;
                    }

                    break;
                case AssetsManagementContext.CLAIM:
                    title = `${_.capitalize(context)} ${amount} tons from ${project.name} ${tab} farm`;
                    
                    // Update farming data
                    if (amount) { 
                        const oldTotal = parseFloat(farmingData.carbon_credits.offset.total.displayable_value);
                        const oldAvailable = parseFloat(farmingData.carbon_credits.offset.available.displayable_value);
                        farmingData.carbon_credits.offset.total.displayable_value = oldTotal + (amount  * parseInt(tonEquivalent));
                        farmingData.carbon_credits.offset.available.displayable_value = oldAvailable - (amount  * parseInt(tonEquivalent));
                    }
                    break;
            }

            setNotifs([...notifs, {
                txHash: txHash,
                project: project.id,
                source: NotificationSource.FARMING,
                txStatus: TransactionStatus.RECEIVED,
                walletAddress: address,
                message: {
                    title,
                    message: 'Your transaction is ' + TransactionStatus.RECEIVED, 
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
                    setDisclaimer("Deposit shares to start earning Yield in USDC based on the absorption curve of the project. You can deposit more or withdraw your shares at any time.");
                }
                if (tab === AssetsManagementTabs.OFFSET) {
                    setDisclaimer("Deposit shares to start offsetting your carbon footprint in TONs based on the absorption curve of the project. You can deposit more or withdraw your shares at any time.");
                }
                break;
            case AssetsManagementContext.WITHDRAW:
                if (tab === AssetsManagementTabs.YIELD) {
                    setDisclaimer("By withdrawing shares you will earn less yield in USDC. You can withdraw more or deposit back your shares at any time.");
                }
                if (tab === AssetsManagementTabs.OFFSET) {
                    setDisclaimer("By withdrawing shares you will offset less carbon footprint. Be aware that you need to offset at least 1CC to claim your offset certificate. You can withdraw more or deposit back your shares at any time.");
                }
                break;
            case AssetsManagementContext.CLAIM:
                if (tab === AssetsManagementTabs.YIELD) {
                    setDisclaimer("You will receive your yield in USDC. You can claim your yield at any time.");
                }
                if (tab === AssetsManagementTabs.OFFSET) {
                    setDisclaimer("By claiming your offset, the underlying carbon credits will be burnt and you will receive your offset certificate. You can claim your offset certificate when you have offset at least 1CC.");
                }
                break;
        }
    }, [context]);


    return (
        <div className="relative w-full">
            <AllocationContainer tab={tab} assetsAllocation={assetsAllocation} unitPrice={unitPrice} />
            <div className="mt-8 flex items-center justify-between font-light">
                <div className="text-left text-neutral-200 uppercase">Select Amount</div>
                <div className="text-right text-neutral-200 uppercase">Available <span className="text-neutral-50 font-bold ml-1">{shortenNumberWithDigits(available, 6)} {context === AssetsManagementContext.CLAIM ? 'TONS' : 'SHARES'}</span></div>
            </div>
            <div className="mt-1 w-full relative">
                <input className={`bg-neutral-800 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300 ${hasErrror ? "border-red-500 focus:border-red-500" : ""}`} type="number" value={amount === null ? '' : amount} name="amount" aria-label="Amount" onChange={handleAmountChange} />
                <div className="absolute right-4 top-3 text-neutral-300 cursor-pointer font-bold font-sm" onClick={handleSetMax}>MAX</div>
            </div>
            <div className="mt-8 px-8 py-6 bg-neutral-800 rounded-xl border border-opacityLight-10 text-left text-sm">{disclaimer}</div>
            <div className="w-full text-right my-8">
                <GreenButton className={`w-fit ${hasErrror ? "cursor-not-allowed bg-greenish-500/50 text-neutral-300 hover:bg-greenish-500/50" : ""}`} onClick={handleAction} disabled={hasErrror}>{context}</GreenButton>
            </div>
        </div>
    )
}

function AllocationContainer({tab, assetsAllocation, unitPrice}: {tab: string, assetsAllocation: AssetsAllocationProps | undefined, unitPrice: NumericValueProps | undefined}) {
    const [shares, setShares] = useState(0);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const readablePrice = unitPrice === undefined ? 1 : parseInt(unitPrice.displayable_value);
        if (assetsAllocation !== undefined) {
            switch (tab) {
                case AssetsManagementTabs.YIELD:
                    setShares(parseFloat(assetsAllocation.yield.displayable_value));
                    setValue(parseFloat(assetsAllocation.yield.displayable_value) * readablePrice);
                    break;
                case AssetsManagementTabs.OFFSET:
                    setShares(parseFloat(assetsAllocation.offseted.displayable_value));
                    setValue(parseFloat(assetsAllocation.offseted.displayable_value) * readablePrice);
                    break;
            }
        }
    }, [tab, assetsAllocation]);

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
