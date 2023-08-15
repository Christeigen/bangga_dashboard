import { useOutletContext } from "react-router-dom";
import {useState} from 'react'
import Table from "/src/components/table/Table";
import { DateRangePicker, DateRangePickerItem} from "@tremor/react";

export default function DownloadPage() {


    const [value, setValue] = useState({
        from: '',
        to: '',
      });

    console.log(value)
    
    const [ bookData, chargingstationData, customerData, mitraData ] = useOutletContext()

    const [formData, setFormData] = useState(
        {
          database: "bookData",
          period: "month"
        }
      )
      
    function handleChange(event) {
          const {name, value} = event.target
          setFormData(prevFormData => {
              return {
                  ...prevFormData,
                  [name]: value
              }
          })
      }

    let data

    switch (formData.database) {
      case "bookData":
        data = bookData
        break;
      case "chargingstationData":
        data = chargingstationData
        break;
      case "customerData":
        data = customerData.map(item => ({
          key: item.key,
          data: {
            email: item.data[Object.keys(item.data)[0]].email,
            phoneNumber: item.data[Object.keys(item.data)[0]].phoneNumber,
            username: item.data[Object.keys(item.data)[0]].username
          }
        }));
        break;
      case "mitraData":
        data = mitraData.map(item => ({
          key: item.key,
          data: {
            email: item.data[Object.keys(item.data)[0]].email,
            phoneNumber: item.data[Object.keys(item.data)[0]].phoneNumber,
            username: item.data[Object.keys(item.data)[0]].username
          }
        }));
        break;
      default:
        break;
    }

    const allColumns = [...new Set(data.flatMap(item => Object.keys(item.data)))];

    const selectedColumns = allColumns.map(key => ({
        key: key,
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
    }));

    return (
        <>
        <div className="bg-blue-900 py-6 px-5 rounded-t-xl drop-shadow-sm shadow-sm mx-2 flex justify-between items-center text-white relative z-10"> 
            <div>
              database
              <select
                  className = "text-sm outline-none text-black px-2 py-2 ml-3"
                  id="database" 
                  value={formData.database}
                  onChange={handleChange}
                  name="database"
              >
                  <option value="bookData">Book Data</option>
                  <option value="chargingstationData">Charging Station Data</option>
                  <option value="customerData">Customer Data</option>
                  <option value="mitraData">Mitra Data</option>
              </select>
            </div>

            <div className = {`${formData.database !== 'bookData' ? 'hidden' : ''} text-sm`}>
              <DateRangePicker
              className="max-w-md mx-auto bg-white text-black"
              value={value}
              onValueChange={setValue}
              selectPlaceholder="All Data"
              color="rose"
              >
                  <DateRangePickerItem 
                    className = "text-black bg-white" 
                    key="today" 
                    value="today" 
                    from={new Date()}>
                      Today
                  </DateRangePickerItem>
                  <DateRangePickerItem 
                    className = "text-black bg-white" 
                    key="last7days" 
                    value="last7days" 
                    from={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
                    to={new Date()}>
                      Last 7 days
                  </DateRangePickerItem>
                  <DateRangePickerItem 
                    className = "text-black bg-white" 
                    key="last30days" 
                    value="last30days" 
                    from={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                    to={new Date()}>
                      Last 30 days
                  </DateRangePickerItem>
                  <DateRangePickerItem 
                    className = "text-black bg-white" 
                    key="monthtodate" 
                    value="monthtodate" 
                    from={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                    to={new Date()}>
                      Month to Date
                  </DateRangePickerItem>
                  <DateRangePickerItem 
                    className = "text-black bg-white" 
                    key="yeartodate" 
                    value="yeartodate" 
                    from={new Date(new Date().getFullYear(), 0, 1)}
                    to={new Date()}>
                      Year to Date
                  </DateRangePickerItem>
              </DateRangePicker>
            </div>

        </div>

        <div className="mx-2"> 
            <Table
                type = {'download_preview'} 
                source = {data}
                title={`${formData.database}${formData.database === 'bookData' && value.from ? ` (${value.from.toDateString()} - ${value.to.toDateString()})` : ' ( All Records )'}`}
                columns = {selectedColumns}
                shuffle = {true}
                datefilter = {formData.database === 'bookData' ? value : ''}
            />
        </div>
        </>
  )
}