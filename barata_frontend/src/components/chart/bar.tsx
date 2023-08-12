import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import React from 'react';

interface Item {
  csId: string;
  totalPrice: number;
  duration: number;
}

interface MyBarChartProps {
  source: Item[];
  columns: string[];
  title: string;
  shuffle: boolean;
  filter: (item: Item) => boolean;
}

const dataFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

const MyBarChart: React.FC<MyBarChartProps> = ({ source, columns, title, shuffle, filter }) => {
  const dataToDisplay = shuffle ? [...source].sort(() => Math.random() - 0.5) : source.filter(filter);

  const groupAndSumData = (data: Item[]) => {
    return data.reduce((acc: Item[], item: Item) => {
      const csId = item.data.csId;
      const totalPrice = item.data.totalPrice
      const duration = item.data.duration
      // const { csId, totalPrice, duration } = item;

      if (isNaN(totalPrice) || isNaN(duration)) {
        console.log('NaN values detected:', item);
      }
      
      const existingCsId = acc.findIndex((accItem: Item) => accItem.csId === csId);
      if (existingCsId !== -1) {
        acc[existingCsId].totalPrice += totalPrice;
        acc[existingCsId].duration += duration;
      } else {
        acc.push({ csId, totalPrice, duration });
      }
  
      return acc;
    }, []);
  };
  
  const data = groupAndSumData(dataToDisplay);

  const chartData = data.map((item) => ({
    name: item.csId,
    "Total Sales": parseFloat(item.totalPrice.toFixed(2)),
  }));
  console.log(data);

  return (
    <Card>
      <Title>{title}</Title>
      <Subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
      </Subtitle>
      <BarChart
        className="mt-6"
        data={chartData}
        index="name"
        categories={["Total Sales"]}
        colors={["cyan"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default MyBarChart;
