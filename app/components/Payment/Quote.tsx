import { fetchBuildExecuteTransaction, fetchQuotes, type Quote, type QuoteRequest } from "@avnu/avnu-sdk";
import { useEffect, useMemo, useState } from "react";
import { num } from "starknet";
import { useNotifications } from "~/root";
import { ETH_DECIMALS } from "~/utils/constant";

const ethAddress = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const usdcAddress = "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426";
const takerAddress = "0x052D8E9778D026588a51595E30B0F45609B4F771EecF0E335CdeFeD1d84a9D89";

export default function QuoteComponent() {
    const { avnuUrl } = useNotifications();
    const amount = useMemo(() => num.toHexString(1 * ETH_DECIMALS), []);
    const AVNU_OPTIONS = useMemo(() => ({ baseUrl: avnuUrl }), [avnuUrl]);
    const [quotes, setQuotes] = useState<Quote[]>([])

    useEffect(() => {
        const params: QuoteRequest = {
            sellTokenAddress: ethAddress,
            buyTokenAddress: usdcAddress,
            sellAmount: num.toBigInt(amount),
            takerAddress
        }
        const abortController = new AbortController();

        fetchQuotes(params, {...AVNU_OPTIONS, abortSignal: abortController.signal})
        .then((quotes) => {
            setQuotes(quotes);
        })
        .catch((error) => {
            if (!abortController.signal.aborted) {
                console.log(error);
            }
        });

    }, [amount, AVNU_OPTIONS]);

    useEffect(() => {
        if (quotes.length === 0) {
            return;
        }
        
        fetchBuildExecuteTransaction(quotes[0].quoteId, undefined, takerAddress, undefined, {...AVNU_OPTIONS})
        .then((tx) => {
            console.log(tx);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [quotes, AVNU_OPTIONS]);

    console.log(quotes);

    return (
        <div>
        <h1></h1>
        </div>
    )
}