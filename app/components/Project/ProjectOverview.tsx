import type { Projects } from "@prisma/client";
import moment from "moment";
import { PlusIconBlack } from "../Icons/PlusIcon";

function EstimatedAPR({estimatedAPR}: {estimatedAPR: string}) {
    return (
        <div className="font-inter text-green text-xs">Estimated APR {estimatedAPR}</div>
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

        </div>
    )
}

function MintComponent() {
    return (
        <div>

        </div>
    )
}

function SoldoutComponent({saleDate, estimatedAPR}: Projects) {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex items-center justify-center font-inter font-bold text-xs text-black bg-white rounded-md w-1/2 p-1">
                <div>Soldout</div>
                <PlusIconBlack className="w-2 mx-1"></PlusIconBlack>
                <div>{moment(saleDate).format("MM.DD.YYYY").toString()}</div>
            </div>
            <div className="w-1/2 text-center"><EstimatedAPR estimatedAPR={estimatedAPR} /></div>
        </div>
    )
}

function ComingSoonComponent() {
    return (
        <div>

        </div>
    )
}

export default function ProjectOverview({project}: {project: Projects}) {

      return (
          <div>
            <div className="bg-black bg-navigation rounded-xl flex flex-wrap p-6">
              <div className="w-full">
                <img src={`/assets/images/projects/${project.slug}/image.png`} alt={`${project.name}  NFT card`} className="w-full" />
              </div>
              <div className="w-full mt-8 p-2">
                <div>
                  <div className="font-trash text-4xl text-white">109 UST <span className="font-americana font-thin text-lg text-beaige">/ NFT</span></div>
                  <div className="font-inter text-beaige text-xs">142 NFTs { project.saleIsOpen && <span>left</span>}</div>
                </div>
                <div className="mt-6">
                  { project.saleIsOpen && !project.isSoldOut && <MintComponent /> }
                  { project.isSoldOut && <SoldoutComponent {...project} />}
                  { moment(project.saleDate).isAfter(moment(new Date()))  && <ComingSoonComponent /> }
                </div>
                <div className="mt-12">
                    { project.isSoldOut && <FollowComponent />}
                    { !project.isSoldOut && <SimularorComponent />}
                </div>
              </div>
            </div>
          </div>
      )
  }