import {  ReactElement, useEffect, useState } from "react";
// import Slider from "react-slick"; to be dev
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BadgeMint } from "../Buttons/ActionButton";
import { useStarknetExecute,  useAccount, useContract } from '@starknet-react/core'
import WalletMenu from "./WalletMenu";
import ErrorMessage from "./ErrorMessage";
import LoadingScreen from "./LoadingScreen";
import SuccessMessage from "./SuccessMessage";
import CarbonableBadgeABI from "../../abi/testnet/CarbonableBadge_abi.json";




interface Signature {
    low: string,
    high: string
}



export default function Carousel({badges}: any) {
    const minterContractAddress = '0x03ffeb896f1a6cddde4f13269e2639ba25326f6752695e10efb7833fa78794f2'
    const badgeContractAddress = '0x073b3700c5e4851892e907e782a3ab8efd103a06cd89ff052d91307d18f0649d'

    const [signature, setSignature] = useState({ low: '0', high: '0' });
    const [badgeType, setBadgeType] = useState(0);
    const [menu, setMenu] = useState<ReactElement | Element | null>(null);
    const [currentTransactionHash, setCurrentTransactionHash] = useState('');
    const { account, address } = useAccount()
    const { execute } = useStarknetExecute({ 
        calls: {
            contractAddress: minterContractAddress,
            entrypoint: 'claim',
            calldata: [signature.low, signature.high, badgeType]
        }
    })
    const { contract:badgeContract } = useContract({
        address: badgeContractAddress,
        abi: CarbonableBadgeABI
    })
    const [activeSlide, setActiveSlide] = useState(2);
    const handleClick = (index: number) => {
        setActiveSlide(index);
        slidz.slickGoTo(index);
    }

    useEffect(() => {
        execute().then(transaction => {
            const transactionHash = transaction.transaction_hash;
            setCurrentTransactionHash(transactionHash);
        })
    }, [signature, badgeType, execute]);

    useEffect(() => {
        if (currentTransactionHash) {
            checkTransactionStatus();
            const interval = setInterval(() => {
                checkTransactionStatus();
            }, 3000)
            function checkTransactionStatus() {
                fetch("https://alpha4.starknet.io/feeder_gateway/get_transaction_receipt?transactionHash=" + currentTransactionHash).then(async (response) => {
                    const data = await response.json();
                    if (data.status === 'ACCEPTED_ON_L2' || data.status === 'ACCEPTED_ON_L1') {
                        setMenu(<SuccessMessage strong="Success." text="Your badge has been minted!" action={() => setMenu(null)} />);
                        setCurrentTransactionHash('');
                    }
                    else {
                        setMenu(<SuccessMessage strong={data.status} text="Waiting for the transaction to be accepted. This may take a few minutes." buttonText="Please wait..." />);
                    }
                })
            }
            return () => clearInterval(interval);
        }
    }, [currentTransactionHash]);



    let slidz: any;

     
    

    return (
        
        <div className=" preventOverflow mb-20">
            <div id="assets" className="grid justify-items-center place-items-center w-11/12 max-w-screen-2xl scroll-mt-12 mx-auto ">
                    <div className=" w-60 md:w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 place-content-center justify-items-center  gap-x-8">
                    {badges.map((image, index) => (
                        <div key={`image_${index}`} className="relative px-2 flex justify-center items-center outline-0 my-2">
                            <img alt={`Carbonable Badge ${index}`} onMouseOver={() => handleClick(index)} src={`/assets/images/quest/${image.name}`} className={index === activeSlide ? "rounded-lg brightness-110  w-full h-40 z-0 " : "rounded-lg brightness-50 w-full h-40 z-0"}   />
                            { (image.mintable && index === activeSlide )   &&
                            
                            <div className="absolute  h-full bg-green z-20 uppercase font-inter font-bold  text-black  w-11/12 py-2 px-2 top-0  text-[8px] md:text-xs  lg:px-3 "> 
                                <div className="grid grid-flow-row  h-full items-stretch">
                                    <p className="font-trash font-bold text-3xl self-start">green <br /></p> 
                                    <p className="font-americana font-thin text-2xl self-start">pioneer</p>
                                    <BadgeMint className=" place-self-center self-end w-28" onClick={async () => {
                                        setMenu(<LoadingScreen />)

                                        if (!badgeContract) return;
                                        if (!account) return setMenu(<WalletMenu action={() => setMenu(null)} />);

                                        // Check if the user has already minted the badge
                                        const balance = parseInt((await badgeContract.functions.balanceOf(address, [image.token_id, 0])).balance.low);
                                        if (balance > 0) return setMenu(<ErrorMessage strong="You already have minted this badge." text="You can only mint each badge one time." action={() => setMenu(null)} />);
                                        
                                        // Check if the user is whitelisted
                                        const res = await fetch(`quest/sign/${account.address}/${image.token_id}`)
                                        const signature: Signature = await res.json();
                                        if (!signature.low || !signature.high) return setMenu(<ErrorMessage strong="You are currently not in the whitelist." text="Complete the quests on Crew3, then wait a bit and you'll be added." action={() => setMenu(null)} />);
                                        
                                        // Mint the badge
                                        setMenu(<SuccessMessage strong="Success." text="Please approve the transaction" action={() => setMenu(null)} />)
                                        setSignature(signature);
                                        setBadgeType(image.token_id);
                                    }}> Mint SBT</BadgeMint>
                                </div> 
                            </div>
                            }
                            { (!image.mintable && index === activeSlide )   &&
                                <div className="absolute  h-full  bg-white/70  z-10 uppercase font-inter font-bold  text-black  w-11/12 py-2 px-2 top-0  text-[8px] md:text-xs  lg:px-3 ">
                                    <div className=" absolute z-20 uppercase font-inter font-bold bg-beaige text-black top-2 left-2 py-1 px-2 text-[8px] md:text-xs md:top-4 md:left-4 lg:px-3 rounded-lg">Locked</div>
                                </div>
                            }
                        </div>
                    ))}
                    </div>
                <div className="max-w-2xl flex flex-wrap mt-8 text-center lg:text-left lg:w-10/12 lg:mx-auto lg:flex-nowrap">
                    <div className="flex w-full items-center justify-center lg:w-9/12 lg:justify-start lg:flex-wrap">
                    <div className="flex w-full items-center justify-center lg:justify-start">
                        {badges.map(( image, index) => (
                            <SliderButton key={`button_${index + 1}`} selected={index === activeSlide} onClick={() => handleClick(index)}>0{index + 1}</SliderButton>
                        ))}
                    </div>
                        <div className="w-full hidden lg:block lg:ml-1">
                            {badges[activeSlide].subtitle}
                        </div>
                    </div>
                    
                    <div className="w-full flex items-center justify-center font-inter text-3xl line-through mt-4 lg:w-4/12 lg:justify-end lg:text-right lg:min-h-[96px] md:text-4xl lg:text-5xl">
                        {badges[activeSlide].title}
                    </div>
                    <div className="w-full lg:hidden min-h-[52px]">
                        {badges[activeSlide].subtitle}
                    </div>
                </div>
            </div>
            {menu}
        </div>
    )
}

interface ButtonProps {
    children: React.ReactNode;
    selected: boolean;
    onClick: any;
}

function SliderButton({ children, selected, onClick }: ButtonProps) {
    if (selected) {
        return (
            <>
                <div className="relative w-[48px] h-[48px] p-1 bg-carousel-button-border rounded-full z-0 lg:px-3">
                    <div className="absolute z-1 m-[2px] top-0 left-0 font-inter text-beaige bg-[#000000] w-[44px] h-[44px] rounded-full">
                        <div className="bg-carousel-button w-[44px] h-[44px] rounded-full flex items-center justify-center">
                            { children }
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div onClick = {() => { onClick(); }} className="font-inter px-3 text-[#272727] cursor-pointer lg:px-6">{ children }</div>
    )
}