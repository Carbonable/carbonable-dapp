import { IPFS_GATEWAY, STARKNET_ID_INDEXER_MAINNET, STARKSCAN_MAINNET, STARKSCAN_TESTNET, STARKSCAN_TESTNET2 } from "./links";

/**
 * Validate user email format
 * 
 * @param {string} email
 * @returns {boolean} Returns if the email has a valid format
 */
export function validateEmail(email: string | undefined): boolean {
    if (undefined === email) { return false; }
    // eslint-disable-next-line no-useless-escape
    const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.match(mailformat) ? true : false;
}

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

/**
 * Shorten number to display
 * 
 * @param {number} number
 * @returns {string} Shorten value
 */
export function shortenNumber(number: number | bigint | undefined): string {
    if (undefined === number) { return '-'; }
    return Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2
      }).format(number);
}

/**
 * Shorten number to display
 * 
 * @param {number} number
 * @returns {string} Shorten value
 */
export function shortenNumberWithDigits(number: number | bigint | undefined, digits: number): string {
    if (undefined === number) { return '-'; }
    return Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: digits
      }).format(number);
}

/**
 * Simplify hex address
 * @param hex 
 * @returns string
 */
export function simplifyAddress(hex: string | undefined): string {
    if (undefined === hex) { return ''; }
    // Remove the firsts zeros and the 0x
    return hex.replace(/^0x0*/, '').toLowerCase();
}

/** 
 * Split the url to get the ipfs path
 * @param url
 * @returns string
 */
export function ipfsUrl(url: string): string | undefined {
    return url.split("ipfs://").pop();
}

/**
 * Get the url of the image
 * @param url
 * @returns string
 */
export async function getImageUrl(url: string): Promise<string> {
    if (url.startsWith("ipfs://")) {
        return IPFS_GATEWAY + ipfsUrl(url);
    }

    return url;
}

/**
 * Get the url of the image
 * @param url
 * @returns string
 */
export async function getImageUrlFromMetadata(url: string): Promise<string> {
    if (url.startsWith("ipfs://")) {
        return IPFS_GATEWAY + ipfsUrl(url);
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.image;
}

/**
 * Get starkscan url for a network
 * @param network
 * @returns string
 */
export function getStarkscanUrl(network: string): string {
    switch (network) {
        case "mainnet":
            return STARKSCAN_MAINNET;
        case "testnet":
            return STARKSCAN_TESTNET;
        case "testnet2":
            return STARKSCAN_TESTNET2;
        default:
            return STARKSCAN_MAINNET;
    }
}