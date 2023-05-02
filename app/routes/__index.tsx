import { Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import { useEffect, useState } from "react";
import NavMenuMobile from "~/components/NavMenu/NavMenuMobile";
import NavMenu from "~/components/NavMenu/NavMenu";
import { getStarknetId } from "~/utils/starknetId";
import { useAccount } from "@starknet-react/core";
import { db } from "~/utils/db.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { userPrefs } from "~/cookie";
import { ToastContainer, toast } from "react-toastify";
import { useNotifications } from "~/root";
import Transaction from "~/components/Notifications/Transaction";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"
import _ from "lodash";
import { TxStatus } from "~/utils/blockchain/status";
import { CheckCircleIcon, DocumentCheckIcon, InboxArrowDownIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { NotificationSource } from "~/utils/notifications/sources";

function minifyAddressOrStarknetId(address: string | undefined, starknetId: string | undefined) {
    const input = starknetId !== undefined ? starknetId : address;
    if (input === undefined) { return ""; }

    return input.length > 24 ? `${input.substring(0, 5)} ... ${input.substring(input.length - 5, input.length)}` : input;
}


export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const networks = await db.network.findMany({
          orderBy: {
            order: 'asc'
          }
        });

        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        const defautlNetwork = await db.network.findFirst({
            where: {
              ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
          });
        
        return json({ networks, defautlNetwork });
    } catch {
        return json([]);
    }
  };
  

export default function Index() {
    const networks = useLoaderData();
    const [menuOpen, setMenuOpen] = useState(false);
    const { status, address, account } = useAccount();
    const [addressToDisplay, setAddressToDisplay] = useState("");
    const { notifs, setNotifs, mustReloadMigration, setMustReloadMigration, defaultProvider, setDefaultProvider, defautlNetwork } = useNotifications();

    async function getStarnetId() {
        const id = await getStarknetId(address, networks.defautlNetwork);
        setAddressToDisplay(minifyAddressOrStarknetId(address, id));
    }

    useEffect(() => {
        getStarnetId();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, address, status]);

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
                <NavMenuMobile handleStateChange={handleStateChange} closeMenu={closeMenu} menuOpen={menuOpen} canClose={true} addressToDisplay={addressToDisplay} networksList={networks.networks} selectedNetwork={networks.defautlNetwork} />
            </div>
            <header className="py-7 fixed top-0 w-full z-10 bg-neutral-800">
                <Header toggleMenu={toggleMenu} menuOpen={menuOpen} addressToDisplay={addressToDisplay} networksList={networks.networks} selectedNetwork={networks.defautlNetwork} />
            </header>
            <nav className='hidden lg:block z-20'>
                <div className="sticky top-0 left-0 lg:w-[280px] ">
                    <NavMenu addressToDisplay={addressToDisplay} closeMenu={closeMenu} networksList={networks.networks} selectedNetwork={networks.defautlNetwork} />
                </div>
            </nav>
            <main className='w-full mt-[110px]' id="page-wrap">
                <Outlet context={{ notifs, setNotifs, mustReloadMigration, setMustReloadMigration, defaultProvider, setDefaultProvider, defautlNetwork }} />
                <Notifications />
            </main>
        </div>
    )
}

function Notifications() {
    const { notifs, setNotifs, defaultProvider, setMustReloadMigration } = useNotifications();
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

                    setMustReloadMigration(notif.source === NotificationSource.MIGRATION);
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