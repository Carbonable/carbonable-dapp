import { Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import { useContext, useEffect, useState } from "react";
import NavMenuMobile from "~/components/NavMenu/NavMenuMobile";
import NavMenu from "~/components/NavMenu/NavMenu";
import { getStarknetId } from "~/utils/starknetId";
import { db } from "~/utils/db.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { userPrefs } from "~/cookie";
import { WalletContext } from "~/hooks/wallet-context";

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
    const [addressToDisplay, setAddressToDisplay] = useState("");
    const { connection } = useContext(WalletContext);


    async function getStarnetId() {
        const id = await getStarknetId(connection?.account.address, networks.defautlNetwork);
        setAddressToDisplay(minifyAddressOrStarknetId(connection?.account.address, id));
    }

    useEffect(() => {
        getStarnetId();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connection]);

    function handleStateChange(state: any) {
        setMenuOpen(state.isOpen);
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function closeMenu() {
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
                <Outlet />
            </main>
        </div>
    )
}
