import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNotifications } from "~/root";
import Transaction from "~/components/Notifications/Transaction";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"
import _ from "lodash";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { NotificationSource } from "~/utils/notifications/sources";
import { useBlockNumber, useWaitForTransaction } from "@starknet-react/core";
import { TransactionStatus } from "starknet";
import type { Notification } from "~/types/notification";

export default function Notification({ notif }: { notif: Notification }) {
    const { notifs, setNotifs, setMustReloadMigration, setMustReloadFarmingPage } = useNotifications();
    const { notifications } = useNotificationCenter();
    const iconCssGreen = 'w-[32px] h-[32px] rounded-full p-[6px] bg-greenish-500 text-white flex items-center justify-center';
    const iconCssRed = 'w-[32px] h-[32px] rounded-full p-[6px] bg-darkRed text-white flex items-center justify-center';
    
    useEffect(() => {
        // If the notification is not already displayed, display it
        if (notifs.length > 0 && _.find(notifications, { toastId: notifs[notifs.length - 1].txHash }) === undefined) {
            const lastNotification = notifs[notifs.length - 1];
            toast(<Transaction title={lastNotification.message.title} description={lastNotification.message.message} link={lastNotification.message.link} />, 
                {
                    toastId: lastNotification.txHash,
                    type: toast.TYPE.INFO,
                    hideProgressBar: false,
                    autoClose: false,
                    closeOnClick: false,
                    progress: 0.1,
                    data: {
                        project: lastNotification.project
                    },
                }
            );
        }
    }, [notifs]);

    const { data } = useWaitForTransaction({ hash: notif.txHash, watch: true, retry: true, });
    const { data: lastBlockNumber } = useBlockNumber({ refetchInterval: 1000 });

    useEffect(() => {
        if (data?.status === TransactionStatus.REJECTED) {
            const message = 'Your transaction is ' + data.status;

            toast.update(notif.txHash, {
                render: <Transaction title={notif.message.title} description={message} link={notif.message.link} />,
                type: toast.TYPE.ERROR,
                progress: 0.99,
                icon: <div className={iconCssRed}><XCircleIcon /></div>
            });

            setTimeout(() => {
                toast.done(notif.txHash);
                setNotifs(notifs.filter((n) => n.txHash !== notif.txHash));
            }, 2000);
            return;
        }

        if (data?.finality_status === TransactionStatus.ACCEPTED_ON_L2 || data?.finality_status === TransactionStatus.ACCEPTED_ON_L1) {
            const message = 'Your transaction is ' + data.finality_status;
            toast.update(notif.txHash, {
                render: <Transaction title={notif.message.title} description={message} link={notif.message.link} />,
                type: toast.TYPE.SUCCESS,
                progress: 0.99,
                icon: <div className={iconCssGreen}><CheckCircleIcon /></div>
            });

            // Update localStorage
            if (notif.walletAddress !== undefined) {
                const lastBlockSaved = localStorage.getItem(notif.walletAddress);

                if (lastBlockNumber !== undefined) { 

                    if (lastBlockSaved === null || lastBlockSaved === undefined || parseInt(lastBlockSaved) < parseInt(lastBlockNumber.toString())) {
                        localStorage.setItem(notif.walletAddress, lastBlockNumber.toString());
                    }
                }
            }

            setMustReloadMigration(notif.source === NotificationSource.MIGRATION || notif.source === NotificationSource.MINT);
            setMustReloadFarmingPage(notif.source === NotificationSource.FARMING);
            
            setTimeout(() => {
                toast.done(notif.txHash);
                setNotifs(notifs.filter((n) => n.txHash !== notif.txHash));
            }, 2000);
        }
    }, [data]);

    return (
        <ToastContainer position="bottom-right" newestOnTop limit={4} theme="dark" />
    )
}