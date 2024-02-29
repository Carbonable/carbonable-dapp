import { IPFS_GATEWAY, STARKSCAN_MAINNET, STARKSCAN_SEPOLIA, STARKSCAN_TESTNET } from "./links";

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
    if (url === undefined) return '';

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
export async function getImageUrlFromMetadata(url: string): Promise<any> {
    if (url.startsWith("data:application/json")) {
        const jsonData = JSON.parse(url.split("data:application/json,").pop() || "");
        const image = 
            jsonData.image_data ? jsonData.image_data : 
                jsonData.image ? jsonData.image : null;
        
        return { 
            imgUrl: image ? image.split("data:image/svg+xml,").pop() || "" : null,
            isSvg: true
        };
    }

    if (url.startsWith('"data:image/png;base64,')) {
        const imageData = url.split('"data:image/png;base64,').pop()?.replace('"', '');
        
        return { 
            imgUrl: imageData,
            isSvg: false
        };
    }
   
    if (url.startsWith("ipfs://")) {
        return { 
            imgUrl: IPFS_GATEWAY + ipfsUrl(url),
            isSvg: false
        };
    }

    if (url.startsWith("<svg") || url.startsWith("data:image/svg+xml")) {
        return { 
            imgUrl: url,
            isSvg: true
        };
    }

    const response = await fetch(url);

    try {
        const data = await response.json();
        const imageData = data.image.split('data:image/png;base64,').pop()?.replace('"', '');

        return { 
            imgUrl: imageData,
            isSvg: false
        };
    } catch (error) {
        return {
            imgUrl: url,
            isSvg: false
        }
    }
    
    
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
        case "goerli":
            return STARKSCAN_TESTNET;
        case "sepolia":
            return STARKSCAN_SEPOLIA;
        default:
            return STARKSCAN_MAINNET;
    }
}

export function minifyAddressOrStarknetId(address: string | undefined, starknetId: string | undefined) {
    const input = starknetId !== undefined ? starknetId : address;
    if (input === undefined) { return ""; }

    return input.length > 24 ? `${input.substring(0, 7)} ... ${input.substring(input.length - 7, input.length)}` : input;
}