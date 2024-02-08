import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
    query leaderboard($pagination: Pagination!) {
        leaderboard(pagination: $pagination) {
            data {
                id
                wallet_address
                total_score
                points {
                    rule
                    value
                }
            }
            page_info {
                total
                page
                limit
            }
        }
    }
`;

export const GET_MY_RANK = gql`
    query leaderboardForWallet($wallet_address: String!) {
        leaderboardForWallet(wallet_address: $wallet_address) {
            id
            wallet_address
            total_score
            points {
                rule
                value
            }
        }
    }
`;

export const GET_MY_SCORE = gql`
    query leaderboardForWallet($wallet_address: String!) {
        leaderboardForWallet(wallet_address: $wallet_address) {
            total_score
        }
    }
`;