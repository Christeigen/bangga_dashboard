import { useState } from 'react';
import axios from 'axios';

export default function StatButton({ customer_id, withdraw_id, status }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleButtonClick = async (customer_id, withdraw_id, verif_status) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {

        const userConfirmed = window.confirm(`Are you sure you want to update the status to ${verif_status === 100 ? 'Accepted' : 'Rejected'}?`);

        if (!userConfirmed) {
          return;
        }

      const response = await axios.post('http://127.0.0.1:8000/api/updateverifstatus/', { customer_id, withdraw_id, verif_status });

      if (response.status === 200) {
        window.location.reload();
      } else {
        window.alert('Update failed');
      }
    } catch (error) {
      window.alert(`Error during POST request: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 0) {
    return (
      <div className="flex flex-row gap-2 justify-center">
        <button
          className="px-2 py-2 text-green-900 text-sm bg-green-200 rounded-lg flex flex-row"
          onClick={() => handleButtonClick(customer_id, withdraw_id, 100)}
        >
          Accept
        </button>
        <button
          className="px-2 py-2 text-red-900 text-sm bg-red-200 rounded-lg flex flex-row"
          onClick={() => handleButtonClick(customer_id, withdraw_id, 200)} 
        >
          Reject
        </button>
      </div>
    );
  } else if (status === 100) {
    return (
      <div className="flex flex-row gap-2 justify-center">
        <button className="px-2 py-2 text-white text-sm bg-zinc-500 rounded-lg flex flex-row" disabled>
          Accepted
        </button>
      </div>
    );
  } else if (status === 200) {
    return (
      <div className="flex flex-row gap-2 justify-center">
        <button className="px-2 py-2 text-white text-sm bg-zinc-500 rounded-lg flex flex-row" disabled>
          Rejected
        </button>
      </div>
    );
  }
}

