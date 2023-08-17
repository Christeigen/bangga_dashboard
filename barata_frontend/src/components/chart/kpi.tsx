import {
  Card,
  Metric,
  Text,
  List,
  ListItem,
  BadgeDelta,
  Flex,
  Bold,
  DeltaType,
  Grid,
} from "@tremor/react";

const sales = [
  {
    name: "Jakarta",
    stat: "18.3%",
    status: "increase",
  },
  {
    name: "Bandung",
    stat: "8.3%",
    status: "moderateIncrease",
  },
  {
    name: "Surabaya",
    stat: "1.6%",
    status: "unchanged",
  },
  {
    name: "Semarang",
    stat: "-5.1%",
    status: "moderateDecrease",
  },
];

const profit = [
  {
    name: "Jakarta",
    stat: "1.3%",
    status: "unchanged",
  },
  {
    name: "Bandung",
    stat: "3.3%",
    status: "moderateIncrease",
  },
  {
    name: "Surabaya",
    stat: "2.6%",
    status: "moderateIncrease",
  },
  {
    name: "Semarang",
    stat: "-8.2%",
    status: "decrease",
  },
];

const customers = [
  {
    name: "Jakarta",
    stat: "-6.3%",
    status: "moderateDecrease",
  },
  {
    name: "Bandung",
    stat: "6.7%",
    status: "increase",
  },
  {
    name: "Surabaya",
    stat: "2.9%",
    status: "moderateIncrease",
  },
  {
    name: "Semarang",
    stat: "1.2%",
    status: "unchanged",
  },
];

const churn = [
  {
    name: "Jakarta",
    stat: "-6.3%",
    status: "moderateDecrease",
  },
  {
    name: "Bandung",
    stat: "6.7%",
    status: "increase",
  },
  {
    name: "Surabaya",
    stat: "2.9%",
    status: "moderateIncrease",
  },
  {
    name: "Semarang",
    stat: "1.2%",
    status: "unchanged",
  },
];

const categories = [
  {
    title: "Sales",
    metric: 234560,
    metricPrev: 199370,
    delta: "0",
    data: sales,
    deltaType: "moderateIncrease", 
  },
  {
    title: "Profit",
    metric: 164500,
    metricPrev: 144760,
    delta: "0",
    data: profit,
    deltaType: "moderateIncrease",
  },
  {
    title: "Customers",
    metric: 456,
    metricPrev: 387,
    delta: "0",
    data: customers,
    deltaType: "moderateIncrease",
  },
  {
    title: "Churn Rate",
    metric: 9,
    metricPrev: 15,
    delta: "0",
    data: customers,
    deltaType: "moderateDecrease",
  },
];

categories.forEach(category => {
  const percentageChange = ((category.metric - category.metricPrev) / category.metricPrev) * 100;

  if (percentageChange > 0) {
    category.delta = `+${percentageChange.toFixed(2)}%`;
    category.deltaType = "moderateIncrease";
  } else if (percentageChange < 0) {
    category.delta = `${percentageChange.toFixed(2)}%`;
    category.deltaType = "moderateDecrease";
  } else {
    category.delta = "0.00%";
    category.deltaType = "unchanged";
  }
});

export default function Example() {
  return (
    <Grid numItemsSm={3} numItemsLg={4} numItemsMd={2} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title} style={{ width: "335px", height: "310px" }}>
          <Flex alignItems="start">
            <Text>{item.title}</Text>
            <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
          </Flex>
          <Flex justifyContent="start" alignItems="baseline" className="truncate space-x-3">
            <Metric>{item.metric}</Metric>
            <Text className="truncate">from {item.metricPrev}</Text>
          </Flex>
          <Flex className="mt-6">
            <Text>
              <Bold>Province</Bold>
            </Text>
            <Text>
              <Bold>WoW (%)</Bold>
            </Text>
          </Flex>
          <List className="mt-1">
            {item.data.map((country) => (
              <ListItem key={country.name}>
                <Flex justifyContent="start" className="truncate space-x-2.5">
                  <BadgeDelta deltaType={country.status as DeltaType} />
                  <Text className="truncate">{country.name}</Text>
                </Flex>
                <Text>{country.stat}</Text>
              </ListItem>
            ))}
          </List>
        </Card>
      ))}
    </Grid>
  );
};