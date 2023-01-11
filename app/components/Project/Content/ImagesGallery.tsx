import Slider from "react-slick";
import { useState } from "react";
import { urlFor } from "~/utils/sanity/image";


export default function ImageGallery({gallery}: {gallery: any[]}) {
    const [activeSlide, setActiveSlide] = useState(0);
    const handleClick = (index: number) => {
        setActiveSlide(index);
        slidz.slickGoTo(index);
    }

    let slidz: any;

    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3500,
        beforeChange: (current: number, next: number) => { 
            setActiveSlide(next); 
        },

    };
      
    return (
        <div className="preventOverflow mb-12">
            <Slider ref={slider => (slidz = slider)} {...settings} className="flex  overflow-hidden">
                {gallery.map((image, index) => (
                    <div key={`image_${index}`} className="pr-1 ml-12 md:ml-32 xl:ml-40 2xl:ml-48 outline-none">
                        <img src={urlFor(image).width(500).url()} alt={`image_${index}`} className={`w-full max-h-[98px] md:max-h-[196px] lg:max-h-[194px] xl:max-h-[214px] 2xl:max-h-[239px] object-cover outline-none ${index === activeSlide ? "brightness-110" : "brightness-[0.4] cursor-pointer"}` } onClick={() => handleClick(index)} />
                    </div>
                ))}
            </Slider>
            <div className="flex flex-nowrap w-10/12 mx-auto border-b border-neutral-500 ml-8 md:w-9/12 md:ml-20 lg:ml-28 xl:ml-32 2xl:ml-36 items-end justify-between min-h-[70px]">
                {gallery.map((image, index) => {
                    if (index === activeSlide) {
                        return (
                            <img src="/assets/images/gallery/selected.svg" alt="selected" className="w-4 md:w-6 mx-2" key={`selected_${index}`} />
                        )
                    }
                    return (
                        <img src="/assets/images/gallery/unselected.svg" alt="selected" className="w-4 md:w-6 cursor-pointer mx-2" key={`unselected_${index}`} onClick={() => handleClick(index)} />
                    )
                })}
            </div>
        </div>
    )
}