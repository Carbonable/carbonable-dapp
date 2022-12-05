import { TxStatus } from "~/utils/blockchain/status"

function ReceivedComponent() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-3/12 pl-2"><img className="w-3/12" src="/assets/images/mint/received.png" alt="transaction is received" /></div>
            <div className="w-9/12 p-2">The hardest part is done: the seed is sown! 🌱 <br/>Now a little patience...</div>
        </div>
    ) 
}

function PendingComponent() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-3/12 pl-2"><img className="w-6/12" src="/assets/images/mint/pending.png" alt="transaction is received" /></div>
            <div className="w-9/12 p-2">Good news, the roots have taken well! Simply needs a bit more watering 💦 <br/> We are almost there.</div>
        </div>
    ) 
}

function AcceptedComponent() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-3/12 pl-2"><img className="w-9/12" src="/assets/images/mint/accepted.png" alt="transaction is received" /></div>
            <div className="w-9/12 p-2">Voila! 🪄 <br/>You can now reap the fruits of your labour :) <br/>Think about farming them!</div>
        </div>
    ) 
}


function ErrorComponent() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-3/12 pl-2"><img className="w-9/12" src="/assets/images/mint/error.svg" alt="transaction is received" /></div>
            <div className="w-9/12 p-2">Your transaction has failed.<br /> Please check your wallet for more details.</div>
        </div>
    ) 
}

export function ProgressComponent({progress}: {progress: string}) {
    return (
        <div className="text-beaige font-inter font-light italic">
            { progress === TxStatus.RECEIVED && <ReceivedComponent /> }
            { progress === TxStatus.PENDING && <PendingComponent /> }
            { progress === TxStatus.ACCEPTED_ON_L2 && <AcceptedComponent /> }
            { progress === TxStatus.REJECTED && <ErrorComponent /> } 
        </div>
    ) 
}

export function MintingComponent() {
    return (
        <div className="font-inter text-beaige font-thin">
            <span className="px-1 animate-blur-1">M</span>
            <span className="px-1 animate-blur-2">I</span>
            <span className="px-1 animate-blur-3">N</span>
            <span className="px-1 animate-blur-4">T</span>
            <span className="px-1 animate-blur-5">I</span>
            <span className="px-1 animate-blur-6">N</span>
            <span className="px-1 animate-blur-7">G</span>
        </div>
    )
}