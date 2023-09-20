import { useAccount, useContractWrite } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { GreenButton } from "~/components/Buttons/ActionButton";
import { getStarkscanUrl, simplifyAddress } from "~/utils/utils";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ConnectDialog from "~/components/Connection/ConnectDialog"
import type { LaunchpadProps, MintProps, ProjectProps } from "~/routes/__index/launchpad";
import { num } from "starknet";
import _ from "lodash";
import { useNotifications } from "~/root";
import { NotificationSource } from "~/utils/notifications/sources";
import { TxStatus } from "~/utils/blockchain/status";


export default function Mint({ project, launchpad, mint, priceToDisplay, whitelist }:
    { project: ProjectProps, launchpad: LaunchpadProps, mint: MintProps, priceToDisplay: number, whitelist: any }) {
    const { address, status } = useAccount();
    const { notifs, setNotifs, defautlNetwork } = useNotifications();

    const whitelistInfo = whitelist?.leaves.filter((leaf: any) => simplifyAddress(leaf.address) === simplifyAddress(address))[0];
    const isWhitelisted = !launchpad.public_sale_open && whitelistInfo ? true : false;
    const canBuy: boolean = (isWhitelisted || launchpad.public_sale_open) && status === "connected";

    const [minBuy] = useState(parseInt(mint.min_value_per_tx.displayable_value));
    const [maxBuy] = useState(parseInt(mint.max_value_per_tx.displayable_value));

    const [txHash, setTxHash] = useState("");
    const [amount, setAmount] = useState(minBuy);
    let [isConnectOpen, setIsConnectOpen] = useState(false);
    const [starkscanUrl] = useState(getStarkscanUrl(defautlNetwork.id));

    const handleAmountChange = (e: any) => {

        if (isNaN(e.target.value) || e.target.value < 0) {
            setAmount(1);
            return;
        }

        const max = isWhitelisted ? parseInt(whitelistInfo.quantity) : maxBuy;

        if (e.target.value < minBuy) {
            setAmount(minBuy);
            return;
        }
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
        args.push(whitelistInfo.quantity);
        args.push(whitelistInfo.proof.length);
        whitelistInfo.proof.forEach((proof: any) => {
            args.push(proof);
        });
        args.push(amount);
        args.push("0");
        args.push("1");
        return args;
    }

    const calls = [
        {
            contractAddress: mint.payment_token_address,
            entrypoint: 'approve',
            calldata: [launchpad.minter_contract.address, (amount *  Math.pow(10, parseInt(num.hexToDecimalString(project.value_decimals)))) * (priceToDisplay * Math.pow(10, project.payment_token.value.decimals)), 0]
        },
        {
            contractAddress: launchpad.minter_contract.address,
            entrypoint: launchpad.public_sale_open ? 'public_buy' : 'pre_buy',
            calldata: launchpad.public_sale_open ? [amount *  Math.pow(10, parseInt(num.hexToDecimalString(project.value_decimals))), "0", "1"] : buildWhitelistCallArgs(whitelistInfo, amount)
        },
    ];

    console.log(calls);

    const { write, data: dataExecute } = useContractWrite({
        calls,
        metadata: {
            method: 'Approve and buy tokens',
            message: 'Approve and buy tokens',
        }
    });

    useEffect(() => {
        setTxHash(dataExecute ? dataExecute.transaction_hash : "");
    }, [dataExecute]);

    useEffect(() => {
        // When txHash is set, add toast notification
        if (txHash !== undefined && txHash !== "" && _.find(notifs, (notification: any) => notification.txHash === txHash) === undefined) {
            setNotifs([...notifs, {
                txHash: txHash,
                project: project.id,
                source: NotificationSource.MINT,
                txStatus: TxStatus.NOT_RECEIVED,
                message: {
                    title: `Minting ${amount} shares of ${project.name}`,
                    message: 'Your transaction is ' + TxStatus.NOT_RECEIVED, 
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);
        }
    }, [txHash]);

    const connectAndExecute = () => {
        if (!canBuy) { return }
        
        if (status === "connected") {
            write();
            return;
        }

        setIsConnectOpen(true);
    }

    const connectWallet = () => {
        setIsConnectOpen(true);
    }

    useEffect(() => {
        setTxHash(dataExecute ? dataExecute.transaction_hash : "");
    }, [dataExecute]);

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center gap-6">
                <div className="flex flex-col w-3/12">
                    <input className={`bg-transparent text-center outline-0 border border-neutral-100 px-3 py-3 rounded-full ${canBuy ? "" : "cursor-not-allowed text-neutral-300 border-neutral-300"}`} readOnly={!canBuy} type="number" value={amount} name="amount" aria-label="Amount" min="1" step="1" onChange={handleAmountChange} />
                </div>
                <div className="flex flex-col w-full">
                    {status === "connected" && <GreenButton className={`w-full ${canBuy ? "" : "cursor-not-allowed text-neutral-300 bg-greenish-800 hover:text-neutral-300 hover:bg-greenish-800"}`} onClick={connectAndExecute}>Buy now - {(amount * priceToDisplay).toFixed(2)}&nbsp;{project.payment_token.value.symbol}</GreenButton>}
                    {status === "disconnected" && <GreenButton className="w-full" onClick={connectWallet}>Connect wallet</GreenButton>}
                </div>
            </div>
            {status === "connected" && !isWhitelisted && !launchpad.public_sale_open && <div className="w-full mt-2 bg-blue-dark text-sm text-neutral-100 rounded-full py-1 px-3 flex flex-nowrap items-center">
                <InformationCircleIcon className="w-6 mr-2" />
                You are not whitelisted
            </div>}
            <ConnectDialog isOpen={isConnectOpen} setIsOpen={setIsConnectOpen} />
        </div>
    );
}
