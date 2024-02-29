import { useEffect, useMemo, useState } from "react";
import { GreenButton } from "../Buttons/ActionButton";
import { NotificationSource } from "~/utils/notifications/sources";
import { TransactionStatus, num } from "starknet";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { useNotifications } from "~/root";
import { getStarkscanUrl } from "~/utils/utils";
import { type BuildSwapTransaction, type Quote, type QuoteRequest, fetchBuildExecuteTransaction, fetchQuotes } from "@avnu/avnu-sdk";
import _ from "lodash";

const USDC_CONTRACT = "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";
const ETH_CONTRACT = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const STRK_CONTRACT = "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
const MIN_ETH = 0.1;
const MIN_STRK = 100;
const quantity = 800;

const MIN_AMOUNT = MIN_STRK;
const CONTRACT_ADDRESS = STRK_CONTRACT;

export default function QuoteComponent() {
    const { notifs, setNotifs, defaultNetwork } = useNotifications();
    const { address } = useAccount();
    const [txHash, setTxHash] = useState<string | undefined>("");
    const [starkscanUrl] = useState(getStarkscanUrl(defaultNetwork));
    const AVNU_OPTIONS = { baseUrl: "https://starknet.api.avnu.fi" };
    const [firstQuote, setFirstQuote] = useState<Quote | undefined>(undefined);
    const [finalQuote, setFinalQuote] = useState<Quote | undefined>(undefined);
    const [avnuCallData, setAvnuCallData] = useState<BuildSwapTransaction | undefined>(undefined);
    const [avnuFees, setAvnuFees] = useState<number | undefined>(0);
    const [conversionRate, setConversionRate] = useState<string>("1");
    const [finalTokenAmount, setFinalTokenAmount] = useState<number | string>(quantity === null ? 0 : quantity);
    const [margin] = useState(1.01);


    useEffect(() => {
        const sellAmount = MIN_AMOUNT * Math.pow(10, 18);

        const quoteParams: QuoteRequest = {
            sellTokenAddress: CONTRACT_ADDRESS,
            buyTokenAddress: USDC_CONTRACT,
            sellAmount: num.toBigInt(sellAmount),
            takerAddress: address
        }

        const abortController = new AbortController();
        setConversionRate('fetching...');
        setFinalTokenAmount('fetching...');

        fetchQuotes(quoteParams, {...AVNU_OPTIONS, abortSignal: abortController.signal})
        .then((firstQuotes) => {
            if (firstQuotes.length === 0 || firstQuotes[0].sellTokenPriceInUsd === undefined) {
                console.error("No quotes found");
                return;
            }
            setFirstQuote(firstQuotes[0]);
        })
        .catch((error) => {
            if (!abortController.signal.aborted) {
                console.error(error);
            }
        });

    }, [quantity, address]);

    useEffect(() => {
        if (firstQuote === undefined || quantity === null || firstQuote.sellTokenPriceInUsd === undefined) {
            return;
        }

        const amount = (quantity * (1 / firstQuote.sellTokenPriceInUsd) * margin) * Math.pow(10, 18);

        if (amount.toString().includes('.')) {
            console.error("Amount is not an integer");
            return;
        }

        const params: QuoteRequest = {
            sellTokenAddress: CONTRACT_ADDRESS,
            buyTokenAddress: USDC_CONTRACT,
            sellAmount: num.toBigInt(amount),
            takerAddress: address,
        }

        const abortController = new AbortController();

        fetchQuotes(params, {...AVNU_OPTIONS, abortSignal: abortController.signal})
        .then((quotes) => {
            if (quotes.length === 0 || quotes[0].sellTokenPriceInUsd === undefined) {
                console.error("No quotes found");
                return;
            }

            setFinalQuote(quotes[0]);
            setConversionRate((1 / quotes[0].sellTokenPriceInUsd).toFixed(6));
            setFinalTokenAmount((quantity * (1 / quotes[0].sellTokenPriceInUsd) * margin));
            setAvnuFees(quotes[0].avnuFeesInUsd);
        }).catch((error) => {
            if (!abortController.signal.aborted) {
                console.error(error);
            }
        });
    },[firstQuote]);

    useEffect(() => {
        if (finalQuote === undefined) {
            return;
        }

        fetchBuildExecuteTransaction(finalQuote.quoteId, undefined, address, 0.01, {...AVNU_OPTIONS})
        .then((tx) => {
            setAvnuCallData(tx);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [finalQuote]);

    const calls = useMemo(() => {
        if (quantity === null) { return undefined }

        if (avnuCallData === undefined || 
            finalQuote === undefined || 
            quantity === null || 
            typeof finalTokenAmount !== 'number' ||
            Number.isInteger(finalTokenAmount * Math.pow(10, 18)) === false)
        { 
             return undefined 
        }

        return [
            {
                contractAddress: CONTRACT_ADDRESS,
                entrypoint: 'approve',
                calldata: [avnuCallData.contractAddress, num.toHexString(finalTokenAmount * Math.pow(10, 18)), 0]
            },
            {
                contractAddress: avnuCallData.contractAddress,
                entrypoint: avnuCallData.entrypoint,
                calldata: avnuCallData.calldata
            }
        ];
    }, [avnuCallData, quantity, finalTokenAmount]);
    
    const { writeAsync } = useContractWrite({ calls });

    const handleClick = async () => {
        if (calls === undefined || calls.length === 0 ) {
            return;
        }

        const result = await writeAsync();
        setTxHash(result?.transaction_hash);
    }

    useEffect(() => {
        // When txHash is set, add toast notification
        if (txHash !== undefined && txHash !== "" && _.find(notifs, (notification: any) => notification.txHash === txHash) === undefined) {
            setNotifs([...notifs, {
                txHash: txHash,
                project: 'test',
                source: NotificationSource.MINT,
                txStatus: TransactionStatus.RECEIVED,
                walletAddress: address,
                message: {
                    title: `Minting ${quantity} shares of test project`,
                    message: 'Your transaction is ' + TransactionStatus.RECEIVED, 
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);
        }
    }, [txHash]);

    console.log(avnuFees, conversionRate)

    return (
        <div>
            <GreenButton onClick={handleClick}>Swap to have {quantity} USDC</GreenButton>
        </div>
    )
}