import { useState } from "react";
import Slider from "react-slick";
import LinkButton, {  LinkOutsideButton } from "~/components/Buttons/LinkButton";
import PlusIconWhite from "~/components/Icons/PlusIcon";
import { MEDIUM_LINK } from "~/utils/links";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BadgeMint } from "../Buttons/ActionButton";


export default function Carousel() {
    const [activeSlide, setActiveSlide] = useState(2);
    const handleClick = (index: number) => {
        setActiveSlide(index);
        slidz.slickGoTo(index);
    }
  
    let slidz: any;

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        centerMode: true,
        beforeChange: (current: number, next: number) => { 
            setActiveSlide(next); 
        },
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 3
                }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  className: "center",
                  centerMode: true,
                }
            }
          ]
    };

    const slides = [
        {
            name: 'project1.png',
            title: 'Community Badge lvl-1',
            subtitle: 'Become a Carbonable OG',
            mintable: true
        },
        {
            name: 'project2.png',
            title: '???',
            subtitle: '?',
            mintable: false
        },
        {
            name: 'project3.png',
            title: '???',
            subtitle: '?',
            mintable: false
        }

    ];
    
    return (
        <div className=" preventOverflow mb-20">
            <div id="assets" className="grid justify-items-center place-items-center w-11/12 max-w-screen-2xl scroll-mt-12 mx-auto ">
               
                    <div className=" w-60 md:w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 place-content-center justify-items-center  gap-x-8">
                    {slides.map((image, index) => (
                        <div key={`image_${index}`} className="relative px-2 flex justify-center items-center outline-0 my-2">
                            <img alt={`Carbonable Badge ${index}`} onMouseOver={() => handleClick(index)} src={`/assets/images/quest/${image.name}`} className={index === activeSlide ? "rounded-lg brightness-110  w-full h-40 z-0 " : "rounded-lg brightness-50 w-full h-40 z-0"}   />
                            { (image.mintable && index === activeSlide )   &&
                            
                            <div className="absolute  h-full bg-green z-20 uppercase font-inter font-bold  text-black  w-11/12 py-2 px-2 top-0  text-[8px] md:text-xs  lg:px-3 "> 
                                <div className="grid grid-flow-row  h-full items-stretch">
                                    <p className="font-trash font-bold text-3xl self-start">green <br /></p> 
                                    <p className="font-americana font-thin text-2xl self-start">pioneer</p>
                                    <BadgeMint className=" place-self-center self-end w-28" onClick={undefined}> Mint SBT</BadgeMint>
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
                        {slides.map((image, index) => (
                            <SliderButton key={`button_${index + 1}`} selected={index === activeSlide} onClick={() => handleClick(index)}>0{index + 1}</SliderButton>
                        ))}
                    </div>
                        <div className="w-full hidden lg:block lg:ml-1">
                            {slides[activeSlide].subtitle}
                        </div>
                    </div>
                    
                    <div className="w-full flex items-center justify-center font-inter text-3xl line-through mt-4 lg:w-4/12 lg:justify-end lg:text-right lg:min-h-[96px] md:text-4xl lg:text-5xl">
                        {slides[activeSlide].title}
                    </div>
                    <div className="w-full lg:hidden min-h-[52px]">
                        {slides[activeSlide].subtitle}
                    </div>
                </div>
             
            </div>
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