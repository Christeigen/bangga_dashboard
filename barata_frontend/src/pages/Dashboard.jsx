import LineChart from "/src/components/chart/LineChart";
import Map from "/src/components/chart/Map";
import BarChart from "/src/components/chart/BarChart";
import Widget from "/src/components/widget/Widget";
import Table from "/src/components/table/Table";
import { useOutletContext } from "react-router-dom";


export default function Dashboard() {
    
  const [ bookData, chargingstationData, customerData] = useOutletContext()

  const active_user_data = [
      { key: 'customerId', label: 'Customer ID' },
      { key: 'duration', label: 'Duration' },
      { key: 'totalPrice', label: 'Total Transaction' },
  ];

  return (
      <>
        <div className="flex gap-5 mx-2">
          <Widget type="customer" source = {customerData}/>
          <Widget type="station" source = {chargingstationData}/>
          <Widget type="transaction" source = {bookData}/>
          <Widget type="bug" source = {bookData}/>
        </div>

        <div className="flex gap-5 mx-2">
          <Table
            type = {'top_loyal_customer'} 
            source = {bookData} 
            columns = {active_user_data} 
            title = {'Top Loyal Customers'} 
            shuffle = {true}
            filter = {5}
          />
          <LineChart 
            source = {bookData}
            title = {'Transaction History'} />
        </div>

        <div className="flex gap-5 mx-2">
          <div className = " bg-white w-1/2 my-5 rounded-lg shadow-sm px-5">
            <div className = "mt-5 text-stone-500 text-[17px]">
              Charging Station Location Map
            </div>
            <Map
              source = {chargingstationData}/>
          </div>
          <div className = "w-1/2 my-5">
            <BarChart
              source = {bookData}
              title = {'Top Charging Station'} />
          </div>
        </div>

      </>
  )
}
