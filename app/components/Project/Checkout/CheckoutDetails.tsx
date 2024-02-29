import { useEffect, useMemo, useState } from "react";
import Currencies from "./Currencies";
import { useNotifications } from "~/root";
import mainnetTokens from "~/config/tokens/mainnet-tokens.json";
import goerliTokens from "~/config/tokens/goerli-tokens.json";
import sepoliaTokens from "~/config/tokens/sepolia-tokens.json";
import { type Token } from "~/types/tokens";
import PaymentDetails from "./PaymentDetails";
import { GreenButton } from "~/components/Buttons/ActionButton";
import { useAccount, useBalance, useContractWrite } from "@starknet-react/core";
import { type QuoteRequest, fetchQuotes, type BuildSwapTransaction, type Quote, fetchBuildExecuteTransaction } from "@avnu/avnu-sdk";
import { TransactionStatus, num } from "starknet";
import { useProject } from "../ProjectWrapper";
import { NotificationSource } from "~/utils/notifications/sources";
import { getStarkscanUrl } from "~/utils/utils";
import _ from "lodash";

const MIN_ETH = 0.1;
const MIN_STRK = 100;

export default function CheckoutDetails({setIsOpen}: {setIsOpen: (isOpen: boolean) => void}) {
    const { defaultNetwork, avnuUrl, notifs, setNotifs } = useNotifications();
    const { address } = useAccount();
    const { quantity, launchpad, project } = useProject();
    const AVNU_OPTIONS = useMemo(() => ({ baseUrl: avnuUrl }), [avnuUrl]);
    const [firstQuote, setFirstQuote] = useState<Quote | undefined>(undefined);
    const [finalQuote, setFinalQuote] = useState<Quote | undefined>(undefined);
    const [avnuCallData, setAvnuCallData] = useState<BuildSwapTransaction | undefined>(undefined);
    const [avnuFees, setAvnuFees] = useState<number | undefined>(0);
    const [conversionRate, setConversionRate] = useState<string>("1");
    const [finalTokenAmount, setFinalTokenAmount] = useState<number | string>(quantity === null ? 0 : quantity);
    const [canBuy, setCanBuy] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [margin, setMargin] = useState<number>(1);
    const [txHash, setTxHash] = useState<string | undefined>("");
    const [starkscanUrl] = useState(getStarkscanUrl(defaultNetwork));

    const tokens: Token[] = useMemo(() => {
        let config: Token[] = [];
        switch (defaultNetwork) {
          case 'mainnet':
            config = mainnetTokens.tokens as Token[];
            break;
          case 'goerli':
            config = goerliTokens.tokens as Token[];
            break;
          case 'sepolia':
            config = sepoliaTokens.tokens as Token[];
            break;
          default:
            config = mainnetTokens.tokens as Token[];
            break;
        }
        return config;
    }, [defaultNetwork]);

    const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
    const { data: tokenBalance } = useBalance({
        address,
        token: selectedToken.address,
        watch: true
    })

    const handleErrors = () => {
        setFinalQuote(undefined);
        setConversionRate('n/a');
        setFinalTokenAmount('n/a');
        setAvnuFees(undefined);
    }

    useEffect(() => {
        setCanBuy(typeof finalTokenAmount === 'number' || selectedToken.symbol === 'USDC' || calls !== undefined);
        setMargin(selectedToken.symbol === 'USDC' ? 1 : 1.01);

        if (typeof finalTokenAmount !== 'number') {
            return;
        }

        if (tokenBalance !== undefined && parseFloat(tokenBalance.formatted) < finalTokenAmount) {
            setCanBuy(false);
            setError(`Insufficient ${selectedToken.symbol} balance`);
        }
    }, [finalTokenAmount, selectedToken, tokenBalance]);

    useEffect(() => {
        setError("");
    }, [selectedToken]);

    useEffect(() => {
        if (selectedToken.symbol === 'USDC') {
            setFinalQuote(undefined);
            setConversionRate("1");
            setFinalTokenAmount(quantity === null ? '0' : quantity.toString());
            setAvnuFees(undefined);
            return;
        }

        if (quantity === null) {
            return;
        }

        const sellAmount = selectedToken.symbol === 'ETH' ? MIN_ETH * Math.pow(10, selectedToken.decimals) : MIN_STRK * Math.pow(10, selectedToken.decimals);

        const quoteParams: QuoteRequest = {
            sellTokenAddress: selectedToken.address,
            buyTokenAddress: tokens.filter((token) => token.symbol === 'USDC')[0].address,
            sellAmount: num.toBigInt(sellAmount),
            takerAddress: address
        }

        const abortController = new AbortController();
        setConversionRate('fetching...');
        setFinalTokenAmount('fetching...');

        fetchQuotes(quoteParams, {...AVNU_OPTIONS, abortSignal: abortController.signal})
        .then((firstQuotes) => {
            if (firstQuotes.length === 0 || firstQuotes[0].sellTokenPriceInUsd === undefined) {
                handleErrors();
                return;
            }

            setFirstQuote(firstQuotes[0]);
        })
        .catch((error) => {
            if (!abortController.signal.aborted) {
                handleErrors();
                console.error(error);
            }
        });

    }, [quantity, address, selectedToken]);

    useEffect(() => {
        if (firstQuote === undefined || quantity === null || firstQuote.sellTokenPriceInUsd === undefined) {
            handleErrors();
            return;
        }

        const amount = (quantity * (1 / firstQuote.sellTokenPriceInUsd) * margin) * Math.pow(10, selectedToken.decimals);

        if (amount.toString().includes('.')) {
            handleErrors();
            setError(`Amount too low to pay in ${selectedToken.symbol}. You can pay in USDC instead.`);
            return;
        }

        const params: QuoteRequest = {
            sellTokenAddress: selectedToken.address,
            buyTokenAddress: tokens.filter((token) => token.symbol === 'USDC')[0].address,
            sellAmount: num.toBigInt(amount),
            takerAddress: address
        }

        const abortController = new AbortController();

        fetchQuotes(params, {...AVNU_OPTIONS, abortSignal: abortController.signal})
        .then((quotes) => {
            if (quotes.length === 0 || quotes[0].sellTokenPriceInUsd === undefined) {
                handleErrors();
                return;
            }

            setFinalQuote(quotes[0]);
            setConversionRate((1 / quotes[0].sellTokenPriceInUsd).toFixed(6));
            setFinalTokenAmount((quantity * (1 / quotes[0].sellTokenPriceInUsd) * margin));
            setAvnuFees(quotes[0].avnuFeesInUsd);
        }).catch((error) => {
            if (!abortController.signal.aborted) {
                handleErrors();
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

        const usdcContract = tokens.filter((token) => token.symbol === 'USDC')[0];
        const usdcAmount = quantity * Math.pow(10, usdcContract.decimals);

        if (selectedToken.symbol === 'USDC') {
            return [
                {
                    contractAddress: usdcContract.address,
                    entrypoint: 'approve',
                    calldata: [launchpad.minter_contract.address, usdcAmount, 0]
                },
                {
                    contractAddress: launchpad.minter_contract.address,
                    entrypoint: 'public_buy',
                    calldata: [usdcAmount, "0", "1"]
                }
            ];
        }

        if (avnuCallData === undefined || 
            finalQuote === undefined || 
            quantity === null || 
            typeof finalTokenAmount !== 'number' ||
            Number.isInteger(finalTokenAmount * Math.pow(10, selectedToken.decimals)) === false)
        { 
             return undefined 
        }

        return [
            {
                contractAddress: selectedToken.address,
                entrypoint: 'approve',
                calldata: [avnuCallData.contractAddress, num.toHexString(finalTokenAmount * Math.pow(10, selectedToken.decimals)), 0]
            },
            {
                contractAddress: avnuCallData.contractAddress,
                entrypoint: avnuCallData.entrypoint,
                calldata: avnuCallData.calldata
            },
            {
                contractAddress: usdcContract.address,
                entrypoint: 'approve',
                calldata: [launchpad.minter_contract.address, usdcAmount, 0]
            },
            {
                contractAddress: launchpad.minter_contract.address,
                entrypoint: 'public_buy',
                calldata: [usdcAmount, "0", "1"]
            }
        ];
    }, [avnuCallData, quantity, selectedToken, launchpad, finalTokenAmount]);

    const { writeAsync } = useContractWrite({ calls });

    const handleClick = async () => {
        if (calls === undefined || calls.length === 0 ) {
            setError(`Amount too low to pay in ${selectedToken.symbol}. You can pay in USDC instead.`);
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
                project: project.id,
                source: NotificationSource.MINT,
                txStatus: TransactionStatus.RECEIVED,
                walletAddress: address,
                message: {
                    title: `Minting ${quantity} shares of ${project.name}`,
                    message: 'Your transaction is ' + TransactionStatus.RECEIVED, 
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);

            setIsOpen(false);
        }
    }, [txHash]);

    return (
        <>
            <div className="w-full">
                <Currencies 
                    tokens={tokens}
                    selectedToken={selectedToken}
                    setSelectedToken={setSelectedToken}
                />
            </div>
            <div className="w-full mt-4">
                <PaymentDetails 
                    selectedToken={selectedToken}
                    conversionRate={conversionRate}
                    finalTokenAmount={finalTokenAmount}
                    priceInUsd={quantity === null ? '0' : avnuFees ? ((quantity * margin) + avnuFees).toFixed(2) :  (quantity * margin).toFixed(2)}
                    avnuFees={avnuFees}
                />
            </div>
            <div className="mt-4">
                <GreenButton disabled={!canBuy} className="w-full" onClick={handleClick}>Confirm transaction</GreenButton>
                <div className="text-red-700 text-xs ml-2">{error}</div>
            </div>
        </>
    )
}