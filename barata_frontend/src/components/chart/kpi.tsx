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

export default function Example({source}) {
  const totalValue = (year, month, day, criteria) => {
    if (criteria == "totalPrice"){
    const totalPrice = newData
      .filter(item => {
        const itemDate = new Date(item.data.orderDate);
        const startDate = new Date(year, month, 1);
        return itemDate >= startDate && itemDate <= new Date(year, month, day);
      })
      .reduce((total, item) => total + item.data.totalPrice, 0);
    return totalPrice;
    } else if (criteria == "duration"){
      const totalDuration = newData
      .filter(item => {
        const itemDate = new Date(item.data.orderDate);
        const startDate = new Date(year, month, 1);
        return itemDate >= startDate && itemDate <= new Date(year, month, day);
      })
      .reduce((total, item) => total + item.data.duration, 0);
    return totalDuration;
    } else {
      const totalCustomer = newData
      .filter(item => {
        const itemDate = new Date(item.data.orderDate);
        const startDate = new Date(year, month, 1);
        return itemDate >= startDate && itemDate <= new Date(year, month, day);
      })
      .reduce((total, item) => total + item.customer, 0);
    return totalCustomer;
    }
  };
  
  const comparison = (currentYear, currentMonth, currentDay, criteria) => {
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const daysInPreviousMonth = new Date(previousYear, previousMonth, 1).getDate();
    console.log(daysInPreviousMonth)
    
    if (criteria == "totalPrice"){
      const currentMonthTotal = totalValue(currentYear, currentMonth, currentDay, "totalPrice");
      const previousMonthTotal = totalValue(previousYear, previousMonth, currentDay, "totalPrice");
      return { currentMonthTotal, previousMonthTotal };
    } else if (criteria == "duration"){
      const currentMonthDuration = totalValue(currentYear, currentMonth, currentDay, "duration");
      const previousMonthDuration = totalValue(previousYear, previousMonth, currentDay, "duration");
      return { currentMonthDuration, previousMonthDuration };
    } else {
      const currentMonthCustomer = totalValue(currentYear, currentMonth, currentDay, "totalCustomer");
      const previousMonthCustomer = totalValue(previousYear, previousMonth, currentDay, "totalCustomer");
      return { currentMonthCustomer, previousMonthCustomer };
    }
  };

  const addColumn = data => {
    return data.map(user => ({ ...user, customer: 1 }));
  };

  const newData = addColumn(source)
  console.log(newData)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate() + 1;
  const { currentMonthTotal, previousMonthTotal } = comparison(currentYear, currentMonth, currentDay, "totalPrice");
  const { currentMonthDuration, previousMonthDuration } = comparison(currentYear, currentMonth, currentDay, "duration")
  const { currentMonthCustomer, previousMonthCustomer } = comparison(currentYear, currentMonth, currentDay, "customer")

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
      metric: currentMonthTotal,
      metricPrev: previousMonthTotal,
      delta: "0",
      data: sales,
      deltaType: "moderateIncrease", 
    },
    {
      title: "Profit",
      metric: currentMonthTotal*(5/100),
      metricPrev: previousMonthTotal*(5/100),
      delta: "0",
      data: profit,
      deltaType: "moderateIncrease",
    },
    {
      title: "Customers",
      metric: currentMonthCustomer,
      metricPrev: previousMonthCustomer,
      delta: "0",
      data: customers,
      deltaType: "moderateIncrease",
    },
    {
      title: "Duration",
      metric: currentMonthDuration,
      metricPrev: previousMonthDuration,
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