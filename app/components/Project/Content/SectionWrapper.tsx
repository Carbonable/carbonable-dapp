import type { SanitySection } from "~/utils/sanity/types"
import TabsWrapper from "./TabsWrapper"

export default function SectionWrapper({section}: {section: SanitySection}) {
    return (
        <div className="mt-4 pt-8 border-t border-neutral-500">
            <div className="font-inter font-bold text-neutral-300 uppercase">{section.title}</div>
            <div className="mt-6"> 
                { section.tabs && <TabsWrapper tabs={section.tabs}></TabsWrapper> }
            </div>
        </div>
    )
}