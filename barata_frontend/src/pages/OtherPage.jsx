import Example from "/src/components/chart/kpi";
import MyBarChart from "/src/components/chart/bar";
import { useState } from 'react'
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
  DonutChart,
  Select,
  SelectItem,
  Flex,
  DateRangePicker,
  DateRangePickerItem
} from "@tremor/react";
import MyPieChart from "../components/chart/pieChart";

export default function OtherPage() {

  const [value, setValue] = useState({
    from: '',
    to: '',
  });

  const [bookData, chargingstationData] = useOutletContext()

  const [formData, setFormData] = useState(
    {
      database: "bookData",
      period: "month"
    }
  )
  // const active_user_data = [
  //   { key: 'customerId', label: 'Customer ID' },
  //   { key: 'duration', label: 'Total Duration' },
  //   { key: 'totalPrice', label: 'Total Transaction' },
  // ];

  const groupAndSumData = (data, selectedVar) => {
    return data.reduce((acc, item) => {
      const csName = item.data.data.name
      const location = item.data.data.location
      const csId = item.data.csId
      const provinsi = item.data.provinsi;
      const totalPrice = item.data.totalPrice
      const totalDuration = item.data.duration
      const totalCustomer = item.customer
      if (selectedVar == "provinsi") {
        const existingprovinsi = acc.findIndex((accItem) => accItem.provinsi === provinsi);
        if (existingprovinsi !== -1) {
          acc[existingprovinsi].totalPrice += totalPrice;
          acc[existingprovinsi].totalDuration += totalDuration;
          acc[existingprovinsi].totalCustomer += totalCustomer;
        } else {
          acc.push({ csId, provinsi, totalPrice, totalDuration, totalCustomer });
        }
        return acc;
      } else if (selectedVar == "csId") {
        const existingcsId = acc.findIndex((accItem) => accItem.csId === csId);
        if (existingcsId !== -1) {
          acc[existingcsId].totalPrice += totalPrice;
          acc[existingcsId].totalDuration += totalDuration;
          acc[existingcsId].totalCustomer += totalCustomer;
        } else {
          acc.push({ csId, provinsi, totalPrice, totalDuration, totalCustomer, location, csName });
        }
        return acc;
      }
    }, []);
  };

  const combinedData = bookData.map((item1) => {
    const matchingItem = chargingstationData.find((item2) => item2.data.csId === item1.data.csId);
    const mergedData = { ...item1.data, ...matchingItem };
    return { data: mergedData };
  });

  const province = combinedData
    .map(item => {
      const provinsi = item.data.data.location.split(", ").slice(-2)[0];
      item.data.provinsi = provinsi;
      return { data: item.data };
    });

  const addColumn = data => {
    return data.map(user => ({ ...user, customer: 1 }));
  };

  const dataFinal = addColumn(province)
  const totalData = groupAndSumData(dataFinal, "provinsi")
  const sortedData = [...totalData].sort((a, b) => b.totalPrice - a.totalPrice);
  // const barData = groupAndSumData(dataFinal, "csId")
  // const sortedSales = [...barData].sort((a, b) => b.totalPrice - a.totalPrice);
  // const sortedDuration = [...barData].sort((a, b) => b.totalDuration - a.totalDuration);

  return (
    <TabGroup className="mt">
      <Grid numItemsMd={2} numItemsLg={1} className="gap-6 mt-6">
        <div className="flex gap-5 mx-2">
          <Example source={dataFinal} groupData={sortedData} />
        </div>
        <div>
          <Card>
            <div className="block sm:flex sm:justify-between">
              <div>
                <Title>Top Performing Charging Station by Category</Title>
              </div>
              <div className={`${formData.database !== 'bookData' ? 'hidden' : ''} text-sm`}>
                <DateRangePicker
                  className="max-w-md mx-auto bg-white text-black"
                  value={value}
                  onValueChange={setValue}
                  selectPlaceholder="All Data"
                  color="rose"
                >
                  <DateRangePickerItem
                    className="text-black bg-white"
                    key="today"
                    value="today"
                    from={new Date()}>
                    Today
                  </DateRangePickerItem>
                  <DateRangePickerItem
                    className="text-black bg-white"
                    key="last7days"
                    value="last7days"
                    from={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
                    to={new Date()}>
                    Last 7 days
                  </DateRangePickerItem>
                  <DateRangePickerItem
                    className="text-black bg-white"
                    key="last30days"
                    value="last30days"
                    from={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                    to={new Date()}>
                    Last 30 days
                  </DateRangePickerItem>
                  <DateRangePickerItem
                    className="text-black bg-white"
                    key="monthtodate"
                    value="monthtodate"
                    from={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                    to={new Date()}>
                    Month to Date
                  </DateRangePickerItem>
                  <DateRangePickerItem
                    className="text-black bg-white"
                    key="yeartodate"
                    value="yeartodate"
                    from={new Date(new Date().getFullYear(), 0, 1)}
                    to={new Date()}>
                    Year to Date
                  </DateRangePickerItem>
                </DateRangePicker>
              </div>
            </div>
            <TabGroup className="mt-0">
              <TabList>
                <Tab>Total Sales</Tab>
                <Tab>Total Duration</Tab>
                <Tab>Province</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <MyBarChart
                    source={dataFinal}
                    additionalData={chargingstationData}
                    filter={5}
                    category="totalPrice"
                    color="cyan"
                    index="sales"
                    datefilter={value}
                  />
                </TabPanel>
                <TabPanel>
                  <MyBarChart
                    source={dataFinal}
                    additionalData={chargingstationData}
                    filter={5}
                    category="totalDuration"
                    color="amber"
                    index="duration"
                    datefilter={value}
                  />
                </TabPanel>
                <TabPanel>
                  <MyBarChart
                    source={dataFinal}
                    additionalData={chargingstationData}
                    filter={5}
                    category="totalPrice"
                    color="lime"
                    index="province"
                    datefilter={value}
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        </div>
      </Grid>
    </TabGroup>
  )
}
