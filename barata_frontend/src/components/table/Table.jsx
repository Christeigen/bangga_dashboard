export default function Table({ source, columns, title, shuffle, filter }) {

  let dataToDisplay = [...source];

  // Reverse the data if 'shuffle' prop is set to true
  if (shuffle) {
    dataToDisplay = [...dataToDisplay].reverse();
  }

  // Apply filtering based on 'filter' prop
  if (filter && Number.isInteger(filter) && filter > 0) {
    dataToDisplay = dataToDisplay.slice(0, filter);
  }

  return (
    // flex-1 perhatiin
    <div className="bg-white p-5 rounded-lg shadow-sm flex-1"> 
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
    </div>
  );
}
