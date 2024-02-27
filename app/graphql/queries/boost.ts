import { gql } from "@apollo/client";

export const GET_BOOST_FOR_WALLET = gql`
    query boostForWallet($wallet_address: String!, $value_to_buy: Int!, $address: String!, $slot: Int!) {
        boostForWallet(wallet_address: $wallet_address, value_to_buy: $value_to_buy, address: $address, slot: $slot) {
            value
            total_score
            boost
        }
    }
`;

export const GET_NEXT_BOOST_FOR_WALLET = gql`
    query nextBoostForWallet($wallet_address: String!, $value_to_buy: Int!, $address: String!, $slot: Int!) {
        nextBoostForWallet(wallet_address: $wallet_address, value_to_buy: $value_to_buy, address: $address, slot: $slot) {
            missing
            total_score
            boost
        }
    }
`;
