import Example from "/src/components/chart/kpi";
import MyBarChart from "/src/components/chart/bar";
import { useOutletContext } from "react-router-dom";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

export default function OtherPage() {

  const [ bookData, chargingstationData ] = useOutletContext()

  const active_user_data = [
    { key: 'customerId', label: 'Customer ID' },
    { key: 'duration', label: 'Total Duration'},
    { key: 'totalPrice', label: 'Total Transaction'},
];

  return (
    <Grid numItemsMd={2} numItemsLg={1} className="gap-6 mt-6">
    <div className="flex gap-5 mx-2">
      <Example source = {bookData} csData = {chargingstationData}/>
    </div>
    <div>
      <MyBarChart
        source = {bookData} 
        columns = {active_user_data} 
        title = {'Top Sales Charging Station'} 
        shuffle = {true}
        // filter = {5}
      />
    </div>
    </Grid>
  )
}
