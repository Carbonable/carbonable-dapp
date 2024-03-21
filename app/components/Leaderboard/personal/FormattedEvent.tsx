import { type Maybe } from "graphql/jsutils/Maybe";

export default function FormattedEvent({ event }: { event: Maybe<string> | undefined }) {
    if (event === undefined || event === null) {
        return null;
    }

    const eventMapping = {
        'minter:buy': 'Amount funded',
        'minter:airdrop': 'Amount airdroped',
        'migrator:migration': 'Amount migrated',
        'amount_funded': 'Amount funded',
        'number_of_projects': 'Number of projects funded',
        'early_adopter': 'Early adopter',
        'offseter': 'Offset ammount',
        'resaler': 'Resale amount',
        'project:transfer-value': 'Project transfer value',
        'project:transfer': 'Project transfer ownership',
    };

    // @ts-ignore
    const userFriendlyEvent = eventMapping[event.toString()] || event;

    return (
        <>
            {userFriendlyEvent}
        </>
    )
}