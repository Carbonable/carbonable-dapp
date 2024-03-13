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
                categories {
                    fund
                    farming
                    other
                }
                position
            }
            page_info {
                max_page
                page
                limit
                count
                has_next_page
                has_previous_page
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
                metadata {
                    project_name
                    slot
                    date
                    event
                    boosts
                }
            }
            categories {
                fund
                farming
                other
            }
            position
        }
    }
`;
