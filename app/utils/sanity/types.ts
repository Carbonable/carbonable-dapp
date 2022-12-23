export interface SanityTab {
    title: string;
    paragraph: any[];
    mapURL: string;
}

export interface SanitySection {
    title: string;
    tabs: SanityTab[];
}

export interface SanitySections {
    sections: SanitySection[]
}

export interface Report {
    name: string;
    date: string;
    link: string;
}

export interface Certifier {
    logo: any;
    link: string;
}

export interface SanityContent {
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: string;
    mediumArticle: string;
    dueDiligence: string;
    projectOverview: SanitySections,
    imagesGallery: any[],
    reports: Report[],
    certifier: Certifier
}