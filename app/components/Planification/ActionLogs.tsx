export default function ActionLogs({logs}: {logs: any[]}) {

    return (
        <div className="mt-4 w-full font-inter text-sm overflow-x-scroll">
            <table className="table-auto text-left min-w-full">
                <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap">
                    <tr className="table-style">
                        <th>Date</th>
                        <th>Actions</th>
                        <th>Quantity</th>
                        <th>Source</th>
                        <th>To</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log: any, idx: number) => {
                        return (
                            <tr key={`projection_${idx}`} className="border-b border-neutral-500 hover:bg-neutral-600 items-center text-neutral-200 whitespace-nowrap">
                                <td>{log.date}</td>
                                <td>{log.action}</td>
                                <td>{log.quantity}</td>
                                <td>{log.source}</td>
                                <td>{log.to}</td>
                                <td>{log.user}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}