export default function StatButton(status) {
    console.log("status", status.status)
    if (status.status == 0){
        return (
            <div className="flex flex-row gap-2 justify-center">
                <button className="px-2 py-2 text-green-900 text-sm bg-green-200 rounded-lg flex flex-row">Accept</button>
                <button className="px-2 py-2 text-red-900 text-sm bg-red-200 rounded-lg flex flex-row">Reject</button>
            </div>
        )
    }
    else if (status.status == 100) {
        return (
            <div className="flex flex-row gap-2 justify-center">
                <button className="px-2 py-2 text-white text-sm bg-zinc-500 rounded-lg flex flex-row">Accepted</button>
            </div>
        )
    }
    else if (status.status == 200) {
        return (
            <div className="flex flex-row gap-2 justify-center">
                <button className="px-2 py-2 text-white text-sm bg-zinc-500 rounded-lg flex flex-row">Rejected</button>
            </div>
        )
    }
}