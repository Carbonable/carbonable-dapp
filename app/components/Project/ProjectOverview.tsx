import { MinusIcon, PaperAirplaneIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { Projects } from "@prisma/client";
import { useFetcher, useTransition } from "@remix-run/react";
import moment from "moment";
import { useRef, useState } from "react";
import { MintButton, WhitelistButton } from "../Buttons/ActionButton";
import { PlusIconBlack } from "../Icons/PlusIcon";

function EstimatedAPR({estimatedAPR}: {estimatedAPR: string}) {
    return (
        <div className="font-inter text-green text-xs text-center">Estimated APR {estimatedAPR}</div>
    )
}

function FollowComponent() {
    return (
        <>
            <div className="font-trash font-bold text-xl uppercase">Follow the progress</div>
            <div className="font-americana font-light text-lg uppercase">of the project</div>
            <div className="mt-6"><a href="/" target="_blank" className="bg-green-blue font-inter uppercase text-black/50 px-8 py-4 rounded-full text-sm font-semibold">Impact report</a></div>
        </>
    )
}

function SimularorComponent() {
    return (
        <div>
            <>
                <div className="font-trash font-bold text-base uppercase">Estimate your gain for you</div>
                <div className="font-americana font-light text-base uppercase">and the planet</div>
                <div className="mt-6"><a href="https://carbonable.io#simulator" target="_blank" className="bg-green-blue font-inter uppercase text-black/50 px-10 py-4 rounded-full text-sm font-semibold" rel="noreferrer">Simulator</a></div>
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
                    className="w-full flex items-start justify-center"
                    >
                <div className="w-4/12 flex items-center justify-center bg-black rounded-full text-white p-2 border border-white">
                    <MinusIcon className="w-6 bg-white p-1 rounded-full text-black" onClick={() => amount > 1 ? setAmount(amount - 1) : 1} />
                    <div className="w-1/2 text-center">
                        <input className="bg-transparent w-full text-center outline-none" type="number" value={amount} name="amount" ref={refMint} aria-label="Amount" aria-describedby="error-message" onChange={(e) => parseInt(e.target.value) > 0 ? setAmount(parseInt(e.target.value) || 1) : 1} />
                    </div>
                    <PlusIcon className="w-6 bg-white p-1 rounded-full text-black"  onClick={() => setAmount(amount + 1)} />
                </div>
                <div className="w-8/12 flex flex-wrap items-center justify-center px-1">
                    <MintButton onClick={mint.submit}>Buy now - 109 UST</MintButton>
                    <div className="mt-2"><EstimatedAPR estimatedAPR={estimatedAPR} /></div>
                </div>
            </mint.Form>
        </div>
    )
}

function SoldoutComponent({saleDate, estimatedAPR}: Projects) {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex items-center justify-center font-inter font-bold text-xs text-black bg-white rounded-md w-7/12 py-1 px-2">
                <div>Soldout</div>
                <PlusIconBlack className="w-2 mx-1"></PlusIconBlack>
                <div>{moment(saleDate).format("MM.DD.YYYY").toString()}</div>
            </div>
            <div className="w-5/12 text-center"><EstimatedAPR estimatedAPR={estimatedAPR} /></div>
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
            <div className="w-full flex items-center justify-center">
                <div className="flex items-center justify-center font-inter font-bold text-xs text-black bg-green-blue rounded-md w-7/12 py-1 px-2">
                    <div>Coming soon</div>
                    <PlusIconBlack className="w-2 mx-1"></PlusIconBlack>
                    <div>{moment(saleDate).format("MM.DD.YYYY").toString()}</div>
                </div>
                <div className="w-5/12 text-center"><EstimatedAPR estimatedAPR={estimatedAPR} /></div>
            </div>
            <newsletter.Form
                    method="post"
                    action="/newsletter/subscribe"
                    >
                    <div className={state === 'error' ? 'bg-white mt-4 rounded-full w-full pl-4 pr-2 py-1 mx-auto flex lg:w-10/12 border-2 border-red-400' : 'bg-white mt-4 rounded-full w-full pl-4 pr-2 py-1 mx-auto flex lg:w-10/12 border-2'}>
                        <input type="email" className="text-sm text-slate-500 outline-0 w-full" name="email" ref={ref} placeholder="Enter your email" aria-label="Email address" aria-describedby="error-message" />
                        <WhitelistButton className="bg-green flex items-center text-xs lg:ml-28 w-min text-right" onClick={newsletter.submit}>
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
          <div>
            <div className="bg-black bg-navigation rounded-xl flex flex-wrap py-6 px-4">
              <div className="w-full">
                <img src={`/assets/images/projects/${project.slug}/image.png`} alt={`${project.name}  NFT card`} className="w-full" />
              </div>
              <div className="w-full mt-6 p-2">
                <div>
                  <div className="font-trash text-4xl text-white">109 UST <span className="font-americana font-thin text-lg text-beaige">/ NFT</span></div>
                  <div className="font-inter text-beaige text-xs">142 NFTs { project.saleIsOpen && <span>left</span>}</div>
                </div>
                <div className="mt-8">
                  { project.saleIsOpen && !project.isSoldOut && <MintComponent {...project} /> }
                  { project.isSoldOut && <SoldoutComponent {...project} />}
                  { moment(project.saleDate).isAfter(moment(new Date()))  && <ComingSoonComponent {...project} /> }
                </div>
                <div className="mt-14">
                    { project.isSoldOut && <FollowComponent />}
                    { !project.isSoldOut && <SimularorComponent />}
                </div>
              </div>
            </div>
          </div>
      )
  }