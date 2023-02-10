import { StarknetWindowObject } from "@argent/get-starknet";
import { useMutation } from "@tanstack/react-query";
import { Call } from "starknet";

export function useExecute({ account, calls, metadata }: { account: StarknetWindowObject, calls: Call[] | Call, metadata: any | null }) {
    function writeContract(account: StarknetWindowObject, args: { calls: Call[] | Call, metadata: any | null }) {
        return async function() {
            const { calls, metadata } = args;
            if (undefined === account || undefined === account.account) {
                throw new Error('No connector connected')
            }
            if (undefined === calls) {
                throw new Error('No calls specified')
            }
            return await account.account.execute(calls);
        };
    }

    const { data, isLoading, error, reset, mutateAsync } = useMutation(
        writeContract(account, { calls, metadata })
    );

    return {
        data,
        loading: isLoading,
        error: error ?? undefined,
        reset,
        execute: mutateAsync,
    }
}

