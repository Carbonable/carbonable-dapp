import type { Project } from "@prisma/client";
import { useAccount, useConnectors, useStarknetExecute, useTransactionReceipt } from "@starknet-react/core";
import { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import { simplifyAddress } from "~/utils/utils";
import { number } from "starknet";
import { TxStatus } from "~/utils/blockchain/status";
import { Dialog, Transition } from "@headlessui/react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { STARKSCAN_MAINNET, STARKSCAN_TESTNET, STARKSCAN_TESTNET2 } from "~/utils/links";
import ClientOnly from "~/components/ClientOnly";

export function TransactionDialog({ isOpen, setIsOpen, txHash, network }: { isOpen: boolean, setIsOpen: any, txHash: string, network: string }) {
    const handleClose = () => {
        setIsOpen(false);
    }

    let starkscanUrl = STARKSCAN_MAINNET;

    if (network === "testnet") { starkscanUrl = STARKSCAN_TESTNET }
    if (network === "testnet2") { starkscanUrl = STARKSCAN_TESTNET2 }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-light-80" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl border border-neutral-500 bg-neutral-700 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className="uppercase font-bold text-neutral-400 flex flex-row justify-between border-b border-neutral-500 py-3 px-4">
                                    Transaction
                                    <XMarkIcon className="w-5 cursor-pointer hover:text-neutral-200" onClick={handleClose} />
                                </Dialog.Title>
                                <div className="mt-8 w-full px-5 text-neutral-100 pb-8">
                                    <div className="font-trash text-xl text-center uppercase">Your transaction is being processed</div>
                                    <div className="font-inter text-sm text-center mt-2">
                                        You can follow your transaction in your wallet
                                        <span> or on <a href={`${starkscanUrl}/tx/${txHash}`} target="_blank" className="text-greenish-500 hover:text-neutral-100 outline-0" rel="noreferrer">starkscan</a></span>
                                    </div>
                                    <div className="w-full text-right mt-10">
                                        <GreenButton onClick={handleClose} className="w-fit px-5 py-3">Got it</GreenButton>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default function Mint({ project, priceToDisplay, whitelist, refreshProjectTotalSupply, refreshProjectReservedSupplyForMint, network }:
    { project: Project, priceToDisplay: number, whitelist: any, refreshProjectTotalSupply: () => void, refreshProjectReservedSupplyForMint: () => void, network: string }) {
    const { address, status } = useAccount();
    const { connect, available } = useConnectors();

    const whitelistInfo = whitelist?.leaves.filter((leaf: any) => simplifyAddress(leaf.address) === simplifyAddress(address))[0];
    const isWhitelisted = !project.publicSaleOpen && whitelistInfo ? true : false;
    const canBuy: boolean = (isWhitelisted || project.publicSaleOpen) && status === "connected";

    const [txHash, setTxHash] = useState("");
    const { data: dataTx } = useTransactionReceipt({ hash: txHash, watch: true });
    const [amount, setAmount] = useState(1);
    let [isConnectOpen, setIsConnectOpen] = useState(false);
    let [isTxOpen, setIsTxOpen] = useState(false);

    let ConnectDialog = lazy(() => import("~/components/Connect/ConnectDialog"));

    const handleAmountChange = (e: any) => {

        if (isNaN(e.target.value) || e.target.value < 0) {
            setAmount(1);
            return;
        }

        const max = isWhitelisted ? parseInt(whitelistInfo.quantity) : project.maxBuyPerTx;
        setAmount(e.target.value > max ? max : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value));
    }

    /**
     * 
     * @param whitelistInfo 
     * @param amount 
     * @returns Array of arguments to be passed to the mint function
     */
    function buildWhitelistCallArgs(whitelistInfo: any, amount: number) {
        if (!whitelistInfo) return [];
        const args = [];
        args.push(number.toFelt(whitelistInfo.quantity));
        args.push(number.toFelt(whitelistInfo.proof.length));
        whitelistInfo.proof.forEach((proof: any) => {
            args.push(number.toFelt(proof));
        });
        args.push(number.toFelt(amount))
        return args;
    }

    const calls = [
        {
            contractAddress: project.paymentContract,
            entrypoint: 'approve',
            calldata: [number.toFelt(project.minterContract), (amount * (priceToDisplay * Math.pow(10, project.paymentTokenDecimals))).toString(), 0]
        },
        {
            contractAddress: project.minterContract,
            entrypoint: project.publicSaleOpen ? 'publicBuy' : 'preBuy',
            calldata: project.publicSaleOpen ? [number.toFelt(amount)] : buildWhitelistCallArgs(whitelistInfo, amount)
        },
    ];

    const { execute, data: dataExecute } = useStarknetExecute({
        calls,
        metadata: {
            method: 'Approve and buy tokens',
            message: 'Approve and buy tokens',
        }
    });

    const connectAndExecute = () => {
        if (status === "connected") {
            execute();
            return;
        }

        if (available.length === 1) {
            connect(available[0]);
            execute();
            return;
        }

        setIsConnectOpen(true);
    }

    const connectWallet = () => {
        if (available.length === 1) {
            connect(available[0]);
            return;
        }

        setIsConnectOpen(true);
    }

    useEffect(() => {
        setTxHash(dataExecute ? dataExecute.transaction_hash : "");
    }, [dataExecute])

    useEffect(() => {
        if (dataTx?.status === TxStatus.RECEIVED) {
            setIsTxOpen(true);
        }

        if (dataTx?.status === TxStatus.ACCEPTED_ON_L2) {
            refreshProjectTotalSupply();
            refreshProjectReservedSupplyForMint();
        }
    }, [dataTx, refreshProjectTotalSupply, refreshProjectReservedSupplyForMint]);

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center gap-6">
                <div className="flex flex-col w-3/12">
                    <input className={`bg-transparent text-center outline-0 border border-neutral-100 px-3 py-3 rounded-full ${canBuy ? "" : "cursor-not-allowed text-neutral-300 border-neutral-300"}`} readOnly={!canBuy} type="number" value={amount} name="amount" aria-label="Amount" min="1" step="1" onChange={handleAmountChange} />
                </div>
                <div className="flex flex-col w-full">
                    {status === "connected" && <GreenButton className={`w-full ${canBuy ? "" : "cursor-not-allowed text-neutral-300 bg-greenish-800 hover:text-neutral-300 hover:bg-greenish-800"}`} onClick={canBuy ? connectAndExecute : null}>Buy now - {(amount * priceToDisplay).toFixed(2)}&nbsp;{project.paymentTokenSymbol}</GreenButton>}
                    {status === "disconnected" && <GreenButton className="w-full" onClick={connectWallet}>Connect wallet</GreenButton>}
                </div>
            </div>
            {status === "connected" && !isWhitelisted && !project.publicSaleOpen && <div className="w-full mt-2 bg-blue-dark text-sm text-neutral-100 rounded-full py-1 px-3 flex flex-nowrap items-center">
                <InformationCircleIcon className="w-6 mr-2" />
                You are not whitelisted
            </div>}
            <ClientOnly>
                <Suspense fallback="">
                    <ConnectDialog isOpen={isConnectOpen} setIsOpen={setIsConnectOpen} />
                </Suspense>
            </ClientOnly>

            <TransactionDialog isOpen={isTxOpen} setIsOpen={setIsTxOpen} txHash={txHash} network={network} />
        </div>
    );
}
