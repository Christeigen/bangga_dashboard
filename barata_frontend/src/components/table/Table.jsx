import * as XLSX from 'xlsx';

export default function Table({ type, source, columns, title, shuffle, filter, datefilter}) {

  let dataToDisplay = [...source];

  // Reverse the data if 'shuffle' prop is set to true
  if (shuffle) {
    dataToDisplay = [...dataToDisplay].reverse();
  }

  // Apply filtering based on 'filter' prop
  if (filter && Number.isInteger(filter) && filter > 0) {
    dataToDisplay = dataToDisplay.slice(0, filter);
  }

  if (datefilter){
    if (datefilter.from && datefilter.to) {
      dataToDisplay = dataToDisplay.filter((item) => {
          const x = new Date(item.data.orderDate);
          return x >= datefilter.from && x <= datefilter.to;
      });
    }
  }

  function topLoyalCustomer(data) {
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
  
  let data

  switch (type) {
    case "top_loyal_customer":
      data = topLoyalCustomer(dataToDisplay);
      // console.log(data)
      break;
    case "download_preview":
      data = dataToDisplay;
      // console.log(data)
      break;
    default:
      break;
  }

  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    const url = URL.createObjectURL(new Blob([buffer], { type: "application/octet-stream" }));
    const link = document.createElement("a");
    link.style = "display: none"
    link.href = url;
    link.download = `${title}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url)
  };

  const dataOnlyArray = data.map(item => item.data);


  return (
    // flex-1 perhatiin
    <>
    <div className= {`bg-white p-5 drop-shadow-sm shadow-sm flex-1 ${type === 'download_preview' ? 'rounded-b-lg' : 'rounded-lg'} mb-3`}> 
      <div className = {`flex items-center justify-between ${type === 'download_preview' ? 'mb-3' : ''}`}>
        <div className="px-1 py-2 text-stone-500 text-[17px]">{title}</div>
        <button 
          onClick={() => downloadExcel(dataOnlyArray)}
          className= {`px-4 py-2 text-white text-sm bg-blue-900 rounded-lg hover:bg-black ${type !== 'download_preview' ? 'hidden' : ''}`}>
          Export to Excel
        </button>
      </div>

      <table className="w-full">
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
            <tr key= {type === 'top_loyal_customer' ? rowdata.customerId : rowdata.key}>
              {columns.map((column) => (
                <td key= {column.key} className="border-b p-2 text-sm">
                  {type === 'top_loyal_customer' ? rowdata[column.key] : rowdata.data[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>

  </>
  );
}

{/* <div className="bg-white p-5 rounded-lg drop-shadow-sm shadow-sm flex-1"> 
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
    {dataToDisplay.map((rowdata) => (
      <tr key={rowdata.key}>
        {columns.map((column) => (
          <td key={column.key} className="border-b p-2 text-sm">
            {rowdata.data[column.key]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
</div> */}
