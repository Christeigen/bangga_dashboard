export default function Table({ source, columns, title, shuffle, filter }) {

  let dataToDisplay = [...source];

  // // Reverse the data if 'shuffle' prop is set to true
  // if (shuffle) {
  //   dataToDisplay = [...dataToDisplay].reverse();
  // }

  // // Apply filtering based on 'filter' prop
  // if (filter && Number.isInteger(filter) && filter > 0) {
  //   dataToDisplay = dataToDisplay.slice(0, filter);
  // }

  function groupAndSumData(data) {
    return data.reduce((acc, item) => {
      const customerId = item.data.customerId;
      const totalPrice = item.data.totalPrice;
      const duration = item.data.duration;
      
      const existingCustomerId = acc.findIndex((item) => item.customerId === customerId);
      if (existingCustomerId !== -1) {
        acc[existingCustomerId].totalPrice += totalPrice;
        acc[existingCustomerId].duration += duration;
      } else {
        acc.push({ customerId, totalPrice, duration });
      }
  
      return acc;
    }, []);
  };
  

  let data = groupAndSumData(dataToDisplay)

  return (
    // flex-1 perhatiin
    <div className="bg-white p-5 rounded-lg drop-shadow-sm shadow-sm flex-1"> 
      <div className="px-1 pb-2 text-stone-500 text-[17px]">{title}</div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <td key={column.key} className="border-b p-2 text-sm font-semibold">
                {column.label}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((rowdata) => (
            <tr key={rowdata.customerId}>
              {columns.map((column) => (
                <td key={column.key} className="border-b p-2 text-sm">
                  {rowdata[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}