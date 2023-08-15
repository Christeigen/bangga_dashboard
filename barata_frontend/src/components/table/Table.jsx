import * as XLSX from 'xlsx';
import axios from 'axios';
import {useState} from 'react'
import { HiOutlineShare } from 'react-icons/hi'
import TagsInput from "/src/components/tags/TagsInput";

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

  const [showEmailForm, setShowEmailForm] = useState(false);

  function openEmailForm() {
    setShowEmailForm(true);
  }

  function closeEmailForm() {
    setSelectedTags([]);
    setShowEmailForm(false);
  }

  const [formEmail, setFormEmail] = useState(
    {
        subject: "",
        message:"",
    }
  )

  function handleChange(event) {
      console.log(event)
      const {name, value} = event.target

      setFormEmail(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
      console.log(formEmail)
  }

  function resetForm() {
    setSelectedTags([]);
    setFormEmail({
      subject: '',
      message: '',
    });
  }

  const [selectedTags, setSelectedTags] = useState([]);
  
  function sendEmailWithAttachment(data, event) {
    event.preventDefault();

    // Generate Excel file
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  
    // Create FormData to send along with the email request
    const formData = new FormData();

    formData.append('to', selectedTags.join(','));
    formData.append('subject', formEmail.subject);
    formData.append('message', formEmail.message);
    formData.append('attachment', new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'report.xlsx');
  
    // Send email request to Django API endpoint
    axios.post('http://127.0.0.1:8000/send-email/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        console.log('Email sent successfully', response.data);
        window.alert('Email sent successfully');
        resetForm()
      })
      .catch(error => {
        console.error('Error sending email', error);
        window.alert('Erorr sending email',error);
      });
    closeEmailForm()
  }
  

  const dataOnlyArray = data.map(item => item.data);

  return (
    // flex-1 perhatiin
    <>
    <div className= {`bg-white p-5 drop-shadow-sm shadow-sm flex-1 ${type === 'download_preview' ? 'rounded-b-lg' : 'rounded-lg'} mb-3`}> 
      <div className = {`flex items-center justify-between ${type === 'download_preview' ? 'mb-3' : ''}`}>
        <div className="px-1 py-2 text-stone-500 text-[17px]">{title}</div>
        <div className = "flex justify-between">
          <button 
            onClick={() => downloadExcel(dataOnlyArray)}
            className= {`px-4 py-2 text-white text-sm bg-blue-900 rounded-lg hover:bg-black ${type !== 'download_preview' ? 'hidden' : ''}`}>
            Export to Excel
          </button>
          <button
            onClick={openEmailForm}
            className={`px-4 py-2 text-lg text-stone-500 hover:text-black ${
              type !== 'download_preview' ? 'hidden' : ''
            } ml-2`}
          >
            <HiOutlineShare />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto max-w-5xl overflow-x-auto">
      <table className="table-auto w-full">
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
    </div>

    {showEmailForm && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-1/2 w-2/5 ">
          <h2 className="text-xl font-semibold mb-4 mt-2">Send Email</h2>
          <form onSubmit={(e) => sendEmailWithAttachment(dataOnlyArray,e)}>

            <div className = "mb-2">
              <label htmlFor="to" className="block mb-1 font-medium">
                To:
              </label>
              <TagsInput selectedTags={setSelectedTags}  tags={selectedTags}/>
            </div>

            <div className="mb-2">
              <label htmlFor="subject" className="block mb-1 font-medium">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                onChange={handleChange}
                value={formEmail.subject}
                className="w-full border rounded-md p-2 focus:border-blue-50"
                // placeholder='Monthly Report Customer Data'
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="message" className="block mb-1 font-medium">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                onChange={handleChange}
                value={formEmail.message}
                className="w-full border rounded-md p-2 "
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-black"
              >
                Send
              </button>
              <button
                type="button"
                onClick={closeEmailForm}
                className="px-4 py-2 ml-2 border rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

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
