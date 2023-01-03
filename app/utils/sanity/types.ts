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

export interface SEO {
    title: string;
    description: string;
    image: any;
    keywords: string;
    ogurl: string;
    ogtype: string;
    ogtitle: string;
    ogdescription: string;
    ogimage: any;
    ogarticlepublishedtime: string;
    ogarticletag: string;
    ogarticlesection: string;
    ogarticleauthor: string;
    twitterdomain: string;
    twittercard: string;
    twittertitle: string;
    twitterdescription: string;
    twitterimage: any;
    twitterurl: string;
}

export interface Slug {
    _type: string;
    current: string;
}

export interface SanityContent {
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: Slug;
    mediumArticle: string;
    dueDiligence: string;
    projectOverview: SanitySections,
    imagesGallery: any[],
    reports: Report[],
    certifier: Certifier,
    seo: SEO
}