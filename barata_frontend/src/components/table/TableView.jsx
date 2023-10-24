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
  BadgeDelta,
} from "@tremor/react";

const categories = [
  {
    title: "Total Charging Stations",
    metric: "$ 23,456",
  },
  {
    title: "Total Active Charging Stations",
    metric: "$ 13,123",
  },
  {
    title: "Total Inactive Charging Stations",
    metric: "456",
  },
];

export default function tableView ({ source }) {
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
              {source.map((item) => (
                <TableRow key={item.csName}>
                  <TableCell>{item.csName}</TableCell>
                  <TableCell className="text-right">{item.csId}</TableCell>
                  <TableCell className="text-right">{item.provinsi}</TableCell>
                  {/* <TableCell className="text-right">{item.location}</TableCell> */}
                  <TableCell className="text-right">{item.totalCustomer}</TableCell>
                  <TableCell className="text-right">{item.totalDuration}</TableCell>
                  <TableCell className="text-right">{item.totalPrice}</TableCell>
                  <TableCell className="text-right">
                    <BadgeDelta deltaType={item.deltaType} size="xs">
                      {item.status}
                    </BadgeDelta>
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