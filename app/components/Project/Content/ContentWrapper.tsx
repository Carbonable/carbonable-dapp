import { createContext, useContext } from "react";
import type { SanityContent } from "~/utils/sanity/types";

type ContentContextType = {
    mapboxKey: string;
    trackingActivated: boolean;
    content: SanityContent;
    slug: string;
};

type ContentWrapperProps = {
    children?: React.ReactNode;
    content: SanityContent | undefined;
    mapboxKey: string;
    trackingActivated: boolean;
    slug: string;
};

const ContentContext = createContext<ContentContextType>({} as ContentContextType);

export default function ContentWrapper({ children, content, mapboxKey, trackingActivated, slug }: ContentWrapperProps) {

    if (content === undefined) return null;

    return (
        <ContentContext.Provider value={{mapboxKey, trackingActivated, content, slug}}>
            {children}
        </ContentContext.Provider>
    )
}

export function useContent() {
    return useContext(ContentContext);
}