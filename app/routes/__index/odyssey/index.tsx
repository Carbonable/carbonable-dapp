import PlusIconWhite from "~/components/Icons/PlusIcon";
import { LinkFooter } from "~/components/Buttons/LinkButton";
import Carousel from "~/components/Odyssey/Carousel";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Badge, BadgeContract } from "@prisma/client";
import { userPrefs } from "~/cookie";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const allBadges = await db.badge.findMany({
            orderBy: [
            {
                token_id: 'desc',
            }
            ]});


        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        const selectedNetwork = await db.network.findFirst({
            where: {
                ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
        });

        const contract = await db.badgeContract.findFirst({
            where: {
                network: selectedNetwork || undefined, 
            }});
        return json({allBadges, contract});
    } catch (e) {
        console.log(e)
        return json([]);
    }
};

export default function Quest() {
    // tag badge from prisma client
    const data = useLoaderData();
    const badges: Badge[] = data.allBadges;
    const contract: BadgeContract = data.contract;

    return (
        <div className="grid grid-cols-1 mx-auto mt-4 md:mt-12 lg:mt-6 gap-y-12 md:gap-y-20">
            <div className="w-full xl:w-9/12 mx-auto mt-12 xl:mt-16 flex items-center justify-center uppercase leading-none flex-wrap text-center">
                <div className="w-full font-trash font-bold text-[4.4vw] lg:text-[3vw] 2xl:text-[2.8vw]">ANTI GREENWASHING</div>
                <div className="w-full font-americana font-thin text-[3.8vw] lg:text-[2.6vw] 2xl:text-[2.2vw]">ODYSSEY</div>
                <div className="w-full font-trash font-bold text-green text-[4.4vw] mt-1 md:mt-2 lg:text-[3vw] 2xl:text-[2.8vw]">SPREAD THE WORD</div>
            </div>
            <div className="grid grid-col-1 md:grid-cols-6 m-auto w-11/12 xl:w-7/12 justify-items-center place-content-center">
                <div className="md:col-span-2 flex items-center justify-center uppercase font-bold">
                    <LinkFooter className="rounded-full px-4" href={"https://carbonable.crew3.xyz/invite/KOfDWAD8_cdTadsz1ei83"}>Start the Odyssey</LinkFooter>
                </div>
                <div className="text-center mt-4 md:text-left md:mt-0 md:col-span-4 flex items-center justify-center">Be part of the change you want to see. <br/>Become a Green Pioneer. <br/>Complete the quest to earn your badge.</div>
            </div>
            <div>
                <div className="flex items-center justify-center uppercase text-center leading-none my-4 w-full px-4 lg:w-9/12 mx-auto">
                    <div className="w-1/12"><PlusIconWhite className="w-8 md:w-12"></PlusIconWhite></div>
                    <div className="w-10/12 font-trash font-bold text-lg lg:text-2xl">MINT YOUR BADGE</div>
                    <div className="w-1/12"><PlusIconWhite className="w-8 md:w-12"></PlusIconWhite></div>
                </div>
                { badges.length > 0 && <Carousel badges={badges} contract={contract}></Carousel> }
            </div>
        </div>
    )
}