export interface Dmrv {
    area: number;
    bounds: number[];
    coordinates: Coordinates[];
    indicators: string[];
    name: string;
    ndvis: Ndvi[];
    rgbs: Rgb[];
}

export interface Coordinates {
    coordinates: number[];
}

export interface Ndvi {
    date: string;
    image: string;
    value: number;
}

export interface Rgb {
    date: string;
    url: string;
}
