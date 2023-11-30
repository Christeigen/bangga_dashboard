// export default function StatButton(status) {
//     console.log("status", status.status)
//     if (status.status == 0){
//         return (
//             <div className="flex flex-row gap-2 justify-center">
//                 <button className="px-2 py-2 text-green-900 text-sm bg-green-200 rounded-lg flex flex-row">Accept</button>
//                 <button className="px-2 py-2 text-red-900 text-sm bg-red-200 rounded-lg flex flex-row">Reject</button>
//             </div>
//         )
//     }
//     else if (status.status == 100) {
//         return (
//             <div className="flex flex-row gap-2 justify-center">
//                 <button className="px-2 py-2 text-white text-sm bg-zinc-500 rounded-lg flex flex-row">Accepted</button>
//             </div>
//         )
//     }
//     else if (status.status == 200) {
//         return (
//             <div className="flex flex-row gap-2 justify-center">
//                 <button className="px-2 py-2 text-white text-sm bg-zinc-500 rounded-lg flex flex-row">Rejected</button>
//             </div>
//         )
//     }
// }

import React from 'react';

export default function StatButton({ status }) {
    const handleAccept = () => {
        // Make a request to your Django backend to update the status to 'accepted'
        fetch('http://127.0.0.1:8000/api/withdrawdata/', {
            method: 'PUT', // or 'POST' depending on your API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                is_verif: 100,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend if needed
                console.log('Accept response:', data);
            })
            .catch(error => {
                console.error('Error accepting:', error);
            });
    };

    const handleReject = () => {
        // Make a request to your Django backend to update the status to 'rejected'
        fetch('http://127.0.0.1:8000/api/withdrawdata/', {
            method: 'PUT', // or 'POST' depending on your API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                is_verif: 200,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend if needed
                console.log('Reject response:', data);
            })
            .catch(error => {
                console.error('Error rejecting:', error);
            });
    };

    if (status == 0) {
        return (
            <div className="flex flex-row gap-2 justify-center">
                <button
                    onClick={handleAccept}
                    className="px-2 py-2 text-green-900 text-sm bg-green-200 rounded-lg flex flex-row"
                >
                    Accept
                </button>
                <button
                    onClick={handleReject}
                    className="px-2 py-2 text-red-900 text-sm bg-red-200 rounded-lg flex flex-row"
                >
                    Reject
                </button>
            </div>
        );
    }

    else if (status == 100) {
        return (
            <div className="flex flex-row gap-2 justify-center">
                <button className="px-2 py-2 text-white text-sm bg-zinc-500 rounded-lg flex flex-row">Accepted</button>
            </div>
        )
    }
    else if (status == 200) {
        return (
            <div className="flex flex-row gap-2 justify-center">
                <button className="px-2 py-2 text-white text-sm bg-zinc-500 rounded-lg flex flex-row">Rejected</button>
            </div>
        )
    }

    return null;
}
