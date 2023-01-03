import { Tab } from "@headlessui/react";
import { PortableText } from "@portabletext/react";
import { useState } from "react";
import type { SanityTab } from "~/utils/sanity/types";

export default function TabsWrapper({tabs}: {tabs: SanityTab[]}) {
    const [readMore, setReadMore] = useState(true);
    const components = {
        types: {
            break: ({value}: any) => {
                const style = value.style;
                if (style === "lineBreak") {
                  return <br />;
                }
                if (readMore && style === "readMore") {
                  return (
                    <div className="readMore">
                      <button onClick={() => setReadMore(false)}>Read More</button>
                    </div>
                  );
                }
                return null;
              }
        },
        marks: {
            greenText: ({ children }: any) => <span className="text-green">{children}</span>,
        }
    }

    return (
        <div className="w-full overflow-hidden">
            <Tab.Group>
                <Tab.List className="flex overflow-x-scroll">
                    {tabs.map((tab, index) => (
                        <Tab key={`tab_${index}`} className={({ selected }) => `
                            ${selected ? 'text-neutral-100 bg-opacityLight-5 cursor-pointer rounded-lg px-4' : 'px-0 text-neutral-300'}
                            font-inter font-normal py-2 mr-3 text-sm md:mr-2 md:text-base md:px-4 hover:text-neutral-100 outline-none flex flex-nowrap items-center whitespace-nowrap
                        `}>
                            {tab.title}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-6">
                    {tabs.map((tab, index) => (
                        <Tab.Panel key={`tab_panel_${index}`} className="text-neutral-100 focus:outline-none flex w-full pb-12 flex-wrap">
                            <div className={tab.mapURL ? "w-full xl:w-1/2" : "w-full"}>
                                <PortableText value={tab.paragraph} components={components} />
                            </div>
                            <div className={tab.mapURL ? "w-full mt-4 xl:w-1/2 xl:pl-12 xl:mt-0" : "w-0"}>
                                <iframe title="project map" src={tab.mapURL} width="100%" height="100%" className="rounded-lg min-h-[200px] md:min-h-[300px]" allowFullScreen={true} loading="lazy"></iframe>
                            </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}