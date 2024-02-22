import { type BuildSwapTransaction, fetchBuildExecuteTransaction, fetchQuotes, type Quote, type QuoteRequest } from "@avnu/avnu-sdk";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";
import { num } from "starknet";
import { useNotifications } from "~/root";
import { ETH_DECIMALS, USDC_DECIMALS } from "~/utils/constant";
import { GreenButton } from "../Buttons/ActionButton";

const ethAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const usdcAddress = "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426";
const minter = '0x0779b599248f986064d340c58f5bae8a996085bb6832852e59003519fb3febfe';

export default function QuoteComponent() {
    const { address } = useAccount();
    const { avnuUrl } = useNotifications();
    const amountETH = useMemo(() => num.toHexString(0.01 * ETH_DECIMALS), []);
    const amountUSDC = useMemo(() => 100 * USDC_DECIMALS, []);
    const AVNU_OPTIONS = useMemo(() => ({ baseUrl: avnuUrl }), [avnuUrl]);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [avnuCallData, setAvnuCallData] = useState<BuildSwapTransaction | undefined>(undefined);

    useEffect(() => {
        const params: QuoteRequest = {
            sellTokenAddress: ethAddress,
            buyTokenAddress: usdcAddress,
            sellAmount: num.toBigInt(amountETH),
            takerAddress: address
        }
        const abortController = new AbortController();

        console.log(params, AVNU_OPTIONS);

        fetchQuotes(params, {...AVNU_OPTIONS, abortSignal: abortController.signal})
        .then((quotes) => {
            setQuotes(quotes);
        })
        .catch((error) => {
            if (!abortController.signal.aborted) {
                console.error(error);
            }
        });

    }, [amountETH, AVNU_OPTIONS, address]);

    useEffect(() => {
        if (quotes.length === 0) {
            return;
        }

        fetchBuildExecuteTransaction(quotes[0].quoteId, undefined, address, undefined, {...AVNU_OPTIONS})
        .then((tx) => {
            setAvnuCallData(tx);
            console.log(tx);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [quotes, AVNU_OPTIONS, address]);

    const calls = useMemo(() => {

        if (avnuCallData === undefined) { return [] }

        return [
            {
                contractAddress: ethAddress,
                entrypoint: 'approve',
                calldata: [avnuCallData.contractAddress, amountETH, 0]
            },
            {
                contractAddress: avnuCallData.contractAddress,
                entrypoint: avnuCallData.entrypoint,
                calldata: avnuCallData.calldata
            },
            {
                contractAddress: usdcAddress,
                entrypoint: 'approve',
                calldata: [minter, amountUSDC, 0]
            },
            {
                contractAddress: minter,
                entrypoint: 'public_buy',
                calldata: [amountUSDC, "0", "1"]
            }
        ];
    }, [amountUSDC, amountETH, avnuCallData]);

    const { writeAsync } = useContractWrite({ calls });

    const handleMint = async () => {
        const result = await writeAsync();
        console.log(result);
    }

    console.log(quotes);

    return (
        <div>
            <GreenButton onClick={handleMint}>Mint</GreenButton>
        </div>
    )
}