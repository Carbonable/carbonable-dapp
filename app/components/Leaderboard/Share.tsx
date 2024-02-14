import { useQuery } from "@apollo/client";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { GET_MY_RANK } from "~/graphql/queries/leaderboard";

export default function Share() {
    const { address } = useAccount();
    const [points, setPoints] = useState(0);
    const [rank, setRank] = useState<number|string>(0);

    const { error, data } = useQuery(GET_MY_RANK, {
        variables: {
            wallet_address: address
        }
    });

    useEffect(() => {
        if (data) {
            setPoints(data.leaderboardForWallet.total_score || 0);
            setRank(data.leaderboardForWallet.position || 'last');
        }
    }, [data]);

    if (error) {
        console.error('Error fetching my score', error);
    }

    const link = `https://twitter.com/intent/tweet?text=I'm%20making%20a%20positive%20impact%20with%20%40carbonable_io!%0A%0AI'm%20currently%20ranked%20${formatRank(rank)}%20with%20${points}%20points%20on%20the%20leaderboard%F0%9F%8F%86%20%0A%0AJoin%20me%20on%20my%20%23provable%20nature%20restoration%20journey%20%F0%9F%8C%B1&url=https%3A%2F%2Fapp.carbonable.io%2Fleaderboard`;
    return (
        <a href={link} 
            className="hover:text-neutral-100 flex items-center text-neutral-300"
            target="_blank"
            rel="noreferrer"
        >
            Share your score
            <SparklesIcon className="h-4 w-4 ml-1" />
        </a>
    )
}

function formatRank(rank: number|string) {
    if (rank === 'last') {
        return 'last';
    }
    if (rank === 1) {
        return "1st";
    }
    if (rank === 2) {
        return "2nd";
    }
    if (rank === 3) {
        return "3rd";
    }
    return `${rank}th`;
}