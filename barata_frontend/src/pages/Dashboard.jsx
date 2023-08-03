import LineChart from "/src/components/chart/LineChart";
import Map from "/src/components/chart/Map";
import Widget from "/src/components/widget/Widget";
import Table from "/src/components/table/Table";
import { useOutletContext } from "react-router-dom";


export default function Dashboard() {
    
  const [ bookData, chargingstationData, userData ] = useOutletContext()

  const active_user_data = [
      { key: 'customerId', label: 'Customer ID' },
      { key: 'csId', label: 'Station ID' },
      { key: 'orderDate', label: 'Order Date' },
      { key: 'totalPrice', label: 'Price'},
      { key: 'duration', label: 'duration'}
  ];

  return (
      <>
        <div className="flex gap-5 mx-2">
          <Widget type="customer" source = {userData}/>
          <Widget type="station" source = {chargingstationData}/>
          <Widget type="transaction" source = {bookData}/>
          <Widget type="bug" source = {bookData}/>
        </div>

        <div className="flex gap-5 mx-2">
          <Table 
            source = {bookData} 
            columns = {active_user_data} 
            title = {'Last user'} 
            shuffle = {true}
            filter = {5}
          />
          <LineChart 
            source = {bookData}
            title = {'Transaction History'} />
        </div>

        <div className="flex gap-5 mx-2">
          <div className = " bg-white w-full my-5 rounded-lg shadow-sm px-5">
            <div className = "mt-5 text-stone-500 text-[17px]">
              Charging Station Location Map
            </div>
            <Map
              source = {chargingstationData}/>
          </div>
        </div>
      </>
  )
}
