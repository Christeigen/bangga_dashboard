import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import {useState} from 'react';

const chartdata = [
  {
    name: "Utan Jati Station",
    "Total Sales": 24880,
  },
  {
    name: "FTMM Station",
    "Total Sales": 14450,
  },
  {
    name: "Ngagel Station",
    "Total Sales": 7430,
  },
];

const dataFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

const MyBarChart = () => (
  <Card>
    <Title>Top Sales Charging Station</Title>
    <Subtitle>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
    </Subtitle>
    <BarChart
      className="mt-6"
      data={chartdata}
      index="name"
      categories={["Total Sales"]}
      colors={["cyan"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  </Card>
);

export default MyBarChart;