import { ArrowTopRightOnSquareIcon, MinusIcon, PaperAirplaneIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { Projects } from "@prisma/client";
import { useFetcher, useTransition } from "@remix-run/react";
import moment from "moment";
import { useRef, useState } from "react";
import { MintButton, WhitelistButton } from "../Buttons/ActionButton";
import { PlusIconBlack } from "../Icons/PlusIcon";

function EstimatedAPR({estimatedAPR}: {estimatedAPR: string}) {
    return (
        <div className="font-inter text-green text-xs 2xl:text-sm">Estimated APR {estimatedAPR}</div>
    )
}

function FollowComponent() {
    return (
        <>
            <div className="font-trash font-bold text-xl uppercase 2xl:text-2xl">Follow the progress</div>
            <div className="font-americana font-light text-lg uppercase 2xl:text-xl">of the project</div>
            <div className="mt-6"><a href="/" target="_blank" className="bg-green-blue font-inter uppercase text-black/50 px-8 py-4 rounded-full text-sm font-semibold">Impact report</a></div>
        </>
    )
}

function SimularorComponent() {
    return (
        <div>
            <>
                <div className="font-trash font-bold text-base uppercase 2xl:text-xl">Estimate your gain for you</div>
                <div className="font-americana font-light text-base uppercase 2xl:text-xl">and the planet</div>
                <div className="mt-4"><a href="https://carbonable.io#simulator" target="_blank" className="bg-green-blue font-inter uppercase text-black/50 px-8 py-4 rounded-full text-sm font-semibold flex items-center justify-center w-fit" rel="noreferrer">Simulator <ArrowTopRightOnSquareIcon className="w-4 ml-4 text-black/50" /></a></div>
            </>
        </div>
    )
}

function MintComponent({estimatedAPR}: Projects) {
    const mint = useFetcher();
    const refMint = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState(1);

    return (
        <div>
            <mint.Form
                    method="post"
                    action="/blockchain/mint"
                    className="w-full flex items-start justify-start"
                    >
                <div className="w-4/12 flex items-center justify-center bg-black rounded-full text-white p-2 border border-white xl:w-4/12 2xl:max-w-[140px]">
                    <MinusIcon className="w-6 bg-white p-1 rounded-full text-black" onClick={() => amount > 1 ? setAmount(amount - 1) : 1} />
                    <div className="w-8/12 text-center">
                        <input className="bg-transparent w-full text-center outline-none" type="number" value={amount} name="amount" ref={refMint} aria-label="Amount" aria-describedby="error-message" onChange={(e) => parseInt(e.target.value) > 0 ? setAmount(parseInt(e.target.value) || 1) : 1} />
                    </div>
                    <PlusIcon className="w-6 bg-white p-1 rounded-full text-black"  onClick={() => setAmount(amount + 1)} />
                </div>
                <div className="w-8/12 flex flex-wrap items-center justify-center pl-4 xl:w-8/12 xl:justify-start xl:pl-6">
                    <MintButton className="min-h-[42px] 2xl:min-w-[220px]" onClick={mint.submit}>Buy now - 109 UST</MintButton>
                    <div className="mt-2 xl:w-full xl:text-left xl:pl-7 2xl:pl-12"><EstimatedAPR estimatedAPR={estimatedAPR} /></div>
                </div>
            </mint.Form>
        </div>
    )
}

function SoldoutComponent({saleDate, estimatedAPR}: Projects) {
    return (
        <div className="w-full flex items-center justify-center xl:justify-start">
            <div className="w-7/12 xl:w-[11rem]">
                <div className="flex items-center justify-start font-inter font-bold text-xs text-black bg-white rounded-md py-1 px-4 w-10/12 xl:w-full xl:text-sm">
                    <div>Soldout</div>
                    <PlusIconBlack className="w-2 mx-1"></PlusIconBlack>
                    <div>{moment(saleDate).format("MM.DD.YYYY").toString()}</div>
                </div>
            </div>
            
            <div className="w-5/12 text-center xl:text-left xl:pl-8"><EstimatedAPR estimatedAPR={estimatedAPR} /></div>
        </div>
    )
}

function ComingSoonComponent({saleDate, estimatedAPR}: Projects) {
    const newsletter = useFetcher();
    const ref = useRef<HTMLInputElement>(null);

    const transition = useTransition();
    const state: "idle" | "success" | "error" | "submitting" = transition.submission
        ? "submitting"
        : newsletter?.data?.message
        ? "success"
        : newsletter?.data?.error
        ? "error"
        : "idle";
    return (
        <div>
            <div className="w-full flex items-center justify-start">
                <div className="flex items-center justify-center font-inter font-bold text-xs text-black bg-green-blue rounded-md w-7/12 py-1 px-2 xl:w-[11rem]">
                    <div>Coming soon</div>
                    <PlusIconBlack className="w-2 mx-1"></PlusIconBlack>
                    <div>{moment(saleDate).format("MM.DD.YYYY").toString()}</div>
                </div>
                <div className="w-5/12 text-center xl:text-left xl:pl-4 2xl:pl-8"><EstimatedAPR estimatedAPR={estimatedAPR} /></div>
            </div>
            <newsletter.Form
                    method="post"
                    action="/newsletter/subscribe"
                    >
                    <div className={state === 'error' ? 'bg-white mt-4 rounded-full w-full pl-4 pr-2 py-1 mx-auto flex border-2 border-red-400 2xl:max-w-[400px] 2xl:ml-0' : 'bg-white mt-4 rounded-full w-full pl-4 pr-2 py-1 mx-auto flex lg:w-full border-2 2xl:max-w-[400px] 2xl:ml-0'}>
                        <input type="email" className="text-sm text-slate-500 outline-0 w-full" name="email" ref={ref} placeholder="Enter your email" aria-label="Email address" aria-describedby="error-message" />
                        <WhitelistButton className="bg-green flex items-center text-xs w-min text-right" onClick={newsletter.submit}>
                            <PaperAirplaneIcon className={state === 'submitting' ? 'lg:hidden w-4 h-4 text-white animate-pulse' : 'lg:hidden w-4 h-4 text-white'} />
                            <div className="hidden uppercase lg:block min-w-max">Be reminded</div>
                        </WhitelistButton>
                    </div>
                    <div id="error-message" className={state === "success" ? 'text-green text-sm mt-1 mx-auto w-full lg:w-6/12 lg:pl-6 text-left ml-2' : "text-red-600 mt-1 mx-auto w-full text-sm lg:w-6/12 text-left lg:pl-6 ml-2"}>{state === "error" ? newsletter?.data?.error : newsletter?.data?.message}</div>
                </newsletter.Form>
        </div>
    )
}

export default function ProjectOverview({project}: {project: Projects}) {

      return (
        <div className="bg-black bg-navigation rounded-3xl flex flex-wrap p-6 md:p-8 2xl:max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 xl:w-5/12">
                <img src={`/assets/images/projects/${project.slug}/image.png`} alt={`${project.name}  NFT card`} className="w-full md:w-11/12 xl:w-full" />
            </div>
            <div className="w-full mt-6 p-2 md:w-1/2 md:-mt-0 flex flex-wrap justify-between items-center xl:w-7/12 xl:items-left xl:pl-12 2xl:w-7/12 2xl:pl-16 2xl:pr-0">
            <div className="w-full">
                <div className="font-trash text-4xl text-white xl:text-5xl 2xl:text-6xl">109 UST <span className="font-americana font-thin text-lg text-beaige xl:text-xl 2xl:text-2xl">/ NFT</span></div>
                <div className="font-inter text-beaige text-xs xl:text-base">142 NFTs { project.saleIsOpen && <span>left</span>}</div>
            </div>
            <div className="mt-8 w-full md:mt-5 xl:mt-4">
                { project.saleIsOpen && !project.isSoldOut && <MintComponent {...project} /> }
                { project.isSoldOut && <SoldoutComponent {...project} />}
                { moment(project.saleDate).isAfter(moment(new Date()))  && <ComingSoonComponent {...project} /> }
            </div>
            <div className="mt-10 w-full md:mt-6 xl:mt-5">
                { project.isSoldOut && <FollowComponent />}
                { !project.isSoldOut && <SimularorComponent />}
            </div>
            </div>
        </div>
      )
  }