import PlusIconWhite from "~/components/Icons/PlusIcon";
import { LinkFooter } from "~/components/Buttons/LinkButton";
import Carousel from "~/components/Quest/Carousel";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Badges } from "@prisma/client";




export async function loader() {
    const allProjects = await db.badges.findMany({
        orderBy: [
          {
            token_id: 'desc',
          }
        ]});

    return json(allProjects);
};


export default function Quest() {
    // tag badge from prisma
    const badges  = useLoaderData();

    return (
        <div className="grid grid-cols-1 mx-auto mt-4 md:mt-12 lg:mt-6 gap-y-20 ">

            <div className=" w-full mt-12 lg:mt-12 xl:mt-16 flex items-center justify-center">
                <div className="w-full md:w-full xl:w-9/12 mx-auto flex items-center justify-center">

                    <div className=" w-full">
                        <div className="  uppercase text-center leading-none md:top-14 md:left-16 lg:top:6 lg:left-10 xl:top-16 xl:left-16 2xl:top-14 2xl:left-64">
                            <div className="font-trash font-bold text-[4.4vw] lg:text-[3vw] 2xl:text-[2.8vw]">ANTI GREENWASHING</div>
                            <div className="font-americana font-thin text-[3.8vw] lg:text-[2.6vw] 2xl:text-[2.2vw]">ODYSSEY </div>
                            <div className="font-trash font-bold text-green text-[4.4vw] mt-1 md:mt-2 lg:text-[3vw] 2xl:text-[2.8vw]">SPREAD THE WORD</div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="grid grid-col-1 md:grid-cols-6 m-auto w-11/12 xl:w-7/12 justify-items-center place-content-center">
                    <div className=" col-span-2  flex items-center justify-center uppercase font-bold"> <LinkFooter className="rounded-full" href={"https://carbonable.crew3.xyz/invite/KOfDWAD8_cdTadsz1ei83"} > Start The Quest </LinkFooter> </div>
                    <div className=" col-span-4   flex items-center justify-center"><p>Be part of the change you want to see. <br /> Complete quest to get elligible to SBTs mint.</p></div>
            </div>

            <div>
            <div className=" flex items-center justify-center uppercase text-center leading-none md:top-14 md:left-16 lg:top:6 lg:left-10 xl:top-16 xl:left-16 2xl:top-14 2xl:left-64 my-4">
                        <PlusIconWhite className="w-8 md:w-12"></PlusIconWhite>
                            <div className="font-trash font-bold text-lg mx-60">MINT YOUR BADGES</div>
                            <PlusIconWhite className="w-8 md:w-12"></PlusIconWhite>
                        </div>
            <Carousel badges={badges}></Carousel>
            </div>
        </div>
    )
}