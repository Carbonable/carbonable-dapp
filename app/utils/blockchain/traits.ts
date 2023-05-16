export const enum Traits {
    COLOR = "Project color",
    STATUS = "Status",
}

export const enum Color {
    BLUE = "Blue",
    GREEN = "Green",
    BROWN = "Brown",
}

export const enum FarmStatus {
    UPCOMING = "Upcoming",
    LIVE = "Live",
    PAUSED = "Paused",
    STOPPED = "Stopped",
    ENDED = "Ended",
}

/**
 * Get the value of a trait
 * @param traits
 * @param key
 * @returns string
*/
export function getTraitValue(traits: any[] | undefined, key: string) {
    if (undefined === traits) { return ''; }

    return traits.filter(trait => trait.trait_type === key)[0].value;
}