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
export function shortenNumber(number: number): string {
    return Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2
      }).format(number);
}