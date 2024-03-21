import { type Maybe } from "graphql/jsutils/Maybe";

export default function FormattedDate({ timestamp }: { timestamp: Maybe<string> | undefined }) {
    if (!timestamp) {
        return (
            <>
                No date
            </>
        )
    }
    const timestampInMilliseconds = parseInt(timestamp);
    const date = new Date(timestampInMilliseconds);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    return (
        <>
            {`${day}-${month}-${year}`}
        </>
    )
}