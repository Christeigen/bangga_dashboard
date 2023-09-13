import { Card, Title, BarChart, Subtitle, Grid, Col } from "@tremor/react";
import React from 'react';

// interface Item {
//   csId: string;
//   totalPrice: number;
//   totalDuration: number;
//   location: string;
//   csName: string;
//   provinsi: string;
// }

// interface MyBarChartProps {
//   source: Item[];
//   additionalData: Item[];
//   title: string;
//   shuffle: boolean;
//   filter: number;
//   category: string;
//   color: string;
//   index: string;
//   datefilter: string;
// }

const dataFormatter = (number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

const MyBarChart = ({ source, filter, category, color, index, datefilter }) => {
  // const filteredData = source.slice(0, filter);
  let rangeData = [...source]

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

  if (datefilter){
    if (datefilter.from && datefilter.to) {
      rangeData = rangeData.filter((item) => {
          const x = new Date(item.data.orderDate);
          return x >= datefilter.from && x <= datefilter.to;
      });
    }
  }

  const barData = groupAndSumData(rangeData, "csId")
  const salesData = [...barData].sort((a, b) => b.totalPrice - a.totalPrice);
  const durationData = [...barData].sort((a, b) => b.totalDuration - a.totalDuration);
  const totalData = groupAndSumData(rangeData, "provinsi")
  const provinceData = [...totalData].sort((a, b) => b.totalPrice - a.totalPrice);

  if (index == "province") {
    return (
      <BarChart
        className="mt-6"
        data={provinceData}
        index="provinsi"
        categories={[category]}
        colors={[color]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    );
  } else if (index == "duration") {
    return (
      <BarChart
        className="mt-6"
        data={durationData}
        index="csName"
        categories={[category]}
        colors={[color]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    );
  } else if (index == "sales") {
    return (
      <BarChart
        className="mt-6"
        data={salesData}
        index="csName"
        categories={[category]}
        colors={[color]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    );
  }
};

export default MyBarChart;
