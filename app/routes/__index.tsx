import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";
import { useEffect, useState } from "react";
import NavMenuMobile from "~/components/NavMenu/NavMenuMobile";
import NavMenu from "~/components/NavMenu/NavMenu";
import { ToastContainer, toast } from "react-toastify";
import { useNotifications } from "~/root";
import Transaction from "~/components/Notifications/Transaction";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"
import _ from "lodash";
import { TxStatus } from "~/utils/blockchain/status";
import { CheckCircleIcon, DocumentCheckIcon, InboxArrowDownIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { NotificationSource } from "~/utils/notifications/sources";

export default function Index() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { notifs, setNotifs, defaultProvider, mustReloadMigration, setMustReloadMigration, defautlNetwork, mustReloadFarmingPage, setMustReloadFarmingPage } = useNotifications();

    function handleStateChange(state: any) {
        setMenuOpen(state.isOpen);
      }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function closeMenu () {
        setMenuOpen(false);
    }

    return (
        <div className="mx-auto flex" id="outer-container">
            <div className="fixed z-50 top-0 left-0 lg:hidden">
                <NavMenuMobile handleStateChange={handleStateChange} closeMenu={closeMenu} menuOpen={menuOpen} canClose={true} />
            </div>
            <header className="pb-2 fixed top-0 w-full bg-neutral-800 z-50">
                { defautlNetwork.id === 'testnet' && 
                    <div className="w-full lg:w-[calc(100%_-_280px)] text-center bg-greenish-700 text-neutral-50 py-1 mb-2 text-sm lg:ml-[280px]">
                        You are currently on the testnet. You can switch to the mainnet here: <a href="https://app.carbonable.io" className="underline">https://app.carbonable.io</a>
                    </div>
                }
                <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
            </header>
            <nav className='hidden lg:block z-20'>
                <div className="sticky top-0 left-0 lg:w-[280px]">
                    <NavMenu closeMenu={closeMenu} />
                </div>
            </nav>
            <main className='w-full mt-[110px]' id="page-wrap">
                <Outlet context={{ notifs, setNotifs, defaultProvider, mustReloadMigration, setMustReloadMigration, defautlNetwork, mustReloadFarmingPage, setMustReloadFarmingPage }} />
                <Notifications />
            </main>
        </div>
    )
}

function Notifications() {
    const { notifs, setNotifs, defaultProvider, setMustReloadMigration, setMustReloadFarmingPage } = useNotifications();
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

    useEffect(() => {
        const interval = setInterval(() => {
            // Check transaction status for each notification
           
            notifs.forEach(async (notif) => {
                const dataTx = await defaultProvider?.getTransactionReceipt(notif.txHash);
                const message = 'Your transaction is ' + dataTx?.status

                if (dataTx?.status === TxStatus.RECEIVED) {
                    toast.update(notif.txHash, {
                        render: <Transaction title={notif.message.title} description={message} link={notif.message.link} />,
                        type: toast.TYPE.SUCCESS,
                        progress: 0.33,
                        icon: <div className={iconCssGreen}><InboxArrowDownIcon /></div>
                    });
                }
        
                if (dataTx?.status === TxStatus.PENDING) {
                    toast.update(notif.txHash, {
                        render: <Transaction title={notif.message.title} description={message} link={notif.message.link} />,
                        type: toast.TYPE.SUCCESS,
                        progress: 0.66,
                        icon: <div className={iconCssGreen}><DocumentCheckIcon /></div>
                    });
                }
        
                if (dataTx?.status === TxStatus.ACCEPTED_ON_L2 || dataTx?.status === TxStatus.ACCEPTED_ON_L1) {
                    toast.update(notif.txHash, {
                        render: <Transaction title={notif.message.title} description={message} link={notif.message.link} />,
                        type: toast.TYPE.SUCCESS,
                        progress: 1,
                        icon: <div className={iconCssGreen}><CheckCircleIcon /></div>
                    });

                    setMustReloadMigration(notif.source === NotificationSource.MIGRATION || notif.source === NotificationSource.MINT);
                    setMustReloadFarmingPage(notif.source === NotificationSource.FARMING);
                    setNotifs(notifs.filter((n) => n.txHash !== notif.txHash));
                    toast.done(notif.txHash);
                }
        
                if (dataTx?.status === TxStatus.REJECTED) {
                    toast.update(notif.txHash, {
                        render: <Transaction title={notif.message.title} description={message} link={notif.message.link} />,
                        type: toast.TYPE.ERROR,
                        progress: 0.99,
                        icon: <div className={iconCssRed}><XCircleIcon /></div>
                    });

                    setNotifs(notifs.filter((n) => n.txHash !== notif.txHash));
                    toast.done(notif.txHash);
                }
            });
        }, 5000);

        return () => clearInterval(interval);
    });

    return (
        <ToastContainer position="bottom-right" newestOnTop limit={4} theme="dark" />
    )
}