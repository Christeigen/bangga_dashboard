import {
  Card,
  Grid,
  Metric,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Text,
  Badge,
} from "@tremor/react";

export default function tableView({ source, selectedProvince }) {
  console.log("provinsi dipilih", selectedProvince)
  const colors = {
    "Active": "emerald",
    "Charging": "yellow",
    "Inactive": "rose",
  };
  
  if (selectedProvince == "All") {
    var data = source;
  } else {
    var data = source.filter(df => df.provinsi === `${selectedProvince}`);
  }
  console.log("data", data)
  const csIds = data.map(item => item.csId).sort((a, b) => parseInt(a) - parseInt(b));
  const kpi_count = {
    total: csIds.length,
    active: data.filter(cs => cs.status_avail === "Active").length,
    inactive: data.filter(cs => cs.status_avail === "Inactive" || cs.status_avail === "Charging").length
  }
  console.log("kpi", kpi_count)
  const categories = [
    {
      title: "Total Charging Stations",
      metric: `${kpi_count.total}`,
    },
    {
      title: "Total Active Charging Stations",
      metric: `${kpi_count.active}`,
    },
    {
      title: "Total Inactive Charging Stations",
      metric: `${kpi_count.inactive}`,
    },
  ];
  return (
    <>
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        {categories.map((item) => (
          <Card key={item.title}>
            <Text>{item.title}</Text>
            <Metric>{item.metric}</Metric>
          </Card>
        ))}
      </Grid>
      <div className="mt-6">
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell className="text-right">Id</TableHeaderCell>
                <TableHeaderCell className="text-right">Provinsi</TableHeaderCell>
                {/* <TableHeaderCell className="text-right">Location</TableHeaderCell> */}
                <TableHeaderCell className="text-right">Total Customer</TableHeaderCell>
                <TableHeaderCell className="text-right">Total Duration</TableHeaderCell>
                <TableHeaderCell className="text-right">Total Sales</TableHeaderCell>
                <TableHeaderCell className="text-right">Status</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.csName}>
                  <TableCell>{item.csName}</TableCell>
                  <TableCell className="text-right">{item.csId}</TableCell>
                  <TableCell className="text-right">{item.provinsi}</TableCell>
                  {/* <TableCell className="text-right">{item.location}</TableCell> */}
                  <TableCell className="text-right">{item.totalCustomer}</TableCell>
                  <TableCell className="text-right">{item.totalDuration}</TableCell>
                  <TableCell className="text-right">{item.totalPrice}</TableCell>
                  <TableCell className="text-right">
                    <Badge color={colors[item.status_avail]} size="xs">
                      {item.status_avail}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}