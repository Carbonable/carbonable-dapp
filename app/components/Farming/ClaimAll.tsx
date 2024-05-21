import { useCallback, useEffect, useState } from "react";
import { GreenButton } from "../Buttons/ActionButton";
import { useFetcher } from "@remix-run/react";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { TransactionStatus, type Call } from "starknet";
import _ from "lodash";
import { useNotifications } from "~/root";
import { getStarkscanUrl } from "~/utils/utils";
import { NotificationSource } from "~/utils/notifications/sources";

export default function ClaimAll() {
    const { address } = useAccount();
    const { notifs, setNotifs, defaultNetwork } = useNotifications();
    const [starkscanUrl] = useState(getStarkscanUrl(defaultNetwork));
    const [canClaimAll, setCanClaimAll] = useState(false);
    const [calls, setCalls] = useState<Call[] | undefined>(undefined);
    const [txHash, setTxHash] = useState<string | undefined>("");
    const fetcher = useFetcher();

    useEffect(() => {
        if (fetcher.data === undefined && address !== undefined) {
            fetcher.load(`/farming/claimall?wallet=${address}`);
        }

    }, [address]);

    useEffect(() => {
        if (fetcher.data !== undefined) {
            const data = fetcher.data.data;
            setCanClaimAll(data.length > 0);
            
            if (data === undefined) { return; }

        }
    }, [fetcher.data]);

    const handleClaimAll = useCallback(() => {
        if (fetcher.data === undefined) { return; }

        setCalls((cd: any) => {
            const callsData: Call[] = [];
            for (const contract of fetcher.data.data) {
                callsData.push({
                    contractAddress: contract,
                    entrypoint: "claim",
                    calldata: []
                });
            }
            return callsData;
        });
    }, [fetcher.data]);

    const { writeAsync } = useContractWrite({ calls });

    useEffect(() => {
        if (calls === undefined) return;

        async function claimAll() {
            const result = await writeAsync();
            setTxHash(result?.transaction_hash);
        }

        claimAll();

    }, [calls]);

    useEffect(() => {
        // When txHash is set, add toast notification
        if (txHash !== undefined && txHash !== "" && _.find(notifs, (notification: any) => notification.txHash === txHash) === undefined) {
            setNotifs([...notifs, {
                txHash: txHash,
                project: 'test',
                source: NotificationSource.FARMING,
                txStatus: TransactionStatus.RECEIVED,
                walletAddress: address,
                message: {
                    title: `Claiming all resale`,
                    message: 'Your transaction is ' + TransactionStatus.RECEIVED, 
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);
        }
    }, [txHash]);

    if (!canClaimAll) {
        return (
            <GreenButton disabled={true}>Claim all resale</GreenButton>
        );
    }

    return (
        <GreenButton onClick={handleClaimAll}>Claim all resale</GreenButton>
    );
}
