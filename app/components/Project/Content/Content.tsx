import { LinkSecondary } from "~/components/Buttons/LinkButton";
import { urlFor } from "~/utils/sanity/image";
import ImageGallery from "./ImagesGallery";
import Reports from "./Reports";
import Section from "./SectionWrapper";
import Tracking from "./Tracking";
import { useContent } from "./ContentWrapper";

export default function Content() {
    const { content, mapboxKey, trackingActivated } = useContent();

    return (
        <div className="mb-20">
            <div className="font-inter font-bold text-neutral-100 text-lg uppercase flex flex-wrap items-center pb-2">
                <div>
                    🔍 <span className="ml-2">Project overview</span>
                </div>
                <div className="hidden md:block mx-6 font-thin text-2xl mt-[-4px] text-neutral-500">|</div>
                { content.mediumArticle !== undefined && 
                    <div className="mt-4 mr-8 md:mt-0 md:mr-2">
                        <LinkSecondary  href={content.mediumArticle}>Our medium article</LinkSecondary>
                    </div>
                }   
                { content.dueDiligence !== undefined && <div className="mt-4 md:mt-0">
                    <LinkSecondary href={content.dueDiligence}>Due diligence</LinkSecondary>
                </div>
                }
            </div>
            { content.projectOverview && content.projectOverview.sections.length > 0 && content.projectOverview.sections.map((section, index) => (
                <Section key={`section_${index}`} section={section}></Section>
            ))}
            <Tracking mapboxKey={mapboxKey} trackingActivated={trackingActivated} />
            { (content.imagesGallery?.length > 0 || content.reports?.length > 0) && <div className="font-inter font-bold text-neutral-100 text-lg uppercase mt-12">✨ <span className="ml-2">Impact</span></div>}
            { content.imagesGallery?.length > 0 && <div className="mt-4 pt-8 border-t border-neutral-500">
                <div className="font-inter font-bold text-neutral-300 uppercase">Images gallery</div>
                <div className="mt-4">
                    <ImageGallery gallery={content.imagesGallery} />
                </div>
            </div>
            }
            { content.reports?.length > 0 && <div className="mt-4 pt-8 border-t border-neutral-500">
                <div className="font-inter font-bold text-neutral-300 uppercase">Impacts reports</div>
                <div className="mt-4">
                    <Reports reports={content.reports} />
                </div>
            </div>
            }
            <div className="w-full border border-neutral-500 text-center py-16 mt-20 rounded-3xl font-inter">
                <div className="text-neutral-300 text-lg">Proudly certified by</div>
                <img src={urlFor(content.certifier.logo).width(500).url()} alt="Certifier logo" className="mx-auto" />
                <a className="text-neutral-300 text-xl cursor-pointer hover:text-neutral-200" href={content.certifier.link} target="_blank" rel="noreferrer">{content.certifier.link}</a>
            </div>
        </div>
    )
}