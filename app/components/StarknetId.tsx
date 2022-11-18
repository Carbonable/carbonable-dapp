import type { Connector} from '@starknet-react/core';
import { useAccount, useConnectors } from '@starknet-react/core';
import { useEffect, useState } from 'react';
import { fetchStarnetId } from '~/utils/starknetId';

function getAvailableConnectors(connectors: Connector<any>[]):Connector<any>[] {
    let availableConnectors = [];
    for(const connector of connectors) {
        if(connector.available()) {
            availableConnectors.push(connector);
        }
    }

    return availableConnectors;
}

export default function Index() {
    const { address, status } = useAccount();
    const { connect, connectors } = useConnectors();
    const [starnetId, setStarnetId] = useState("");
    const availableConnectors = getAvailableConnectors(connectors);
    console.log(availableConnectors)

    useEffect(() => {
        getStarnetId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    async function getStarnetId() {
        const starknetId = await fetchStarnetId(address);
        setStarnetId(starknetId);
    }

    return (
        <>
            <p>Status: {status}</p>
            <p>Wallet address: {address}</p>
            <p>Starknet ID: {starnetId}</p>
            <div>
                {connectors.map((connector) => (
                    connector.available() && status === 'disconnected' ?
                    <li key={connector.id()}>
                        <button onClick={() => connect(connector)}>
                            Connect {connector.name()}
                        </button>
                    </li> : null
                ))}
            </div>
        </>
    )
}