import type { Abi } from "starknet";

export interface OverviewProps {
    total_removal: NumericValueProps;
    tvl: NumericValueProps;
    apr: any;
    total_yielded: NumericValueProps;
    total_offseted: NumericValueProps;
}

export interface NumericValueProps {
    displayable_value: string;
    type: string;
    value: any;
}

export interface ClaimableProps {
    available: NumericValueProps;
    total: NumericValueProps;
}

export interface CarbonCreditsProps {
    generated_credits: NumericValueProps;
    to_be_generated: NumericValueProps;
    offset: ClaimableProps;
    yield: ClaimableProps;
    min_to_claim: NumericValueProps;
}

export interface AssetsAllocationProps {
    yield: NumericValueProps;
    offseted: NumericValueProps;
    total: NumericValueProps;
    undeposited: NumericValueProps;
    tokens: TokenProps[];
}

interface TokenProps {
    project_address: string;
    slot: string;
    token_id: string;
    value: any;
    wallet: string;
}

export interface ContractsProps {
    offseter: string;
    offseter_abi: Abi;
    yielder: string;
    yielder_abi: Abi;
    payment: string;
    payment_abi: Abi;
    project: string;
    project_abi: Abi;
}