export interface ProjectProps {
    id: string,
    slug: string,
    name: string,
    address: string,
    uri: any,
    forecasted_apr: string,
    total_value: string,
    value_decimals: string,
    payment_token?: any
}

export interface LaunchpadProps {
    image: string | null,
    is_ready: boolean,
    is_sold_out: boolean,
    minter_contract: any,
    public_sale_open: boolean,
    sale_date: Date | string | null,
    whitelisted_sale_open: boolean,
}

export interface MintProps {
    min_value_per_tx: any,
    max_value_per_tx: any,
    max_value: any,
    total_value: any,
    remaining_value: any,
    reserved_value: any,
    payment_token_address: string
}

export interface LaunchpadLoaderData {
    project: ProjectProps,
    launchpad: LaunchpadProps,
    mint: MintProps
}
